const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const config = require('config');
var cors = require('cors')


const app = express();
const users = require('./routes/api/users');
const services = require('./routes/api/services');
const transactions = require('./routes/api/transactions');
const auth = require('./routes/api/auth');

app.use(cors());

// Bodyparser Middleware
app.use(express.json());

// DB Config
const db = config.get('mongoURI');

// Connect to Mongo
mongoose
  .connect(db, { 
    useNewUrlParser: true,
    useCreateIndex: true
  }) // Adding new mongo url parser
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

// Use Routes
app.use('/api/services', services);
app.use('api/services/:id', services);
app.use('/api/users',users);
app.use('/api/users/:id', users);
app.use('/api/transactions', transactions);
app.use('/api/auth',auth);

const port = 2700;

app.listen(port, () => console.log(`Server started on port ${port}`));
