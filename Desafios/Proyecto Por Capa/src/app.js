import express from 'express'
import bodyParser from 'body-parser'
import mongoose from "mongoose";
import custRouter from './routes/customer.routes.js'
import sellRouter from './routes/seller.routes.js'

const app = express()
const PORT = 8080
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }));

app.use("/customer", custRouter)
app.use("/seller", sellRouter)


app.listen(PORT, () => {
    console.log(`Servidor Express Puerto ${PORT}`)
})
mongoose.connect("mongodb+srv://bastsrojas:ptLuitYCTl6wE4jB@cluster0.wx37dwm.mongodb.net/?retryWrites=true&w=majority")
.then(()=>{
    console.log("Conectado a la base de datos")
})
.catch(error => {
    console.error("Error al conectarse a la base de datos, error"+error)
})