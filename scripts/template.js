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
        <footer>
            <div class="footer-columns">
                <img class="footer-logo" src="../assets/img/flavortown.png" alt="Flavortown Logo">
                <div class="footer-column">
                    <h4>Über uns</h4>
                    <p>Wir bieten die besten Gerichte – <br> frisch, lecker und schnell bei dir.</p>
                </div>
                <div class="footer-column">
                    <h4>Kontakt</h4>
                    <p><a href="tel:0123456789">0123 456789</a></p>
                    <p><a href="mailto:jay.jero1901@gmail.com">info@meinebestellapp.de</a></p>
                </div>
                <div class="footer-column">
                    <h4>Folge uns</h4>
                    <div class="social-links">
                        <a href="https://www.instagram.com/accounts/login/" target="_blank">
                            <img src="../assets/img/Logo/instagram_white.png" alt="Instagram">
                        </a><br>
                        <a href="https://www.facebook.com/?locale=de_DE" target="_blank">
                            <img src="../assets/img/Logo/facebook_white.png" alt="Facebook">
                        </a><br>
                        <a href="https://x.com/i/flow/login" target="_blank">
                            <img src="../assets/img/Logo/X_logo_white.png" alt="X">
                        </a>
                    </div>
                </div>
            </div>
            <div class="footer-bottom">
                <a href="impressum.html" target="_blank">Impressum</a> | 
                <a href="#">Datenschutz</a> | 
                <span>&copy; 2025 Jermaine Jérôme</span>
            </div>
        </footer>
    `;
}

function mobileCartButtonTemplate() {
    return `
        <div id="mobile-cart-button" onclick="toggleMobileCart()">
            🛒 <span id="mobile-cart-total">0.00 €</span>
        </div>
        <div id="mobile-cart-overlay" class="hidden">
            <div class="mobile-cart">
                <h3>Dein Warenkorb</h3>
                <div id="mobile-cart-items"></div>
                <div class="cart-summary">
                    <strong>Gesamt: <span id="mobile-cart-sum">0.00 €</span></strong>
                </div>
                <button onclick="checkout()">Bestellen</button>
                <button onclick="toggleMobileCart()">Schließen</button>
            </div>
        </div>
    `;
}

function mobileCartItemTemplate(dish) {
    return `
        <div class="cart-item">
            <span>${dish.name} (${dish.amount})</span>
            <span>${(dish.price * dish.amount).toFixed(2)} €</span>
            <button onclick="removeFromCart('${dish.name}')">
                <img src="../assets/img/icon/remove.png" alt="-" />
            </button>
            <button onclick="addToCart('${dish.name}')">
                <img src="../assets/img/icon/add.png" alt="+" />
            </button>
            <button onclick="removeItemCompletely('${dish.name}')">
                <img src="../assets/img/icon/delete.png" alt="x" />
            </button>
        </div>
    `;
}

