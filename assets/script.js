// ===== JAVASCRIPT =====

// ===== HERO SLIDER =====
let slideIndex = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');

function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    slides[index].classList.add('active');
    dots[index].classList.add('active');
    slideIndex = index;
}

function currentSlide(index) {
    showSlide(index);
    resetAutoSlide();
}

function nextSlide() {
    slideIndex = (slideIndex + 1) % slides.length;
    showSlide(slideIndex);
}

let autoSlideInterval = setInterval(nextSlide, 4000);

function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    autoSlideInterval = setInterval(nextSlide, 4000);
}

// ===== GALLERY WITH CHANGING IMAGES =====
const galleryImages = [
    {
        thumb: 'https://images.unsplash.com/photo-1560869713-7d0a29430803?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        full: 'https://images.unsplash.com/photo-1560869713-7d0a29430803?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
        title: 'Haircut Style 1'
    },
    {
        thumb: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        full: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
        title: 'Haircut Style 2'
    },
    {
        thumb: 'https://images.unsplash.com/photo-1622296089863-eb7fc530daa8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        full: 'https://images.unsplash.com/photo-1622296089863-eb7fc530daa8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
        title: 'Haircut Style 3'
    },
    {
        thumb: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        full: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
        title: 'Barbershop Interior'
    },
    {
        thumb: 'https://images.unsplash.com/photo-1593702288056-7927b442d0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        full: 'https://images.unsplash.com/photo-1593702288056-7927b442d0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
        title: 'Beard Trim'
    },
    {
        thumb: 'https://images.unsplash.com/photo-1621607512214-68297480165e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        full: 'https://images.unsplash.com/photo-1621607512214-68297480165e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
        title: 'Hair Coloring'
    }
];

function loadGallery() {
    const galleryGrid = document.getElementById('galleryGrid');
    galleryGrid.innerHTML = '';
    
    galleryImages.forEach((image, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.onclick = function() { openModal(image.full); };
        
        galleryItem.innerHTML = `
            <img src="${image.thumb}" alt="${image.title}" id="galleryImg${index}">
            <div class="gallery-overlay"><i class="fas fa-search-plus"></i></div>
        `;
        
        galleryGrid.appendChild(galleryItem);
    });
}

// Change gallery images every 5 seconds
function startGalleryRotation() {
    setInterval(() => {
        const images = document.querySelectorAll('.gallery-item img');
        images.forEach((img, index) => {
            const randomNum = Math.floor(Math.random() * 100);
            img.style.opacity = '0.5';
            setTimeout(() => {
                img.src = `${galleryImages[index].thumb}?random=${randomNum}`;
                img.style.opacity = '1';
            }, 300);
        });
    }, 5000);
}

// Change about image periodically
const aboutImages = [
    'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1560869713-7d0a29430803?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
];

let aboutImageIndex = 0;
function changeAboutImage() {
    const aboutImage = document.getElementById('aboutImage');
    aboutImage.style.opacity = '0';
    setTimeout(() => {
        aboutImageIndex = (aboutImageIndex + 1) % aboutImages.length;
        aboutImage.src = aboutImages[aboutImageIndex];
        aboutImage.style.opacity = '1';
    }, 500);
}

setInterval(changeAboutImage, 4000);

// ===== DARK MODE =====
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle.querySelector('i');

// Check saved theme on page load
const savedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

// Theme toggle button
themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

// Update theme icon
function updateThemeIcon(theme) {
    if (theme === 'dark') {
        themeIcon.className = 'fas fa-sun';
    } else {
        themeIcon.className = 'fas fa-moon';
    }
}

// ===== MOBILE MENU =====
const mobileMenu = document.getElementById('mobileMenu');
const navLinks = document.getElementById('navLinks');

mobileMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// ===== NAVBAR SCROLL EFFECT =====
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Scroll to top button
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    if (window.scrollY > 300) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

// ===== SCROLL TO TOP =====
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// ===== SMOOTH SCROLL FOR NAVIGATION LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// ===== MODAL FOR GALLERY =====
function openModal(imageSrc) {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    modal.style.display = 'flex';
    modalImage.src = imageSrc;
}

function closeModal() {
    document.getElementById('imageModal').style.display = 'none';
}

// Close modal when clicking outside the image
document.getElementById('imageModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// ===== CONTACT FORM =====
function sendMessage() {
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const message = document.getElementById('message').value;

    if (name === '' || phone === '' || message === '') {
        alert('Please fill in all fields!');
        return;
    }

    // Phone number validation
    const phoneRegex = /^\+?[0-9]{9,13}$/;
    if (!phoneRegex.test(phone.replace(/\s/g, ''))) {
        alert('Please enter a valid phone number!');
        return;
    }

    // Simulate sending message
    alert(`Thank you, ${name}! Your message has been received. We will contact you soon.`);
    
    // Clear form
    document.getElementById('name').value = '';
    document.getElementById('phone').value = '';
    document.getElementById('message').value = '';
}

// ===== ANIMATION OBSERVER =====
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe service cards and team cards for animation
document.querySelectorAll('.service-card, .team-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// ===== INITIALIZE =====
// Load gallery on page load
window.addEventListener('DOMContentLoaded', () => {
    loadGallery();
    startGalleryRotation();
});