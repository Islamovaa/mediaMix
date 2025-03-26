# mediaMix

**mediaMix** ist eine Webanwendung zur Verwaltung, Organisation und Bewertung verschiedener Medien – darunter Bücher, Filme, Videospiele und Gesellschaftsspiele.

## Features

- Medien hinzufügen mit festen Feldern: `title`, `category`
- Beliebig viele dynamische Eigenschaften pro Medium möglich (z. B. `pages`, `platform`, `duration`)
- Statusauswahl: offen oder erledigt
- Bewertungssystem: numerische Bewertung von 1-5, sowie optionaler Kommentar – nur bei abgeschlossenem Status sichtbar
- Zufallsgenerator: Gib eine Kategorie (z. B. „Buch“) ein, und dir wird ein zufälliges Medium daraus vorgeschlagen
- Bearbeiten & Löschen von Medien
- Medien sind nach Kategorien filtbar

## Tech Stack

- **Frontend**: Angular
- **Backend**: Node.js (Express)
- **Datenbank**: MongoDB

## Umgebungsvariablen

Es wird eine `.env`-Datei zur Konfiguration von Umgebungsvariablen  Datenbankverbindung genutzt  

## Build

### Repository clonen
git clone https://github.com/Islamovaa/mediaMix.git
cd 

### Backend starten
- cd Backend
- Führe **npm install** im `backend/`-Verzeichnis aus, um alle Abhängigkeiten zu installieren.
- Alle benötigten Artefakte werden beim Start automatisch generiert
- starte mit **npm start** das Backend
- bei erfolreicher Verbindung: **Server läuft auf http://localhost:5000
Erfolgreich mit der Datenbank mediaMix verbunden**
stelle sicher, dass die .env gefüllt ist, um automatisch die Daten für die Datenbank zu erhalten

- ### Frontend
- cd Frontend
- Führe **npm install** im `frontend/`-Verzeichnis aus, um die Abhängigkeiten zu installieren.
- Führe **ng build** aus, um das Projekt zu bauen.
- starte mit **ng serve** das Frontend
- -bei erfolgreicher Verbindung **Compiled successfully.**

  ##Screenshots
  Im weiteren sind Screenshots gegeben, die die Nutzung der Webseite und ihrer Funktionen darstellt.
  
  Der Blick auf die Webseite zeigt auf einen Blick die Hauptfunktionen. Links kann man alle Kategorien sehen und nach diesen filtern. Es werden dann entsprechnend nur die Medien gezigt, die gewünscht sind. Die einzelnen Medien werden in Karten dargestellt. Die karten sind farblich nach den Kategorien unterschieden. Die Steuerfunktionen "Zufallsgenerator" und "Neues Medium hinzufügen" sind ebenfalls zu sehen. 
  ![image](https://github.com/user-attachments/assets/e71bc0ec-8979-4464-91cb-3bcfe753bbee)

Bei Klick auf Kategorie "Gesellschaftsspiele" werden nur diese ausgegeben. 
![image](https://github.com/user-attachments/assets/6ea67d05-d696-480f-a231-d743a710fdb4)

Bei Klick auf "Zufallsgenerator" wird dieser geöffnet und nach Auswahl der Kategorie gibt er ein beliebiges Medium dieser Kategorie aus. 
![image](https://github.com/user-attachments/assets/6452382d-a662-4461-b8d9-e6075a09ad6b)

Bei Klick auf "Neues Medium hinzufügen" wird das Formular geöffnet. Titel, Kategorie und Status sind verpflichtend, alle anderen Eigenschaften und Werte sind frei wählbar. Bei klick auf speichern wird eine neue KArte mit dem entsprechenden Eigenschaften erstellt. Wenn der Status auf "erledigt" gesetzt wird, kann noch ein Rating und ein Kommentar hinzugefügt werden.
![image](https://github.com/user-attachments/assets/217bcbcd-b04a-4815-b905-277a2a133330)
![image](https://github.com/user-attachments/assets/e056cd66-b53a-4df4-9aa0-ee550d86983a)
![image](https://github.com/user-attachments/assets/970383bd-bf34-4115-a5f4-e9c9ac0ac50d)

Innerhalb der Karte befinden sich noch die Funktionen Bearbeiten und Löschen. Bei Klick auf den Mülleimer wird dIe Karte gelöscht. 
![image](https://github.com/user-attachments/assets/d7e53884-86eb-498e-b551-5efe690f5aa1)
![image](https://github.com/user-attachments/assets/d93a6ea9-8f78-4923-8c70-63f2d11354ff)

Bei Klich auf den Stift kann der Inhalt der Karte bearbeitet werden. Es öffnet sich ein Formular. Vorhandenen Daten können ersetzt oder gelöscht werden. 
![image](https://github.com/user-attachments/assets/ce9c3942-3df1-4569-b121-d90627be4498)
![image](https://github.com/user-attachments/assets/a08b434a-6403-4c2b-b28d-0d44101a7d75)
![image](https://github.com/user-attachments/assets/102eb0b5-be33-469e-8481-81fde139e53b)

## KI-Verzeichnis
### ChatGPT
- Erstellung von Daten für die Datenbank
- Zur Hilfestellung bei Fehlermeldungen
- unterstützend zur Implementierung, besonders bei der Update-Komponente
- Rechtschreibkontrolle für die Read-Me
- Erläuterung bestimmter Programmierlogiken
