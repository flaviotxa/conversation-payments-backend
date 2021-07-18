const Twilio = require('twilio');
require('dotenv').config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = new Twilio(accountSid, authToken);

export default async (
  conversationSid,
  body,
  attributes = {},
  author = undefined
) => {
  await client.conversations
    .conversations(conversationSid)
    .messages.create({ author, body, attributes: JSON.stringify(attributes) })
    .then(message => console.log('Message sent: ', message))
    .catch(error => console.error(error));
};
