const express = require('express');
const Image = require('../models/image'); // Make sure to adjust the path
const verifyToken = require("../verifyToken");

const router = express.Router();

router.get('/', async (req, res) => {
    try {
      const images = await Image.findAll();
      res.json(images);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error fetching images' });
    }
  });

router.post('/', async (req, res) => {
    try {
        const image = Image.create(req.body);
        res.status(201).json(image);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error creating image' });
    }
});

module.exports = router;