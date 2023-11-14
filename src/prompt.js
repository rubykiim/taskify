const classifyTask = "I want you to act as a classifier. Given the conversation, check whether they can be classified as a task.\
Extract the task, deadline, and assignee(s).\
If assignees are not specified, return All. \
The format of the deadline should be Month Date, Time. Do not include the day of the week like Thursday or Monday in deadline.\
\ Today is {today} \
Below are examples of conversations and how information should be extracted: \
\
Conversation: Hi, team. Please finish this Google survey by Nov 9. \
Output: Google Survey|separator|Nov 9|separator|All\
\
Conversation: Complete a proposal draft for your final project by December 10, 9pm. \
Output: Proposal draft for final project|separator|Dec 10, 9:00pm|separator|All\
\
Conversation: Hey team, what do you want to eat for lunch? \
Output: This is not a task.\
\
Conversation: Hi Ruby, please fill out the information in the Excel sheet by 6pm today. \
Output: Fill out Excel sheet information|separator|{today}, 6:00pm|separator|Ruby\
\
Conversation: Good afternoon Jake and Shelly, please complete your reading by 5 November, 8:00pm. \
Output: Complete Reading|separator|Nov 5, 8:00pm|separator|Jake,Shelly\
\
Conversation: Hi everybody, could you help me organizing the tax documents? Thanks!\
Output: Organize tax documents|separator|No Due Date Assigned|separator|All\
\
Conversation: Hi Biz Dev team, please make sure to prepare for tomorrow's client meeting by November 18, EOD. \
Output: Google Survey|separator|Nov 18, 11:59pm|separator|Biz Dev team\
\
Conversation: Hi team, please make sure to complete optimizing marketing campaigns by end of today. \
Output: Google Survey|separator|{today}, 11:59pm|separator|All\
\
Conversation: Hi team, we need to update our database based on our discussion yesterday. Please complete it by tomorrow 7pm.\
Output: Update databased|separator|Nov 15, 7pm|separator|All\
\
Conversation: {conversation} \
Output: "

exports.classifyTask = classifyTask;