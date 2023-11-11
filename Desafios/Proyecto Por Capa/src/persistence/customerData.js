let customer = [];

module.exports = {
    getAllCustomers: () => customers,
    createCustomer: (newCustomer) => {
        customers.push(newCustomer);
    },
};
