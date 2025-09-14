document.addEventListener('DOMContentLoaded', () => {
  const catalog = document.getElementById('catalog');
  const categoryFilter = document.getElementById('categoryFilter');

  function renderCatalog(filter = 'all') {
    catalog.innerHTML = '';
    const filteredProducts = filter === 'all' ? products : products.filter(p => p.category === filter);
    if (filteredProducts.length === 0) {
      catalog.innerHTML = '<p>No products found.</p>';
      return;
    }
    filteredProducts.forEach(product => {
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <img src="${product.image || 'https://via.placeholder.com/300x200?text=Image+Not+Found'}" alt="${product.name}" class="card-image">
        <h3 class="card-title">${product.name}</h3>
        <p class="card-category">Category: ${product.category === 'autoflowers' ? 'Автоцветы' : 
                                            product.category === 'feminized' ? 'Феминизированные' : 
                                            product.category === 'regulars' ? 'Регуляры' : 
                                            product.category}</p>
        <p class="card-price">Price: $${product.price}</p>
        <p class="card-description">${product.details || 'No description available'}</p>
        <div class="card-buttons">
          <button class="btn buy-btn" data-name="${product.name}" data-price="${product.price}">Buy Now</button>
          <button class="btn cart-btn" data-name="${product.name}" data-price="${product.price}">Add to Cart</button>
          <a href="detail.html?id=${encodeURIComponent(product.name)}" class="btn details-btn">Details</a>
        </div>
      `;
      catalog.appendChild(card);

      // Обработчики для кнопок
      const buyBtn = card.querySelector('.buy-btn');
      const cartBtn = card.querySelector('.cart-btn');
      if (buyBtn) {
        buyBtn.addEventListener('click', () => {
          console.log('Buy Now clicked for:', product.name);
          if (typeof renderCartPopup !== 'undefined') {
            renderCartPopup();
          } else {
            console.error('renderCartPopup is not defined');
          }
        });
      }
      if (cartBtn) {
        cartBtn.addEventListener('click', () => {
          console.log('Add to Cart clicked for:', product.name, 'Price:', product.price);
          if (typeof addToCart !== 'undefined') {
            addToCart(product.name, product.price, 1);
            alert('Added to cart!');
          } else {
            console.error('addToCart is not defined. Check cart.js');
          }
        });
      }
    });
  }

  categoryFilter.addEventListener('change', (e) => {
    renderCatalog(e.target.value);
  });

  renderCatalog();
});