const { Events, EmbedBuilder } = require('discord.js');

module.exports = {
    name: Events.MessageDelete,
    execute(message) {
        // On ignore les messages des bots ou si le message est vide
        if (message.author?.bot || !message.content) return;

        // Remplace 'logs' par le nom de ton salon de logs
        const logChannel = message.guild.channels.cache.find(ch => ch.name === '📋・logs');
        if (!logChannel) return;

        const logEmbed = new EmbedBuilder()
            .setColor(0xFF0000) // Rouge pour la suppression
            .setTitle('🗑️ Message supprimé')
            .addFields(
                { name: 'Auteur', value: `${message.author.tag}`, inline: true },
                { name: 'Salon', value: `${message.channel}`, inline: true },
                { name: 'Contenu', value: message.content }
            )
            .setTimestamp();

        logChannel.send({ embeds: [logEmbed] });
    },
};