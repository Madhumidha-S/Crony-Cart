import express from "express";
import { createProduct, getAllProducts, getProductById, placeOrder, updateProduct, deleteProduct } from "../controller/productController.js";

const router = express.Router();
router.post("/product", createProduct);
router.get("/product", getAllProducts);
router.get("/product/:id", getProductById);
router.post("/order/:id", placeOrder);
router.put("/product/:id", updateProduct);
router.delete("/product/:id", deleteProduct);

export default router;