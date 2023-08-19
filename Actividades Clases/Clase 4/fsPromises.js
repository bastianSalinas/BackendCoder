const fs = require('fs')
const operacionesAsincronas = async() => {

    await fs.promises.writeFile('./ejemploPromesa.txt','Hola desde la promesa')

    let resultado = await fs.promises.readFile('./ejemploPromesa.txt','utf-8')
    console.log(resultado)

    await fs.promises.appendFile('./ejemploPromesa.txt',' Contenido adicional')

    resultado = await fs.promises.readFile('./ejemploPromesa.txt','utf-8')
    console.log(resultado)

    await fs.promises.unlink('./ejemploPromesa.txt')
}

operacionesAsincronas();