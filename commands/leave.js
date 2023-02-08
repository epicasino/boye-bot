const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("leave")
        .setDescription("Stops the current track and clears the queue."),
    async execute(interaction) {
        const queue = global.player.getQueue(interaction.guild.id);

        if (!queue || !queue.playing) {
            return await interaction.reply("There isn't currently any music playing.");
        } else {
            queue.destroy();
            return await interaction.reply("The music has been stopped.");
        }
    },
};