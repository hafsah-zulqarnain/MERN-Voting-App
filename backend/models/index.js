const mongoose = require('mongoose')

mongoose.set('debug', true);
// Async javascript will be easier to use with this
mongoose.Promise = global.Promise;
const User = require('./user');
const Poll = require('./polls')

async function connectToDatabase() {
    try {
      await mongoose.connect(process.env.DB, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
      console.log('Connected to MongoDB');
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
    }
  }
  
  module.exports ={
    User,Poll,connectToDatabase};
  