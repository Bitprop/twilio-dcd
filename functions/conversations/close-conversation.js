const rsp = require(Runtime.getFunctions()['system/format-response-headers'].path);

exports.handler = async function(context, event, callback) {

    // The Twilio node Client library 
    const client = context.getTwilioClient();

    // Pull the response object from helper library
    const response = await rsp.formatResponseHeader();

    // Add CORS headers to allow requests from your local development server
    response.appendHeader('Access-Control-Allow-Origin', '*');  // Replace '*' with the specific domain if needed
    response.appendHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    response.appendHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle OPTIONS preflight request
    if (event.httpMethod === 'OPTIONS') {
        return callback(null, response);
    }

    console.log("Closing conversation with SID:", event.payload.conversationSid);

    // Close the conversation
    client.conversations
        .conversations(event.payload.conversationSid)
        .update({ state: 'closed' })
        .then(result => {
            response.appendHeader('Content-Type', 'application/json');
            response.setBody({ message: "Conversation closed successfully" });
            console.log("Conversation closed:", result.sid);
            callback(null, response);
        })
        .catch(err => {
            console.log("Error closing conversation:", err.status);      
            response.appendHeader('Content-Type', 'application/json');
            response.setBody({ error: err.message });
            response.setStatusCode(err.status || 500);
            return callback(null, response);
        });
};
