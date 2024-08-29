async function sendMessageWithDelay(client, chatId, message, delay = 2000) {
    // Obtener el chat por ID
    const chat = await client.getChatById(chatId);

    // Simular que el bot está "escribiendo..."
    await chat.sendStateTyping();
    await new Promise(resolve => setTimeout(resolve, delay));

    // Enviar el mensaje
    await client.sendMessage(chatId, message);
    
    // Detener la simulación de "escribiendo"
    await chat.clearState();
}

module.exports = sendMessageWithDelay;
