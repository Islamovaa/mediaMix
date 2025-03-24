require('dotenv').config();
const cors = require('cors');
const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;

//Middleware: JSON-Parsing & CORS
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:4200',
    credentials: true
}));

mongoose.connect(process.env.MONGODB_URI, {
    dbName: process.env.DB_NAME
  })  
    .then(() => console.log(`Erfolgreich mit der Datenbank mediaMix verbunden`))
    .catch(err => console.error(`Fehler bei der Datenbankverbindung:`, err));

//Logging Middleware 
app.use((req, res, next) => {
    console.log(`[${req.method}] ${req.url}`);
    next();
});

//Routen einbinden
app.use('/', routes);

//Serverstart (nur wenn nicht im Test-Modus)
if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, (error) => {
        if (error) {
            console.error(' Serverstart fehlgeschlagen:', error);
        } else {
            console.log(` Server läuft auf http://localhost:${PORT}`);
        }
    });
}

module.exports = app;
