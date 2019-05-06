
const { User, validate } = require('../../models/User');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const auth = require('../../middleware/auth');
 
router.get('/', (req, res) => {
  User.find()
      .sort({ date: -1 })
      .then(users => res.json(users));
  });

router.post('/', async (req, res) => {
    // First Validate The Request
    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send({ error : error.details[0].message } );
    }
 
    // Check if this user already exisits
    let user = await User.findOne({ email: req.body.email });
    if (user) {
        return res.status(400).send( { error : 'Email already exisits!' });
    } else {
        // Insert the new user if they do not exist yet
        user = new User({
          
            name: req.body.name,
            dateOfBirth: req.body.dateOfBirth,
            address: req.body.address,
            phone: req.body.phone,
            email: req.body.email,
            password: req.body.password

        });
     const salt = await bcrypt.genSalt(10);
     user.password = await bcrypt.hash(user.password, salt); 
        user.save();
        res.send(user);
    }
});

// GET a User by ID 
router.get("/:userId", (req, res, next) => {
    const id = req.params.userId;
    User.findById(id)
    .exec()
    .then(doc => {
      console.log(doc);
      if(doc){
        res.status(200).json(doc);
      } else {
        res.status(404).json({message:"The entry is not valid sorry!"})
      }
    })
    .catch(err =>{
      console.log(err);
      res.status(500).json({error: err});
    })
 });

  // DELETE A USER: Passing a token 
router.delete('/:userId', auth, (req, res, next) => {
    const id = req.params.userId;
    User.remove({_id: id})
    .exec()
    .then(result => {
      res.status(200).json({message:"The entry is not valid sorry!"});
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    })
  });

  //UPDATE A USER: Passing a token
router.patch("/:userId", auth, (req, res, next) => {
    
	const id = req.params.userId;
    const updateOperations = {};
	
	for (const [propsName, value] of Object.entries(req.body)) {
		updateOperations[propsName] = value;
	}
    User.update({_id: id}, {$set: updateOperations})
        .exec()
        .then(result => {
        res.status(200).json({message: "has been updated"});
        })
      .catch(err =>{
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
    });
 
module.exports = router;