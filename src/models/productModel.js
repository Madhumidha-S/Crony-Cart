import pool from "../config/db.js";

export const createProductService = async (name, description, base_price, rating) => {
    const result = await pool.query("INSERT INTO products (name, description, base_price, rating) VALUES ($1, $2, $3, $4) RETURNING *", [name, description, base_price, rating]);
    return result.rows[0];
};

export const getAllProductsService = async () => {
    const result = await pool.query("SELECT * FROM products");
    return result.rows;
}; // TODO : Filter attributes before returning to user

export const incrementProductViewService = async (productId) => {
    const result = await db.query(
        `UPDATE products SET view = view + 1 WHERE id = $1 RETURNING *`,
        [productId]
    );
    return result.rows[0];
};

export const getProductByIdService = async (id) => {
    const result = await pool.query("SELECT * FROM products where id = $1", [id]);
    return result.rows[0];
};

export const updateProductService = async (id, name, description, base_price,rating) => {
    const result = await pool.query(`UPDATE products SET 
        name = COALESCE($1, name),
        description = COALESCE($2, description),
        base_price = COALESCE($3, base_price),
        rating = COALESCE($4, rating)
    WHERE id = $5 RETURNING *`, 
    [name, description, base_price, rating, id]);
    return result.rows[0];
};

export const deleteProductService = async (id) => {
    const result = await pool.query("DELETE FROM products WHERE id = $1 RETURNING *", [id]);
    return result.rows[0];
};