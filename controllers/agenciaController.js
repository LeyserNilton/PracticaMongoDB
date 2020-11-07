const { response } = require('express');
const Agencia = require('../models/agenciaModel');

const getAgencias = async(req, res = response) => {

    const agencias = await Agencia.find().populate('usuario', 'nombre img');
    res.json({
        ok: true,
        agencias
    });
}
const crearAgencia = async(req, res = response) => {
    const uid = req.uid;

    const agencia = new Agencia({
        usuario: uid,
        ...req.body
    });

    try {

        const agenciaDB = await agencia.save();
        res.json({
            ok: true,
            agencia: agenciaDB
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({

            ok: false,
            msg: 'Error inesperado hablar con el administrador'
        });
    }


}
const actualizarAgencia = async(req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;

    try {

        const agencia = await Agencia.findById(id);
        if (!agencia) {
            return res.status(404).json({
                ok: true,
                msg: 'Agencia no existe'

            });
        }

        const cambiosAgencia = {
            ...req.body,
            usuario: uid
        }

        const agenciaActualizado = await Agencia.findByIdAndUpdate(id, cambiosAgencia, { new: true });

        return res.json({
            ok: true,
            agencia: agenciaActualizado

        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperados hable con el administrador'
        });
    }


}
const eliminarAgencia = async(req, res = response) => {
    const id = req.params.id;

    try {

        const agencia = await Agencia.findById(id);
        if (!agencia) {
            return res.status(404).json({
                ok: true,
                msg: 'Agencia no existe'

            });
        }

        await Agencia.findByIdAndDelete(id);
        return res.json({
            ok: true,
            msg: 'Agencia Eliminado'

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
    getAgencias,
    crearAgencia,
    actualizarAgencia,
    eliminarAgencia
}