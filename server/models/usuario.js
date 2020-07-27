const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


let rolesValidos = {
    values:['ADMIN_ROLE','USER_ROLE'],
    message:'{VALUE} no es un rol válido'
}


let Schema = mongoose.Schema;

let usuarioSchema = new Schema({
    nombre:{
        type: String,
        required: [true, 'El nombre es necesario']
    },
    email:{
        type: String,
        unique: true,
        required :[true, 'El email es necesario']
    },
    password:{
        type: String,
        required: [true,'La contraseña es obligatoria']
    },
    img:{
        type: String,
        required:false
    },
    role:{
        type: String,
        default:'USER_ROLE',
        enum: rolesValidos
    },
    estado:{
        type: Boolean,
        default: true
    },
    google:{
        type: Boolean,
        default: false
    }
});

// el metodo toJSON siempre se llama cuando se intenta imprimir
usuarioSchema.methods.toJSON = function(){
    //obtenemos lo que contenga el esquema en ese momento
    let user = this;
    // obtenemos todas las propiedades y metodos del objeto
    let userObject = user.toObject();
    delete userObject.password;

    return userObject;
}

usuarioSchema.plugin(uniqueValidator,{message:'{PATH} debe de ser único'})

module.exports = mongoose.model('Usuario',usuarioSchema);