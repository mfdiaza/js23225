// Proyecto cotizador de reventa

// Inicializo array de cotizaciones
const cotizacion = [];

// Defino la clase Auto

class Auto {
    constructor (year, oldAuto, precioBase) {
        this.year = year;
        this.oldAuto = oldAuto;
        this.precioBase = precioBase;
    }

    mostrarAuto() {
        document.write("<ul>")
        document.write(`<li>Año de compra: ${this.year} </li>`);
        document.write(`<li>Antigüedad calculada: ${this.oldAuto} </li>`);
        document.write(`<li>Precio a pagar (con los dtos.): ${this.precioBase} </li>`);
        document.write("</ul>")
    }

}

// Defino la clase Tele

class Tele {
    constructor (year, pulgadas, precioBase) {
        this.year = year;
        this.pulgadas = pulgadas;
        this.precioBase = precioBase;
    }

    mostrarTV() {
        document.write("<ul>")
        document.write(`<li>Año de compra: ${this.year} </li>`);
        document.write(`<li>Pulgadas: ${this.pulgadas} </li>`);
        document.write(`<li>Precio a pagar: ${this.precioBase} </li>`);
        document.write("</ul>")
    }

}

// Defino la clase Oro

class Oro {
    constructor (year, kilates, precioBase) {
        this.year = year;
        this.kilates = kilates;
        this.precioBase = precioBase;
    }

    mostrarGold() {
        document.write("<ul>")
        document.write(`<li>Año de compra: ${this.year} </li>`);
        document.write(`<li>Kilates: ${this.kilates} </li>`);
        document.write(`<li>Precio a pagar: ${this.precioBase} </li>`);
        document.write("</ul>")
    }

}


// Aca comienzan las funciones


function cotizarAuto() {
    // Declaro un precio base para el producto
    let precioAuto = 500000;
    let dtoAuto = 0;
    
    // // Consulto por el año de adquisicion
    let year = parseInt(prompt("Ingrese el año en que adquirió el producto"));

    if (isNaN(year)) {
        alert("Debe ingresar el año");
    }

    // // Calculo cuantos años pasaron desde que lo compro
    let difftime = new Date().getFullYear() - year;

    if (difftime >= 15){
        alert("El vehiculo es demasiado antiguo y no se puede cotizar");
    }
    else {
    // Descuento 5% por año de antigüedad
    dtoAuto = aplicaDto(precioAuto, difftime, 5)
    
    let newPrizeCar = precioAuto - dtoAuto;

    // Agrego la cotizacion al array
    cotizacion.push(new Auto(year, difftime, newPrizeCar));
    }
    
    // const COTIZO = new Auto(year, difftime, newPrizeCar);
    // COTIZO.mostrarAuto();

}

function cotizarTV() {
    // Declaro un precio base para el producto
    let precioTV = 60000; 
    let bono = 0;
    let dto = 0;
 // Consulto por el año de adquisicion y las pulgadas que tiene el televisor
    let year = parseInt(prompt("Ingrese el año en que adquirió el producto"));
    let size = parseInt(prompt("Cuantas pulgadas tiene el televisor?"));

    // Si el TV es mayor a 55 pulgadas, entonces le otorgo un bono del 15%
    if (size >= 55) {
        bono = aplicaBono(precioTV);
    }

    // // Calculo cuantos años pasaron desde que lo compro
    let difftime = new Date().getFullYear() - year;

    if (difftime >= 5){
        alert("El producto es demasiado antiguo y no se puede cotizar");
    }
    else {
    // Descuento 1% por año de antigüedad
    dto = aplicaDto(precioTV, difftime, 1)

    let newPrize = precioTV + bono - dto

    let VALIDACION = validaInputTV(year, size);

    if (VALIDACION) {
       
        cotizacion.push(new Oro(year, size, newPrize));
    }

    else {
        alert("Debe ingresar una opcion valida")
    }
}
    
}

function cotizarOro() {
    // Declaro un precio base para el producto
    let precioOro = 2125300; 

    // // Consulto por el año de adquisicion y las pulgadas que tiene el televisor
    let year = parseInt(prompt("Ingrese el año en que adquirió el producto"));
    let kilates = parseInt(prompt("Cuantos kilates tiene la joya?"));

   // Calculo cuantos años pasaron desde que lo compro
    let difftime = new Date().getFullYear() - year;

    // Sumo 3% por año de antigüedad
    precioOro += ((difftime * 3) * precioOro) / 100;

    // Si es menos de 18 kilates, no lo quiero
     if (kilates < 18) {
        alert("Lo siento, pero no me sirve tu mercancia")
    }
    else {
    
        cotizacion.push(new Tele(year, kilates, precioOro));
    }
}



function validaInputTV(year, size){

    let valido = false;

    if (!isNaN(year) && !isNaN(size)) {
        valido = true;
    }
    return valido;
}

function aplicaBono(precio){
    precio = precio * 15/100
    return precio;
}


function aplicaDto(precio, time ,dto){
    precio = ((time * dto) * precio) / 100;
    return precio;
}

function muestraArray() {
    // Ordeno el array por precio (Mejor pago primero)
    cotizacion.sort(function(a, b){return b.precioBase - a.precioBase}); 
    
    for (const cotiza of cotizacion) {
    
        document.write("<ul>")
        document.write(`<li>Año de compra: ${cotiza.year} </li>`);
        document.write(`<li>Precio a pagar: ${cotiza.precioBase} </li>`);
        document.write("</ul>")
        
    }
}

let condicionCorte = 5;

// Solicito al usuario ingresar el tipo de objeto a vender

let opcionCotizar = Number(prompt("Ingrese el tipo de producto a cotizar: 1 - Automovil, 2 - Televisor, 3 - Joyas o, 4 - Mostrar carrito o bien ingrese 5 para salir"));

while (opcionCotizar != 5){
switch (opcionCotizar) {
      case 1:
          cotizarAuto();
        break;
      case 2:
          cotizarTV();
        break;
      case 3:
          cotizarOro();
        break;
      case 4:
          muestraArray();
        break;
      case 5:
          break;

      default:
          alert("Elija una opcion valida!")
        break;
}
opcionCotizar = Number(prompt("Ingrese el tipo de producto a cotizar: 1 - Automovil, 2 - Televisor, 3 - Joyas o, 4 - Mostrar carrito o bien ingrese 5 para salir"));
}