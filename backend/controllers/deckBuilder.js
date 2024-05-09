const DeckBuilder = require("../models/deckBuilder")

async function addNewDeck(req,res){
    const userId = req.session.userId;
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

module.exports = {
    addNewDeck,
}