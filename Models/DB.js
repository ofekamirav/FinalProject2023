const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/secretCoffee_project', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => {
  console.log('Connected to the database');
});