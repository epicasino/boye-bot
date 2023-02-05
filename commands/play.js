const { SlashCommandBuilder } = require('discord.js');
const { DisTube } = require('distube')
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
        const searchurl = interaction.options.getString('url');
        

    }


};