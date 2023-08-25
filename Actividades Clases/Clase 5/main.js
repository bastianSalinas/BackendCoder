
// function numerosRandom(min, max, cant){
//     return Array.from({length: cant}, () => Math.floor(Math.random() *
//     (max - min +1)) + min)
// }

// const numeros = numerosRandom(1,20,10000)
// //console.log(numeros)

// const resultado = {}

// numeros.forEach(n=> resultado[n] = (resultado[n] || 0) + 1)

// console.log(resultado)

const fs = require("fs/promises")
const crypto = require("crypto")

class UserManager{
    constructor(){
        this.filePath = "Usuarios.json"
    }

    //Version ChatGPT donde puedo crear usuarios varias veces sin error
    async createUserGPT(user) {
        const { nombre, apellido, username, password } = user;
      
        // Usar crypto para hashear el password
        const hashedPassword = crypto.createHash("sha256").update(password).digest("hex");
      
        try {
          let users = [];
          if (await fs.access(this.filePath).then(() => true).catch(() => false)) {
            const fileContent = await fs.readFile(this.filePath, "utf8");
            users = JSON.parse(fileContent); // Agregar usuarios existentes a 'users'
          }
      
          users.push({ nombre, apellido, username, password: hashedPassword });
      
          await fs.writeFile(this.filePath, JSON.stringify(users, null, 2));
      
          console.log("Usuario creado correctamente");
        } catch (error) {
          console.error("Error al crear el usuario: ", error);
        }
      }


    //Version Profe
    async createUser(user){
        const { nombre, apellido, username, password } = user

        //usar crypto para hashear el password
        const hashedPassword = crypto.createHash("sha256").update(password).digest("hex")

        try{
            let users = []
            if(await fs.access(this.filePath).then(() => true).catch(()=> false)){
                const fileContent = await fs.readFile(this.filePath, "utf8")
                user.JSON.parse(fileContent)
            }

            users.push({nombre, apellido, username, password: hashedPassword})

            await fs.writeFile(this.filePath, JSON.stringify(users, null, 2))

            console.log("Usuario creado correctamente")
        }catch(error){
            console.error("Error al crear el usuario: ", error)
        }
    }

    async validateUser(username, password){
        try
        {
            if(await fs.access(this.filePath).then(()=> true).catch(()=>false))
            {
                const fileContent = await fs.readFile(this.filePath, "utf8")
                const users = JSON.parse(fileContent)

                const user = users.find(u => u.username === username)

                if(user){
                    const hashedPassword = crypto.createHash("sha256").update(password).digest("hex")
                    if(hashedPassword === user.password){
                        console.log("Logueado")
                    }else{
                        console.log("Error, contraseña incorrecta")
                    }
                }else{
                    console.log("Error, usuario no encontrado")
                }
            }else{
                console.log("No hay usuarios registrados")
            }
        } catch(error) {
            console.log("Error al validar usuario", error)
        }
    }
}

const userManager = new UserManager()

userManager.createUser({
    nombre: "Bastian",
    apellido: "Salinas",
    username: "bsalinas",
    password: "bsalinas123"
}).then(()=>{
    userManager.validateUser("bsalinas","bsalinas123")
    //userManager.validateUser("basalinas","bsalinas") 
})