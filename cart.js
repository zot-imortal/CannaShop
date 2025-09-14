let cart = (() => {
  try {
    const storedCart = localStorage.getItem('cart');
    const parsedCart = JSON.parse(storedCart);
    return Array.isArray(parsedCart) ? parsedCart : [];
  } catch (e) {
    console.error('Error parsing cart from localStorage:', e);
    return [];
  }
})();

function addToCart(productName, price, quantity) {
  console.log('Adding to cart:', productName, price, quantity);
  if (!productName || !price || !quantity) {
    console.error('Invalid parameters for addToCart:', { productName, price, quantity });
    return;
  }
  const existingItem = cart.find(item => item.name === productName);
  if (existingItem) {
    existingItem.quantity += quantity;
    existingItem.price += price * quantity;
  } else {
    cart.push({ name: productName, price: price * quantity, quantity });
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartDisplay();
  console.log('Cart after add:', cart);
}

function removeFromCart(productName) {
  cart = cart.filter(item => item.name !== productName);
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartDisplay();
  renderCartPopup();
}

function updateCartDisplay() {
  const cartCount = document.querySelectorAll('.cart-count');
  cartCount.forEach(count => {
    const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
    count.textContent = totalQuantity > 0 ? totalQuantity : '0';
  });
}

function renderCartPopup() {
  console.log('Rendering cart popup, cart:', cart);
  let cartPopup = document.getElementById('cartPopup');
  if (!cartPopup) {
    cartPopup = document.createElement('div');
    cartPopup.id = 'cartPopup';
    cartPopup.className = 'cart-popup';
    document.body.appendChild(cartPopup);
    console.log('Cart popup created');
  }

  cartPopup.innerHTML = '';
  if (cart.length === 0) {
    cartPopup.innerHTML = '<div class="cart-popup-content"><p>Your cart is empty.</p><button class="close-btn">Close</button></div>';
  } else {
    const cartItems = cart.map(item => `
      <div class="cart-item">
        <span>${item.name} x${item.quantity} - $${item.price.toFixed(2)}</span>
        <button class="remove-btn" data-id="${item.name}">Remove</button>
      </div>
    `).join('');
    const total = cart.reduce((sum, item) => sum + item.price, 0).toFixed(2);
    cartPopup.innerHTML = `
      <div class="cart-popup-content">
        <h2 class="cart-title">Cart</h2>
        ${cartItems}
        <p class="cart-total">Total: $${total}</p>
        <a href="cart.html" class="btn view-cart-btn">View Full Cart</a>
        <button class="close-btn">Close</button>
      </div>
    `;
  }

  const removeButtons = cartPopup.querySelectorAll('.remove-btn');
  removeButtons.forEach(button => {
    button.addEventListener('click', () => {
      console.log('Remove clicked for:', button.getAttribute('data-id'));
      removeFromCart(button.getAttribute('data-id'));
    });
  });

  const closeButton = cartPopup.querySelector('.close-btn');
  if (closeButton) {
    closeButton.addEventListener('click', () => {
      cartPopup.style.display = 'none';
    });
  }

  cartPopup.style.display = 'block';
  console.log('Cart popup displayed');
}

// Обработчик клика на кнопку корзины
document.addEventListener('DOMContentLoaded', () => {
  const cartButton = document.querySelector('.cart a');
  if (cartButton) {
    console.log('Cart button found');
    cartButton.addEventListener('click', (e) => {
      e.preventDefault();
      console.log('Cart button clicked');
      renderCartPopup();
    });
  } else {
    console.error('Cart button not found');
  }

  updateCartDisplay();
});