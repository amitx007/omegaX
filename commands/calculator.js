const mexp = require("math-expression-evaluator");
const {
  underscore,
  bold,
  SlashCommandBuilder,
  EmbedBuilder,
} = require("discord.js");
const embed = new EmbedBuilder()
  .setTitle("CALCULATOR")
  .setDescription("you can calulate most of the thing .")
  .setImage(
    "https://img.icons8.com/external-flat-icons-inmotus-design/344/external-Calculator-calculator-flat-icons-inmotus-design-16.png"
  )
  .setColor("#57FF0E")
  .setURL("https://github.com/bugwheels94/math-expression-evaluator")
  .addFields({
    name: "Syntax",
    value: "in which style we need to give expression to the bot",
  })
  .addFields(
    {
      name: "Basic operation",
      value: `this include operartion like ${bold("Addition")} ,${bold(
        "subtraction"
      )} ,${bold("multiplication")} and ${bold("division")}`,
    },
    { name: `>${underscore("Addition")}`, value: "2+3+5", inline: true },
    { name: `>${underscore("subtraction")}`, value: "10-23", inline: true },
    {
      name: `>${underscore("multiplication")}`,
      value: "2*12*0.5",
      inline: true,
    },
    { name: `>${underscore("division")}`, value: "2/10", inline: true }
  )
  .addFields(
    {
      name: "constants",
      value: `this include constants like ${bold("pi")} ,${bold("e")}`,
    },
    { name: `>${underscore("pi")}`, value: "returns 3.14", inline: true },
    {
      name: `>${underscore("e")}`,
      value: "returns 2.71",
      inline: true,
    }
  )
  .addFields(
    {
      name: "permutation and combination ",
      value: `this include operation like ${bold("P")}<for permutation> ,${bold(
        "C"
      )}<for combination>`,
    },
    {
      name: `>${underscore("P")}`,
      value: "Permutation operator eg. 4P2 returns 12",
      inline: true,
    },
    {
      name: `>${underscore("C")}`,
      value: "Combination operator eg. 4C2 returns 6",
      inline: true,
    }
  )
  .addFields(
    {
      name: "factorial",
      value: `this include operation like ${bold("!")}<for factorial>`,
    },
    {
      name: `>${underscore("!")}`,
      value: "factorial operator eg. 4! returns 24",
      inline: true,
    }
  )
  .addFields(
    {
      name: "power and logrithms",
      value: `this include operation like ${bold("^")} or ${bold(
        "pow"
      )} <for power> ,  ${bold(
        "log"
      )} <logarithmic function with base 10> , ${bold(
        "ln"
      )} <natural log function with base e > ,${bold(
        "root"
      )} <for square root>`,
    },
    {
      name: `>${underscore("pow or ^")}`,
      value: "power operator eg. 4^2 returns 16 using pow() eg. pow(2,3) ",
      inline: true,
    },
    {
      name: `>${underscore("root")}`,
      value: "squareroot operator eg. root 4 returns 2 ",
      inline: true,
    },
    {
      name: `>${underscore("log")}`,
      value: "logarithmic function with base 10 eg. log 1000 returns 3",
      inline: true,
    },
    {
      name: `>${underscore("ln")}`,
      value: "natural log function with base e eg. ln 2 returns 0.3010",
      inline: true,
    }
  )
  .addFields(
    {
      name: "Trigonometry and Inverse Trigonometry",
      value: `this include operation like ${bold(
        "sin"
      )} <for sin function> ${bold(
        "sinh"
      )} <for Hyperbolic Sine function> ,  ${bold(
        "asinh"
      )} <Inverse Hyperbolic Sine function> and there are more`,
    },
    {
      name: `>${underscore("sin")},${underscore("cos")},${underscore(
        "tan"
      )},${underscore("sinh")},${underscore("cosh")},${underscore("tanh")}`,
      value:
        "trigonometry function eg. sin 45 returns 0.707106781186547 or eg (sin 90 / cos 45)+1 returns  2.414213562373095 \n Hyperbolic trigonometric function eg. sinh 45 return infinity \n",
    },
    {
      name: `>${underscore("asin")},${underscore("acos")},${underscore(
        "atan"
      )},${underscore("asinh")},${underscore("acosh")},${underscore("atanh")}`,
      value:
        "asin Inverse Sine function and asinh Inverse Hyperbolic Sine function",
    }
  );
const command = new SlashCommandBuilder()
  .setName("calculator")
  .setDescription("You can calculate anything")
  .addSubcommand((subcommand) =>
    subcommand
      .setName("calulate")
      .setDescription("add your expression over here")
      .addStringOption((option) =>
        option
          .setName("expression")
          .setDescription("put your mathematical expression over here")
          .setRequired(true)
      )
  )
  .addSubcommand((subcommand) =>
    subcommand
      .setName("help")
      .setDescription("This will help you to know how to use the calculator")
  );
module.exports = {
  command,
  async execute(interaction) {
    const expression = interaction.options.data[0].options[0].value;
    try {
      const result = mexp.eval(expression);
      await interaction.reply(
        `hey ${interaction.user} ${expression} = ${result}`
      );
    } catch (error) {
      await interaction.reply(
        `Wrong input try ${bold("/calculator help")} to know the proper syntax`
      );
    }
  },
  async executeInfo(interaction) {
    // console.log(interaction.options.data[0].value);
    await interaction.reply({ embeds: [embed] });
  },
};
