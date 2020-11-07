const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../midlewares/validarCampos');

const { validarJWT } = require('../midlewares/validarJWT');
const {
    getAgencias,
    crearAgencia,
    actualizarAgencia,
    eliminarAgencia
} = require('../controllers/agenciaController');


const router = Router();

router.get('/', getAgencias);


router.post('/', [
        validarJWT,
        check('nombre', 'El nombre de la agencia es obligatorio').not().isEmpty(),
        validarCampos
    ],
    crearAgencia);

router.put('/:id', [
        validarJWT,
        check('nombre', 'El nombre de la agencia es obligatorio').not().isEmpty(),
        validarCampos
    ],
    actualizarAgencia);

router.delete('/:id',
    validarJWT,
    eliminarAgencia);



module.exports = router;