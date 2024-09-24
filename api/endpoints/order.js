const express = require("express");
const Order = require("../models/order");
const Address = require("../models/address");

const verifyToken = require("../verifyToken");

const router = express.Router();

// router.get("/:id", async (req, res) => {

// });

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
    const address = Address.create(addressObject)
      .then(() => {
        console.log("Address created: ", address);
      })
      .catch((err) =>
        res
          .status(500)
          .json({ error: "error creating new address record!", log: err })
      );
    const order = Order.create({
      bookId: bookId,
      addressId: address.id || 1,
      userId: userId || "admin",
    })
    // .catch((err) => res.status(500).json({err: err, msg: 'failed performing order...'}));

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Max-Age", "1800");
    res.setHeader("Access-Control-Allow-Headers", "content-type");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "PUT, POST, GET, DELETE, PATCH, OPTIONS"
    );
    res.status(201).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error making an order..." });
  }
});

// router.delete("/:id", async (req, res) => {

// });

module.exports = router;
