const { DateTime } = require('luxon');
const { getDayOfWeek } = require('./get-day-of-week')

const getPromptInput = () => {
    const dayOfWeek = getDayOfWeek()
    const today = DateTime.now()
    // const today = DateTime.fromObject({ year: 2023, month: 12, day: 22 })
    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const thisMonday = today.startOf('week');
    const nextMonday = thisMonday.plus({ weeks: 1 });

    const thisWeekDates = [];
    daysOfWeek.forEach((day) => {
        const currentDate = thisMonday;
        const formattedDate = currentDate.plus({ days: daysOfWeek.indexOf(day) }).toFormat("'year:'yyyy'-month:'LL'-day:'dd");
        thisWeekDates.push(formattedDate);
    });

    const nextWeekDates = [];
    daysOfWeek.forEach((day) => {
        const currentDate = nextMonday;
        const formattedDate = currentDate.plus({ days: daysOfWeek.indexOf(day) }).toFormat("'year:'yyyy'-month:'LL'-day:'dd");
        nextWeekDates.push(formattedDate);
    });

    console.log('thisWeekDates', thisWeekDates)
    console.log('nextWeekDates', nextWeekDates)

    return { dayOfWeek, today, thisWeekDates, nextWeekDates }
}

exports.getPromptInput = getPromptInput;