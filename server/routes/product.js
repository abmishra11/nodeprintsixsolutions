const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const Product = require("../model/Product");
const mongoose = require("mongoose");
const checkAuth = require("../middleware/checkAuth");

/**
 * @route   POST /api/products
 * @desc    Add a new product
 */
router.post(
  "/",
  checkAuth,
  [
    body("title").notEmpty().withMessage("Title is required"),
    body("slug").notEmpty().withMessage("Slug is required"),
    body("imageUrl").optional().isURL().withMessage("Invalid image URL"),
    body("productPrice")
      .isNumeric()
      .withMessage("Product price must be a number"),
    body("salePrice").optional().isNumeric(),
    body("wholesalePrice").optional().isNumeric(),
    body("wholesaleQty").optional().isInt(),
    body("productStock").optional().isInt(),
    body("categoryId").notEmpty().withMessage("Category is required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    try {
      const newProduct = new Product({
        ...req.body,
        _id: new mongoose.Types.ObjectId(),
        userId: req.user.userId,
      });

      const savedProduct = await newProduct.save();
      res.status(201).json({ success: true, product: savedProduct });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, error: err.message });
    }
  }
);

/**
 * @route   GET /api/products
 * @desc    Get all products
 */
router.get("/", async (req, res) => {
  try {
    const products = await Product.find()
      .populate("categoryId")
      .populate("userId");
    res.status(200).json({ success: true, products });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * @route   GET /api/products/:id
 * @desc    Get single product by ID
 */
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate("categoryId")
      .populate("userId");
    if (!product)
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    res.status(200).json({ success: true, product });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * @route   GET /api/products/slug/:slug
 * @desc    Get a product by slug
 */
router.get("/slug/:slug", async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug })
      .populate("categoryId")
      .populate("userId");

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    res.status(200).json({ success: true, product });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * @route   GET /api/products/category/:categoryId
 * @desc    Get all products by category ID
 */
router.get("/category/:categoryId", async (req, res) => {
  try {
    const { categoryId } = req.params;

    const products = await Product.find({ categoryId })
      .populate("categoryId")
      .populate("userId");

    res.status(200).json({ success: true, products });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * @route   GET /api/products/user/:userId
 * @desc    Get all products by user ID
 */
router.get("/user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const products = await Product.find({ userId })
      .populate("categoryId")
      .populate("userId");

    res.status(200).json({ success: true, products });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * @route   PUT /api/products/:id
 * @desc    Update a product
 */
router.put("/:id", checkAuth, async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: new Date() },
      { new: true }
    );

    if (!updatedProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    res.status(200).json({ success: true, product: updatedProduct });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * @route   DELETE /api/products/:id
 * @desc    Delete a product
 */
router.delete("/:id", checkAuth, async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    res.status(200).json({ success: true, message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
