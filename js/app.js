
const API_URL = "https://rickandmortyapi.com/api/location";

const mensaje = document.getElementById("mensaje");

const formulario = document.getElementById("form-busqueda");
const nombre = document.getElementById("nombre");
const tipo = document.getElementById("tipo");

const obtenerUbicaciones = async () => {
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

        console.log(datos.results);

    } catch (error) {
        mensaje.textContent = "Error al cargar las ubicaciones.";
        console.error(error);
    }
};

formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();
    obtenerUbicaciones();
});

