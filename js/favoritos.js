$(".header_boton").click(function(){
    $(".header_menu-size").toggle(200)
})
let propiedades= document.getElementsByClassName("propiedades")[0]

// variables declaradas para recibir todas las casas departamentos y ph
let casa=[]
let departamento=[]
let ph=[]
let todos = casa.concat(departamento).concat(ph)

fetch("../js/db.json")
    .then((response) => response.json())
    .then(
    (data) => {
        idFav.forEach(id => {
            todos += data.find(x => x.id == id)
        })
        agregarViviendas(todos)
        sinResultado() 
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

const viviendas= casa.concat(departamento).concat(ph)
const favoritos=[]


let idFav=JSON.parse(localStorage.getItem("idFav"))
if (idFav == null){
    idFav=[]
}

idFav.forEach( function(e) {
    favoritos.push(viviendas.find(x => x.id == e))
});

agregarViviendas(favoritos)
$(".propiedades_toggle").click(function(){ 
    $(this).fadeOut(500)
    $(this).parent().children(".propiedades_informacion").delay(500)
                                                        .fadeIn(1000)
});


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
    let id=$(".propiedades_favorito").attr("id")
    favoritos.forEach(function (b) {
        if (favoritos.find(x => x.id == a) == b){
            $(this).children(".propiedades_favorito").addClass("propiedades_favorito-true")
            $(this).children(".propiedades_favorito").removeClass("propiedades_favorito-false")
        }
    })
   
})
