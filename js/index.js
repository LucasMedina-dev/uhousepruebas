function ejecutarBusqueda() {
    window.open("pages/busquedas.html", "_self");        
}
function guardarLS(clave, valor){
    localStorage.setItem(clave, valor)
}
let apiConversor= "https://www.dolarsi.com/api/api.php?type=valoresprincipales"
$.get(apiConversor, function(respuesta, sucess){
    let dolar=respuesta
    $(sucess).ready()
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
    let dolarOficial = dolar[0].casa.venta
    guardarLS("dolarOficial", dolarOficial)
    if(sucess){
        $(".header_cotizaciones").fadeIn(500)
    }
})
let busquedaCiudad = document.getElementById("busquedaCiudad")
let busquedaMinimo = document.getElementById("busquedaMinimo")
let busquedaMaximo = document.getElementById("busquedaMaximo")
let enviarBusqueda = document.getElementById("enviarBusqueda")
class buscadores{
    constructor(ciudad, precioMinimo, precioMaximo){
        this.ciudad=ciudad;
        this.minimo=precioMinimo;
        this.maximo=precioMaximo;
    }
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
busquedaCiudad.onchange= () =>{
    busquedaCiudad.classList.remove("advertir")
}
$(".header_boton").click(function(){
    $(".header_menu-size").toggle(200)
})
