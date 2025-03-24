const Media = require("../models/media");

//Alle Medien abrufen
async function getAllMedia() {
    return await Media.find();
}

//Neues Medium hinzufügen
async function addMedia(mediaData) {
    const newMedia = new Media(mediaData);
    return await newMedia.save();
}

//Medium nach ID abrufen
async function getMediaById(id) {
    return await Media.findById(id);
}

//Medium aktualisieren
async function updateMedia(id, updatedData) {
    return await Media.findByIdAndUpdate(id, updatedData, { new: true });
}

//Medium löschen
async function deleteMedia(id) {
    return await Media.findByIdAndDelete(id);
}

module.exports = { getAllMedia, addMedia, getMediaById, updateMedia, deleteMedia };
