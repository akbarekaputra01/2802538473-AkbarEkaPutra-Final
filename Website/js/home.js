document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");
    const navItems = document.querySelectorAll(".nav-links li:not(.play-now-container) a"); // Exclude PLAY NOW

    // Dapatkan path saat ini
    const currentPath = window.location.pathname.toLowerCase();
    const currentPage = currentPath.split('/').filter(Boolean).pop() || 'index.html';

    // Highlight link menu navigasi biasa saja
    navItems.forEach(link => {
        const linkPath = link.getAttribute("href").toLowerCase();
        const linkPage = linkPath.split('/').filter(Boolean).pop();

        // Periksa kecocokan dengan beberapa kondisi
        const isActive =
            linkPage === currentPage ||
            (currentPage === 'index.html' && (linkPath.endsWith('/') || linkPath === './index.html')) ||
            (linkPage === 'report-bug.html' && currentPage.startsWith('report'));

        link.classList.toggle("active", isActive);
    });

    // Hamburger menu toggle
    if (hamburger) {
        hamburger.addEventListener("click", (e) => {
            e.stopPropagation();
            navLinks.classList.toggle("active");
        });

        document.addEventListener("click", (e) => {
            if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
                navLinks.classList.remove("active");
            }
        });
    }
});