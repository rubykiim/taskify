const mongoose = require('mongoose');
const User = require('../db/model/user')
const Task = require('../db/model/task')
const { Divider } = require('../components/divider')
const { Margin } = require('../components/margin')
const { getUserInfo } = require('../lib/get-user-info')
const { generateTaskBlock } = require('../lib/generate-task-block')

const appHomeOpenedCallback = async ({ event, client, logger }) => {
    const userId = event.user
    // console.log(userId)

    !client && console.log('client error')

    const userData = await getUserInfo({ client, userId })
    // console.log(userData)

    // DB search
    try {
        const user = await User.findOne({ userId }).populate('tasks').exec();
        if (!user) {
            user = new User({
                _id: new mongoose.Types.ObjectId(),
                userId: userId
            });
            await user.save();
            console.log('User saved!')
        } else {
            console.log('User found!');
        }
        const tasks = user.tasks;
        console.log('User task desc:', tasks[0].description);


        // Iterface
        let view = {
            type: "home",
            blocks: [
                {
                    "type": "header",
                    "text": {
                        "type": "plain_text",
                        "text": "My Tasks",
                        "emoji": true
                    }
                },
                Margin,
                {
                    "type": "actions",
                    "elements": [
                        {
                            "type": "channels_select",
                            "placeholder": {
                                "type": "plain_text",
                                "text": "Select a channel",
                                "emoji": true
                            },
                            "initial_channel": "C12345678",
                            "action_id": "actionId-2"
                        }
                    ]
                },
                {
                    type: "section",
                    text: {
                        type: "mrkdwn",
                        text: `*To do*`
                    }
                },
                Divider,
                {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": `*Midterm Survey*\n*Due:* 10 Nov, 10pm\n*Assigned by:* <@${user.userId}>\n*Assignee:* All channel members`
                    },
                    "accessory": {
                        "type": "overflow",
                        "options": [
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "Mark as complete",
                                    "emoji": true
                                },
                                "value": "value-0"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "View details",
                                    "emoji": true
                                },
                                "value": "value-1"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "Edit",
                                    "emoji": true
                                },
                                "value": "value-2"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "Delete task",
                                    "emoji": true
                                },
                                "value": "value-3"
                            },
                        ],
                        "action_id": "overflow-action"
                    }
                },
                Divider,
                ...tasks.map((task) => generateTaskBlock(task, user.userId)),
                // {
                //     "type": "section",
                //     "text": {
                //         "type": "mrkdwn",
                //         "text": `${tasks[0].description}\n*Assigned by:* <@${user.userId}>\n*Assignee:* All channel members`
                //     },
                //     "accessory": {
                //         "type": "overflow",
                //         "options": [
                //             {
                //                 "text": {
                //                     "type": "plain_text",
                //                     "text": "Mark as complete",
                //                     "emoji": true
                //                 },
                //                 "value": "value-0"
                //             },
                //             {
                //                 "text": {
                //                     "type": "plain_text",
                //                     "text": "View details",
                //                     "emoji": true
                //                 },
                //                 "value": "value-1"
                //             },
                //             {
                //                 "text": {
                //                     "type": "plain_text",
                //                     "text": "Edit",
                //                     "emoji": true
                //                 },
                //                 "value": "value-2"
                //             },
                //             {
                //                 "text": {
                //                     "type": "plain_text",
                //                     "text": "Delete task",
                //                     "emoji": true
                //                 },
                //                 "value": "value-3"
                //             },
                //         ],
                //         "action_id": "overflow-action"
                //     }
                // },
                Margin,
                Divider,
                Margin,
                Margin,
                Margin,
                {
                    type: "section",
                    text: {
                        type: "mrkdwn",
                        text: `*Completed*`
                    }
                },
                Divider,
                {
                    type: "section",
                    text: {
                        type: "mrkdwn",
                        text: `hihi`
                    }
                }
            ]
        };

        console.log('View Object:', view);

        // Publish the view
        const result = await client.views.publish({
            user_id: userId,
            view: view
        });

        logger.info(result);

    } catch (error) {
        logger.error(error);
        console.error('Error:', error);
    }


};

module.exports = { appHomeOpenedCallback }