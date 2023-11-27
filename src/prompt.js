const classifyTask = "I want you to act as a classifier. Given the conversation, check whether they can be classified as a task.\
1. Extract the task, deadline, and assignee(s). \
2. Conver format of the deadline into year:year-month:month-day:day-hour:hour-minute:minute.\
3. If assignees are not specified, return All. \
Today is {todayYear} {todayMonth} {todayDate}, {dayOfWeek}\
Below are examples of conversations and how information should be extracted: \
\
Conversation: Hi, team. Please finish this survey by Nov 9. \
Output: Survey|separator|year:2023-month:11-day:09-hour:11-minute:59|separator|All\
\
Conversation: Complete a proposal draft for your final project by December 10, 9pm. \
Output: Proposal draft for final project|separator|year:2023-month:12-day:10-hour:21-minute:00|separator|All\
\
Conversation: Hey team, what do you want to eat for lunch? \
Output: This is not a task.\
\
Conversation: Hi Ruby, please fill out the information in the Excel sheet by 6pm today. \
Output: Fill out Excel sheet information|separator|year:{todayYear}-month:{todayMonth}-day:{todayDate}-hour:11-minute:59|separator|Ruby\
\
Conversation: Good afternoon Jake and Shelly, please complete your reading by 5 November, 8:00pm. \
Output: Complete Reading|separator|year:2023-month:11-day:05-hour:20-minute:00|separator|Jake,Shelly\
\
Conversation: Hi everybody, could you help me organizing the tax documents? Thanks!\
Output: Organize tax documents|separator|Flexible|separator|All\
\
Conversation: Hi Biz Dev team, please make sure to prepare for tomorrow's client meeting by November 18, EOD. \
Output: Google Survey|separator|year:2023-month:11-day:09-hour:11-minute:59|separator|Biz Dev team\
\
Conversation: hi team please finish the working document and review it by the end of today\
Output: Finish working document and review|separator|year:{todayYear}-month:{todayMonth}-day:{todayDate}-hour:11-minute:59|separator|All\
\
Conversation: Hi team, we need to update our database based on our discussion yesterday. Please complete it by Nov 28 7pm.\
Output: Update database|separator|year:2023-month:11-day:28-hour:11-minute:59|separator|All\
\
Conversation: project due Nov 27.\
Output: Project|separator|year:2023-month:11-day:27-hour:11-minute:59|separator|All\
\
Conversation: Make me a report for last week's work progress ASAP\
Output: Create a report for last week's work progress|separator|ASAP|All\
\
Conversation: Take class on December 10th 9am\
Output: Attend class|separator|year:2023-month:12-day:10-hour:09-minute:00|separator|All\
\
Conversation: {conversation} \
Output: "

exports.classifyTask = classifyTask;


// const classifyTask = "I want you to act as a classifier. Given the conversation, check whether they can be classified as a task.\
// Extract the task, deadline, and assignee(s). If assignees are not specified, return All. \
// The format of the deadline should be Month Date, Time. Do not include the day of the week like Thursday or Monday in deadline.\
// Today is {today} \
// Below are examples of conversations and how information should be extracted: \
// \
// Conversation: Hi, team. Please finish this Google survey by Nov 9. \
// Output: Google Survey|separator|Nov 9|separator|All\
// \
// Conversation: Complete a proposal draft for your final project by December 10, 9pm. \
// Output: Proposal draft for final project|separator|Dec 10, 9:00pm|separator|All\
// \
// Conversation: Hey team, what do you want to eat for lunch? \
// Output: This is not a task.\
// \
// Conversation: Hi Ruby, please fill out the information in the Excel sheet by 6pm today. \
// Output: Fill out Excel sheet information|separator|{today}, 6:00pm|separator|Ruby\
// \
// Conversation: Good afternoon Jake and Shelly, please complete your reading by 5 November, 8:00pm. \
// Output: Complete Reading|separator|Nov 5, 8:00pm|separator|Jake,Shelly\
// \
// Conversation: Hi everybody, could you help me organizing the tax documents? Thanks!\
// Output: Organize tax documents|separator|No Due Date Assigned|separator|All\
// \
// Conversation: Hi Biz Dev team, please make sure to prepare for tomorrow's client meeting by November 18, EOD. \
// Output: Google Survey|separator|Nov 18, 11:59pm|separator|Biz Dev team\
// \
// Conversation: Hi team, please make sure to complete optimizing marketing campaigns by end of today. \
// Output: Google Survey|separator|{today}, 11:59pm|separator|All\
// \
// Conversation: Hi team, we need to update our database based on our discussion yesterday. Please complete it by tomorrow 7pm.\
// Output: Update database|separator|Nov 15, 7pm|separator|All\
// \
// Conversation: project due tomorrow.\
// Output: Project|separator|Nov 16, 11:59pm\
// \
// Conversation: Make me a report for last week's work progress\
// Output: Create a report for last week's work progress|separator|No Due Date Assigned|All\
// \
// Conversation: Take class next Friday\
// Output: Attend class|separator|Nov 24|separator|All\
// \
// Conversation: Take class next Friday\
// Output: Attend class|separator|{variable for Friday}|separator|All\
// \
// Conversation: {conversation} \
// Output: "

// exports.classifyTask = classifyTask;