async function fetchMovies() {
  let pelis = [];
  try {
    const response = await fetch(
      "https://japceibal.github.io/japflix_api/movies-data.json"
    );
    if (!response.ok) {
      throw new Error("Error al cargar las peliculas.");
    }
    pelis = await response.json();
  } catch (error) {
    alert(error.message);
  }
  return pelis;
}

async function buscarPelis(busqueda) {
  let pelis = await fetchMovies();
  let pelisBuscadas = pelis.filter(
    (peli) =>
      peli.title.toLowerCase().includes(busqueda.toLowerCase()) ||
      peli.tagline.toLowerCase().includes(busqueda.toLowerCase()) ||
      peli.overview.toLowerCase().includes(busqueda.toLowerCase()) ||
      peli.genres.includes(busqueda.toLowerCase())
  );
  return pelisBuscadas;
}

function mostrarPelis(pelis, contenedor) {
  contenedor.innerHTML = "";
  pelis.forEach((peli) => {
    let score = Math.round(peli.vote_average * 0.5);
    let anio = peli.release_date.split("-")[0];
    let generos = "";
    peli.genres.forEach((genero) => {
      generos += genero.name + " - ";
    });
    generos = generos.slice(0, -2);
    contenedor.innerHTML += `<li
            class="accordion-item list-group-item p-0 m-0"
            style="background-color: transparent;  border-color: grey;"
          >
            <div class="accordion-header bg-dark p-0 m-0" >
              <button
                class="accordion-button collapsed row m-0"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapse${peli.id}"
                aria-expanded="false"
                aria-controls="collapse${peli.id}"
                style = "background-color: #101010;"
              >
                <div class="col">
                  <h3 class="text-danger">${peli.title}</h3>
                  <p class = "text-white">${peli.tagline}</p>
                </div>
                <div class="col text-end"><p><span class="fa fa-star ${
                  score >= 1 ? `checked` : ``
                }"></span
                  ><span class="fa fa-star ${
                    score >= 2 ? `checked` : ``
                  }"></span
                  ><span class="fa fa-star ${
                    score >= 3 ? `checked` : ``
                  }"></span
                  ><span class="fa fa-star ${
                    score >= 4 ? `checked` : ``
                  }"></span
                  ><span class="fa fa-star ${
                    score >= 5 ? `checked` : ``
                  }"></span></p></div>
              </button>
            </div>
            <div
              id="collapse${peli.id}"
              class="accordion-collapse collapse"
              data-bs-parent="#lista"
            >
              <div class="accordion-body">
                <p class="text-white">${peli.overview}</p>
                <p class="text-secondary">${anio} - ${peli.runtime} min.</p>
                <hr class="text-white">
                <div class="row">
                    <p class="text-muted col">${generos}</p>
                    <div class="dropdown col text-end">
                        <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Ver más...
                        </button>
                        <ul class="dropdown-menu text-center p-3 text-white bg-dark border-light">
                            <li>Budget: $${Intl.NumberFormat("en-US").format(
                              peli.budget
                            )}</li>
                            <li><hr></li>
                            <li>Revenue: $${Intl.NumberFormat("en-US").format(
                              peli.revenue
                            )}</li>
                        </ul>
                    </div>
                </div>
              </div>
            </div>
          </li>`;
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.querySelector("#lista");
  const txbBusqueda = document.querySelector("#inputBuscar");
  const btnBuscar = document.querySelector("#btnBuscar");

  btnBuscar.addEventListener("click", () => {
    buscarPelis(txbBusqueda.value).then((pelis) => {
      mostrarPelis(pelis, contenedor);
    });
  });
});
