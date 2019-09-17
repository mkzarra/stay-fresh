const mongoose = require('mongoose');
const { Schema } = mongoose;

const pantrySchema = new Schema({
  _item: { type: Schema.Types.ObjectId, ref: 'Item' },
  _user: { type: Schema.Types.ObjectId, ref: 'User'},
  itemName: String,
  category: String,
  storage: String,
  datePurchased: Date,
  expiration: Date
});

mongoose.model('pantries', pantrySchema);