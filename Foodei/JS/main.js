const API_URL =
  "https://gist.githubusercontent.com/138momen/fffa5570c7d705de4148cb496e835366/raw/DBFoodieProject.json";

const popularContainer = document.querySelector("#popularProducts");
const viewall = document.querySelector("#viewall");

let products = [];
let popularProducts = [];
let showAll = false;

// Get Products
async function getPopularProducts() {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    const data = await response.json();

    products = data.menu;  

    popularProducts = [...data.menu]
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 8);

    displayPopularProducts();
    updateCategoryCounts();  
  } catch (error) {
    console.error(error);
  }
}

// =====================================================
// UPDATE CATEGORY COUNTS
// =====================================================

function updateCategoryCounts() {
  const categories = ["Pizza", "Burger", "Pasta", "Dessert", "Drinks"];

  categories.forEach((category) => {
    const count = products.filter(
      (product) => product.category === category,
    ).length;

    const countElement = document.querySelector(`#${category}Count`);

    if (countElement) {
      countElement.textContent = `${count} items`;
    }
  });
}

// Display Products
function displayPopularProducts() {
  const productsToShow = showAll
    ? popularProducts
    : popularProducts.slice(0, 4);

  popularContainer.innerHTML = "";

  productsToShow.forEach((product) => {
    popularContainer.innerHTML += `
      <div class="productCard col-12 col-md-6 col-lg-3 d-flex">
        <div
          class="card h-100 w-100"
          onclick="goToProduct(${product.id})"
        >

          <img
            src="${product.imageUrl}"
            class="card-img-top"
            alt="${product.name}"
          />

          <div class="card-body">
            <h5 class="card-title fw-semibold mb-1">
              ${product.name}
            </h5>

            <p class="text-secondary mb-2">
              ${product.category}
            </p>

            <div class="d-flex mb-3 justify-content-between align-items-center">
              
              <p class="fw-bold price mb-0">
                $${product.price.toFixed(2)}
              </p>

              <span>
                <i class="fa-solid fa-star text-warning"></i>
                ${product.rating}
              </span>

            </div>

            <button
  class="btn addCart w-100 mt-auto"
  onclick="addToCartFromHome(event, ${product.id})"
>
  Add to Cart
</button>

          </div>

        </div>
      </div>
    `;
  });

  viewall.textContent = showAll ? "Show Less" : "View All";
}

// View All
viewall.addEventListener("click", function (event) {
  event.preventDefault();

  showAll = !showAll;

  displayPopularProducts();
});

// Add to Cart Logic//////////////////////
function addToCartFromHome(event, productId) {
  event.stopPropagation();

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const product = popularProducts.find((product) => product.id === productId);

  if (!product) return;

  const existingProduct = cart.find((product) => product.id === productId);

  if (existingProduct) {
    existingProduct.quantity += 1;

    if (existingProduct.quantity > 10) {
      existingProduct.quantity = 10;
    }
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      category: product.category,
      price: product.price,
      imageUrl: product.imageUrl,
      quantity: 1,
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartBadge();
}
function goToCategory(category) {
  window.location.href = `Menu.html?category=${category}`;
}
