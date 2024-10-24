let blacklist = []; // Inicializamos la lista negra como un array vacío

const isBlackListed = (number) => {
  return blacklist.includes(number); // Verificamos si el número está en la lista negra
};

const addToBlackList = (number) => {
  if (!blacklist.includes(number)) {
    blacklist.push(number); // Añadimos el número a la lista negra si no está ya añadido
  }
};

const getBlackList = () => {
  return blacklist; // Devolvemos la lista negra completa
};

module.exports = {
  isBlackListed,
  addToBlackList,
  getBlackList,
  blacklist,
};
