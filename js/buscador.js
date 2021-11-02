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
let tipos= JSON.parse(localStorage.getItem("tipos"))
if (tipos.length===0 || tipos=== null){
    tipos=["casa","departamento","ph"]
}

$(".true_label").click(function(){
    let label=$(this).attr("for")
    if(tipos.find(x=> x===label)){
        borrarItem(tipos, $(this).attr("for"))
        $(this).removeClass("activado")
        $(this).addClass("desactivado")
    }else{
        tipos.push($(this).attr("for"))
        $(this).removeClass("desactivado")
        $(this).addClass("activado")
    }
    guardarLS("tipos", JSON.stringify(tipos))
})