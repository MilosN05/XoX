let testiranje = require("events")
let burek = new testiranje()


let broj = 1


if (broj == 1) {
    burek.on("test", (podaci)=> {
        console.log(podaci)
    })



}


burek.emit("test", "bla")