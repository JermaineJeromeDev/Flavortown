function renderDish(dish) {
    const dishCard = document.createElement("div");
    dishCard.classList.add("dish-card");
    dishCard.innerHTML = `
        <img src="${dish.image}" alt="${dish.name}">
        <h3>${dish.name}</h3>
        <p>${dish.description}</p>
        <span>${dish.price.toFixed(2)} €</span>
        <button class="icon-btn" onclick="addToCart('${dish.name}')">
            <img src="../assets/img/icon/add.png" alt="Hinzufügen" />
        </button>
    `;
    return dishCard;
}

function cartItemTemplate(dish) {
    return `
        <div class="cart-item">
            <span>${dish.name} (${dish.amount})</span>
            <span>${(dish.price * dish.amount).toFixed(2)} €</span>
            <div class="cart-btn">
                <button class="icon-btn" onclick="addToCart('${dish.name}')">
                    <img src="../assets/img/icon/add.png" alt="Hinzufügen" />
                </button>
                
                <button class="icon-btn" onclick="removeFromCart('${dish.name}')">
                    <img src="../assets/img/icon/remove.png" alt="Entfernen" />
                </button>
                
                <button class="icon-btn" onclick="removeItemCompletely('${dish.name}')">
                    <img src="../assets/img/icon/delete.png" alt="Löschen" />
                </button>
            </div>
        </div>
    `;
}

function cartSummaryTemplate(totals) {
    return `
        <div class="cart-summary">
            <p>Zwischensumme: ${totals.subtotal.toFixed(2)} €</p>
            <p>Lieferkosten: ${totals.delivery === 0 ? "Gratis" : totals.delivery.toFixed(2) + " €"}</p>
            <strong>Gesamt: ${totals.final.toFixed(2)} €</strong>
            <button class="checkout-btn" onclick="checkout()">Bestellen</button>
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

function footerTemplate() {
    return `
        <footer class="footer">
            <div class="footer-column">
                <h3>Über uns</h3>
                <p>Wir bieten die besten Gerichte – frisch, lecker und schnell bei dir.</p>
            </div>
            <div class="footer-column">
                <h3>Kontakt</h3>
                <p>Email: <a href=mailto:"jay.jero1901.gmail.com">info@meinebestellapp.de</p>
                <p>Tel: <a href="tel: 0123456789>0123" 456789</p>
            </div>
            <div class="footer-column">
                <h3>Folge uns</h3>
                <div class="social-links">
                    <a href="#">
                        <img src="../assets/img/Logo/instagram_white.png">
                    /a><br>
                    <a href="#">
                        <img src="../assets/img/Logo/facebook_white.png"
                    </a><br>
                    <a href="#">
                        <img src="../assets/img/Logo/X_logo_white.png"
                    </a>
                </div>
            </div>
        </footer>
    `;
}