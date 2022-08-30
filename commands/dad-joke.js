const { SlashCommandBuilder } = require("discord.js");
const unirest = require("unirest");
const command = new SlashCommandBuilder()
  .setName("dadjoke")
  .setDescription("Get random endless dad jokes");
const execute = async function (interaction) {
    await interaction.reply("your joke is loading");
    const req = unirest(
      "GET",
      "https://dad-jokes.p.rapidapi.com/random/joke/png"
    );

    req.headers({
      "X-RapidAPI-Key": "27879a1295msh9e08793fe9bc1dbp1fa136jsncc46a6c2c1da",
      "X-RapidAPI-Host": "dad-jokes.p.rapidapi.com",
      useQueryString: true,
    });

    req.end(function (res) {
      if (res.error) throw new Error(res.error);
        interaction.editReply(res.body.body.setup + " " + res.body.body.punchline);
    });
    
};
module.exports = {
  command,
  execute,
};
