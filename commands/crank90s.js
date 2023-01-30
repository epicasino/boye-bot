const { SlashCommandBuilder } = require('discord.js');

const gifCollection = [
	// steve cranking 90s
	'https://tenor.com/view/fortnite-gif-26205596',
	// dont be cracked
	'https://tenor.com/view/fortnite-drops-phone-phone-cracked-fortnite-cracked-gif-21804150',
	// fortnite rick
	'https://tenor.com/view/rick-sanchez-rick-fortnite-rick-90s-rick90s-gif-22784968',
	// regular 90s crank
	'https://tenor.com/view/90s-gif-19942050',
];

module.exports = {
	data: new SlashCommandBuilder()
		.setName('crank90s')
		.setDescription('Bot cranks 90s!'),
	async execute(interaction) {
		await interaction.reply(gifCollection[Math.floor(Math.random() * gifCollection.length)]);
	},
};