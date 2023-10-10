
import { App } from '@slack/bolt';
import dotenv from 'dotenv';
dotenv.config()

const app = new App({
    token: process.env.SLACK_BOT_TOKEN,
    signingSecret: process.env.SLACK_SIGNING_SECRET
});

app.event('message', async ({ event, say }) => {
    const text = (event as any).text;
    say({
        text: text || 'Hello world!',
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
