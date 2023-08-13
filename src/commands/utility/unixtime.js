const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('시각')
        .setDescription('입력한 시각의 타임스탬프를 생성합니다.')
        .addNumberOption(option => option
            .setName('시')
            .setRequired(true)
        )
        .addNumberOption(option => option
            .setName('분')
            .setRequired(true)
        )
        .addNumberOption(option => option
            .setName('초')
        )
        .addStringOption(option => option
            .setName('스타일')
            .setDescription('타임스탬프의 스타일을 결정합니다.')
            .addChoices(
                { name: '초 생략', value: 't' },
                { name: '초 포함', value: 'T' }
            )
        )
    ,

    async execute(interaction) {
        const hour = interaction.options.getNumber('시');
        const minute = interaction.options.getNumber('분');
        const second = interaction.options.getNumber('초') ?? 0;
        const style = interaction.options.getNumber('스타일') ?? 't';

        const time = new Date();
        time.setHours(hour);
        time.setMinutes(minute);
        time.setSeconds(second);

        return interaction.reply(`<t:${Math.floor(time.getTime() / 1000)}:${style}>`);
    }
}