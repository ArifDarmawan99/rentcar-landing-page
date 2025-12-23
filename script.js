const TESTIMONIALS_DATA = [
    {
        id: 1,
        name: "Endank s",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
        text: "saya sangat puas dengan layanan UH rent. Mobilnya bersih, stafnya ramah, dan proses pemesanannya mudah."
    },
    {
        id: 2,
        name: "Joko Susanto",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
        text: "puas sekali."
    },
    {
        id: 3,
        name: "Susanti Wijaya",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
        text: "rekomended sekali gan!"
    },
    {
        id: 4,
        name: "Michael jackson",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
        text: "BEDA DARI YANG LAIN!!!!"
    }
];

let currentTestimonialIndex = 0;

const elements = {
    mobileToggle: document.getElementById('mobileToggle'),
    navMenu: document.getElementById('navMenu'),
    testimonialsContainer: document.getElementById('testimonialsContainer'),
    prevTestimonial: document.getElementById('prevTestimonial'),
    nextTestimonial: document.getElementById('nextTestimonial'),
    header: document.getElementById('header'),
    promoPopup: document.getElementById('promoPopup')
};

function smoothScroll(target) {
    const element = document.querySelector(target);
    if (element) {
        const headerOffset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
}

function initMobileNav() {
    elements.mobileToggle.addEventListener('click', toggleMobileMenu);
    
    const navLinks = elements.navMenu.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                closeMobileMenu();
            }
        });
    });
}

function toggleMobileMenu() {
    elements.navMenu.classList.toggle('active');
    
    const spans = elements.mobileToggle.querySelectorAll('span');
    if (elements.navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translateY(10px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translateY(-10px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
}

function closeMobileMenu() {
    elements.navMenu.classList.remove('active');
    const spans = elements.mobileToggle.querySelectorAll('span');
    spans[0].style.transform = 'none';
    spans[1].style.opacity = '1';
    spans[2].style.transform = 'none';
}

function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                smoothScroll(href);
            }
        });
    });
}

function initStickyHeader() {
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            elements.header.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
        } else {
            elements.header.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        }
    });
}

function initCars() {
    const cards = document.querySelectorAll('.car-card');
    
    cards.forEach(card => {
        card.style.cursor = 'pointer';
        card.addEventListener('click', function() {
            showCarDetail(this);
        });
    });
}

function showCarDetail(cardElement) {
    const carName = cardElement.getAttribute('data-name');
    const carPrice = cardElement.getAttribute('data-price');
    const carSeats = cardElement.getAttribute('data-seats');
    const carFuel = cardElement.getAttribute('data-fuel');
    const carType = cardElement.getAttribute('data-type');
    const carImage = cardElement.getAttribute('data-image');
    
    const popupContent = `
        <div class="car-detail-popup">
            <button class="popup-close" onclick="closeCarPopup()">×</button>
            <div class="car-detail-image">
                <img src="${carImage}" alt="${carName}">
            </div>
            <div class="car-detail-info">
                <h2>${carName}</h2>
                <div class="car-detail-price">Rp ${carPrice}<span>/hari</span></div>
                
                <div class="car-detail-specs">
                    <div class="spec-item">
                        <i class="fas fa-users"></i>
                        <span>${carSeats} Penumpang</span>
                    </div>
                    <div class="spec-item">
                        <i class="fas fa-gas-pump"></i>
                        <span>${carFuel}</span>
                    </div>
                    <div class="spec-item">
                        <i class="fas fa-car"></i>
                        <span>${carType}</span>
                    </div>
                </div>
                
                <button class="btn-primary btn-large" onclick="bookCar('${carName}')">
                    <i class="fab fa-whatsapp"></i> Pesan Sekarang
                </button>
            </div>
        </div>
    `;
    
    document.getElementById('carPopupContent').innerHTML = popupContent;
    const popup = document.getElementById('carPopup');
    popup.style.display = 'flex';
    
    // Close popup when clicking outside
    setTimeout(() => {
        popup.addEventListener('click', function(e) {
            if (e.target === popup) {
                closeCarPopup();
            }
        });
    }, 100);
}

function closeCarPopup() {
    document.getElementById('carPopup').style.display = 'none';
}

function bookCar(carName) {
    const phoneNumber = "6289667182588";
    const message = `HALO! Saya mau menyewa ${carName}`;
    const waUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(waUrl, "_blank");
}

function renderTestimonials() {
    const visibleTestimonials = getVisibleTestimonials();
    
    const testimonialsHTML = visibleTestimonials.map(testimonial => `
        <div class="testimonial-card">
            <img src="${testimonial.image}" 
                 alt="${testimonial.name}" 
                 class="testimonial-image"
                 loading="lazy">
            <h4 class="testimonial-name">${testimonial.name}</h4>
            <p class="testimonial-text">${testimonial.text}</p>
        </div>
    `).join('');
    
    elements.testimonialsContainer.innerHTML = testimonialsHTML;
}

function getVisibleTestimonials() {
    const isMobile = window.innerWidth <= 768;
    const testimonialsToShow = isMobile ? 1 : 2;
    
    const testimonials = [];
    for (let i = 0; i < testimonialsToShow; i++) {
        const index = (currentTestimonialIndex + i) % TESTIMONIALS_DATA.length;
        testimonials.push(TESTIMONIALS_DATA[index]);
    }
    
    return testimonials;
}

function showPrevTestimonial() {
    currentTestimonialIndex = (currentTestimonialIndex - 1 + TESTIMONIALS_DATA.length) % TESTIMONIALS_DATA.length;
    renderTestimonials();
}

function showNextTestimonial() {
    currentTestimonialIndex = (currentTestimonialIndex + 1) % TESTIMONIALS_DATA.length;
    renderTestimonials();
}

function initTestimonials() {
    renderTestimonials();
    
    elements.prevTestimonial.addEventListener('click', showPrevTestimonial);
    elements.nextTestimonial.addEventListener('click', showNextTestimonial);
    
    setInterval(() => {
        showNextTestimonial();
    }, 5000);
    
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            renderTestimonials();
        }, 250);
    });
}

function submitForm() {
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const message = document.getElementById('message');

    let isValid = true;

    [name, email, message].forEach(input => {
        if (!input.value.trim()) {
            input.style.borderColor = 'red';
            isValid = false;
        } else {
            input.style.borderColor = '';
        }
    });

    if (!isValid) return;

    const phoneNumber = "6289667182588";
    
    const waMessage = `
    Halo UH Rent 👋

    Nama   : ${name.value}
    Email  : ${email.value}
    Pesan  :
    ${message.value}

    Terima kasih 🙏
        `;

    const waUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(waMessage)}`;

    window.open(waUrl, "_blank");

    name.value = '';
    email.value = '';
    message.value = '';
}

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
}

function closePopup() {
    elements.promoPopup.style.display = 'none';
}

function initPromoPopup() {
    // Close when clicking outside the popup box
    elements.promoPopup.addEventListener('click', function(e) {
        if (e.target === elements.promoPopup) {
            closePopup();
        }
    });
    
    // Close when pressing ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && elements.promoPopup.style.display !== 'none') {
            closePopup();
        }
    });
}

function showLoadingAnimation() {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
}

function init() {
    showLoadingAnimation();
    initMobileNav();
    initSmoothScrolling();
    initStickyHeader();
    initTestimonials();
    initScrollAnimations();
    initCars();
    initPromoPopup();
    
    console.log('🚗 UH Rent website initialized successfully!');
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

window.bookCar = bookCar;
window.showCarDetail = showCarDetail;
window.closeCarPopup = closeCarPopup;
window.closePopup = closePopup;
window.smoothScroll = smoothScroll;
window.submitForm = submitForm;