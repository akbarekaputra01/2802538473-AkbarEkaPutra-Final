document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");
    const links = document.querySelectorAll(".nav-links a");

    const currentPath = window.location.pathname;
    const currentPage = currentPath.split('/').pop() || 'index.html';

    // Highlight link menu navigasi yang sedang aktif
    links.forEach(link => {
        const linkPath = link.getAttribute("href");
        const linkPage = linkPath.split('/').pop();

        // Periksa apakah link saat ini cocok dengan halaman yang aktif
        if (linkPage === currentPage ||
            (currentPage === 'index.html' && linkPath === './index.html') ||
            (currentPage === '' && linkPath === './index.html')) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    });

    // Event listener untuk hamburger menu (navigasi di mobile)
    if (hamburger) {
        hamburger.addEventListener("click", (e) => {
            e.stopPropagation();
            navLinks.classList.toggle("active");
        });

        // Menutup menu jika klik di luar navigasi
        document.addEventListener("click", (e) => {
            if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
                navLinks.classList.remove("active");
            }
        });
    }

    // News cards animation
    const newsCards = document.querySelectorAll('.news-card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });

    newsCards.forEach(card => {
        card.style.opacity = 0;
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });

    // News Filter Functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const newsArticles = document.querySelectorAll('.news-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            newsArticles.forEach(article => {
                if (filterValue === 'all') {
                    article.style.display = 'flex';
                } else {
                    if (article.getAttribute('data-category') === filterValue) {
                        article.style.display = 'flex';
                    } else {
                        article.style.display = 'none';
                    }
                }
            });
        });
    });
});