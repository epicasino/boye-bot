const { Events } = require('discord.js');
const { Player } = require('discord-player');
const { Client, GatewayIntentBits } = require('discord.js');

// Client class: specifies bot intents (whats bots should be allowed to do in server)
const client = new Client({
	intents: [GatewayIntentBits.Guilds, 
		GatewayIntentBits.GuildMessages, 
		GatewayIntentBits.GuildVoiceStates,
		GatewayIntentBits.MessageContent] 
});

//Initialize discord-player
const player = new Player(client);

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {
		if (!interaction.isChatInputCommand()) return;

		const command = interaction.client.commands.get(interaction.commandName);
		
		//discord-player (resume for later)
		if (interaction.commandName === 'play') {
			if (!interaction.member.voice.channelId) return await interaction.reply({ 
				content: "You are not in a voice channel!", 
				ephemeral: true });
			const query = interaction.options.getString("query");
			const queue = player.createQueue(interaction.guild, {
				metadata: {
					channel: interaction.channel
				}
			});

		// verify vc connection
		try {
			if (!queue.connection) await queue.connect(interaction.voice.channel);
		} catch {
			queue.destroy();
			return await interaction.reply({
				content: "Voice Channel Error",
			ephemeral: true});
		}
		
		await interaction.deferReply();
        const track = await player.search(query, {
            requestedBy: interaction.user
        }).then(x => x.tracks[0]);
        if (!track) return await interaction.followUp({ content: `❌ | Track **${query}** not found!` });

        queue.play(track);

        return await interaction.followUp({ content: `⏱️ | Loading track **${track.title}**!` });
    }

		if (!command) {
			console.error(`No command matching ${interaction.commandName} was found.`);
			return;
		}

		try {
			await command.execute(interaction);
		}
		catch (error) {
			console.error(`Error executing ${interaction.commandName}`);
			console.error(error);
		}
	},
};