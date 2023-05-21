const express = require("express");
const RouterAuth = require("./Routes/routes.js");

const app = express();
const db = require("./db.js");

app.use(express.json());
app.use("/api", RouterAuth);

app.listen(4000, () => {
  console.log("le serveur est demare sur le port 4000");
});


