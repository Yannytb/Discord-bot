const { SlashCommandBuilder } = require('discord.js');
const economy = require('../economySystem');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('daily')
        .setDescription('Récupère tes 100 pièces quotidiennes !'),
    async execute(interaction) {
        const userId = interaction.user.id;
        const lastDaily = economy.getCooldown(userId);
        const cooldownTime = 24 * 60 * 60 * 1000; // 24 heures en millisecondes

        if (Date.now() - lastDaily < cooldownTime) {
            const timeLeft = cooldownTime - (Date.now() - lastDaily);
            const hours = Math.floor(timeLeft / (1000 * 60 * 60));
            const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));

            return interaction.reply({
                content: `⏳ Patience ! Tu pourras réutiliser cette commande dans **${hours}h et ${minutes}m**.`,
                ephemeral: true // Seul l'utilisateur voit ce message
            });
        }

        const amount = 100;
        economy.addMoney(userId, amount);
        economy.setLastDaily(userId);

        await interaction.reply(`🎁 Cadeau ! Tu as reçu **${amount}** pièces. Ton solde : **${economy.getBalance(userId)}** pièces.`);
    },
};