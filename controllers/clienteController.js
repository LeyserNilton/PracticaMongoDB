const { response } = require('express');
const Cliente = require('../models/clienteModel');

const getClientes = async(req, res = response) => {

    const clientes = await Cliente.find().populate('usuario', 'nombre img');
    res.json({
        ok: true,
        clientes
    });
}
const crearCliente = async(req, res = response) => {
    const uid = req.uid;

    const cliente = new Cliente({
        usuario: uid,
        ...req.body
    });

    try {

        const clienteDB = await cliente.save();
        res.json({
            ok: true,
            cliente: clienteDB
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({

            ok: false,
            msg: 'Error inesperado hablar con el administrador'
        });
    }


}
const actualizarCliente = async(req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;

    try {

        const cliente = await Cliente.findById(id);
        if (!cliente) {
            return res.status(404).json({
                ok: true,
                msg: 'Cliente no existe'

            });
        }

        const cambiosCliente = {
            ...req.body,
            usuario: uid
        }

        const clienteActualizado = await Cliente.findByIdAndUpdate(id, cambiosCliente, { new: true });

        return res.json({
            ok: true,
            cliente: clienteActualizado

        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperados hable con el administrador'
        });
    }


}
const eliminarCliente = async(req, res = response) => {
    const id = req.params.id;

    try {

        const cliente = await Cliente.findById(id);
        if (!cliente) {
            return res.status(404).json({
                ok: true,
                msg: 'Cliente no existe'

            });
        }

        await Cliente.findByIdAndDelete(id);
        return res.json({
            ok: true,
            msg: 'Cliente Eliminado'

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
    getClientes,
    crearCliente,
    actualizarCliente,
    eliminarCliente
}