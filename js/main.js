// Proyecto cotizador de reventa

// Inicializo array de cotizaciones
const cotizacion = [];
let currentYear = new Date().getFullYear();
let dolarhoy = cotizaDolar();

// Defino la clase cotizar

class Cotizar {
  constructor(tipo, age) {
    this.tipo = tipo;
    this.age = age;
  }

  cotizaTipo() {
    let newPrize;
    let precioBaseOro = 50000;
    let precioBaseAuto = 236000;
    let dtoTV = 0;
    let old = new Date().getFullYear() - this.age;
    let precioEnDolares;
    
    switch (this.tipo) {
      case "1":
        dtoTV = aplicaDto(precioBaseAuto, old, 5); // Descuento 5% por año de antigüedad
        newPrize = precioBaseAuto - dtoTV;
        precioEnDolares = Math.round(newPrize/dolarhoy)
        break;

      case "2":
        newPrize = aplicaBono(precioBaseOro, old, 1); // Sumo 1% por año de antigüedad
        precioEnDolares = Math.round(newPrize/dolarhoy)
        break;
    }
    return {
      newPrize, 
      precioEnDolares
    };
  }
}

class Table {
  constructor(tipo, anio, precio) {
    this.tipo = tipo;
    this.anio = anio;
    this.precio = precio;
  }
}

class makeWeb {
  constructor(tipo, anio, monto, dolares) {
    this.tipo = tipo;
    this.anio = anio;
    this.monto = monto
    this.dolares = dolares;
  }

  construyeWeb(tipo, anio, monto, dolares) {
    const pantalla = document.getElementById("items");
    
    let itemAMostrar = document.createElement("div");
    itemAMostrar.classList.add("list-group-item", "text-right", "mx-2");
    itemAMostrar.innerHTML = `            
                <li> Objeto: ${tipo} </li>
                <li> Año de compra: ${anio} </li>
                <li> Monto a pagar: ${monto} </li>
                <li> Monto en U$S: ${dolares} </li>
            `;
    pantalla.appendChild(itemAMostrar);
    $("#items").hide().fadeIn(1000).fadeOut(1000).fadeIn(1000);
  }
}
// Aca comienzan las funciones

function crearTabla(){
        // Elimino cualquier resultado anterior
        const datosViejos = document.querySelector("#historia table")
        if (datosViejos != null) {
            datosViejos.remove();
        }

    let headers = ['Producto', 'Año de compra', 'Monto a pagar'];
    let table = document.createElement('table');
    let headerRow = document.createElement('tr');
    headers.forEach(headerText => {
        let header = document.createElement('th');
        let textNode = document.createTextNode(headerText);
        header.appendChild(textNode);
        headerRow.appendChild(header);
    });
    table.appendChild(headerRow);
    cotizacion.forEach(emp => {
        let row = document.createElement('tr');
        Object.values(emp).forEach(text => {
            let cell = document.createElement('td');
            let textNode = document.createTextNode(text);
            cell.appendChild(textNode);
            row.appendChild(cell);
        })
        table.appendChild(row);
    });
    tabla.append(table);
    $("#historia").hide().fadeIn(1000).fadeOut(1000).fadeIn(1000);
}

function aplicaBono(precio, time, bono) {
  precio = precio + (time * bono * precio) / 100;
  return precio;
}

function aplicaDto(precio, time, dto) {
  precio = (time * dto * precio) / 100;
  return precio;
}


function cotizaDolar() {
  const URLGET = "https://apiarg.herokuapp.com/api/dolaroficial"

  $.get(URLGET, function (respuesta, estado) {
    if (estado === "success") {
      dolarhoy = respuesta.venta;
    }
  })
}

$(document).on({
  ajaxStart: function(){
      $("body").addClass("loading"); 
  },
  ajaxStop: function(){ 
      $("body").removeClass("loading"); 
  }    
});

// parseo del formulario
const formulario = document.getElementById("formularioCotiza");

formulario.addEventListener("submit", (e) => {
  e.preventDefault();

  //Leo el producto a cotizar del <select>
  const tipoElegido = $("#inputTipo").val();
  const textoElegido = $("#inputTipo option:selected").text();
  
  //Leo el año del <input>
  const anioElegido = $("#inputAnio").val();
  
  let maxAge = currentYear - anioElegido

  // Algunas validaciones
    if (anioElegido === '' || anioElegido > currentYear) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Año vacío o invalido!',
      })
    } 
    else if (tipoElegido == 1 && (maxAge > 20)) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Producto demasiado anticuado! (Max. 20 años)',
      })
    }
    else if (tipoElegido !=1 && tipoElegido !=2){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Debe seleccionar al menos un producto para cotizar.',
      })
    }
    else {
    // Elimino cualquier resultado anterior
        const datosViejos = document.querySelector("#items div")
        if (datosViejos != null) {
            datosViejos.remove();
    }

  // Instanciamos la cotizacion
  const agregoCotizacion = new Cotizar(tipoElegido, anioElegido);
  const precio = agregoCotizacion.cotizaTipo().newPrize;
  const dolar = agregoCotizacion.cotizaTipo().precioEnDolares;

  // Armo el contenido de la tabla y lo subo al array
  cotizacion.push(new Table(textoElegido, anioElegido, precio, dolar));

  // Cargo el array en localStorage
  const guardarLocal = (clave, valor) => { localStorage.setItem(clave, valor) };
  guardarLocal("listaCotizacion", JSON.stringify(cotizacion));

  // Inicializo y armo la web
  const web = new makeWeb();
  web.construyeWeb(textoElegido, anioElegido, precio, dolar);
    }
  // Reinicio el formulario y lo dejo listo para seleccionar otro valor
    formulario.reset();
})

let botonHistory = $("#history");
let tabla = $("#historia");

botonHistory.click(crearTabla);