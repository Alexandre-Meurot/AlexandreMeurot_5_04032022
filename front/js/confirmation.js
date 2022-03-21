// fonction qui récupère l'ID grâce à l'URL de la page
function displayOrderId() {
    
    const id = new URL(window.location.href).searchParams.get("id");
    const orderId = document.getElementById('orderId');

    console.log(id);
    orderId.innerHTML = id;

    // nettoie le localStorage
    localStorage.clear();
};

displayOrderId();