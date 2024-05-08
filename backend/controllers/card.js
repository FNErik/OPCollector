const Card = require("../models/card");

async function createCard(req, res) {
    const newCard = new Card(); 
    const params = req.body;

    newCard.name = params.name;
    newCard.cardCollection = params.cardCollection;
    newCard.collectionNumber = params.collectionNumber;
    newCard.color = params.color;
    newCard.rarity = params.rarity;

    try {
        const cardStore = await newCard.save();

        if (!cardStore) {
            res.status(400).send({ msg: "Error al guardar la carta" });
        } else {
            res.status(200).send({ task: cardStore }); 
        }
    } catch (error) {
        res.status(500).send(error);
    }
}

async function getCards(req,res){
    try {
        const cards = await Card.find().sort({created_at: -1});
        if(!cards){
            res.status(400).send({msg:"Error al obtener tareas"})
        }else{
            res.status(200).send(cards);
        }
    } catch (error) {
        res.status(500).send(error)
    }
    console.log("Obteniendo tareas")
}

async function getCard(req,res){
    const id = req.params.id;
    try {
        const tasks = await Card.findById(id)
        if(!tasks){
            res.status(400).send({msg:"Error al obtener la tarea"})
        }else{
            res.status(200).send(tasks);
        }
    } catch (error) {
        res.status(500).send(error)
    }
    console.log("Obteniendo carta")
}

async function updateCard(req,res){
    const id = req.params.id;
    const params = req.body;

    try {
        const cards = await Card.findByIdAndUpdate(id, params)

        if(!cards){
            res.status(400).send({msg:"Error al obtener la tarea"})
        }else{
            res.status(200).send({msg: "Actualizacacion completada"});
        }
    } catch (error) {
        res.status(500).send(error)
    }
    console.log("Obteniendo tarea")
}

async function deleteCard(req,res){
    const id = req.params.id;

    try {
        const cards = await Task.findByIdAndDelete(id)

        if(!cards){
            res.status(400).send({msg:"Error al obtener la tarea"})
        }else{
            res.status(200).send({msg: "Eliminacion completada"});
        }
    } catch (error) {
        res.status(500).send(error)
    }
    console.log("Obteniendo tarea")
}

module.exports = {
    createCard,
    getCard,
    getCards,
    updateCard,
    deleteCard,
}
