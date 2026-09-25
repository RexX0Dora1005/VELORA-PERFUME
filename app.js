/**
 * VÉLORA PARFUMS — LUXURY E-COMMERCE LOGIC
 * DTI 224 Web Development Final Project Demo
 */

const PRODUCTS = [
  {
    id: 'noir',
    name: 'VÉLORA NOIR',
    tagline: 'Dark & Mysterious Elegance',
    price50: 1290,
    price100: 1990,
    image: 'assets/images/noir.jpg',
    badge: 'Signature Dark',
    desc: 'A deeply intoxicating nocturnal creation. Velvety black leather and cracked black peppercorn yield to an opulent heart of smoked cedarwood and golden tonka amber.',
    notes: {
      top: 'Black Pepper, Italian Bergamot',
      heart: 'Dark Leather, Smoked Cedarwood',
      base: 'Tonka Bean, Rich Vanilla Amber'
    }
  },
  {
    id: 'bloom',
    name: 'VÉLORA BLOOM',
    tagline: 'Floral & Romantic Sweetness',
    price50: 1190,
    price100: 1890,
    image: 'assets/images/bloom.jpg',
    badge: 'Maison Florale',
    desc: 'An ode to twilight blooming peonies and rare Damask roses kissed by morning dew. Sweetly intoxicating yet refined with a silky sandalwood and white musk finish.',
    notes: {
      top: 'Crisp Lychee, Sweet Peony Petals',
      heart: 'Damask Rose, French Jasmine',
      base: 'White Musk, Creamy Sandalwood'
    }
  },
  {
    id: 'aqua',
    name: 'VÉLORA AQUA',
    tagline: 'Fresh & Crisp Oceanic Breeze',
    price50: 1090,
    price100: 1750,
    image: 'assets/images/aqua.jpg',
    badge: 'Pure Marine',
    desc: 'The pure exhilarating vitality of sea spray against sun-drenched Mediterranean cliffs. Blending mineral sea salt, sparkling Italian mandarin, and weathered driftwood.',
    notes: {
      top: 'Mineral Sea Salt, Italian Mandarin',
      heart: 'Oceanic Marine Accord, Clary Sage',
      base: 'Sun-bleached Driftwood, Ambergris'
    }
  },
  {
    id: 'oud',
    name: 'VÉLORA OUD',
    tagline: 'Warm, Regal & Smoky Woody',
    price50: 1390,
    price100: 2190,
    image: 'assets/images/oud.jpg',
    badge: 'Royal Reserve',
    desc: 'The undisputed royalty of niche perfumery. Precious Cambodian agarwood infused with golden saffron threads, rich honeyed woods, and warm resinous incense.',
    notes: {
      top: 'Persian Saffron, Green Cardamom',
      heart: 'Rare Agarwood (Oud), Brazilian Rosewood',
      base: 'Golden Amber, Smoky Vetiver'
    }
  }
];

// State
let cart = JSON.parse(localStorage.getItem('velora_cart')) || [];
let activeModalPerfume = null;
let activeModalSize = '50ml';

// DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  updateCartUI();
  setupQuiz();
  setupEventListeners();
});

// Render Product Cards
function renderProducts() {
  const grid = document.getElementById('productsGrid');
  if (!grid) return;

  grid.innerHTML = PRODUCTS.map(p => `
    <div class="product-card" data-id="${p.id}">
      <div class="product-thumb-wrap" onclick="openProductModal('${p.id}')">
        <img src="${p.image}" alt="${p.name}" class="product-img" loading="lazy" />
        <span class="product-badge">${p.badge}</span>
      </div>
      <div class="product-info">
        <div>
          <h3 class="product-title">${p.name}</h3>
          <p class="product-tagline">${p.tagline}</p>
          <p class="product-notes-preview"><strong>Notes:</strong> ${p.notes.heart}, ${p.notes.base}</p>
        </div>
        <div class="product-bottom-row">
          <span class="product-price">฿${p.price50.toLocaleString()}</span>
          <div class="product-actions">
            <button class="btn btn-outline btn-sm" onclick="openProductModal('${p.id}')">Details</button>
            <button class="btn btn-gold btn-sm" onclick="quickAddToCart('${p.id}')">Add</button>
          </div>
        </div>
      </div>
    </div>
  `).join('');
}

// Product Quick View Modal
function openProductModal(id, preselectedSize = '50ml') {
  const p = PRODUCTS.find(item => item.id === id);
  if (!p) return;

  activeModalPerfume = p;
  activeModalSize = preselectedSize;

  const modal = document.getElementById('productModal');
  const container = document.getElementById('modalProductContent');

  container.innerHTML = `
    <div class="modal-product-visual">
      <img src="${p.image}" alt="${p.name}" class="modal-product-img" />
    </div>
    <div class="modal-product-details">
      <p class="section-tag">${p.badge}</p>
      <h2 class="modal-product-title">${p.name}</h2>
      <p class="product-tagline">${p.tagline}</p>
      <p class="modal-product-price" id="modalPriceDisplay">฿${p.price50.toLocaleString()}</p>
      <p class="modal-product-desc">${p.desc}</p>

      <div class="scent-pyramid">
        <div class="pyramid-row">
          <span class="pyramid-label">Top:</span>
          <span class="pyramid-value">${p.notes.top}</span>
        </div>
        <div class="pyramid-row">
          <span class="pyramid-label">Heart:</span>
          <span class="pyramid-value">${p.notes.heart}</span>
        </div>
        <div class="pyramid-row">
          <span class="pyramid-label">Base:</span>
          <span class="pyramid-value">${p.notes.base}</span>
        </div>
      </div>

      <p style="font-size: 0.75rem; color: var(--gold-champagne); letter-spacing: 1px; text-transform: uppercase; margin-bottom: 8px;">Select Flacon Size:</p>
      <div class="size-selector">
        <button class="size-btn ${activeModalSize === '50ml' ? 'active' : ''}" onclick="selectModalSize('50ml')">50 ml (฿${p.price50.toLocaleString()})</button>
        <button class="size-btn ${activeModalSize === '100ml' ? 'active' : ''}" onclick="selectModalSize('100ml')">100 ml (฿${p.price100.toLocaleString()})</button>
      </div>

      <button class="btn btn-gold btn-block" onclick="addModalToCart()">Add to Shopping Bag</button>
    </div>
  `;

  modal.classList.remove('hidden');
}

function selectModalSize(size) {
  activeModalSize = size;
  const priceDisplay = document.getElementById('modalPriceDisplay');
  const sizeBtns = document.querySelectorAll('.size-btn');
  
  sizeBtns.forEach(btn => {
    btn.classList.toggle('active', btn.textContent.includes(size));
  });

  if (activeModalPerfume && priceDisplay) {
    const price = size === '50ml' ? activeModalPerfume.price50 : activeModalPerfume.price100;
    priceDisplay.textContent = `฿${price.toLocaleString()}`;
  }
}

function addModalToCart() {
  if (!activeModalPerfume) return;
  const price = activeModalSize === '50ml' ? activeModalPerfume.price50 : activeModalPerfume.price100;
  
  addToCart(activeModalPerfume.id, activeModalPerfume.name, activeModalSize, price, activeModalPerfume.image);
  closeProductModal();
  openCart();
}

function closeProductModal() {
  const modal = document.getElementById('productModal');
  if (modal) modal.classList.add('hidden');
}

// Scent Quiz Logic
function setupQuiz() {
  const buttons = document.querySelectorAll('.quiz-option-btn');
  const resultContainer = document.getElementById('quizResult');

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const perfumeId = btn.getAttribute('data-perfume');
      const p = PRODUCTS.find(item => item.id === perfumeId);

      if (p && resultContainer) {
        resultContainer.innerHTML = `
          <p style="font-size: 0.75rem; letter-spacing: 2px; color: var(--gold-champagne); text-transform: uppercase;">Your Recommended Fragrance</p>
          <h3 style="font-family: var(--font-serif); font-size: 1.9rem; color: #fff; margin: 6px 0;">${p.name}</h3>
          <p style="color: var(--text-secondary); font-size: 0.88rem; max-width: 500px; margin: 0 auto 16px auto;">${p.desc}</p>
          <div style="display: inline-flex; gap: 12px;">
            <button class="btn btn-outline btn-sm" onclick="openProductModal('${p.id}')">View Details & Notes</button>
            <button class="btn btn-gold btn-sm" onclick="quickAddToCart('${p.id}')">Add 50ml to Bag (฿${p.price50.toLocaleString()})</button>
          </div>
        `;
        resultContainer.classList.remove('hidden');
      }
    });
  });
}

// Cart Management
function quickAddToCart(productId) {
  const p = PRODUCTS.find(item => item.id === productId);
  if (!p) return;
  addToCart(p.id, p.name, '50ml', p.price50, p.image);
  showToast(`Added ${p.name} (50ml) to Bag`);
}

function addToCart(id, name, size, price, image) {
  const itemKey = `${id}-${size}`;
  const existing = cart.find(item => item.key === itemKey);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({
      key: itemKey,
      id,
      name,
      size,
      price,
      image,
      quantity: 1
    });
  }

  saveCart();
  updateCartUI();
}

function updateCartQty(key, delta) {
  const item = cart.find(i => i.key === key);
  if (!item) return;

  item.quantity += delta;
  if (item.quantity <= 0) {
    cart = cart.filter(i => i.key !== key);
  }

  saveCart();
  updateCartUI();
}

function removeCartItem(key) {
  cart = cart.filter(i => i.key !== key);
  saveCart();
  updateCartUI();
}

function saveCart() {
  localStorage.setItem('velora_cart', JSON.stringify(cart));
}

// Additional Checkout & Voucher State
let appliedVoucher = null; // { code: 'VELORA10', discountType: 'percent', value: 0.10, label: '10% Exclusive Privilège' }
let deliveryFee = 0;
let lastCompletedOrder = null;

function updateCartUI() {
  const totalCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  // Nav badge
  const badge = document.getElementById('cartCount');
  if (badge) badge.textContent = totalCount;

  // Drawer count & subtotal
  const drawerCount = document.getElementById('cartDrawerCount');
  if (drawerCount) drawerCount.textContent = `${totalCount} item${totalCount === 1 ? '' : 's'}`;

  const subtotalEl = document.getElementById('cartSubtotal');
  if (subtotalEl) subtotalEl.textContent = `฿${subtotal.toLocaleString()}`;

  // Update checkout calculations if checkout elements exist
  updateCheckoutCalculations(subtotal);

  // Drawer items list
  const list = document.getElementById('cartItemsList');
  if (!list) return;

  if (cart.length === 0) {
    list.innerHTML = `
      <div class="cart-empty">
        <p>Your fragrance bag is currently empty.</p>
        <p style="margin-top: 8px; font-size: 0.8rem;">Explore the four editions to begin your olfactory journey.</p>
      </div>
    `;
    const checkoutBtn = document.getElementById('checkoutBtn');
    if (checkoutBtn) checkoutBtn.disabled = true;
  } else {
    list.innerHTML = cart.map(item => `
      <div class="cart-item-row">
        <img src="${item.image}" alt="${item.name}" class="cart-item-img" />
        <div class="cart-item-details">
          <h4 class="cart-item-name">${item.name}</h4>
          <p class="cart-item-size">${item.size} • Eau De Parfum</p>
          <p class="cart-item-price">฿${(item.price * item.quantity).toLocaleString()}</p>
          <div class="cart-qty-ctrl">
            <button class="qty-btn" onclick="updateCartQty('${item.key}', -1)">-</button>
            <span class="qty-val">${item.quantity}</span>
            <button class="qty-btn" onclick="updateCartQty('${item.key}', 1)">+</button>
            <button class="cart-item-remove" onclick="removeCartItem('${item.key}')">Remove</button>
          </div>
        </div>
      </div>
    `).join('');

    const checkoutBtn = document.getElementById('checkoutBtn');
    if (checkoutBtn) checkoutBtn.disabled = false;
  }
}

function updateCheckoutCalculations(subtotal) {
  let discountAmount = 0;
  if (appliedVoucher) {
    if (appliedVoucher.discountType === 'percent') {
      discountAmount = Math.round(subtotal * appliedVoucher.value);
    } else if (appliedVoucher.discountType === 'fixed') {
      discountAmount = Math.min(subtotal, appliedVoucher.value);
    }
  }

  const finalTotal = Math.max(0, subtotal - discountAmount + deliveryFee);

  // Checkout Elements
  const summarySubtotal = document.getElementById('summarySubtotal');
  const summaryDiscountRow = document.getElementById('summaryDiscountRow');
  const summaryDiscount = document.getElementById('summaryDiscount');
  const summaryShipping = document.getElementById('summaryShipping');
  const checkoutTotal = document.getElementById('checkoutTotal');

  if (summarySubtotal) summarySubtotal.textContent = `฿${subtotal.toLocaleString()}`;

  if (summaryDiscountRow && summaryDiscount) {
    if (discountAmount > 0) {
      summaryDiscountRow.classList.remove('hidden');
      summaryDiscount.textContent = `-฿${discountAmount.toLocaleString()} (${appliedVoucher.label})`;
    } else {
      summaryDiscountRow.classList.add('hidden');
    }
  }

  if (summaryShipping) {
    summaryShipping.textContent = deliveryFee === 0 ? 'COMPLIMENTARY' : `฿${deliveryFee.toLocaleString()}`;
  }

  if (checkoutTotal) {
    checkoutTotal.textContent = `฿${finalTotal.toLocaleString()}`;
  }

  // Mini Items List
  const miniList = document.getElementById('checkoutItemsMini');
  if (miniList) {
    miniList.innerHTML = cart.map(item => `
      <div class="checkout-item-mini">
        <img src="${item.image}" alt="${item.name}" />
        <div class="checkout-item-meta">
          <p class="mini-name">${item.name}</p>
          <p class="mini-detail">${item.size} • Qty: ${item.quantity}</p>
        </div>
        <span class="mini-price">฿${(item.price * item.quantity).toLocaleString()}</span>
      </div>
    `).join('');
  }
}

// Drawer & Checkout Modals
function openCart() {
  const drawer = document.getElementById('cartDrawer');
  if (drawer) drawer.classList.remove('hidden');
}

function closeCart() {
  const drawer = document.getElementById('cartDrawer');
  if (drawer) drawer.classList.add('hidden');
}

function openCheckout() {
  if (!cart || cart.length === 0) {
    showToast('Your fragrance bag is empty.');
    return;
  }
  closeCart();
  const checkoutModal = document.getElementById('checkoutModal');
  const formView = document.getElementById('checkoutFormView');
  const successView = document.getElementById('orderSuccessView');

  if (checkoutModal) {
    if (formView) formView.classList.remove('hidden');
    if (successView) successView.classList.add('hidden');
    checkoutModal.classList.remove('hidden');
    updateCartUI();
  }
}
window.openCheckout = openCheckout;

function closeCheckoutModal() {
  const checkoutModal = document.getElementById('checkoutModal');
  if (checkoutModal) checkoutModal.classList.add('hidden');
}
window.closeCheckoutModal = closeCheckoutModal;

// Voucher Application
function handleApplyVoucher() {
  const input = document.getElementById('voucherCode');
  const feedback = document.getElementById('voucherFeedback');
  if (!input || !feedback) return;

  const code = input.value.trim().toUpperCase();

  if (!code) {
    feedback.textContent = 'Please enter a voucher code.';
    feedback.className = 'voucher-feedback error';
    feedback.classList.remove('hidden');
    return;
  }

  if (code === 'VELORA10') {
    appliedVoucher = { code: 'VELORA10', discountType: 'percent', value: 0.10, label: '10% Privilege' };
    feedback.textContent = '✓ Privilege Voucher applied: 10% Off Entire Order.';
    feedback.className = 'voucher-feedback success';
    feedback.classList.remove('hidden');
  } else if (code === 'VIP300' || code === 'MAISONVIP') {
    appliedVoucher = { code: code, discountType: 'fixed', value: 300, label: '฿300 VIP Voucher' };
    feedback.textContent = '✓ VIP Voucher applied: ฿300 Deducted.';
    feedback.className = 'voucher-feedback success';
    feedback.classList.remove('hidden');
  } else if (code === 'MAISON') {
    appliedVoucher = { code: 'MAISON', discountType: 'percent', value: 0.15, label: '15% Haute Privilege' };
    feedback.textContent = '✓ Maison Code applied: 15% Off Your Collection.';
    feedback.className = 'voucher-feedback success';
    feedback.classList.remove('hidden');
  } else {
    feedback.textContent = 'Invalid or expired voucher code. Try VELORA10';
    feedback.className = 'voucher-feedback error';
    feedback.classList.remove('hidden');
    return;
  }

  updateCartUI();
}

let isSubmitting = false;

// Order Submission & Deluxe Receipt Generation
function handlePlaceOrder(e) {
  if (e) e.preventDefault();

  if (isSubmitting) return;

  if (!cart || cart.length === 0) {
    showToast('Your fragrance bag is empty.');
    return;
  }

  isSubmitting = true;
  setTimeout(() => { isSubmitting = false; }, 1200);

  const name = document.getElementById('custName').value.trim();
  const phone = document.getElementById('custPhone').value.trim();
  const email = document.getElementById('custEmail').value.trim();
  const address = document.getElementById('custAddress').value.trim();
  const deliveryMethod = document.querySelector('input[name="deliveryMethod"]:checked')?.value || 'White-Glove Standard Delivery';
  const paymentMethod = document.querySelector('input[name="payment"]:checked')?.value || 'PromptPay QR / Bank Transfer';

  // Gift options
  const hasGift = document.getElementById('giftOptionToggle')?.checked;
  const giftRecipient = document.getElementById('giftRecipient')?.value.trim() || '';
  const giftMessage = document.getElementById('giftMessage')?.value.trim() || '';

  // Slip file name if any
  const slipInput = document.getElementById('slipUpload');
  const slipFile = slipInput && slipInput.files.length > 0 ? slipInput.files[0].name : null;

  // Order Calculations
  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  let discountAmount = 0;
  if (appliedVoucher) {
    if (appliedVoucher.discountType === 'percent') {
      discountAmount = Math.round(subtotal * appliedVoucher.value);
    } else {
      discountAmount = Math.min(subtotal, appliedVoucher.value);
    }
  }
  const grandTotal = Math.max(0, subtotal - discountAmount + deliveryFee);

  const orderNum = 'VEL-' + Math.floor(100000 + Math.random() * 900000);
  const orderDate = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
  const orderTime = new Date().toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  });

  // Calculate estimated delivery
  const deliveryDays = deliveryMethod.includes('VIP Same-Day') ? 'Today by 8:00 PM' : 'Within 48 Hours';

  // Save last completed order for printing / text export
  lastCompletedOrder = {
    orderNum,
    orderDate,
    orderTime,
    deliveryDays,
    name,
    phone,
    email,
    address,
    deliveryMethod,
    paymentMethod,
    slipFile,
    hasGift,
    giftRecipient,
    giftMessage,
    items: [...cart],
    subtotal,
    discountAmount,
    voucherLabel: appliedVoucher ? appliedVoucher.label : null,
    deliveryFee,
    grandTotal
  };

  // Persist last completed order so standalone receipt page (receipt.html) can read it
  localStorage.setItem('velora_last_order', JSON.stringify(lastCompletedOrder));

  // Render Deluxe Official Receipt & Certificate
  const receipt = document.getElementById('orderReceipt');
  if (receipt) {
    receipt.innerHTML = `
      <div class="receipt-masthead">
        <img src="assets/images/logo.jpg" alt="VÉLORA Emblem" class="receipt-logo-img" />
        <h3>VÉLORA PARFUMS</h3>
        <p style="letter-spacing: 2px; font-weight: 600; color: #fff;">CHECKOUT FINAL RECEIPT & OFFICIAL INVOICE</p>
        <p class="receipt-tax-meta">Maison VÉLORA S.A. • 30 Rue de la Paix, 75002 Paris • Tax ID: 0-1055-67012-99-1</p>
      </div>

      <div class="receipt-ribbon">
        <div>
          <span class="ribbon-cell-label">Order Reference</span>
          <span class="ribbon-cell-value" style="color: var(--gold-primary);">#${orderNum}</span>
        </div>
        <div>
          <span class="ribbon-cell-label">Date & Time</span>
          <span class="ribbon-cell-value">${orderDate} • ${orderTime}</span>
        </div>
        <div>
          <span class="ribbon-cell-label">Fulfillment Status</span>
          <span class="ribbon-cell-value" style="color: #4cd964;">CONFIRMED & PREPARING</span>
        </div>
        <div>
          <span class="ribbon-cell-label">Estimated Delivery</span>
          <span class="ribbon-cell-value">${deliveryDays}</span>
        </div>
      </div>

      <div class="receipt-parties-grid">
        <div>
          <h4 class="receipt-block-title">Delivering To</h4>
          <p><strong>${name}</strong></p>
          <p style="color: var(--text-secondary); margin: 2px 0;">${phone} • ${email}</p>
          <p style="color: var(--text-secondary); line-height: 1.4;">${address}</p>
          <p style="margin-top: 6px; font-size: 0.76rem; color: var(--gold-champagne);">Method: ${deliveryMethod}</p>
        </div>
        <div>
          <h4 class="receipt-block-title">Payment Verification</h4>
          <p><strong>Method:</strong> ${paymentMethod}</p>
          <p style="color: var(--text-secondary); margin: 2px 0;">Transaction Ref: TXN-${Math.random().toString(36).substring(2, 9).toUpperCase()}</p>
          <p style="color: #4cd964; font-size: 0.78rem;">Status: Authorized & Cleared</p>
          ${slipFile ? `<p style="color: var(--gold-champagne); font-size: 0.74rem; margin-top: 4px;">Attached Slip: ${slipFile}</p>` : ''}
        </div>
      </div>

      ${hasGift && giftMessage ? `
        <div class="receipt-gift-preview">
          <p class="receipt-gift-title">✦ Complimentary Calligraphy Gift Inscription ${giftRecipient ? `for ${giftRecipient}` : ''}</p>
          <p class="receipt-gift-msg">“${giftMessage}”</p>
        </div>
      ` : ''}

      <table class="receipt-manifest-table">
        <thead>
          <tr>
            <th>Fragrance Edition</th>
            <th>Size & Spec</th>
            <th style="text-align: center;">Qty</th>
            <th style="text-align: right;">Amount</th>
          </tr>
        </thead>
        <tbody>
          ${lastCompletedOrder.items.map(item => `
            <tr>
              <td>
                <div class="manifest-item-flex">
                  <img src="${item.image}" alt="${item.name}" class="manifest-item-img" />
                  <div>
                    <strong style="color: #fff;">${item.name}</strong>
                    <p style="font-size: 0.72rem; color: var(--text-secondary);">Extrait De Parfum • Hand-Numbered Flacon</p>
                  </div>
                </div>
              </td>
              <td style="color: var(--gold-champagne);">${item.size}</td>
              <td style="text-align: center;">${item.quantity}</td>
              <td style="text-align: right; font-weight: 500;">฿${(item.price * item.quantity).toLocaleString()}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>

      <div class="receipt-financial-grid">
        <div class="receipt-seal-box">
          <div class="receipt-seal">
            VÉLORA<br>PARIS<br>SEAL
          </div>
          <div class="receipt-seal-text">
            <strong>Certified Authentic Artisanal Extraction</strong><br>
            Formulated in Grasse, France. Lot No. GR-${Math.floor(1000 + Math.random() * 9000)}. Packaged in signature velvet presentation coffret.
            <div class="receipt-signature-wrap">
              <span class="receipt-signature-img">Jean-Luc Moreau</span>
              <span class="receipt-signature-title">Master Perfumer • Grasse</span>
            </div>
          </div>
        </div>

        <div>
          <table class="receipt-totals-table">
            <tr>
              <td style="color: var(--text-secondary);">Flacons Subtotal</td>
              <td style="text-align: right;">฿${subtotal.toLocaleString()}</td>
            </tr>
            ${discountAmount > 0 ? `
              <tr style="color: var(--gold-primary);">
                <td>Privilege Discount (${appliedVoucher ? appliedVoucher.label : 'Special'})</td>
                <td style="text-align: right;">-฿${discountAmount.toLocaleString()}</td>
              </tr>
            ` : ''}
            <tr>
              <td style="color: var(--text-secondary);">Courier Delivery</td>
              <td style="text-align: right; color: var(--gold-primary);">${deliveryFee === 0 ? 'FREE (Complimentary)' : `฿${deliveryFee.toLocaleString()}`}</td>
            </tr>
            <tr>
              <td style="color: var(--text-secondary);">Velvet Boutique Coffret</td>
              <td style="text-align: right; color: var(--gold-primary);">INCLUDED</td>
            </tr>
            <tr class="total-row">
              <td>Total Settled</td>
              <td style="text-align: right;">฿${grandTotal.toLocaleString()}</td>
            </tr>
          </table>
        </div>
      </div>

      <div class="receipt-barcode-wrap">
        <!-- Authentic SVG Barcode -->
        <svg class="barcode-svg" viewBox="0 0 200 35" width="220" height="36">
          <rect x="0" y="0" width="4" height="28" fill="#fff"/>
          <rect x="6" y="0" width="2" height="28" fill="#fff"/>
          <rect x="11" y="0" width="5" height="28" fill="#fff"/>
          <rect x="19" y="0" width="2" height="28" fill="#fff"/>
          <rect x="24" y="0" width="4" height="28" fill="#fff"/>
          <rect x="31" y="0" width="1" height="28" fill="#fff"/>
          <rect x="35" y="0" width="6" height="28" fill="#fff"/>
          <rect x="44" y="0" width="3" height="28" fill="#fff"/>
          <rect x="50" y="0" width="2" height="28" fill="#fff"/>
          <rect x="55" y="0" width="5" height="28" fill="#fff"/>
          <rect x="63" y="0" width="3" height="28" fill="#fff"/>
          <rect x="69" y="0" width="2" height="28" fill="#fff"/>
          <rect x="74" y="0" width="6" height="28" fill="#fff"/>
          <rect x="83" y="0" width="2" height="28" fill="#fff"/>
          <rect x="88" y="0" width="4" height="28" fill="#fff"/>
          <rect x="95" y="0" width="3" height="28" fill="#fff"/>
          <rect x="101" y="0" width="6" height="28" fill="#fff"/>
          <rect x="110" y="0" width="2" height="28" fill="#fff"/>
          <rect x="115" y="0" width="5" height="28" fill="#fff"/>
          <rect x="123" y="0" width="3" height="28" fill="#fff"/>
          <rect x="129" y="0" width="2" height="28" fill="#fff"/>
          <rect x="134" y="0" width="6" height="28" fill="#fff"/>
          <rect x="143" y="0" width="2" height="28" fill="#fff"/>
          <rect x="148" y="0" width="4" height="28" fill="#fff"/>
          <rect x="155" y="0" width="3" height="28" fill="#fff"/>
          <rect x="161" y="0" width="5" height="28" fill="#fff"/>
          <rect x="169" y="0" width="2" height="28" fill="#fff"/>
          <rect x="174" y="0" width="6" height="28" fill="#fff"/>
          <rect x="183" y="0" width="2" height="28" fill="#fff"/>
          <rect x="188" y="0" width="4" height="28" fill="#fff"/>
          <rect x="195" y="0" width="3" height="28" fill="#fff"/>
          <text x="100" y="34" fill="#a0a0a0" font-size="7" text-anchor="middle" font-family="monospace">*${orderNum}*</text>
        </svg>
      </div>
    `;
  }

  // Clear cart and voucher
  cart = [];
  appliedVoucher = null;
  saveCart();
  updateCartUI();

  // Show success view
  document.getElementById('checkoutFormView').classList.add('hidden');
  document.getElementById('orderSuccessView').classList.remove('hidden');

  showToast(`Order #${orderNum} confirmed! Receipt ready.`);
}

// Print Receipt
function printReceipt() {
  window.print();
}

// Dynamic PDF Receipt Generation & Download for Any Order
function downloadOrderReceiptPDF() {
  const receiptElem = document.getElementById('orderReceipt');
  if (!receiptElem) {
    showToast('Receipt element not found.');
    return;
  }

  const orderNum = (lastCompletedOrder && lastCompletedOrder.orderNum) ? lastCompletedOrder.orderNum : 'VELORA';
  showToast('Generating official PDF receipt...');

  const opt = {
    margin:       [8, 8, 8, 8],
    filename:     `VELORA-Receipt-${orderNum}.pdf`,
    image:        { type: 'jpeg', quality: 0.98 },
    html2canvas:  { scale: 2, useCORS: true, letterRendering: true, logging: false },
    jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
  };

  if (typeof html2pdf !== 'undefined') {
    html2pdf().set(opt).from(receiptElem).save().then(() => {
      showToast(`✓ PDF Receipt #${orderNum} downloaded!`);
    }).catch(err => {
      console.warn('PDF download error:', err);
      window.print();
    });
  } else {
    window.print();
  }
}
window.downloadOrderReceiptPDF = downloadOrderReceiptPDF;

// View Dynamic PDF in New Tab for Any Order
function viewOrderReceiptPDF() {
  const receiptElem = document.getElementById('orderReceipt');
  if (!receiptElem) {
    showToast('Receipt element not found.');
    return;
  }

  const orderNum = (lastCompletedOrder && lastCompletedOrder.orderNum) ? lastCompletedOrder.orderNum : 'VELORA';
  showToast('Preparing PDF preview...');

  const opt = {
    margin:       [8, 8, 8, 8],
    filename:     `VELORA-Receipt-${orderNum}.pdf`,
    image:        { type: 'jpeg', quality: 0.98 },
    html2canvas:  { scale: 2, useCORS: true, letterRendering: true, logging: false },
    jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
  };

  if (typeof html2pdf !== 'undefined') {
    html2pdf().set(opt).from(receiptElem).toPdf().get('pdf').then(pdf => {
      const blobUrl = pdf.output('bloburl');
      window.open(blobUrl, '_blank');
      showToast('✓ PDF preview opened in new tab.');
    }).catch(err => {
      console.warn('PDF preview error:', err);
      window.print();
    });
  } else {
    window.print();
  }
}
window.viewOrderReceiptPDF = viewOrderReceiptPDF;


// Download Plaintext Receipt
function downloadReceiptTxt() {
  if (!lastCompletedOrder) return;
  const o = lastCompletedOrder;
  
  const text = `
============================================================
              VÉLORA HAUTE PARFUMERIE • PARIS
       OFFICIAL ORDER RECORD & CERTIFICATE OF AUTHENTICITY
============================================================
Order Reference : #${o.orderNum}
Date & Time     : ${o.orderDate} at ${o.orderTime}
Status          : CONFIRMED & PREPARING
Estimated Arrival: ${o.deliveryDays}

CLIENT DETAILS:
Name            : ${o.name}
Phone           : ${o.phone}
Email           : ${o.email}
Destination     : ${o.address}
Courier Method  : ${o.deliveryMethod}
Payment Mode    : ${o.paymentMethod}
${o.hasGift ? `Gift Inscription: "${o.giftMessage}" (For: ${o.giftRecipient || 'Recipient'})\n` : ''}
------------------------------------------------------------
PURCHASED FRAGRANCE MANIFEST:
${o.items.map(i => `- ${i.name} (${i.size}) x ${i.quantity} = ฿${(i.price * i.quantity).toLocaleString()}`).join('\n')}

------------------------------------------------------------
FINANCIAL SUMMARY:
Subtotal        : ฿${o.subtotal.toLocaleString()}
${o.discountAmount > 0 ? `Privilege Disc  : -฿${o.discountAmount.toLocaleString()} (${o.voucherLabel})\n` : ''}Shipping Fee    : ${o.deliveryFee === 0 ? 'COMPLIMENTARY' : '฿' + o.deliveryFee.toLocaleString()}
Velvet Packaging: INCLUDED
TOTAL SETTLED   : ฿${o.grandTotal.toLocaleString()}
============================================================
Thank you for welcoming VÉLORA into your personal collection.
www.velora-parfums.com
`;

  const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `VELORA-Receipt-${o.orderNum}.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  showToast('Text record downloaded.');
}

function finishOrder() {
  closeCheckoutModal();
  showToast('Thank you for choosing VÉLORA.');
}

function showToast(msg) {
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toastMsg');
  if (!toast || !toastMsg) return;

  toastMsg.textContent = msg;
  toast.classList.remove('hidden');
  setTimeout(() => {
    toast.classList.add('hidden');
  }, 3400);
}

// Global Event Listeners Setup
function setupEventListeners() {
  // Cart button triggers
  const cartBtn = document.getElementById('cartBtn');
  if (cartBtn) cartBtn.addEventListener('click', openCart);

  const footerBag = document.getElementById('footerBagLink');
  if (footerBag) footerBag.addEventListener('click', (e) => { e.preventDefault(); openCart(); });

  const closeCartBtn = document.getElementById('closeCartBtn');
  if (closeCartBtn) closeCartBtn.addEventListener('click', closeCart);

  const closeProdBtn = document.getElementById('closeProductModalBtn');
  if (closeProdBtn) closeProdBtn.addEventListener('click', closeProductModal);

  const closeChkBtn = document.getElementById('closeCheckoutBtn');
  if (closeChkBtn) closeChkBtn.addEventListener('click', closeCheckoutModal);

  // Proceed to Checkout button in cart drawer
  const checkoutBtn = document.getElementById('checkoutBtn');
  if (checkoutBtn) checkoutBtn.addEventListener('click', openCheckout);

  const finishBtn = document.getElementById('finishOrderBtn');
  if (finishBtn) finishBtn.addEventListener('click', finishOrder);

  // Checkout Form Submission
  const checkoutForm = document.getElementById('checkoutForm');
  if (checkoutForm) {
    checkoutForm.addEventListener('submit', handlePlaceOrder);
  }

  // Voucher Apply Button
  const applyVoucherBtn = document.getElementById('applyVoucherBtn');
  if (applyVoucherBtn) {
    applyVoucherBtn.addEventListener('click', handleApplyVoucher);
  }

  // Payment Tab Switching
  const payTabs = document.querySelectorAll('.pay-tab');
  payTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      payTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const radio = tab.querySelector('input[type="radio"]');
      if (radio) radio.checked = true;

      const tabType = tab.getAttribute('data-tab');
      const panelPromptpay = document.getElementById('panelPromptpay');
      const panelCard = document.getElementById('panelCard');
      const panelCod = document.getElementById('panelCod');

      if (panelPromptpay) panelPromptpay.classList.toggle('hidden', tabType !== 'promptpay');
      if (panelCard) panelCard.classList.toggle('hidden', tabType !== 'card');
      if (panelCod) panelCod.classList.toggle('hidden', tabType !== 'cod');
    });
  });

  // Delivery Method Selection
  const deliveryRadios = document.querySelectorAll('input[name="deliveryMethod"]');
  deliveryRadios.forEach(radio => {
    radio.addEventListener('change', () => {
      document.querySelectorAll('.delivery-radio').forEach(lbl => lbl.classList.remove('active'));
      radio.closest('.delivery-radio')?.classList.add('active');

      if (radio.value.includes('VIP Same-Day')) {
        deliveryFee = 150;
      } else {
        deliveryFee = 0;
      }
      const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
      updateCheckoutCalculations(subtotal);
    });
  });

  // Gift Option Toggle
  const giftToggle = document.getElementById('giftOptionToggle');
  const giftDetails = document.getElementById('giftDetailsContainer');
  if (giftToggle && giftDetails) {
    giftToggle.addEventListener('change', () => {
      giftDetails.classList.toggle('hidden', !giftToggle.checked);
    });
  }

  // Slip Upload Preview
  const slipInput = document.getElementById('slipUpload');
  const slipPreview = document.getElementById('slipPreview');
  if (slipInput && slipPreview) {
    slipInput.addEventListener('change', () => {
      if (slipInput.files && slipInput.files[0]) {
        slipPreview.textContent = `Attached: ${slipInput.files[0].name} (${Math.round(slipInput.files[0].size / 1024)} KB)`;
        slipPreview.classList.remove('hidden');
      }
    });
  }

  // Card Number Formatting
  const cardInput = document.getElementById('cardNumber');
  if (cardInput) {
    cardInput.addEventListener('input', (e) => {
      let val = e.target.value.replace(/\D/g, '').substring(0, 16);
      let formatted = val.match(/.{1,4}/g)?.join(' ') || val;
      e.target.value = formatted;
    });
  }

  // Card Expiry Formatting
  const expiryInput = document.getElementById('cardExpiry');
  if (expiryInput) {
    expiryInput.addEventListener('input', (e) => {
      let val = e.target.value.replace(/\D/g, '').substring(0, 4);
      if (val.length >= 3) {
        e.target.value = val.substring(0, 2) + '/' + val.substring(2);
      } else {
        e.target.value = val;
      }
    });
  }

  // Close modals when clicking outside
  window.addEventListener('click', (e) => {
    const prodModal = document.getElementById('productModal');
    const chkModal = document.getElementById('checkoutModal');
    const cartDrawer = document.getElementById('cartDrawer');

    if (e.target === prodModal) closeProductModal();
    if (e.target === chkModal) closeCheckoutModal();
    if (e.target === cartDrawer) closeCart();
  });
}

// Presentation Demo Auto-Fill
function autoFillDemoData() {
  const nameInput = document.getElementById('custName');
  const phoneInput = document.getElementById('custPhone');
  const emailInput = document.getElementById('custEmail');
  const addrInput = document.getElementById('custAddress');

  if (nameInput) nameInput.value = 'Lady Eleanor Vance';
  if (phoneInput) phoneInput.value = '081-987-6543';
  if (emailInput) emailInput.value = 'eleanor.vance@maison-luxe.com';
  if (addrInput) addrInput.value = 'Suite 1402, Mandarin Oriental Residences, 48 Charoen Krung Rd, Bang Rak, Bangkok 10500';

  // Toggle Gift Inscription
  const giftToggle = document.getElementById('giftOptionToggle');
  const giftDetails = document.getElementById('giftDetailsContainer');
  const giftRecipient = document.getElementById('giftRecipient');
  const giftMsg = document.getElementById('giftMessage');

  if (giftToggle && giftDetails) {
    giftToggle.checked = true;
    giftDetails.classList.remove('hidden');
    if (giftRecipient) giftRecipient.value = 'Lord Julian Sterling';
    if (giftMsg) giftMsg.value = 'Wishing you an unforgettable celebration filled with timeless elegance and exquisite notes. Avec tout mon amour.';
  }

  // Auto-apply VIP voucher
  const voucherInput = document.getElementById('voucherCode');
  if (voucherInput) {
    voucherInput.value = 'VELORA10';
    handleApplyVoucher();
  }

  showToast('⚡ Demo VIP details & 10% privilege applied!');
}
window.autoFillDemoData = autoFillDemoData;



