const User = require("../models/user");
const { createHash } = require('node:crypto');
const hash = createHash('sha256');


async function saveUser(req, res){
    const newUser = new User();
    const params = req.body;

    newUser.name = params.name;
    newUser.surname = params.suranme;
    newUser.email = params.email;
    newUser.password = hash.update(params.password);

    try {
        const userStore = await newUser.save();
        if(!userStore){
            res.status(400).send({msg: "ERROR: No se ha podido guardar la informacion del usuario"})
        } else {
            restart.status(200).send({user: userStore});
        }
    } catch (error) {
        restart.status(500).send(error);
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
    const password = hash.update(req.body.pass);
    try {
        const user = await User.findOne({email: email, password: password})
        if (!user) {
            res.status(400).send({msg: "Error, las credenciales no coinciden"})
        } else {
            req.session.user = user;
            res.status(200).send(user);
        }
    } catch (error) {
        
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
}
