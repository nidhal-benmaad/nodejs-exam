var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Produit = new Schema({
  libelle: String,
  prix: Number,
  qnt: Number,
});

module.exports = mongoose.model("produits", Produit);
