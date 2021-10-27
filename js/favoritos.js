$(".header_boton").click(function(){
    $(".header_menu-size").toggle(200)
})
let propiedades= document.getElementsByClassName("propiedades")[0]
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
class vivienda{
    constructor(id, condicion, ciudad, tipo, precio, ambientes, pisos, baños){
        this.id=id;
        this.condicion=condicion;
        this.ciudad=ciudad;
        this.tipo=tipo;
        this.precio=precio;
        this.ambientes=ambientes;
        this.pisos=pisos;
        this.baños=baños;
    }
}
const casa=[]
const departamento=[]
const ph=[]

casa.push(new vivienda(0, "Venta", "Mar del Plata", "casa", 15000, 1, 1, 1))
casa.push(new vivienda(1, "Venta", "Mar del Plata", "casa", 40000, 3, 2, 1))
casa.push(new vivienda(2, "Venta", "Mar del Plata", "casa", 70000, 4, 2, 2))
casa.push(new vivienda(3, "Venta", "Mar del Plata", "casa", 50000, 3, 1, 1))
casa.push(new vivienda(4, "Venta", "Batan", "casa", 15000, 1, 1, 1))
casa.push(new vivienda(5, "Venta", "Batan", "casa", 40000, 3, 2, 1))
casa.push(new vivienda(6, "Venta", "Batan", "casa", 70000, 4, 2, 2))
casa.push(new vivienda(7, "Venta", "Batan", "casa", 50000, 3, 1, 1))
departamento.push(new vivienda(8, "Venta", "Mar del Plata", "departamento", 90000, 5, 1, 2))
departamento.push(new vivienda(9, "Venta", "Mar del Plata", "departamento", 65000, 4, 1, 2))
departamento.push(new vivienda(10, "Venta", "Mar del Plata", "departamento", 50000, 4, 1, 1))
departamento.push(new vivienda(11, "Venta", "Mar del Plata", "departamento", 25000, 1, 1, 1))
ph.push(new vivienda(12, "Venta", "Mar del Plata", "ph", 15000, 1, 2, 1))
ph.push(new vivienda(13, "Venta", "Mar del Plata", "ph", 40000, 3, 2, 1))
ph.push(new vivienda(14, "Venta", "Mar del Plata", "ph", 70000, 4, 2, 1))
ph.push(new vivienda(15, "Venta", "Mar del Plata", "ph", 50000, 3, 2, 1))


const viviendas= casa.concat(departamento).concat(ph)
const favoritos=[]


const idFav= JSON.parse(localStorage.getItem("idFav"))


idFav.forEach( function(e) {
    favoritos.push(viviendas.find(x => x.id == e))
});

agregarViviendas(favoritos)
$(".propiedades_toggle").click(function(){ 
    $(this).fadeOut(500)
    $(this).parent().children(".propiedades_informacion").delay(500)
                                                        .fadeIn(1000)
});
function guardarLS(clave, valor){
    localStorage.setItem(clave, valor)
}
$(".propiedades_favorito").click(function(){
    let id= $(this).attr("id")
    let fl=id.charAt(0)
    let sl=id.match(/\d+/)[0]
    switch(fl){
        case "c":

            if (agregados.find(x => x == sl)){
                borrarItem(agregados, sl)
            }else{
                agregados.push(sl)
            }
            
        break;
        case "d":
            if (agregados.find(x => x == sl)){
                borrarItem(agregados, sl)
            }else{
                agregados.push(sl)
            }
        break;
        case "p":
            if (agregados.find(x => x == sl)){
                borrarItem(agregados, sl)
            }else{
                agregados.push(sl)
            }
        break;
    }
    guardarLS("idFav", JSON.stringify(agregados))
    
})

$('.propiedades_label').click(function(){
    if ($(this).children(".favorito").prop("checked")==true){
        $(this).children(".propiedades_favorito").children("i").animate({fontSize:"1.5rem"}, 100)
                                                               .animate({fontSize:"1.2rem"}, 100)
        $(this).children(".propiedades_favorito").addClass("propiedades_favorito-true")
        $(this).children(".propiedades_favorito").removeClass("propiedades_favorito-false")

    }
    if ($(this).children(".favorito").prop("checked")==false){
        $(this).children(".propiedades_favorito").children("i").animate({fontSize:"1rem"}, 100)
        $(this).children(".propiedades_favorito").removeClass("propiedades_favorito-true")
        $(this).children(".propiedades_favorito").addClass("propiedades_favorito-false")
    }
})

idFav.forEach(function (a){
    let id=$(".propiedades_favorito").attr("id").match(/\d+/)
    favoritos.forEach(function (b) {
        if (favoritos.find(x => x.id == a) == b){
            $(this).children(".propiedades_favorito").addClass("propiedades_favorito-true")
            $(this).children(".propiedades_favorito").removeClass("propiedades_favorito-false")
        }
    })
   
})
