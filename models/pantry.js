const mongoose = require('mongoose');
const { Schema } = mongoose;

const pantrySchema = new Schema({
    storage: String,
    _items: { type: Schema.Types.ObjectId, ref: 'Item'},
    _user: { type: Schema.Types.ObjectId, ref: 'User'}
});

mongoose.model('pantries', pantrySchema);