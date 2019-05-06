const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema for Services
const Service = new Schema({
//self generate id 
    _id: mongoose.Types.ObjectId,
//Required parameter
	serviceName: {
		type: String,
		required: 'Enter a name'
	},
//Required parameter	
	description: {
		type: String,
		required: 'Enter a decription'
	},
//No required parameter	
	price: {
		type: String            
	},
//No required parameter	
	location: {
		type: String            
	},
//Service shoud include a valid user that create service
	user: { 
		type: mongoose.Schema.Types.ObjectId, 
		ref: 'User', required: true 
	},	
});
//Export the schema
module.exports = Services = mongoose.model('services', Service);
