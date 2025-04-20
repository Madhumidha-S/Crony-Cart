import { createProductService, deleteProductService, getAllProductsService, incrementProductViewService, getProductByIdService, placeOrderService, updateProductService } from "../models/productModel.js";
import { filterAndSortProducts, transformProductData } from "../utils/productUtils.js";

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
        const filteredSortedProducts = filterAndSortProducts(products);
        handleResponse(res, 200, "Products fetched successfully", filteredSortedProducts);
    } catch (err) {
        next(err);
    }
};

export const getProductById = async (req, res, next) => {
    try {
        await incrementProductViewService(req.params.id);
        const product = await getProductByIdService(req.params.id);
        if (!product) return handleResponse(res, 404, "Product not found");
        const transformedProduct = transformProductData(product);
        handleResponse(res, 200, "Product fetched successfully", transformedProduct);
    } catch (err) {
        next(err);
    }
};

export const placeOrder = async (req, res, next) => {
    const { id } = req.params;

    try {
        const updatedProduct = await placeOrderService(id);
        if (!updatedProduct) return handleResponse(res, 404, "Product not found");
        const transformed = transformProductData(updatedProduct);
        handleResponse(res, 200, "Order placed successfully", transformed);
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