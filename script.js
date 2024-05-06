document.addEventListener("DOMContentLoaded", function () {
  const productList = document.getElementById("productList");
  const cartList = document.getElementById("cartList");
  const totalAmount = document.getElementById("totalAmount");
  const clearCartBtn = document.getElementById("clearCart");

  let products = [
    { id: 1, name: "Camiseta", price: 15 },
    { id: 2, name: "Pantalón", price: 30 },
    { id: 3, name: "Zapatos", price: 50 },
    { id: 4, name: "Gorra", price: 10 },
  ];

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  function renderProducts() {
    productList.innerHTML = "";
    products.forEach((product) => {
      const li = document.createElement("li");
      li.innerHTML = `${product.name} - ${product.price}€ <button class="addBtn" data-id="${product.id}">Agregar al Carrito</button>`;
      productList.appendChild(li);
    });
  }

  function renderCart() {
    cartList.innerHTML = "";
    let total = 0;
    cart.forEach((item) => {
      const li = document.createElement("li");
      const product = products.find((prod) => prod.id === item.id);
      const subtotal = product.price * item.quantity;
      total += subtotal;
      li.innerHTML = `${product.name} x ${item.quantity} - ${subtotal}€ <button class="removeBtn" data-id="${product.id}">Eliminar</button>`;
      cartList.appendChild(li);
    });
    totalAmount.textContent = total;
  }

  function addToCart(productId) {
    const existingItem = cart.find((item) => item.id === productId);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      cart.push({ id: productId, quantity: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
  }

  function removeFromCart(productId) {
    cart = cart.filter((item) => item.id !== productId);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
  }

  renderProducts();
  renderCart();

  productList.addEventListener("click", function (e) {
    if (e.target.classList.contains("addBtn")) {
      const productId = parseInt(e.target.getAttribute("data-id"));
      addToCart(productId);
    }
  });

  cartList.addEventListener("click", function (e) {
    if (e.target.classList.contains("removeBtn")) {
      const productId = parseInt(e.target.getAttribute("data-id"));
      removeFromCart(productId);
    }
  });

  clearCartBtn.addEventListener("click", function () {
    cart = [];
    localStorage.removeItem("cart");
    renderCart();
  });
});
