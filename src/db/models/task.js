const mongoose = require('mongoose');
const { Schema } = mongoose;

const taskSchema = new Schema({
    channel: String,
    title: String,
    description: String,
    deadline: String,
    status: {
        type: String,
        enum: ['Pending', 'In Progress', 'Complete']
    },
    author: {
        type: mongoose.ObjectId,
        ref: 'User',
    },
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
