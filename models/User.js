const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {type: String, unique: true, require: true, trim: true},
  email: {type: String, require: true, unique: true, }
  //TODO
  //thoughts: 
  //Array of `_id` values referencing the Thought model
  //friends:
  //Array of `_id` values referencing the User model (self-reference)
});

const User = mongoose.model('User', userSchema);

const handleError = (err) => console.error(err);

//Create a virtual called friendCount that retrieves the length of the user's friends array field on query.

// userSchema.virtual('friendCount').get(function () {
//     return this.friends.length;
//   });

// User.create(
//   {
    
//   },
//   (err) => (err ? handleError(err) : console.log('Created new document'))
// );

module.exports = User;
