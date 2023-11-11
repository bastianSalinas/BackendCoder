const seller = []

//get customers
function getAllSellers(req, res) {
    res.json(seller)
}

//create customer
function createSeller(req,res){
    const newSeller = req.body
    seller.push(newSeller)
    res.status(201).json(newSeller)
}

const sellerControllers = {
    getAllSellers,
    createSeller
}

export default sellerControllers