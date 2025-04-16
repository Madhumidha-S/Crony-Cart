import { createProductService, deleteProductService, getAllProductsService, getProductByIdService, updateProductService } from "../models/productModel.js";

const handleResponse = (res, status, message, data = null) => {
    res.status(status).json({
        status,
        message,
        data,
    });
};

export const createProduct = async (req, res, next) => {
    const { name, description, base_price, rating } = req.body;
    try {
        const newProduct = await createProductService(name, description, base_price, rating);
        handleResponse(res, 201, "Product created successfully", newProduct);
    } catch (err) {
        next(err);
    }
};

export const getAllProducts = async (req, res, next) => {
    try {
        const products = await getAllProductsService();
        handleResponse(res, 200, "Products fetched successfully", products);
    } catch (err) {
        next(err);
    }
};

export const getProductById = async (req, res, next) => {
    try {
        const product = await getProductByIdService(req.params.id);
        if (!product) return handleResponse(res, 404, "Product not found")
        handleResponse(res, 200, "Product fetched successfully", product);
    } catch (err) {
        next(err);
    }
};

export const updateProduct = async (req, res, next) => {
    const { name, description, base_price, rating } = req.body;
    try {
        const updatedProduct = await updateProductService(req.params.id, name, description, base_price, rating);
        if (!updatedProduct) return handleResponse(res, 404, "Product not found")
        handleResponse(res, 200, "Product updated successfully", updatedProduct);
    } catch (err) {
        next(err);
    }
};

export const deleteProduct = async (req, res, next) => {
    try {
        const deletedProduct = await deleteProductService(req.params.id);
        if (!deletedProduct) return handleResponse(res, 404, "Product not found")
        handleResponse(res, 200, "Product deleted successfully", deletedProduct);
    } catch (err) {
        next(err);
    }
};