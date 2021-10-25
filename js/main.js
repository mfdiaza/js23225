// Proyecto cotizador de reventa

// Inicializo array de cotizaciones
const cotizacion = [];
let currentYear = new Date().getFullYear()

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

    switch (this.tipo) {
      case "1":
        dtoTV = aplicaDto(precioBaseAuto, old, 5); // Descuento 5% por año de antigüedad
        newPrize = precioBaseAuto - dtoTV;
        break;
      case "2":
        newPrize = aplicaBono(precioBaseOro, old, 1); // Sumo 1% por año de antigüedad
        break;
    }
    return newPrize;
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
  constructor(tipo, anio, monto) {
    this.tipo = tipo;
    this.anio = anio;
    this.monto = monto;
  }

  construyeWeb(tipo, anio, monto) {
    const pantalla = document.getElementById("items");
    let itemAMostrar = document.createElement("div");
    itemAMostrar.classList.add("list-group-item", "text-right", "mx-2");
    itemAMostrar.innerHTML = `            
                <li> Objeto: ${tipo} </li>
                <li> Año de compra: ${anio} </li>
                <li> Monto a pagar: ${monto} </li>
            `;
    pantalla.appendChild(itemAMostrar);
  }

  contruyeHistoria() {
      const webHistoria = document.getElementById("historia")
      let historiaPantalla = document.createElement("table")
      for (const item of cotizacion) {
          historiaPantalla.innerHTML =`
          <p> ${item.tipo} </p>
          <p> ${item.anio} </p>
          <p> ${item.precio} </p>
          `
        webHistoria.appendChild(historiaPantalla);
    }
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
    tabla.appendChild(table);
};

function aplicaBono(precio, time, bono) {
  precio = precio + (time * bono * precio) / 100;
  return precio;
}

function aplicaDto(precio, time, dto) {
  precio = (time * dto * precio) / 100;
  return precio;
}

// parso del formulario
const formulario = document.getElementById("formularioCotiza");

formulario.addEventListener("submit", (e) => {
  e.preventDefault();

  //Leo el producto a cotizar del <select>
  const tipo = document.getElementById("inputTipo");
  const tipoElegido = tipo.options[tipo.selectedIndex].value;
  const textoElegido = tipo.options[tipo.selectedIndex].text;

  //Leo el año del <input>
  const inputAnio = document.getElementById("inputAnio");
  const anioElegido = inputAnio.value;

  // Algunas validaciones
    if (anioElegido === '' || anioElegido > currentYear) {
        alert("Año vacio o invalido")
    } else {
    // Elimino cualquier resultado anterior
        const datosViejos = document.querySelector("#items div")
        if (datosViejos != null) {
            datosViejos.remove();
        }
  // Instanciamos la cotizacion
  const agregoCotizacion = new Cotizar(tipoElegido, anioElegido);
  const precio = agregoCotizacion.cotizaTipo();

  // Armo el contenido de la tabla y lo subo al array
  cotizacion.push(new Table(textoElegido, anioElegido, precio));

  // Inicializo y armo la web
  const web = new makeWeb();
  web.construyeWeb(textoElegido, anioElegido, precio);
    }
})

let botonHistory = document.getElementById("history");
let tabla = document.getElementById("historia");

botonHistory.addEventListener("click", crearTabla);

