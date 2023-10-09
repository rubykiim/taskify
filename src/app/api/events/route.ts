import { App } from '@slack/bolt';
import { NextRequest, NextResponse } from 'next/server';

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

export async function GET(req: NextRequest, res: NextResponse) {
    return new Response('HI')
}

export async function POST(req: NextRequest, res: NextResponse) {
    const body = await req.json();
    console.log(body)
    return NextResponse.json(body)
}