const express = require("express");
const { SignUp, Login } = require("../Controller/LoginController");
const RouterAuth = express.Router();

RouterAuth.post("/signup", SignUp);
RouterAuth.post("/login", Login);

module.exports = RouterAuth;
