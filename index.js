const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 8080;

let products = [];

app.use(bodyParser.json());
app.use(cors());

app.get("/products", (req, res) => {
  res.json(products);
});

app.get("/products/:id", (req, res) => {
  const product = products.find((p) => p.id === req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: "Продукт не найден" });
  }
});

app.post("/products/create", (req, res) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({ message: "Имя и цена продукта обязательны" });
  }
  const newProduct = { ...req.body, id: (products.length + 1).toString() };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

app.put("/products/update/:id", (req, res) => {
  const index = products.findIndex((p) => p.id === req.params.id);
  if (index !== -1) {
    products[index] = { ...products[index], ...req.body };
    res.json(products[index]);
  } else {
    res.status(404).json({ message: "Продукт не найден" });
  }
});

app.delete("/products/delete/:id", (req, res) => {
  const initialLength = products.length;
  products = products.filter((p) => p.id !== req.params.id);
  if (products.length < initialLength) {
    res.json({ message: "Продукт удалён" });
  } else {
    res.status(404).json({ message: "Продукт не найден" });
  }
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});
