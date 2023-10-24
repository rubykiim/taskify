const appHomeOpenedCallback = async ({ event, client, logger }) => {


    try {
        // Call views.publish with the built-in client
        const result = await client.views.publish({
            // Use the user ID associated with the event
            user_id: event.user,
            view: {
                // Home tabs must be enabled in your app configuration page under "App Home"
                type: "home",
                blocks: [
                    {
                        type: "section",
                        text: {
                            type: "mrkdwn",
                            text: "*Welcome home, <@" + event.user + "> :house:*"
                        }
                    },
                    {
                        type: "section",
                        title: {
                            type: "mrkdwn",
                            text: "Your Tasks"
                        }
                    }
                ]
            }
        });

        logger.info(result);
    }
    catch (error) {
        logger.error(error);
    }
};

module.exports = { appHomeOpenedCallback }