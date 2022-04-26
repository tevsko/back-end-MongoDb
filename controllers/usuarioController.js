const Usuario = require('../models/Usuario');
const bcryptjs = require('bcryptjs');
const axios = require('../routes/usuarios');
const {Cat} = require('../models/model');
const {validationResult} = require('express-validator');

const crearUsuarios = async (req, res) => {

    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()})
    }

    const {email,password} = req.body;
    try {
        let usuario = await Usuario.findOne({email});

        if(usuario){
            return res.status(400).json({msg: 'Usuario ya existe!'})
        }
        usuario = new Usuario(req.body);

        const salt= await bcryptjs.genSalt(10);
        usuario.password = await bcryptjs.hash(password, salt);

        await usuario.save();
        res.json('Usuario creado.!');
    } catch (error) {
        console.log(error);
        res.status(400).send('Hubo un error');
    }
}
const consultaAxios = async (req, res)=>{
    const resultado = await axios.get('https://pokeapi.co/api/v2/pokemon/ditto',{setTimeout: 10000}).catch((err)=>{
        err.origin = 'Error getting URL';
        throw err;
    });
    res.json(resultado.data)
}



const vistaUno = (req, res)=>{
    res.render('index', { title: 'Express' });
}

const vistaGatitos = async (req, res) =>{
    const gatitos = await Cat.find()
    res.json({gatitos})
}

const crearGatito = async (req, res)=>{
    const kitty = new Cat({ name: req.params.name });
    await kitty.save()
    console.log('meow')
    res.json({msg: 'meow'})
}
module.exports = {crearUsuarios, consultaAxios, vistaUno, vistaGatitos, crearGatito}