function renderDish(dish) {
    const dishCard = document.createElement("div");
    dishCard.classList.add("dish-card");
    dishCard.innerHTML = `
        <h3>${dish.name}</h3>
        <p>${dish.description}</p>
        <span>${dish.price.toFixed(2)} €</span>
        <button onclick="addToCart('${dish.name}')">+</button>
    `;
    return dishCard;
}


function renderDishes() {
    const container = document.getElementById("dishes-container");
    container.innerHTML = "";

    const subCategories = [...new Set(dishes.map(d => d.subCategory))];

    subCategories.forEach(subCat => {

        const section = document.createElement("div");
        section.classList.add("sub-category-section");
        section.innerHTML = `<h2>${subCat}</h2>`;

        dishes
            .filter(d => d.subCategory === subCat)
            .forEach(dish => section.appendChild(renderDish(dish)));

        container.appendChild(section);
    });
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