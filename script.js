let indiceFoto = 0;
let intervaloCarrusel; // Variable para controlar el tiempo
// --- 1. Definición del Array (Requisito: Estructura de datos) ---
// Este array contiene los nombres de las secciones de tu web
const secciones = ["Inicio", "Quién soy", "Estudios", "Lenguajes", "Contacto"];

// --- 2. Selección de elementos del DOM ---
// Buscamos el menú en el HTML para poder meterle los botones
const menuNav = document.getElementById('menu');
const contenedorPrincipal = document.getElementById('corazon');

// --- 3. Bucle FOR para crear el menú (Requisito: Uso de FOR) ---
// Recorremos el array para generar un botón por cada sección
for (let i = 0; i < secciones.length; i++) {
    // Creamos un elemento botón
    let boton = document.createElement('button');
    
    // Le ponemos el nombre que sacamos del array
    boton.innerText = secciones[i];
    
    // Le asignamos una función para cuando hagan click
    boton.onclick = function() {
        cambiarSeccion(secciones[i]);
    };
    
    // Lo agregamos al nav de nuestro HTML
    menuNav.appendChild(boton);
}

// --- 4. Función para cambiar el contenido (Requisito: SWITCH e IF) ---
function cambiarSeccion(nombre) {
while (contenedorPrincipal.firstChild) {
        contenedorPrincipal.removeChild(contenedorPrincipal.firstChild);
    }
    if (nombre !== "Inicio") {
    clearInterval(intervaloCarrusel);
}
   let contenido = ""; 
   // Usamos SWITCH para decidir qué mostrar según el nombre recibido
    switch (nombre) {
case "Inicio":
    let fotos = ["foto1.jpg", "foto2.jpg", "foto3.webp"];
    
    // Función para actualizar la imagen (la misma que ya tenías)
    const mostrarFoto = () => {
        const divCarrusel = document.getElementById("carrusel-dinamico");
        if (divCarrusel) {
            divCarrusel.innerHTML = `<img src="${fotos[indiceFoto]}" class="foto-estilizada">`;
        }
    };

    // Quitamos el h2 y ponemos tu frase nueva
    contenido = `
        <p>Algunas fotos relacionadas a la programación y ciberseguridad:</p>
        <div id="carrusel-dinamico"></div>
        <p style="margin-top: 15px;"></p>
    `;

    // Lógica del tiempo (5 segundos)
    clearInterval(intervaloCarrusel);
    intervaloCarrusel = setInterval(() => {
        indiceFoto = (indiceFoto + 1) % fotos.length;
        mostrarFoto();
    }, 5000);

    setTimeout(mostrarFoto, 10);
    break;

    // Limpiamos cualquier intervalo previo para que no se aceleren las fotos
    clearInterval(intervaloCarrusel);

    // Iniciamos el movimiento cada 5000ms (5 segundos)
    intervaloCarrusel = setInterval(() => {
        indiceFoto = (indiceFoto + 1) % fotos.length; // Pasa a la siguiente o vuelve a la primera
        mostrarFoto();
    }, 5000);

    // Pequeño truco: esperamos un milisegundo a que se cree el HTML para mostrar la primera foto
    setTimeout(mostrarFoto, 10);
    break;

        case "Quién soy":
            // Aquí cargamos tu info personal
            contenido = `
                <h2>¿Quién soy?</h2>
                <p>¡Hola! Mi nombre es <strong>Ana Paula</strong>, soy estudiante de la carrera de desarrollo de software en ISFT nº220 y estoy cursando 2do año.</p>
            `;
            break;

        case "Estudios":
            contenido = `
                <h2>Estudios</h2>
                <ul>
                    <li>ISFT nº220 - Tecnicatura en Desarrollo de Software (Desde 2024)</li>
                </ul>
            `;
            break;

        case "Lenguajes":
            // Usamos un IF para mostrar un mensaje especial (Requisito: IF)
            let nivel = "Principiante";
            contenido = `<h2>Lenguajes</h2>`;
            
            if (nivel === "Principiante") {
                contenido += `<p>Actualmente me encuentro reforzando mis bases en:</p>`;
            }

            contenido += `
                <p>Python: <progress value="30" max="100"></progress></p>
                <p>JavaScript: <progress value="40" max="100"></progress></p>
            `;
            break;

case "Contacto":
    contenido = `
        <h2>Contacto</h2>
        <form action="https://formsubmit.co/apquirogarcia@gmail.com" method="POST">
            <input type="text" name="nombre" placeholder="Tu nombre" required>
            <input type="text" name="asunto" placeholder="Asunto" required>
            <textarea name="mensaje" placeholder="Escribe tu mensaje aquí..." rows="4" required></textarea>
            <button type="submit">Enviar</button>
            <input type="hidden" name="_captcha" value="false">
        </form>
    `;
    break;

        default:
            contenido = "<h2>Error</h2><p>Sección no encontrada.</p>";
    }

    // Inyectamos el contenido generado en el contenedor principal
    contenedorPrincipal.innerHTML = contenido;
}

// Llamamos a la función una vez al principio para que la página no abra vacía
cambiarSeccion("Inicio");