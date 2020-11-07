const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../midlewares/validarCampos');

const { validarJWT } = require('../midlewares/validarJWT');
const {
    getAutos,
    crearAuto,
    actualizarAuto,
    eliminarAuto
} = require('../controllers/autoController');


const router = Router();

router.get('/', getAutos);


router.post('/', [
        validarJWT,
        check('marca', 'El nombre del auto es obligatorio').not().isEmpty(),
        validarCampos
    ],
    crearAuto);

router.put('/:id', [
        validarJWT,
        check('marca', 'El nombre del auto es obligatorio').not().isEmpty(),
        validarCampos
    ],
    actualizarAuto);

router.delete('/:id',
    validarJWT,
    eliminarAuto);



module.exports = router;