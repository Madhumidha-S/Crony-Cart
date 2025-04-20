
export const filterAndSortProducts = (products) => {
    const filtered = products.map(({ view, base_price, ...rest }) => rest);
    const sorted = filtered.sort((a, b) => b.rating - a.rating);
    return sorted;
};

export const transformProductData = (product) => {
    const { base_price, view, ...rest } = product;

    const price = base_price + view * 0.5; 
    return {
        ...rest,
        view,
        price,
    };
};
