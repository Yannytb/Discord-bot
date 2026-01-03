const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const economy = require('../economySystem');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('withdrawmoney')
        .setDescription('Retirer de l\'argent à un utilisateur (Admin)')
        .addUserOption(opt => opt.setName('cible').setDescription('L\'utilisateur à débiter').setRequired(true))
        .addIntegerOption(opt => opt.setName('montant').setDescription('Somme à retirer').setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction) {
        const target = interaction.options.getUser('cible');
        const amount = interaction.options.getInteger('montant');
        const currentBal = economy.getBalance(target.id);

        if (amount <= 0) return interaction.reply({ content: 'Le montant doit être positif.', ephemeral: true });
        
        // On retire l'argent (on passe un nombre négatif à addMoney)
        economy.addMoney(target.id, -amount);
        
        await interaction.reply({ 
            content: `💸 J'ai retiré **${amount}** pièces du compte de **${target.username}**. Son nouveau solde est de **${economy.getBalance(target.id)}** pièces.` 
        });
    },
};