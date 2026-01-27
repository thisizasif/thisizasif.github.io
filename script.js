// Enhanced script.js with star effects

// DOM Elements
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Mobile Navigation
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.innerHTML = navMenu.classList.contains('active')
        ? '<i class="fas fa-times"></i>'
        : '<i class="fas fa-bars"></i>';
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Active nav link on scroll
const sections = document.querySelectorAll('section');
const navLinksArray = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const headerHeight = document.querySelector('.navbar').offsetHeight;

        if (scrollY >= (sectionTop - headerHeight - 100)) {
            current = section.getAttribute('id');
        }
    });

    navLinksArray.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Typewriter effect
const typeText = document.querySelector('.type-text');
const phrases = ['Dream Developer', 'Frontend Wizard', 'UI/UX Enthusiast', 'Problem Solver'];
let currentPhraseIndex = 0;
let currentCharIndex = 0;
let isDeleting = false;
let isPaused = false;

function typeWriter() {
    const currentPhrase = phrases[currentPhraseIndex];

    if (isDeleting) {
        // Deleting text
        typeText.textContent = currentPhrase.substring(0, currentCharIndex - 1);
        currentCharIndex--;

        if (currentCharIndex === 0) {
            isDeleting = false;
            currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
            setTimeout(typeWriter, 500);
            return;
        }
    } else {
        // Typing text
        typeText.textContent = currentPhrase.substring(0, currentCharIndex + 1);
        currentCharIndex++;

        if (currentCharIndex === currentPhrase.length) {
            isPaused = true;
            setTimeout(() => {
                isPaused = false;
                isDeleting = true;
                setTimeout(typeWriter, 1000);
            }, 2000);
            return;
        }
    }

    const typingSpeed = isDeleting ? 50 : 100;
    setTimeout(typeWriter, typingSpeed);
}

// Start typewriter effect
setTimeout(typeWriter, 1000);

// Floating animation for code window
const codeWindow = document.querySelector('.code-window');
if (codeWindow) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        codeWindow.style.transform = `translateY(${rate}px)`;
    });
}

// Add additional dynamic stars
function createDynamicStars() {
    const starsContainer = document.querySelector('.stars-container');
    if (!starsContainer) return;

    // Create additional twinkling stars
    for (let i = 0; i < 20; i++) {
        const star = document.createElement('div');
        star.className = 'dynamic-star';

        // Random position
        const left = Math.random() * 100;
        const top = Math.random() * 100;

        // Random size
        const size = Math.random() * 3 + 1;

        // Random animation delay
        const delay = Math.random() * 5;

        // Random blink duration
        const duration = Math.random() * 3 + 2;

        // Set styles
        star.style.cssText = `
            position: absolute;
            left: ${left}%;
            top: ${top}%;
            width: ${size}px;
            height: ${size}px;
            background: ${Math.random() > 0.7 ? 'var(--purple-primary)' : 'white'};
            border-radius: 50%;
            opacity: ${Math.random() * 0.7 + 0.3};
            animation: dynamic-blink ${duration}s infinite ${delay}s;
            box-shadow: 0 0 ${size * 2}px ${Math.random() > 0.7 ? 'var(--purple-glow)' : 'rgba(255, 255, 255, 0.5)'};
            pointer-events: none;
        `;

        starsContainer.appendChild(star);
    }

    // Add CSS for dynamic stars
    const style = document.createElement('style');
    style.textContent = `
        @keyframes dynamic-blink {
            0%, 100% { opacity: 0.3; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.2); }
        }
    `;
    document.head.appendChild(style);
}

// Create dynamic stars on load
document.addEventListener('DOMContentLoaded', createDynamicStars);

// Add parallax effect to stars
window.addEventListener('scroll', () => {
    const starsContainer = document.querySelector('.stars-container');
    if (starsContainer) {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.2;
        starsContainer.style.transform = `translateY(${rate}px)`;
    }
});

// Add mouse move effect for stars
document.addEventListener('mousemove', (e) => {
    const stars = document.querySelectorAll('.dynamic-star');
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;

    stars.forEach((star, index) => {
        const speed = (index + 1) * 0.0001;
        const x = (mouseX * speed * 100);
        const y = (mouseY * speed * 100);

        star.style.transform = `translate(${x}px, ${y}px)`;
    });
});

// Add glow effect to buttons on hover
document.querySelectorAll('.btn-primary, .btn-secondary, .social-icon').forEach(button => {
    button.addEventListener('mouseenter', function () {
        this.style.boxShadow = '0 0 20px var(--purple-glow)';
    });

    button.addEventListener('mouseleave', function () {
        this.style.boxShadow = '';
    });
});

// Add ripple effect to CTA button
const ctaButton = document.querySelector('.cta-button');
if (ctaButton) {
    ctaButton.addEventListener('click', function (e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            width: ${size}px;
            height: ${size}px;
            top: ${y}px;
            left: ${x}px;
            transform: scale(0);
            animation: ripple 0.6s linear;
        `;

        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });

    // Add ripple animation CSS
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyle);
}