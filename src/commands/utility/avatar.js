const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('avatar')
        .setDescription('get image of member')
        .addUserOption(option => option
            .setName('target')
            .setDescription('who you want to get avatar')
        ),

    async execute(interaction) {
        // getUser랑 getMember의 차이점이 뭐냐
        const user = interaction.options.getUser('target');

        if (user) {
            return interaction.reply(`${user.username}'s avatar: ${user.displayAvatarURL({ dynamic: true })}`);
        } else {
            return interaction.reply(`Your avatar: ${interaction.user.displayAvatarURL()}`);
        }
    }
}