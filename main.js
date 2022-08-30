require("dotenv").config();
const {
  Client,
  GatewayIntentBits,
  REST,
  Routes,
  ActionRowBuilder,
  SelectMenuBuilder,
  Emoji,
  parseEmoji,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");
// commands
const dad_joke = require("./commands/dad-joke");
const calculator = require("./commands/calculator");
const imagetotext = require("./commands/image-to-text");
const search = require("./commands/serach");
const weather = require("./commands/weather");
const game = require("./commands/gameCommand");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessageReactions,
  ],
  restTimeOffset: 0,
});
const commands = [
  dad_joke.command,
  calculator.command,
  imagetotext.command,
  search.command,
  weather.command,
  game.command,
];
const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);
(async () => {
  try {
    console.log("Started refreshing application (/) commands.");

    // registering the guild command
    await rest.put(
      Routes.applicationGuildCommands(
        process.env.CLIENT_ID,
        process.env.GUILD_ID
      ),
      {
        body: commands,
      }
    );

    console.log("Successfully reloaded application (/) commands.");
  } catch (error) {
    console.error(error);
  }
})();
client.on("ready", (x) => {
  console.log(`${x.user.username} bot # ${x.user.discriminator} is activated`);
});
client.on("messageCreate", async (message) => {
  if (
    message.content == "!w" ||
    message.content == "!s" ||
    message.content == "!a" ||
    message.content == "!d"
  ) {
    await game.controls(message);
  }
});

client.on("messageReactionAdd", async (reactionMessage, user) => {
    if (reactionMessage.count > 1) {
      if (reactionMessage.emoji.name == "⬆️") {
        await game.controls("!w", reactionMessage, user);
      } else if (reactionMessage.emoji.name == "➡️") {
        await game.controls("!d", reactionMessage, user);
      } else if (reactionMessage.emoji.name == "⬅️") {
        await game.controls("!a", reactionMessage, user);
      } else if (reactionMessage.emoji.name == "⬇️") {
        await game.controls("!s", reactionMessage, user);
      } else if (reactionMessage.emoji.name == "🔁") {
        await game.execute(null, "!r", reactionMessage, user, true);
      }
    }
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) {
    console.log("not a command");
    return;
  }

  if (interaction.commandName == "droptheparcel") {
    game.execute(interaction);
  }
  if (interaction.commandName == "todaysweather") {
    weather.execute(interaction);
  }
  if (interaction.commandName == "search") {
    await search.execute(interaction);
  }
  if (interaction.commandName == "imagetotext") {
    await imagetotext.execute(interaction);
  }
  if (interaction.commandName == "calculator") {
    if (interaction.options.data[0].name == "calulate") {
      await calculator.execute(interaction);
    } else {
      await calculator.executeInfo(interaction);
    }
  }
  if (interaction.commandName == "dadjoke") {
    await dad_joke.execute(interaction);
  }
});
client.login(process.env.TOKEN);
