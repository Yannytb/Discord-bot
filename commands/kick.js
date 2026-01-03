const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('kick')
		.setDescription('Expulse un membre du serveur.')
		.addUserOption(option => 
			option.setName('cible').setDescription('Le membre à expulser').setRequired(true))
		.addStringOption(option => 
			option.setName('raison').setDescription('La raison de l\'expulsion'))
		.setDefaultMemberPermissions(PermissionFlagsBits.KickMembers), // Seulement pour les modos
	async execute(interaction) {
		const user = interaction.options.getMember('cible');
		const reason = interaction.options.getString('raison') || 'Aucune raison fournie';

		if (!user.kickable) {
			return interaction.reply({ content: 'Je ne peux pas expulser ce membre (rôle trop élevé).', ephemeral: true });
		}

		await user.kick(reason);
		await interaction.reply({ content: `${user.user.tag} a été expulsé. Raison : ${reason}` });
	},
};