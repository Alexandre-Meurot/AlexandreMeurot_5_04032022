// liens vers API = http://localhost:3000/api/products

const items = document.getElementById('items');

let products = [];


// Fonction qui récupère la data de l'API pour la stocké dans productsData[]

const fetchProducts = async () => {
    await fetch('http://localhost:3000/api/products')
        .then((res) => res.json())
        .then((data) => {
            products = data;
            console.log(data[0]);
        })
};

fetchProducts();



