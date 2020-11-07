/*
Investigadores
ruta: /api/investigadores
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../midlewares/validarCampos');
const {
    getAlquileres,
    crearAlquiler,
    actualizarAlquiler,
    eliminarAlquiler
} = require('../controllers/alquilerController');

const { validarJWT } = require('../midlewares/validarJWT');


const router = Router();

router.get('/', getAlquileres);


router.post('/', [
        validarJWT,
        check('nombre', 'El nombre del alquiler es obligatorio').not().isEmpty(),
        check('cliente', 'El id del cliente debe ser valido').isMongoId(),
        check('auto', 'El id del auto debe ser valido').isMongoId(),
        validarCampos
    ],
    crearAlquiler);

router.put('/:id', [
        validarJWT,
        check('nombre', 'El nombre del alquiler es obligatorio').not().isEmpty(),
        check('cliente', 'El id del cliente debe ser valido').isMongoId(),
        check('auto', 'El id del auto debe ser valido').isMongoId(),
        validarCampos
    ],
    actualizarAlquiler);

router.delete('/:id', validarJWT, eliminarAlquiler);



module.exports = router; //para exportar