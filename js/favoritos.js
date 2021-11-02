$(".header_boton").click(function(){
    $(".header_menu-size").toggle(200)
})
let propiedades= document.getElementsByClassName("propiedades")[0]


let favoritos=[]// Acá se van a guardar las viviendas que coincidan en id con las id del localStorage
let idFav=JSON.parse(localStorage.getItem("idFav")) // Se toma el array de LS para trabajar sobre ella sin sobreescribir
if (idFav == null){
    idFav=[]
}
fetch("../js/db.json")
    .then((response) => response.json())
    .then(
    (data) => {
        idFav.forEach( function(e) {
            favoritos.push(data.find(x => x.id == e))
        });
        agregarViviendas(favoritos)
        if (favoritos.length===0){
            comprobarResultado()
        }
        
    }) 
    .then(()=>{ 
        $('.propiedades_label').click(function(){ //Efecto al apretar boton de favorito
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
        $(".propiedades_toggle").click(function(){ // Efecto al hacer click en informacion de la vivienda
            $(this).fadeOut(500)
            $(this).parent().children(".propiedades_informacion").delay(500)
                                                                .fadeIn(1000)
        })
        $(".propiedades_favorito").click(function(){
            let id= $(this).attr("id")
            let n=id.match(/\d+/)[0]//Esto lee los numeros del id

            if (idFav.find(x => x == n)){ // Si hago click y la id se encuentra en el array, la borro, caso contrario se agrega
                borrarItem(idFav, n)
            }else{
                idFav.push(n)
            }
            guardarLS("idFav", JSON.stringify(idFav)) //Finalmente se guarda el LS el array modificado
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


//Favoritos

/*
¿ Como funcionan los favoritos?
Caso de no tener favoritos= Si no hay favoritos agregados se crea un array vacio, esto se hace para evitar un error del codigo
y que no se interrumpa el proceso de javascript

Caso de tener favoritos= Tenemos las viviendas agregadas desde busquedas, desde esta pagina yo puedo borrar la vivienda y en caso
de arrepentimiento puedo volver a agregarla, la funcion lo que hace es leer la id de la vivienda seleccionada
Se lee la primer letra C=casa D=departamento P=ph, luego se hace un match para tomar todos los numeros del id que posteriormente se
comparan con las id guardadas en localStorage, se verifica la compatibilidad mediante data.find, esto se hace para cada id del LS 
con el uso de forEach. Luego de hacer la comparacion, se agregan las viviendas marcadas mediante la funcion agregarViviendas()

Se tuvo en cuenta como primer paso guardar en un array los valores del LS y escribir sobre ese array para mantener los datos sin 
que se sobreescriban





*/



