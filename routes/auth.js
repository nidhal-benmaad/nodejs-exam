var express = require("express");
var router = express.Router();
var User = require("../model/user");
/* GET users listing. */
router.get("/", function (req, res, next) {
  res.render("auth.twig", { message: "" });
});
router.get("/users", function (req, res, next) {
  User.find(function (err, data) {
    console.log("err", err);
    if (err) throw err;
    console.log("dataAll", data);
    res.render("users.twig", { data });
  });
});
router.get("/searchuser", function (req, res, next) {
  res.render("search.twig", { data: [] });
});
router.get("/finduser", function (req, res, next) {
  let email = req.query.email;
  console.log("searchQuery", req.query);
  if (!email) {
    res.render("search.twig", { data: [] });
    return;
  }
  User.find({ email }, function (err, data) {
    if (err) throw err;
    res.render("search.twig", { data });
    //res.json(data);
  });
});
router.get("/userdelete/:id", (req, res, next) => {
  var ident = req.params.id;
  User.findOneAndRemove({ _id: ident }, function (err) {
    res.redirect("/auth/users");
  });
});
router.post("/login", function (req, res) {
  var username = req.body.username;
  var password = req.body.password;
  User.find({ username, password }, function (err, data) {
    if (err) throw err;
    console.log("data", data);
    console.log("length", data.length);
    if (data.length) res.redirect("/auth/users");
    else res.render("auth.twig", { message: "l'utilisateur n'existe pas" });
  });
});

router.post("/adduser", function (req, res) {
  var user = new User({
    username: req.body.username,
    email: req.body.email,
    password: "examen123",
  });
  user.save();
  res.redirect("/auth/users");
});

module.exports = router;
