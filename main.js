document.addEventListener('DOMContentLoaded', () => {
  const productList = document.getElementById('product-list');
  const categoryFilter = document.getElementById('categoryFilter');
  const priceFilter = document.getElementById('priceFilter');
  const searchForm = document.getElementById('searchForm');
  const searchInput = document.getElementById('searchInput');
  const productSuggestions = document.getElementById('productSuggestions');

  if (!productList || !categoryFilter || !priceFilter || !searchForm || !searchInput || !productSuggestions) {
    console.error('One or more DOM elements not found:', {
      productList, categoryFilter, priceFilter, searchForm, searchInput, productSuggestions
    });
    return;
  }

  // Заполняем datalist автозаполнением на основе названий продуктов
  if (typeof products !== 'undefined') {
    products.forEach(product => {
      const option = document.createElement('option');
      option.value = product.name;
      productSuggestions.appendChild(option);
    });
  } else {
    console.error('Products array is not defined. Check products.js');
  }

  function renderProducts(filterCat = 'all', filterPrice = 'all', searchTerm = '') {
    productList.innerHTML = '';

    if (typeof products === 'undefined') {
      productList.innerHTML = '<p>Error: Product data not loaded</p>';
      return;
    }

    let filtered = products.filter(product => {
      const categoryMatch = filterCat === 'all' || product.category === filterCat;
      const priceMatch = filterPrice === 'all' ||
        (filterPrice === 'low' && product.price <= 20) ||
        (filterPrice === 'mid' && product.price > 20 && product.price <= 40) ||
        (filterPrice === 'high' && product.price > 40);

      return categoryMatch && priceMatch;
    });

    if (filtered.length === 0) {
      productList.innerHTML = '<p>No products found. Try adjusting your filters.</p>';
      return;
    }

    filtered.forEach(product => {
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <img src="${product.image || 'https://placehold.co/300x200?text=Image+Not+Available'}" alt="${product.name}" class="card-image" width="250" height="200">
        <h3 class="card-title">${product.name}</h3>
        <p class="card-category">Category: ${product.category === 'autoflowers' ? 'Автоцветы' : 
                                            product.category === 'feminized' ? 'Феминизированные' : 
                                            product.category === 'regulars' ? 'Регуляры' : 
                                            product.category === 'mushroom' ? 'Споры грибов' : product.category}</p>
        <p class="card-price">Price: $${product.price}</p>
        <div class="card-buttons">
          <button class="btn cart-btn" data-name="${product.name}" data-price="${product.price}">Add to Cart</button>
          <a href="detail.html?id=${encodeURIComponent(product.name)}" class="btn details-btn">Details</a>
        </div>
      `;
      productList.appendChild(card);

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

  // Обработчик формы поиска для перенаправления на детали
  searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const searchTerm = searchInput.value.trim();
    if (searchTerm) {
      const product = products.find(p => p.name.toLowerCase() === searchTerm.toLowerCase());
      if (product) {
        window.location.href = `detail.html?id=${encodeURIComponent(product.name)}`;
      } else {
        alert('Product not found. Please select a valid product from suggestions.');
      }
    }
  });

  // Обновление при изменении фильтров
  const updateFilters = () => {
    renderProducts(categoryFilter.value, priceFilter.value);
  };

  categoryFilter.addEventListener('change', updateFilters);
  priceFilter.addEventListener('change', updateFilters);

  // Первичная загрузка с фильтром "Феминизированные"
  renderProducts('feminized', priceFilter.value);
});