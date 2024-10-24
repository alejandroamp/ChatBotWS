// utils/numberClean.js
const numberClean = (raw) => {
  // Limpiamos el número de cualquier carácter no numérico
  return raw.replace(/\D/g, "");
};

module.exports = { numberClean };
