const express = require("express");
const router = express.Router();
const Cart = require("../model/Cart");
const mongoose = require("mongoose");

router.post("/", async (req, res) => {
  try {
    const { productId, name, salePrice, quantity, imageUrl, user } = req.body;
    const existingItem = await Cart.findOne({ user, productId });
    if (existingItem) {
      existingItem.quantity += quantity;
      await existingItem.save();
      return res.status(200).json(existingItem);
    }

    const newCartItem = new Cart({
      productId,
      name,
      salePrice,
      quantity,
      imageUrl,
      user,
    });
    await newCartItem.save();
    res.status(201).json(newCartItem);
  } catch (error) {
    console.error("Error saving cart item:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
