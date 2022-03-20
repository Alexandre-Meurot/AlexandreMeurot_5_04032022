// constantes qui définnissent des éléments du DOM
const img = document.querySelector('.item__img');
const title = document.getElementById('title');
const price = document.getElementById('price');
const description = document.getElementById('description');
const color = document.getElementById('colors');
const quantity = document.getElementById('quantity');
const btnAddToCart = document.getElementById('addToCart');

// ---------------------------------------------------------
// Méthode pour récupérer l'Id de l'URL de la page actuelle

let url = window.location.href;
let urlProduct = new URL(url);
let search_params = new URLSearchParams(urlProduct.search); 
let id = search_params.get('id');
// ---------------------------------------------------------

getProduct();
addToCart();

// ---------------------------------------------------------
// fonction qui récupère les données de l'API => Json

function getProduct() {
    fetch("http://localhost:3000/api/products/" + id)
    .then((data) => {
        return data.json()
    })

    .then(async function (dataProduct) {
        product = await dataProduct;
        console.table(dataProduct);
        if (product) {
            displayProduct(product)
        } else {
            alert('erreur, pas de produit sélectionner !')
        }
    })
}

// ---------------------------------------------------------
// fonction qui affiche le produit dans le DOM

function displayProduct(product) {
    
    // création de l'élément et affichage de l'image du produit dans le DOM
    let productImg = document.createElement('img');
    img.appendChild(productImg);
    productImg.src = product.imageUrl;
    productImg.alt = product.altTxt;

    // affichage du nom du produit dans le DOM
    title.innerHTML = product.name;

    // affichage du prix du produit dans le DOM
    price.innerHTML = product.price;

    // affichage de la description du produit dans le DOM
    description.innerHTML = product.description;

    // création de l'élément et affichage des otpions de couleurs dans le DOM
    for (let colors of product.colors) {
        let optionColors = document.createElement('option');
        color.appendChild(optionColors);
        optionColors.value = colors;
        optionColors.innerHTML = colors;
    }
};

// ---------------------------------------------------------

// fonction qui envoie le(s) produit(s) au Local Storage
function addToCart(product){

    btnAddToCart.addEventListener('click', () => {

        // condition qui vérifie si une couleur est bien choisi et si la quantité > 0 et < 100
        if (color.value != '' && quantity.value > 0 && quantity.value <= 100) {

            // variables contenants couleurs et quantité du produit
            let selectedColor = color.value;
            let selectedQuantity = quantity.value;
            
            // objet contenant toutes les infos du produit selectionné
            let selectedProduct = {
                idItem : id,
                nameItem : product.name,
                colorItem : selectedColor,
                quantityItem : selectedQuantity,
                priceItem : product.price,
                descritpionItem : product.description,
                imgItem : product.imageUrl,
                altImgItem : product.altTxt
            };
        
            // variable contenant le Local Storage sours forme de tableau
            localStorageProducts = [];
        
            // message de confirmation du panier
            function confirmation() {
                if(window.confirm(
                    `Vous venez d'ajouter ${selectedQuantity} * ${product.name} ( ${selectedColor} ) dans votre panier !
                    Pour consulter votre panier, cliquez sur OK`
                )) {window.location.href ="cart.html";}
            }
        
            // ajout de l'objet dans le Local Storage
            localStorageProducts.push(selectedProduct);
            localStorage.setItem('product', JSON.stringify(localStorageProducts));
            console.table(localStorageProducts)
            confirmation()
        }
    
    });
}

