const dayOfWeekList = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

const getDayOfWeek = () => {
    const ts = Date.now();
    let dateOb = new Date(ts);

    let date = dateOb.getDate();
    let month = dateOb.getMonth() + 1;
    let year = dateOb.getFullYear()

    const dayOfWeek = new Date(`${year}-${month}-${date}`).getDay();

    return dayOfWeekList[dayOfWeek];
}

exports.getDayOfWeek = getDayOfWeek