const generateTaskBlock = (task, userId) => {
    return {
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
                }
            ],
            action_id: "overflow-action",
        },
    };
};

exports.generateTaskBlock = generateTaskBlock