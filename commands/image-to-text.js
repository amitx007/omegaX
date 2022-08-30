const Tesseract = require("tesseract.js");
const { bold,SlashCommandBuilder } = require("discord.js");
const command = new SlashCommandBuilder()
  .setName("imagetotext")
  .setDescription("Convert any image to text")
  .addAttachmentOption((option) =>
    option.setName("image").setDescription("upload the image").setRequired(true)
  );
function conversion(interaction) {
  return Tesseract.recognize(
    interaction.options.data[0].attachment.url,
    "eng",
    {
      logger: (m) => console.log(m),
    }
  )
    .then(({ data: { text } }) => {
      interaction.followUp(
        `${interaction.user} ${
          interaction.options.data[0].attachment.url
        }\n\n ${bold("=================== TEXT ====================")}\n: ${text} \n\n`
      );
    })
    .then((result) => {})
    .catch((err) => {
      interaction.reply(
        "Sorry there are some error occured . please try again"
      );
    });
}
module.exports = {
  command,
  async execute(interaction) {
    interaction.reply("Working on it");
    await conversion(interaction);
  },
};
