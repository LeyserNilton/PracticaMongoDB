const { response } = require('express');
const Alquiler = require('../models/alquilerModel');

const getAlquileres = async(req, res = response) => {
    const alquileres = await Alquiler.find().
    populate('usuario', 'nombre img').
    populate('cliente', 'nombre direccion').
    populate('auto', 'modelo marca');

    res.json({
        ok: true,
        alquileres
    });
}
const crearAlquiler = async(req, res = response) => {
    const uid = req.uid;

    const alquiler = new Alquiler({
        usuario: uid,
        ...req.body
    });

    try {

        const alquilerDB = await alquiler.save();
        res.json({
            ok: true,
            alquiler: alquilerDB
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({

            ok: false,
            msg: 'Error inesperado hablar con el administrador'
        });
    }
}
const actualizarAlquiler = async(req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;

    try {

        const alquiler = await Alquiler.findById(id);
        if (!alquiler) {
            return res.status(404).json({
                ok: true,
                msg: 'Alquiler no existe'

            });
        }

        const cambiosAlquiler = {
            ...req.body,
            usuario: uid
        }

        const alquilerActualizado = await Alquiler.findByIdAndUpdate(id, cambiosAlquiler, { new: true });

        return res.json({
            ok: true,
            alquiler: alquilerActualizado

        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperados hable con el administrador'
        });
    }
}
const eliminarAlquiler = async(req, res = response) => {
    const id = req.params.id;

    try {

        const alquiler = await Alquiler.findById(id);
        if (!alquiler) {
            return res.status(404).json({
                ok: true,
                msg: 'Alquiler no existe'

            });
        }

        await Alquiler.findByIdAndDelete(id);
        return res.json({
            ok: true,
            msg: 'Alquiler Eliminado'

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
    getAlquileres,
    crearAlquiler,
    actualizarAlquiler,
    eliminarAlquiler
}