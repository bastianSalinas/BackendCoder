let seller = [];

module.exports = {
    getAllSellers: () => sellers,
    createCustomer: (newSeller) => {
        sellers.push(newSeller);
    },
};