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
    precioMaximo=precioMaximo / dolarOficial
}

// Condiciones en caso de dejar la busqueda por precio en blanco
if (isNaN(precioMinimo)){
    precioMinimo=0
}
if (isNaN(precioMaximo)) {
    precioMaximo=9999999
}
//---------------------------------------------------------------

function ejecutarBusqueda() {
    window.open("busquedas.html", "_self");
}
let resultado = document.getElementById("resultado") // llamado a elemento creado para ejecutar funcion comprobarBusqueda() que se ejecuta si no hay resultados
let propiedades= document.getElementsByClassName("propiedades")[0]

// Aca se guardan los favoritos y los tipos de vivienda que se buscan
let idFav=JSON.parse(localStorage.getItem("idFav"))
if (idFav == null){
    idFav=[]
}

//-------------------------------------------------------------------

let domicilios=[] // variable declarada para recibir todas las casas departamentos y ph


// ORDEN DE LOS ITEMS- ORDEN DE LOS ITEMS- ORDEN DE LOS ITEMS
let orden
$("#orden").change(()=>{
    orden=$("#orden").val()// tomo el valor del orden requerido para organizar los items
    guardarLS("orden", orden) // lo guardo en localStorage para luego ejecutar la busqueda y reaparecer los items ordenados
    ejecutarBusqueda()
})
//------------------------------------------------------------


let indiceInicial
let indiceFinal
fetch("../js/db.json")
    .then((response) => response.json())
    .then(
    (data) => {
        tipos.forEach(y=> domicilios= domicilios.concat(data.filter(x => x.tipo===y)))
        // "tipos" son los tipos de propiedades(casa,dpto,ph), se filtran las propiedades que coincidan con la busqueda
        let final= domicilios.filter(x => x.ciudad.toLowerCase()===ciudad && x.precio>precioMinimo && x.precio<precioMaximo)
        // "final" toma los datos filtrados del array anterior y se toman las que coincidan con el precio y ciudad
        guardarLS("indiceLength", final.length)
        indiceInicial=parseInt(localStorage.getItem("indiceInicial"))
        indiceFinal=Math.ceil(parseInt(localStorage.getItem("indiceLength"))/10)
        $("#index").text(`${indiceInicial} de ${indiceFinal}`)


        // Ordenado por precio y ambientes
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
        //Se agregan las viviendas filtradas, si no hay viviendas que coincidan con la busqueda
        // comprobarResultado() lo va a notificar
        agregarViviendas(final.slice(10*(indiceInicial-1), indiceInicial*10))
        comprobarResultado() 
    }) 
    .then(()=>{
        $('.propiedades_favorito').click(function(){
            if ($(this).hasClass("propiedades_favorito-false")){
                $(this).removeClass("propiedades_favorito-false")
                $(this).addClass("propiedades_favorito-true")
                $(this).children("i").animate({fontSize:"1.5rem"}, 100)
                                    .animate({fontSize:"1rem"}, 100)
            }else{
                $(this).children("i").animate({fontSize:"1.5rem"}, 100)
                                    .animate({fontSize:"1rem"}, 100)
                $(this).removeClass("propiedades_favorito-true")
                $(this).addClass("propiedades_favorito-false")
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
            if(idFav.find(x=> x===n)){
                $(this).removeClass("propiedades_favorito-false")
                $(this).addClass("propiedades_favorito-true")
            }else{
                $(this).removeClass("propiedades_favorito-true")
                $(this).addClass("propiedades_favorito-false")

            }
        })
    })
    .then(()=>{
        if (indiceFinal===1){
            $("#siguiente").hide()
        }
        if(indiceInicial===1){
            $("#previo").hide()
        }
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

// Botones para navegar entre paginas de las busquedas
$("#siguiente").click(()=>{
    if (indiceInicial < indiceFinal){
        guardarLS("indiceInicial", indiceInicial+1)
        ejecutarBusqueda()
    }
    
})
$("#previo").click(()=>{
    if (indiceInicial <= indiceFinal && indiceInicial>1){
        guardarLS("indiceInicial", indiceInicial-1)
        ejecutarBusqueda()
    }
    
})