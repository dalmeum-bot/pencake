const { Events } = require('discord.js');

module.exports = {
    name: Events.ClientReady,
    once: true,

    async execute(interaction) {
        console.log(`Logged in as ${interaction.user.tag}`);
    }
}