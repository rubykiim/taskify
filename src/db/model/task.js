const mongoose = require('mongoose');
const { Schema } = mongoose;

const taskSchema = new Schema({
    author: mongoose.ObjectId,
    type: {
        type: String,
        required: true
    },
    title: String,
    dueDate: Date,
    dueTime: Date,
    body: String,
    assignees: [mongoose.ObjectId],
    createdAt: { type: Date, default: Date.now, immutable: true }
});

const Task = mongoose.model('Task', taskSchema);