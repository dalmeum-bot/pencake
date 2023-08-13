const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kick')
        .setDescription('kick the member who you want')
        .addUserOption(option => option
            .setName('target')
            .setDescription('the member to kick')
            .setRequired(true)
        ),

    async execute(interaction) {
        const member = interaction.options.getMember('target');
        return interaction.reply({ content: `kicked ${member}`, ephemeral: true });
    }
}