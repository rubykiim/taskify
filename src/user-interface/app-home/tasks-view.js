const {
    HomeTab, Header, Divider, Section, Actions, OverflowMenu, Input, Bits, Elements
} = require('slack-block-builder');
// const pluralize = require('pluralize');
// const { DateTime } = require('luxon');
const { getDate } = require('../../utilities/get-date')
const { getDayOfWeek } = require('../../utilities/get-day-of-week')

const TasksView = (user, allTasks) => {
    const dayOfWeek = getDayOfWeek()
    const todayDate = getDate()

    const homeTab = HomeTab({ callbackId: 'taskify-home', privateMetaData: 'open' }).blocks(
        Header({ text: `Hi ${user.firstName} :wave:\nToday is ${dayOfWeek}, ${todayDate}` }),
        Section({ text: '\n' }),
        Actions({ blockId: 'task-filter-actions' }).elements(
            Elements.ChannelSelect()
                .initialChannel('C12345678')
                .placeholder('Filter by channel')
                .actionId('app-home-channel-select-action'),
            Elements.UserSelect()
                .placeholder('Filter by user')
                .actionId('app-home-user-select-action')
        ),
        Divider()
    );

    if (allTasks.length === 0) {
        homeTab.blocks(
            Section({ text: 'Looks like you\'ve got nothing to do.' }),
        );
        return homeTab.buildToJSON();
    }

    /*
      Block kit Options have a maximum length of 10, and most people have more than 10 open tasks
      at a given time, so we break the Tasks list into chunks of ten
      and add them as multiple blocks.
    */
    const tasksArray = [];
    let holdingArray = [];
    let start = 0;
    const end = allTasks.length;
    const maxOptionsLength = 10;

    for (start, end; start < end; start += maxOptionsLength) {
        holdingArray = allTasks.slice(start, start + maxOptionsLength);
        holdingArray.forEach((task) => {
            tasksArray.push(
                Section({ text: `${task.description} | ${task.channel} · <@${user.userId}>\n` })
                    .accessory(
                        Elements.OverflowMenu()
                            .options([
                                Bits.Option({ text: 'Edit', value: 'edit-task' }),
                                Bits.Option({ text: 'Delete task', value: 'delete-task' })
                            ])
                            .actionId('overflow-action')
                    ),
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