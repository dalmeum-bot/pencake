const fs = require('node:fs');
const path = require('node:path');
const { REST, Routes, Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const { token, clientId, guildId } = require('../config.json');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildModeration,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildMessageTyping,
        GatewayIntentBits.GuildPresences,
    ]
});

deployCommands = (client, token, clientId, guildId) => {
    client.commands = new Collection();

    const categoryPath = path.join(__dirname, 'commands');
    const categories = fs.readdirSync(categoryPath);

    categories.forEach(category => {
        const commandPath = path.join(categoryPath, category);
        const commandFiles = fs.readdirSync(commandPath).filter(file => file.endsWith('.js'));

        commandFiles.forEach(file => {
            const command = require(path.join(commandPath, file));

            if ('data' in command && 'execute' in command) {
                command.data.name = file.slice(0, -'.js'.length);
                client.commands.set(command.data.name, command);
            } else {
                console.error(`The command at ${file} is missing a required "data" or "execute" property.`);
            }
        });
    });

    const rest = new REST().setToken(token);

    (async () => {
        try {
            console.log(`Started refreshing application ${client.commands.size} commands.`);

            const datas = await rest.put(
                Routes.applicationCommands(clientId),
                // Routes.applicationGuildCommands(clientId, guildId),
                {body: Array.from(client.commands.values()).map(command => command.data.toJSON())},
            );

            console.log(`Successfully reloaded application ${datas.length} commands.`);
        } catch (err) {
            console.error(err);
        }
    })();
};

deployEvents = (client) => {
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
};

deployCommands(client, token, clientId, guildId);
deployEvents(client);
client.login(token);