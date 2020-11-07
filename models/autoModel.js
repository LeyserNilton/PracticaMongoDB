const { Schema, model } = require('mongoose');

const AutoSchema = Schema({
    marca: {
        type: String,
        required: true
    },
    modelo: {
        type: String
    },
    color: {
        type: String
    },
    usuario: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    }
}, { collection: 'autos' });


AutoSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();

    return object;

})

module.exports = model('Auto', AutoSchema);