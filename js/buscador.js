class buscadores{
    constructor(ciudad, precioMinimo, precioMaximo){
        this.ciudad=ciudad;
        this.minimo=precioMinimo;
        this.maximo=precioMaximo;
    }
}

const filtros =[]
let moneda= $("#moneda")
let busquedaCiudad = document.getElementById("busquedaCiudad")
let busquedaMinimo = document.getElementById("busquedaMinimo")
let busquedaMaximo = document.getElementById("busquedaMaximo")
let enviarBusqueda = document.getElementById("enviarBusqueda")

enviarBusqueda.onclick = (e) =>{
    e.preventDefault()
    guardarLS("moneda", moneda.val())
    if (busquedaCiudad.value==""){
        busquedaCiudad.classList.add("advertir")
    }else{
        filtros.push(new buscadores(busquedaCiudad.value, busquedaMinimo.value, busquedaMaximo.value))
        const filtradores=JSON.stringify(filtros)
        guardarLS("filtros", filtradores)
        ejecutarBusqueda()
    }
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

$(".true_label").click(function(){
    if ($(this).hasClass("desactivado")){
        $(this).removeClass("desactivado")
        $(this).addClass("activado")
        tipos.push($(this).attr("for"))
    }else{
        $(this).removeClass("activado")
        $(this).addClass("desactivado")
        borrarItem(tipos, $(this).attr("for"))
    }
    guardarLS("tipos", JSON.stringify(tipos))
})



