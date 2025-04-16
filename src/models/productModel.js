import pool from "../config/db.js";

export const createProductService = async (name, description, base_price) => {
    const queryText = await pool.query("INSERT INTO products (name, description, base_price) VALUES ($1, $2, $3) RETURNING *", [name, description, base_price]);
    return result.rows[0];
};

export const getAllProductsService = async () => {
    const queryText = await pool.query("SELECT * FROM products");
    return result.rows;
}; // TODO : Filter attributes before returning to user

export const getProductByIdService = async (id) => {
    const result = await pool.query("SELECT * FROM products where id = $1", [id]);
    return result.rows[0];
};

export const updateProductService = async (id, name, description, base_price) => {
    const queryText = await pool.query(`UPDATE products SET 
        name = COALESCE($1, name),
        description = COALESCE($2, description),
        base_price = COALESCE($3, base_price)
    WHERE id = $4 RETURNING *`, 
    [name, description, base_price, id]);
    return result.rows[0];
};

export const deleteProductService = async (id) => {
    const queryText = await pool.query("DELETE FROM products WHERE id = $1 RETURNING *", [id]);
    return result.rows[0];
};