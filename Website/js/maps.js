// Initialize carousels
const carousels = {
    'fracture': {
        currentIndex: 0,
        totalSlides: 5
    },
    'ascent': {
        currentIndex: 0,
        totalSlides: 5
    },
    'bind': {
        currentIndex: 0,
        totalSlides: 5
    },
    'icebox': {
        currentIndex: 0,
        totalSlides: 5
    },
    'breeze': {
        currentIndex: 0,
        totalSlides: 5
    }
};

// Function to move slides
function moveSlide(mapName, direction) {
    const carousel = carousels[mapName];
    carousel.currentIndex += direction;

    // Wrap around if at beginning or end
    if (carousel.currentIndex < 0) {
        carousel.currentIndex = carousel.totalSlides - 1;
    } else if (carousel.currentIndex >= carousel.totalSlides) {
        carousel.currentIndex = 0;
    }

    updateCarousel(mapName);
}

// Function to go to specific slide
function goToSlide(mapName, index) {
    carousels[mapName].currentIndex = index;
    updateCarousel(mapName);
}

// Update carousel display and indicators
function updateCarousel(mapName) {
    const carousel = carousels[mapName];
    const carouselElement = document.getElementById(`${mapName}-carousel`);
    const indicators = document.getElementById(`${mapName}-indicators`).children;

    // Update slide position
    carouselElement.style.transform = `translateX(-${carousel.currentIndex * 100}%)`;

    // Update indicators
    for (let i = 0; i < indicators.length; i++) {
        indicators[i].classList.toggle('active', i === carousel.currentIndex);
    }
}

// Auto-advance carousels
function autoAdvance() {
    for (const mapName in carousels) {
        moveSlide(mapName, 1);
    }
}

// Set interval for auto-advance (every 5 seconds)
setInterval(autoAdvance, 5000);

// Initialize all carousels on page load
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

    for (const mapName in carousels) {
        updateCarousel(mapName);
    }
});