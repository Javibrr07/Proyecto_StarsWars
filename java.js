// Títulos del header
let t1 = document.getElementById("Hangar");
let t2 = document.getElementById("Pilotos");
let t3 = document.getElementById("Misiones");
let t4 = document.getElementById("Alianza");

// Secciones del cuerpo
let s1 = document.getElementById("seccion1");
let s2 = document.getElementById("seccion2");
let s3 = document.getElementById("seccion3");
let s4 = document.getElementById("seccion4");

function ocultarTodo() {
    s1.classList.add("oculto");
    s2.classList.add("oculto");
    s3.classList.add("oculto");
    s4.classList.add("oculto");

    t1.classList.remove("tituloDestacado");
    t2.classList.remove("tituloDestacado");
    t3.classList.remove("tituloDestacado");
    t4.classList.remove("tituloDestacado");
}

t1.addEventListener("click", function() {
    ocultarTodo();
    s1.classList.remove("oculto");
    t1.classList.add("tituloDestacado");
});

t2.addEventListener("click", function() {
    ocultarTodo();
    s2.classList.remove("oculto");
    t2.classList.add("tituloDestacado");
});

t3.addEventListener("click", function() {
    ocultarTodo();
    s3.classList.remove("oculto");
    t3.classList.add("tituloDestacado");
});

t4.addEventListener("click", function() {
    ocultarTodo();
    s4.classList.remove("oculto");
    t4.classList.add("tituloDestacado");
    actualizarDashboard(); // AÑADIDO: Ahora se actualiza al entrar a la sección
});

/* SECCIÓN 1: HANGAR DE NAVES
*/

const naves = [
    { nombre: "X-Wing", tipo: "Caza", velocidad: 105, tripulacion: 1, estado: "operativa",img:"Xwing-ROOCE.webp" },
    { nombre: "Millennium Falcon", tipo: "Transporte", velocidad: 120, tripulacion: 6, estado: "operativa",img:"Millennium_Falcon_Fathead_TROS.webp" },
    { nombre: "Y-Wing", tipo: "Bombardero",velocidad: 85, tripulacion: 2, estado: "en reparación",img:"YWing-JtRSaV.webp" },
    { nombre: "A-Wing", tipo: "Caza", velocidad: 130, tripulacion: 1, estado: "operativa",img:"A-wing_DICE.webp" },
    { nombre: "Nebulon-B", tipo: "Fragata", velocidad: 70, tripulacion: 850, estado: "destruida",img:"MedicalFrigate-BaseSeries4.webp" }
];

let ordenAscendente = true;

const buscador = document.getElementById("buscador");
const filtroTipo = document.getElementById("filtroTipo");
const ordenarBtn = document.getElementById("ordenarBtn");
const contador = document.getElementById("contador");
const hangar = document.getElementById("hangar");

function mostrarNaves(lista) {
    hangar.innerHTML = "";
    for (let i = 0; i < lista.length; i++) {
        hangar.innerHTML += `
            <div class="card">
                <img src="${lista[i].img}" class="imgNave">
                <h3>${lista[i].nombre}</h3>
                <p>Tipo: ${lista[i].tipo}</p>
                <p>Velocidad: ${lista[i].velocidad}</p>
                <p>Tripulación: ${lista[i].tripulacion}</p>
                <p>${lista[i].estado}</p>
            </div>
        `;
    }
    contador.textContent = `Mostrando ${lista.length} naves`;
}

buscador.addEventListener("input", () => {
    const texto = buscador.value.toLowerCase();
    const resultado = naves.filter(nave => nave.nombre.toLowerCase().includes(texto));
    mostrarNaves(resultado);
});

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

function cargarTipos() {
    let tipos = [];
    for (let i = 0; i < naves.length; i++) {
        if (!tipos.includes(naves[i].tipo)) { 
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

function filtrarPorTipo() {
    const tipo = filtroTipo.value.toLowerCase();
    let resultado = naves;
    if (tipo !== "todos") {
        resultado = naves.filter(nave => nave.tipo.toLowerCase() === tipo);
    }
    mostrarNaves(resultado);
}

filtroTipo.addEventListener("change", filtrarPorTipo);

/*
 SECCIÓN 2: REGISTRO DE PILOTOS
*/
const listaNaves = ["X-Wing", "Y-Wing", "A-Wing", "Halcón Milenario", "Caza"];

function cargarNaves(){
    const select = document.getElementById("selectNave");
    for(let i = 0; i < listaNaves.length; i++){
        let opcion = document.createElement("option");
        opcion.textContent = listaNaves[i];
        opcion.value = listaNaves[i];
        select.appendChild(opcion);
    }
}

let listaPilotos = [];
let btnGuardarPiloto = document.getElementById("guardarPiloto");
let indiceEditando = -1;

function pintarPilotos() {
    const tbody = document.getElementById("cuerpoTablaPilotos");
    tbody.innerHTML = "";
    for(let i = 0; i < listaPilotos.length; i++){
        let piloto = listaPilotos[i];
        let fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${piloto.nombre}</td>
            <td>${piloto.rango}</td>
            <td>${piloto.victorias}</td>
            <td>${piloto.nave}</td>
            <td>${piloto.estado}</td>
            <td>
                <button class="btn-accion" onclick="editarPiloto(${i})">editar</button>
                <button class="btn-accion" onclick="borrarPiloto(${i})">borrar</button>
            </td>
        `;
        tbody.appendChild(fila);
    }
}

function borrarPiloto(i){
    let confirmar = confirm("¿Eliminar piloto?");
    if(confirmar){
        listaPilotos.splice(i,1);
        localStorage.setItem("pilotos", JSON.stringify(listaPilotos));
        pintarPilotos();
    }
}

function editarPiloto(i){
    let piloto = listaPilotos[i];
    document.getElementById("inputNombre").value = piloto.nombre;
    document.getElementById("inputRango").value = piloto.rango;
    document.getElementById("inputVictorias").value = piloto.victorias;
    document.getElementById("selectNave").value = piloto.nave;
    document.getElementById("selectEstado").value = piloto.estado;
    indiceEditando = i; 
    btnGuardarPiloto.textContent = "Actualizar piloto";
}

btnGuardarPiloto.addEventListener("click", function(event){
    event.preventDefault();
    let nombre = document.getElementById("inputNombre").value;
    let rango = document.getElementById("inputRango").value;
    let victorias = parseInt(document.getElementById("inputVictorias").value);
    let nave = document.getElementById("selectNave").value;
    let estado = document.getElementById("selectEstado").value;

    if(nombre === "" || rango === "" || isNaN(victorias) || victorias < 0 || nave === "" || estado === "") {
        alert("Error: Por favor, rellena todos los campos correctamente. Las victorias deben ser positivas.");
        return; 
    }
   
    const piloto = { nombre: nombre, rango: rango, victorias: victorias, nave: nave, estado: estado };

    if (indiceEditando === -1) {
        listaPilotos.push(piloto); 
    } else {
        listaPilotos[indiceEditando] = piloto; 
        indiceEditando = -1; 
        btnGuardarPiloto.textContent = "Guardar piloto";
    }

    localStorage.setItem("pilotos", JSON.stringify(listaPilotos));
    pintarPilotos();
    
    // Limpiar formulario tras guardar
    document.getElementById("formularioPilotos").reset();
});

function cargarPilotosDesdeLocalStorage(){
    let datosGuardados = localStorage.getItem("pilotos");
    if(datosGuardados){
        listaPilotos = JSON.parse(datosGuardados);
        pintarPilotos();
    }
}

/* SECCIÓN 3: PANEL DE MISIONES
*/
let listaMisiones = JSON.parse(localStorage.getItem("misiones")) || [];

const addBtn = document.getElementById("addMisionBtn");
const filtroDificultad = document.getElementById("filtroDificultad");

const inputNombreMision = document.getElementById("nombreMision");
const inputDescripcion = document.getElementById("descMision");
const selectPiloto = document.getElementById("selectPilotoMision");
const selectDificultad = document.getElementById("selectDificultadMision");

const colPendiente = document.getElementById("lista-pendiente");
const colCurso = document.getElementById("lista-curso");
const colCompletada = document.getElementById("lista-completada");

const contPendiente = document.getElementById("count-pendiente");
const contCurso = document.getElementById("count-curso");
const contCompletada = document.getElementById("count-completada");

function cargarPilotos() {
    selectPiloto.innerHTML = `<option value="">Selecciona piloto</option>`;
    for (let i = 0; i < listaPilotos.length; i++) {
        if (listaPilotos[i].estado !== "KIA") {
            let opt = document.createElement("option");
            opt.value = listaPilotos[i].nombre;
            opt.textContent = listaPilotos[i].nombre;
            selectPiloto.appendChild(opt);
        }
    }
}

addBtn.addEventListener("click", function () {
    let mision = {
        nombre: inputNombreMision.value.trim(),
        descripcion: inputDescripcion.value.trim(),
        piloto: selectPiloto.value,
        dificultad: selectDificultad.value,
        estado: "pendiente",
        fecha: new Date().toLocaleDateString()
    };

    if (mision.nombre === "" || mision.descripcion === "" || mision.piloto === "") {
        alert("Rellena todo");
        return;
    }

    listaMisiones.push(mision);
    guardarMisiones();
    pintarMisiones();

    inputNombreMision.value = "";
    inputDescripcion.value = "";
});

function moverMision(index) {
    if (listaMisiones[index].estado === "pendiente") {
        listaMisiones[index].estado = "curso";
    }
    else if (listaMisiones[index].estado === "curso") {
        listaMisiones[index].estado = "completada";
    }
    guardarMisiones();
    pintarMisiones();
}

function eliminarMision(index) {
    listaMisiones.splice(index, 1);
    guardarMisiones();
    pintarMisiones();
}

function pintarMisiones() {
    colPendiente.innerHTML = "";
    colCurso.innerHTML = "";
    colCompletada.innerHTML = "";

    let pendientes = 0;
    let curso = 0;
    let completadas = 0;

    let filtro = filtroDificultad.value.toLowerCase();

    for (let i = 0; i < listaMisiones.length; i++) {
        let mision = listaMisiones[i];
        let dificultad = mision.dificultad.toLowerCase();

        if (filtro !== "todos" && dificultad !== filtro) continue;

        let card = `
            <div class="mision-card">
                <h3>${mision.nombre}</h3>
                <p>${mision.descripcion}</p>
                <p>Piloto: ${mision.piloto}</p>
                <p>Dificultad: ${mision.dificultad}</p>
                <p>${mision.fecha}</p>
                <button class="btn-mover" onclick="moverMision(${i})">Mover</button>
                <button onclick="eliminarMision(${i})">Eliminar</button>
            </div>
        `;

        if (mision.estado === "pendiente") {
            colPendiente.innerHTML += card;
            pendientes++;
        }
        else if (mision.estado === "curso") {
            colCurso.innerHTML += card;
            curso++;
        }
        else if (mision.estado === "completada") {
            colCompletada.innerHTML += card;
            completadas++;
        }
    }

    contPendiente.textContent = pendientes;
    contCurso.textContent = curso;
    contCompletada.textContent = completadas;

    guardarMisiones();
    
}

filtroDificultad.addEventListener("change", pintarMisiones);

function guardarMisiones() {
    localStorage.setItem("misiones", JSON.stringify(listaMisiones));
}

/* =========================================================================
   4. INICIALIZACIÓN (Lo que ocurre al abrir la página)
   ========================================================================= */
function iniciarAplicacion() {
    // 1. Mostrar la sección 2 por defecto al abrir el navegador
    ocultarTodo();
    s4.classList.remove("oculto");
    t4.classList.add("tituloDestacado");

    // 2. Cargar todos los datos dinámicos
    cargarTipos();
    mostrarNaves(naves);
    cargarNaves();
    cargarPilotosDesdeLocalStorage();
    cargarPilotos();
    pintarMisiones();
    actualizarDashboard(); // AÑADIDO: para que cargue los datos si empieza en la sección 4
}

iniciarAplicacion();

function actualizarDashboard() {
    // ======================
    // PILOTOS
    // ======================
    let activos = 0;
    let heridos = 0;
    let kia = 0;

    for (let i = 0; i < listaPilotos.length; i++) {
        if (listaPilotos[i].estado === "Activo") activos++;
        else if (listaPilotos[i].estado === "Herido") heridos++;
        else if (listaPilotos[i].estado === "KIA") kia++;
    }

    document.getElementById("activos").textContent = activos;
    document.getElementById("heridos").textContent = heridos;
    document.getElementById("KIA").textContent = kia;

    // ======================
    // NAVES
    // ======================
    let operativas = 0;
    let reparacion = 0;
    let destruidas = 0;

    for (let i = 0; i < naves.length; i++) {
        if (naves[i].estado === "operativa") operativas++;
        else if (naves[i].estado === "en reparación") reparacion++;
        else if (naves[i].estado === "destruida") destruidas++;
    }

    document.getElementById("Operativas").textContent = operativas;
    document.getElementById("reparacion").textContent = reparacion;
    document.getElementById("destruidas").textContent = destruidas;
    
    // ======================
    // MISIONES
    // ======================
    let pendientes = 0;
    let enCurso = 0;
    let completadas = 0;

    for (let i = 0; i < listaMisiones.length; i++) {
        if (listaMisiones[i].estado === "pendiente") pendientes++;
        else if (listaMisiones[i].estado === "curso") enCurso++;
        else if (listaMisiones[i].estado === "completada") completadas++;
    }

    document.getElementById("pendientes").textContent = pendientes;
    document.getElementById("EnCurso").textContent = enCurso;
    document.getElementById("completadas").textContent = completadas;

    // ======================
    // MEJOR PILOTO 
    // ======================
    let mejor = null;

    for (let i = 0; i < listaPilotos.length; i++) {
        if (mejor === null || listaPilotos[i].victorias > mejor.victorias) {
            mejor = listaPilotos[i];
        }
    }

    if (mejor !== null) {
        document.getElementById("pilotoTop").textContent = mejor.nombre + " (" + mejor.victorias + ")";
    } else {
        document.getElementById("pilotoTop").textContent = "Sin pilotos";
    }

    // ======================
    // NAVE MÁS RÁPIDA
    // ======================
    if (naves.length > 0) {
        let rapida = naves[0];
        for (let i = 1; i < naves.length; i++) {
            if (naves[i].velocidad > rapida.velocidad) {
                rapida = naves[i];
            }
        }
        document.getElementById("naveTop").textContent = rapida.nombre + " (" + rapida.velocidad + ")";
    }

    // ======================
    // BARRA DE PROGRESO
    // ======================
    let total = listaMisiones.length;
    let porcentaje = 0;

    if (total > 0) {
        porcentaje = (completadas / total) * 100;
    }

    document.getElementById("barraProgreso").style.width = porcentaje + "%";
    document.getElementById("textoProgreso").textContent = Math.floor(porcentaje) + "% completado";
}