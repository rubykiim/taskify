const classifyTask = "I want you to act as a classifier. Given the conversation, check whether they can be classified as a task.\
1. Extract the task, due, and assignee(s). \
2. Convert format of the due into year:year-month:month-day:day-hour:hour-minute:minute.\
3. If assignees are not specified, return All.\
Today is {todayYear} {todayMonth} {todayDate}, {dayOfWeek}\
Below are examples of conversations and how information should be extracted: \
\
Conversation: Hi, team. Please finish this survey by Nov 9.\
Output: Survey|separator|year:2023-month:11-day:09-hour:11-minute:59|separator|All\
\
Conversation: Complete a proposal draft for your final project by December 10, 9pm.\
Output: Proposal draft for final project|separator|year:2023-month:12-day:10-hour:21-minute:00|separator|All\
\
Conversation: Hi Ruby, please fill out the information in the Excel sheet by 6pm today.\
Output: Fill out Excel sheet information|separator|year:{todayYear}-month:{todayMonth}-day:{todayDate}-hour:11-minute:59|separator|Ruby\
\
Conversation: hi team please finish the working document and review it by the end of today.\
Output: Finish working document and review|separator|year:{todayYear}-month:{todayMonth}-day:{todayDate}-hour:11-minute:59|separator|All\
\
Conversation: Hi team, please attend the ABC art exhibition on Monday at 3.\
Output: Attend ABC art exhibition|separator|{thisMonday}-hour:15-minute:00|separator|All\
\
Conversation: Please submit your final version of essays by this Tuesday 9pm.\
Output: Submit final verson of essay|separator|{thisTuesday}-hour:21-minute:00|separator|All\
\
Conversation: Hi team, we need to update our database based on our discussion yesterday. Please complete it by Wed 7pm.\
Output: Update database|separator|{thisWednesday}-hour:19-minute:00|separator|All\
\
Conversation: Hi everyone, please finish updating the OKR dashboard by this Thursday 9am.\
Output: Update OKR dashboard|separator|{thisThursday}-hour:09-minute:00|separator|All\
\
Conversation: Help me finish sending emails to our clients by Friday.\
Output: Send emails to clients|separator|{thisFriday}-hour:23-minute:59|separator|All\
\
Conversation: Hi everyone, don't forget to complete the faculty survey by this Saturday 10pm.\
Output: Complete faculty survey|separator|{thisSaturday}-hour:22-minute:00|separator|All\
\
Conversation: Submit product require document by Sun.\
Output: Submit product require document|separator|{thisSunday}-hour:23-minute:59|separator|All\
\
Conversation: Good afternoon Jake and Shelly, please complete your readings by next Monday, 8:00pm.\
Output: Complete Readings|separator|{nextMonday}-hour:20-minute:00|separator|Jake,Shelly\
\
Conversation: Hi Biz Dev team, please make sure to prepare for next Wednesday's client meeting by next Tuesday, EOD.\
Output: Prepare for next Wednesday's client meeting|separator|{nextTuesday}-hour:11-minute:59|separator|Biz Dev team\
\
Conversation: project due next Wed.\
Output: Project|separator|{nextWednesday}-hour:11-minute:59|separator|All\
\
Conversation: Assignment due next Thurs 5pm.\
Output: Assignment|separator|{nextThursday}-hour:17-minute:00|separator|All\
\
Conversation: The final presentation rehearsal script should be done by next Fri 11:59pm.\
Output: Final presentation rehearsal script|separator|{nextFriday}-hour:23-minute:59|separator|All\
\
Conversation: Brainstorm project idea next saturday 10am.\
Output: Brainstorm project idea|separator|{nextSaturday}-hour:10-minute:00|separator|All\
\
Conversation: Finish revising your essays next Sunday.\
Output: Revise essay|separator|{nextSunday}-hour:23-minute:59|separator|All\
\
Conversation: Make me a report for last week's work progress asap\
Output: Create a report for last week's work progress|separator|ASAP|All\
\
Conversation: Hi everybody, could you help me organizing the tax documents? Thanks!\
Output: Organize tax documents|separator|Flexible|separator|All\
\
Conversation: Hey team, what do you want to eat for lunch? \
Output: This is not a task.\
\
Conversation: {conversation} \
Output: "

exports.classifyTask = classifyTask;

