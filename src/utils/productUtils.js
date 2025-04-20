
export const filterAndSortProducts = (products) => {
    const filtered = products.map(({ product_views, base_price, id, is_disabled, created_at, ...rest }) => rest);
    const sorted = filtered.sort((a, b) => b.rating - a.rating);
    return sorted;
};

export const transformProductData = (product) => {
    const { base_price, product_views, id, is_disabled, created_at, ...rest } = product;

    const price = base_price + product_views * 0.5;
    return {
        ...rest,
        product_views,
        price,
    };
};
