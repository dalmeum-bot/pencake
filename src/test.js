const axios = require("axios");
const cheerio = require("cheerio");

async function getHTML(url) {
    try {
        return (await axios.get(url)).data;
    } catch (error) {
        console.error(error);
    }
}

url = "https://old.discordjs.dev/#/docs/discord.js/14.11.0/search?query=client";
getHTML(url)
    .then(response => {
        const $ = cheerio.load(response);
        const data = $("#container > div > div > div > div.mx-auto.py-16.px-4.sm\\:px-8.lg\\:py-8.w-full > div > h1")
        console.log(data.text());
    })