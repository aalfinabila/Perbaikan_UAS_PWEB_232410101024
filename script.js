let navbar = document.querySelector(".navbar");

document.querySelector("#menu-btn").onclick = () => {
  navbar.classList.toggle("active");
  searchForm.classList.remove("active");
  cartItem.classList.remove("active");
};

let searchForm = document.querySelector(".search-form");

document.querySelector("#search-btn").onclick = () => {
  searchForm.classList.toggle("active");
  navbar.classList.remove("active");
  cartItem.classList.remove("active");
};

let cartItem = document.querySelector(".cart-items-container");

document.querySelector("#cart-btn").onclick = () => {
  cartItem.classList.toggle("active");
  navbar.classList.remove("active");
  searchForm.classList.remove("active");
};

window.onscroll = () => {
  navbar.classList.remove("active");
  searchForm.classList.remove("active");
  cartItem.classList.remove("active");
};

let cart = [];

function renderCartItems() {
  const cartContainer = document.querySelector(".cart-items");
  cartContainer.innerHTML = "";

  cart.forEach((item, index) => {
    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");

    cartItem.innerHTML = `
      <span class="fas fa-times" data-index="${index}"></span>
      <div class="content">
        <h3>${item.product}</h3>
        <div class="price">Rp ${item.price}</div>
      </div>
    `;

    cartContainer.appendChild(cartItem);
  });

  // Add event listener for removing items
  document.querySelectorAll(".cart-item .fa-times").forEach((button) => {
    button.addEventListener("click", () => {
      const index = button.getAttribute("data-index");
      cart.splice(index, 1);
      renderCartItems();
    });
  });

  localStorage.setItem("cart", JSON.stringify(cart));
}

// Add event listeners to add-to-cart buttons
document.querySelectorAll(".add-to-cart-btn").forEach((button) => {
  button.addEventListener("click", (e) => {
    e.preventDefault();
    const product = button.getAttribute("data-product");
    const price = button.getAttribute("data-price");
    addToCart(product, price);
  });
});

function addToCart(product, price) {
  cart.push({ product, price });
  renderCartItems();
}

renderCartItems();

const swiper = new Swiper('.swiper-container', {
  loop: true,
  spaceBetween: 10,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  autoplay: {
    delay: 3000, // Delay antara setiap slide (dalam milidetik)
  },
});

