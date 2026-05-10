// HA Luex — Cart System
// Orders WhatsApp pe jaate hain

let cart = JSON.parse(localStorage.getItem('haluex_cart') || '[]');

function saveCart() {
  localStorage.setItem('haluex_cart', JSON.stringify(cart));
  updateCartUI();
}

function addToCart(productId, size) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  const existing = cart.find(i => i.id === productId && i.size === size);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ id: productId, name: product.name, price: product.price, emoji: product.emoji, size: size, qty: 1 });
  }
  saveCart();
  showCartNotification(product.name);
  toggleCart();
}

function removeFromCart(productId, size) {
  cart = cart.filter(i => !(i.id === productId && i.size === size));
  saveCart();
}

function updateCartUI() {
  const count = cart.reduce((sum, i) => sum + i.qty, 0);
  document.getElementById('cartCount').textContent = count;

  const itemsEl = document.getElementById('cartItems');
  const footerEl = document.getElementById('cartFooter');

  if (cart.length === 0) {
    itemsEl.innerHTML = '<p class="cart-empty">Your cart is empty</p>';
    if (footerEl) footerEl.style.display = 'none';
    return;
  }

  if (footerEl) footerEl.style.display = 'block';

  itemsEl.innerHTML = cart.map(item => `
    <div class="cart-item">
      <div class="cart-item-emoji">${item.emoji}</div>
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-size">Size: ${item.size} &nbsp;|&nbsp; Qty: ${item.qty}</div>
        <div class="cart-item-price">PKR ${(item.price * item.qty).toLocaleString()}</div>
      </div>
      <button class="cart-item-remove" onclick="removeFromCart(${item.id}, '${item.size}')">✕</button>
    </div>
  `).join('');

  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const totalEl = document.getElementById('cartTotal');
  if (totalEl) totalEl.textContent = `PKR ${total.toLocaleString()}`;
}

function toggleCart() {
  document.getElementById('cartSidebar').classList.toggle('open');
  document.getElementById('cartOverlay').classList.toggle('open');
}

function showCartNotification(name) {
  const notif = document.createElement('div');
  notif.style.cssText = `
    position: fixed; bottom: 24px; left: 50%; transform: translateX(-50%);
    background: #0a0a0a; color: #C9A84C; padding: 12px 24px;
    font-size: 12px; letter-spacing: 1px; z-index: 500;
    font-family: 'Montserrat', sans-serif; border: 1px solid rgba(201,168,76,0.3);
  `;
  notif.textContent = `✓ ${name} added to cart`;
  document.body.appendChild(notif);
  setTimeout(() => notif.remove(), 2500);
}

function checkout() {
  if (cart.length === 0) return;
  
  // Open checkout modal
  document.getElementById('checkoutModal').classList.add('open');
  toggleCart();
}

function submitOrder() {
  const name = document.getElementById('orderName').value.trim();
  const phone = document.getElementById('orderPhone').value.trim();
  const address = document.getElementById('orderAddress').value.trim();
  const city = document.getElementById('orderCity').value.trim();

  if (!name || !phone || !address || !city) {
    alert('Please fill in all required fields.');
    return;
  }

  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  
  let message = `🛍️ *NEW ORDER — HA LUEX*\n\n`;
  message += `*Customer Details:*\n`;
  message += `Name: ${name}\n`;
  message += `Phone: ${phone}\n`;
  message += `Address: ${address}, ${city}\n\n`;
  message += `*Order Items:*\n`;
  cart.forEach(item => {
    message += `• ${item.name} (Size: ${item.size}) x${item.qty} = PKR ${(item.price * item.qty).toLocaleString()}\n`;
  });
  message += `\n*Total: PKR ${total.toLocaleString()}*\n`;
  message += `Payment: Cash on Delivery`;

  // Save order to localStorage (admin can view these)
  const orders = JSON.parse(localStorage.getItem('haluex_orders') || '[]');
  const newOrder = {
    id: 'ORD-' + Date.now(),
    date: new Date().toLocaleDateString('en-PK'),
    customer: { name, phone, address, city },
    items: [...cart],
    total,
    status: 'New',
    payment: 'Cash on Delivery'
  };
  orders.push(newOrder);
  localStorage.setItem('haluex_orders', JSON.stringify(orders));

  // Send via WhatsApp
  const waNumber = '923000000000'; // Change to your WhatsApp number
  const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`;
  window.open(waUrl, '_blank');

  // Clear cart
  cart = [];
  saveCart();
  document.getElementById('checkoutModal').classList.remove('open');
  
  alert('Order placed! You will be redirected to WhatsApp to confirm. We will contact you shortly. Thank you!');
}

// Init on page load
document.addEventListener('DOMContentLoaded', updateCartUI);
