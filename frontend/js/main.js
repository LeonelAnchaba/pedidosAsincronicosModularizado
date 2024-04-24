window.onload = () => {
  const app = document.getElementById("root");
  const container = document.createElement("div");
  container.setAttribute("class", "container");
  app.appendChild(container);


  const enlaceAFavoritas = document.querySelector(".buttonFavorites")

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
      card.style.textAlign = "center"

      const star = document.createElement("i");
      star.setAttribute("class", "fa-regular fa-star")
      star.style.position = "absolute"
      star.style.top = "10px"
      star.style.right = "10px"
      star.setAttribute("id", `${movie.id}`)

      const a = document.createElement("a");
      
      a.setAttribute("class", "accesoAlDetalle")
      a.setAttribute("id", `${movie.id}`)
      a.textContent = "Detalle"
      a.style.background = "skyblue"
      a.style.padding = "5px 10.5rem"
      

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


    }
  
  );


    const buttonDetalle = document.querySelectorAll(".accesoAlDetalle")

    buttonDetalle.forEach(button => {
      
    button.addEventListener("click", function(e){
      e.preventDefault();
  
  
      console.log("doy con el id?", button.id)
      fetch(`http://localhost:3031/api/movies/${button.id}`)
      .then(function(response){
          return response.json()
      })
      .then((peliculas)=>{
        let data = peliculas.data;
        console.log("Que es data.title", data.title)
        console.log("Y que hay en data?: ", data)
        console.log("doy con el id?", button.id)
        window.location.href = window.location.href.replace("home.html", `formulario.html?id=${button.id}`)
        

        
       })


  })
})

const buttonFavorites = document.querySelectorAll("i")

buttonFavorites.forEach(star => {
  star.addEventListener("click", function(e) {
    enlaceAFavoritas.style.display = "inline"
    star.style.color = "white"
    console.log("estrellita dime tu:", star.id)

    const agregarLaPeli = star.id
    

    let peliculasFavoritas = JSON.parse(sessionStorage.getItem("peliculasFavoritas")) || []

    console.log(sessionStorage)

    peliculasFavoritas.push(agregarLaPeli)

    sessionStorage.setItem("peliculasFavoritas", JSON.stringify(peliculasFavoritas))

    console.log("info del producto en sessionStorage", peliculasFavoritas)
  })
})
  
})



 
const pelisInfoJSON = sessionStorage.getItem("peliculasFavoritas");
console.log("Que llega y en que formato: ", pelisInfoJSON);

if (!pelisInfoJSON) {
  enlaceAFavoritas.style.display = "none"
};
  
};

