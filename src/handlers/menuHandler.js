const sendMessageWithDelay = require('../utils/sendMessageWithDelay');
const { saveLead } = require('../utils/database');

function showMainMenu(client, chatId) {
    const menuMessage = '👋 ¡Hola! Bienvenido a Cinthia Cedeño Abogados. ¿En qué podemos ayudarte hoy? 😊\n' +
        'Por favor, selecciona una opción:\n' +
        '1️⃣ Nacionalidad\n' +
        '2️⃣ Residencias\n' +
        '3️⃣ Estudiantes\n' +
        '4️⃣ Bolsa de Empleo\n' +
        '5️⃣ Escritos y Recursos de Asilo';
    sendMessageWithDelay(client, chatId, menuMessage);
}

function showNacionalidadMenu(client, chatId) {
    const menuMessage = '🇪🇸 Has seleccionado Nacionalidad. Para empezar, ¿podrías decirme tu nombre y apellido? 😊';
    sendMessageWithDelay(client, chatId, menuMessage);
}

function handleNacionalidadName(client, chatId, message, context) {
    const [nombre, apellido] = message.split(' ');
    
    if (!nombre || !apellido) {
        sendMessageWithDelay(client, chatId, 'Por favor, indícanos tu nombre y apellido para continuar. 🙏');
        return;
    }

    // Guardar el nombre y apellido en el contexto
    context.nombre = nombre;
    context.apellido = apellido;

    const responseMessage = `¡Gracias, ${nombre}! Ahora, ¿cuánto tiempo llevas como residente legal en España? 🇪🇸\n` +
        '1️⃣ Más de 2 años\n' +
        '2️⃣ Menos de 2 años\n' +
        '3️⃣ A punto de cumplir 2 años\n' +
        '4️⃣ No tengo residencia';
    sendMessageWithDelay(client, chatId, responseMessage);
}

function handleTiempoResidencia(client, chatId, message, context) {
    let tiempo_residencia;

    switch (message) {
        case '1':
            tiempo_residencia = 'Más de 2 años';
            context.tiempo_residencia = tiempo_residencia;
            context.step = 'cervantes';
            sendMessageWithDelay(client, chatId, `¡Qué bien, ${context.nombre}! 🎉 Estás más cerca de obtener la nacionalidad española. ¿Ya realizaste el examen de Cervantes? 🤔\n1️⃣ Sí\n2️⃣ No`);
            break;
        case '2':
            tiempo_residencia = 'Menos de 2 años';
            sendMessageWithDelay(client, chatId, 'Gracias por la información. Estamos aquí para ayudarte cuando estés listo para avanzar en tu proceso de nacionalidad. 😊');
            saveLead(context.nombre, context.apellido, tiempo_residencia, null, chatId);
            break;
        case '3':
            tiempo_residencia = 'A punto de cumplir 2 años';
            sendMessageWithDelay(client, chatId, '¡Estás casi allí! 🎯 Una vez cumplas los 2 años, estaremos listos para ayudarte a obtener tu nacionalidad. 😊');
            saveLead(context.nombre, context.apellido, tiempo_residencia, null, chatId);
            break;
        case '4':
            tiempo_residencia = 'No tengo residencia';
            sendMessageWithDelay(client, chatId, 'No te preocupes, estamos aquí para guiarte. Contáctanos para recibir asesoría personalizada. 💬');
            saveLead(context.nombre, context.apellido, tiempo_residencia, null, chatId);
            break;
        default:
            sendMessageWithDelay(client, chatId, 'Por favor, selecciona una opción válida. 🙏');
            return;
    }
}

function handleExamenCervantes(client, chatId, message, context) {
    if (message === '1') {
        sendMessageWithDelay(client, chatId, `¡Fantástico, ${context.nombre}! 🌟 Ya estás en camino. Los requisitos brevemente son los siguientes:\n\n` +
            '1. Certificado de nacimiento.\n' +
            '2. Pasaporte en vigor.\n' +
            '3. Certificado de antecedentes penales.\n' +
            '4. Certificado de empadronamiento.\n' +
            '5. Certificado de aprobación del examen de Cervantes.\n\n' +
            '¿Te gustaría conocer nuestro presupuesto para gestionar el trámite por ti? 💼\nPor favor, indícanos tu correo electrónico para enviarte la información:');
        context.step = 'presupuesto';
    } else if (message === '2') {
        sendMessageWithDelay(client, chatId, `¡No te preocupes, ${context.nombre}! Podemos ayudarte a reservar una plaza para el examen de Cervantes. 💪\n` +
            'El costo aproximado del examen es de 85€, pagadero en la plataforma oficial.\n\n' +
            'Los requisitos son los siguientes:\n\n' +
            '1. Certificado de nacimiento.\n' +
            '2. Pasaporte en vigor.\n' +
            '3. Certificado de antecedentes penales.\n' +
            '4. Certificado de empadronamiento.\n\n' +
            '¿Te gustaría conocer nuestro presupuesto para gestionar el trámite por ti? 💼\nPor favor, indícanos tu correo electrónico para enviarte la información:');
        context.step = 'presupuesto_no_examen';
    } else {
        sendMessageWithDelay(client, chatId, 'Por favor, selecciona una opción válida. 🙏');
    }
}

function handlePresupuesto(client, chatId, message, context) {
    context.correo = message;
    let messageToSend;
    
    if (context.step === 'presupuesto') {
        messageToSend = `✨ ¡Gracias, ${context.nombre}! Te hemos enviado los requisitos a tu correo electrónico: ${context.correo}.\n\n` +
            'Nuestro servicio de gestión de trámites para la nacionalidad cuesta **490€ IVA incluido**.\n' +
            'Puedes pagar en **2 partes** o en **un solo pago** y te descontamos **50€** (total: 440€).\n\n' +
            '🎯 Contarás con nuestro apoyo en cada paso del proceso, asegurándote de que todo se haga correctamente y sin estrés. ¡Deja que los expertos te guíen! 😊';
    } else {
        messageToSend = `✨ ¡Gracias, ${context.nombre}! Te hemos enviado los requisitos a tu correo electrónico: ${context.correo}.\n\n` +
            'Nuestro servicio de gestión de trámites para la nacionalidad cuesta **490€ IVA incluido**.\n' +
            'Puedes pagar en **2 partes**.\n\n' +
            '🎯 Contarás con nuestro apoyo en cada paso del proceso, asegurándote de que todo se haga correctamente y sin estrés. ¡Deja que los expertos te guíen! 😊';
    }

    sendMessageWithDelay(client, chatId, messageToSend);

    // Guardar la información en la base de datos
    saveLead(context.nombre, context.apellido, context.tiempo_residencia, context.correo, chatId);
}

module.exports = {
    showMainMenu,
    showNacionalidadMenu,
    handleNacionalidadName,
    handleTiempoResidencia,
    handleExamenCervantes,
    handlePresupuesto,
};
