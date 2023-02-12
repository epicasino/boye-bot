const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('queue')
		.setDescription('Shows all tracks currently in the server queue.'),
	async execute(interaction) {
		const queue = global.player.getQueue(interaction.guild.id);

		if (!queue) {
			return await interaction.reply('There isnt any music playing.');
		}

		if (!queue.tracks[0]) {
			return await interaction.reply('There aren\'t any other tracks in the queue.');
		}

		const tracks = queue.tracks.map((track, i) => `\`${i + 1}\` [${track.title}] by **${track.author}** (Requested by <@${track.requestedBy.id}>)`);
		const songs = queue.tracks.length;
		const nextSongs = songs > 5 ? `And **${songs - 5}** other ${songs - 5 > 1 ? 'tracks' : 'track'} currently in queue.` : '';
		const progress = queue.createProgressBar();

		return await interaction.reply(`**Current Track:** [${queue.current.title}] by **${queue.current.author}**\n${progress}\n\n${tracks.slice(0, 5).join('\n')}\n\n${nextSongs}`);
	},
};