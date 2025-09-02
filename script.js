let cart = [];
const DELIVERY_COSTS = 4.99;
const FREE_DELIVERY_FROM = 30;


function addToCart(dishName) {
    const dish = dishes.find(d => d.name === dishName);
    if (!dish) return;

    dish.amount++;
    if (!cart.includes(dish)) {
        cart.push(dish);
    }
    renderCart();
}

function removeFromCart(dishName) {
    const dish = cart.find(d => d.name === dishName);
    if (!dish) return;

    dish.amount--;
    if (dish.amount <= 0) {
        cart = cart.filter(d => d.name !== dishName);
    }
    renderCart();
}

function calculateCartTotal() {
    return cart.reduce((sum, dish) => sum + dish.price * dish.amount, 0);
}

function calculateFinalTotal() {
    const subtotal = calculateCartTotal();
    const delivery = subtotal >= FREE_DELIVERY_FROM || subtotal === 0 ? 0 : DELIVERY_COSTS;
    return { subtotal, delivery, final: subtotal + delivery };
}


function renderCart() {
    const cartContainer = document.getElementById('cart');
    cartContainer.innerHTML = "";

    if (cart.length === 0) {
        cartContainer.innerHTML = `<p>Dein Warenkorb ist leer</p>`;
        return;
    }

    cart.forEach(dish => {
        cartContainer.innerHTML += cartItemTemplate(dish);
    });

    const totals = calculateFinalTotal();
    cartContainer.innerHTML += cartSummaryTemplate(totals);
}


function checkout() {
    cart.forEach(d => d.amount = 0); 
    cart = [];
    renderCart();

    const cartContainer = document.getElementById('cart');
    cartContainer.innerHTML = orderConfirmationTemplate();

    setTimeout(() => {
        renderCart();
    }, 3000);
}


document.addEventListener("DOMContentLoaded", () => {
    renderDishes();   
    renderCart();     
});

