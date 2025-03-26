# mediaMix

**mediaMix** ist eine Webanwendung zur Verwaltung, Organisation und Bewertung verschiedener Medien – darunter Bücher, Filme, Videospiele und Gesellschaftsspiele.

## Features

- Medien hinzufügen mit festen Feldern: `title`, `category`
- Beliebig viele dynamische Eigenschaften pro Medium möglich (z. B. `pages`, `platform`, `duration`)
- Statusauswahl: offen oder erledigt
- Bewertungssystem: numerische Bewertung von 1-5, sowie optionaler Kommentar – nur bei abgeschlossenem Status sichtbar
- Zufallsgenerator: Gib eine Kategorie (z. B. „Buch“) ein, und dir wird ein zufälliges Medium daraus vorgeschlagen
- Bearbeiten & Löschen von Medien

## Tech Stack

- **Frontend**: Angular
- **Backend**: Node.js (Express)
- **Datenbank**: MongoDB

## Umgebungsvariablen

Es wird eine `.env`-Datei zur Konfiguration von Umgebungsvariablen  Datenbankverbindung genutzt  

## Build

## Repository clonen
git clone https://github.com/Islamovaa/mediaMix.git
cd 

### Backend starten
-cd Backend
- Führe **npm install** im `backend/`-Verzeichnis aus, um alle Abhängigkeiten zu installieren.
- Alle benötigten Artefakte werden beim Start automatisch generiert
- starte mit **npm start** das Backend
- bei erfolreicher Verbindung: **Server läuft auf http://localhost:5000
Erfolgreich mit der Datenbank mediaMix verbunden**
stelle sicher, dass die .env gefüllt ist, um automatisch die Daten für die Datenbank zu erhalten
-
- ### Frontend
- cd Frontend
- Führe **npm install** im `frontend/`-Verzeichnis aus, um die Abhängigkeiten zu installieren.
- Führe **ng build** aus, um das Projekt zu bauen.
- starte mit **ng serve** das Frontend
- -bei erfolgreicher Verbindung **Compiled successfully.**

- 




