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
function ejecutarBusqueda() {
    window.open("busquedas.html", "_self");
    
}
let resultado = document.getElementById("resultado") // elemento creado para ejecutar funcion comprobarBusqueda() que se ejecuta si no hay resultados
let propiedades= document.getElementsByClassName("propiedades")[0]

// Aca se guardan los favoritos y los tipos de vivienda que se buscan
let idFav=JSON.parse(localStorage.getItem("idFav"))
if (idFav == null){
    idFav=[]
}

//-------------------------------------------------------------------

let domicilios=[] // variable declarada para recibir todas las casas departamentos y ph

let orden
$("#orden").change(()=>{
    orden=$("#orden").val()
    guardarLS("orden", orden)
    ejecutarBusqueda()
})

fetch("../js/db.json")
    .then((response) => response.json())
    .then(
    (data) => {
        tipos.forEach(y=> domicilios= domicilios.concat(data.filter(x => x.tipo===y)))
        let final= domicilios.filter(x => x.ciudad.toLowerCase()===ciudad && x.precio>precioMinimo && x.precio<precioMaximo)
        switch (localStorage.getItem("orden")){
            case "precioMenor":
                final.sort(function(a, b){
                    return a.precio - b.precio
                });
            break;
            case "precioMayor":
                final.sort(function(a, b){
                    return b.precio - a.precio
                });
            break;
            case "ambientesMenor":
                final.sort(function(a, b){
                    return a.ambientes - b.ambientes
                });
            break;
            case "ambientesMayor":
                final.sort(function(a, b){
                    return b.ambientes - a.ambientes
                });
            break;
        }
        agregarViviendas(final)
        comprobarResultado() 
    }) 
    .then(()=>{
        $('.propiedades_label').click(function(){
            if ($(this).children(".favorito").prop("checked")==true){
                $(this).children(".propiedades_favorito").children("i").animate({fontSize:"1.5rem"}, 100)
                                                                       .animate({fontSize:"1rem"}, 100)
                $(this).children(".propiedades_favorito").addClass("propiedades_favorito-true")
                $(this).children(".propiedades_favorito").removeClass("propiedades_favorito-false")

            }
            if ($(this).children(".favorito").prop("checked")==false){
                $(this).children(".propiedades_favorito").children("i").animate({fontSize:"1rem"}, 100)
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
        $(".propiedades_favorito").each(function(){//Mantiene seleccionado los favoritos
            let id= $(this).attr("id")
            let n=id.match(/\d+/)[0]
            console.log(id)
            console.log(n)
            if(idFav.find(x=> x===n)){
                $(this).removeClass("propiedades_favorito-false")
                $(this).addClass("propiedades_favorito-true")
            }else{
                        $(this).removeClass("propiedades_favorito-true")
                $(this).addClass("propiedades_favorito-false")

            }
        })
    })


$(".header_boton").click(function(){
    $(".header_menu-size").toggle(200)
})

$(".true_label").each(function(){//Mantiene seleccionado los filtros por casa departamento y ph
    let label=$(this).attr("for")
    if(tipos.find(x=> x===label)){
        $(this).removeClass("desactivado")
        $(this).addClass("activado")
    }else{
        $(this).removeClass("activado")
        $(this).addClass("desactivado")

    }
})
