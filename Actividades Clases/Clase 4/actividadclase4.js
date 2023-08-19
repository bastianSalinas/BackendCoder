// ejemplo de uso de fs en su modo sincronico
// fs es para acceder a las operaciones para archivos
const fs = require('fs');

fs.writeFileSync('./ejemplo.txt',"Hola Coders, estoy en un archivo!")

// para trabajar con el contenido del archivo creado se ocupa lo siguiente

if(fs.existsSync('./ejemplo.txt')){
    let contenido = fs.readFileSync('./ejemplo.txt','utf-8')

    console.log(contenido)
}