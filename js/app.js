
const API_URL = "https://rickandmortyapi.com/api/location";

const mensaje = document.getElementById("mensaje");

const obtenerUbicaciones = async () => {
    try {
        const url = new URL(API_URL);

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

obtenerUbicaciones();
