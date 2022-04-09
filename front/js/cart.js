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
            productPrice.innerHTML = 'Prix Unitaire : ' + itemLocalStorage[item].priceItem + ' €';

            // création et insertion d'un l'élément p + calcul du sous-total
            let productPriceTotal = document.createElement('p');
            productContentDescriptionDiv.appendChild(productPriceTotal);
            productPriceTotal.innerHTML = 'Sous-Total : ' + (itemLocalStorage[item].priceItem * itemLocalStorage[item].quantityItem) + ' €';

            // création et insertion de l'élément div : cart__item__content__settings
            let productContentSettingsDiv = document.createElement('div');
            productContentDiv.appendChild(productContentSettingsDiv);
            productContentSettingsDiv.className ='cart__item__content__settings';

            // création et insertion de l'élément div : cart__item__content__settings__quantity
            let productContentSettingsQuantityDiv = document.createElement('div');
            productContentSettingsDiv.appendChild(productContentSettingsQuantityDiv);
            productContentSettingsQuantityDiv.className ='cart__item__content__settings__quantity';

            // création et insertion de l'élément p + phrase
            let productStringQuantity = document.createElement('p');
            productContentSettingsQuantityDiv.appendChild(productStringQuantity);
            productStringQuantity.innerHTML = 'Quantité : ';

            // création insertion de l'input + la quantité du produit
            let productQuantity = document.createElement('input');
            productContentSettingsQuantityDiv.appendChild(productQuantity);
            productQuantity.className ='itemQuantity';
            productQuantity.value = itemLocalStorage[item].quantityItem;
            productQuantity.setAttribute('type', 'number');
            productQuantity.setAttribute('min', '1');
            productQuantity.setAttribute('max', '100');
            productQuantity.setAttribute('name', 'itemQuantity');

            // création et insertion de l'élément div : cart__item__content__settings__delete
            let productContentSettingsDeleteDiv = document.createElement('div');
            productContentSettingsDiv.appendChild(productContentSettingsDeleteDiv);
            productContentSettingsDeleteDiv.className = 'cart__item__content__settings__delete';

            // création insertion de l'élément p : suprimmer
            let productDelete = document.createElement('p');
            productContentSettingsDeleteDiv.appendChild(productDelete);
            productDelete.className = 'deleteItem';
            productDelete.innerHTML = 'Supprimer';
            
            
        }   
    }
};

getCart();

// fonction qui calcul le prix total
function totals() {
    
    // calcul et affichage de la quantité total d'articles dans le panier
    let itemsQuantity = document.getElementsByClassName('itemQuantity')
    let quantityLength = itemsQuantity.length;
    let quantityTotal = 0;

    for (let i = 0 ; i < quantityLength ; i++) {
        quantityTotal += itemsQuantity[i].valueAsNumber;
    }

    let itemTotalQuantity = document.getElementById('totalQuantity');
    itemTotalQuantity.innerHTML = quantityTotal;


    // calcul et affichage du prix total dans le panier
    let priceTotal = 0

    for (let i = 0 ; i < quantityLength ; i++) {
        priceTotal += (itemsQuantity[i].valueAsNumber * itemLocalStorage[i].priceItem)
    }
    
    let itemTotalPrice = document.getElementById('totalPrice');
    itemTotalPrice.innerHTML = priceTotal;
    

};

totals();


// fonction qui permet de modifier la quantité d'un produit dans le DOM et dans le LocalStorage
function changeQuantity() {

    let itemQuantity = document.getElementsByClassName('itemQuantity');

    for (let i = 0 ; i < itemQuantity.length ; i++) {

        itemQuantity[i].addEventListener('change', (e) => {
            e.preventDefault();

            let qttLocalStorage = itemLocalStorage[i].quantityItem;
            let qttValue = itemQuantity[i].valueAsNumber;

            let resultFind = itemLocalStorage.find((item) => item.qttValue !== qttLocalStorage);
            
            resultFind.quantityItem = qttValue;
            itemLocalStorage[i].quantityItem =resultFind.quantityItem;

            localStorage.setItem('item', JSON.stringify(itemLocalStorage));

            location.reload();

        })
    }
};

changeQuantity();


// fonction qui supprime un proquit lors du click + message de confirmation
function deleteItem() {

    let deleteButton = document.getElementsByClassName('deleteItem');

    for (let i = 0 ; i < deleteButton.length ; i++) {

        deleteButton[i].addEventListener('click', (e) => {
            e.preventDefault();

            let deleteId = itemLocalStorage[i].idItem;
            let deleteColor = itemLocalStorage[i].colorItem;

            // Si confirmation alors supression de l'article
            if(window.confirm(`Voulez-vous vraiment supprimer ce produit du panier ? Cliquez sur OK pour confirmer`)) {

                itemLocalStorage = itemLocalStorage.filter(item => item.idItem !== deleteId || item.colorItem !== deleteColor);
                localStorage.setItem('item', JSON.stringify(itemLocalStorage));
                location.reload();
            }  
        })
    }
};

deleteItem();


// écoute et validation des champs formulaire avec regex
function getForm() {

    let form = document.querySelector('.cart__order__form');

    let emailRegExp = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$');
    let charRegExp = new RegExp("^[a-zA-Z ,.'-]+$");
    let addressRegExp = new RegExp("^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+");

    // Ecoute de la modification du prénom
    form.firstName.addEventListener('change', function() {
        validFirstName(this);
    });

    // Ecoute de la modification du nom
    form.lastName.addEventListener('change', function() {
        validLastName(this);
    });

    // Ecoute de la modification de l'adresse
    form.address.addEventListener('change', function() {
        validAddress(this);
    });

    // Ecoute de la modification de la ville
    form.city.addEventListener('change', function() {
        validCity(this);
    });

    // Ecoute de la modification de l'adresse mail
    form.email.addEventListener('change', function() {
        validEmail(this);
    });

    // validation du prénom
    const validFirstName = function(inputFirstName) {
        let firstNameErrorMsg = inputFirstName.nextElementSibling;

        if (charRegExp.test(inputFirstName.value)) {
            firstNameErrorMsg.innerHTML = '';
        } else {
            firstNameErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
        }
    };

    // validation du nom
    const validLastName = function(inputLastName) {
        let lastNameErrorMsg = inputLastName.nextElementSibling;

        if (charRegExp.test(inputLastName.value)) {
            lastNameErrorMsg.innerHTML = '';
        } else {
            lastNameErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
        }
    };

    // validation de l'adresse
    const validAddress = function(inputAddress) {
        let addressErrorMsg = inputAddress.nextElementSibling;

        if (addressRegExp.test(inputAddress.value)) {
            addressErrorMsg.innerHTML = '';
        } else {
            addressErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
        }
    };

    // validation de la ville
    const validCity = function(inputCity) {
        let cityErrorMsg = inputCity.nextElementSibling;

        if (charRegExp.test(inputCity.value)) {
            cityErrorMsg.innerHTML = '';
        } else {
            cityErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
        }
    };

    // validation de l'adresse mail
    const validEmail = function(inputEmail) {
        let emailErrorMsg = inputEmail.nextElementSibling;

        if (emailRegExp.test(inputEmail.value)) {
            emailErrorMsg.innerHTML = '';
        } else {
            emailErrorMsg.innerHTML = 'Veuillez renseigner votre email.';
        }
    };
};

getForm();


// Envoi des informations client saisi + id produit => serveur
function postForm() {

    const btnSubmit = document.getElementById('order');

    // écoute le panier au click sur le bouton 'commander'
    btnSubmit.addEventListener('click' , (e) => {

        let inputFirstName = document.getElementById('firstName');
        let inputLastName = document.getElementById('lastName');
        let inputAddress = document.getElementById('address');
        let inputCity = document.getElementById('city');
        let inputEmail = document.getElementById('email');

        // Objet contenant les infos clients 
        const contact = {
            firstName: inputFirstName.value,
            lastName: inputLastName.value,
            address: inputAddress.value,
            city: inputCity.value,
            email: inputEmail.value,
        };
        
        // Array contenant les id des produits depuis le localStorage
        let products = [];
        for (let i = 0 ; i < itemLocalStorage.length ; i++) {
            products.push(itemLocalStorage[i].idItem);
        };

        // Objet contenant les infos clients + les id produits
        const order = {
            contact,
            products,
        };

        // Option de la méthode de POST avec fetch
        const options = {
            method: 'POST',
            body: JSON.stringify(order),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        };

        // Appel de l'API pour POST les informations 'order'
        fetch('http://localhost:3000/api/products/order', options)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            // Envoie de orderId vers le Local Storage
            localStorage.setItem('orderId', data.orderId);
            // Renvoie vers la page de confirmation
            const url = 'confirmation.html?id='+ data.orderId;
            document.location.href = url;
        })
        .catch((err) => {
            alert ('Problème avec fetch : ' + err.message);
        });
    })
};

postForm();