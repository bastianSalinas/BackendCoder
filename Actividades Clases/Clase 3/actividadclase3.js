//ARROW FUNCTIONS

// const saludar = () => console.log('Hola');

// saludar();

// const sumar = (a,b) => {
//     return a + b;
// }

// console.log(sumar(5,10));

// arrow function en un array de un objeto

// const usuarios =[
//     {nombre: "A", edad: 20},
//     {nombre: "B", edad: 30},
//     {nombre: "C", edad: 40}
// ]

// const nombres = usuarios.map((usuario) => usuario.nombre);
// const edad = usuarios.map((usuario) => usuario.edad);

// console.log(nombres);
// console.log(edad);

// arrow function como metodo de un objeto

// const persona = {
//     nombre: "Coder",
//     edad: 30,
//     saludar: () => {
//         console.log(`Hola, soy ${persona.nombre}`)
//     }
// }
// persona.saludar();

//tambien el profe lo hizo de la siguiente forma
// const persona = {
//     nombre: "Coder",
//     edad: 30,
//     saludar: function () {
//         return `Hola, soy ${this.nombre}`
//     }
// }
// console.log(persona.saludar());

//CallBack en una funcion asincrona

// function obtenerdatosDeUsuario(id, callback) {
//     setTimeout(() => {
//         const usuario = {
//             id: id,
//             nombre: "Coder",
//             email: "coder@house.com"
//         }
//         callback(usuario)
//     }, 2000)
// }

// function mostrarDatosDeUsuario(usuario){
//     console.log(`Nombre: ${usuario.nombre}, Email: ${usuario.email}`)
// }

// obtenerdatosDeUsuario(123,mostrarDatosDeUsuario)

//Callaback en una funcion de manejo de errores

// class Image{

// }
// function cargarImagen(url, onSuccess, onError){
//     const imagen = new Image()

//     imagen.onload = function(){
//         onSuccess(imagen)
//     }
//     imagen.onerror = function(){
//         onError(new Error("No se pudo cargar la imagen"))
//     }
//     imagen.src = url
// }

// function mostrarImagen(imagen){
//     document.body.appendChild(imagen);
// }

// function mostrarError(error){
//     console.log("Error", error.message)
// }

// const urlImagen = " https://ejemplo.com/imagen.jpg"
// cargarImagen(urlImagen, mostrarImagen, mostrarError)

//Promises

// const promesa = new Promise((resolve, reject) =>{
//     setTimeout(() => {
//         const exito = true

//         if(exito){
//             resolve("La tarea se completo exitosamente")
//         }else{
//             reject("Ocurrio un error en la tarea")
//         }
//     }, 5000);
// })

// promesa.then((mensaje) =>{
//     console.log("Exito", mensaje)
// }).catch((error) => {
//     console.log("Errors", error)
// })

//Timers

//SettimeOut
//SetInterval

// setTimeout(() => {
//     console.log("Han pasado 5 segundos")
// }, 5000);

// let contador = 0

// const intervalo = setInterval(()=>{
//     contador ++
//     console.log(`El contador es ${contador}`)

//     if(contador === 5){
//         clearInterval(intervalo)
//         console.log("Intervalo detenido")
//     }
// },1000)

// function obtenerUsuario(id){
//     return new Promise ((resolve, reject)=>{
//         setTimeout(()=>{
//             const datosUsuario = {
//                 id: id,
//                 nombre: "Coder",
//                 edad: 50,
//                 email: "coder@house.com"
//             }
//             if(datosUsuario){
//                 resolve(datosUsuario)
//             }else{
//                 reject("No se pueden obtener los datos del usuario")
//             }
//         },5000)
//     })
// }

// async function mostrarDatosDeUsuario(id){
//     try{
//         const datosUsuario = await obtenerUsuario(id)
//         console.log("Datos del usuario", datosUsuario)
//     }catch{
//         console.log("Error al obtener los datos", error)
//     }
// }

// mostrarDatosDeUsuario(456)

function suma(a,b){
    return new Promise((resolve, reject) =>{
        if(a === 0 || b === 0){
            reject("No se puede realizar la operacion")
        }else if(a + b < 0){
            reject("La calculadora no ejecuta negativos")

        }else{
            resolve(a+b)
        }
    })
}

function resta(minuendo, sustraendo){
    return new Promise((resolve, reject) =>{
        if(minuendo === 0 || sustraendo === 0){
            reject("Operacion invalida")
        }else if(minuendo-sustraendo < 0){
            reject("No se permiten negativos")
        }else{
            resolve(minuendo - sustraendo)
        }
    })
}

function division(dividendo, divisor){
    return new Promise((resolve, reject) =>{
        if(divisor === 0){
            reject("No se puede dividir por 0")
        }else{
            resolve(dividendo / divisor)
        }
    })
}

//funcion asincrona

async function calculos(){
    try{
        const resultadoSuma = await suma(6,7)
        console.log("suma: ", resultadoSuma)
        const resultadoResta = await resta(3,2)
        console.log("resta: ", resultadoResta)
        const resultadoDivision = await suma(9,6)
        console.log("division: ", resultadoDivision)
    }catch(error){
        console.log("Error: ", error)
    }
}
calculos()