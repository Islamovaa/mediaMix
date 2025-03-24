const express = require("express");
const router = express.Router();
const mediaService = require("./services/mediaService.js");

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
router.put("/media/:id", async (req, res) => {
    try {
        const updatedMedia = await mediaService.updateMedia(req.params.id, req.body);
        if (!updatedMedia) {
            return res.status(404).json({ message: "Medium nicht gefunden" });
        }
        res.json(updatedMedia);
    } catch (error) {
        res.status(400).json({ error: error.message });
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
