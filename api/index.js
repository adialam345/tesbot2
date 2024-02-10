// index.js
const { Client, GatewayIntentBits } = require('discord.js');
const fetch = require('node-fetch');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const API_KEY = 'da2-e3ybp4cw2vgdlgmie3byhf4ohe';
const GRAPHQL_URL = 'https://xzqpphzvbzhzvpke6ojjzvbpjq.appsync-api.ap-southeast-1.amazonaws.com/graphql';
const channelId = '1205841803623006208';

client.on('messageCreate', async (message) => {
  if (message.content === '!fetchData') {
    try {
      const response = await fetch(GRAPHQL_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': API_KEY,
        },
        body: JSON.stringify({ query: graphqlQuery }),
      });

      const data = await response.json();

      const messages = data.data.messagesByUpdateAt.items;

      messages.forEach((msg) => {
        const author = msg.author;
        const embed = {
          title: msg.message,
          fields: [
            { name: 'Author', value: `${author.givenName} ${author.familyName} (${author.nickname})` },
          ],
          thumbnail: {
            url: author.profileImage,
          },
          timestamp: new Date(msg.createdAt),
        };

        client.channels.cache.get(channelId).send({ embeds: [embed] });
      });

      message.reply('Data has been fetched and sent to the channel.');
    } catch (error) {
      console.error('Error fetching data:', error);
      message.reply('An error occurred while fetching data.');
    }
  }
});

module.exports = async (req, res) => {
  await client.login('1124972469409812520');
  res.status(200).send('Bot is running!');
};
