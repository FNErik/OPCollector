const Task = require("../models/user");

async function saveUser(req, res){
    const newUser = new User();
    const params = req.body;

    newUser.name = params.name;
    newUser.surname = params.suranme;
    newUser.email = params.email;
    newUser.password = params.password;

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
    
}

module.exports = {
    saveUser,
}
