const mongoose = require("mongoose");

const mediaSchema = new mongoose.Schema({
    title: { type: String, required: true },
    category: { type: String, enum: ["Buch", "Film", "PS-Spiel", "Gesellschaftsspiel"], required: true },
  
  // Dynamische Eigenschaften als Schlüssel/Wert-Paare
  dynamicFields: {
    type: Map,
    of: mongoose.Schema.Types.Mixed,
    default: {}
  },

  status: { type: String, enum: ["offen", "erledigt"], default: "offen" },
  rating: { type: Number, min: 1, max: 5 },
  comment: { type: String }
}, { timestamps: true });

module.exports = mongoose.model("Media", mediaSchema);
