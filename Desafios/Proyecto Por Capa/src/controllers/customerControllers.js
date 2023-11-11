const customer = []

//get customers
function getAllCustomers(req, res) {
    res.json(customer)
}

//create customer
function createCustomer(req,res){
    const newCustomer = req.body
    customer.push(newCustomer)
    res.status(201).json(newCustomer)
}

const customerControllers = {
    getAllCustomers,
    createCustomer
}
export default customerControllers;