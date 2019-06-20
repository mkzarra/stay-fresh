const mongoose = require('mongoose');
const { Schema } = mongoose;

const itemSchema = new Schema({
  itemName: String,
  category: String,
  storage: String
});

mongoose.model('items', itemSchema);