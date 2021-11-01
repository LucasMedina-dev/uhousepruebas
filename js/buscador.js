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
        guardarLS("tipos", JSON.stringify(tipos))
        filtros.push(new buscadores(busquedaCiudad.value, busquedaMinimo.value, busquedaMaximo.value))
        const filtradores=JSON.stringify(filtros)
        guardarLS("filtros", filtradores)
        ejecutarBusqueda()
    }
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
    guardarLS("tipos", tipos)
})


