const mongoose = require('mongoose');

const reactionSchema = new mongoose.Schema({
  reactionId: {},
    //Use Mongoose's ObjectId data type
    //Default value is set to a new ObjectId
  reactionBody: {type: String, require: true, }, //280 character maximum
  username: {type: String, require: true},
  createdAt: {type: Date, default: Date.now, }, //Use a getter method to format the timestamp on query
});

//This will not be a model, but rather will be used as the reaction field's subdocument schema in the Thought model.