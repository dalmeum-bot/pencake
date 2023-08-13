const fs = require('node:fs');
const path = require('node:path');
const { REST, Routes } = require('discord.js');
const { clientId, guildId, token } = require('../config.json');

const commands = [];
const commandCategoryPath = path.join(__dirname, 'commands');
const commandCategories = fs.readdirSync(commandCategoryPath);

commandCategories.forEach(category => {
    const commandPath = path.join(commandCategoryPath, category);
    const commandFiles = fs.readdirSync(commandPath).filter(file => file.endsWith('.js'));

    commandFiles.forEach(file => {
        const command = require(path.join(commandPath, file));

        if ('data' in command && 'execute' in command) {
            commands.push(command.data.toJSON());
        } else {
            console.error(`The command at ${file} is missing a required "data" or "execute" property.`);
        }
    });
});

const rest = new REST().setToken(token);

(async () => {
    try {
        console.log(`Started refreshing application ${commands.length} commands.`);

        const datas = await rest.put(
            Routes.applicationCommands(clientId),
            // Routes.applicationGuildCommands(clientId, guildId),
            { body: commands },
        );

        console.log(`Successfully reloaded application ${datas.length} commands.`);
    } catch (err) {
        console.error(err);
    }
})();
