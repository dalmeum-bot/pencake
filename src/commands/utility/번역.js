const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const { naverApi } = require('../../../config.json');
const request = require('request');

module.exports = {
    data: new SlashCommandBuilder()
        .setDescription('translate text to target language')
        .addStringOption(option => option
            .setName('text')
            .setDescription('text to translate')
            .setRequired(true)
        )
        .addStringOption(option => option
            .setName('target')
            .setDescription('target language')
            .addChoices(
                { name: '한국어', value: 'ko' },
                { name: '영어', value: 'en' },
                { name: '일본어', value: 'ja' },
                { name: '중국어 간체', value: 'zh-CN' },
                { name: '중국어 번체', value: 'zh-TW' },
                { name: '베트남어', value: 'vi' },
                { name: '인도네시아어', value: 'id' },
                { name: '태국어', value: 'th' },
                { name: '독일어', value: 'de' },
                { name: '러시아어', value: 'ru' },
                { name: '스페인어', value: 'es' },
                { name: '이탈리아어', value: 'it' },
                { name: '프랑스어', value: 'fr' }
            )
        )
    ,

    async execute(interaction) {
        let embed = new EmbedBuilder();

        const text = interaction.options.getString('text');
        const detectOptions = {
            url: 'https://openapi.naver.com/v1/papago/detectLangs',
            form: { 'query': text },
            headers: { 'X-Naver-Client-Id': naverApi.clientId, 'X-Naver-Client-Secret': naverApi.clientSecret }
        };

        let srcLangCode = null;
        srcLangCode = await request.post(detectOptions, (error, response, body) => {
            if (!error && response.statusCode === 200) {
                return JSON.parse(body).langCode;
            } else {
                embed = embed
                    .setColor('Red')
                    .setTitle('언어 감지 실패')
                    .setDescription(`code ${response.statusCode}`);

                interaction.reply({ embeds: [embed] });
            }
        });

        // fixme: 비동기 프로그래밍 개빡세네 ㅋㅋ
        console.log(srcLangCode.body);

        if (srcLangCode == null) {
            return;
        }

        const target = interaction.options.getString('target') ?? (srcLangCode === 'ko' ? 'en' : 'ko');
        const translateOptions = {
            url: 'https://openapi.naver.com/v1/papago/n2mt',
            form: { 'source': srcLangCode, 'target': target, 'text': text },
            headers: { 'X-Naver-Client-Id': naverApi.clientId, 'X-Naver-Client-Secret': naverApi.clientSecret }
        };

        let translatedText = null;
        request.post(translateOptions, (error, response, body) => {
             if (!error && response.statusCode === 200) {
                 translatedText = JSON.parse(body).message.result.translatedText;
                 console.log(`번역: ${text} (${srcLangCode}) -> ${translatedText} (${target})`);
             } else {
                 embed = embed
                     .setColor('Red')
                     .setTitle('번역 실패')
                     .setDescription(`code ${response.statusCode}`);

                 interaction.reply({ embeds: [embed] });
             }
        });

        if (!translatedText == null) {
            return;
        }

        console.log(`번역: ${text} (${srcLangCode}) -> ${translatedText} (${target})`);

        embed = embed
            .setColor('Green')
            .addFields(
                { name: `번역할 문자열 (${srcLangCode})`, value: `\`\`\`${text}\`\`\`` },
                { name: `번역된 문자열 (${target})`, value: `\`\`\`${translatedText}\`\`\`` }
            )

        interaction.reply({ embeds: [embed] });
    }
}