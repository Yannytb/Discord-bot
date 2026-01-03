const fs = require('fs');
const path = './economy.json';

module.exports = {
    getBalance: (userId) => {
        const data = JSON.parse(fs.readFileSync(path, 'utf8'));
        return data[userId]?.balance || 0; // On change la structure pour stocker plus d'infos
    },

    addMoney: (userId, amount) => {
    const data = JSON.parse(fs.readFileSync(path, 'utf8'));
    if (!data[userId]) data[userId] = { balance: 0, lastDaily: 0 };
    
    data[userId].balance += amount;

    // Empêcher d'avoir un solde négatif
    if (data[userId].balance < 0) data[userId].balance = 0;

    fs.writeFileSync(path, JSON.stringify(data, null, 2));
},

    // Nouvelle fonction pour gérer le temps
    getCooldown: (userId) => {
        const data = JSON.parse(fs.readFileSync(path, 'utf8'));
        return data[userId]?.lastDaily || 0;
    },

    setLastDaily: (userId) => {
        const data = JSON.parse(fs.readFileSync(path, 'utf8'));
        if (!data[userId]) data[userId] = { balance: 0, lastDaily: 0 };
        data[userId].lastDaily = Date.now(); // Enregistre l'heure actuelle en millisecondes
        fs.writeFileSync(path, JSON.stringify(data, null, 2));
    }
};