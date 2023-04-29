const listaAtaques = require("./attacks.json");
const listaClases = require("./classes.json");
const listaAtaquesMagicos = listaAtaques.filter(item => item.type === "MAGIC");
const listaAtaquesFisicos = listaAtaques.filter(item => item.type === "PHYSICAL");
let outputString = "";

function concatenacion(texto) {
    outputString += texto + "\n";
}

//creacion personaje

function setVida() {
    let vida = Math.floor(Math.random() * (200 - 100) + 100);
    return vida;
}

function setAtaque() {
    return Math.floor(Math.random() * 10);
}

function setVelocidad() {
    let velocidad = Math.floor(Math.random() * (11 - 1) + 1);
    return velocidad;
}


function setAtaquesPersonaje(Personaje) {

    if (Personaje.class.type === "MAGIC") {
        return listaAtaquesMagicos[(setAtaque())];

    } else {
        return listaAtaquesFisicos[(setAtaque())];

    }

}
function asignarAtaqueJugador(personaje) {

    personaje.firstAttack = setAtaquesPersonaje(personaje);
    personaje.secondAttack = setAtaquesPersonaje(personaje);
}


const jugador1 = {
    name: "Juguito",
    class: listaClases[Math.floor(Math.random() * 4)],
    health: setVida(),
    speed: setVelocidad(),
    contfallas: 0,
    ganador: false
};

const jugador2 = {
    name: "Papo",
    class: listaClases[Math.floor(Math.random() * 4)],
    health: setVida(),
    speed: setVelocidad(),
    contfallas: 0,
    ganador: false
};


asignarAtaqueJugador(jugador1)
asignarAtaqueJugador(jugador2)








//Combate

function ataque(Personaje, Objetivo) {

    let SelAtaque = (Math.floor(Math.random() * 2) < 1) ? Personaje.firstAttack : Personaje.secondAttack;
    let precision = Math.floor(Math.random() * (100 - 1 + 1)) + 1;
    if (SelAtaque === Personaje.firstAttack) {
        if (precision <= Personaje.firstAttack.accuracy) {
            Objetivo.health -= Personaje.firstAttack.damage
            return `${Personaje.name} ataca con ${Personaje.firstAttack.name} haciendo ${Personaje.firstAttack.damage} DMG....Da en el blanco!   La vida de ${Objetivo.name} queda en ${Objetivo.health}`
        } else {
            Personaje.contfallas++;
            return `${Personaje.name} ataca con ${Personaje.firstAttack.name}....Falla!  La vida de ${Objetivo.name} se mantiene en ${Objetivo.health} `

        }
    } else {
        if (precision <= Personaje.secondAttack.accuracy) {
            Objetivo.health -= Personaje.secondAttack.damage
            return `${Personaje.name} ataca con ${Personaje.secondAttack.name} haciendo ${Personaje.secondAttack.damage} DMG...Da en el blanco!   La vida de ${Objetivo.name} queda en ${Objetivo.health}`
        } else {
            Personaje.contfallas++;
            return `${Personaje.name} ataca con ${Personaje.secondAttack.name}.....Falla! La vida de ${Objetivo.name} se mantiene en ${Objetivo.health} `

        }
    }

}



function isAlive(character) {
    return character.health > 0;
}

function pelea(Personaje_1, Personaje_2) {
    let turno = 1;
    concatenacion("\n### BATALLA ### \n ")
    while (true) {
        concatenacion("Ronda " + turno);

        if (Personaje_1.speed <= Personaje_2.speed) {

            if (isAlive(Personaje_1)) {
                concatenacion(ataque(Personaje_1, Personaje_2))

            } else {
                concatenacion(`${Personaje_1.name} no puede continuar`)
                Personaje_2.ganador = true;
                break
            }

            if (isAlive(Personaje_2)) {
                concatenacion(ataque(Personaje_2, Personaje_1))

            } else {
                concatenacion(`${Personaje_2.name} no puede continuar`)
                Personaje_1.ganador = true;
                break
            }



        }
        else {

            if (isAlive(Personaje_2)) {
                concatenacion(ataque(Personaje_2, Personaje_1))

            } else {
                concatenacion(`${Personaje_2.name} no puede continuar`)
                Personaje_1.ganador = true;
                break
            }

            if (isAlive(Personaje_1)) {
                concatenacion(ataque(Personaje_1, Personaje_2))

            } else {
                concatenacion(`${Personaje_1.name} no puede continuar`)
                Personaje_2.ganador = true;
                break
            }
        }

        turno++;


    }
}


function mensajeResumen(Personaje_1, Personaje_2) {
    concatenacion("\n### RESUMEN ###\n ")

    if (Personaje_1.ganador === true) {
        return (`${Personaje_1.name} gana la batalla \n${Personaje_1.name} fallo ${Personaje_1.contfallas} veces su ataque \n${Personaje_2.name} fallo ${Personaje_2.contfallas} veces su ataque `);
    } else {
        return (`\n${Personaje_2.name} gana la batalla \n${Personaje_1.name} fallo ${Personaje_1.contfallas} veces su ataque \n${Personaje_2.name} fallo ${Personaje_2.contfallas} veces su ataque  `);
    }

}

//Pelea



concatenacion(`### INICIO ### \n${jugador1.name} | ${jugador1.class.name} | ${jugador1.health} de vida vs ${jugador2.name} | ${jugador2.class.name} | ${jugador2.health} de vida`)
pelea(jugador1, jugador2)
concatenacion(mensajeResumen(jugador1, jugador2));


let fightLogs = outputString;

function generateFileLog(logs, filename) {
    const fs = require("fs");
    fs.writeFile(filename, logs, (err) => {
        if (err) throw err;
    });
}

generateFileLog(fightLogs, "logs_batalla.txt");



