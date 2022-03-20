const cartItem = document.getElementById('cart__items');

// Initialisation du localStorage
let itemLocalStorage = JSON.parse(localStorage.getItem("item"));
console.table(itemLocalStorage);

// fonction qui récupère les données du localStorage
function getCart() {

    // Si le panier est vide
    if (itemLocalStorage === null || itemLocalStorage == 0) {
        let emptyCart = document.createElement('p');
        cartItem.appendChild(emptyCart);
        emptyCart.textContent = 'Votre panier est vide'
    }
}

getCart();