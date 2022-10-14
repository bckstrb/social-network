const mongoose = require('mongoose');

const thoughtSchema = new mongoose.Schema({
  thoughtText: {type: String, require: true, maxLength: 280}, 
  createdAt: {type: Date, default: Date.now, }, //Use a getter method to format the timestamp on query
  // you may also optionally use a JavaScript date library of your choice or the native JavaScript Date object to format timestamps
  username: {type: String, require: true},
  reactions: {} //Array of nested documents created with the reactionSchema
});

const Thought = mongoose.model('Thought', thoughtSchema);

const handleError = (err) => console.error(err);

// Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query.

// thoughtSchema.virtual('reactionCount').get(function () {
//     return this.reactions.length;
//   });

// Thought.create(
//   {
    
//   },
//   (err) => (err ? handleError(err) : console.log('Created new document'))
// );

module.exports = thought;