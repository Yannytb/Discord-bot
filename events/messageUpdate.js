const { Events, EmbedBuilder } = require('discord.js');

module.exports = {
    name: Events.MessageUpdate,
    execute(oldMessage, newMessage) {
        if (oldMessage.author?.bot || oldMessage.content === newMessage.content) return;

        const logChannel = oldMessage.guild.channels.cache.find(ch => ch.name === '📋・logs');
        if (!logChannel) return;

        const logEmbed = new EmbedBuilder()
            .setColor(0xFFA500) // Orange pour la modification
            .setTitle('📝 Message modifié')
            .addFields(
                { name: 'Auteur', value: `${oldMessage.author.tag}`, inline: true },
                { name: 'Salon', value: `${oldMessage.channel}`, inline: true },
                { name: 'Ancien contenu', value: oldMessage.content || 'Vide' },
                { name: 'Nouveau contenu', value: newMessage.content || 'Vide' }
            )
            .setTimestamp();

        logChannel.send({ embeds: [logEmbed] });
    },
};