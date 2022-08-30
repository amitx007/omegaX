const unirest = require("unirest");
const { SlashCommandBuilder, bold, underscore } = require("discord.js");
const command = new SlashCommandBuilder()
  .setName("search")
  .setDescription("Search anything with google api")
  .addStringOption((option) =>
    option
      .setName("querry")
      .setDescription("Enter your querry over here")
      .setRequired(true)
  );
const execute = async function (interaction) {
  const querry = interaction.options.data[0].value.split(" ").join("+");
  const req = unirest(
    "GET",
    `https://google-search3.p.rapidapi.com/api/v1/search/q=${querry}`
  );
  try {
    interaction.reply(`working on your querry ${interaction.user}`);
    req.headers({
      "X-User-Agent": "desktop",
      "X-Proxy-Location": "EU",
      "X-RapidAPI-Key": "27879a1295msh9e08793fe9bc1dbp1fa136jsncc46a6c2c1da",
      "X-RapidAPI-Host": "google-search3.p.rapidapi.com",
      useQueryString: true,
    });

    req.end(function (res) {
      if (res.error) throw new Error(res.error);

      const data = [];
      // console.log(res.body.results);
      for (let i = 0; i < 5; i++) {
        data.push(res.body.results[i]);
      }
      //   console.log(data);
      const refinedData = data.map((ele) => {
        const { title, link, description } = ele;
        return { title, link, description };
      });
      let reply = `${bold("====================================")}\n\n`;
      refinedData.forEach((ele, index) => {
        reply =
          reply +
          ` ${underscore(bold(`SEARCH RESULT: ${index + 1}`))}\n
          ${bold("TITLE :")} ${ele.title} \n
            ${bold("LINK :")} ${ele.link} \n
            ${bold("Description :")} ${ele.description.substring(0, 0)} 
             \n\n${bold("====================================")}\n\n`;
      });
      interaction.editReply(reply);
    });
  } catch (error) {
    interaction.editReply(`working on your querry ${interaction.user}`);
  }

  //   console.log(interaction.options.data[0].value);
};
module.exports = {
  command,
  execute,
};
