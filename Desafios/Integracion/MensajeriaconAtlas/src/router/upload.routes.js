import { Router } from "express";
import { uploader } from "../controllers/multer.js";

const router = Router();

let products = []; // Change variable name to 'products'

router.get("/", (req, res) => {
  res.send({ status: "success", payload: products }); // Change 'prod' to 'products'
});

router.post("/", uploader.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).send({ status: "error", error: "No se pudo guardar la imagen" });
  }
  console.log(req.file);

  let prod = req.body;
  prod.profile = req.file.path;
  products.push(prod); // Push the product into 'products' array
  res.send({ status: "success", message: "Producto Guardado" });
});

export default router;