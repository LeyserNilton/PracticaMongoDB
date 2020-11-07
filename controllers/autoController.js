const { response } = require('express');
const Auto = require('../models/autoModel');

const getAutos = async(req, res = response) => {

    const autos = await Auto.find().populate('usuario', 'nombre img');
    res.json({
        ok: true,
        autos
    });
}
const crearAuto = async(req, res = response) => {
    const uid = req.uid;

    const auto = new Auto({
        usuario: uid,
        ...req.body
    });

    try {

        const autoDB = await auto.save();
        res.json({
            ok: true,
            auto: autoDB
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({

            ok: false,
            msg: 'Error inesperado hablar con el administrador'
        });
    }


}
const actualizarAuto = async(req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;

    try {

        const auto = await Auto.findById(id);
        if (!auto) {
            return res.status(404).json({
                ok: true,
                msg: 'Auto no existe'

            });
        }

        const cambiosAuto = {
            ...req.body,
            usuario: uid
        }

        const autoActualizado = await Auto.findByIdAndUpdate(id, cambiosAuto, { new: true });

        return res.json({
            ok: true,
            auto: autoActualizado

        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperados hable con el administrador'
        });
    }


}
const eliminarAuto = async(req, res = response) => {
    const id = req.params.id;

    try {

        const auto = await Auto.findById(id);
        if (!auto) {
            return res.status(404).json({
                ok: true,
                msg: 'Auto no existe'

            });
        }

        await Auto.findByIdAndDelete(id);
        return res.json({
            ok: true,
            msg: 'Auto Eliminado'

        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperados hable con el administrador'
        });
    }
}


module.exports = {
    getAutos,
    crearAuto,
    actualizarAuto,
    eliminarAuto
}