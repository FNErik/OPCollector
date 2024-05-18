const Card = require("../models/card");

async function createCard(req, res) {
    const newCard = new Card(); 
    const params = req.body;

    newCard.name = params.name;
    newCard.type = params.type;
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
        const card = await Card.findById(id)
        if(!card){
            res.status(400).send({msg:"Error al obtener la tarea"})
        }else{
            res.status(200).send(card);
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

async function filterCard(req, res){
    try {
        const { 
            name,
            type, 
            cardCollection, 
            collectionNumber, 
            color, 
            rarity } = req.body;

        const filter = {};
        if (name) filter.name = { $regex: new RegExp(name, 'i') };
        console.log(type); // YO CREO QUE LA COSA VA POR AQUI 
        const filterReg = new RegExp(type, 'i')
        if (Array.isArray(type) && type.length > 0) filter.type = { $in: [filterReg] };
        if (cardCollection) filter.cardCollection = { $regex: new RegExp(cardCollection, 'i') };
        if (collectionNumber) filter.collectionNumber = collectionNumber;
        if (Array.isArray(color) && color.length > 0) filter.color = { $in: color };
        if (Array.isArray(rarity) && rarity.length > 0) filter.rarity = { $in: rarity };
        const cards = await Card.find(filter);
            console.log(filter);
        res.json(cards);
      } catch (error) {
        console.error(error);
        res.status(500).json(error);
      }
}

async function getDistinctCollections(req, res) {
    try {
        const distinctCollections = await Card.distinct('cardCollection');

        res.status(200).json({ collections: distinctCollections });
    } catch (error) {
        console.error("Error al obtener las colecciones de cartas:", error);
        res.status(500).json({ error: "Error al obtener las colecciones de cartas" });
    }
}

async function getDistinctTypes(req, res) {
    try {
        const distinctTypes = await Card.distinct('type');
        let types = []; // Inicializa types como un array vacío
        distinctTypes.forEach(typesResult => {
            const splittedTypes = typesResult.split('/');
            splittedTypes.forEach(splittedType => {
                if (!types.includes(splittedType.trim())) {
                    types.push(splittedType.trim());
                }
            });
        });
        res.status(200).json({ types });
    } catch (error) {
        console.error("Error al obtener las colecciones de cartas:", error);
        res.status(500).json({ error: "Error al obtener las colecciones de cartas" });
    }
}

async function getDistinctNames(req, res) {
    try {
        const distinctNames = await Card.distinct('name');
        let names = []; // Inicializa names como un array vacío
        distinctNames.forEach(namesResult => {
            if (!names.includes(namesResult.trim())) {
                names.push(namesResult.trim());
            }
        });
        res.status(200).json({ names });
    } catch (error) {
        console.error("Error al obtener las colecciones de cartas:", error);
        res.status(500).json({ error: "Error al obtener las colecciones de cartas" });
    }
}

module.exports = {
    createCard,
    getCard,
    getCards,
    updateCard,
    deleteCard,
    filterCard,
    getDistinctCollections,
    getDistinctTypes,
    getDistinctNames,
}
