import mongoose from 'mongoose'
import Product from '../dao/mongo/products.mongo.js'
import Assert from 'assert'
import Chai from 'chai'
import Supertest from 'supertest'
import config from '../config/config.js' 

mongoose.connect(config.mongo_url);

const assert = Assert.strict
const expect = Chai.expect
const requester = Supertest("http://localhost:8080")

describe('Testing Product DAO Mocha/Chai/SuperTest', () => {
    before(function () {
        this.productsDao = new Product()
    })
    it("Debería devolver los productos de la DB", async function () {
        this.timeout(5000)
        try
        {
            const result = await this.productsDao.get()
            assert.strictEqual(Array.isArray(result), true) //Mocha
            expect(Array.isArray(result)).to.be.equals(true) //Chai
        }
        catch(error)
        {
            console.error("Error durante el test: ", error)
            assert.fail("Test get producto con error")
        }
    })
    it("El DAO debe agregar un producto en la DB", async function () {
        let mockProduct = {
            description: "Test Description",
            image: "Test Image",
            price: 1777,
            stock: 77,
            category: "Test Category",
            availability: "in_stock",
            owner: "Test Owner"
        }
        const result = await this.productsDao.addProduct(mockProduct)
        assert.ok(result._id) //Mocha
        expect(result).to.have.property('_id') //Chai
    })
    // it("El DAO debe actualizar un producto", async function () {
    //     let prodId = "6566ae77204090d4be4af806"
    //     let mockProductUpd = {
    //         description: "Test Desc Upd",
    //         image: "Test Image Upd",
    //         price: 1777,
    //         stock: 77,
    //         category: "Test Category Upd",
    //         availability: "Test Availability Upd",
    //         owner: "Test Owner Upd"
    //     }
    //     const result = await this.productsDao.updateProduct({ prodId: prodId, prodData:mockProductUpd })
    //     assert.strictEqual(typeof result, "object") //Mocha
    //     expect(result).to.be.an('object') //Chai
    // })
    // it("El DAO debe devolver un usuario despues de colocar un parametro cualquiera", async function () {
    //     let filterData = { first_name: 'admin'}
    //     const result = await this.usersDao.findJWT(filterData)
    //     assert.strictEqual(typeof result, "object") //Mocha
    //     expect(result).to.be.an('array'); //Chai
    // })
    // it("El endpoint GET /users debe devolver todos los usuarios", async function() {
    //     const response = await requester.get('/users')
    //     // Verifica el código de estado HTTP
    //     assert.strictEqual(response.status, 200);
    //     // Verifica el tipo de contenido de la respuesta
    //     expect(response.type).to.equal('application/json');
    //     // Verifica que la respuesta tenga una propiedad 'status' con valor 'success'
    //     expect(response.body).to.have.property('status', 'success');
    // })
    // it("El endpoint POST /users debe crear un usuario", async function() {
    //     let mockUser = {
    //         first_name: "SuperTest First Name",
    //         last_name: "SuperTest Last Name",
    //         email: "SuperTest Email",
    //         age: 40,
    //         password: "SuperTest Pass",
    //         rol: "SuperTest Rol"
    //     }
        
    //     const response = await requester.post('/users').send(mockUser)
    //     // Verifica el código de estado HTTP
    //     assert.strictEqual(response.status, 200);
    //     // Verifica el tipo de contenido de la respuesta
    //     expect(response.ok).to.equal(true);
    //     // Verifica que la respuesta tenga una propiedad 'status' con valor 'success'
    //     expect(response.body).to.have.property('status', 'success');
    // })
    after(function(done) {
        this.timeout(5000);
        console.log("Fin de las pruebas de Producto");
        done();
    });
})
