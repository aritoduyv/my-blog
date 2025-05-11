// DOM Elements
const menuBtn = document.querySelector('.menu-btn');
const searchBtn = document.querySelector('.search-btn');
const newsletterForm = document.getElementById('newsletter-form');

// Toggle mobile menu
menuBtn.addEventListener('click', () => {
    const nav = document.querySelector('.nav-links');
    nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
});

// Search functionality
searchBtn.addEventListener('click', () => {
    // Create search overlay
    const overlay = document.createElement('div');
    overlay.className = 'search-overlay';
    overlay.innerHTML = `
        <div class="search-modal">
            <div class="search-header">
                <input type="text" placeholder="Tìm kiếm bài viết..." autofocus>
                <button class="close-search">×</button>
            </div>
            <div class="search-results">
                <p class="search-hint">Nhập từ khóa để tìm kiếm bài viết.</p>
            </div>
        </div>
    `;

    document.body.appendChild(overlay);

    // Close search when clicking close button or outside
    const closeBtn = overlay.querySelector('.close-search');
    closeBtn.addEventListener('click', () => overlay.remove());
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) overlay.remove();
    });
});

// Newsletter form submission
newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = newsletterForm.querySelector('input').value;
    
    // Simple email validation
    if (!email || !email.includes('@')) {
        alert('Vui lòng nhập địa chỉ email hợp lệ');
        return;
    }

    // Show success message
    newsletterForm.innerHTML = `
        <div class="newsletter-success">
            <h4>Cảm ơn bạn đã đăng ký!</h4>
            <p>Chúng tôi đã gửi email xác nhận đến địa chỉ ${email}.</p>
        </div>
    `;
});

// Load posts dynamically
const loadPosts = async () => {
    // Simulated post data
    const posts = [
        {
            title: 'Xu hướng công nghệ 2024',
            excerpt: 'Khám phá những xu hướng công nghệ mới nhất và cách chúng ảnh hưởng đến cuộc sống.',
            image: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg',
            category: 'Công nghệ',
            author: 'Jane Smith',
            date: '10 tháng 3, 2024',
            readTime: '4'
        },
        // Add more posts as needed
    ];

    const postsGrid = document.querySelector('.posts-grid');
    
    posts.forEach(post => {
        const postCard = document.createElement('article');
        postCard.className = 'post-card';
        postCard.innerHTML = `
            <div class="post-card-image">
                <img src="${post.image}" alt="${post.title}">
            </div>
            <div class="post-card-content">
                <a href="#" class="post-category">${post.category}</a>
                <h3 class="post-card-title">
                    <a href="#">${post.title}</a>
                </h3>
                <p class="post-card-excerpt">${post.excerpt}</p>
                <div class="post-card-meta">
                    <span class="author">${post.author}</span>
                    <span class="date">${post.date}</span>
                    <span class="read-time">${post.readTime} phút đọc</span>
                </div>
            </div>
        `;
        postsGrid.appendChild(postCard);
    });
};

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    loadPosts();
});