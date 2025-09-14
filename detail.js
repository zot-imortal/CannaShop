document.addEventListener('DOMContentLoaded', () => {
  console.log('Detail script loaded');

  const urlParams = new URLSearchParams(window.location.search);
  const productName = decodeURIComponent(urlParams.get('id'));
  console.log('Product name from URL:', productName);

  if (typeof products === 'undefined') {
    console.error('Products array is not defined. Check products.js');
    document.getElementById('detailTitle').textContent = 'Error: Product data not loaded';
    return;
  }

  const product = products.find(p => p.name === productName);
  console.log('Found product:', product);

  const detailTitle = document.getElementById('detailTitle');
  const detailImage = document.getElementById('detailImage');
  const detailDescription = document.getElementById('detailDescription');
  const addToCartBtn = document.getElementById('addToCartBtn');
  const buyBtn = document.getElementById('buyBtn');
  const selectedQuantity = document.getElementById('selectedQuantity');
  const quantityButtons = document.querySelectorAll('.quantity-btn');

  if (!detailTitle || !detailImage || !detailDescription || !addToCartBtn || !buyBtn || !selectedQuantity) {
    console.error('One or more DOM elements not found');
    return;
  }

  if (product) {
    detailTitle.textContent = product.name;
    detailImage.src = product.image || 'https://via.placeholder.com/300x200?text=Image+Not+Found';
    detailDescription.textContent = product.details || 'No detailed description available';
  } else {
    detailTitle.textContent = 'Product Not Found';
    detailDescription.textContent = 'The requested product could not be found';
  }

  // Обработчики для кнопок количества
  quantityButtons.forEach(button => {
    button.addEventListener('click', () => {
      const quantity = parseInt(button.getAttribute('data-quantity'));
      selectedQuantity.textContent = `Selected: ${quantity} seeds`;
      selectedQuantity.style.display = 'block';
      addToCartBtn.style.display = 'block';
      buyBtn.style.display = 'block';
      addToCartBtn.setAttribute('data-quantity', quantity);
      buyBtn.setAttribute('data-quantity', quantity);
      console.log('Quantity selected:', quantity);
    });
  });

  // Обработчик для добавления в корзину
  addToCartBtn.addEventListener('click', () => {
    const quantity = parseInt(addToCartBtn.getAttribute('data-quantity'));
    console.log('Add to Cart clicked, quantity:', quantity, 'product:', product);
    alert('Added to cart!'); // Добавлен алерт для отладки
    if (product && quantity && typeof addToCart !== 'undefined') {
      addToCart(product.name, product.price, quantity);
      // Показываем мини-корзину
      const cartPreview = document.createElement('div');
      cartPreview.className = 'cart-preview';
      const cartItem = cart.find(item => item.name === product.name);
      if (cartItem) {
        cartPreview.innerHTML = `
          <h3>Cart Preview</h3>
          <p>${cartItem.name} x${cartItem.quantity} - $${cartItem.price}</p>
          <button class="btn continue-btn">Continue Shopping</button>
          <a href="cart.html" class="btn view-cart-btn">View Cart</a>
        `;
        document.querySelector('.product-detail').appendChild(cartPreview);
        document.querySelector('.continue-btn').addEventListener('click', () => {
          cartPreview.remove();
          window.location.href = 'catalog.html';
        });
        document.querySelector('.view-cart-btn').addEventListener('click', () => {
          cartPreview.remove();
          window.location.href = 'cart.html';
        });
      } else {
        console.error('Cart item not found after adding');
      }
    } else {
      console.error('Add to Cart failed: product, quantity, or addToCart not available');
    }
  });

  // Обработчик для кнопки "Купить"
  buyBtn.addEventListener('click', () => {
    const quantity = parseInt(buyBtn.getAttribute('data-quantity'));
    console.log('Buy clicked, quantity:', quantity, 'product:', product);
    if (product && quantity && typeof addToCart !== 'undefined') {
      addToCart(product.name, product.price, quantity);
      alert('Purchased and added to cart!');
      renderCartPopup(); // Показываем поп-ап с корзиной
    } else {
      console.error('Buy failed: product, quantity, or addToCart not available');
    }
  });
});