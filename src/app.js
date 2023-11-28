const { App } = require('@slack/bolt');
const { ChatOpenAI } = require("langchain/chat_models/openai");
const { PromptTemplate } = require("langchain/prompts");
const prompt = require('./prompt')
const dotenv = require('dotenv')
const db = require('./db/db')
const mongoose = require('mongoose');
const User = require('./db/models/user')
const Task = require('./db/models/task')
const { getPromptInput } = require('./utilities/get-prompt-input');
const { appHomeOpenedCallback } = require('./listeners/events/app-home-opened');

dotenv.config()

const app = new App({
    token: process.env.SLACK_BOT_TOKEN,
    signingSecret: process.env.SLACK_SIGNING_SECRET
})

const chatModel = new ChatOpenAI({
    openAIApiKey: process.env.OPEN_API_KEY,
    temperature: 0.1
});

app.event('message', async ({ event, client, logger, say }) => {
    console.log('event', event)
    const text = event.text
    const author = event.user

    const conversationsInfo = await client.conversations.info(
        {
            token: process.env.SLACK_BOT_TOKEN,
            channel: event.channel
        }
    )

    const channelId = conversationsInfo.channel.id
    const channelName = conversationsInfo.channel.name

    const conversationsMembers = await client.conversations.members(
        {
            token: process.env.SLACK_BOT_TOKEN,
            channel: event.channel
        }
    )
    const channelMembers = conversationsMembers.members // Array of userIDs

    const { dayOfWeek, today, thisWeekDates, nextWeekDates } = getPromptInput()
    const todayYear = today.year
    const todayMonth = today.month
    const todayDate = today.day
    console.log('today', today)

    // LLM
    const promptTemplate = PromptTemplate.fromTemplate(prompt.classifyTask);
    const chain = promptTemplate.pipe(chatModel);
    const result = await chain.invoke(
        {
            conversation: text, dayOfWeek: dayOfWeek, todayYear: todayYear, todayMonth: todayMonth, todayDate: todayDate,
            thisMonday: thisWeekDates[0], thisTuesday: thisWeekDates[1], thisWednesday: thisWeekDates[2], thisThursday: thisWeekDates[3], thisFriday: thisWeekDates[4], thisSaturday: thisWeekDates[5], thisSunday: thisWeekDates[6],
            nextMonday: nextWeekDates[0], nextTuesday: nextWeekDates[1], nextWednesday: nextWeekDates[2], nextThursday: nextWeekDates[3], nextFriday: nextWeekDates[4], nextSaturday: nextWeekDates[5], nextSunday: nextWeekDates[6],
        });
    console.log('LLM result: ', result.content); // string

    const userId = event.user // message author
    // const userData = await await client.users.info()
    // console.log('userData', userData)

    if (result.content !== 'This is not a task.') {
    // TODO: redesign saving logic
    // assignee specified, save the task into that User
    // not specified, save the task to every user in the same channel
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

            const resultArray = result.content.split("|separator|")
            const taskTitle = resultArray[0]

            let taskDue;
            if (resultArray[1] === "Flexible") {
                taskDue = "Flexible"
            } else if (resultArray[1].toUpperCase() === "ASAP") {
                taskDue = "ASAP"
            } else {
                const taskDueArray = resultArray[1].split("-")
                taskDue = taskDueArray.reduce((acc, curr) => {
                    const item = curr.split(":")
                    acc[item[0]] = Number(item[1])
                    for (const [key, val] of Object.entries(acc)) {
                        if (!val) {
                            console.log("Invalud taskDue value: check prompt result")
                            return
                        } else {
                            return acc
                        }
                    }
                }, {})
            }

            let task = new Task({
                // author: userId,
                _id: new mongoose.Types.ObjectId(),
                channelId: channelId,
                channelName: channelName,
                title: taskTitle,
                due: taskDue,
                status: 'Pending'
            })
            task.assignedUsers.push(user._id);
            await task.save()

            user.tasks.push(task._id);
            await user.save();
            console.log('User updated with new task.');

        } catch (error) {
            logger.error(error)
        }
    }

    async function deleteAllTasks() {
        try {
            // Use the deleteMany function to delete all documents in the 'tasks' collection
            const result = await Task.deleteMany({});

            // Log the result or perform any other actions
            console.log(`${result.deletedCount} documents deleted`);

        } catch (error) {
            // Handle errors
            console.error('Error deleting tasks:', error);
        }
    }

    // deleteAllTasks();

    say({
        text: result.content || 'Hello world!',
    });
});

app.event('app_home_opened', appHomeOpenedCallback);

(async () => {
    try {
        await app.start(process.env.PORT || 3000);
        console.log('⚡️ Bolt app is running!');
    } catch (err) {
        console.error('Cannot start app:', err);
    }
})();