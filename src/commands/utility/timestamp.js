const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('timestamp')
        .setDescription('generate timestamp')
        .addNumberOption(option => option
            .setName('year')
            .setDescription('year')
        )
        .addNumberOption(option => option
            .setName('month')
            .setDescription('month')
            .setMinValue(1)
            .setMaxValue(12)
        )
        .addNumberOption(option => option
            .setName('day')
            .setDescription('day')
            .setMinValue(1)
            .setMaxValue(31)
        )
        .addNumberOption(option => option
            .setName('hour')
            .setDescription('hour')
            .setMinValue(0)
            .setMaxValue(23)
        )
        .addNumberOption(option => option
            .setName('minute')
            .setDescription('minute')
            .setMinValue(0)
            .setMaxValue(59)
        )
        .addNumberOption(option => option
            .setName('second')
            .setDescription('second')
            .setMinValue(0)
            .setMaxValue(59)
        )
        .addStringOption(option => option
            .setName('style')
            .setDescription('timestamp style')
            .addChoices(
                // 발번역 주의
                { name: 'time exclude seconds', value: 't' },
                { name: 'time include seconds', value: 'T' },
                { name: 'simplify date', value: 'd' },
                { name: 'detail date', value: 'D' },
                { name: 'detail date and time', value: 'f' },
                { name: 'detail date and time and week', value: 'F' },
                { name: 'relation time', value: 'R' },
            )
        )
    ,

    async execute(interaction) {
        const year = interaction.options.getNumber('year') ?? new Date().getFullYear();
        const month = interaction.options.getNumber('month') ?? new Date().getMonth() + 1;
        const day = interaction.options.getNumber('day') ?? new Date().getDate();
        const hour = interaction.options.getNumber('hour') ?? new Date().getHours();
        const minute = interaction.options.getNumber('minute') ?? new Date().getMinutes();
        const second = interaction.options.getNumber('second') ?? new Date().getSeconds();

        const style = interaction.options.getString('style') ?? 'F';

        const time = new Date();
        time.setFullYear(year);
        time.setMonth(month - 1);
        time.setDate(day);
        time.setHours(hour);
        time.setMinutes(minute);
        time.setSeconds(second);

        return interaction.reply(`<t:${Math.floor(time.getTime() / 1000)}:${style}>`);
    }
}