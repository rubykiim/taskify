const { App } = require('@slack/bolt');
const { ChatOpenAI } = require("langchain/chat_models/openai");
const { PromptTemplate } = require("langchain/prompts");
const dotenv = require('dotenv')

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

    const promptTemplate = PromptTemplate.fromTemplate(
        "I want you to analyze this conversation, {conversation}, whether it can be classified as a task. \
        In other words, I want you to analyze whether the conversation contains \
        task and deadline(due date and or time the task needs to be completed). \
        For example, 'Please complete this survey by this Friday' contains 'survey' that can be a task \
        and the person who said it wants people to complete it by this Friday. \
        If the conversation is a task, please tell me the task and the deadline in this format. \
        Task: the task you found, Deadline: the deadline you found.\
        Also, if the task contains deadline, please convert it to an actual date and time.\
        For example, if the task is due by 6pm this Friday, please find out what date 'this Friday' is and tell me the exact date.\
        When outputting your answer, you don't need to tell me that the conversation can be classified as task.\
        Do not say anything else but the task and dealine.\
        If it is not a task, please say this is not a task."
    );

    const chain = promptTemplate.pipe(chatModel);

    const result = await chain.invoke({ conversation: text });
    console.log(result.content);

    // Slack bot action
    say({
        text: result.content || 'Hello world!',
    });
});

(async () => {
    try {
        await app.start(process.env.PORT || 3000);
        console.log('⚡️ Bolt app is running!');
    } catch (err) {
        console.error('Cannot start app:', err);
    }
})();
