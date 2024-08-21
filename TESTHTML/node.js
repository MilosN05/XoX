// let express = require("express")
// let app = express()

// // console.log(express.static("./cekanjeHTML"))
// let dogadjaji = require("events")


// let broj = 0
// let dogadjaj1 = new dogadjaji()


// // for (let i=0; i<5; i++) {
// //     dogadjaj1.on(`burekS${i}`, ()=> {
// //         console.log("burek")
// //     })
// // }


// // dogadjaj1.emit("burekS3")
// // dogadjaj1.emit("burekS4")


// dogadjaj1.on("test", (podaci)=> {
//     if (broj == 1) {
//         console.log(podaci)}
// })


// dogadjaj1.emit("test", "bla")


// broj = 1



let burek = function() {


    setInterval(()=> {
        console.log("etst")
    }, 3000)

    setInterval(() => {
        console.log("blaaaa")
    }, 4000);


    
    window.alert("test") ///OBUSTAVLJA SVE UVEK, GDE GOD SE NALAZIO, SAMO KADA JE PRVI NA REDU, ONDA ZAUSTAVLJA CITANJE I IZVRSAVANJE SVEGA OSTALOG
                            // A KAD JE NA KRAJU NE OBUSTAVLJA CITANJE KODA ALI OBUSTAVJA NJEGOVO KRAJNJE IZVRSAVANJE


   
    
}

// burek()




// PRIMER 2

function test() {
    console.log(2+2)
}


function bla() {
    test()
            //PROVERI ZASTO OVO FUNKCINOSE

}

