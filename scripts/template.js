function renderDish(dish) {
    const dishCard = document.createElement("div");
    dishCard.classList.add("dish-card");
    dishCard.innerHTML = `
        <img src="${dish.image}" alt="${dish.name}">
        <h3>${dish.name}</h3>
        <p>${dish.description}</p>
        <span>${dish.price.toFixed(2)} €</span>
        <button onclick="addToCart('${dish.name}')">+</button>
    `;
    return dishCard;
}

function cartItemTemplate(dish) {
    return `
        <div class ="cart-item">
            <span>${dish.name} (${dish.amount})</span>
            <span>${(dish.price * dish.amount).toFixed(2)} €</span>
            <button onclick="removeFromCart('${dish.name}')">-</button>
            <button onclick="addToCart('${dish.name}')">+</button>
        </div>
    `;
}

function cartSummaryTemplate(totals) {
    return `
        <div class="cart-summary">
            <p>Zwischensumme: ${totals.subtotal.toFixed(2)} €</p>
            <p>Lieferkosten: ${totals.delivery === 0 ? "Gratis" : totals.delivery.toFixed(2) + " €"}</p>
            <strong>Gesamt: ${totals.final.toFixed(2)} €</strong>
            <button onclick="checkout()">Bestellen</button>
        </div>
    `;
}

function orderConfirmationTemplate() {
        return `
            <div class="order-confirmation">
                🎉 Vielen Dank für deine Testbestellung!
            </div>
        `;
}