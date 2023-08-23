import { promises as fs } from "fs"

class ProductManager {
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

    readProducts = async () => {
        let responseRP = await fs.readFile(this.patch, "utf-8")
        return JSON.parse(responseRP)
    }

    getProducts = async () => {
        let responseGP = await this.readProducts()
        return await console.log(responseGP)
    }

    getProductsById = async (id) =>{
        let responseProdAll = await this.readProducts()
        let responseProdId = responseProdAll.find(product => product.id === id)
        if(!responseProdId){
            console.log("Producto no encontrado")
        }else{
            console.log(responseProdId)
        }   
    }

    deleteProductsById = async (id) => {
        let responseProdAll = await this.readProducts()
        let productFilter = responseProdAll.filter(products => products.id != id)
        if (productFilter.length === responseProdAll.length) {
            console.log("No se encontró ningún producto con el ID " + id);
        } else {
            await fs.writeFile(this.patch, JSON.stringify(productFilter))
            console.log("Producto eliminado con ID " + id);
        }
    }

    updateProducts = async ({ id, ...productUp }) => {
        await this.deleteProductsById(id)
        let responseProdAll = await this.readProducts()
        let prodUpdate = [{ ...productUp, id}, ...responseProdAll]
        await fs.writeFile(this.patch, JSON.stringify(prodUpdate))
    }
}

const products = new ProductManager

// products.addProduct("Titulo Producto 1", "Desc Producto 1", 5000, "Img Producto 1", "prod1barcode", 40)
// products.addProduct("Titulo Producto 2", "Desc Producto 2", 1000, "Img Producto 2", "prod2barcode", 100)
// products.addProduct("Titulo Producto 3", "Desc Producto 3", 4000, "Img Producto 3", "prod3barcode", 20)

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