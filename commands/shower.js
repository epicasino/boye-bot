const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('shower')
		.setDescription('take a shower'),
	async execute(interaction) {
		// gif
		await interaction.reply('https://tenor.com/view/league-of-legends-genshin-impact-oh-the-misery-shower-soap-gif-25193414');
	},
};