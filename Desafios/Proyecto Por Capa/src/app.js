import express from 'express'
import mongoose from "mongoose";
import custRouter from './routes/customer.routes.js'
import sellRouter from './routes/seller.routes.js'
import saleRouter from './routes/sale.routes.js'
import config from './config.js'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use("/api/customer", custRouter)
app.use("/api/seller", sellRouter)
app.use("/api/sale", saleRouter)



app.listen(config.port, () => {
    console.log(`Servidor Express Puerto ${config.port}`)
})
mongoose.connect(config.mongoUrl)
.then(()=>{
    console.log("Conectado a la base de datos")
})
.catch(error => {
    console.error("Error al conectarse a la base de datos, error"+error)
})



