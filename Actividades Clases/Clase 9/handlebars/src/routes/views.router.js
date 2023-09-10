const express = require("express")
const router = express.Router()

let food = [
    {name:"Pizza", price: 1000},
    {name:"Hamburguesa", price: 1500},
    {name:"Empanadas", price: 4000}
]

router.get("/", (req, res) => {
    let testUser = {
        name: "Alumno A",
        lastname: "Coder",
        role: "admin"

        // name: "Alumno A",
        // lastname: "Coder",
        // role: "user"
    }
    res.render("index", {user: testUser, isAdmin: testUser.role === "admin", food})
})

module.exports = router