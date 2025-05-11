// DOM Elements
const menuButton = document.querySelector('.menu-button');
const searchButton = document.querySelector('.search-button');
const mobileMenu = document.querySelector('.mobile-menu');
const newsletterForm = document.querySelector('.newsletter-form');

// Toggle Mobile Menu
menuButton?.addEventListener('click', () => {
  mobileMenu?.classList.toggle('active');
  menuButton.setAttribute('aria-expanded', 
    menuButton.getAttribute('aria-expanded') === 'true' ? 'false' : 'true'
  );
});

// Search Overlay
function createSearchOverlay() {
  const overlay = document.createElement('div');
  overlay.className = 'search-overlay';
  overlay.innerHTML = `
    <div class="search-modal">
      <div class="search-header">
        <input type="text" 
               class="search-input" 
               placeholder="Tìm kiếm bài viết..." 
               autocomplete="off"
               aria-label="Search">
        <button class="close-search" aria-label="Close search">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
      <div class="search-results">
        <p class="search-message">Nhập từ khóa để tìm kiếm</p>
      </div>
    </div>
  `;

  document.body.appendChild(overlay);
  
  const searchInput = overlay.querySelector('.search-input');
  const closeButton = overlay.querySelector('.close-search');
  
  searchInput?.focus();
  
  function closeSearch() {
    overlay.remove();
  }
  
  closeButton?.addEventListener('click', closeSearch);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeSearch();
  });
  
  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeSearch();
  });
}

searchButton?.addEventListener('click', createSearchOverlay);

// Newsletter Form
newsletterForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const emailInput = newsletterForm.querySelector('input[type="email"]');
  const email = emailInput?.value;
  
  if (!email || !isValidEmail(email)) {
    showFormMessage('Vui lòng nhập email hợp lệ', 'error');
    return;
  }
  
  // Simulate form submission
  showFormMessage('Đang xử lý...', 'info');
  
  setTimeout(() => {
    newsletterForm.innerHTML = `
      <div class="newsletter-success">
        <h4>Cảm ơn bạn đã đăng ký!</h4>
        <p>Chúng tôi đã gửi email xác nhận đến ${email}</p>
      </div>
    `;
  }, 1000);
});

// Utility Functions
function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function showFormMessage(message, type) {
  const messageElement = document.querySelector('.form-message');
  if (messageElement) {
    messageElement.textContent = message;
    messageElement.className = `form-message ${type}`;
  }
}

// Lazy Loading Images
document.addEventListener('DOMContentLoaded', () => {
  const images = document.querySelectorAll('img[data-src]');
  
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        observer.unobserve(img);
      }
    });
  });
  
  images.forEach(img => imageObserver.observe(img));
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});