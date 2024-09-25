// Getting all required elements from the DOM
const addToCartBtn = document.getElementById("add-to-cart");
const viewCartBtn = document.getElementById("view-cart");
const cartCountEl = document.getElementById("cart-count");
const cartItemsEl = document.getElementById("cart-items");
const totalPriceEl = document.getElementById("total-price");
const quantityInput = document.getElementById("quantity");
const cartModal = document.getElementById("cart-modal"); // Modal element
const closeModalBtn = document.getElementById("close-modal"); // Close button for modal

// Initial cart data from local storage
let cart = JSON.parse(localStorage.getItem("cart")) || []; // default value is an empty array

// Function to update cart UI inside the modal
function updateCartUI() {
  cartItemsEl.innerHTML = ""; // clear previous cart items
  let total = 0;
  // Loop through cart items and display them in the modal
  cart.forEach((item, index) => {
    const itemDiv = document.createElement("div"); // Create a new div element
    itemDiv.innerHTML = ` 
      <span>${item.name} - $${item.price} x ${item.quantity}</span>
      <button data-index="${index}" class="remove-item">Remove</button> 
    `;
    cartItemsEl.appendChild(itemDiv); //ensures that the new cart item is displayed in the modal
    total += item.price * item.quantity;
  });

  totalPriceEl.textContent = total.toFixed(2); // format the total price to two decimal places
  cartCountEl.textContent = cart.length; // update the cart count
}

// Function to add product to cart
addToCartBtn.addEventListener("click", () => {
  const quantity = parseInt(quantityInput.value);
  const productName = document.querySelector("h2").textContent; // Get the value of product name from the <h2> element
  const productPrice = parseFloat(
    document.querySelector(".price-value").textContent.replace("$", "")
  );
  const product = {
    name: productName,
    price: productPrice,
    quantity,
  };

  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartUI();
});

// Function to open the modal
function openModal() {
  cartModal.classList.add("show");
  updateCartUI();
}

// Function to close the modal
function closeModal() {
  cartModal.classList.remove("show");
}

// View Cart Button: Open the modal to show the cart
viewCartBtn.addEventListener("click", openModal);

// Close modal when the close button is clicked
closeModalBtn.addEventListener("click", closeModal);

// Close modal when clicking outside the modal content
window.addEventListener("click", (event) => {
  if (event.target === cartModal) {
    closeModal();
  }
});

// Remove item from cart
cartItemsEl.addEventListener("click", (e) => {
  if (e.target.classList.contains("remove-item")) {
    const index = e.target.getAttribute("data-index"); // Get the index of the item to be removed
    cart.splice(index, 1); // Remove the item from the cart array at the specified index
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartUI();
  }
});

// Initialize cart on page load
window.addEventListener("load", updateCartUI);
