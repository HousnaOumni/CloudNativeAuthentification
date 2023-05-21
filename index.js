const express = require("express");
//const bodyParser = require("body-parser");
const RouterAuth = require("./Routes/routes.js");
//const ejs = require("ejs");
const app = express();
const db = require("./db.js");
//app.use(bodyParser.json());
app.use(express.json());
app.use("/api", RouterAuth);

/* app.set("view engine", "ejs");

let nom = "ALAMI Amina";
let villes = ["Agadir", "Ouarzazate", "Tanger"];
let html = ejs.render('<%= villes.join(", "); %>', { villes: villes });
let resultat = ejs.render("<%= name; %>", { name: nom });
app.get("/", (req, res) => {
  res.send(html );
}); */

app.listen(4000, () => {
  console.log("le serveur est demare sur le port 4000");
});

module.exports = app;
