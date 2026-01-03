const { Events, EmbedBuilder } = require('discord.js');

module.exports = {
	name: Events.GuildMemberAdd,
	execute(member) {
		const channel = member.guild.channels.cache.find(ch => ch.name === '『👋』bienvenue');
		if (!channel) return;

		const welcomeEmbed = new EmbedBuilder()
			.setColor(0x00FF00)
			.setTitle(`Bienvenue qur Yutil Vm !`)
			.setDescription(`Salut ${member}, ravi de te voir rejoindre l'aventure !`)
			.setThumbnail(member.user.displayAvatarURL())
			.setTimestamp();

		channel.send({ embeds: [welcomeEmbed] });
	},
};