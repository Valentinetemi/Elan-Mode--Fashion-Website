const slider = document.getElementById('slider');
const slides = document.querySelectorAll('.slide');
const prevSlide = document.querySelector('.prev-slide');
const nextSlide = document.querySelector('.next-slide');
const dots = document.querySelectorAll('.dot');
let currentSlide = 0;
let slideInterval = setInterval(next, 5000);

function next() {
    currentSlide = (currentSlide + 1) % slides.length;
    updateSlider();
}

function prev() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    updateSlider();
}

function goToSlide(index) {
    currentSlide = index;
    updateSlider();
}

function updateSlider() {
    slider.style.transform = `translateX(-${currentSlide * 100 / slides.length}%)`;
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
    resetInterval();
}

function resetInterval() {
    clearInterval(slideInterval);
    slideInterval = setInterval(next, 5000);
}

prevSlide.addEventListener('click', prev);
nextSlide.addEventListener('click', next);
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => goToSlide(index));
});

// Lazy load slider images
function lazyLoadSlides() {
    slides.forEach((slide, index) => {
        if (index === currentSlide) {
            slide.classList.add('active');
        } else {
            slide.classList.remove('active');
        }
    });
}

lazyLoadSlides();
slider.addEventListener('transitionend', lazyLoadSlides);

// Cart Functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];
const cartCountElement = document.getElementById('cart-count');

function updateCartCount() {
    cartCountElement.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
}

function addToCart(button) {
    const productItem = button.parentElement;
    const name = productItem.dataset.name;
    const price = parseFloat(productItem.dataset.price);
    const existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ name, price, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    alert(`${name} added to cart!`);
}

updateCartCount();


// Hamburger Menu
        const hamburger = document.querySelector('.hamburger');
        const navLinks = document.querySelector('.nav-links');

        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('toggle');
        });