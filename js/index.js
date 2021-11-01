function ejecutarBusqueda() {
    window.open("pages/busquedas.html", "_self");        
}
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
    let dolarOficial = dolar[0].casa.venta
    guardarLS("dolarOficial", dolarOficial)
    if(sucess){
        $(".header_cotizaciones").fadeIn(500)
    }
})
$(".header_boton").click(function(){
    $(".header_menu-size").toggle(200)
})


$("#boton").click(()=>{
    $(".false").toggle(300)
})
tipos=["casa", "departamento", "ph"]
guardarLS("tipos", JSON.stringify(tipos))