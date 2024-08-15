let turno = "X"; 
let tablero = ["", "", "", "", "", "", "", "", ""];

const botones = document.querySelectorAll(".gato");
const winOrLoseDiv = document.querySelector(".winorlose");
const winOrLoseMessage = winOrLoseDiv.querySelector(".winorlosemessage");

function marcar(index) {
    if (tablero[index] !== "") return; 

    tablero[index] = turno;
    botones[index].innerHTML = turno === "X" ?
        '<i class="fa-solid fa-x fa-2xl"></i>' :
        '<i class="fa-regular fa-circle fa-2xl"></i>';

    if (verificarGanador()) {
        mostrarResultado(`¡${turno} ha ganado!`);
        return;
    }

    if (verificarEmpate()) {
        mostrarResultado("¡Empate!");
        return;
    }

    turno = turno === "X" ? "O" : "X";
}

function verificarGanador() {
    const combinacionesGanadoras = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], 
        [0, 3, 6], [1, 4, 7], [2, 5, 8], 
        [0, 4, 8], [2, 4, 6]          
    ];

    for (const combinacion of combinacionesGanadoras) {
        const [a, b, c] = combinacion;
        if (tablero[a] === tablero[b] && tablero[b] === tablero[c] && tablero[a] !== "") {
            return true;
        }
    }
    return false;
}

function verificarEmpate() {
    return tablero.every(casilla => casilla !== "");
}

function mostrarResultado(mensaje) {
    winOrLoseMessage.textContent = mensaje;
    winOrLoseDiv.style.display = "block";
  
}

function reiniciarJuego() {
    tablero.fill("");
    botones.forEach(boton => {
        boton.innerHTML = "";
    });
    turno = "X";
    winOrLoseDiv.style.display = "none"; 
}

for (let i = 0; i < botones.length; i++) {
    botones[i].onclick = () => {
        marcar(i);
    };
}
