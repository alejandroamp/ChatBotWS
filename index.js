const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

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
client.on('message', message => {
    if (message.body.toLowerCase() === 'hola') {
        message.reply('Hola, bienvenido a Cinthia Cedeño Abogados. Por favor, selecciona una opción:\n1. Extranjería\n2. Arraigos\n3. Nacionalidad\n4. Asilo Político');
    } else if (message.body === '1') {
        message.reply('Has seleccionado Extranjería. ¿En qué podemos ayudarte?');
    } else if (message.body === '2') {
        message.reply('Has seleccionado Arraigos. ¿En qué podemos ayudarte?');
    } else if (message.body === '3') {
        message.reply('Has seleccionado Nacionalidad. ¿En qué podemos ayudarte?');
    } else if (message.body === '4') {
        message.reply('Has seleccionado Asilo Político. ¿En qué podemos ayudarte?');
    } else {
        message.reply('Lo siento, no he entendido tu mensaje. Por favor, selecciona una opción:\n1. Extranjería\n2. Arraigos\n3. Nacionalidad\n4. Asilo Político');
    }
});

// Inicia el cliente
client.initialize();
