const { getUserInfo } = require('../../utilities/get-user-info')
const { reloadAppHome } = require('../../utilities/reload-app-home')

const appHomeOpenedCallback = async ({ event, client, body }) => {
    if (event.tab !== 'home') {
        // Ignore the `app_home_opened` event for everything
        // except home as we don't support a conversational UI
        return;
    }

    try {
        const userId = event.user
        const userData = await getUserInfo({ client, userId })
        const userFirstName = userData.user.profile.first_name

        if (event.view) {
            await reloadAppHome(
                client,
                userId,
                userFirstName,
                body.team_id,
            );
            return;
        }

        // For new users where we've never set the App Home,
        // the App Home event won't send a `view` property
        await reloadAppHome(client, userId, userFirstName, body.team_id);
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
    }

};

module.exports = { appHomeOpenedCallback }