
//Titulos del header
let t1 = document.getElementById("Hangar");
let t2 = document.getElementById("Pilotos");
let t3 = document.getElementById("Misiones");
let t4 = document.getElementById("Alianza");

//Secciones del cuerpo
let s1 = document.getElementById("seccion1");
let s2 = document.getElementById("seccion2");
let s3 = document.getElementById("seccion3");
let s4 = document.getElementById("seccion4");

function ocultarTodo() {
    // Ocultamos todas las secciones
    s1.classList.add("oculto");
    s2.classList.add("oculto");
    s3.classList.add("oculto");
    s4.classList.add("oculto");

    // Quitamos el color rojo a todos los títulos
    t1.classList.remove("tituloDestacado");
    t2.classList.remove("tituloDestacado");
    t3.classList.remove("tituloDestacado");
    t4.classList.remove("tituloDestacado");
}

// Funciones para cada titulo
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
});
















//seccion1

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






























//seccion 2


const listaNaves = ["X-Wing", "Y-Wing", "A-Wing", "Halcón Milenario", "Caza"];//crear un array de naves para la seccion de nave asignada y asignarlo

function cargarNaves(){

    const select = document.getElementById("selectNave");

    for(let i = 0; i<listaNaves.length; i++){
    
        let opcion = document.createElement("option");

        opcion.textContent = listaNaves[i];

        opcion.value = listaNaves[i];

        select.appendChild(opcion);
    }
}

cargarNaves();//ejecutamos la funcion,así,al cargar la pagina,apareceran las naves en el el select de nave asignada








let listaPilotos = [];//esta vacio pues no hay ningun piloto hasta que se añada uno

let btnGuardarPiloto = document.getElementById("guardarPiloto");

let indiceEditando = -1;// -1 significa "Creando nuevo piloto". Otro número significa "Editando".






function pintarPilotos() {//funcion para añadir los pilotos a la tabla

    const tbody = document.getElementById("cuerpoTablaPilotos");

     tbody.innerHTML = "";//al limpiar la tabla,se imprimira toda la lista

      for(let i = 0; i < listaPilotos.length; i++){

          let piloto = listaPilotos[i];
          let fila = document.createElement("tr");//creamos fila
  
          //creamos cada columna con su valor(y los botones asociados)
          fila.innerHTML = `
              <td>${piloto.nombre}</td>
              <td>${piloto.rango}</td>
              <td>${piloto.victorias}</td>
              <td>${piloto.nave}</td>
              <td>${piloto.estado}</td>
              <td>
                  <button class="btn-accion"  onclick="editarPiloto(${i})" >editar</button>
                  <button class="btn-accion"  onclick="borrarPiloto(${i})" >borrar</button>
              </td>
          `;
  
          tbody.appendChild(fila);//lo añadimos al body de la tabla

      }
    
}





function borrarPiloto(i){//funcion para borrar piloto

    let confirmar = confirm("¿Eliminar piloto?");

    if(confirmar){
        listaPilotos.splice(i,1);//borrar del array
        localStorage.setItem("pilotos", JSON.stringify(listaPilotos));//borrar del local storage(si no, no sirve de nada borrar del array)
        pintarPilotos();//pintar la nueva lista con un piloto menos
    }
}


function editarPiloto(i){//funcion para editar el piloto

    let piloto = listaPilotos[i];

    document.getElementById("inputNombre").value = piloto.nombre;
    document.getElementById("inputRango").value = piloto.rango;
    document.getElementById("inputVictorias").value = piloto.victorias;
    document.getElementById("selectNave").value = piloto.nave;
    document.getElementById("selectEstado").value = piloto.estado;

    indiceEditando = i; // se actualiza,por lo que ya no es -1

    btnGuardarPiloto.textContent = "Actualizar piloto";
}





btnGuardarPiloto.addEventListener("click",function(event){//funcion para guardar un piloto en el array de pilotos

    event.preventDefault();//Esto evita que la página se recargue y se pierdan los datos

    let nombre = document.getElementById("inputNombre").value;
    let rango = document.getElementById("inputRango").value;
    let victorias = parseInt(document.getElementById("inputVictorias").value);
    let nave = document.getElementById("selectNave").value;
    let estado = document.getElementById("selectEstado").value;

    if(nombre === "" || rango === "" || isNaN(victorias) || victorias < 0 || nave === "" || estado === "") {
        alert("Error: Por favor, rellena todos los campos correctamente. Las victorias deben ser positivas.");
        return; // Detiene la ejecución si hay error
    }
   
    const piloto = {//este es el piloto
        nombre: nombre,
        rango: rango,
        victorias: victorias,
        nave: nave,
        estado: estado
    };


    if (indiceEditando === -1) {
        listaPilotos.push(piloto); // Creamos y añadimos
    } else {
        listaPilotos[indiceEditando] = piloto; // editamos
        indiceEditando = -1; // Reiniciamos el estado
        btnGuardarPiloto.textContent = "Guardar piloto";
    }

    localStorage.setItem("pilotos", JSON.stringify(listaPilotos));//guardamos en local storage
    
    pintarPilotos();//al llamar a pintarPilotos,se añade a la tabla
})


function cargarPilotosDesdeLocalStorage(){//esto sirve para persistir los pilotos en la local storage
    let datosGuardados = localStorage.getItem("pilotos");

    if(datosGuardados){
        listaPilotos = JSON.parse(datosGuardados);
        pintarPilotos();
    }
}

cargarPilotosDesdeLocalStorage();




















//seccion 3


let listaMisiones = JSON.parse(localStorage.getItem("misiones")) || [];

// elementos
const addBtn = document.getElementById("addBtn");
const filtroDificultad = document.getElementById("filtroDificultad");

const inputNombreMision = document.getElementById("nombre");
const inputDescripcion = document.getElementById("descripcion");
const selectPiloto = document.getElementById("piloto");
const selectDificultad = document.getElementById("dificultad");

// columnas
const colPendiente = document.getElementById("pendiente");
const colCurso = document.getElementById("curso");
const colCompletada = document.getElementById("completada");

// contadores
const contPendiente = document.getElementById("Pendiente");
const contCurso = document.getElementById("Curso");
const contCompletada = document.getElementById("Completada");


// solo pilotos NO KIA
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


//CREAR MISION 

addBtn.addEventListener("click", function () {

    let mision = {
        nombre: inputNombreMision.value.trim(),
        descripcion: inputDescripcion.value.trim(),
        piloto: selectPiloto.value,
        dificultad: selectDificultad.value,
        estado: "pendiente",
        fecha: new Date().toLocaleDateString()
    };

    if (
        mision.nombre === "" ||
        mision.descripcion === "" ||
        mision.piloto === ""
    ) {
        alert("Rellena todo");
        return;
    }

    listaMisiones.push(mision);

    guardarMisiones();
    pintarMisiones();

    inputNombreMision.value = "";
    inputDescripcion.value = "";
});


//MOVER MISION 

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


//ELIMINAR MISION 

function eliminarMision(index) {
    listaMisiones.splice(index, 1);
    guardarMisiones();
    pintarMisiones();
}


//PINTAR KANBAN 

function pintarMisiones() {

    colPendiente.innerHTML = "";
    colCurso.innerHTML = "";
    colCompletada.innerHTML = "";

    let pendientes = 0;
    let curso = 0;
    let completadas = 0;

    let filtro = filtroDificultad.value;

    for (let i = 0; i < listaMisiones.length; i++) {

        let misiones = listaMisiones[i];
        let filtro = filtroDificultad.value.toLowerCase();
        let dificultad = misiones.dificultad.toLowerCase();

if (filtro !== "todos" && dificultad !== filtro) continue;

        let card = `
            <div class="card">
                <h3>${misiones.nombre}</h3>
                <p>${misiones.descripcion}</p>
                <p>Piloto: ${misiones.piloto}</p>
                <p>Dificultad: ${misiones.dificultad}</p>
                <p>${misiones.fecha}</p>

                <button onclick="moverMision(${i})">Mover</button>
                <button onclick="eliminarMision(${i})">Eliminar</button>
            </div>
        `;

        if (misiones.estado === "pendiente") {
            colPendiente.innerHTML += card;
            pendientes++;
        }
        else if (misiones.estado === "curso") {
            colCurso.innerHTML += card;
            curso++;
        }
        else if (misiones.estado === "completada") {
            colCompletada.innerHTML += card;
            completadas++;
        }
    }

    contPendiente.textContent = pendientes;
    contCurso.textContent = curso;
    contCompletada.textContent = completadas;

    guardarMisiones();
}


//FILTRO 

filtroDificultad.addEventListener("change", pintarMisiones);


//LOCALSTORAGE 

function guardarMisiones() {
    localStorage.setItem("misiones", JSON.stringify(listaMisiones));
}


cargarPilotos();
pintarMisiones();






































//seccion 4






























