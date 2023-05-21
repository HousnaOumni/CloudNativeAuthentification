const user = require("../Models/UserModels");
const jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");

const SALT_ROUNDS = 10;

const SignUp = async (req, res) => {
  try {
    const User = new user({
      name: req.body.name,
      email: req.body.email,
      password: await bcrypt.hash(req.body.password, SALT_ROUNDS),
    });
    const resuta = await User.save();
    return res.status(200).json({
      resuta,
      token: jwt.sign({ userId: User._id }, "RANDOM_TOKEN_SECRET", {
        expiresIn: "24h",
      }),
    });
  } catch (err) {
    res.status(301).json(err);
  }
};

const Login = async (req, res) => {
  const User = await user.findOne({ email: req.body.email });
  if (!User) {
    return res.status(401).json({ error: "Utilisateur non trouvé !" });
  }
  bcrypt.compare(req.body.password, User.password).then((valid) => {
    if (!valid) {
      return res.status(401).json({ error: "Mot de passe incorrect !" });
    } else {
      return res.status(200).json("good");
    }
  });
};

module.exports = { SignUp, Login };
