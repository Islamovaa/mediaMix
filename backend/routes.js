const express = require("express");
const router = express.Router();
const mediaService = require("./services/mediaService.js");
const Media = require('./models/media'); 


//Alle Medien abrufen
router.get("/media", async (req, res) => {
    try {
        const mediaList = await mediaService.getAllMedia();
        res.json(mediaList);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//Neues Medium hinzufügen
router.post("/media", async (req, res) => {
    try {
        const newMedia = await mediaService.addMedia(req.body);
        res.status(201).json(newMedia);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

//Medium nach ID abrufen
router.get("/media/:id", async (req, res) => {
    try {
        const media = await mediaService.getMediaById(req.params.id);
        if (!media) {
            return res.status(404).json({ message: "Medium nicht gefunden" });
        }
        res.json(media);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//Medium aktualisieren
router.patch('/media/:id', async (req, res) => {
    try {
      const updateData = {
        title: req.body.title,
        category: req.body.category,
        status: req.body.status,
        rating: req.body.status === 'erledigt' ? req.body.rating : null,
        comment: req.body.status === 'erledigt' ? req.body.comment : '',
        dynamicFields: req.body.dynamicFields || {}
      };
  
      // Optional: Statt "update" lieber "ersetzen" => manuell alten Eintrag holen, Felder löschen und neu speichern
      const media = await Media.findById(req.params.id);
      if (!media) return res.status(404).json({ message: 'Medium nicht gefunden' });
  
      // Nur Standardfelder behalten
      media.title = updateData.title;
      media.category = updateData.category;
      media.status = updateData.status;
      media.rating = updateData.rating;
      media.comment = updateData.comment;
      media.dynamicFields = updateData.dynamicFields;
  
      // Alle alten, dynamischen Top-Level-Felder entfernen
      Object.keys(media.toObject()).forEach(key => {
        if (!['_id', 'title', 'category', 'status', 'rating', 'comment', 'dynamicFields', '__v', 'createdAt', 'updatedAt'].includes(key)) {
          media[key] = undefined;
        }
      });
  
      const updated = await media.save();
  
      res.json(updated);
    } catch (err) {
      console.error('Fehler beim Aktualisieren:', err);
      res.status(500).json({ error: 'Update fehlgeschlagen' });
    }
  });
  
  

//Medium löschen
router.delete("/media/:id", async (req, res) => {
    try {
        const deleted = await mediaService.deleteMedia(req.params.id);
        if (!deleted) {
            return res.status(404).json({ message: "Medium nicht gefunden" });
        }
        res.json({ message: "Medium erfolgreich gelöscht" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
