const { SlashCommandBuilder, VoiceState } = require('discord.js');
const { DisTube, DisTubeVoice, SearchResultVideo } = require('distube')
const { Client, Collection, GatewayIntentBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Searches for audio')
        .addStringOption(option =>
            option.setName('url')
                .setDescription('Input URL')
                .setRequired(true)
            ),
    async execute(interaction) {
        // var to get url input from user
        const searchurl = interaction.options.getString('url');
        
        await interaction.reply(searchurl);

    }


};