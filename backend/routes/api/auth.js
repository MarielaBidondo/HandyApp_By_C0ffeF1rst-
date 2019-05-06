
const Joi = require('joi');
const config = require('config');
const bcrypt = require('bcrypt');
const { User } = require('../../models/User');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
 
router.post('/', async (req, res) => {

    // First Validate The HTTP Request
    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send( { error : error.details[0].message});
    }
 
    //  Now find the user by their email address
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
        return res.status(400).send( { error : 'Incorrect email or password.' });
    }
 
   // Then validate the Credentials in MongoDB match
    // those provided in the request
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
        return res.status(400).send( { error : 'Incorrect email or password.' } );
    }
    // Getting the json web token from the server passing to user
    const secret = config.get('jwtSecret');
    const token = jwt.sign({ _id: user._id }, secret);
	
	const returnObj = {
		token : token,
		userId : user._id
	};
	
    res.send(returnObj);
});

// Validation for login 
function validate(req) {
    const schema = {
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    };
 
    return Joi.validate(req, schema);
}
 
module.exports = router; 
