var express = require("express");
var Produit = require("../model/produit");
var router = express.Router();

/* GET users listing. */
router.get("/filter", function (req, res) {
  let searchQuery = req.query.searchQuery;
  console.log("searchQuery", req.query);
  if (!searchQuery) {
    Produit.find(function (err, data) {
      if (err) throw err;
      res.render("home.twig", { data });
      //res.json(data);
    });
    return;
  }
  Produit.find(
    { libelle: { $regex: ".*" + searchQuery + ".*" } },
    function (err, data) {
      if (err) throw err;
      res.render("home.twig", { data });
      //res.json(data);
    }
  );
});
router.get("/", function (req, res, next) {
  Produit.find(function (err, data) {
    if (err) throw err;
    res.render("home.twig", { data });
    //res.json(data);
  });
});
router.get("/details/:id", function (req, res, next) {
  Produit.findById({ _id: req.params.id }, function (err, data) {
    if (err) throw err;
    res.render("details.twig", { data });
    //res.json(data);
  });
});

router.post("/addform", function (req, res) {
  /*res.json(req.body);*/

  var p = new Produit({
    libelle: req.body.libelle,
    prix: req.body.prix,
    qnt: req.body.qnt,
  });
  p.save();
  res.redirect("/home/");
});

router.get("/delete/:id", (req, res, next) => {
  var ident = req.params.id;
  Produit.findOneAndRemove({ _id: ident }, function (err) {});
  res.redirect("/home/");
});

router.post("/putform", (req, res, next) => {
  var ident = req.body.secretid;
  Produit.findById({ _id: ident }, function (err, doc) {
    (doc.libelle = req.body.libelle), (doc.prix = req.body.prix);
    doc.qnt = req.body.qnt;
    doc.save();
  });
  res.redirect("/home/");
});

module.exports = router;
