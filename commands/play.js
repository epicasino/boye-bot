const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require("discord.js");
const { PlayerError } = require("discord-player");


module.exports = {
    data: new SlashCommandBuilder()
        .setName("play")
        .setDescription("Adds a track to the end of the server queue.")
        .addStringOption((option) => option.setName("url").setDescription("Enter URL.").setRequired(true)),
    async execute(interaction) {
        if (!interaction.member.voice.channelId) {
            await interaction.reply('Not in VC.');
        }

        const query = interaction.options.getString("url");
        const queue = global.player.createQueue(interaction.guild, {
            leaveOnEnd: true,
            leaveOnStop: true,
            leaveOnEmpty: true,
            leaveOnEmptyCooldown: 300000,
            autoSelfDeaf: false,
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
            queue.destroy();
            await interaction.reply("I can't join that voice channel.");
        }

        const res = await global.player.search(query, {
            requestedBy: interaction.user,
        });

        if (!res) {
            await queue.destroy();
            interaction.reply(`I couldn't find anything with the name **${query}**.`);
        }

        try {
            res.playlist ? queue.addTracks(res.tracks) : queue.addTrack(res.tracks[0]);
            if (!queue.playing) await queue.play();
        } catch (err) {
            if (err instanceof PlayerError) {
                if (err.statusCode == "InvalidTrack") {
                    await interaction.reply(`I couldn't find anything with the name **${query}**.`);
                    await queue.destroy();
                }
            }

            console.error(err);

            await queue.destroy();
            interaction.reply("This media doesn't seem to be working right now, please try again later.");
        }

        if (!res.playlist) {
            interaction.reply(`Loaded **[${res.tracks[0].title}](${res.tracks[0].url})** by **${res.tracks[0].author}** into the server queue.`);
        } else {
            interaction.reply(`**${res.tracks.length} tracks** from the ${res.playlist.type} **[${res.playlist.title}](${res.playlist.url})** have been loaded into the server queue.`);
        }

        return await interaction.editReply({ embeds: [embed] });
    },
};