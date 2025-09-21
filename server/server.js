const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware pour JSON
app.use(express.json());

// Route test
app.get("/", (req, res) => {
  res.send("Hello depuis Render 🚀");
});

// Exemple API "contact"
app.post("/contact", (req, res) => {
  console.log(req.body);
  res.json({ message: "Message reçu ✅" });
});

app.listen(PORT, () => {
  console.log(`Serveur lancé sur le port ${PORT}`);
});
