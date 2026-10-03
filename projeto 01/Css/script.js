let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

function salvarCarrinho() {
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
}

function adicionarItem(nome, preco) {
    let itemExistente = carrinho.find(item => item.name === nome);

    if (itemExistente) {
        itemExistente.quantidade++;
    } else {
        carrinho.push({ name: nome, price: preco, quantidade: 1 });
    }

    salvarCarrinho();
    atualizarCarrinho();
}

function atualizarCarrinho() {
    let lista = document.getElementById("lista-carrinho");
    let totalSpan = document.getElementById("valor-total");
    let contador = document.getElementById("contador-carrinho");

    if (!lista || !totalSpan || !contador) return;

    lista.innerHTML = "";
    let total = 0;
    let quantidadeTotal = 0;

    carrinho.forEach((item, index) => {
        let subtotal = item.price * item.quantidade;
        total += subtotal;
        quantidadeTotal += item.quantidade;

        lista.innerHTML += `
            <li style="margin-bottom: 8px; display: flex; justify-content: space-between; align-items: center;">
                <span>${item.name} (x${item.quantidade}) - R$ ${subtotal.toFixed(2)}</span>
                <button onclick="removerItem(${index})" style="background: darkred; color: white; border: none; padding: 2px 6px; border-radius: 4px; cursor: pointer;">❌</button>
            </li>
        `;
    });

    totalSpan.innerText = total.toFixed(2);
    contador.innerText = quantidadeTotal;
}

function removerItem(index) {
    carrinho.splice(index, 1);
    salvarCarrinho();
    atualizarCarrinho();
}

function alternarCarrinho() {
    let carrinhoDiv = document.getElementById("carrinho-flutuante");
    if (carrinhoDiv) {
        carrinhoDiv.classList.toggle("carrinho-ativo");
    }
}

function enviarWhatsApp() {
    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }

    let mensagem = "Olá, gostaria de fazer o seguinte pedido:%0A";
    let total = 0;

    carrinho.forEach(item => {
        let subtotal = item.price * item.quantidade;
        total += subtotal;
        mensagem += `- ${item.quantidade}x ${item.name} (R$ ${subtotal.toFixed(2)})%0A`;
    });

    mensagem += `%0A*Total do Pedido: R$ ${total.toFixed(2)}*`;

    let telefone = "996970560";
    let url = `https://api.whatsapp.com/send?phone=${telefone}&text=${mensagem}`;

    window.open(url, "_blank");
}

document.addEventListener("DOMContentLoaded", atualizarCarrinho);