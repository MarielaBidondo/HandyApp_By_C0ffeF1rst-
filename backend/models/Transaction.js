const mongoose = require('mongoose');
//
const transactionSchema = mongoose.Schema({
    //self generate id 
    _id: mongoose.Schema.Types.ObjectId,
    //Service object that already include a user that owns the service
    services: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'services', required: true },
    //id of the user that wants to get the service.
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required:true},
    paymentMethod:{
        type:[String],
        enum:["Cash","Card","Token","favor exchange", "Other"],
    },
    //Quantity of the services
    quantity: {
        type: Number, 
        default: 1
        }
              
});

//ad createdAt and updateAdt timestamps
transactionSchema.set('timestamps', true);
//Export the schema 
module.exports = mongoose.model('Transaction', transactionSchema);