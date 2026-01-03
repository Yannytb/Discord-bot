const { Client, GatewayIntentBits } = require('discord.js');

// Création d'une instance du client
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

// Quand le bot est prêt
client.once('ready', () => {
    console.log(`Connecté en tant que ${client.user.tag} !`);
});

// Système de réponse simple
client.on('messageCreate', (message) => {
    // Évite que le bot se réponde à lui-même
    if (message.author.bot) return;

    if (message.content === '!ping') {
        message.reply('Pong ! 🏓');
    }
});

// Connexion avec le Token
client.login('TON_TOKEN_ICI');