import { Router } from "express";
import { Users } from '../dao/factory.js'
import UserDTO from "../dao/DTOs/user.dto.js";
import UserRepository from "../repositories/Users.repository.js";

const router = Router()

const usersServices = new Users()

router.get("/", async (req, res) => {
    let result = await usersServices.get()
    res.send({ status: "success", payload: result })
})

router.post("/", async (req, res) => {
    let { first_name, last_name, email, age, password, rol } = req.body

    let user = new ProductDTO({ first_name, last_name, email, age, password, rol })
    console.log(user)
    let result = await UserRepository.createUser(user)
    console.log(result)
})

export default router