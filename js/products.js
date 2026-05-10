// HA Luex — Products Database
// Admin is iss file mein products add/edit kar sakta hai

const products = [
  {
    id: 1,
    name: "The Classic White",
    category: "Formal",
    price: 3500,
    oldPrice: 4500,
    emoji: "👔",
    badge: "Best Seller",
    description: "Crisp premium cotton formal shirt. Perfect for office and formal occasions.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["White", "Off-White"],
    fabric: "100% Egyptian Cotton",
    stock: true
  },
  {
    id: 2,
    name: "Obsidian Black",
    category: "Formal",
    price: 4200,
    oldPrice: null,
    emoji: "🖤",
    badge: "New",
    description: "Sleek all-black formal shirt. The statement piece every wardrobe needs.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Black"],
    fabric: "Premium Cotton Blend",
    stock: true
  },
  {
    id: 3,
    name: "Desert Linen",
    category: "Casual",
    price: 3800,
    oldPrice: 4800,
    emoji: "🌿",
    badge: "Sale",
    description: "Breathable linen shirt for casual outings. Stay cool, look sharp.",
    sizes: ["M", "L", "XL", "XXL"],
    colors: ["Beige", "Khaki", "Olive"],
    fabric: "Pure Linen",
    stock: true
  },
  {
    id: 4,
    name: "Royal Navy",
    category: "Formal",
    price: 3600,
    oldPrice: null,
    emoji: "💙",
    badge: null,
    description: "Deep navy blue formal shirt. Versatile, sophisticated, timeless.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Navy Blue"],
    fabric: "100% Cotton",
    stock: true
  },
  {
    id: 5,
    name: "Weekend Casual",
    category: "Casual",
    price: 2800,
    oldPrice: 3500,
    emoji: "😎",
    badge: "Sale",
    description: "Relaxed fit casual shirt for weekends and outings. Comfortable all day.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Grey", "Blue", "White"],
    fabric: "Soft Cotton",
    stock: true
  },
  {
    id: 6,
    name: "Gold Edition",
    category: "Premium",
    price: 6500,
    oldPrice: 8000,
    emoji: "✨",
    badge: "Limited",
    description: "Our signature premium shirt with subtle gold detailing. For the man who demands the best.",
    sizes: ["M", "L", "XL"],
    colors: ["Ivory", "Champagne"],
    fabric: "Egyptian Cotton + Silk Blend",
    stock: true
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
  
  return `
    <div class="product-card" onclick="openProduct(${product.id})">
      <div class="product-img-wrap">
        ${badgeHTML}
        <div class="product-img-placeholder">${product.emoji}</div>
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
