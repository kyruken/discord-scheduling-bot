const fs = require('node:fs');
const path = require('node:path');
const {Client, Events, Collection, GatewayIntentBits}= require('discord.js');

require('dotenv').config();
const prefix = 'ibra';
const client = new Client({
    intents: [GatewayIntentBits.Guilds]
});


client.commands = new Collection();

//commandPath -> ../commands
//commandFiles looks for all js files in commands folder
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
for (const file in commandFiles) {
    //Documentation got this wrong
    //const filePath = path.join(commandsPath, file);

    const filePath = path.join(commandsPath, commandFiles[file]);
    const command = require(filePath);

    if ('data' in command && 'execute' in command) {
        client.commands.set(command.data.name, command);
    } else {
        console.log(`[WARNING] the command at ${filePath} is missing a data or execute`)
    }

}
client.on("ready", () => {
    console.log("Bot is online");
})

// client.on("messageCreate", (message) => {
//     if (!message.content.startsWith(prefix) || message.author.bot) return;
    
//     const theMessage = message.content.slice(prefix.length);
//     let command = theMessage.toLowerCase().trimStart();

//     if (command === 'heem') {
//         message.channel.send("ITS DA HEEMS");
//     }
// })

client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;
    
    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) {
        console.log(`No command matching ${interaction.commandName} was found.`);
        return;
    }

    try {
        await command.execute(interaction);
    } catch (err) {
        console.error(err);
        await interaction.reply({content: 'There was an error running this command!', ephermeral: true});
    }

})

client.login(process.env.TOKEN);