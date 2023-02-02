const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('criminal')
		.setDescription('criminal activity'),
	async execute(interaction) {
		// gif
		await interaction.reply('https://cdn.discordapp.com/attachments/825987661637353522/1069800643553923102/trim.9954CE6F-E86D-43E1-9980-511F4FD6A4D7.mov');
	},
};