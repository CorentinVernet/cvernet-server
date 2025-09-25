const express = require("express");
const nodemailer = require("nodemailer");
const multer = require("multer");
require("dotenv").config();
const cors = require("cors");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.json());

const upload = multer({ dest: "uploads/" }); // dossier temporaire

app.get("/", (req, res) => {
  res.send("Hello depuis Render 🚀");
});

app.post("/contact", upload.array("attachments"), async (req, res) => {
  const { name, email, message } = req.body;

  // ✅ Vérif email côté serveur
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res
      .status(400)
      .json({ success: false, message: "Adresse email invalide ❌" });
  }

  const attachments = req.files.map((file) => ({
    filename: file.originalname,
    path: file.path,
  }));

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: process.env.MAIL_USER,
      to: process.env.MAIL_USER,
      subject: `Nouveau message de ${name}`,
      text: `Nom : ${name}\nEmail : ${email}\n\nMessage :\n${message}`,
      replyTo: email,
      attachments,
    });

    // Supprimer les fichiers temporairement uploadés
    req.files.forEach((file) => fs.unlinkSync(file.path));

    res.json({ success: true, message: "Message envoyé ✅" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Erreur d’envoi ❌" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`✅ Serveur backend lancé sur le port ${PORT}`)
);
