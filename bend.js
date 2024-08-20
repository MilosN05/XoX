const express = require("express")
const { readFileSync, readFile, writeFileSync } = require("fs")
let http = require("http")
const path = require("path")
const {Server} = require("socket.io")


////POTREBNI PPODACI
let potrebnoTELO = readFileSync("./igraHTML/teloHTML.txt", "utf8")
let potrebnaGLAVA = readFileSync("./igraHTML/glavaHTML.txt", "utf8")


///KREIRANJE SKICE SERVERA
let app = express()

let server = http.createServer(app)

let socket = new Server(server)






let css = path.join(__dirname, "/igraHTML", "/index.css")


let js = path.join(__dirname, "/igraHTML", "/index.js")


let dodeljivanjeVrednosti = []
let ucitaniKorisnici = 0
let pPotezOdredjen = 0
let broj1 = 0




///UPRAVLJANJE ZAHTEVIMA
app.use("/", express.static("./cekanjeHTML"))

app.use("/igra", express.static("./igraHTML"))


app.get("/index.css", (zahtev, odgovor) => {
    odgovor.sendFile(css) ///PROTUMACI BOLJE OVAJ ZAHTEV
})




socket.on("connection", (korisnik)=>{
    console.log(socket.engine.clientsCount)
    // console.log(korisnik.id)
    

    let uIgru = "/igra"

    if (socket.engine.clientsCount == 2) {
        socket.emit("menjanjeTELAHTML", uIgru)
        console.log("povezan") 
        ucitaniKorisnici = 2
        

    }


    else if(socket.engine.clientsCount > 2) {
        socket.emit("menjanjeTELAHTMLCEKANJE", "<center><h1>Server je pun, za sad!<h1></center>")
    }


    if (socket.engine.clientsCount >= 1 && ucitaniKorisnici == 2) {
        for (let i=0; i<9; i++) {
            korisnik.on(`dodatoX${i}`, ()=> {
                console.log("izvrsena operacija")
                socket.emit(`dodatoX${i}`)
            })

            korisnik.on(`dodatoO${i}`, ()=> {
                console.log("izvrsena operacija")
                socket.emit(`dodatoO${i}`)
            })
            
        }

        korisnik.on("pobednik", (podaci)=> {
            socket.emit("pobednik", podaci)
            pPotezOdredjen = 0
        })



        if (dodeljivanjeVrednosti.length == 0 && pPotezOdredjen== 0) {
            dodeljivanjeVrednosti.push(1)
            console.log(dodeljivanjeVrednosti) 
        }
        
        korisnik.on("ucPP", ()=> {  
            // pPotezOdredjen = 0
            if (dodeljivanjeVrednosti.length == 1 && socket.engine.clientsCount == 2) { 


                /////OVAJ DEO OBAVLJA DODELJIVANJE PRVOG POTEZA
                if (odredjivanjePrednosti() == 1) {
                    korisnik.emit("pPotez", dodeljivanjeVrednosti[0])
                    console.log("dsfsdf")
                }
                else {
                    korisnik.broadcast.emit("pPotez", dodeljivanjeVrednosti[0])
                    console.log("gdsgsdg")
                }
                ////

                dodeljivanjeVrednosti.pop()
                // pPotezOdredjen = 1  ///OVO REGULISI, OVO JE JEDAN OD PROBLEMA
            
        }
        })  

        korisnik.on("pPotez", ()=> {
            korisnik.broadcast.emit("pPotez", 1)
        })

        korisnik.on("slPotez", ()=> {
            korisnik.broadcast.emit("slPotez", 1)
        })     
    }}
)



///PALJENJE SERVERA
server.listen(5000, ()=> {
    console.log("server pokrenut")
})





function odredjivanjePrednosti() {
    broj1 = Math.floor((Math.random())* 2) 
    return broj1
}
console.log(odredjivanjePrednosti())








/// https://stackoverflow.com/questions/51318526/redirecting-a-page-using-socketio

//https://stackoverflow.com/questions/51318526/redirecting-a-page-using-socketio

//https://stackoverflow.com/questions/33321792/how-to-redirect-a-client-after-a-socket-io-event



//PROVALI ZASTO KORISNIK.EMIT NE RADI !




/////PROVERI KAKO SE IZVRSAVA EVENT PETLJA ZA POVEZIVANJE KORISNIKA NA SERVER




//SOCKET IO FUNKCIONISE TAKO STO KREIRA SE PRACENJE NASTANKA VEZE NA BILO KOJIH OD SOKETA
//ZATIM NA OSNOVU CONNECT U JS FAJLU IGRE ILI CEGA GOD SALJE SE PORUKA SERVERU,
//I NE IZVRSAVA SE NIJEDNA OD FUNKCIJA DOK SE NE PRIMI ODGOVOR OD SERVERA DA JE VEZA USPOSTAVLJENA!


// I UVEK IDE KORISNIK PO KORISNIK, PROSTO JE NEMOUGCE U OVOM SOCKET IO DA SE REGULISU DVA KORISNIKA ODJEDARD, NEMOGUCE JE
//SAMO POGLEDAJ KAKO SVE FUNKCIJE GORE I STA TREBAJU DA IZVRSE, SVE CE TI BITI JASNOS

//NPR DA BI ON ZNAO DA IMA DVA KORISNIKA NA SERVERU, ON MORA DA REGISTRUJE DA SU DVA POVEZANA
//A TO JE MOGUCE SAMO AKO PRVI KORISNIK IZVRSI POVEIZVANJE, PA TEK ONDA NEKI DRUGI POSLE NJEGA
//JER DA VRSI SVE ODJEDNOM NIJEDNA FUNKCIJA NE BI BILA IZVODLJVIVA
///PA CAK I ASINHRONE FUNKCIJE IMAJU REDOSLED IZVRSAVANJA !
//I U JAVASCRIPTU NIJE MOGUCE DA SE DVE RADNJE ODJEDNOM IZVRSE, N I J E   M O G U C E

