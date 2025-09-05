function renderDish(dish) {
    const dishCard = document.createElement("div");
    dishCard.classList.add("dish-card");
    dishCard.innerHTML = `
        <div class="dish-img-wrapper">
            <img src="${dish.image}" alt="Bild von ${dish.name}" />
        </div>
        <div class="dish-info">
            <h3>${dish.name}</h3>
            <p>${dish.description}</p>
        </div>
        <span class="dish-price">${dish.price.toFixed(2)} €</span>
        <button class="icon-btn" onclick="addToCart('${dish.name}')" aria-label="${dish.name} zum Warenkorb hinzufügen">
            <img src="./assets/img/icon/add.png" alt="Hinzufügen Symbol" />
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
                <button onclick="addToCart('${dish.name}')" aria-label="Ein ${dish.name} hinzufügen">
                    <img src="./assets/img/icon/add.png" alt="Hinzufügen Symbol" />
                </button>
                <button onclick="removeFromCart('${dish.name}')" aria-label="Ein ${dish.name} entfernen">
                    <img src="./assets/img/icon/remove.png" alt="Entfernen Symbol" />
                </button>
                <button onclick="removeItemCompletely('${dish.name}')" aria-label="${dish.name} vollständig entfernen">
                    <img src="./assets/img/icon/delete.png" alt="Löschen Symbol" />
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
            <button class="checkout-btn" onclick="checkout()" aria-label="Zur Kasse gehen">Bestellen</button>
        </div>
    `;
}

function orderConfirmationTemplate() {
    return `
        <div class="order-confirmation" role="status" aria-live="polite">
            🎉 Vielen Dank für deine Testbestellung!
        </div>
    `;
}

function footerTemplate() {
    return `
        <footer class="footer">
            <div class="footer-columns max_width">
                <img class="footer-logo" src="./assets/img/flavortown.png" alt="Logo von Flavortown">
                <div class="footer-column logo-column">
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
                        <a href="https://www.instagram.com/accounts/login/" target="_blank" aria-label="Folge uns auf Instagram">
                            <img src="./assets/img/Logo/instagram_white.png" alt="Instagram Logo">
                        </a>
                        <a href="https://www.facebook.com/?locale=de_DE" target="_blank" aria-label="Folge uns auf Facebook">
                            <img src="./assets/img/Logo/facebook_white.png" alt="Facebook Logo">
                        </a>
                        <a href="https://x.com/i/flow/login" target="_blank" aria-label="Folge uns auf X">
                            <img src="./assets/img/Logo/X_logo_white.png" alt="X Logo">
                        </a>
                    </div>
                </div>
            </div>
            <div class="footer-bottom">
                <a href="impressum.html" target="_blank">Impressum</a> | 
                <a href="datenschutz.html" target="_blank">Datenschutz</a> | 
                <span>&copy; 2025 Jermaine Jérôme</span>
            </div>
        </footer>
    `;
}

function mobileCartButtonTemplate() {
    return `
        <div id="mobile-cart-button" onclick="toggleMobileCart()" aria-label="Warenkorb öffnen">
            🛒 <span id="mobile-cart-total">0.00 €</span>
        </div>
        <div id="mobile-cart-overlay" class="hidden" role="dialog" aria-labelledby="mobile-cart-title">
            <div class="mobile-cart">
                <h3 id="mobile-cart-title">Dein Warenkorb</h3>
                <div id="mobile-cart-items"></div>
                <div class="cart-summary">
                    <p>Zwischensumme: <span id="mobile-cart-subtotal">0.00 €</span></p>
                    <p>Lieferkosten: <span id="mobile-cart-delivery">0.00 €</span></p>
                    <strong>Gesamt: <span id="mobile-cart-sum">0.00 €</span></strong>
                </div>
                <button class="checkout-btn" onclick="checkout()" aria-label="Zur Kasse gehen">Bestellen</button>
                <button class="close-btn" onclick="toggleMobileCart()" aria-label="Warenkorb schließen">Schließen</button>
            </div>
        </div>
    `;
}

function mobileCartItemTemplate(dish) {
    return `
        <div class="cart-item">
            <span>${dish.name} (${dish.amount})</span>
            <span>${(dish.price * dish.amount).toFixed(2)} €</span>
            <div class="cart-btn">
                <button class="icon-btn add-btn" onclick="addToCart('${dish.name}')" aria-label="Ein ${dish.name} hinzufügen">
                    <img src="./assets/img/icon/add.png" alt="Hinzufügen Symbol" />
                </button>
                <button class="icon-btn remove-btn" onclick="removeFromCart('${dish.name}')" aria-label="Ein ${dish.name} entfernen">
                    <img src="./assets/img/icon/remove.png" alt="Entfernen Symbol" />
                </button>
                <button class="icon-btn delete-btn" onclick="removeItemCompletely('${dish.name}')" aria-label="${dish.name} vollständig entfernen">
                    <img src="./assets/img/icon/delete.png" alt="Löschen Symbol" />
                </button>
            </div>
        </div>
    `;
}



