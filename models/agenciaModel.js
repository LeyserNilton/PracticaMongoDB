const { Schema, model } = require('mongoose');

const AgenciaSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    direccion: {
        type: String
    },
    usuario: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    }
}, { collection: 'agencias' });

AgenciaSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();

    return object;
})

module.exports = model('Agencia', AgenciaSchema);