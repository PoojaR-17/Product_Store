function displayCart() {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const cartContainer = document.getElementById('cart-list');
    cartContainer.innerHTML = cartItems.length ? cartItems.map(item => `
      <div class="cart-item">
        <h2>${item.title}</h2>
        <p>Price: $${item.price}</p>
        <button onclick="removeFromCart(${item.id})">Remove</button>
      </div>
    `).join('') : `<p>Your cart is empty.</p>`;
  }
  
  function removeFromCart(id) {
    let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    cartItems = cartItems.filter(item => item.id !== id);
    localStorage.setItem('cart', JSON.stringify(cartItems));
    displayCart();
  }
  
  document.addEventListener('DOMContentLoaded', displayCart);
  