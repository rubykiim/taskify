const { App } = require('@slack/bolt');
const { ChatOpenAI } = require("langchain/chat_models/openai");
const { PromptTemplate } = require("langchain/prompts");
const db = require('./db/db')
const prompt = require('./prompt')
const dotenv = require('dotenv')
const { appHomeOpenedCallback } = require('./events/app-home-opened')

dotenv.config()

const initializeChatModel = () => {
    const chatModel = new ChatOpenAI({
        openAIApiKey: process.env.OPEN_API_KEY,
        temperature: 0.8
    });
    return chatModel
}

const app = new App({
    token: process.env.SLACK_BOT_TOKEN,
    signingSecret: process.env.SLACK_SIGNING_SECRET
})

app.event('message', async ({ event, say }) => {
    const text = event.text;

    // initialize ChatOpenAI
    const chatModel = initializeChatModel();

    const promptTemplate = PromptTemplate.fromTemplate(prompt.classifyTask);

    const chain = promptTemplate.pipe(chatModel);

    const result = await chain.invoke({ conversation: text });
    console.log(result.content);

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
