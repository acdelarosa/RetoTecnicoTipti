class Hotel {
  constructor(nombre, calificacion, weekdayNormal, weekendNormal, weekdayRecompensa, weekendRecompensa) {
      this.nombre = nombre;
      this.calificacion = calificacion;
      this.weekdayNormal = weekdayNormal;
      this.weekendNormal = weekendNormal;
      this.weekdayRecompensa = weekdayRecompensa;
      this.weekendRecompensa = weekendRecompensa;
  }

  /* Aquí se obtienen dos parámetros. El tipo de cliente (customerType) y si es fin de semana
  Entonces en la línea 17 vemos si el tipo de cliente es regular. En caso de cumplirse vamos a la línea 18, 
  en donde pregunta si es fin de Semana Normal. Si es falso nos arroja el valor de entre semana y normal
  Y si no se cumple vamos al else de la línea 20 y de nuevo comprobamos si es fin de semana o día entre semana*/


  obtenerCalificacion(customerType, weekend) {
      if (customerType === 'regular') {
          return weekend ? this.weekendNormal : this.weekdayNormal;
      } else {
          return weekend ? this.weekendRecompensa : this.weekdayRecompensa;
      }
  }
}

/* Aquí ingreso toda la información de los 3 hoteles, en el orden que pusimos la clase hotel (que está más arriba) */

const hotels = [
  new Hotel('Lakewood', 3, 110, 90, 80, 80),
  new Hotel('Bridgewood', 4, 160, 60, 110, 50),
  new Hotel('Ridgewood', 5, 220, 150, 100, 40)
];

const dates = [];

/* función para ver si es fin de semana. Se pide de parámetro una fecha, se establece la constante día de la semana (day of week) y se usa el método getDay (este método sirve para que cuando se obtenga una fecha, este regrese un número del 0 al 6, donde cero es domingo, 1 es lunes y así hasta llegar al sabado que es 6)*/
function weekend(date) {
  const dayOfWeek = date.getDay();
  return dayOfWeek === 0 || dayOfWeek === 6; /* si es cero es domingo y si es 6 es sabado (por el método getDay que está explicado arriba) */
}


/* Comienzo la función agregar fecha; creo la constate date Input en donde selecciono del html el id dates (en el html use
  el input de tipo date para que se despliegue un calendario, y así no tenga que validar que la info ingresada no sea fecha, sean 
  números o que esté mal ingresada) En la línea 54 creo la constante dateValue */

function agregarFecha() {
  const dateInput = document.getElementById('dates');
  const dateValue = dateInput.value;
  /* Pusheo el valor obtenido en el array dates que está en la línea 34 y lo convierto en un objeto de dates (con la función Date) y llamo a la funci+on mostrar fechas que está en la línea 54 */
  if (dateValue) {
      dates.push(new Date(dateValue));
      mostrarFechas();
      dateInput.value = ''; /* Esto sirve para limpiar el input de fechas */
  }
}

/* En esta función obtengo el elemento del html que se llama listadeFechas, luego limpio el contenido (ahí ya esta explicado)
Con el forEach recorro el array dates, luego con createElement, creo el nuevo elemento li.
Y por último le agrega como ultimo hijo de la lista de fechas
*/
function mostrarFechas() {
  const listaFechas = document.getElementById('listadeFechas');
  listaFechas.innerHTML = ''; /* esta línea limpia el contenido de la lista, si había algo previo en ese array y así va desde cero de nuevo*/
  dates.forEach((date, index) => {
      const listItem = document.createElement('li');
      listItem.textContent = date.toDateString();
      listaFechas.appendChild(listItem);
  });
}

/* Se obtiene el tipo de cliente seleccionando del html por el id "tipodeCliente"
Se inicializan las variables hotelmasBarato y preciomasBarato, la primera en null para demostrar que aún no hay un hotel más barato (si se podría iniciar de otra manera)
La variable preciomasBarato se inicializa con infinity para que cualquier tarifa encontrada sea más barata
Se recorre con el forEach todo el array de Hotels, luego inicializo la variable precioTotal (aquí se van a ir aumentando el precio por cada día seleccionado)
en la línea dates.forEach se recorre el array de dates (que está en la línea 34)
En la constante price se llama al método obtenerCalificacion por el tipo de cliente y el día de la semana y a eso se le va sumando en la línea 88 al precio total
Luego se comparan precios:
- Se compara si el precio total es más bajo que el precio más barato.
- Si es más barata la tarifa total se actualiza hotelmasBarato y preciomasBarato
- Pero si es igual a la más barata pero tienen una calificacion mayor, se actualiza hotelmasBarato y preciomasBarato
Y por último se llama a la funcion findCheapestHotel para que muestre el hotel más barato y sus precios
*/
function findCheapestHotel() {
  const customerType = document.getElementById('tipodeCliente').value;

  let hotelmasBarato = null;
  let preciomasBarato = Infinity;

  hotels.forEach(hotel => {
      let precioTotal = 0;
      dates.forEach(date => {
          const price = hotel.obtenerCalificacion(customerType, weekend(date));
          precioTotal += price;
      });

      if (precioTotal < preciomasBarato || (precioTotal === preciomasBarato && hotel.calificacion > (hotelmasBarato ? hotelmasBarato.calificacion : 0))) {
          hotelmasBarato = hotel;
          preciomasBarato = precioTotal;
      }
  });

  mostrarHotelmasBarato(hotelmasBarato, preciomasBarato);
}

/* creamos la funcion mostrarHotelmasBarato, todo esto es para que se muestre el hotel más barato, la calificación de dicho hotel y por último el precio
En el precio va a estar la tarifa total, digamos si selecciono solo un dpia solo va a estar ese día pero si selecciono varios días, pues se van a sumar todos esos precios */

function mostrarHotelmasBarato(hotel, price) {
  const hotelDiv = document.getElementById('hotelMasBarato');
  const estrellas = obtenerEstrellas(hotel.calificacion);
  hotelDiv.innerHTML = `
      <div class="finalHotel"> <br>
          <h3>${hotel.nombre}</h3> <br>
          <p>Calificación: ${estrellas} </p> <br>
          <p>Precio: $${price}</p>
      </div>
  `;
}


/* función para reemplazar el número de la calificación por la imagen estrella */
function obtenerEstrellas(calificacion) {
  let estrellasHTML = '';
  for (let i = 0; i < calificacion; i++) {
      estrellasHTML += '<img src="estrella.jpg" alt="estrella" width="20" height="20">';
  }
  return estrellasHTML;
}