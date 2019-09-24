const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = require('./user');

const emailSchema = new Schema({
  title: String,
  body: String,
  subject: String,
  dateSent: Date
});

mongoose.model('emails', emailSchema);