// ejemplo de uso de fs en su modo sincronico
// fs es para acceder a las operaciones para archivos
const fs = require('fs');

fs.writeFileSync('./ejemplo.txt',"Hola Coders, estoy en un archivo!")

// para trabajar con el contenido del archivo creado se ocupa lo siguiente

if(fs.existsSync('./ejemplo.txt')){
    let contenido = fs.readFileSync('./ejemplo.txt','utf-8')

    console.log(contenido) //El resultado es Hola Coders, estoy en un archivo!
    fs.appendFileSync('./ejemplo.txt', ' Más contenido')

    //volvemos a leer el contenido del archivo
    contenido = fs.readFileSync('./ejemplo.txt','utf-8')
    console.log(contenido) //Esta vez el contenido será Hola Coders, estoy en un archivo! Más contenido

    fs.unlinkSync('./ejemplo.txt')
    //Por último, esta linea de codigo eliminará el archivo, independientemente del contenido que tenga
}