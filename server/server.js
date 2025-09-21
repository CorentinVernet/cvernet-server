const express = require("express");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();
app.use(express.json());

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
      from: email,
      to: process.env.MAIL_USER,
      subject: `Nouveau message de ${name}`,
      text: message,
    });
    res.json({ success: true, message: "Message envoyé ✅" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Erreur d’envoi ❌" });
  }
});

app.listen(process.env.PORT || 3000, () =>
  console.log("✅ Serveur backend lancé")
);
