import customerData from '../persistence/customerData.js'

function getAllCustomers() {
    return customerData.getAllCustomers();
}

function createCustomer(newCustomer) {
    customerData.createCustomer(newCustomer);
}

module.exports = {
    getAllCustomers,
    createCustomer,
};

