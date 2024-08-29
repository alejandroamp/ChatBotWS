const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Conexión a la base de datos
const dbPath = path.resolve(__dirname, '../db/leads.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error al conectar con la base de datos:', err.message);
    } else {
        console.log('Conectado a la base de datos SQLite.');
    }
});

// Crear tabla si no existe
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS leads (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nombre TEXT NOT NULL,
            apellido TEXT NOT NULL,
            tiempo_residencia TEXT NOT NULL,
            correo TEXT,
            numero TEXT
        )
    `);
});

function saveLead(nombre, apellido, tiempo_residencia, correo, numero) {
    const stmt = db.prepare('INSERT INTO leads (nombre, apellido, tiempo_residencia, correo, numero) VALUES (?, ?, ?, ?, ?)');
    stmt.run(nombre, apellido, tiempo_residencia, correo, numero, function(err) {
        if (err) {
            console.error('Error al guardar los datos:', err.message);
        } else {
            console.log(`Lead guardado con ID: ${this.lastID}`);
        }
    });
    stmt.finalize();
}

module.exports = {
    saveLead
};
