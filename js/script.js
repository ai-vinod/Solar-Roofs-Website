// Initialize AOS (Animate On Scroll) library
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS animation with enhanced settings
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: false,
        mirror: true,
        offset: 120,
        delay: 100,
        anchorPlacement: 'top-bottom'
    });

    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }
    
    // Slideshow functionality
    let slideIndex = 0;
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    
    // Initialize slideshow
    if (slides.length > 0) {
        showSlides();
    }
    
    // Show slides function
    function showSlides() {
        // Hide all slides
        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
            dots[i].classList.remove('active');
        }
        
        // Increment slide index
        slideIndex++;
        
        // Reset to first slide if at the end
        if (slideIndex > slides.length) {
            slideIndex = 1;
        }
        
        // Display current slide and highlight dot
        slides[slideIndex - 1].style.display = "block";
        dots[slideIndex - 1].classList.add('active');
        
        // Change slide every 5 seconds
        setTimeout(showSlides, 5000);
    }
    
    // Function to navigate to a specific slide when dot is clicked
    window.currentSlide = function(n) {
        slideIndex = n - 1;
        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
            dots[i].classList.remove('active');
        }
        slides[slideIndex].style.display = "block";
        dots[slideIndex].classList.add('active');
    }

    // Close mobile menu when clicking on a nav link
    document.querySelectorAll('.nav-links li a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Sticky Header on Scroll
    const header = document.querySelector('header');
    let scrollPosition = window.scrollY;

    function toggleHeaderClass() {
        scrollPosition = window.scrollY;

        if (scrollPosition > 100) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    }

    window.addEventListener('scroll', toggleHeaderClass);
    toggleHeaderClass(); // Initial check

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href') !== '#') {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80, // Offset for header
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Add fade-in animation to images when they load
    document.querySelectorAll('img').forEach(img => {
        img.classList.add('img-transition');
        img.addEventListener('load', function() {
            this.classList.add('img-loaded');
        });
        
        // For images that are already loaded
        if (img.complete) {
            img.classList.add('img-loaded');
        }
    });
    
    // Add hover animations to cards and buttons
    document.querySelectorAll('.benefit-card, .service-card, .portfolio-item, .team-member, .blog-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.classList.add('card-hover');
        });
        
        card.addEventListener('mouseleave', function() {
            this.classList.remove('card-hover');
        });
    });
    
    // Add scroll progress indicator
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrollTotal = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollProgress = (window.scrollY / scrollTotal) * 100;
        progressBar.style.width = scrollProgress + '%';
    });
});