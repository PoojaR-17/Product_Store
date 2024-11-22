const apiURL = 'https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-products';
let products = [];
let currentPage = 1;
const itemsPerPage = 10;

async function fetchProducts() {
  try {
    const response = await fetch(apiURL);
    const data = await response.json();
    products = data.data;
    displayProducts();
    setupPagination();
    populateCategories();
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}
function displayProducts() {
    const productContainer = document.getElementById('product-list');
    const paginatedProducts = paginate(products, currentPage, itemsPerPage);
    productContainer.innerHTML = paginatedProducts.map(product => `
      <div class="product-card">
        <img src="${product.image}" alt="${product.title}" class="product-image"/>
        <h2>${product.title}</h2>
        <p>Category: ${product.category}</p>
        <p>Price: $${product.price}</p>
        <button onclick="addToCart(${product.id})">Add to Cart</button>
      </div>
    `).join('');
  }
  

function paginate(items, page, perPage) {
  const start = (page - 1) * perPage;
  return items.slice(start, start + perPage);
}

function setupPagination() {
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const paginationContainer = document.getElementById('pagination');
  paginationContainer.innerHTML = Array.from({ length: totalPages }, (_, i) => `
    <button onclick="changePage(${i + 1})">${i + 1}</button>
  `).join('');
}

function changePage(page) {
  currentPage = page;
  displayProducts();
}

function addToCart(id) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const product = products.find(p => p.id === id);
  if (product) {
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert("Product added to cart!");
  }
}

function populateCategories() {
  const categories = [...new Set(products.map(p => p.category))];
  const categoryFilter = document.getElementById('category-filter');
  categoryFilter.innerHTML += categories.map(cat => `<option value="${cat}">${cat}</option>`).join('');
  categoryFilter.addEventListener('change', filterProducts);
}

function filterProducts() {
  const category = document.getElementById('category-filter').value;
  const sort = document.getElementById('sort-filter').value;

  let filteredProducts = products;
  if (category) {
    filteredProducts = filteredProducts.filter(p => p.category === category);
  }
  if (sort === 'price-asc') {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sort === 'price-desc') {
    filteredProducts.sort((a, b) => b.price - a.price);
  }
  products = filteredProducts;
  displayProducts();
}

document.addEventListener('DOMContentLoaded', fetchProducts);
