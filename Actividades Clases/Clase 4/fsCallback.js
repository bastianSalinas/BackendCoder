const fs = require('fs');
fs.writeFile('./ejemploCallBack.txt', 'Hola dede Callback', (error) => {

    if (error) return console.log('Error al escribir el archivo') //Pregunto si el error del callback existe
    fs.readFile('./ejemploCallback.txt', 'utf-8', (error, resultado) => {

        if (error) return console.log('Error al leer el archivo')
        console.log(resultado)
        fs.appendFile('./ejemploCallback.txt', ' Más contenido', (error) => {

            if (error) return console.log("Error al actualizar el archivo")
            fs.readFile('./ejemploCallback.txt', 'utf-8', (error, resultado) => {

                if(error) return console.log("Error al leer el archivo")
                console.log(resultado) //Si todo va bien debe mostrar "Hola desde Callback más Contenido"
                fs.unlink('./ejemploCallback.txt', (error) => {
                    if (error) return console.log('No se pudo eliminar el archivo')
                })
            })
        })
    })
})