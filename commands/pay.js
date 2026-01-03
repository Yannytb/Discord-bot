const { SlashCommandBuilder } = require('discord.js');
const economy = require('../economySystem');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pay')
        .setDescription('Donner de l\'argent à un autre utilisateur')
        .addUserOption(opt => opt.setName('cible').setDescription('Le bénéficiaire').setRequired(true))
        .addIntegerOption(opt => opt.setName('montant').setDescription('Somme à donner').setRequired(true)),
    async execute(interaction) {
        const target = interaction.options.getUser('cible');
        const amount = interaction.options.getInteger('montant');
        const senderBal = economy.getBalance(interaction.user.id);

        if (amount <= 0) return interaction.reply('Montant invalide.');
        if (senderBal < amount) return interaction.reply('Tu n\'as pas assez d\'argent !');
        if (target.id === interaction.user.id) return interaction.reply('Tu ne peux pas te donner à toi-même.');

        economy.addMoney(interaction.user.id, -amount);
        economy.addMoney(target.id, amount);

        await interaction.reply(`💸 Tu as envoyé **${amount}** pièces à **${target.username}** !`);
    },
};