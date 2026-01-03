const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const economy = require('../economySystem');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('addmoney')
        .setDescription('Ajouter de l\'argent à un utilisateur (Admin)')
        .addUserOption(opt => opt.setName('cible').setDescription('L\'utilisateur à créditer').setRequired(true))
        .addIntegerOption(opt => opt.setName('montant').setDescription('Somme à ajouter').setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator), // Réservé aux admins
    async execute(interaction) {
        const target = interaction.options.getUser('cible');
        const amount = interaction.options.getInteger('montant');

        if (amount <= 0) return interaction.reply({ content: 'Le montant doit être positif.', ephemeral: true });

        economy.addMoney(target.id, amount);
        
        await interaction.reply({ 
            content: `✅ J'ai ajouté **${amount}** pièces au compte de **${target.username}**. Son nouveau solde est de **${economy.getBalance(target.id)}** pièces.` 
        });
    },
};