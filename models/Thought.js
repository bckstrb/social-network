const mongoose = require('mongoose');
const reactionSchema = require('./Reaction');

const thoughtSchema = new mongoose.Schema({
  thoughtText: {type: String, required: true, maxlength: 280, minlength: 1}, 
  createdAt: {type: Date, default: Date.now, get: timestamp=>timestamp.toLocaleString('en-US')}, 
  username: {type: String, required: true},
  reactions: [reactionSchema] 
},
{ toJSON: { getters: true, virtuals: true }, id: false }
);

const Thought = mongoose.model('Thought', thoughtSchema);



thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
  });



module.exports = Thought;