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
            productContentDiv.className = 'cart__item__content';

            // création et insertion de l'élément div : cart__item__content__description
            let productContentDescriptionDiv = document.createElement('div');
            productContentDiv.appendChild(productContentDescriptionDiv);
            productContentDescriptionDiv.className = 'cart__item__content__description';

            // création et insertion de l'élément h2 + nom produit
            let productTitle = document.createElement('h2');
            productContentDescriptionDiv.appendChild(productTitle);
            productTitle.innerHTML = itemLocalStorage[item].nameItem;

            // création et insertion de l'élément p + couleur produit
            let productColor = document.createElement('p');
            productContentDescriptionDiv.appendChild(productColor);
            productColor.innerHTML = itemLocalStorage[item].colorItem;

            // création et insertion de l'élément p + prix produit
            let productPrice = document.createElement('p');
            productContentDescriptionDiv.appendChild(productPrice);
            productPrice.innerHTML = itemLocalStorage[item].priceItem + ' €';

            // création et insertion de l'élément div : cart__item__content__settings
            let productContentSettingsDiv = document.createElement('div');
            productContentDiv.appendChild(productContentSettingsDiv);
            productContentSettingsDiv.className ='cart__item__content__settings';

            //création et insertion de l'élément div : cart__item__content__settings__quantity
            let productContentSettingsQuantityDiv = document.createElement('div');
            productContentSettingsDiv.appendChild(productContentSettingsQuantityDiv);
            productContentSettingsQuantityDiv.className ='cart__item__content__settings__quantity';

            // création et insertion de l'élément p + phrase
            let productStringQuantity = document.createElement('p');
            productContentSettingsQuantityDiv.appendChild(productStringQuantity);
            productStringQuantity.innerHTML = 'Quantité : ';

            // insertion de la quantité
            let productQuantity = document.createElement('input');
            productContentSettingsQuantityDiv.appendChild(productQuantity);
            productQuantity.className ='itemQuantity';
            productQuantity.value = itemLocalStorage[item].quantityItem;
            productQuantity.setAttribute('type', 'number')
            productQuantity.setAttribute('min', '1')
            productQuantity.setAttribute('max', '100')
            productQuantity.setAttribute('name', 'itemQuantity')

        }   
    }
}

getCart();