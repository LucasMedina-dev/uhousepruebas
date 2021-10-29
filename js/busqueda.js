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

function ejecutarBusqueda() {
    window.open("busquedas.html", "_self");
    
}
// Si no hay resultados para la busqueda se ejecuta esto
let resultado = document.getElementById("resultado")


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


// variables declaradas para recibir todas las casas departamentos y ph
let casa=[]
let departamento=[]
let ph=[]

// variables declaradas para recibir viviendas filtrados por ciudad y precio
let casaFiltrado=[]
let departamentoFiltrado=[]
let phFiltrado=[]

let idFav=JSON.parse(localStorage.getItem("idFav"))
if (idFav == null){
    idFav=[]
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
        comprobarResultado() 
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
            if (idFav.find(x => x == n)){
                borrarItem(idFav, n)
            }else{
                idFav.push(n)
            }
            guardarLS("idFav", JSON.stringify(idFav))
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
    comprobarResultado()
}
buscadorDepartamento.onclick= () =>{
    if (buscadorDepartamento.checked!=false){
        agregarViviendas(departamentoFiltrado)
        estado(labelDepartamento, "activado")
    }else{
        borrar(htmlDpto)
        estado(labelDepartamento, "desactivado")
    }
    comprobarResultado()
}
buscadorPh.onclick= () =>{
    if (buscadorPh.checked!=false){
        agregarViviendas(phFiltrado)
        estado(labelPh, "activado")
    }else{
        borrar(htmlPh)
        estado(labelPh, "desactivado")
    }
    comprobarResultado()
}
const filtros =[]
enviarBusqueda.onclick = (e) =>{
    e.preventDefault()
    if (busquedaCiudad.value==""){
        busquedaCiudad.classList.add("advertir")
    }else{
        filtros.push(new buscadores(busquedaCiudad.value, busquedaMinimo.value, busquedaMaximo.value))
        const filtradores=JSON.stringify(filtros)
        guardarLS("filtros", filtradores)
        ejecutarBusqueda()
    }
}


$(".header_boton").click(function(){
    $(".header_menu-size").toggle(200)
})