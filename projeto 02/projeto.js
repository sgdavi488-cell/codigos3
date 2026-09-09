const numero = document.getElementById("numero");
const aumentar = document.getElementById("aumentar");
const diminuir = document.getElementById("diminuir");
const resetar = document.getElementById("resetar");

let contador = 0;

aumentar.addEventListener("click", () => {
    contador = contador + 1;
    numero.textContent = contador;
});

diminuir.addEventListener("click", () => {
    contador = contador - 1;
    numero.textContent = contador;
});

resetar.addEventListener("click", () => {
    contador = 0;
    numero.textContent = contador;
});

