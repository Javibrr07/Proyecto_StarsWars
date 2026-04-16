//header

//titulos del header

let TituloSeccion1 = document.getElementById("Hangar");

let TituloSeccion2 = document.getElementById("Pilotos");

let TituloSeccion3 = document.getElementById("Misiones");

let TituloSeccion4 = document.getElementById("Alianza");

//clases del div del cuerpo

let seccion1 = document.getElementById("seccion1");

let seccion2 = document.getElementById("seccion2");

let seccion3 = document.getElementById("seccion3");

let seccion4 = document.getElementById("seccion4");



//funciones para que solo se muestre la seccion elegida elegida

TituloSeccion1.addEventListener("click",function(){

//secciones/contenidos
seccion1.className="hangarNaves";

seccion2.className="oculto";

seccion3.className="oculto";

seccion3.className="oculto";

//titulos
TituloSeccion1.className="tituloDestacado";//tituloDestacado

TituloSeccion2.className="titulo";

TituloSeccion3.className="titulo";

TituloSeccion4.className="titulo";

})



TituloSeccion2.addEventListener("click",function(){

seccion1.className="hangarNaves";

seccion2.className="oculto";

seccion3.className="oculto";

seccion3.className="oculto";

//titulos
TituloSeccion1.className="titulo";

TituloSeccion2.className="tituloDestacado";

TituloSeccion3.className="titulo";

TituloSeccion4.className="titulo";

})



TituloSeccion3.addEventListener("click",function(){

seccion1.className="hangarNaves";

seccion2.className="oculto";

seccion3.className="oculto";

seccion3.className="oculto";

//titulos
TituloSeccion1.className="titulo";

TituloSeccion2.className="titulo";

TituloSeccion3.className="tituloDestacado";

TituloSeccion4.className="titulo";

})



TituloSeccion4.addEventListener("click",function(){

seccion1.className="hangarNaves";

seccion2.className="oculto";

seccion3.className="oculto";

seccion3.className="oculto";

//titulos
TituloSeccion1.className="titulo";

TituloSeccion2.className="titulo";

TituloSeccion3.className="titulo";

TituloSeccion4.className="tituloDestacado";

})


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










