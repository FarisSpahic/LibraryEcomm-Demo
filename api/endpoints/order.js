const express = require("express");
const Order = require("../models/order");
const Address = require("../models/address");
const cors = require('cors');
const verifyToken = require("../verifyToken");

const router = express.Router();

router.use(cors());

// Preflight handling for the POST route
router.options("/", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Headers", "content-type");
  res.setHeader("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS");
  res.sendStatus(204); // No Content
});

router.post("/", async (req, res) => {
  try {
    const {
      country,
      city,
      addressLine,
      phoneNumber,
      userId,
      bookId,
      cardNumber,
      expiryDate,
      cvv,
    } = req.body;

    

    if (String(cvv).length !== 3) {
      return res.status(400).json({ err: "invalid cvv" });
    }

    // Validate expiryDate (ensure it is in MM/YY format)
    if (String(expiryDate).length !== 5 || !/^\d{2}\/\d{2}$/.test(expiryDate)) {
      return res.status(400).json({ err: "invalid expiry date format" });
    }

    // Validate cardNumber (ensure it's 16 digits)
    if (String(cardNumber).length !== 16) {
      return res.status(400).json({ err: "invalid card number length" });
    }
    const addressObject = {
      country: country,
      city: city,
      addressLine: addressLine,
      phoneNumber: phoneNumber,
      userId: userId,
    };
    console.log("Trying to upload this object to addresses: ", addressObject);
    const address = await Address.create(addressObject);

    console.log("Address created: ", address);

    const orderObject = {
        bookId: Number(bookId),
        addressId: Number(address.dataValues.id) || 1,
        userId: userId || "admin",
      };
    const order = await Order.create(orderObject);
    console.log('Order object tried to upload: ', orderObject)
    // .catch((err) => res.status(500).json({err: err, msg: 'failed performing order...'}));

    
    res.status(201).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error making an order..." });
  }
});

module.exports = router;
