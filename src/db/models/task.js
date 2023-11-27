const mongoose = require('mongoose');
const { Schema } = mongoose;

const taskSchema = new Schema({
    _id: mongoose.ObjectId,
    channelId: String,
    channelName: String,
    title: String,
    description: String,
    due: Schema.Types.Mixed,
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
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
