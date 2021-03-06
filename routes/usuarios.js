const express = require('express');
const router = express.Router();
const usuariosControllers = require('../controllers/usuarioController');
const consultaAxios = require('axios')
const {vistaGatitos, crearGatito} = require('../controllers/usuarioController');
const {check} = require('express-validator');

router.get('/ver', vistaGatitos);
router.post('/crear/:name', crearGatito);
router.get('/axios', consultaAxios);
router.post('/',
[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('email','Agregar un email valido').isEmail(),
    check('password', 'El password debe ser minimo 6 caracteres').isLength({min: 6})
],
    usuariosControllers.crearUsuarios
);
module.exports = router;