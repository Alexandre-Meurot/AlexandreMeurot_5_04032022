const cartItem = document.getElementById("cart__items");

// Initialisation du localStorage
let itemLocalStorage = JSON.parse(localStorage.getItem("item"));
console.table(itemLocalStorage);

// RegEx
let nameRegex = new RegExp("^[a-zA-Zàâäéèêëïîôöùûüç ,.'-]+$");
let emailRegex = new RegExp(
  "^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$"
);
let adressRegex = new RegExp(
  "^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+"
);

// fetch afin de récupèrer le prix dans l'API
fetch("http://localhost:3000/api/products")
  .then((res) => res.json())
  .then((data) => {
    if (itemLocalStorage) {
      for (item of itemLocalStorage) {
        const product = data.find((data) => data._id === item.idItem);
        if (product) {
          item.priceItem = product.price;
        }
      }
    }
    getCart();
    totals();
    changeQuantity();
    deleteItem();
    getForm();
    postForm();
  })
  .catch((error) => console.error(error));

// fonction qui récupère les données du localStorage
function getCart() {
  // Si le panier est vide
  if (itemLocalStorage === null || itemLocalStorage == 0) {
    let emptyCart = document.createElement("p");
    cartItem.appendChild(emptyCart);
    emptyCart.textContent = "Votre panier est vide";
  } else {
    for (let item in itemLocalStorage) {
      // création et insertion de l'élément article + les attributs
      let productArticle = document.createElement("article");
      cartItem.appendChild(productArticle);
      productArticle.className = "cart__item";
      productArticle.setAttribute("data-id", itemLocalStorage[item].idItem);
      productArticle.setAttribute(
        "data-color",
        itemLocalStorage[item].colorItem
      );

      // création et insertion de l'élément div : cart__item__img
      let productImgDiv = document.createElement("div");
      productArticle.appendChild(productImgDiv);
      productImgDiv.className = "cart__item__img";

      // création et insertion de l'image
      let productImg = document.createElement("img");
      productImgDiv.appendChild(productImg);
      productImg.src = itemLocalStorage[item].imgItem;
      productImg.alt = itemLocalStorage[item].altImgItem;

      // création et insertion de l'élément div : cart__item__content
      let productContentDiv = document.createElement("div");
      productArticle.appendChild(productContentDiv);
      productContentDiv.className = "cart__item__content";

      // création et insertion de l'élément div : cart__item__content__description
      let productContentDescriptionDiv = document.createElement("div");
      productContentDiv.appendChild(productContentDescriptionDiv);
      productContentDescriptionDiv.className =
        "cart__item__content__description";

      // création et insertion de l'élément h2 + nom produit
      let productTitle = document.createElement("h2");
      productContentDescriptionDiv.appendChild(productTitle);
      productTitle.innerHTML = itemLocalStorage[item].nameItem;

      // création et insertion de l'élément p + couleur produit
      let productColor = document.createElement("p");
      productContentDescriptionDiv.appendChild(productColor);
      productColor.innerHTML = itemLocalStorage[item].colorItem;

      // création et insertion de l'élément p + prix produit
      let productPrice = document.createElement("p");
      productContentDescriptionDiv.appendChild(productPrice);
      productPrice.innerHTML =
        "Prix Unitaire : " + itemLocalStorage[item].priceItem + " €";

      // création et insertion de l'élément div : cart__item__content__settings
      let productContentSettingsDiv = document.createElement("div");
      productContentDiv.appendChild(productContentSettingsDiv);
      productContentSettingsDiv.className = "cart__item__content__settings";

      // création et insertion de l'élément div : cart__item__content__settings__quantity
      let productContentSettingsQuantityDiv = document.createElement("div");
      productContentSettingsDiv.appendChild(productContentSettingsQuantityDiv);
      productContentSettingsQuantityDiv.className =
        "cart__item__content__settings__quantity";

      // création et insertion de l'élément p + phrase
      let productStringQuantity = document.createElement("p");
      productContentSettingsQuantityDiv.appendChild(productStringQuantity);
      productStringQuantity.innerHTML = "Quantité : ";

      // création insertion de l'input + la quantité du produit
      let productQuantity = document.createElement("input");
      productContentSettingsQuantityDiv.appendChild(productQuantity);
      productQuantity.className = "itemQuantity";
      productQuantity.value = itemLocalStorage[item].quantityItem;
      productQuantity.setAttribute("type", "number");
      productQuantity.setAttribute("min", "1");
      productQuantity.setAttribute("max", "100");
      productQuantity.setAttribute("name", "itemQuantity");

      // création et insertion de l'élément div : cart__item__content__settings__delete
      let productContentSettingsDeleteDiv = document.createElement("div");
      productContentSettingsDiv.appendChild(productContentSettingsDeleteDiv);
      productContentSettingsDeleteDiv.className =
        "cart__item__content__settings__delete";

      // création insertion de l'élément p : suprimmer
      let productDelete = document.createElement("p");
      productContentSettingsDeleteDiv.appendChild(productDelete);
      productDelete.className = "deleteItem";
      productDelete.innerHTML = "Supprimer";
    }
  }
}

// fonction qui calcul le prix total
function totals() {
  // calcul et affichage de la quantité total d'articles dans le panier
  let itemsQuantity = document.getElementsByClassName("itemQuantity");
  let quantityLength = itemsQuantity.length;
  let quantityTotal = 0;

  for (let i = 0; i < quantityLength; i++) {
    quantityTotal += itemsQuantity[i].valueAsNumber;
  }

  let itemTotalQuantity = document.getElementById("totalQuantity");
  itemTotalQuantity.innerHTML = quantityTotal;

  // calcul et affichage du prix total dans le panier
  let priceTotal = 0;

  for (let i = 0; i < quantityLength; i++) {
    priceTotal +=
      itemsQuantity[i].valueAsNumber * itemLocalStorage[i].priceItem;
  }

  let itemTotalPrice = document.getElementById("totalPrice");
  itemTotalPrice.innerHTML = priceTotal;
}

// fonction qui permet de modifier la quantité d'un produit dans le DOM et dans le LocalStorage
function changeQuantity() {
  let itemQuantity = document.getElementsByClassName("itemQuantity");

  for (let i = 0; i < itemQuantity.length; i++) {
    itemQuantity[i].addEventListener("change", (e) => {
      e.preventDefault();

      let qttLocalStorage = itemLocalStorage[i].quantityItem;
      let qttValue = itemQuantity[i].valueAsNumber;

      let resultFind = itemLocalStorage.find(
        (item) => item.qttValue !== qttLocalStorage
      );

      resultFind.quantityItem = qttValue;
      itemLocalStorage[i].quantityItem = resultFind.quantityItem;

      localStorage.setItem("item", JSON.stringify(itemLocalStorage));
      totals();
    });
  }
}

// fonction qui supprime un proquit lors du click + message de confirmation
function deleteItem() {
  let deleteButton = document.getElementsByClassName("deleteItem");

  for (let i = 0; i < deleteButton.length; i++) {
    deleteButton[i].addEventListener("click", (e) => {
      e.preventDefault();

      let deleteId = itemLocalStorage[i].idItem;
      let deleteColor = itemLocalStorage[i].colorItem;

      // Si confirmation alors supression de l'article
      if (
        window.confirm(
          `Voulez-vous vraiment supprimer ce produit du panier ? Cliquez sur OK pour confirmer`
        )
      ) {
        itemLocalStorage = itemLocalStorage.filter(
          (item) => item.idItem !== deleteId || item.colorItem !== deleteColor
        );
        localStorage.setItem("item", JSON.stringify(itemLocalStorage));
        location.reload();
      }
    });
  }
}

// écoute et validation des champs formulaire avec regex
function getForm() {
  let firstName = document.getElementById("firstName");
  firstName.addEventListener("input", function () {
    if (nameRegex.test(firstName.value) === false) {
      document.getElementById("firstNameErrorMsg").textContent =
        "Format du prénom incorrect";
    } else {
      document.getElementById("firstNameErrorMsg").textContent = "";
    }
  });

  let lastName = document.getElementById("lastName");
  lastName.addEventListener("input", function () {
    if (nameRegex.test(lastName.value) === false) {
      document.getElementById("lastNameErrorMsg").textContent =
        "Format du nom incorrect";
    } else {
      document.getElementById("lastNameErrorMsg").textContent = "";
    }
  });

  let address = document.getElementById("address");
  address.addEventListener("input", function () {
    if (adressRegex.test(address.value) === false) {
      document.getElementById("addressErrorMsg").textContent =
        "Format de l'adresse incorrect";
    } else {
      document.getElementById("addressErrorMsg").textContent = "";
    }
  });

  let city = document.getElementById("city");
  city.addEventListener("input", function () {
    if (nameRegex.test(city.value) === false) {
      document.getElementById("cityErrorMsg").textContent =
        "Format de la ville incorrect";
    } else {
      document.getElementById("cityErrorMsg").textContent = "";
    }
  });

  let email = document.getElementById("email");
  email.addEventListener("input", function () {
    if (emailRegex.test(email.value) === false) {
      document.getElementById("emailErrorMsg").textContent =
        "Format de l'email incorrect";
    } else {
      document.getElementById("emailErrorMsg").textContent = "";
    }
  });
}

// Envoi des informations client saisi + id produit => serveur
function postForm() {
  const btnSubmit = document.getElementById("order");

  // écoute le panier au click sur le bouton 'commander'
  btnSubmit.addEventListener("click", (e) => {
    e.preventDefault();

    if (!itemLocalStorage) {
      alert("Votre panier est vide");
    } else if (
      !nameRegex.test(firstName.value) ||
      !nameRegex.test(lastName.value) ||
      !emailRegex.test(email.value) ||
      !nameRegex.test(city.value) ||
      !adressRegex.test(address.value)
    ) {
      alert("Veuillez remplir correctement les champs du formulaire");
    } else {
      // Array contenant les id des produits depuis le localStorage
      let productId = [];
      for (let i = 0; i < itemLocalStorage.length; i++) {
        productId.push(itemLocalStorage[i].idItem);
      }

      let buyOrder = {
        contact: {
          firstName: firstName.value,
          lastName: lastName.value,
          address: address.value,
          city: city.value,
          email: email.value,
        },
        products: productId,
      };
      console.log(buyOrder);

      // Option de la méthode de POST avec fetch
      const options = {
        method: "POST",
        body: JSON.stringify(buyOrder),
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
      };

      //Appel de l'API pour post les informations order
      fetch("http://localhost:3000/api/products/order", options)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          const orderId = data.orderId;
          //envoie vers la page de de confirmation
          window.location.href = "confirmation.html" + "?orderId=" + orderId;
        })
        .catch((error) => {
          alert(error);
        });
    }
  });
}
