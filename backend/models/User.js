const Joi = require('joi');
const mongoose = require('mongoose');
 
const User = mongoose.model('User', new mongoose.Schema({
//Seflf generate id
id_: mongoose.Types.ObjectId,

//Name of the user, mandatory field
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },

//DOB of the dservice mandatory field
    dateOfBirth: {
        type: String,
        required: false,
        minlength: 5,
        maxlength: 50

    },
//Address of the user
    address: {
    type: String,
    required: false,
    minlength: 5,
    maxlength: 255
//Phone required and shuld be unique
// to avoid user have more than one account
    },
    phone: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 50,
        unique: true
    },
//Email requiered and has to be unique
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
//Password requiered and has to have  a minimun of 5 
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255

    }
}));

//Function to validate user
function validateUser(user) {
    const schema = {
        
        name: Joi.string().min(5).max(50).required(),
        dateOfBirth: Joi.string().min(5).max(50),
        address: Joi.string().min(5).max(255),
        phone: Joi.string().min(8).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    };
    return Joi.validate(user, schema);
}
//we export user and validation 
exports.User = User;
exports.validate = validateUser;

