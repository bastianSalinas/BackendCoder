class Productmanager {
    constructor() {
        this.products = []
    }

    static id = 0

    addProduct(title, description, price, thumbnail, code, stock){
        for(let i = 0; i<this.products.length; i++){
            if(this.products[i].code === code){
                console.log(`El codigo ${code} esta repetido en el producto ${title}`)
                break
            }
        }

        const newProduct = {
            title, description, price, thumbnail, code, stock
        }

        if(!Object.values(newProduct).includes(undefined))
        {
            Productmanager.id++
            this.products.push({
                ...newProduct,  
                id:Productmanager.id
            })
        }else{
            console.log("All fields are required")
        }

        
    }

    getProduct(){
        return this.products;
    }

    exists (id){
        return this.products.find((prod) => prod.id === id)
    }

    getProductById(id){
        !this.exists(id) ? console.log("Product Not Found"): console.log(this.exists(id))
    }
}

const productsPM = new Productmanager

//Productos vacios
console.log(productsPM.getProduct())

//Agregamos el producto 1
productsPM.addProduct('Titulo 1','Descripcion 1', 2500,'imagen1',1111,10)
//Agregamos el producto 2
productsPM.addProduct('Titulo 2','Descripcion 2', 5500,'imagen2',2222)

//Segunda llamada = arreglo con producto
console.log(productsPM.getProduct())

//Agregamos el producto 3 para validar codigo repetido
productsPM.addProduct('Titulo 3','Descripcion 3', 10500,'imagen3',1111,20)

//Se busca Producto por Id no encontrado
productsPM.getProductById(3)

//Se busca Producto por Id
productsPM.getProductById(2)

