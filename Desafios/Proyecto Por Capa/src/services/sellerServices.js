import sellerData from '../persistence/sellerData.js'

function getAllSellers() {
    return sellerData.getAllSellers();
}

function createSeller(newSeller) {
    sellerData.createSeller(newSeller);
}

module.exports = {
    getAllSellers,
    createSeller,
};