const express = require("express");
const Image = require("../models/image"); // Make sure to adjust the path
const verifyToken = require("../verifyToken");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const images = await Image.findAll();
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Max-Age", "1800");
    res.setHeader("Access-Control-Allow-Headers", "content-type");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "PUT, POST, GET, DELETE, PATCH, OPTIONS"
    );
    res.json(images);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching images" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const image = await Image.findByPk(req.params.id);
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Max-Age", "1800");
    res.setHeader("Access-Control-Allow-Headers", "content-type");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "PUT, POST, GET, DELETE, PATCH, OPTIONS"
    );
    if (!image) {
      return res.status(404).json({ error: "Image not found." });
    }
    res.json(image);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching image" });
  }
});

router.post("/", async (req, res) => {
  try {
    const image = Image.create(req.body);
    res.status(201).json(image);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating image" });
  }
});

module.exports = router;
