const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const { token, clientId, guildId } = require('../config.json');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Collection();

const commandCategoryPath = path.join(__dirname, 'commands');
const commandCategories = fs.readdirSync(commandCategoryPath);
commandCategories.forEach(category => {
    const commandPath = path.join(commandCategoryPath, category);
    const commandFiles = fs.readdirSync(commandPath).filter(file => file.endsWith('.js'));

    commandFiles.forEach(file => {
        const command = require(path.join(commandPath, file));

        if ('data' in command && 'execute' in command) {
            client.commands.set(command.data.name, command);
        } else {
            console.error(`The command at ${file} is missing a required "data" or "execute" property.`);
        }
    });
});

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));
eventFiles.forEach(file => {
    const event = require(path.join(eventsPath, file));

    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
});

client.login(token);