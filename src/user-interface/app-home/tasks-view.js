const {
    HomeTab, Header, Divider, Section, Actions, Input, Bits, Elements
} = require('slack-block-builder');
// const pluralize = require('pluralize');
const { DateTime } = require('luxon');
const { getDate } = require('../../utilities/get-date')
const { getDayOfWeek } = require('../../utilities/get-day-of-week')

const TasksView = (user, allTasks) => {
    const dayOfWeek = getDayOfWeek()
    const todayDate = getDate()

    const homeTab = HomeTab({ callbackId: 'taskify-home', privateMetaData: 'open' }).blocks(
        Header({ text: `Hi ${user.firstName} :wave:\nToday is ${todayDate}, ${dayOfWeek}` }),
        Section({ text: '\n' }),
        Section({ text: '\n' }),
        Actions({ blockId: 'task-filter-actions' }).elements(
            Elements.ChannelSelect()
                // .initialChannel('C12345678')
                .placeholder('Filter by channel')
                .actionId('app-home-channel-select-action'),
            Elements.UserSelect()
                .placeholder('Filter by user')
                .actionId('app-home-user-select-action')
        ),
        Section({ text: `*Tasks*\n` }),
        Divider()
    );

    if (allTasks.length === 0) {
        homeTab.blocks(
            Section({ text: 'Woohoo! Looks like you\'ve got nothing to do yet :raised_hands:' }),
        );
        return homeTab.buildToJSON();
    }

    /*
      Block kit Options have a maximum length of 10, and most people have more than 10 open tasks
      at a given time, so we break the Tasks list into chunks of ten
      and add them as multiple blocks.
    */

    // Separate tasks into three arrays based on due type
    const asapTasks = allTasks.filter(task => task.due === "ASAP");
    const actualDateTasks = allTasks.filter(task => typeof task.due === 'object');
    const flexibleTasks = allTasks.filter(task => task.due === "Flexible");

    // Sort actual date tasks by due date
    actualDateTasks.sort((a, b) => {
        const dateA = DateTime.fromObject(a.due).toMillis();
        const dateB = DateTime.fromObject(b.due).toMillis();
        return dateA - dateB;
    });
    const tasksSorted = [...asapTasks, ...actualDateTasks, ...flexibleTasks];

    const tasksArray = [];
    let holdingArray = [];
    let start = 0;
    const end = tasksSorted.length;
    const maxOptionsLength = 10;

    for (start, end; start < end; start += maxOptionsLength) {
        holdingArray = tasksSorted.slice(start, start + maxOptionsLength);
        holdingArray.forEach((task) => {
            let taskDueFormatted;
            if (task.due === "Flexible" || task.due === "ASAP") {
                taskDueFormatted = task.due
            } else {
                const taskDueISO = DateTime.fromObject(task.due).toISO()
                taskDueFormatted = DateTime.fromISO(taskDueISO).toFormat('LLL dd h:mma, EEEE')
            }
            tasksArray.push(
                Section({ text: `*${task.title}*\n*Due* ${taskDueFormatted}  |  ${task.channelName}  ·  <@${user.userId}>` })
                    .accessory(
                        Elements.OverflowMenu()
                            .options([
                                Bits.Option({ text: 'Edit', value: 'edit-task' }),
                                Bits.Option({ text: 'Delete task', value: 'delete-task' })
                            ])
                            .actionId('overflow-action')
                ),
                Input({ label: ' ', blockId: `task-status-change-${task._id}` })
                    .dispatchAction()
                    .element(Elements.StaticSelect()
                        .placeholder(`${task.status}`)
                        .options([
                            Bits.Option({ text: 'Pending', value: 'task-pending' }),
                            Bits.Option({ text: 'In Progress', value: 'task-in-progress' }),
                            Bits.Option({ text: 'Completed', value: 'task-completed' })
                        ])),
                Section({ text: '\n' }),
                Divider()
            )
        })

    }

    homeTab.blocks(
        tasksArray,
    )

    return homeTab.buildToJSON();
};

exports.TasksView = TasksView