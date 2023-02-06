const { SlashCommandBuilder } = require('discord.js');
const ytdl = require('ytdl-core');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Plays audio')
        .addStringOption(option =>
            option.setName('url')
                .setDescription('URL')
            ),
    async execute(interaction) {

    }
};

// interaction.user is the object representing the User who ran the command
// interaction.member is the GuildMember object, which represents the user in the specific guild