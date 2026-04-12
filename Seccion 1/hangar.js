const naves = [
    {
        nombre: "X-Wing",
        tipo: "Caza",
        emoji: "🚀",
        velocidad: 105,
        tripulacion: 1,
        estado: "operativa",
    },
    {
        nombre: "Millennium Falcon",
        tipo: "Transporte",
        emoji: "🛸",
        velocidad: 120,
        tripulacion: 6,
        estado: "operativa",
    },
    {
        nombre: "Y-Wing",
        tipo: "Bombardero",
        emoji: "💣",
        velocidad: 85,
        tripulacion: 2,
        estado: "en reparación",
    },
    {
        nombre: "A-Wing",
        tipo: "Caza",
        emoji: "🚀",
        velocidad: 130,
        tripulacion: 1,
        estado: "operativa",
    },
    {
        nombre: "Nebulon-B",
        tipo: "Fragata",
        emoji: "🚢",
        velocidad: 70,
        tripulacion: 850,
        estado: "destruida",
    }
];

let ordenAscendente = true;

const buscador = document.getElementById("buscador");
const filtroTipo = document.getElementById("filtroTipo");
const ordenarBtn = document.getElementById("ordenarBtn");
const contador = document.getElementById("contador");
const hangar = document.getElementById("hangar");

//mostrar las naves en la pagina
   function mostrarNaves(lista) {
    hangar.innerHTML = "";

    for (let i = 0; i < lista.length; i++) {
        hangar.innerHTML += `
            <div class="card">
                <h3>${lista[i].emoji} ${lista[i].nombre}</h3>
                <p>Tipo: ${lista[i].tipo}</p>
                <p>Velocidad: ${lista[i].velocidad}</p>
                <p>Tripulación: ${lista[i].tripulacion}</p>
                <p>${lista[i].estado}</p>
            </div>
        `;
    }

    contador.textContent = `Mostrando ${lista.length} naves`;
}

//bucador de naves por el nombre
buscador.addEventListener("input", () => {
    const texto = buscador.value.toLowerCase();

    const resultado = naves.filter(nave =>
        nave.nombre.toLowerCase().includes(texto)
    );

    mostrarNaves(resultado);
});
/* Recorre el array de naves y guarda solo aquellas cuyo nombre contiene
 el texto escrito en el buscador.*/

 //ordenar las naves por velocidad
 ordenarBtn.addEventListener("click", () => {
    if (ordenAscendente) {
        naves.sort((a, b) => a.velocidad - b.velocidad);
        ordenarBtn.textContent = "Ordenar por velocidad ↑";

    } else {
        naves.sort((a, b) => b.velocidad - a.velocidad);
        ordenarBtn.textContent = "Ordenar por velocidad ↓";

    }

    ordenAscendente = !ordenAscendente;

    mostrarNaves(naves);
});

// Al pulsar el botón cambia entre orden ascendente y descendente y vuelve a mostrar las naves ordenadas

//tipos de naves que hay 
function cargarTipos() {
    let tipos = [];

    for (let i = 0; i < naves.length; i++) {
        if (!tipos.includes(naves[i].tipo)) { //por si hay repetidos
            tipos.push(naves[i].tipo);
        }
    }

    for (let i = 0; i < tipos.length; i++) {
        const option = document.createElement("option");
        option.value = tipos[i];
        option.textContent = tipos[i];
        filtroTipo.appendChild(option);
    }
}

//filtrar por el tipo de nave
function filtrarPorTipo() {
    const tipo = filtroTipo.value.toLowerCase();

    let resultado = naves;

    if (tipo !== "todos") {
        resultado = naves.filter(nave =>
            nave.tipo.toLowerCase() === tipo
        );
    }

    mostrarNaves(resultado);
}
filtroTipo.addEventListener("change", filtrarPorTipo);

//contador dinamico de cuantas naves hay
contador.textContent = `Mostrando ${naves.length} naves`;

cargarTipos();
mostrarNaves(naves);