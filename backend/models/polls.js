const mongoose = require('mongoose');

const optionSchema = new mongoose.Schema({
    option: String,
    votes: {
      type: Number,
      default: 0,
    },
  });

const pollSchema = new mongoose.Schema({
    // Which user submitted the poll
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    halka: {type: String,
            unique: true,
            required: true},
    options: [optionSchema],
    voted: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    created: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Poll', pollSchema);
