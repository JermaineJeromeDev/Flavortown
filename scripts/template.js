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