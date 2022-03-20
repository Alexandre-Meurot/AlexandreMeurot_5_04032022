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

    } else {
        
        for (let item in itemLocalStorage) {

            // création et insertion de l'élément article + les attributs
            let productArticle = document.createElement('article');
            cartItem.appendChild(productArticle);
            productArticle.className = 'cart__item';
            productArticle.setAttribute('data-id', itemLocalStorage[item].idItem);
            productArticle.setAttribute('data-color', itemLocalStorage[item].colorItem);

            // création et insertion de l'élément div : cart__item__img
            let productImgDiv = document.createElement('div');
            productArticle.appendChild(productImgDiv);
            productImgDiv.className = 'cart__item__img';

            // création et insertion de l'image
            let productImg = document.createElement('img');
            productImgDiv.appendChild(productImg);
            productImg.src = itemLocalStorage[item].imgItem;
            productImg.alt = itemLocalStorage[item].altImgItem;

            // création et insertion de l'élément div : cart__item__content
            let productContentDiv = document.createElement('div');
            productArticle.appendChild(productContentDiv);
            productContentDiv.classList = 'cart__item__content';

            // création et insertion de l'élément div : cart__item__content__description
            let productContentDescriptionDiv = document.createElement('div');
            productContentDiv.appendChild(productContentDescriptionDiv);
            productContentDescriptionDiv.classList = 'cart__item__content__description';

            // création et insertion de l'élément h2 + nom du produit
            let productTitle = document.createElement('h2');
            productContentDescriptionDiv.appendChild(productTitle);
            productTitle.innerHTML = itemLocalStorage[item].nameItem;
        }
    }
}

getCart();