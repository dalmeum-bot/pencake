const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('fun command'),

    async execute(interaction) {
        interaction.reply('pong!');
    }
}