const navbar = document.getElementById("navbar");
const navbarTitle = document.getElementById("navbarTitle");
const largeTitle = document.getElementById("largeTitle");

// Intersection Observer to detect title coverage
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.intersectionRatio < 1) {
            largeTitle.classList.add("fade-out");
            navbarTitle.classList.add("visible");
        } else {
            largeTitle.classList.remove("fade-out");
            navbarTitle.classList.remove("visible");
        }
    });
}, {
    threshold: [0, 1]  // Trigger at exact intersection
});

// Observe the large title
observer.observe(largeTitle);

// Glassmorphic effect for navbar after further scrolling
window.addEventListener("scroll", function() {
    if (window.scrollY > 180) {
        navbar.classList.add("glass");
    } else {
        navbar.classList.remove("glass");
    }
});
