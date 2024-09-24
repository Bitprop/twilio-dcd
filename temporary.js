const accountSid = 'ACbfce5b108d7c1f1f397b7dd9005c531a'; // Your Account SID from www.twilio.com/console
const authToken = '04b3b534f08682ab5a4a3535041bae3a';   // Your Auth Token from www.twilio.com/console
const client = require('twilio')(accountSid, authToken);

// Specify the Service SID you want to list conversations from
const serviceSid = 'IS97bccd8ce5a346a38d9776d33d5bb10b'; 

client.conversations.services(serviceSid)
  .conversations
  .list()
  .then(conversations => conversations.forEach(c => console.log(c.sid, c.friendlyName)));
  
