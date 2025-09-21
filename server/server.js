const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Hello depuis Render 🚀");
});

// Exemple pour contact form
app.post("/contact", (req, res) => {
  console.log("Nouveau message :", req.body);
  res.json({ message: "Message reçu ✅" });
});

app.listen(PORT, () => {
  console.log(`Serveur lancé sur le port ${PORT}`);
});
