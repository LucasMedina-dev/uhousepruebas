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
    guardarLS("indiceInicial", 1)
    if (busquedaCiudad.value==""){
        busquedaCiudad.classList.add("advertir")
    }else{
        filtros.push(new buscadores(busquedaCiudad.value, busquedaMinimo.value, busquedaMaximo.value))
        
        guardarLS("filtros", JSON.stringify(filtros))
        ejecutarBusqueda()
    }
}

//Esta funcion refiere a los filtros por Casa, departamento y ph del buscador
/*Al hacer click en alguna de las 3 opciones, la funcion toma el atributo del boton clickeado 
y lo guarda en localStorage con la clave "tipos"*/
let tipos= JSON.parse(localStorage.getItem("tipos"))
if (tipos.length===0 || tipos=== null){// Si se seleccionan las 3 opciones(busqueda vacia), se ejecuta lo siguiente para corregir el error
    tipos=["casa","departamento","ph"]
}
// Ejemplo del siguente evento, si "casa" está en el array, se borra del array y se sube a LS, caso contrario se agrega al array y se sube a LS
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