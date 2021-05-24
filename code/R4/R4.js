/*(Disculpas mias por que esta parte del código no esté acorde a la consigna, 
    tuve que crear mi propio servidor por que el de la API me daba error de CORS 
    y no encontré otra manera de solucionarlo)*/

/*(En mi servidor de node/express si se consume la api como dice la consigna)*/
// Repositorio del servidor: https://github.com/FelixSchugu/Server-api

// Se hace una petición GET a la api de mi servidor
const url = "https://server-api-prueba.herokuapp.com/api";
fetch(url)
  .then((response) => response.json())
  .then((data) => {
    console.log(data.data);

    // Se eliminan campos inncesarios
    const newData = data.data.map((elem) => {
      delete elem.description;
      delete elem.image;
      delete elem.author;
      return elem;
    });

    // se llama a una función que inicia todo el proceso
    representData(newData);
  });

// esta es la funciçon principal de la web
const representData = (data) => {
  const categories = Object.keys(data[0]); // Se guardan las categorías de las noticias
  let table = document.getElementById("container"); // Se accede al elemnto del DOM "table"
  // Se crea el header de la tabla con las categorías
  const mappedCategories = categories.map(
    (elem) => `<th scope="col" id="head-div">
            <div id="title-div">
              <div>${elem}</div>
            </div>
          </th>`
  );

  // Se crea el body de ña tabla
  const tableCategories = `<tbody> ${data
    .map(
      (
        news // Se comienza por mapear el objeto de cada noticia
      ) =>
        `<tr> ${Object.values(news)
          .map(
            (
              elem,
              idx // Se desestructura el objeto news para representar sus categorías en la tabla
            ) =>
              `<td> ${
                idx === 1 // Cuando se llega al link de la noticia se escribe un elemento "a"
                  ? "<a href=" + elem + " target=_blank>Ir al sitio</a>"
                  : idx === 6
                  ? new Date(elem).toLocaleDateString() // Acá se formatea la fecha para que quede mas estética
                  : elem // Si ninguna de las condiciones anteriores se cumple se deja el texto a secas como está en el JSON
              }</td>`
          )
          .join("")} </tr>` // El "join("")" elimina las comas que queda de cuando se pasa un array a string
    )
    .join("")} </tbody>`;

  // Se introducen las categorias al head de la tabla
  const tableHead = `<thead> ${mappedCategories.join(
    ""
  )}</thead> ${tableCategories}`;

  // Se agrega al DOM la tabla ya formateada
  table.innerHTML = tableHead;
};
