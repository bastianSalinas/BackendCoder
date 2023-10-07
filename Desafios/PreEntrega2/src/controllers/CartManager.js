import {promises as fs} from 'fs'
import {nanoid} from "nanoid"
import { cartsModel } from '../models/carts.model.js'
import ProductManager from './ProductManager.js'

//Se accede a funciones de ProductManager definiendo prodAll
const prodAll = new ProductManager()

class CartManager extends cartsModel{
    constructor() {
        super();
    }
    async getCarts() {
        try {
          const carts = await CartManager.find({});
          return carts;
        } catch (error) {
          console.error('Error al obtener los carritos:', error);
          return [];
        }
      }
    async addCart(cartData) {
        try {
          await cartsModel.create(cartData);
          return 'Carrito agregado';
        } catch (error) {
          console.error('Error al agregar el carrito:', error);
          return 'Error al agregar el carrito';
        }
      }
    
      // Obtiene un carrito por ID
      async getCartById(id) {
        try {
            console.log(id)
          const cart = await cartsModel.findById(id);
    
          if (!cart) {
            return 'Carrito no encontrado';
          }
    
          return cart;
        } catch (error) {
          console.error('Error al obtener el carrito:', error);
          return 'Error al obtener el carrito';
        }
      }
    
      // Agrega un producto al carrito
      async addProductInCart(cartId, prodId) {
        try {
          const cart = await cartsModel.findById(cartId);
    
          if (!cart) {
            return 'Carrito no encontrado';
          }
    
          // Verifica si el producto ya está en el carrito
          const existingProduct = cart.products.find((product) => product.productId === prodId);
    
          if (existingProduct) {
            // Si el producto ya está en el carrito, aumenta la cantidad
            existingProduct.quantity += 1;
          } else {
            // Si el producto no está en el carrito, agrégalo
            cart.products.push({
              productId: prodId,
              quantity: 1,
            });
          }
    
          await cart.save();
          return 'Producto agregado al carrito';
        } catch (error) {
          console.error('Error al agregar el producto al carrito:', error);
          return 'Error al agregar el producto al carrito';
        }
      }
}

export default CartManager