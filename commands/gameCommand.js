const {
  // Client,
  // GatewayIntentBits,
  SlashCommandBuilder,
  bold,
  underscore,
  EmbedBuilder,
} = require("discord.js");

const gameGrid = require("../game/gameLayout");
const gameLogic = require("../game/game-logic");

// const client = new Client({
//   intents: [
//     GatewayIntentBits.Guilds,
//     GatewayIntentBits.GuildMessages,
//     GatewayIntentBits.GuildMessageReactions,
//   ],
// });

let grid;
let gridString = "";
let bombLocation;

const command = new SlashCommandBuilder()
  .setName("droptheparcel")
  .setDescription(
    "Its a 2d game where the player need to deliver a parcel in the location without dying."
  );

const execute = async function (
  interaction,
  mesaage = "",
  reactionMessage = null,
  user = null,
  reset = false
) {
  if (reset) {
    grid = null;
    bombLocation = null;
    gridString = "";
  }
  const embed = new EmbedBuilder()
    .setTitle(`${bold("Deliver the parcel")}`)
    .setDescription(
      "Your mission is to drop the gift in location ❎ without being 💀. So think twice before you move.  "
  ).addFields({name:"Description",value:`All bombs are triggered by weight . So when an user will be on a bomb place then u will die but if their is a gift on the bomb place it will not blow up because of its light weight . ${bold("GOOD LUCK BECAUSE YOU NEED IT")}`})
    .setColor("DarkPurple");
  if (!grid) {
    grid = gameGrid.gameGrid();
    bombLocation = gameGrid.bombLocation;
    grid.forEach((row, index) => {
      gridString = gridString + row.join("") + "\n";
    });
    if (reset) {
      return controls(mesaage, reactionMessage, user);
    }
    embed.addFields({ name: "game status", value: gridString });
  }
  try {
    const mesaage = await interaction.reply({
      embeds: [embed],
      fetchReply: true,
    });
    await Promise.all([
      mesaage.react("⬆️"),
      mesaage.react("➡️"),
      mesaage.react("⬅️"),
      mesaage.react("⬇️"),
      mesaage.react("🔁"),
    ]);
  } catch (error) {
    await interaction.reply(
      "initializing game type /game again to start the game"
    );
  }
};
const controls = async function (message, reactionMessage, user) {
 
  const embed = new EmbedBuilder()
    .setTitle(`${bold("Deliver the parcel")}`)
    .setColor("DarkPurple");
  
  
  if (grid) {
    gameLogic.controls(grid, message, bombLocation);
    gridString = "";

    let droplocation = gameLogic.dropLocation(grid);
    let isdead = gameLogic.isDead(grid, bombLocation);
    
  
    grid.forEach((row, index) => {
      gridString = gridString + row.join("") + "\n";
    });


    if (isdead) {
      embed.addFields({
        name: "game status",
        value:
          gridString +
          "\n\n\n you are 💀💀💀. type /droptheparcel or click on 🔁 to restart the game.",
      });
      grid = null;
      gridString = "";
      try {
        const x= await reactionMessage.message.channel.send({
          content: `<@${user.id}>`,
          embeds: [embed],
        });
        return await Promise.all([
          x.react("💀"),
          x.react("🔁"),
        ]);
        
      } catch (error) {
        console.log(error);
      }

    }
    if (droplocation === 0) {
      embed.addFields({
        name: "game status",
        value: gridString + "\n\n\n you have cleared the level",
      });
      const x = await reactionMessage.message.channel.send({
        content: `<@${user.id}>`,
        embeds: [embed],
      });
      await Promise.all([
        x.react("⬆️"),
        x.react("➡️"),
        x.react("⬅️"),
        x.react("⬇️"),
        x.react("🔁"),
      ]);

      gridString = "";
      grid = null;
    } else {
      embed.addFields({ name: "game status", value: gridString });
      const x = await reactionMessage.message.channel.send({
        content: `<@${user.id}>`,
        embeds: [embed],
      });
      await Promise.all([
        x.react("⬆️"),
        x.react("➡️"),
        x.react("⬅️"),
        x.react("⬇️"),
        x.react("🔁"),
      ]);
    }
  } else {
    reactionMessage.message.channel.send("start game by typing /game");
  }
};

module.exports = { command, execute, controls };
