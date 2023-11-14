const { TasksView } = require('../user-interface/app-home/tasks-view');
const mongoose = require('mongoose');
const User = require('../db/models/user');

const reloadAppHome = async (client, slackUserID, slackUserFirstName, slackWorkspaceID) => {
    try {
        console.log('slackUserID', slackUserID)
        const user = await User.findOne({ userId: slackUserID }).populate('tasks').exec();
        if (!user) {
            user = new User({
                _id: new mongoose.Types.ObjectId(),
                userId: slackUserID,
                firstName: slackUserFirstName
            });
            await user.save();
            console.log('User saved!')
        } else {
            console.log('User found!');
        }

        const allTasks = user.tasks;

        await client.views.publish({
            user_id: slackUserID,
            view: TasksView(user, allTasks),
        });
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
    }
};

exports.reloadAppHome = reloadAppHome 