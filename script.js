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


function renderDishes() {
    const container = document.getElementById("dishes-container");
    container.innerHTML = "";

    const burgerDishes = dishes.filter(d => d.category === "Burger");

    const subCategories = [...new Set(burgerDishes.map(d => d.subCategory))];

    subCategories.forEach(subCat => {
        const section = document.createElement("div");
        section.classList.add("sub-category-section");
        section.innerHTML = `<h2>${subCat}</h2>`;

        burgerDishes
            .filter(d => d.subCategory === subCat)
            .forEach(dish => section.appendChild(renderDish(dish)));

        container.appendChild(section);
    });
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


function renderHero() {
    const heroContainer = document.getElementById('hero-content');

    const heroImg = document.createElement('img');
    heroImg.src = './assets/img/hero.jpg';
    heroImg.alt = 'Leckeres Essen';
    heroImg.classList.add('hero-img');

    const overlayImg = document.createElement('img');
    overlayImg.src = './assets/img/flavortown.png';
    overlayImg.alt = 'Restaurant Logo';
    overlayImg.classList.add('overlay-img');

    heroContainer.appendChild(heroImg);
    heroContainer.appendChild(overlayImg);
}


document.addEventListener("DOMContentLoaded", () => {
    renderHero();
    renderDishes();   
    renderCart();     
});

