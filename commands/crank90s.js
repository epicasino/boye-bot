const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('crank90s')
		.setDescription('Bot cranks 90s!'),
	async execute(interaction) {
		await interaction.reply('https://tenor.com/view/fortnite-gif-26205596');
	},
};