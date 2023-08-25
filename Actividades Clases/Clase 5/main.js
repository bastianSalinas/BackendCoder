
function numerosRandom(min, max, cant){
    return Array.from({length: cant}, () => Math.floor(Math.random() *
    (max - min +1)) + min)
}

const numeros = numerosRandom(1,20,10000)
//console.log(numeros)

const resultado = {}

numeros.forEach(n=> resultado[n] = (resultado[n] || 0) + 1)

console.log(resultado)