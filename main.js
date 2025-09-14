document.addEventListener('DOMContentLoaded', () => {
  const productList = document.getElementById('product-list');
  const categoryFilter = document.getElementById('categoryFilter');
  const priceFilter = document.getElementById('priceFilter');

  // Проверка наличия элементов
  if (!productList || !categoryFilter || !priceFilter) {
    console.error('One or more DOM elements not found:', {
      productList: productList,
      categoryFilter: categoryFilter,
      priceFilter: priceFilter
    });
    return;
  }

  function renderProducts(filterCat = 'all', filterPrice = 'all') {
    productList.innerHTML = '';

    if (typeof products === 'undefined') {
      console.error('Products array is not defined. Check products.js');
      productList.innerHTML = '<p>Error: Product data not loaded</p>';
      return;
    }

    let filtered = products.filter(product => {
      let categoryMatch = filterCat === 'all' || product.category === filterCat;
      let priceMatch = true;

      if (filterPrice === 'low') priceMatch = product.price <= 20;
      if (filterPrice === 'mid') priceMatch = product.price > 20 && product.price <= 40;
      if (filterPrice === 'high') priceMatch = product.price > 40;

      return categoryMatch && priceMatch;
    });

    if (filtered.length === 0) {
      productList.innerHTML = '<p>No products found.</p>';
      return;
    }

    filtered.forEach(product => {
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <img src="${product.image || 'https://placehold.co/300x200?text=Image+Not+Available'}" alt="${product.name}" class="card-image" onerror="this.onerror=null; this.src='https://placehold.co/300x200?text=Error+Loading+Image';">
        <h3 class="card-title">${product.name}</h3>
        <p class="card-category">Category: ${product.category === 'autoflowers' ? 'Автоцветы' : 
                                            product.category === 'feminized' ? 'Феминизированные' : 
                                            product.category === 'regulars' ? 'Регуляры' : 
                                            product.category === 'mushroom' ? 'Споры грибов' : product.category}</p>
        <p class="card-price">Price: $${product.price}</p>
        <p class="card-description">${product.details || 'No description available'}</p>
        <div class="card-buttons">
          <button class="btn cart-btn" data-name="${product.name}" data-price="${product.price}">Add to Cart</button>
          <a href="detail.html?id=${encodeURIComponent(product.name)}" class="btn details-btn">Details</a>
        </div>
      `;
      productList.appendChild(card);

      // Обработчики для кнопок
      const cartBtn = card.querySelector('.cart-btn');
      const detailsLink = card.querySelector('.details-btn');
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
      if (detailsLink) {
        detailsLink.addEventListener('click', (e) => {
          console.log('Details link clicked for:', product.name);
        });
      }
    });
  }

  // Обновляем при изменении фильтров
  categoryFilter.addEventListener('change', (e) => {
    renderProducts(e.target.value, priceFilter.value);
  });
  priceFilter.addEventListener('change', (e) => {
    renderProducts(categoryFilter.value, e.target.value);
  });

  // Первичная загрузка с фильтром "Феминизированные"
  renderProducts('feminized', priceFilter.value);
});