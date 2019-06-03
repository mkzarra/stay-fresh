const mongoose = require('mongoose');
const { Schema } = mongoose;

const itemSchema = new Schema({
  itemName: String,
  category: String,
  storage: String,
  datePurchased: Date,
  expiration: Date
});

mongoose.model('items', itemSchema);