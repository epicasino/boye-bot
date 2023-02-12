const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('skip')
		.setDescription('Skips current song'),

	async execute(interaction) {
		const queue = global.player.getQueue(interaction.guild.id);

		if (!queue.playing) {
			return await interaction.reply('No music is playing');
		}

		queue.skip();
		return await interaction.reply(`The track **[${queue.current.title}][${queue.current.url}]** was skipped`);

	},
};