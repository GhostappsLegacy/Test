const navbar = document.getElementById("navbar");
const navbarTitle = document.getElementById("navbarTitle");
const largeTitle = document.getElementById("largeTitle");
const content = document.querySelector('.content');

let titleAdopted = false;

// Detect Title Collapse (Intersection Observer)
const titleObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.intersectionRatio < 1) {
            largeTitle.classList.add("fade-out");
            navbarTitle.classList.add("visible");
            
            // Lock navbar in fully black state when the title is adopted
            navbar.style.backgroundColor = "rgba(0, 0, 0, 1)";
            titleAdopted = true;
        } else {
            largeTitle.classList.remove("fade-out");
            navbarTitle.classList.remove("visible");
            
            resetNavbar();
            titleAdopted = false;
        }
    });
}, {
    threshold: [1]
});

titleObserver.observe(largeTitle);

// Smooth Scroll Tracking After Title Adoption
window.addEventListener("scroll", () => {
    if (titleAdopted) {
        const navbarRect = navbar.getBoundingClientRect();
        const contentRect = content.getBoundingClientRect();
        const overlap = Math.max(0, navbarRect.bottom - contentRect.top);
        const maxOverlap = navbarRect.height;

        const progress = Math.min(overlap / maxOverlap, 1);
        applyGlassEffect(progress);
    }
});

// Apply Smooth Glass Effect
function applyGlassEffect(progress) {
    const maxBlur = 12;
    const maxOpacityReduction = 0.25;  // Reduce opacity by 25% max
    
    const opacity = 1 - (maxOpacityReduction * progress);
    const blurAmount = `${maxBlur * progress}px`;

    navbar.style.backgroundColor = `rgba(28, 28, 30, ${opacity})`;
    navbar.style.backdropFilter = `blur(${blurAmount})`;
    navbar.style.webkitBackdropFilter = `blur(${blurAmount})`;
}

// Reset to Solid Black
function resetNavbar() {
    navbar.style.backgroundColor = "rgba(0, 0, 0, 1)";
    navbar.style.backdropFilter = "none";
    navbar.style.webkitBackdropFilter = "none";
}