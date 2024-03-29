import { Router } from "express";
import UserDTO from "../dao/DTOs/user.dto.js";
import { userService } from "../repositories/index.js";
import Users from "../dao/mongo/users.mongo.js"
import { uploader } from "../utils.js";

const router = Router()


const usersMongo = new Users()

//Obtener Usuarios
router.get("/", async (req, res) => {
  try {
    req.logger.info('Se cargan usuarios');
    let result = await usersMongo.get()
    res.status(200).send({ status: "success", payload: result });
  }
  catch (error) {
    req.logger.error('Error al cargar usuarios');
    res.status(500).send({ status: "error", message: "Error interno del servidor" });
  }
})
//Crear Usuarios
router.post("/", async (req, res) => {
  try {
    let { first_name, last_name, email, age, password, rol } = req.body
    let user = new UserDTO({ first_name, last_name, email, age, password, rol })
    let result = await userService.createUser(user)
    if (result) {
      req.logger.info('Se crea Usuario correctamente');
    } else {
      req.logger.error("Error al crear Usuario");
    }
    res.status(200).send({ status: "success", payload: result });
  }
  catch (error) {
    res.status(500).send({ status: "error", message: "Error interno del servidor" });
  }
})

//Actualizar Rol Usuario
router.post("/premium/:uid", async (req, res) => {
  try {
    const { rol } = req.body;
    const allowedRoles = ['premium', 'admin', 'usuario'];
    const uid = req.params.uid;

    if (!allowedRoles.includes(rol)) {
      req.logger.error('Rol no válido proporcionado');
      return res.status(400).json({ error: 'Rol no válido' });
    }

    // Verifica  si el usuario tiene los documentos requeridos
    if (!(await hasRequiredDocuments(uid))) {
      req.logger.error('El usuario no tiene los documentos requeridos para el rol premium');
      return res.status(400).json({ error: 'El usuario no tiene los documentos requeridos para el rol premium' });
    }

    let changeRol = await userService.updUserRol({ uid, rol });

    if (changeRol) {
      req.logger.info('Se actualiza rol correctamente');
      res.status(200).json({ message: 'Rol actualizado correctamente' });
    } else {
      req.logger.error('Error al actualizar el rol');
      res.status(500).json({ error: 'Error al actualizar el rol' });
    }
  } catch (error) {
    req.logger.error('Error en la ruta /premium/:uid');
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

const allFiles = [];
router.post("/:uid/documents", uploader.fields([
  { name: 'profiles', maxCount: 2 },    // Puedes ajustar el límite de archivos según tus necesidades
  { name: 'products', maxCount: 2 },
  { name: 'documents', maxCount: 2 },
  { name: 'identificacion', maxCount: 1 },
  { name: 'comprobante_domicilio', maxCount: 1 },
  { name: 'comprobante_estado_cuenta', maxCount: 1 }
]), async(req, res) => {
  const files = req.files;
  const userId = req.params.uid
  let user = await usersMongo.getUserById(userId)
  if (!user) {
    return res.status(404).json({ status: 'error', error: 'Usuario no encontrado' });
  }
  // Verifica si hay archivos en cada campo y procesa según el nombre del campo
  if (files['profiles']) {
    const profiles = files['profiles'].map(file => ({ name: 'profiles', path: file.path }));
    // Puedes manejar la información de los perfiles según tus necesidades
    // Aquí se asume que hay un array llamado `products` donde se almacenan los datos
    usersMongo.updateDocuments(userId, ...profiles)
    allFiles.push(...profiles);
  }

  if (files['products']) {
    const productFiles = files['products'].map(file => ({ name: 'products', path: file.path }));
    // Puedes manejar la información de los productos según tus necesidades
   
    allFiles.push(...productFiles);
    usersMongo.updateDocuments(userId, ...productFiles)
  }

  if (files['documents']) {
    const documentFiles = files['documents'].map(file => ({ name: 'documents', reference: file.path }));
    // Puedes manejar la información de los documentos según tus necesidades
    // Aquí se asume que hay un array llamado `products` donde se almacenan los datos
    usersMongo.updateDocuments(userId, ...documentFiles)
    allFiles.push(...documentFiles);
  }
  if (files['identificacion']) {
    const identificacionFiles = files['identificacion'].map(file => ({ name: 'identificacion', reference: file.path }));
    // Puedes manejar la información de los documentos según tus necesidades
    // Aquí se asume que hay un array llamado `products` donde se almacenan los datos
    usersMongo.updateDocuments(userId, ...identificacionFiles)
    allFiles.push(...identificacionFiles);
  }
  if (files['comprobante_domicilio']) {
    const comprobante_domicilioFiles = files['comprobante_domicilio'].map(file => ({ name: 'comprobante_domicilio', reference: file.path }));
    // Puedes manejar la información de los documentos según tus necesidades
    // Aquí se asume que hay un array llamado `products` donde se almacenan los datos
    usersMongo.updateDocuments(userId, ...comprobante_domicilioFiles)
    allFiles.push(...comprobante_domicilioFiles);
  }
  if (files['comprobante_estado_cuenta']) {
    const comprobante_estado_cuentaFiles = files['comprobante_estado_cuenta'].map(file => ({ name: 'comprobante_estado_cuenta', reference: file.path }));
    // Puedes manejar la información de los documentos según tus necesidades
    // Aquí se asume que hay un array llamado `products` donde se almacenan los datos
    usersMongo.updateDocuments(userId, ...comprobante_estado_cuentaFiles)
    allFiles.push(...comprobante_estado_cuentaFiles);
  }

  res.send({ status: "success", message: "Archivos Guardados" });
});


export default router