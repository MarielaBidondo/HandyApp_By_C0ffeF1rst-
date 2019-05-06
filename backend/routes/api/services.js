const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const mongoose = require("mongoose");

// Service Model
const Service = require('../../models/Services');
const { User, validate } = require('../../models/User');

// Get all services 
router.get('/', (req, res) => {
Service.find()
	.populate('user','id name dateOfBirth')
    .sort({ date: -1 })
    .then(services => res.json(services));
});

// Find a service given a value: SEARCH functionality
router.get('/find/:value', (req, res) => {
	
	const value = req.params.value;
	Service.find( { 'serviceName' : { '$regex' : value , '$options' : 'i' }  } )
		.populate('user','id name dateOfBirth')
		.sort({ date: -1 })
		.then(services => res.json(services));
		
});

// Get all services by user 
router.get('/user/:userId', (req, res) => {
	
	const userId = req.params.userId;
	console.log("User Id " + userId);
	Service.find( { 'user' : userId } )
		.sort({ date: -1 })
		.then(services => res.json(services));
		
});

// GET a Service by ID 
  router.get("/:servicesId", (req, res, next) => {
    const id = req.params.servicesId;
    Services.findById(id)
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
    


// POST a new Service, auth 

router.post("/", auth, (req, res, next) => {
	
  const userId = req.body.user._id;
  console.log("User Id : " + userId);
  let userTemp = null;
  User.findById(userId)
    .exec()
    .then(doc => {
      console.log(doc);
      if(doc){
		userTemp = doc;
		const service = new Services({
			_id: new mongoose.Types.ObjectId(),
			serviceName: req.body.serviceName,
			description: req.body.description,
			price: req.body.price,
			location: req.body.location,
			user : userTemp
			});
		service
		.save()
		.then( message =>{
			res.status(200).json({message: "Service has been created"})
		}).catch(err => {
			console.log(err);
			res.status(500).json({
				error: err
			});
		});
      }else{
		  res.status(404).json({message:"User not available!"});
	  }
    }).catch(err =>{
      console.log(err);
	  res.status(404).json({message:"User not available!"});
    })
});

// DELETE A SERVICE: Passing a token
router.delete('/:servicesId', auth, (req, res, next) => {
  const id = req.params.servicesId;
  Services.remove({_id: id})
  .exec()
  .then(result => {
    res.status(200).json(result);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      error: err
    });
  })
});

//UPDATE A SERVICE: passing a token
router.patch("/:servicesId", auth, (req, res, next) => {
  const id = req.params.servicesId;
  const updateOperations = {};
  for(const operations of req.body){
    updateOperations[operations.propsName] = operations.value;
  }
  Services.update({_id: id}, {$set: updateOperations})
      .exec()
      .then((result => {
      status(200).json({message: "has been updated"});
      })
    .catch(err =>{
      console.log(err);
      res.status(500).json({
        error: err
      });
    }));
  });

 
module.exports = router;
