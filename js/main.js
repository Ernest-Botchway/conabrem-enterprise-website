// --------------------------------------------------
// MOBILE NAVIGATION
// --------------------------------------------------
const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');

function closeMobileMenu() {
  mainNav.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
}

menuToggle.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

mainNav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', closeMobileMenu);
});

document.addEventListener('click', (event) => {
  if (!mainNav.contains(event.target) && !menuToggle.contains(event.target)) {
    closeMobileMenu();
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeMobileMenu();
  }
});

// --------------------------------------------------
// COPYRIGHT YEAR
// --------------------------------------------------
document.getElementById('year').textContent = new Date().getFullYear();

// --------------------------------------------------
// PRODUCT ENQUIRY MODAL
// --------------------------------------------------
const orderModal = document.getElementById('orderModal');
const selectedWig = document.getElementById('selectedWig');
const orderForm = document.getElementById('orderForm');

document.querySelectorAll('.enquire-btn').forEach((button) => {
  button.addEventListener('click', () => {
    selectedWig.value = button.dataset.product;
    orderModal.classList.add('open');
    orderModal.setAttribute('aria-hidden', 'false');
    document.getElementById('customerLocation').focus();
  });
});

function closeOrderModal() {
  orderModal.classList.remove('open');
  orderModal.setAttribute('aria-hidden', 'true');
}

document.getElementById('closeOrderModal').addEventListener('click', closeOrderModal);

orderModal.addEventListener('click', (event) => {
  if (event.target === orderModal) {
    closeOrderModal();
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && orderModal.classList.contains('open')) {
    closeOrderModal();
  }
});

orderForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = new FormData(orderForm);
  const message = [
    'Hello CONABREM ENTERPRISE, I would like to enquire/order:',
    'Wig style: ' + formData.get('wig'),
    'Length: ' + formData.get('length'),
    'Texture: ' + formData.get('texture'),
    'Colour: ' + (formData.get('color') || 'Not specified'),
    'Quantity: ' + formData.get('quantity'),
    'Delivery location: ' + formData.get('location'),
    'Additional details: ' + (formData.get('notes') || 'None'),
    'Please confirm availability, price and delivery fee. Thank you.'
  ].join('\n');

  const whatsappUrl =
    'https://wa.me/233242551367?text=' + encodeURIComponent(message);

  window.open(whatsappUrl, '_blank', 'noopener');
});

// --------------------------------------------------
// PRODUCT DETAILS
// --------------------------------------------------
const productDetails = {
  'Sleek Straight': {
    image: './image/products/bb5c465cdd373d1eed7fe136b4dba519.jpg',
    description: 'Classic straight styles with a polished, elegant finish.'
  },
  'Body Wave': {
    image: './image/products/c35c4a63cdf65834fd1edfa8458c47b0.jpg',
    description: 'Soft flowing waves for a glamorous, effortless look.'
  },
  'Curly Glam': {
    image: './image/products/cd840733c34f615a5db0535b4c731218.jpg',
    description: 'Full curls with volume, texture and personality.'
  },
  'Elegant Bob': {
    image: './image/products/4af2691d7a313eed34ab736d586bcd18.jpg',
    description: 'A chic, easy-to-style look for modern everyday beauty.'
  },
  'Luxe Collection': {
    image: './image/products/5e437be2c5651d1f4244319be0d83a8d.jpg',
    description: 'Elevated hair looks for celebrations and special moments.'
  },
  'Everyday Beauty': {
    image: './image/products/605bb13dcc79752a8e7fd20ee88001ec.jpg',
    description: 'Comfortable, versatile styles for your daily routine.'
  }
};

const detailsModal = document.getElementById('detailsModal');
const detailsImage = document.getElementById('detailsImage');
let currentDetailsProduct = '';

function closeDetails() {
  detailsModal.classList.remove('open');
  detailsModal.setAttribute('aria-hidden', 'true');
}

document.querySelectorAll('.view-details-btn').forEach((button) => {
  button.addEventListener('click', () => {
    currentDetailsProduct = button.dataset.details;

    const product = productDetails[currentDetailsProduct];

    document.getElementById('detailsTitle').textContent = currentDetailsProduct;
    document.getElementById('detailsDescription').textContent = product.description;

    detailsImage.src = product.image;
    detailsImage.alt = currentDetailsProduct + ' wig photo';

    detailsModal.classList.add('open');
    detailsModal.setAttribute('aria-hidden', 'false');
  });
});

document.getElementById('closeDetails').addEventListener('click', closeDetails);

detailsModal.addEventListener('click', (event) => {
  if (event.target === detailsModal) {
    closeDetails();
  }
});

document.getElementById('detailsAddCart').addEventListener('click', () => {
  cart[currentDetailsProduct] = (cart[currentDetailsProduct] || 0) + 1;

  renderCart();
  closeDetails();
  openCart();
});

document.getElementById('detailsEnquire').addEventListener('click', () => {
  selectedWig.value = currentDetailsProduct;

  closeDetails();
  orderModal.classList.add('open');
  orderModal.setAttribute('aria-hidden', 'false');
});

// --------------------------------------------------
// COLLECTION SEARCH & FILTERS
// --------------------------------------------------
const filterButtons = document.querySelectorAll('.filter-btn');
const productCards = document.querySelectorAll('.product-card');
const productSearch = document.getElementById('productSearch');
const searchResultCount = document.getElementById('searchResultCount');
let activeCategory = 'all';

function applyCollectionFilters() {
  const query = (productSearch?.value || '').trim().toLowerCase();
  let visibleCount = 0;
  productCards.forEach((card) => {
    const searchable = `${card.dataset.category} ${card.querySelector('h3')?.textContent || ''} ${card.querySelector('p')?.textContent || ''}`.toLowerCase();
    const matchesCategory = activeCategory === 'all' || card.dataset.category === activeCategory;
    const matchesSearch = !query || searchable.includes(query);
    card.hidden = !(matchesCategory && matchesSearch);
    if (!card.hidden) visibleCount++;
  });
  if (searchResultCount) {
    searchResultCount.textContent = visibleCount === 0
      ? 'No styles match your search. Try another term.'
      : `Showing ${visibleCount} ${visibleCount === 1 ? 'style' : 'styles'}`;
  }
}


filterButtons.forEach((filterButton) => {
  filterButton.addEventListener('click', () => {
    activeCategory = filterButton.dataset.filter;
    filterButtons.forEach((button) => button.classList.toggle('active', button === filterButton));
    applyCollectionFilters();
  });
});
productSearch?.addEventListener('input', applyCollectionFilters);

// --------------------------------------------------
// WISHLIST / SAVED STYLES
// --------------------------------------------------
const wishlistOverlay = document.getElementById('wishlistOverlay');
const wishlistItems = document.getElementById('wishlistItems');
const wishlistCount = document.getElementById('wishlistCount');
const wishlistButtons = document.querySelectorAll('[data-wishlist]');
let wishlist = [];
try { wishlist = JSON.parse(localStorage.getItem('conabremWishlist') || '[]'); } catch { wishlist = []; }

function updateWishlistButtons() {
  wishlistButtons.forEach((button) => {
    const saved = wishlist.includes(button.dataset.wishlist);
    button.classList.toggle('saved', saved);
    button.setAttribute('aria-pressed', String(saved));
    button.textContent = saved ? '♥ Saved' : '♡ Save';
  });
  if (wishlistCount) wishlistCount.textContent = wishlist.length;
}
function renderWishlist() {
  if (!wishlistItems) return;
  if (!wishlist.length) {
    wishlistItems.innerHTML = '<p class="wishlist-empty">You have not saved any styles yet. Tap “Save” on a style to keep it here.</p>';
    updateWishlistButtons();
    return;
  }
  wishlistItems.innerHTML = wishlist.map((name) => {
    const product = productDetails[name];
    return `<article class="wishlist-item"><div class="wishlist-item-photo" data-product-name="${name}"></div><div class="wishlist-item-info"><strong>${name}</strong><p>${product?.description || 'Saved style'}</p><div class="wishlist-item-actions"><button type="button" data-wish-action="details" data-wish-name="${name}">Details</button><button type="button" data-wish-action="enquire" data-wish-name="${name}">Enquire</button><button type="button" data-wish-action="cart" data-wish-name="${name}">Add to cart</button><button type="button" data-wish-action="remove" data-wish-name="${name}">Remove</button></div></div></article>`;
  }).join('');
  wishlistItems.querySelectorAll('.wishlist-item-photo').forEach((photo) => {
    const product = productDetails[photo.dataset.productName];
    if (product) photo.style.backgroundImage = `url("${product.image}")`;
  });
  wishlistItems.querySelectorAll('[data-wish-action]').forEach((button) => {
    button.addEventListener('click', () => {
      const name = button.dataset.wishName;
      const action = button.dataset.wishAction;
      if (action === 'remove') {
        wishlist = wishlist.filter((savedName) => savedName !== name);
        localStorage.setItem('conabremWishlist', JSON.stringify(wishlist));
        renderWishlist();
      } else if (action === 'details') {
        wishlistOverlay.classList.remove('open');
        wishlistOverlay.setAttribute('aria-hidden', 'true');
        const detailsButton = [...document.querySelectorAll('.view-details-btn')].find((item) => item.dataset.details === name);
        detailsButton?.click();
      } else if (action === 'cart') {
        cart[name] = (cart[name] || 0) + 1;
        renderCart();
        closeWishlist();
        openCart();
      } else if (action === 'enquire') {
        wishlistOverlay.classList.remove('open');
        wishlistOverlay.setAttribute('aria-hidden', 'true');
        selectedWig.value = name;
        orderModal.classList.add('open');
        orderModal.setAttribute('aria-hidden', 'false');
      }
    });
  });
  updateWishlistButtons();
}
wishlistButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const name = button.dataset.wishlist;
    wishlist = wishlist.includes(name) ? wishlist.filter((saved) => saved !== name) : [...wishlist, name];
    localStorage.setItem('conabremWishlist', JSON.stringify(wishlist));
    renderWishlist();
  });
});
function openWishlist() {
  wishlistOverlay.classList.add('open');
  wishlistOverlay.setAttribute('aria-hidden', 'false');
  renderWishlist();
}
function closeWishlist() {
  wishlistOverlay.classList.remove('open');
  wishlistOverlay.setAttribute('aria-hidden', 'true');
}
document.getElementById('openWishlist')?.addEventListener('click', openWishlist);
document.getElementById('closeWishlist')?.addEventListener('click', closeWishlist);
wishlistOverlay?.addEventListener('click', (event) => { if (event.target === wishlistOverlay) closeWishlist(); });
document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeWishlist(); });
renderWishlist();

// --------------------------------------------------
// SHOPPING CART & CHECKOUT
// --------------------------------------------------
const cart = {};
const cartOverlay = document.getElementById('cartOverlay');
const cartItemsEl = document.getElementById('cartItems');
const cartTotalItemsEl = document.getElementById('cartTotalItems');
const checkoutDetails = document.getElementById('checkoutDetails');
const orderReview = document.getElementById('orderReview');
const checkoutForm = document.getElementById('checkoutForm');
const reviewContents = document.getElementById('reviewContents');
const reviewLocationEl = document.getElementById('reviewLocation');
let pendingOrder = null;

function openCart() {
  cartOverlay.classList.add('open');
  cartOverlay.setAttribute('aria-hidden', 'false');
  renderCart();
}


function closeCart() {
  cartOverlay.classList.remove('open');
  cartOverlay.setAttribute('aria-hidden', 'true');
  orderReview.hidden = true;
  checkoutDetails.hidden = false;
  pendingOrder = null;
}


document.getElementById('openCart').addEventListener('click', openCart);
document.getElementById('closeCart').addEventListener('click', closeCart);

cartOverlay.addEventListener('click', (event) => {
  if (event.target === cartOverlay) closeCart();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeCart();
});


// Add products to the cart from collection cards.
document.querySelectorAll('.add-cart-btn').forEach((button) => {
  button.addEventListener('click', () => {
    const productName = button.dataset.cartProduct;
    cart[productName] = (cart[productName] || 0) + 1;
    renderCart();

    const originalLabel = button.textContent;
    button.textContent = 'Added ✓';
    setTimeout(() => { button.textContent = originalLabel; }, 900);
  });
});


// Render cart rows with image thumbnails, quantity controls and remove action.
function renderCart() {
  const productNames = Object.keys(cart);
  const totalItems = productNames.reduce((sum, name) => sum + cart[name], 0);

  document.getElementById('cartCount').textContent = totalItems;
  cartTotalItemsEl.textContent = totalItems;

  if (productNames.length === 0) {
    cartItemsEl.innerHTML = `
      <div class="cart-empty">
        Your cart is empty.<br>
        Browse the collection and add styles you love.
      </div>`;
    return;
  }

  cartItemsEl.innerHTML = productNames.map((name) => {
    const card = [...document.querySelectorAll('.product-card')]
      .find((item) => item.querySelector('[data-cart-product]')?.dataset.cartProduct === name);
    const imageClass = card?.querySelector('.product-image')?.className || 'product-image';

    return `
      <article class="cart-item">
        <div class="cart-item-thumb ${imageClass}" aria-hidden="true"></div>
        <div class="cart-item-info">
          <strong>${name}</strong>
          <small>Price: To be confirmed</small>
          <div class="cart-controls">
            <button type="button" data-action="minus" data-name="${name}" aria-label="Decrease ${name} quantity">−</button>
            <span class="cart-quantity" aria-label="Quantity">${cart[name]}</span>
            <button type="button" data-action="plus" data-name="${name}" aria-label="Increase ${name} quantity">+</button>
            <button class="cart-remove" type="button" data-action="remove" data-name="${name}">Remove</button>
          </div>
        </div>
      </article>`;
  }).join('');

  cartItemsEl.querySelectorAll('[data-action]').forEach((control) => {
    control.addEventListener('click', () => {
      const productName = control.dataset.name;
      const action = control.dataset.action;

      if (action === 'plus') cart[productName]++;
      if (action === 'minus') {
        cart[productName]--;
        if (cart[productName] <= 0) delete cart[productName];
      }
      if (action === 'remove') delete cart[productName];
      renderCart();
    });
  });
}


// Clear cart only after the customer confirms the action.
document.getElementById('clearCart').addEventListener('click', () => {
  if (Object.keys(cart).length === 0) return;
  const shouldClear = window.confirm('Clear all items from your cart?');
  if (!shouldClear) return;

  Object.keys(cart).forEach((name) => delete cart[name]);
  renderCart();
  checkoutForm.reset();
  orderReview.hidden = true;
  checkoutDetails.hidden = false;
  pendingOrder = null;
});


// Continue-to-checkout button works contextually:
// 1) First click opens delivery details.
// 2) If details are already open, it validates and proceeds to order review.
document.getElementById('checkoutCart').addEventListener('click', (event) => {
  event.preventDefault();
  if (Object.keys(cart).length === 0) {
    alert('Your cart is empty. Please add a wig style first.');
    return;
  }

  if (checkoutDetails.hidden) {
    orderReview.hidden = true;
    checkoutDetails.hidden = false;
    checkoutDetails.scrollIntoView({ behavior: 'smooth', block: 'start' });
    document.getElementById('checkoutName').focus({ preventScroll: true });
    return;
  }

  // Delivery form is already visible: proceed to review using native validation.
  if (typeof checkoutForm.requestSubmit === 'function') {
    checkoutForm.requestSubmit();
  } else {
    checkoutForm.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
  }
});


// The Review order button is a native submit button. Let the browser handle its
// click/keyboard/touch submission once, avoiding a duplicate requestSubmit call.

// Build a review step before the customer sends their order to WhatsApp.
checkoutForm.addEventListener('submit', (event) => {
  event.preventDefault();
  if (Object.keys(cart).length === 0) {
    alert('Your cart is empty. Add a product before checkout.');
    return;
  }

  const formData = new FormData(checkoutForm);
  pendingOrder = {
    reference: 'CE-' + Date.now().toString(36).toUpperCase(),
    customerName: formData.get('customerName').trim(),
    customerPhone: formData.get('customerPhone').trim(),
    area: formData.get('area').trim(),
    landmark: formData.get('landmark').trim(),
    notes: formData.get('checkoutNotes').trim(),
    items: Object.entries(cart).map(([name, quantity]) => ({ name, quantity }))
  };

  reviewContents.innerHTML = `
    <ul class="review-items">
      ${pendingOrder.items.map((item) => `<li><span>${item.name}</span><strong>× ${item.quantity}</strong></li>`).join('')}
    <li class="review-total"><span>Total items</span><strong>${pendingOrder.items.reduce((sum, item) => sum + item.quantity, 0)}</strong></li>
    <li class="review-total"><span>Price</span><strong>To be confirmed</strong></li>
  </ul>`;
  reviewLocationEl.textContent = `Reference: ${pendingOrder.reference}\nDelivery: ${pendingOrder.area}${pendingOrder.landmark ? ' · ' + pendingOrder.landmark : ''}`;
  checkoutDetails.hidden = true;
  orderReview.hidden = false;
  orderReview.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

// Return to the checkout form to edit customer details.
document.getElementById('backToCheckout').addEventListener('click', () => {
  orderReview.hidden = true;
  checkoutDetails.hidden = false;
  checkoutDetails.scrollIntoView({ behavior: 'smooth', block: 'start' });
});


// Confirm and send the reviewed order through WhatsApp.
document.getElementById('sendWhatsAppOrder').addEventListener('click', () => {
  if (!pendingOrder) return;

  const lines = [
    'Hello CONABREM ENTERPRISE, I would like to order/enquire about these wig styles:',
    `Enquiry reference: ${pendingOrder.reference}`,
    '',
    ...pendingOrder.items.map((item) => `- ${item.name} (Quantity: ${item.quantity})`),
    '',
    `Customer: ${pendingOrder.customerName}`,
    `Phone/WhatsApp: ${pendingOrder.customerPhone}`,
    `Delivery area: ${pendingOrder.area}`,
    `Landmark/directions: ${pendingOrder.landmark || 'Not provided'}`,
    `Additional notes: ${pendingOrder.notes || 'None'}`,
    '',
    'Please confirm stock, prices and delivery fee based on my location. Thank you.'
  ];

  const whatsappUrl = 'https://wa.me/233242551367?text=' + encodeURIComponent(lines.join('\n'));
  try {
    const recent = JSON.parse(localStorage.getItem('conabremRecentEnquiries') || '[]');
    recent.unshift({ reference: pendingOrder.reference, date: new Date().toISOString(), items: pendingOrder.items.map((item) => ({ ...item })), area: pendingOrder.area });
    localStorage.setItem('conabremRecentEnquiries', JSON.stringify(recent.slice(0, 5)));
    renderRecentEnquiries();
  } catch { /* Keep WhatsApp handoff working if local storage is unavailable. */ }
  window.open(whatsappUrl, '_blank', 'noopener');
});


// --------------------------------------------------
// RECENT ENQUIRY REFERENCES (LOCAL DEVICE ONLY)
// --------------------------------------------------
function renderRecentEnquiries() {
  const list = document.getElementById('recentEnquiryList');
  if (!list) return;
  let recent = [];
  try { recent = JSON.parse(localStorage.getItem('conabremRecentEnquiries') || '[]'); } catch { recent = []; }
  if (!recent.length) {
    list.innerHTML = '<li>No enquiry references saved on this device yet.</li>';
    return;
  }
  list.innerHTML = recent.slice(0, 5).map((entry) => {
    const date = new Date(entry.date).toLocaleString();
    const itemSummary = (entry.items || []).map((item) => `${item.name} × ${item.quantity}`).join(', ');
    return `<li><strong>${entry.reference}</strong><span>${date}</span><p>${itemSummary}</p><small>Area: ${entry.area}</small></li>`;
  }).join('');
}
renderRecentEnquiries();

// Render initial cart state.
renderCart();
