const { Thought, Reaction } = require("../models");

const thoughtController = {
  getThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .then((thought) => res.json(thought))
      .catch((err) => res.status(500).json(err));
  },
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => res.json(thought))
      .catch((err = res.status(500).json(err)));
  },
  updateThought(req, res) {
    Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $set: req.body })
      .then((thought) => {
        if (!thought)
          res.status(404).json({ error: "No thought exists with that ID" });
        res.json(thought);
      })
      .catch((err) => res.status(500).json(err));
  },
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((thought) => {
        if (!thought)
          res.status(404).json({ error: "No thought exists with that ID" });
        return Reaction.deleteMany({ _id: { $in: thought.reactions } });
      })
      .then(() => {
        res.json({ message: "Thought Deleted" });
      })
      .catch((err) => res.status(500).json(err));
  },
  createReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.params.reactionId } },
      { new: true }
    )
      .then((thought) => {
        if (!thought)
          res.status(404).json({ error: "No thought exists with that ID" });
        res.json(thought);
      })
      .catch((err) => res.status(500).json(err));
  },
  deleteReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: req.params.reactionId } },
      { new: true }
    )
      .then((thought) => {
        if (!thought)
          res.status(404).json({ error: "No thought exists with that ID" });
        res.json(thought);
      })
      .catch((err) => res.status(500).json(err));
  },
};

module.exports = thoughtController; 
