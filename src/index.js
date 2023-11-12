const { App } = require('@slack/bolt');
const { ChatOpenAI } = require("langchain/chat_models/openai");
const { PromptTemplate } = require("langchain/prompts");
const prompt = require('./prompt')
const dotenv = require('dotenv')
const { appHomeOpenedCallback } = require('./events/app-home-opened');
const { conversationContext } = require('@slack/bolt/dist/conversation-store');
const db = require('./db/db')
const mongoose = require('mongoose');
const User = require('./db/model/user')
const Task = require('./db/model/task')
const { getUserInfo } = require('./lib/get-user-info')


dotenv.config()

const initializeChatModel = () => {
    const chatModel = new ChatOpenAI({
        openAIApiKey: process.env.OPEN_API_KEY,
        temperature: 0.1
    });
    return chatModel
}

const app = new App({
    token: process.env.SLACK_BOT_TOKEN,
    signingSecret: process.env.SLACK_SIGNING_SECRET
})

app.event('message', async ({ event, client, logger, say }) => {
    const text = event.text
    const channel = event.channel
    const author = event.user

    console.log('event', event)
    // initialize ChatOpenAI
    const chatModel = initializeChatModel();

    const promptTemplate = PromptTemplate.fromTemplate(prompt.classifyTask);

    const chain = promptTemplate.pipe(chatModel);
    // date, day of the week // Wednesday, Nov 8

    const result = await chain.invoke({ conversation: text });
    console.log('LLM result: ', result.content); // string

    const userId = event.user // this is user not the current ME
    // const userData = await await client.users.info()
    // console.log('userData', userData)

    // TODO: algo to determine what to save or not

    try {
        let user = await User.findOne({ userId });
        if (!user) {
            user = new User({
                _id: new mongoose.Types.ObjectId(),
                userId: userId
            });
            await user.save();
            console.log('User saved!')
        }
        console.log('User found!')

        // create new task
        let task = new Task({
            // author: userId,
            channel: channel,
            description: result.content,
        })
        task.assignedUsers.push(user._id);
        await task.save()

        user.tasks.push(task._id);
        await user.save();
        console.log('User updated with new task.');


    } catch (error) {
        logger.error(error)
    }

    // Slack bot action
    say({
        text: result.content || 'Hello world!',
    });
});

// Listen for users opening your App Home
app.event('app_home_opened', appHomeOpenedCallback);

(async () => {
    try {
        await app.start(process.env.PORT || 3000);
        console.log('⚡️ Bolt app is running!');
    } catch (err) {
        console.error('Cannot start app:', err);
    }
})();