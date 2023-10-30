const mongoose = require('mongoose');
const { Schema } = mongoose;

const taskSchema = new Schema({
    author: {
        type: mongoose.ObjectId,
        ref: 'User',
    },
    type: {
        type: String,
        // required: true
    },
    title: String,
    dueDate: Date,
    dueTime: Date,
    description: String,
    assignedUsers: [
        {
            type: mongoose.ObjectId,
            ref: 'User',
        },
    ],
    createdAt: { type: Date, default: Date.now, immutable: true },
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
