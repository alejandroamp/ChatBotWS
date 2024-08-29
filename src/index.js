const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const handleMessage = require('./handlers/messageHandler');

// Inicializa el cliente de WhatsApp
const client = new Client({
    authStrategy: new LocalAuth()
});

// Genera el QR para iniciar sesión
client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
    console.log('Escanea el código QR para iniciar sesión.');
});

// Confirma cuando el bot está listo
client.on('ready', () => {
    console.log('El bot está listo y conectado a WhatsApp.');
});

// Manejo de mensajes
client.on('message', (message) => handleMessage(client, message));

// Inicia el cliente
client.initialize();
