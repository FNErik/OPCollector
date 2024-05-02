const Task = require("../models/task");

async function createTask(req, res) {
    const newTask = new Task(); 
    const params = req.body;

    newTask.title = params.title;
    newTask.description = params.description;

    try {
        const taskStore = await newTask.save();

        if (!taskStore) {
            res.status(400).send({ msg: "No se ha guardado la tarea" });
        } else {
            res.status(200).send({ task: taskStore }); 
        }
    } catch (error) {
        res.status(500).send(error);
    }
}

async function getTasks(req,res){
    try {
        const tasks = await Task.find().sort({created_at: -1});
        if(!tasks){
            res.status(400).send({msg:"Error al obtener tareas"})
        }else{
            res.status(200).send(tasks);
        }
    } catch (error) {
        res.status(500).send(error)
    }
    console.log("Obteniendo tareas")
}

async function getTask(req,res){
    const id = req.params.id;
    try {
        const tasks = await Task.findById(id)
        if(!tasks){
            res.status(400).send({msg:"Error al obtener la tarea"})
        }else{
            res.status(200).send(tasks);
        }
    } catch (error) {
        res.status(500).send(error)
    }
    console.log("Obteniendo tarea")
}

async function updateTask(req,res){
    const id = req.params.id;
    const params = req.body;

    try {
        const tasks = await Task.findByIdAndUpdate(id, params)

        if(!tasks){
            res.status(400).send({msg:"Error al obtener la tarea"})
        }else{
            res.status(200).send({msg: "Actualizacacion completada"});
        }
    } catch (error) {
        res.status(500).send(error)
    }
    console.log("Obteniendo tarea")
}

async function deleteTask(req,res){
    const id = req.params.id;

    try {
        const tasks = await Task.findByIdAndDelete(id)

        if(!tasks){
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
    createTask,
    getTask,
    getTasks,
    updateTask,
    deleteTask,
}
