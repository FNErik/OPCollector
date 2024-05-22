const { log } = require("console");
const DeckBuilder = require("../models/deckBuilder")
const fs = require('fs');
const path = require('path');

async function addNewDeck(req, res) {
    const userId = req.body.userId;
    try {
        let userDeckBuilder = await DeckBuilder.findOne({ user: userId });
        if (!userDeckBuilder) {
            res.status(400).send({ msg: "Error, no existe ninguna entrada en deckBuilder para este usuario" });
        } else {
            const deckName = req.body.deckName.trim() || "No Name";
            const lead = req.body.lead;
            const cardList = req.body.cardIdsArray;

            const newDeck = {
                name: deckName,
                lead: lead,
                cards: cardList,
            };

            const saveDeck = await DeckBuilder.findOneAndUpdate(
                { user: userId },
                { $push: { decks: { deck: newDeck } } },
                { new: true }
            );

            if (!saveDeck) {
                res.status(400).send({ msg: "Error, no se ha podido guardar el mazo" });
            } else {
                res.status(200).send({ DeckBuilder: saveDeck });
            }
        }
    } catch (error) {
        res.status(500).send(error);
    }
}
async function updateDeck(req, res) {
    const userId = req.body.userId;
    const deckId = req.body.deckId;
    const updatedDeckData = req.body.updatedDeckData;

    try {
        // Buscar el DeckBuilder del usuario
        let userDeckBuilder = await DeckBuilder.findOne({ user: userId });
        console.log("DECK BUILDER: ")
        console.log(userDeckBuilder)
        if (!userDeckBuilder) {
            return res.status(400).send({ msg: "Error, no existe ninguna entrada en deckBuilder para este usuario" });
        }

        // Encontrar el mazo que se va a actualizar
        const deckToUpdate = await userDeckBuilder.decks.find(deck => deck._id.toString() === deckId);
        console.log("ID DEL MAZO:")
        console.log(deckId)
        console.log("INDICE DEL MAZO:")
        console.log(deckToUpdate)
        if (!deckToUpdate) {
            return res.status(400).send({ msg: "Error, no se encontró el mazo especificado para este usuario" });
        }

        // Actualizar los datos del mazo
        deckToUpdate.name = updatedDeckData.deckName || "No Name";
        deckToUpdate.lead = updatedDeckData.lead || deckToUpdate.lead;
        deckToUpdate.cards = updatedDeckData.cardIdsArray || deckToUpdate.cards;

        const newDeck = {
            name:  updatedDeckData.deckName,
            lead: updatedDeckData.lead,
            cards: updatedDeckData.cardIdsArray,
        };

        const saveDeck = await DeckBuilder.findOneAndUpdate(
            { user: userId },
            { $push: { decks: { deck: newDeck } } },
            { new: true }
            
        );
        
        if (!saveDeck) {
            return res.status(500).send({ msg: "Error, no se pudo guardar la actualización del mazo" });
        }
        // Devolver el DeckBuilder actualizado como respuesta
        res.status(200).send({ DeckBuilder: saveDeck });
    } catch (error) {
        console.error("Error al actualizar el mazo:", error);
        res.status(500).send({ msg: "Error del servidor al actualizar el mazo", error });
    }
}

async function getDecks(req,res){
    try {
        const decks = await DeckBuilder.find().sort({created_at: -1});
        if(!tasks){
            res.status(400).send({msg:"Error al obtener los mazos"})
        }else{
            res.status(200).send(decks);
        }
    } catch (error) {
        res.status(500).send(error)
    }
}

async function deleteDeck(req, res) {
    const { userId, deckId } = req.body;
    console.log("Received request to delete deck");
    console.log("userId:", userId);
    console.log("deckId:", deckId);
    // Validar que userId y deckId existan
    if (!userId || !deckId) {
        console.log("Validation failed: userId or deckId missing");
        return res.status(400).send({ msg: "Error, userId y deckId son requeridos" });
    }
    try {
        // Buscar la lista de mazos del usuario
        let userDeckList = await DeckBuilder.findOne({ user: userId });
        if (!userDeckList) {
            console.log("No userDeckList found for user:", userId);
            return res.status(400).send({ msg: "Error, no existe ninguna entrada en deckBuilder para este usuario" });
        }
        // Encontrar el índice del mazo a eliminar
        const deckIndex = userDeckList.decks.findIndex(deck => deck._id.toString() === deckId);
        console.log("deckIndex:", deckIndex);
        if (deckIndex === -1) {
            console.log("Deck not found in user's deck list");
            return res.status(400).send({ msg: "Error, no existe el mazo especificado para este usuario" });
        }
        // Eliminar el mazo de la lista
        userDeckList.decks.splice(deckIndex, 1);
        // Guardar la lista actualizada de mazos del usuario
        const updatedUserDeckList = await userDeckList.save();
        if (!updatedUserDeckList) {
            console.log("Failed to save updated user deck list");
            return res.status(500).send({ msg: "Error, no se ha podido eliminar el mazo" });
        }
        // Enviar la respuesta con la lista actualizada de mazos
        res.status(200).send(updatedUserDeckList);
    } catch (error) {
        // Manejar errores
        console.error("Error del servidor:", error);
        res.status(500).send({ msg: "Error del servidor", error });
    }
}




async function getUserDecks(req,res){
    try {
        const userId = req.body.user;
        const decks = await DeckBuilder.findOne({user: userId}).sort({created_at: -1});
        if(!decks){
            res.status(400).send({msg:"Error al obtener los mazos"})
        }else{
            res.status(200).send(decks);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send(error)
    }
}

const getDeckFormatted = async (req, res) => {
    try {
        const { userId, deckId } = req.params;

        // Encuentra el deck DeckBuilder por usuario y deckId
        const userDeck = await DeckBuilder.findOne({ user: userId, 'decks._id': deckId });
        if (!userDeck) {
            return res.status(404).send('Deck no encontrado');
        }

        // Encuentra el deck específico dentro del array de decks
        const deck = userDeck.decks.id(deckId).deck;
        if (!deck) {
            return res.status(404).send('Deck no encontrado');
        }

        // Formatea el lead
        const lead = deck.lead;
        const deckName= deck.name;
        const leadFormatted = `1x${lead.cardCollection}-${lead.collectionNumber}`;

        // Formatea las cartas
        const cardsFormatted = deck.cards.map(card => 
            `${card.quantity}x${card.cardCollection}-${card.collectionNumber}`
        );

        // Combina el lead y las cartas en el formato solicitado
        const formattedDeck = [leadFormatted, ...cardsFormatted].join('\n');
        console.log(cardsFormatted)
        console.log(formattedDeck)
        // Define la ruta del archivo temporal
        const filePath = path.join(__dirname, '..', 'tmp', `deck-${deckName}.deck`);

        // Escribe el contenido formateado en el archivo
        fs.writeFileSync(filePath, formattedDeck);

        // Envía el archivo como respuesta para su descarga
        res.download(filePath, `deck-${deckName}.deck`, (err) => {
            if (err) {
                console.error('Error al enviar el archivo', err);
                res.status(500).send('Error al enviar el archivo');
            } else {
                // Elimina el archivo después de enviarlo
                fs.unlinkSync(filePath);
            }
        });
    } catch (error) {
        console.error('Error al obtener el deck', error);
        res.status(500).send('Error al obtener el deck');
    }
};


module.exports = {
    addNewDeck,
    getDecks,
    deleteDeck,
    getUserDecks,
    getDeckFormatted,
    
    updateDeck
}