const axios = require('axios');
const fs = require('fs');

const graphqlQuery = `
  query MessagesByUpdateAt {
    messagesByUpdateAt(type: "message", sortDirection: DESC, limit: 2000) {
      items {
        id
        message
        channelId
        createdAt
        updatedAt
        userMessagesId
        type
        author {
          givenName
          familyName
          nickname
          profileImage
        }
      }
    }
  }
`;

const headers = {
  'x-api-key': 'da2-e3ybp4cw2vgdlgmie3byhf4ohe',
  'Content-Type': 'application/json',
};

const config = {
  headers: headers,
  responseType: 'json',
};

axios
  .post('https://xzqpphzvbzhzvpke6ojjzvbpjq.appsync-api.ap-southeast-1.amazonaws.com/graphql', JSON.stringify({ query: graphqlQuery }), config)
  .then(response => {
    const messages = response.data.data.messagesByUpdateAt.items;

    // Convert messages to JSON string
    const messagesString = JSON.stringify(messages, null, 2);

    // Write to a file (change 'output.json' to your desired file name)
    fs.writeFile('output.json', messagesString, 'utf8', err => {
      if (err) {
        console.error('Error writing to file:', err);
      } else {
        console.log('Messages written to output.json');
      }
    });
  })
  .catch(error => {
    console.error(error);
  });

