const listaAtaques = require("./attacks.json");
const listaClases = require("./classes.json");
const listaAtaquesMagicos = listaAtaques.filter(item => item.type === "MAGIC");
const listaAtaquesFisicos = listaAtaques.filter(item => item.type === "PHYSICAL");


function isAlive(character) {
    return character.health > 0;
}

function setVida() {
    let vida = Math.floor(Math.random() * (200 - 100) + 100);
    return vida;
}

function setAtaque() {
    return Math.floor(Math.random() * 10);
}

function setVelocidad() {
    let vida = Math.floor(Math.random() * (11 - 1) + 1);
    return vida;
}
function setVelocidad() {
    let vida = Math.floor(Math.random() * (11 - 1) + 1);
    return vida;
}

function setAtaquesPersonaje(Personaje) {

    if (Personaje.class.type === "MAGIC") {
        return listaAtaquesMagicos[(setAtaque())];

    } else {
        return listaAtaquesFisicos[(setAtaque())];

    }

}
function asignarAtaqueJugador(Personaje){

    Personaje.firstAttack=setAtaquesPersonaje(Personaje);
    Personaje.secondAttack=setAtaquesPersonaje(Personaje); 


  }

const jugador1 = {
    name: "Jugador1",
    class: listaClases[Math.floor(Math.random() * 4)],
    health: setVida(),
   
    speed: setVelocidad()
};

const jugador2 = {
    name: "Jugador2",
    class: listaClases[Math.floor(Math.random() * 4)],
    health: setVida(),
    speed: setVelocidad()
};


asignarAtaqueJugador(jugador1)
asignarAtaqueJugador(jugador2)

console.log(jugador1)
console.log(jugador2)