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
            const deckName = req.body.deckName;
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

async function deleteDecks(req,res){
    const userId = req.session.userId;
    const deckName = req.body.deckName;
    try {
        let userDeckList = await DeckBuilder.findOne({ user: userId });
        if (!userDeckList) {
            return res.status(400).send({ msg: "Error, no existe ninguna entrada en deckBuilder para este usuario" });
        }
        const deckIndex = userDeckList.decks.findIndex(deck => deck.name === deckName);
        if (deckIndex === -1) {
            return res.status(400).send({ msg: "Error, no existe el mazo especificado para este usuario" });
        }
        userDeckList.decks.splice(deckIndex, 1);
        const updatedUserDeckList = await userDeckList.save();
        if (!updatedUserDeckList) {
            return res.status(400).send({ msg: "Error, no se ha podido eliminar el mazo" });
        }
        res.status(200).send(updatedUserDeckList);
    } catch (error) {
        res.status(500).send(error);
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
        const filePath = path.join(__dirname, '..', 'tmp', `deck-${deckId}.deck`);

        // Escribe el contenido formateado en el archivo
        fs.writeFileSync(filePath, formattedDeck);

        // Envía el archivo como respuesta para su descarga
        res.download(filePath, `deck-${deckId}.deck`, (err) => {
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
    deleteDecks,
    getUserDecks,
    getDeckFormatted
}