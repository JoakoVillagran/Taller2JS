const listaAtaques = require("./attacks.json");
const listaClases = require("./classes.json");


listaAtaques.forEach(function(item) {
    console.log(item.name + " tiene " + item.damage + " años");
  });

  console.log(listaAtaques[0].name);
  console.log(listaClases[0].name);