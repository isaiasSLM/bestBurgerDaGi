let cart = [];
let cartCount = 0;

function addItem(item, price) {
    const cartItem = cart.find(i => i.name === item);
    if (cartItem) {
        cartItem.quantity += 1;
    } else {
        cart.push({ name: item, price: price, quantity: 1 });
    }
    cartCount++;
    updateCartDisplay();
    updateItemCount(item, cartItem ? cartItem.quantity : 1);
    updatePedidosCount();
}

function removeItem(item) {
    const cartItem = cart.find(i => i.name === item);
    if (cartItem && cartItem.quantity > 0) {
        cartItem.quantity -= 1;
        if (cartItem.quantity === 0) {
            cart = cart.filter(i => i.name !== item);
        }
    }
    cartCount--;
    updateCartDisplay();
    updateItemCount(item, cartItem ? cartItem.quantity : 0);
    updatePedidosCount();
}

function updateItemCount(item, count) {
    const countElement = document.getElementById(item.toLowerCase().replace(/ /g, '-') + '-count');
    if (countElement) {
        countElement.textContent = count;
    }
}

function updateCartDisplay() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';
    cart.forEach((item, index) => {
        const li = document.createElement('li');
        li.textContent = `${item.name} (x${item.quantity}) - R$${item.price * item.quantity}`;

        // Adiciona botão de remover ao item
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remover';
        removeButton.addEventListener('click', () => {
            removeItem(item.name);
            updateCartDisplay();
        });
        li.appendChild(removeButton);

        cartItems.appendChild(li);
    });

    // Calcula o total do carrinho
    const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

    // Adiciona o resumo do carrinho
    const cartSummary = document.createElement('div');
    cartSummary.innerHTML = `
        <h3>Resumo do Pedido</h3>
        <p>Total: R$ ${cartTotal.toFixed(2)}</p>
    `;
    cartItems.appendChild(cartSummary);
}

function checkPayment() {
    const payment = document.getElementById('payment').value;
    const trocoField = document.getElementById('troco');
    if (payment === 'dinheiro') {
        trocoField.classList.remove('hidden');
    } else {
        trocoField.classList.add('hidden');
    }
}

function finalizeOrder() {
    const name = document.getElementById('name').value;
    const address = document.getElementById('address').value;
    const payment = document.getElementById('payment').value;
    const trocoPara = document.getElementById('troco-para');
    let trocoParaValue;
    if (!trocoPara.classList.contains('hidden')) {
        trocoParaValue = trocoPara.value;
    }
    const observations = document.getElementById('observations').value;

    // Calcula o total do pedido
    const totalPedido = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

    // Construindo a mensagem
    let message = `Pedido para Best Burger da Gi - ${name}:\n`; // Adiciona o nome ao pedido
    cart.forEach(item => {
        message += `${item.name} (x${item.quantity}) - R$${(item.price * item.quantity).toFixed(2)}\n`;
    });
    message += `\nEndereço: ${address}\n`;
    message += `Forma de Pagamento: ${payment}\n`;
    if (payment === 'dinheiro') {
        message += `Troco para: R$${trocoParaValue}\n`;
    }
    message += `Observações: ${observations}\n`;
    
    // Adiciona o total do pedido à mensagem
    message += `Total do Pedido: R$${totalPedido.toFixed(2)}\n`;

    // Gerar o link do WhatsApp
    const whatsappLink = `https://wa.me/5584988770810?text=${encodeURIComponent(message)}`;
    window.open(whatsappLink, '_blank');

    // Reinicia o contador de itens no carrinho
    cartCount = 0;
    updatePedidosCount();
}

function updatePedidosCount() {
    const countElement = document.getElementById('pedidos-count');
    if (countElement) {
        countElement.textContent = cartCount;
    }
}

function goToCart() {
    // Encontra a seção do carrinho
    const cartSection = document.getElementById('cart');
    // Roda a página até o início da seção
    cartSection.scrollIntoView({ behavior: 'smooth' });
}

function checkPayment() {
    const payment = document.getElementById('payment').value;
    const trocoField = document.getElementById('troco');
    if (payment === 'dinheiro') {
        trocoField.classList.remove('hidden');
    } else {
        trocoField.classList.add('hidden');
    }
}