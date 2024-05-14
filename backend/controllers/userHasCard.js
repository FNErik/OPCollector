const UserHasCard = require("../models/userHasCard");

async function addCardToUser(req, res) {
    const userId = req.session.userId;
    const cardId = req.body.cardId;
    const cardQuantity = req.body.cardQuantity;
    try {
        let userHasCardEntry = await UserHasCard.findOne({ user: userId });
        if (!userHasCardEntry) {
            res.status(400).send({ msg: "Error, no existe ninguna entrada en userHasCard para este usuario" });
        } else {
            const existingCardIndex = userHasCardEntry.cards.findIndex(card => card.cardId === cardId);
            if (existingCardIndex !== -1) {
                userHasCardEntry.cards[existingCardIndex].quantity+=cardQuantity;
            } else {
                userHasCardEntry.cards.push({ cardId, quantity: cardQuantity });
            }
            const newEntryCheck = await userHasCardEntry.save();
            if (!newEntryCheck) {
                res.status(400).send({ msg: "Error, no se ha podido guardar la información de la carta" });
            } else {
                res.status(200).send(newEntryCheck);
            }
        }
    } catch (error) {
        res.status(500).send(error);
    }
}


async function removeCardFromUser(req,res){
    const userId = req.session.userId;
    const cardId = req.body.cardId;
    try {
        let userHasCardEntry = await UserHasCard.findOne({ user: userId });
        if (!userHasCardEntry) {
            res.status(400).send({msg: "Error, no existe ninguna entrada en userHasCard para este usuario"})
        } else {
            userHasCardEntry.cards.pull({ cardId });
            const deletedEntry = await userHasCardEntry.save();
            if(!deletedEntry){
                res.status(400).send({msg: "Error, no se ha podido eliminar la información de la carta"})
            } else {
                res.status(200).send(deletedEntry);
            }
        }
    } catch (error) {
        res.status(500).send(error);
    }
}

async function getCardsFromUser(req,res){
    try {
        const userId = req.session.userId;
        const cards = await UserHasCard.findOne({user: userId});
        if (!cards) {
            res.status(400).send({msg:"Error: no se ha encontrado la entrada para este usuario"})
        } else {
            res.status(200).send(cards)
        }
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports = {
    addCardToUser,
    removeCardFromUser,
    getCardsFromUser,
}
