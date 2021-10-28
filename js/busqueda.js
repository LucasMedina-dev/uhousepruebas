let apiConversor= "https://www.dolarsi.com/api/api.php?type=valoresprincipales"
$.get(apiConversor, function(respuesta, sucess){
    let dolar=respuesta
    $("header").append(`
        <div class="header_cotizaciones" style="display:none">
            <ul class="header_cotizaciones-liststyle">
                <li><p>${dolar[0].casa.nombre}</p></li>
                <li><p>ARS ${dolar[0].casa.compra}</p></li>
                <li><p>ARS ${dolar[0].casa.venta}</p></li>
            </ul>
            <ul class="header_cotizaciones-liststyle">
                <li><p>${dolar[1].casa.nombre}</p></li>
                <li><p>ARS ${dolar[1].casa.compra}</p></li>
                <li><p>ARS ${dolar[1].casa.venta}</p></li>
            </ul>
        </div>`)
    if(sucess){
        $(".header_cotizaciones").fadeIn(500)
    }
} )


let enviarBusqueda = document.getElementById("enviarBusqueda")
function guardarLS(clave, valor){
    localStorage.setItem(clave, valor)
}
function tomarLS(clave){
    localStorage.getItem(clave)
}
function ejecutarBusqueda() {
    window.open("busquedas.html", "_self");
    
}
// Si no hay resultados para la busqueda se ejecuta esto
let resultado = document.getElementById("resultado")
function sinResultado(){ 
    if (propiedades.innerHTML==""){
        resultado.classList.add("activado")
        resultado.classList.remove("desactivado")
    }
    if (propiedades.innerHTML!=""){
        resultado.classList.add("desactivado")
        resultado.classList.remove("activado")
    }
}

//---------------------------------------------------//





let main = document.getElementById("main")
let propiedades= document.getElementsByClassName("propiedades")[0]
let buscadorCasa= document.getElementById("casa")
let buscadorDepartamento= document.getElementById("departamento")
let buscadorPh=document.getElementById("ph")
let htmlCasa = document.getElementsByClassName("casa")
let htmlDpto = document.getElementsByClassName("departamento")
let htmlPh = document.getElementsByClassName("ph")
let labelCasa= document.getElementById("labelCasa")
let labelDepartamento= document.getElementById("labelDepartamento")
let labelPh= document.getElementById("labelPh")

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

class buscadores{
    constructor(ciudad, precioMinimo, precioMaximo){
        this.ciudad=ciudad;
        this.minimo=precioMinimo;
        this.maximo=precioMaximo;
    }
}

const filtros =[]
let moneda= $("#moneda")
enviarBusqueda.onclick = (e) =>{
    e.preventDefault()
    filtros.push(new buscadores(busquedaCiudad.value, busquedaMinimo.value, busquedaMaximo.value))
    const filtradores=JSON.stringify(filtros)
    guardarLS("filtros", filtradores)
    guardarLS("moneda", moneda.val())
    ejecutarBusqueda()
}

const filtrados= JSON.parse(localStorage.getItem("filtros"))
let ciudad= filtrados[0].ciudad.toLowerCase()
let precioMinimo= parseInt(filtrados[0].minimo)
let precioMaximo= parseInt(filtrados[0].maximo)
let monedaLS= localStorage.getItem("moneda")
let dolarOficial = parseInt(localStorage.getItem("dolarOficial"))
if (monedaLS==="peso"){
    precioMinimo= precioMinimo / dolarOficial
    console.log(precioMinimo)
    precioMaximo=precioMaximo / dolarOficial
    console.log(precioMaximo)
}
if (isNaN(precioMinimo)){
    precioMinimo=0
}
if (isNaN(precioMaximo)) {
    precioMaximo=9999999
}
// variables declaradas para recibir todas las casas departamentos y ph
let casa=[]
let departamento=[]
let ph=[]

// variables declaradas para recibir viviendas filtrados por ciudad y precio
let casaFiltrado=[]
let departamentoFiltrado=[]
let phFiltrado=[]

const agregados=tomarLS("idFav")
const favoritos=[]
function borrarItem ( array, item ) {
        var i = array.indexOf( item );
        array.splice( i, 1 );
    }
fetch("../js/db.json")
    .then((response) => response.json())
    .then(
    (data) => {
        casa = data.filter(x => x.tipo == "casa")
        departamento = data.filter(x => x.tipo == "departamento")
        ph = data.filter(x => x.tipo == "ph")
        casaFiltrado= casa.filter(casa => casa.ciudad.toLowerCase()==ciudad && casa.precio>precioMinimo && casa.precio<precioMaximo)
        departamentoFiltrado= departamento.filter(departamento => departamento.ciudad.toLowerCase()==ciudad && departamento.precio>precioMinimo && departamento.precio<precioMaximo)
        phFiltrado= ph.filter(ph => ph.ciudad.toLowerCase()==ciudad && ph.precio>precioMinimo && ph.precio<precioMaximo)
        agregarViviendas(casaFiltrado)
        agregarViviendas(departamentoFiltrado)
        agregarViviendas(phFiltrado)
        sinResultado() 
    }) 
    .then(()=>{
        $('.propiedades_label').click(function(){
            if ($(this).children(".favorito").prop("checked")==true){
                $(this).children(".propiedades_favorito").children("i").animate({fontSize:"1.5rem"}, 50)
                                                                       .animate({fontSize:"1.2rem"}, 50)
                $(this).children(".propiedades_favorito").addClass("propiedades_favorito-true")
                $(this).children(".propiedades_favorito").removeClass("propiedades_favorito-false")

            }
            if ($(this).children(".favorito").prop("checked")==false){
                $(this).children(".propiedades_favorito").children("i").animate({fontSize:"1rem"}, 50)
                $(this).children(".propiedades_favorito").removeClass("propiedades_favorito-true")
                $(this).children(".propiedades_favorito").addClass("propiedades_favorito-false")
            }
        })
        $(".propiedades_toggle").click(function(){ 
            $(this).fadeOut(500)
            $(this).parent().children(".propiedades_informacion").delay(500)
                                                                .fadeIn(1000)
        })
        $(".propiedades_favorito").click(function(){
            let id= $(this).attr("id")
            let fl=id.charAt(0)     //Esto lee la primer letra del id (fl= first letter)
            let n=id.match(/\d+/)[0]//Esto lee los numeros del id
            switch(fl){
                case "c":
                    if (agregados.find(x => x == n)){
                        borrarItem(agregados, n)
                    }else{
                        agregados.push(n)
                    }
                break;
                case "d":
                    if (agregados.find(x => x == n)){
                        borrarItem(agregados, n)
                    }else{
                        agregados.push(n)
                    }
                break;
                case "p":
                    if (agregados.find(x => x == n)){
                        borrarItem(agregados, n)
                    }else{
                        agregados.push(n)
                    }
                break;
            }
            guardarLS("idFav", JSON.stringify(agregados))
        })
    })



// Buscador por Casa, Departamento o PH


buscadorCasa.checked=true
buscadorPh.checked=true
buscadorDepartamento.checked=true

const tipos=[]

buscadorCasa.onclick= () =>{
    if (buscadorCasa.checked!=false){
        agregarViviendas(casaFiltrado)
        estado(labelCasa, "activado")
    }else{
        borrar(htmlCasa)
        estado(labelCasa, "desactivado")
    }
    sinResultado()
}
buscadorDepartamento.onclick= () =>{
    if (buscadorDepartamento.checked!=false){
        agregarViviendas(departamentoFiltrado)
        estado(labelDepartamento, "activado")
    }else{
        borrar(htmlDpto)
        estado(labelDepartamento, "desactivado")
    }
    sinResultado()
}
buscadorPh.onclick= () =>{
    if (buscadorPh.checked!=false){
        agregarViviendas(phFiltrado)
        estado(labelPh, "activado")
    }else{
        borrar(htmlPh)
        estado(labelPh, "desactivado")
    }
    sinResultado()
}



$(".header_boton").click(function(){
    $(".header_menu-size").toggle(200)
})