const express =require("express");
const bcrypt =require("bcrypt");
//const bodyParser =require("body-parser");
const jwt = require("jsonwebtoken");
const app = express();

//middleware
//app.use(bodyParser.json());
app.use(express.json());

const SALT_ROUNDS = 10;

const user = {email:"oumni@gmail.com",pass:"azerty123"};

bcrypt.hash("secretPassword123",SALT_ROUNDS).then((hash) => {
  console.log(hash)
  user.pass = hash;
});   
app.post("/login",(req,res) => {
  const {email,pass} = req.body ;
  console.log(email,pass);
  if(email!== user.email) {
    return res.status(401).json({error:"Utilisateur non trouvé !"});
  }
   bcrypt.compare(pass,user.pass).then(valid => {
      if(valid) {
        return res.status(401).json({error:"Mot de passe incorrect !" });
      }

  /*const token = jwt.sign({email: user.email},"KEY12345");
        res.json({ token });*/
      res.status(200).json({
        token: jwt.sign({email:email },'RANDOM_TOKEN_SECRET',{ expiresIn: '24h' })
    }).catch(error => res.status(500).json({ error }));
        //return res.status(200).json({succes:"good"});
    });
  });


/* bon
app.post("/login",(req, res) => {
  const { email, pass } = req.body;
  if(email !== user.email) {
    return res.status(401).json({error:"Utilisateur non trouvé !"});
  }

 bcrypt.compare(req.body.pass,user.pass).then(valid => {
  if (valid) {
     return res.status(401).json({ error: 'Mot de passe incorrect !'});
   }
  res.status(200).json({
     token: jwt.sign({email:email },'RANDOM_TOKEN_SECRET',{ expiresIn: '24h' })
    });
  })
  .catch(error => res.status(500).json({ error }));
});
*/
 
/* bon
app.post("/login",async(req, res) => {
  const { email, pass } = req.body;
    if(email!== user.email) {
      return res.json({ message: "Utilisateur introuvable" });
  } else {
    console.log(pass,user.pass);
    await bcrypt.compare(pass,user.pass).then(resultat => {
          if (resultat) {
            console.log(resultat);
              return res.json({ message: "Mot de passe incorrect" });
          }
          else {
              const payload = {
                  email,
                  pass
              };
        jwt.sign(payload, "secret", (err, token) => {
                  if (err) console.log(err);
                  else return res.json({ token: token });
              });
          }
      });
  }
});
*/
app.listen(3100,() => {
  console.log("Rest Api port 3100");
});
 

