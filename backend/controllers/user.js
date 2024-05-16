const User = require("../models/user");
const UserHasCard = require("../models/userHasCard");
const DeckBuilder = require("../models/deckBuilder")

const { createHash } = require('node:crypto');
const hash = createHash('sha256');


async function saveUser(req, res){
    const newUser = new User();
    const params = req.body;

    newUser.name = params.name;
    newUser.surname = params.surname;
    newUser.email = params.email;

    // Calcula el hash de la contraseña
    const hash = createHash('sha256');
    hash.update(params.password);
    newUser.password = hash.digest('hex');

    try {
        const userStore = await newUser.save();
        if(!userStore){
            res.status(400).send({msg: "ERROR: No se ha podido guardar la informacion del usuario"})
        } else {
            const newUserCardEntry = new UserHasCard({
                user: userStore._id,
                cards: [] 
            });
            const userHasCardCheck = await newUserCardEntry.save();
            const newDeckBuilder = new DeckBuilder({
                //Esto recibe el id del usuario recien creado para generar una entrada nueva
                user: userStore._id,
                decks: [] 
            });
            const deckBuilderCheck = await newDeckBuilder.save();
            if (!userHasCardCheck || !newDeckBuilder) {
                res.status(400).send({msg: "ERROR: No se ha podido crear la entrada en la colección DeckBuilder o en userHasCard"})
            } else {
                res.status(200).send({user: userStore, userHasCard: userHasCardCheck, deckBuilder: deckBuilderCheck});
            }
        }
    } catch (error) {
        res.status(500).send(error);
    }
}

async function getUser(req,res){
    try {
        const user = await User.findById(req.params.userId);
        if (!user) {
            res.status(400).send({msg:"Error: No se ha encontrado el usuario"});
        } else {
            res.status(200).send(user);
        }
    } catch (error){
        res.status(500).send(error);
    }
}

async function logInUser(req,res){
    const email = req.body.email;
    const password = req.body.pass;

    console.log(password);
    console.log(typeof password);
    // Calcula el hash de la contraseña
    const hash = createHash('sha256');
    hash.update(password);
    const hashedPassword = hash.digest('hex');

    try {
        const user = await User.findOne({email: email, password: hashedPassword})
        if (!user) {
            res.status(400).send({msg: "Error, las credenciales no coinciden"})
        } else {
            res.status(200).send(user);
        }
    } catch (error) {
        res.status(500).send(error);
    }
}

async function deleteUser(req,res){
    const id = req.body.id;
    try {
        const updatedUser = await Usuario.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
        if (!updatedUser) {
            res.status(400).send({msg:"Error: Usuario no encontrado"})
        } else {
            res.json({ success: true});
        }
    } catch (error) {
        res.status(500).send(error);
    }
}

async function updateUser(req,res){
    const id = req.params.id;
    const params = req.body;

    try {
        const tasks = await User.findByIdAndUpdate(id, params)

        if(!tasks){
            res.status(400).send({msg:"Error al obtener el usuario"})
        }else{
            res.status(200).send({msg: "Actualizacacion completada"});
        }
    } catch (error) {
        res.status(500).send(error)
    }
}



module.exports = {
    saveUser,
    logInUser,
    deleteUser,
    updateUser,
    getUser,
}
