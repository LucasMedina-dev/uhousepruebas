function agregarViviendas(ingreso){

    for (let i=0; i< ingreso.length; i++){
        let viviendas = document.createElement("div")
        viviendas.classList.add("propiedades_contenedor")
        viviendas.classList.add(`${ingreso[i].tipo}`)
        viviendas.innerHTML=`
            <label for="favorito${ingreso[i].id}" class="propiedades_label">
                <input type="checkbox" id="favorito${ingreso[i].id}" class="favorito propiedades_favorito-display">
                <span class="propiedades_favorito propiedades_favorito-false" id="${ingreso[i].tipo.charAt(0)}${ingreso[i].id}">
                <i class="fas fa-heart"></i></span>
            </label>
            <div id="${ingreso[i].tipo}${i}" class="carousel slide" data-ride="carousel">
                <div class="carousel-inner">
                    <div class="carousel-item active">
                        <img src="../images/${ingreso[i].tipo}2.jpg" class="d-block w-100">
                    </div>
                    <div class="carousel-item">
                        <img src="../images/${ingreso[i].tipo}.jpg" class="d-block w-100">
                    </div>
                </div>
                <a class="carousel-control-prev" href="#${ingreso[i].tipo}${i}" role="button" data-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="sr-only">Previous</span>
                </a>
                <a class="carousel-control-next" href="#${ingreso[i].tipo}${i}" role="button" data-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="sr-only">Next</span>
                </a>
            </div>
            <ul id="datos${ingreso[i].id}">
                <button class="propiedades_toggle"><p class="propiedades_titulo">${ingreso[i].condicion} - ${ingreso[i].ciudad}</p></button>
                <div class="propiedades_informacion">
                    <li class="propiedades_lista">U$S ${ingreso[i].precio}</li>
                    <li class="propiedades_lista">Ciudad: ${ingreso[i].ciudad}</li>
                    <li class="propiedades_lista">tipo: ${ingreso[i].tipo}</li>
                    <li class="propiedades_lista">ambientes: ${ingreso[i].ambientes}</li>
                    <li class="propiedades_lista">pisos: ${ingreso[i].pisos}</li>
                    <li class="propiedades_lista">baños: ${ingreso[i].baños}</li>
                </div>  
            </ul>`;
        propiedades.appendChild(viviendas)
    }
}
function guardarLS(clave, valor){
    localStorage.setItem(clave, valor)
}
function tomarLS(clave){
    localStorage.getItem(clave)
}
function borrarItem ( array, item ) { // Con esta funcion elijo que borrar de que array
    var i = array.indexOf( item );
    array.splice( i, 1 );
}
function borrar(ingreso){
    while (ingreso.length!=0){
        propiedades.removeChild(ingreso[0])
    }
}
function estado(label, estado){
    switch (estado) {
        case "activado":
            label.classList.add("filtros_boton-activado")
            label.classList.remove("filtros_boton-desactivado")
            break;
        case "desactivado":
            label.classList.remove("filtros_boton-activado")
            label.classList.add("filtros_boton-desactivado")
            break;
    }

}
function comprobarResultado(){ 
    if (propiedades.innerHTML==""){
        resultado.classList.add("displayBlock")
        resultado.classList.remove("displayNone")
    }
    if (propiedades.innerHTML!=""){
        resultado.classList.add("displayNone")
        resultado.classList.remove("displayBlock")
    }
}