const { ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setDescription('search various sites')
        .addSubcommand(subcommand => subcommand
            .setName('discordjs')
            .setDescription('search discord.js docs')
            .addStringOption(option => option
                .setName('query')
                .setDescription('search query')
                .setRequired(true)
            )
        )
        .addSubcommand(subcommand => subcommand
            .setName('numpy')
            .setDescription('search numpy docs')
            .addStringOption(option => option
                .setName('query')
                .setDescription('search query')
                .setRequired(true)
            )
        )
        .addSubcommand(subcommand => subcommand
            .setName('matplotlib')
            .setDescription('search matplotlib docs')
            .addStringOption(option => option
                .setName('query')
                .setDescription('search query')
                .setRequired(true)
            )
        )
        .addSubcommand(subcommand => subcommand
            .setName('python')
            .setDescription('search python docs')
            .addStringOption(option => option
                .setName('query')
                .setDescription('search query')
                .setRequired(true)
            )
        )
        .addSubcommand(subcommand => subcommand
            .setName('kotlin')
            .setDescription('search kotlin docs')
            .addStringOption(option => option
                .setName('query')
                .setDescription('search query')
                .setRequired(true)
            )
        )
        .addSubcommand(subcommand => subcommand
            .setName('mdn')
            .setDescription('search mdn docs')
            .addStringOption(option => option
                .setName('query')
                .setDescription('search query')
                .setRequired(true)
            )
        )
        .addSubcommand(subcommand => subcommand
            .setName('fabric')
            .setDescription('search fabric docs')
            .addStringOption(option => option
                .setName('query')
                .setDescription('search query')
                .setRequired(true)
            )
        )
        .addSubcommand(subcommand => subcommand
            .setName('forge')
            .setDescription('search forge docs')
            .addStringOption(option => option
                .setName('query')
                .setDescription('search query')
                .setRequired(true)
            )
        )
    ,

    async execute(interaction) {
        const subcommand = interaction.options.getSubcommand();
        const query = interaction.options.getString('query');

        let url = null;
        switch (subcommand) {
            case 'discordjs':
                url = `https://old.discordjs.dev/#/docs/discord.js/14.11.0/search?query=${query}`;
                break;
            case 'numpy':
                url = `https://numpy.org/doc/stable/search.html?q=${query}`;
                break;
            case 'matplotlib':
                url = `https://matplotlib.org/stable/search.html?q=${query}`;
                break;
            case 'python':
                url = `https://docs.python.org/3/search.html?q=${query}`;
                break;
            case 'kotlin':
                url = `https://kotlinlang.org/docs/home.html?q=${query}&s=full`;
                break;
            case 'mdn':
                url = `https://developer.mozilla.org/en-US/search?q=${query}`;
                break;
            case 'fabric':
                url = `https://fabricmc.net/wiki/start?do=search&id=start&q=${query}`;
                break;
            case 'forge':
                url = `https://docs.minecraftforge.net/en/latest/search.html?q=${query}`;
                break;
        }

        const button = new ButtonBuilder()
            .setLabel('Search Results')
            .setURL(url)
            .setStyle(ButtonStyle.Link)
        ;

        await interaction.reply({ components: [
            new ActionRowBuilder().addComponents(button)
        ]});
    }
}