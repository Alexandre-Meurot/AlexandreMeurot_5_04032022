// liens vers API = http://localhost:3000/api/products

const items = document.getElementById("items");

getProducts();
displayProducts();

async function getProducts() {
    let data = await fetch("http://localhost:3000/api/products");
    return await data.json();
}

async function displayProducts() {
    let result = await getProducts()
    .then(function (dataProduct) {
        const products = dataProduct;
        console.log(products);
    
        for (let i = 0; i < products.length; i++) {
      
            // création élément lien + injecte data
            let productLink = document.createElement("a");
            items.appendChild(productLink);
            productLink.href = `product.html?id=${dataProduct[i]._id}`;
            
            // création élément article
            let productArticle = document.createElement("article");
            productLink.appendChild(productArticle);

            // création élément img + injecte data
            let productImg = document.createElement('img');
            productArticle.appendChild(productImg);
            productImg.src = dataProduct[i].imageUrl;
            productImg.alt = dataProduct[i].altTxt;

            // création élement h3 + injecte data
            let productName = document.createElement('h3');
            productArticle.appendChild(productName);
            productName.classList.add('productName');
            productName.innerHTML = dataProduct[i].name;

            // création élément p + injecte data
            let productDescription = document.createElement('p');
            productArticle.appendChild(productDescription);
            productDescription.classList.add('productDescription');
            productDescription.innerHTML = dataProduct[i].description;
        }
    });
}
