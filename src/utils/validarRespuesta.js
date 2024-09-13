// src/utils/validarRespuesta.js
const validarRespuesta = (respuesta, opcionesValidas) => {
  return opcionesValidas.includes(respuesta);
};

module.exports = validarRespuesta;
