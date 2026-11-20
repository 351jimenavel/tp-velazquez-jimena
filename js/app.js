
const API_URL = "https://rickandmortyapi.com/api/location";

const mensaje = document.getElementById("mensaje");

const formulario = document.getElementById("form-busqueda");
const nombre = document.getElementById("nombre");
const tipo = document.getElementById("tipo");
const resultados = document.getElementById("resultados");

const mostrarUbicaciones = (ubicaciones) => {
    resultados.replaceChildren();

    ubicaciones.forEach((ubicacion) => {
        const tarjeta = document.createElement("article");
        tarjeta.className = "tarjeta";

        const nombre = document.createElement("h3");
        nombre.textContent = ubicacion.name;

        const tipo = document.createElement("p");
        tipo.textContent = `Tipo: ${ubicacion.type || "Desconocido"}`;

        const dimension = document.createElement("p");
        dimension.textContent = `Dimensión: ${
            ubicacion.dimension && ubicacion.dimension !== "unknown"
                ? ubicacion.dimension
                : "Desconocido"
        }`;

        const residentes = document.createElement("p");
        residentes.textContent = `Residentes: ${ubicacion.residents.length}`;

        tarjeta.appendChild(nombre);
        tarjeta.appendChild(tipo);
        tarjeta.appendChild(dimension);
        tarjeta.appendChild(residentes);

        resultados.appendChild(tarjeta);
    });
};


const obtenerUbicaciones = async () => {
    
    resultados.replaceChildren();
    mensaje.textContent = "";

    try {
        const url = new URL(API_URL);

        if (!nombre.value.trim() && !tipo.value.trim()) {
        mensaje.textContent = "Ingresá un nombre o un tipo para buscar.";
        return;
        }

        if (nombre.value.trim()) {
        url.searchParams.set("name", nombre.value.trim());
        }

        if (tipo.value.trim()) {
            url.searchParams.set("type", tipo.value.trim());
        }

        const respuesta = await fetch(url);

        if (!respuesta.ok) {
            throw new Error(`Error HTTP: ${respuesta.status}`);
        }

        const datos = await respuesta.json();

        mostrarUbicaciones(datos.results);
        mensaje.textContent = "";

    } catch (error) {
        mensaje.textContent = "Error al cargar las ubicaciones.";
        console.error(error);
    }
};

formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();
    obtenerUbicaciones();
});

