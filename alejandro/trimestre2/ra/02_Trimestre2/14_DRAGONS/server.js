const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

let dragons = [
  { name: "Fuego", type: "Fire", age: 120, power: 600 },
  { name: "Hielo", type: "Ice", age: 80, power: 400 },
  { name: "Rayo", type: "Lightning", age: 60, power: 500 },
  { name: "Tierra", type: "Earth", age: 200, power: 700 }
];

app.get("/dragons", (req, res) => res.json(dragons));

app.post("/dragons", (req, res) => {
  const dragon = req.body;
  dragons.push(dragon);
  res.json({ ok: true, message: "Dragon added!" });
});

app.listen(3000, () => console.log("Server running on port 3000"));
