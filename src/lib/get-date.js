const months = {
    '1': 'January',
    '2': 'February',
    '3': 'March',
    '4': 'April',
    '5': 'May',
    '6': 'June',
    '7': 'July',
    '8': 'August',
    '9': 'September',
    '10': 'October',
    '11': 'November',
    '12': 'December'
}

const getDate = () => {
    const ts = Date.now();
    let dateOb = new Date(ts);

    let date = dateOb.getDate();
    let month = dateOb.getMonth() + 1;

    let newMonth = months[month]
    return `${newMonth} ${date}`
}

exports.getDate = getDate