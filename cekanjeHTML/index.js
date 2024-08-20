///POVEZIVANJE NA KANAL SERVERA

const server = io("https://xox-hw1k.onrender.com/")


//ucitavanje osn stvari
let teloHTML = document.getElementById("telo")
let glavaHTML = document.getElementById("glava")



//KOMUNICIRANJE SA SERVEROM I KANALOM

server.on("menjanjeTELAHTML", (url)=> {
    server.disconnect()
    setTimeout(() => {
        window.location.pathname = url
    },  1000);
    
})




server.on("menjanjeTELAHTMLCEKANJE", (podaci)=> {
    if (teloHTML.innerHTML.startsWith("<center>") == true) {
        server.disconnect()
        setTimeout(() => {
            teloHTML.innerHTML = podaci
        }, 1000);
        }
})

