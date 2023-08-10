const mongoose = require('mongoose');

mongoose.connect('mongodb+srv:seceret_coffee:secer_coffee@cluster0.333dgax.mongodb.net');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => {
  console.log('Connected to the database');
});