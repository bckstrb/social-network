const { User, Thought } = require("../models");

const userController = {
  getUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  getSgleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .then((user) => {
        if (!user)
          res.status(404).json({ error: "No user exists with that ID" });
        res.json(user);
      })
      .catch((err) => res.status(500).json(err));
  },
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((user) => {
        if (!user)
          res.status(404).json({ error: "No user exists with that ID" });
        res.json(user);
      })
      .catch((err) => res.status(500).json(err));
  },
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((user) => {
        if (!user)
          res.status(404).json({ error: "No user exists with that ID" });
        // res.json(user);
        return Thought.deleteMany({ _id: { $in: user.thoughts } });
      })
      .then(() => {
        res.json({ message: "User Deleted" });
      })
      .catch((err) => res.status(500).json(err));
  },
  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { new: true }
    )
      .then((user) => {
        if (!user)
          res.status(404).json({ error: "No user exists with that ID" });
        res.json(user);
      })
      .catch((err) => res.status(500).json(err));
  },
  deleteFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { new: true }
    )
      .then((user) => {
        if (!user)
          res.status(404).json({ error: "No user exists with that ID" });
        res.json(user);
      })
      .catch((err) => res.status(500).json(err));
  },
};

module.exports = userController;
