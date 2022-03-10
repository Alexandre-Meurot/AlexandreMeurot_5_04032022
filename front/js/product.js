// constantes qui définnissent des éléments du DOM
const img = document.querySelector('.item__img');
const title = document.getElementById('title');
const price = document.getElementById('price');
const description = document.getElementById('description');


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

// fonction qui affiche tous les produits dans le DOM
function displayProduct(product) {
    
    let productImg = document.createElement('img');
    img.appendChild(productImg);
    productImg.src = product.imageUrl;
    productImg.alt = product.altTxt;

    title.innerHTML = product.name;

    price.innerHTML = product.price;

    description.innerHTML = product.description;
}

