function getHello(req,res){
    res.status(200).send({
        msg: "Hola mundo desde controllers!"
    })
}


module.exports = {
    getHello,
};
