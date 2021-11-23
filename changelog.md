# CotizaOnline v0.1

### 23/11/2021

* [+] Se sumo la validacion del input type number del año, para que solo permita ingresar digitos solamente.
* [+] Se agregaron comentarios en todo el programa a fin de clarificar su funcionamiento.
* [+] Se actualiza el archivo changelog.md

### 15/11/2021

* [~] Se amplio el tiempo de las animaciones a 2 seguundos para hacerlas mas visibles.
* [-] Se quita seccion about.
* [~] Se achican las imagenes (Puede cambiar ligeramente el comportamiento en la entrega del proyecto final quitando los botones)
* [~] Fix para los timers de la tabla historica 
* [~] FIX: Se remueve el about de cotiza.html 
* [~] FIX: Se cambia http por https en la carga de la libreria sweetalert (https://developer.mozilla.org/en-US/docs/Web/Security/Mixed_content)


### 13/11/2021
* [~] Se corrige funcion para mostrar spinner durante la consulta a la API 
* [~] Fixed spinner

### 12/11/2021
* [+] Agregamos AJAX al proyecto, el mismo lee una API con la cotizacion del dolar y usa el valor para calcular la cotizacion del producto en dos monedas diferentes
* [+] Agregado el loader para cubrir la demora de la API 

### 07/11/2021
* [+] Se suman animaciones en el index.
* [+] Animaciones anidadas para los elementos que se crean con la cotizacion.

### 06/11/2021
* [+] Se guarda el array en el localStorage
* [+] Algunas secciones son ahora con jQuery para cumplir la curricula (Aunque manteniendo JS puro en el resto).

### 03/11/2021
* [+] Agregada la validacion para que el select del producto no pueda estar vacio

### 01/11/2021
* [+]  Se agrega validacion para la maxima antigüedad permitida para los vehiculos

### 27/10/2021
* [+] Agregado de library SweetAlert2 (recomendado por Lucio ;)) 

### 25/10/2021
* [+] Generacion del formulario + aplicacion de eventListener
* [~] La clase cotizar aplica ahora a todos los productos (De momento, se redujo a 2 prod)
* [+] Se creo la primera version de la clase para construir la interfaz de usuario
* [+] Si bien todas las cotizaciones se guardan en un array, esta version solo muestra la ultima, en futuras versiones se podrán revisar las cotizaciones historicas.
* [+] Se agrega boton que recorre el array y muestra una tabla con el contenido historico
* [+] Se agrega un reset al formulario despues de cada submit 

### 12/10/2021
* [~] Se suma la validacion de los input en todas las funciones.
* [+] Agregamos antigüedad maxima para evitar que el precio final se muestre en negativo.
* [~] Se corrigen los links al cotizador en index.html
* [+] Agregado de favicon.ico
* [~] Corregidos los html para leer correctamente el favicon en GitHub 
### 11/10/2021
### Entrega 6 (Array) + Entrega complementaria (Object Array sort) + 1ra Entrega final

* [+] Primera version del sitio con html + bootstrap
* [+] Se crea un object array que va guardando todas las cotizaciones
* [+] Se crea funcion para mostrar en pantalla el contenido del array
* [~] Ahora que tenemos un array, el prompt es un loop while para poder seguir cotizando cosas.
* [~] En todas las funciones de cotizacion, se agregó el push para sumar al array.

---

## Futuras versiones
  Aun no definido :)
