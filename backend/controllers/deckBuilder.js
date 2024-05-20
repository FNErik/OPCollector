const DeckBuilder = require("../models/deckBuilder")

async function addNewDeck(req,res){
    const userId = req.body.userId;
    try {
        let userDeckBuilder = await DeckBuilder.findOne({user: userId});
        if (!userDeckBuilder) {
            res.status(400).send({msg: "Error, no existe ninguna entrada en deckBuilder para este usuario"})
        } else {
            const deckName = req.body.deckName;
            const deckLead = req.body.leadId;
            const cardList = req.body.cardIdsArray;
            
            const newDeck = {
                name: deckName,
                lead: deckLead,
                cards: cardList,
            }

            const saveDeck = await DeckBuilder.findOneAndUpdate(
                { user: userId },
                { $push: { decks: { deck: newDeck } } },
                { new: true }
            );

            if (!saveDeck) {
                res.status(400).send({msg: "Error, no se ha podido guardar el mazo"})
            } else {
                res.status(200).send({DeckBuilder: saveDeck})
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

module.exports = {
    addNewDeck,
    getDecks,
    deleteDecks,
    getUserDecks,
}