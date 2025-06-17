document.addEventListener("DOMContentLoaded", () => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartItemsContainer = document.getElementById("cart-items");
  const subtotalElement = document.getElementById("subtotal");
  let subtotal = 0;

  cart.forEach((item) => {
    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");
    cartItem.innerHTML = `
              <div class="content">
                  <h3>${item.product}</h3>
                  <div class="price">Rp ${item.price}</div>
              </div>
          `;
    cartItemsContainer.appendChild(cartItem);
    subtotal += parseInt(item.price);
  });

  subtotalElement.innerText = `Rp ${subtotal}`;

  document.getElementById("pay-btn").addEventListener("click", () => {
    const name = document.getElementById("name").value;
    const country = document.getElementById("address").value;
    const phone = document.getElementById("phone").value;
    const paymentMethod = document.getElementById("payment-method").value;

    if (name && country && phone && paymentMethod) {
      alert("Pembelian Anda sukses!");

      const invoiceContent = document.getElementById("invoice-content");
      invoiceContent.innerHTML = `
                  <h2>Invoice</h2>
                  <p>Nama: ${name}</p>
                  <p>Alamat: ${address}</p>
                  <p>Nomor Telepon: ${phone}</p>
                  <p>Metode Pembayaran: ${paymentMethod}</p>
                  <h3>Rincian Produk</h3>
                  ${cart
                    .map((item) => `<p>${item.product} - Rp ${item.price}</p>`)
                    .join("")}
                  <h3>Subtotal: Rp ${subtotal}</h3>
              `;

      document.querySelector(".checkout").style.display = "none";
      document.getElementById("invoice").style.display = "block";
    } else {
      alert("Mohon lengkapi semua data!");
    }
  });
});

fetch("http://localhost/api/simpan_transaksi.php", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    name,
    address,
    phone,
    paymentMethod,
    cart,
    subtotal
  })
})
.then(response => response.json())
.then(data => {
  alert("Transaksi berhasil disimpan ke server.");
})
.catch(error => {
  console.error("Gagal menyimpan transaksi:", error);
});

