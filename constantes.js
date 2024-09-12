const path = require("path");
const fs = require("fs");

const menuPath = path.join(__dirname, "msg", "menu.txt");
const nacionalidadPath = path.join(__dirname, "msg", "nacionalidad.txt");
const cervantesPath = path.join(__dirname, "msg", "cervantes.txt");
const mas2AnosNacionalidad = path.join(__dirname, "msg", "mas_de_2_anos.txt");

let menu, nacionalidad, cervantes, mas2anos;
try {
  menu = fs.readFileSync(menuPath, "utf8");
  nacionalidad = fs.readFileSync(nacionalidadPath, "utf8");
  cervantes = fs.readFileSync(cervantesPath, "utf8");
  mas2anos = fs.readFileSync(mas2AnosNacionalidad, "utf8");
} catch (error) {
  console.error("Error al leer los archivos:", error);
}

const OPCIONES_NACIONALIDAD = ["1", "2", "3", "4"];
const OPCIONES_MAS2ANOS = ["1", "2"];
const OPCIONES_MENU = ["1", "2", "3", "4", "5"];

const mensajesGenerales = {
  requisitos: [
    "1. Certificado de nacimiento.",
    "2. Pasaporte en vigor.",
    "3. Certificado de antecedentes penales.",
    "4. Certificado de empadronamiento.",
    "5. Certificado de aprobación del examen de Cervantes.",
  ].join("\n"),
};

// Exportar todas las constantes
module.exports = {
  OPCIONES_NACIONALIDAD,
  OPCIONES_MAS2ANOS,
  OPCIONES_MENU,
  mensajesGenerales,
  menu,
  nacionalidad,
  cervantes,
  mas2anos,
};
