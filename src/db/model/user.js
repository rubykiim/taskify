const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    _id: mongoose.ObjectId,
    userId: String,
    tasks: [
        {
            type: mongoose.ObjectId,
            ref: 'Task',
        },
    ],
});

const User = mongoose.model('User', userSchema);

module.exports = User;
