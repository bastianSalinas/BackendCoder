import express from 'express'
import customerControllers from '../controllers/customerControllers.js'
const router = express.Router()

router.get('/', customerControllers.getAllCustomers);
router.post('/', customerControllers.createCustomer);

export default router
