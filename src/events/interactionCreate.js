const { Events } = require('discord.js');

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {
        if (!interaction.isChatInputCommand()) return;

        const command = interaction.client.commands.get(interaction.commandName);

        if (!command) {
            console.error(`The command ${interaction.commandName} does not exist.`);
            return;
        }

        try {
            await command.execute(interaction);
        } catch (err) {
            console.error(`An error occurred while executing the command ${interaction.commandName}:`);
            console.error(err);
        }
    }
}