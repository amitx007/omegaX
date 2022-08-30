const unirest = require("unirest");
const { SlashCommandBuilder, bold, underscore } = require("discord.js");
const command = new SlashCommandBuilder()
  .setName("todaysweather")
  .setDescription("you can find todays weather")
  .addStringOption((option) =>
    option
      .setName("cityname")
      .setDescription("put of your city name")
      .setRequired(true)
  )
  .addStringOption((option) =>
    option
      .setName("statename")
      .setDescription("put of your state name")
      .setRequired(true)
  )
  .addStringOption((option) =>
    option
      .setName("countryname")
      .setDescription("put of your countrty name")
      .setRequired(true)
  );

const execute = async function (interaction) {
  // await interaction.reply("hello");
  try {
    const req = unirest(
      "GET",
      "https://visual-crossing-weather.p.rapidapi.com/forecast"
    );

    req.query({
      aggregateHours: "24",
      location: `${interaction.options.data[0].value},${interaction.options.data[1].value},${interaction.options.data[2].value}`, // take input from user city , state ,country required // show it in embed
      contentType: "csv",
      unitGroup: "us",
      shortColumnNames: "0",
    });

    req.headers({
      "X-RapidAPI-Key": "27879a1295msh9e08793fe9bc1dbp1fa136jsncc46a6c2c1da",
      "X-RapidAPI-Host": "visual-crossing-weather.p.rapidapi.com",
      useQueryString: true,
    });

    req.end(function (res) {
      if (res.error) throw new Error(res.error);

      let arr = res.body.split("\n");
      arr.shift();
      interaction.reply(JSON.stringify(arr).substring());
    });
  } catch (error) {
    interaction.reply("there is some technical error please try again");
  }
};
module.exports = { command, execute };
