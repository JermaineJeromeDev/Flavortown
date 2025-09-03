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
    const container = document.getElementById("menu-sections");
    if (!container) return;
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

    const heroText = document.createElement('div');
    heroText.classList.add('hero-text');
    heroText.innerHTML = `
        <h1>Flavortown</h1>
        <p>Die besten Burger & Pizza der Stadt</p>
        <button onclick="scrollToDishes()">Jetzt bestellen</button>
    `;

    heroContainer.appendChild(heroImg);
    heroContainer.appendChild(overlayImg);
    heroContainer.appendChild(heroText);
    
}


function scrollToDishes() {
    const dishesSection = document.getElementById('dishes-container');
    dishesSection.scrollIntoView({behavior: 'smooth'});
}


function renderRating() {
    const ratingSection = document.getElementById('rating-section');
    if (!ratingSection) return;
    ratingSection.innerHTML = `
        <h2>Restaurant Bewertung</h2>
        <div class="stars">⭐⭐⭐⭐☆</div>
        <p>4.7/5 based on 123 reviews</p>
    `;
}

document.addEventListener("DOMContentLoaded", () => {
    renderHero();
    renderRating();
    renderDishes();   
    renderCart();     
});

