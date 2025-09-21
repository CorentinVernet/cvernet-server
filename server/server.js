const express = require("express");
const nodemailer = require("nodemailer");
require("dotenv").config();
const cors = require("cors");

const app = express();
app.use(cors()); // pour autoriser Vercel/front
app.use(express.json());

// Route racine pour tester le serveur
app.get("/", (req, res) => {
  res.send("Hello depuis Render 🚀");
});

// Route contact pour le formulaire
app.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: process.env.MAIL_USER, // ton Gmail
      to: process.env.MAIL_USER, // tu reçois le message
      subject: `Nouveau message de ${name}`,
      text: message,
      replyTo: email, // email de l’utilisateur
    });

    res.json({ success: true, message: "Message envoyé ✅" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Erreur d’envoi ❌" });
  }
});

// Lancer le serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`✅ Serveur backend lancé sur le port ${PORT}`)
);
