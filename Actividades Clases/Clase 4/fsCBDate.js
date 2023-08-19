const fs = require('fs');
const fechaHoraActual = new Date();
// Obtener la fecha actual en formato de cadena (AAAA-MM-DD)
const fechaActual = fechaHoraActual.toISOString().slice(0, 10);

// Obtener la hora actual en formato de cadena (HH:MM:SS)
const horaActual = fechaHoraActual.toLocaleTimeString();

fs.writeFile('./ejemploDateHour.txt', 'La fecha actual es: '+fechaActual+' y la hora actual es: '+horaActual, (error) => {

    if (error) return console.log('Error al escribir el archivo') //Pregunto si el error del callback existe
    fs.readFile('./ejemploDateHour.txt', 'utf-8', (error, resultado) => {

        if (error) return console.log('Error al leer el archivo')
        console.log(resultado)
        fs.unlink('./ejemploDateHour.txt', (error) => {
            if (error) return console.log('No se pudo eliminar el archivo')
        })
    })
})