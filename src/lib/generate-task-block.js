const { Margin } = require('../components/margin')
const { Divider } = require("../components/divider");

const generateTaskBlock = (task, userId) => {
    return {
        taskSection: {
            type: "section",
            text: {
                type: "mrkdwn",
                text: `${task.description}\n <@${userId}>\n`,
            },
            accessory: {
                type: "overflow",
                options: [
                    {
                        text: {
                            type: "plain_text",
                            text: "Edit",
                            emoji: true,
                        },
                        value: "value-0",
                    },
                    {
                        text: {
                            type: "plain_text",
                            text: "Delete task",
                            emoji: true,
                        },
                        value: "value-1",
                    },
                ],
                action_id: "overflow-action",
            },
        },
        margin: Margin,
        divider: Divider,
    };
};

exports.generateTaskBlock = generateTaskBlock