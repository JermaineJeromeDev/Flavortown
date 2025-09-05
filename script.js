let cart = [];
const DELIVERY_COSTS = 4.99;
const FREE_DELIVERY_FROM = 30;


function initApp() {
    renderHeaderLogo();
    renderHero();
    renderRating();
    renderDishes();

    renderCart();
    renderFooter();
    initMobileCartEvents();

    const body = document.body;
    body.insertAdjacentHTML("beforeend", mobileCartButtonTemplate());
}


function renderHeaderLogo() {
    const headerContainer = document.getElementById('header');
    if (!headerContainer) return;

    const logo = document.createElement('img');
    logo.src = './assets/img/Logo/Logo.png';
    logo.alt = 'Flavortown Logo';
    logo.classList.add('header-logo');

    headerContainer.appendChild(logo);
}


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
    const desktop = document.getElementById('cart');
    const mobile = document.getElementById('mobile-cart-items');
    desktop.innerHTML = "";
    if (mobile) mobile.innerHTML = "";

    const totals = calculateFinalTotal(); 

    if (cart.length === 0) {
        const empty = `<p>Dein Warenkorb ist leer</p>`;
        desktop.innerHTML = empty;
        if (mobile) mobile.innerHTML = empty;

        
        updateMobileCartTotal({ subtotal: 0, delivery: 0, final: 0 });
        return;
    }

    cart.forEach(d => {
        desktop.innerHTML += cartItemTemplate(d);
        if (mobile) mobile.innerHTML += mobileCartItemTemplate(d);
    });

    desktop.innerHTML += cartSummaryTemplate(totals);

    if (mobile) updateMobileCartTotal(totals); 
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

    const cartContainer = document.getElementById('cart');
    if (cartContainer) {
        cartContainer.innerHTML = orderConfirmationTemplate();
    }

    const mobileOverlayItems = document.getElementById('mobile-cart-items');
    const mobileOverlayTotal = document.getElementById('mobile-cart-sum');
    if (mobileOverlayItems) {
        mobileOverlayItems.innerHTML = orderConfirmationTemplate();
    }

    if (mobileOverlayTotal) {
        mobileOverlayTotal.innerHTML = "0.00 €";
    }

    setTimeout(() => {
        renderCart();
    }, 3000);
}


function createHeroImg() {
    const heroImg = document.createElement('img');
    heroImg.src = './assets/img/hero.jpg';
    heroImg.alt = 'Leckeres Essen';
    heroImg.classList.add('hero-img');

    return heroImg;
}


function createOverlayImg() {
    const overlayImg = document.createElement('img');
    overlayImg.src = './assets/img/flavortown.png';
    overlayImg.alt = 'Flavortown Logo';
    overlayImg.classList.add('overlay-img');
    
    return overlayImg;
}


function createHeroText() {
    const heroText = document.createElement('div');
    heroText.classList.add('hero-text');
    heroText.innerHTML = `
        <h1>Flavortown</h1>
        <p>Die besten Burger & Pizza der Stadt</p>
        <button onclick="scrollToDishes()">Jetzt bestellen</button>
    `;
    return heroText;
}


function renderHero() {
    const heroContainer = document.getElementById('hero-content');
    const heroInner = document.createElement('div');
    heroInner.classList.add('hero-inner');

    heroInner.appendChild(createHeroText());
    heroInner.appendChild(createOverlayImg());

    heroContainer.appendChild(createHeroImg());
    heroContainer.appendChild(heroInner);
    
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


function removeItemCompletely(dishName) {
    cart = cart.filter(d => d.name !== dishName);
    renderCart();
}


function renderFooter() {
    const footerContainer = document.getElementById("footer");
    footerContainer.innerHTML = footerTemplate();
}


function toggleMobileCart() {
    const overlay = document.getElementById("mobile-cart-overlay");
    if (!overlay) return; 
    overlay.classList.toggle("hidden");
}


function updateMobileCartTotal(totals) {
    const subtotalEl = document.getElementById("mobile-cart-subtotal");
    const deliveryEl = document.getElementById("mobile-cart-delivery");
    const sumEl = document.getElementById("mobile-cart-sum");
    const totalEl = document.getElementById("mobile-cart-total"); 

    if (!subtotalEl || !deliveryEl || !sumEl || !totalEl) return;

    subtotalEl.innerHTML = totals.subtotal.toFixed(2) + " €";
    deliveryEl.innerHTML = totals.delivery === 0 ? "Gratis" : totals.delivery.toFixed(2) + " €";
    sumEl.innerHTML = totals.final.toFixed(2) + " €";
    totalEl.innerHTML = totals.final.toFixed(2) + " €"; 
}


function initMobileCartEvents() {
    const btn = document.getElementById("mobile-cart-button");
    const overlay = document.getElementById("mobile-cart-overlay");
    const closeBtn = document.getElementById("mobile-cart-close");
    const checkoutBtn = document.getElementById("mobile-cart-checkout");

    if (btn) btn.addEventListener("click", toggleMobileCart);
    if (closeBtn) closeBtn.addEventListener("click", toggleMobileCart);
    if (checkoutBtn) checkoutBtn.addEventListener("click", checkout);

    window.addEventListener("resize", () => {
        const mobileBtn = document.getElementById("mobile-cart-button");

        if (window.innerWidth > 700) {
            
            if (overlay) overlay.classList.add("hidden");

            if (mobileBtn) mobileBtn.style.display = "none";

            const desktopCart = document.getElementById("cart");
            if (desktopCart) desktopCart.style.display = "block";
        } else {

            if (mobileBtn) mobileBtn.style.display = "block";

            const desktopCart = document.getElementById("cart");
            if (desktopCart) desktopCart.style.display = "none";
        }
    });

    const event = new Event('resize');
    window.dispatchEvent(event);
}

