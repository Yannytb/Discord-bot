const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const economy = require('../economySystem');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('balance')
        .setDescription('Affiche ton solde ou celui d\'un utilisateur')
        .addUserOption(opt => opt.setName('cible').setDescription('L\'utilisateur à vérifier')),
    async execute(interaction) {
        const target = interaction.options.getUser('cible') || interaction.user;
        const bal = economy.getBalance(target.id);

        const embed = new EmbedBuilder()
            .setColor(0x00AE86)
            .setTitle(`Portefeuille de ${target.username}`)
            .setDescription(`💰 **${bal}** pièces Yutil.`)
            .setThumbnail(target.displayAvatarURL());

        await interaction.reply({ embeds: [embed] });
    },
};