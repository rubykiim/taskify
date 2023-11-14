const getUserInfo = async ({ client, userId }) => {
    try {
        const userData = await client.users.info({
            user: userId
        });
        // console.log('userData', userData);
        return userData
    }
    catch (error) {
        console.error(error);
    }
}

exports.getUserInfo = getUserInfo