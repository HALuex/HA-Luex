// HA Luex — Products Database
// Admin is iss file mein products add/edit kar sakta hai

const products = [
  {
  id: 1,
  name: "Blue Striped Oxford Shirt",
  price: 4500,
  category: "Formal",
  image: "https://i.ibb.co/6P00rLz/image.png",
  description: "High-quality formal blue striped shirt."
}
                 ];

// Product card HTML generator
function createProductCard(product) {
  const oldPriceHTML = product.oldPrice 
    ? `<span class="old-price">PKR ${product.oldPrice.toLocaleString()}</span>` 
    : '';
  const badgeHTML = product.badge 
    ? `<div class="product-badge">${product.badge}</div>` 
    : '';
  
  const imgHTML = product.image
    ? `<img src="${product.image}" alt="${product.name}" style="width:100%;height:100%;object-fit:cover;display:block;" />`
    : `<div class="product-img-placeholder">${product.emoji}</div>`;

  return `
    <div class="product-card" onclick="openProduct(${product.id})">
      <div class="product-img-wrap">
        ${badgeHTML}
        ${imgHTML}
      </div>
      <div class="product-body">
        <p class="product-category">${product.category}</p>
        <h3 class="product-name">${product.name}</h3>
        <p class="product-desc">${product.description}</p>
        <div class="product-price-row">
          <div class="product-price">
            PKR ${product.price.toLocaleString()}
            ${oldPriceHTML}
          </div>
          <button class="add-to-cart" onclick="event.stopPropagation(); addToCart(${product.id}, 'M')">
            + ADD
          </button>
        </div>
      </div>
    </div>
  `;
}

function openProduct(id) {
  const p = products.find(x => x.id === id);
  if (!p) return;
  // For now redirect to products page
  window.location.href = `products.html?id=${id}`;
}
