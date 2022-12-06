
const Discord = require('discord.js');

require('dotenv').config();
const prefix = 'ibra';
const client = new Discord.Client({
    intents: ["Guilds", "GuildMessages", "MessageContent"]
});

client.on("ready", () => {
    console.log("Bot is online");
})

client.on("messageCreate", (message) => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    
    const theMessage = message.content.slice(prefix.length);
    let command = theMessage.toLowerCase().trimStart();

    if (command === 'heem') {
        message.channel.send("ITS DA HEEMS");
    }

})

client.login(process.env.TOKEN);