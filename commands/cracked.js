const { SlashCommandBuilder } = require('discord.js');

const gifCollection = [
	// garrys mod
	'https://tenor.com/view/2009cord-gmod-garrys-mod-deez-nuts-hi-gif-22165476',
	// dont be cracked minecraft
	'https://tenor.com/view/please-dont-be-cracked-please-dont-be-cracked-gif-21827763',
	// fortnite
	'https://tenor.com/view/moosh-fortnite-dont-be-cracked-troll-gif-21907195',
	// valorant
	'https://tenor.com/view/kian-osu-dont-be-cracked-drops-phone-valorant-gif-21994708',
	// osu
	'https://tenor.com/view/shigetora-cookiezi-phone-cracked-osu-phone-osu-gif-25052326',
	// plateup
	'https://cdn.discordapp.com/attachments/819817069281411072/1071002605804863528/please_dont_be_cracked_plateup.gif',
];

module.exports = {
	data: new SlashCommandBuilder()
		.setName('dontbecracked')
		.setDescription('dont be cracked...'),
	async execute(interaction) {
		await interaction.reply(gifCollection[Math.floor(Math.random() * gifCollection.length)]);
	},
};