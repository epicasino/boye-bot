const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require("discord.js");
const { PlayerError } = require("discord-player");


module.exports = {
    data: new SlashCommandBuilder()
        .setName("play")
        .setDescription("Adds a track to the end of the server queue.")
        .addStringOption((option) => option.setName("url").setDescription("Enter URL.").setRequired(true)),
    async execute(interaction) {

        await interaction.deferReply();

        if (!interaction.member.voice.channelId) {
            return await interaction.editReply('Not in VC.');
        }

        const query = interaction.options.getString("url");
        const queue = global.player.createQueue(interaction.guild, {
            leaveOnEnd: true,
            leaveOnStop: true,
            leaveOnEmpty: true,
            leaveOnEmptyCooldown: 300000,
            autoSelfDeaf: true,
            spotifyBridge: true,
            ytdlOptions: {
                filter: "audioonly",
                opusEncoded: true,
                quality: "highestaudio",
                highWaterMark: 1 << 30,
            },
            metadata: {
                channel: interaction.channel,
            },
        });

        try {
            if (!queue.connection) await queue.connect(interaction.member.voice.channel);
        } catch (err) {
            await queue.destroy();
            return await interaction.editReply("I can't join that voice channel.");
        }

        const res = await global.player.search(query, {
            requestedBy: interaction.user,
        });

        if (!res) {
            await queue.destroy();
            return await interaction.editReply(`I couldn't find anything with the name **${query}**.`);
        }

        try {
            res.playlist ? queue.addTracks(res.tracks) : queue.addTrack(res.tracks[0]);
            if (!queue.playing) await queue.play();
        } catch (err) {
            if (err instanceof PlayerError) {
                if (err.statusCode == "InvalidTrack") {
                    await interaction.reply(`I couldn't find anything with the name **${query}**.`);
                    return await queue.destroy();
                }
            }

            console.error(err);
            await interaction.editReply("This media doesn't seem to be working right now, please try again later.");
            return await queue.destroy();
        }

        if (!res.playlist) {
            interaction.editReply(`Loaded **[${res.tracks[0].title}](${res.tracks[0].url})** by **${res.tracks[0].author}** into the server queue.`);
        } else {
            interaction.editReply(`**${res.tracks.length} tracks** from the ${res.playlist.type} **[${res.playlist.title}](${res.playlist.url})** have been loaded into the server queue.`);
        }
    },
};