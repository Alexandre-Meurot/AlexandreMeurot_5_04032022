// constantes qui définnissent des éléments du DOM
const img = document.querySelector('.item__img');
const title = document.getElementById('title');
const price = document.getElementById('price');
const description = document.getElementById('description');
const selectColors = document.getElementById('colors');


// Méthode pour récupérer l'Id de l'URL de la page actuelle

let url = window.location.href;
let urlProduct = new URL(url);
var search_params = new URLSearchParams(urlProduct.search); 

if(search_params.has('id')) {
	var id = search_params.get('id');
}
// ---------------------------------------------------------

getProduct();

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
        selectColors.appendChild(optionColors);
        optionColors.value = colors;
        optionColors.innerHTML = colors;
    }
}

