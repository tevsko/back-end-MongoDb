const Usuario = require('../models/Usuario');
const bcryptjs = require('bcryptjs');
const {validationResult} = require('express-validator');

exports.crearUsuarios = async (req, res) => {

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