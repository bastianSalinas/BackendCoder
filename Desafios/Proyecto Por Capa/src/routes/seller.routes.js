import express from 'express'
import sellerControllers from '../controllers/sellerControllers.js'
const router = express.Router()

router.get('/', sellerControllers.getAllSellers);
router.post('/', sellerControllers.createSeller);

export default router