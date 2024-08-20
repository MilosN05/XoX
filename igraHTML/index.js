//POVEZIVANJE NA KANAL
let server = io("192.168.0.23:5000")

server.emit("ucPP")





//IGRA

let divS = document.querySelectorAll("Div")

let prviIgrac = null
let drugiIgrac = null




//PRACENJE XOX
for (let i=0; i<divS.length; i++) {
    server.on(`dodatoX${i}`, ()=> {
                            
        divS[i].innerHTML = "<p class='ddd'>X</p>"
        console.log("poruka  primljena")

    })

    server.on(`dodatoO${i}`, ()=> {
        divS[i].innerHTML = "<p class='ddd'>O</p>"
        console.log("poruka primljena")
    }) 

}

//PRVI POTEZ


server.on("pPotez", (podaci)=> {
    prviIgrac = podaci

    console.log("TI IMAS PRVI POTEZ")
})

//DRUGI POTEZ

server.on("slPotez", (podaci)=> {
    drugiIgrac = podaci
})



//PRACENJE POBEDNIKA/GUBITNIKA

server.on("pobednik", (podaci)=> {
    if (podaci && pobednik == 1) {
        server.disconnect()
        setTimeout(()=> {
            
            window.location.pathname = "/"
            
        }, 4000)
    }

    else {
        server.disconnect()
        setTimeout(() => {
            
            window.location.pathname = "/"
            
        }, 4000);
    }
})




////SERVER.ON u ovom slucaju predstavlja pracenje dogadjaja korisnika i servera (DAKLE PRATI SE KANAL U KOJEM SE NALAZI KORISNIK SA SERVEROM, NE PRATE SE SVI KANALI! STO JE I LOGICNO)
///SERVER.EMIT ISTO, VRSI PRENOS DOGADJAJA PUTEM KANALA U KOJEM SE NALAZI SA SERVEROM !

// let nizP = []
// izborPPoteza()


window.onclick = function() {
    igra()
}

console.log(window)

// let prviIgrac = nizP[0]
// let drugiIgrac = nizP[1]

console.log(prviIgrac)
console.log(drugiIgrac)


let pobednik = 0


function igra() {
    function dodavanjeX() {


    for (let i=0; i<divS.length; i++) {
        if (divS[i].innerHTML == "") {
        divS[i].addEventListener("click", function dodavanjeXa() {
            if (divS[i].innerHTML == "" && prviIgrac == 1) {
                console.log("IZVRSEN X")
                
                
                server.emit(`dodatoX${i}`)
                server.emit("slPotez", 1)

                prviIgrac -= 1
                
                
               
                
}
            else {
                divS[i].removeEventListener("click", dodavanjeXa)
            }
         }
        )}}}


    function dodavanjeO() {


    for (let i=0; i<divS.length; i++) { 
        
        divS[i].addEventListener("click", function dodavanjeOx() {
            if (divS[i].innerHTML == "" && drugiIgrac == 1) {
                console.log("IZVRSEN O")
                
                server.emit(`dodatoO${i}`)
                server.emit("pPotez", 1)
                
                drugiIgrac -= 1
                

                
       }
            else {
                divS[i].removeEventListener("click", dodavanjeOx)
            }
            })}
        
    }


    dodavanjeO()
    dodavanjeX()


    if (divS[0].innerHTML == divS[1].innerHTML && divS[0].innerHTML == divS[2].innerHTML && divS[0].innerHTML != "") 
        {
        window.alert("POBEDIO SI, ALAL VERA")
        server.emit("pobednik", true)
        pobednik = 1
    
        
    }
    
///// I ZA X I ZA O (OKS), TRI PUTA CE SE IZVRSITI OVA POSLEDNJA OPERACIJA, ZASTO PA ZATO STO SMO REKLI DA NA POSLEDNJI KLIK KONZ MI TO I TO, PA BI TREBALO JEDANPUT, MEDJUTIM MI SMO PRETHODNO KLIKNULI TRI PUTA LEVIM KLIKTAJEM MISA DA BI IZVRSILI FUNKCIJE ODNOSNO TIME SAZVALI 3 PUTA IGRA FUNKCIJU KOJA KONSTANTNO DODAJE NOVE EVENT LISTENERE, SAMIM TIM BICE TRI EVENT LISENERA NA POSLEDNJEM SAZIVANJU PA CE TRI PUTA DA SE SAZOVE JEDNA TE ISTA OPERACIJA
    if (divS[3].innerHTML == divS[4].innerHTML && divS[3].innerHTML == divS[5].innerHTML && divS[3].innerHTML != "") {
        window.alert("POBEDIO SI, ALAL VERA")
        server.emit("pobednik", true)
        pobednik = 1

    }    
    if (divS[6].innerHTML == divS[7].innerHTML && divS[7].innerHTML == divS[8].innerHTML && divS[6].innerHTML != "") {
        window.alert("POBEDIO SI, ALAL VERA")
        server.emit("pobednik", true)
        pobednik = 1

    }
    if (divS[0].innerHTML == divS[3].innerHTML && divS[3].innerHTML == divS[6].innerHTML && divS[0].innerHTML != "") {
        window.alert("POBEDIO SI, ALAL VERA")
        server.emit("pobednik", true)
        pobednik = 1

    }
    if (divS[1].innerHTML == divS[4].innerHTML && divS[4].innerHTML == divS[7].innerHTML && divS[1].innerHTML != "") {
        window.alert("POBEDIO SI, ALAL VERA")
        server.emit("pobednik", true)
        pobednik = 1
    }
    if (divS[2].innerHTML == divS[5].innerHTML && divS[5].innerHTML == divS[8].innerHTML && divS[2].innerHTML != "") {
        window.alert("POBEDIO SI, ALAL VERA")
        server.emit("pobednik", true)
        pobednik = 1
    }
    if (divS[0].innerHTML == divS[4].innerHTML && divS[4].innerHTML == divS[8].innerHTML && divS[0].innerHTML != "") {
        window.alert("POBEDIO SI, ALAL VERA")
        server.emit("pobednik", true)
        pobednik = 1
    }
    if (divS[2].innerHTML == divS[4].innerHTML && divS[2].innerHTML == divS[6].innerHTML && divS[2].innerHTML != "") {
        window.alert("POBEDIO SI, ALAL VERA")
        server.emit("pobednik", true)
        pobednik = 1
    }
    

}

    



// function izborPPoteza() {
//     let broj1 = Math.floor(Math.random()*2)
//     let broj2 = Math.floor(Math.random()*2)
//     while (broj1 == broj2) {
//         broj1 = Math.floor(Math.random()*2)
//         broj2 = Math.floor(Math.random()*2)

//     }
//     nizP.push(broj1)
//     nizP.push(broj2)
// }

