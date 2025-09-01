let cart = [];


function addToCart(dishName) {
    const dish = dishes.find(d => d.name === dishName);
    if (dish) {
        dish.amount++;
        cart.push(dish);
        renderCart();
    }
}