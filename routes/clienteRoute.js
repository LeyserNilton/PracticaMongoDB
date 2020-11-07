const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../midlewares/validarCampos');

const { validarJWT } = require('../midlewares/validarJWT');
const {
    getClientes,
    crearCliente,
    actualizarCliente,
    eliminarCliente
} = require('../controllers/clienteController');


const router = Router();

router.get('/', getClientes);


router.post('/', [
        validarJWT,
        check('nombre', 'El nombre del cliente es obligatorio').not().isEmpty(),
        validarCampos
    ],
    crearCliente);

router.put('/:id', [
        validarJWT,
        check('nombre', 'El nombre del cliente es obligatorio').not().isEmpty(),
        validarCampos
    ],
    actualizarCliente);

router.delete('/:id',
    validarJWT,
    eliminarCliente);



module.exports = router;