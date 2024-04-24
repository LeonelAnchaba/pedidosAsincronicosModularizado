window.onload = () => {
  const app = document.getElementById("root");
  const container = document.createElement("div");
  container.setAttribute("class", "container");
  app.appendChild(container);

  // Aqui debemos agregar nuestro fetch
  fetch('http://localhost:3031/api/movies')
  .then(function(response){
      return response.json()
  })
  .then((peliculas)=>{


  //  Codigo que debemos usar para mostrar los datos en el frontend
    let data = peliculas.data;

    data.forEach((movie) => {
      const card = document.createElement("div");
      card.setAttribute("class", "card");
      card.style.position = "relative";

      const star = document.createElement("i");
      star.setAttribute("class", "fa-regular fa-star")
      star.style.position = "absolute"
      star.style.top = "10px"
      star.style.right = "10px"

      const a = document.createElement("a");
      a.setAttribute("href", `formulario.html`)
      a.textContent = "Detalle"

      const h1 = document.createElement("h1");
      h1.textContent = movie.title;

      const p = document.createElement("p");
      p.textContent = `Rating: ${movie.rating}`;

      const duracion = document.createElement("p");
      duracion.textContent = `Duración: ${movie.length}`;

      container.appendChild(card);
      card.appendChild(h1);
      card.appendChild(star)
      card.appendChild(p);
      if (movie.genre !== null) {
        const genero = document.createElement("p");
        genero.textContent = `Genero: ${movie.genre.name}`;
        card.appendChild(genero);
      }
      card.appendChild(duracion);
      card.appendChild(a);
    });
  })
};
