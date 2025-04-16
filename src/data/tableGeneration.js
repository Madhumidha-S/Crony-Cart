import pool from "../config/db.js";

export const createProductTable = async () => {
    const queryText = `
    CREATE TABLE IF NOT EXISTS products(
        id SERIAL PRIMARY KEY,
        base_price INT NOT NULL,
        rating FLOAT DEFAULT 0,
        product_views INT DEFAULT 0,
        num_ordered INT DEFAULT 0,
        is_disabled BOOL DEFAULT FALSE,
        name VARCHAR(100) NOT NULL,
        description VARCHAR(100),
        created_at TIMESTAMP DEFAULT NOW()
    );`;
    try {
        pool.query(queryText);
        console.log("Product Table create if not exists");
    } catch (err) {
        console.log("Error creating products table : ", err);
    }
};

export const createUserTable = async () => {
    const queryText = 'CREATE TABLE IF NOT EXISTS users( id SERIAL PRIMARY KEY, name VARCHAR(100) NOT NULL, email VARCHAR(100) UNIQUE NOT NULL, created_at TIMESTAMP DEFAULT NOW())';
    try {
        pool.query(queryText);
        console.log("User Table create if not exists");
    } catch (err) {
        console.log("Error creating users table : ", err);
    }
};

export const createOrderTable = async () => {
    const queryText = `
    CREATE TABLE IF NOT EXISTS orders(
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (product_id) REFERENCES products(id))
    `;
    try {
        pool.query(queryText);
        console.log("Orders Table create if not exists");
    } catch (err) {
        console.log("Error creating orders table : ", err);
    }
};

export const createViewTable = async () => {
    const queryText = `
    CREATE TABLE IF NOT EXISTS views(
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    viewed_at TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (product_id) REFERENCES products(id))
    `;
    try {
        pool.query(queryText);
        console.log("Views Table create if not exists");
    } catch (err) {
        console.log("Error creating views table : ", err);
    }
};

export const createReviewTable = async () => {
    const queryText = `
    CREATE TABLE IF NOT EXISTS reviews(
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (product_id) REFERENCES products(id))`;
    try {
        pool.query(queryText);
        console.log("Reviews Table create if not exists");
    } catch (err) {
        console.log("Error creating reviews table : ", err);
    }
};