const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    nombre: {
        type: String,
        required: true,
    },
    apellido: {
        type: String,
        required: true,
    },
    cedula: {
        type: String,
        required: true,
        unique: true,
    },
    correo: {
        type: String,
        required: true,
        unique: true
    },
    telefono: {
        type: String,
        required: true,
    }
});

UserSchema.method('toJSON', function(){
    const {__v, _id, ...object} = this.toObject()
    object.id = _id
    return object
});

module.exports = model('Users', UserSchema);