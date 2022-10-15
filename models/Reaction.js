const mongoose = require("mongoose");

const reactionSchema = new mongoose.Schema({
  reactionId: {
    type: mongoose.Schema.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId(),
  },
  reactionBody: { type: String, required: true, maxlength: 280 },
  username: { type: String, require: true },
  createdAt: { type: Date, default: Date.now, get: timestamp=>timestamp.toLocaleString('en-US') }
},
{ toJSON: { getters: true }, id: false }
);

module.exports = reactionSchema


