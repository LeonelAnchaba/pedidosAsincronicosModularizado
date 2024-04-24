window.onload = () => {
  const app = document.getElementById("root");
  const container = document.createElement("div");
  container.setAttribute("class", "container");

  const trash = document.createElement("i")
  trash.setAttribute("class", "fa-solid fa-trash")
  trash.style.position = "absolute"
  trash.style.right = "20vw"
  trash.style.top = "20vh"

  app.appendChild(trash)

  app.appendChild(container);

  trash.addEventListener("click", (e) => {
    console.log("tachito")
    sessionStorage.removeItem("peliculasFavoritas");

    container.style.display = "none"

    const cartel = document.createElement("div")
  cartel.style.background = "skyblue"
  cartel.style.border = "solid grey 1px"
  cartel.style.padding = "10px"
  cartel.style.margin = "auto"
  cartel.style.textAlign = "center"

  app.appendChild(cartel)

  const mensaje = document.createElement("h2");
  mensaje.textContent = "Aún no agregaste peliculas a tu sección favoritos" 

  cartel.appendChild(mensaje)

  })

  

  // Aqui debemos agregar nuestro fetch
  const pelisInfoJSON = sessionStorage.getItem("peliculasFavoritas");
  console.log("Que llega y en que formato: ", pelisInfoJSON);

  if (pelisInfoJSON) {
    const pelisInfo = JSON.parse(pelisInfoJSON);

    console.log("hay dataaaaaa", pelisInfoJSON)
    console.log("parseeeeee", pelisInfo[0])



  for (i = 0; i < pelisInfo.length; i++) {

    fetch(`http://localhost:3031/api/movies/${pelisInfo[i]}`)
  .then(function(response){
      return response.json()
  })
  .then((peliculas)=>{

console.log("promesa2", peliculas.data)

  /** Codigo que debemos usar para mostrar los datos en el frontend **/
     let movie = peliculas.data;

    // data.forEach((movie) => {
      const card = document.createElement("div");
      card.setAttribute("class", "card");

      const h1 = document.createElement("h1");
      h1.textContent = movie.title;

      const p = document.createElement("p");
      p.textContent = `Rating: ${movie.rating}`;

      const duracion = document.createElement("p");
      duracion.textContent = `Duración: ${movie.length}`;

      container.appendChild(card);
      card.appendChild(h1);
      card.appendChild(p);
      if (movie.genre !== null) {
        const genero = document.createElement("p");
        genero.textContent = `Genero: ${movie.genre.name}`;
        card.appendChild(genero);
      }
      card.appendChild(duracion);
    });

  }

  
  // })

} else {
  console.log("no tenes pelis favoritas")
  
}


};
