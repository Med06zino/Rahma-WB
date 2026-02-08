// Main JavaScript file
document.addEventListener('DOMContentLoaded', function() {

    //  Scroll Animation 
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
            rect.bottom >= 0
        );
    }

    function handleScrollAnimation() {
        const animatedElements = document.querySelectorAll('.section-title, .ornament, .about-text, .about-image, .activity-card, .news-card, .info-item, .contact-form');
        animatedElements.forEach(function(element) {
            if (isInViewport(element)) {
                if (element.classList.contains('about-text') || element.classList.contains('info-item')) {
                    element.classList.add('slide-in-left');
                } else if (element.classList.contains('about-image') || element.classList.contains('contact-form')) {
                    element.classList.add('slide-in-right');
                } else {
                    element.classList.add('fade-in');
                }
            }
        });
    }

    handleScrollAnimation();
    window.addEventListener('scroll', handleScrollAnimation);

    // ====== Active nav link ======
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-menu a');
        let current = '';
        sections.forEach(function(section) {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        navLinks.forEach(function(link) {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });

    // ====== Header background ======
    const header = document.getElementById('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.style.backgroundColor = 'rgba(255, 255, 255, 1)';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
            header.style.boxShadow = 'none';
        }
    });

    // ====== Contact Form ======
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();
            const phoneNumber = "221775419501";
            const whatsappMessage =
                `Bonjour, je vous contacte depuis le site Dahira Rahma.%0A%0A` +
                ` Nom : ${name}%0A` +
                ` Email : ${email}%0A` +
                ` Sujet : ${subject}%0A%0A` +
                ` Message :%0A${message}`;
            const whatsappURL = `https://wa.me/${phoneNumber}?text=${whatsappMessage}`;
            window.open(whatsappURL, "_blank");
            contactForm.reset();
        });
    }

    // ====== Loader GSAP ======
    const gsapScript = document.createElement("script");
    gsapScript.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js";
    document.head.appendChild(gsapScript);

    gsapScript.onload = () => {
        const loaderText = document.querySelector(".loader-text");
        const loaderProgress = document.querySelector(".loader-progress");
        const loader = document.getElementById("loader");

        if(loaderText && loaderProgress && loader){
            const tl = gsap.timeline({
                onComplete: () => {
                    gsap.to(loader, {
                        duration: 0.8,
                        opacity: 0,
                        pointerEvents: "none",
                        onComplete: () => loader.style.display = "none"
                    });
                }
            });

            tl.fromTo(loaderText, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1, ease: "power2.out" });
            tl.to(loaderProgress, { width: "100%", duration: 1.5, ease: "power1.inOut" }, "<");
        }

        // ====== Modal GSAP ======
        initModalGSAP();
    };

    // ====== Modal Function ======
    function initModalGSAP(){
        const newsButtons = document.querySelectorAll(".news-card .btn-small");
        const modal = document.getElementById("newsModal");
        if(!modal || newsButtons.length === 0) return; // sécurité

        const modalTitle = document.getElementById("modalTitle");
        const modalText = document.getElementById("modalText");
        const modalImage = document.getElementById("modalImage");
        const modalClose = document.querySelector(".modal .close");
        const modalContent = document.querySelector(".modal-content");

        newsButtons.forEach((btn) => {
            btn.addEventListener("click", (e) => {
                e.preventDefault();
                const newsCard = btn.closest(".news-card");
                const title = newsCard.querySelector("h3").textContent;
                const text = newsCard.querySelector("p").textContent;
                const image = btn.getAttribute("data-image");

                modalTitle.textContent = title;
                modalText.textContent = text;
                modalImage.src = image;

                modal.style.display = "flex";

                gsap.fromTo(modalContent, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.5, ease: "power3.out" });
            });
        });

        if(modalClose){
            modalClose.addEventListener("click", closeModal);
        }
        window.addEventListener("click", (e) => { if(e.target === modal) closeModal(); });

        function closeModal(){
            gsap.to(modalContent, { opacity: 0, scale: 0.8, duration: 0.4, ease: "power3.in", onComplete: () => modal.style.display = "none" });
        }
    }
    // Animation GSAP pour le pricing
    const pricingCards = document.querySelectorAll('.pricing-card');

    function animatePricing() {
        pricingCards.forEach(card => {
            const rect = card.getBoundingClientRect();
            if(rect.top <= window.innerHeight * 0.85 && rect.bottom >= 0 && !card.classList.contains('animated')){
                card.classList.add('animated');
                gsap.to(card, {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: "power3.out",
                    stagger: 0.2
                });
            }
        });
    }

    window.addEventListener('scroll', animatePricing);
    window.addEventListener('load', animatePricing);

});