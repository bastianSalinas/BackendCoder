import { promises as fs } from "fs"

export default class ProductManager {
    constructor(){
        this.patch = "./productsManager.txt"
        this.productsData = []
    }

    static id = 0 

    addProduct = async (title, description, price, thumbnail, code, stock) => {

        ProductManager.id++

        let newProduct = {title, description, price, thumbnail, code, stock, id: ProductManager.id }


        this.productsData.push(newProduct)

        await fs.writeFile(this.patch, JSON.stringify(this.productsData))
    }

    _readProducts = async () => {
        let responseRP = await fs.readFile(this.patch, "utf-8")
        return JSON.parse(responseRP)
    }

    getProducts = async () => {
        let responseGP = await this.readProducts()
        return await responseGP
    }

    getProductsById = async (id) =>{
        let responseProdAll = await this.readProducts()
        let responseProdId = responseProdAll.find(product => product.id === id)
        if(!responseProdId){
            return "Producto no encontrado"
        }else{
            return responseProdId
        }   
    }

    deleteProductsById = async (id) => {
        let responseProdAll = await this.readProducts()
        let productFilter = responseProdAll.filter(products => products.id != id)
        if (productFilter.length === responseProdAll.length) {
            return "No se encontró ningún producto con el ID " + id
        } else {
            await fs.writeFile(this.patch, JSON.stringify(productFilter))
            return "Producto eliminado con ID " + id
        }
    }

    updateProducts = async ({ id, ...productUp }) => {
        await this.deleteProductsById(id)
        let responseProdAll = await this.readProducts()
        let prodUpdate = [{ ...productUp, id}, ...responseProdAll]
        await fs.writeFile(this.patch, JSON.stringify(prodUpdate))
    }
}

//const products = new ProductManager()

// products.addProduct("Titulo Producto 1", "Desc Producto 1", 5000, "Img1", "prod1barcode", 40)
// products.addProduct("Titulo Producto 2", "Desc Producto 2", 1000, "Img2", "prod2barcode", 20)
// products.addProduct("Titulo Producto 3", "Desc Producto 3", 4000, "Img3", "prod3barcode", 30)
// products.addProduct("Titulo Producto 4", "Desc Producto 4", 4000, "Img4", "prod4barcode", 40)
// products.addProduct("Titulo Producto 5", "Desc Producto 5", 4000, "Img5", "prod5barcode", 50)
// products.addProduct("Titulo Producto 6", "Desc Producto 6", 4000, "Img6", "prod6barcode", 60)
// products.addProduct("Titulo Producto 7", "Desc Producto 7", 4000, "Img7", "prod7barcode", 70)

//products.getProducts()

//products.getProductsById(3)
//products.getProductsById(4)

//products.deleteProductsById(2)
//products.deleteProductsById(4)

// products.updateProducts(
//     {
//         title: 'Titulo Producto 1',
//         description: 'Desc Producto 1',
//         price: 3500,
//         thumbnail: 'Img Producto 1',
//         code: 'prod1barcode',
//         stock: 120,
//         id: 1,
//     }
// )