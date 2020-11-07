const { Schema, model } = require('mongoose');

//Definicion de las colecciones en mongoose (definicion del esquema de bd)
const AlquilerSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    costo: {
        type: Number
    },
    fecha_inicio: {
        type: Date
    },
    fecha_fin: {
        type: Date
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    cliente: {
        type: Schema.Types.ObjectId,
        ref: 'Cliente',
        required: true
    },
    auto: {
        type: Schema.Types.ObjectId,
        ref: 'Auto',
        required: true
    }
}, { collection: 'alquileres' }); // codigo utilizado para asignar el nombre de la colleccion en mongodb
// sino asignamos un nombre mongodb creara la coleccion asignandole una s al final


AlquilerSchema.method('toJSON', function() {
    //codigo para modificar el _id por default por uid pero solo para visualizacion en 
    //la base de datos seguira igual
    const { __v, ...object } = this.toObject();

    return object;

})

//para poder exponer esta definicion  para que pueda ser utilizado desde fuera
module.exports = model('Alquiler', AlquilerSchema);