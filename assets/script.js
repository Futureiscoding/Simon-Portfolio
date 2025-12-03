// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

    // Contact Form Handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        const formStatus = contactForm.querySelector('.form-status');
        const submitBtn = contactForm.querySelector('.form-submit-btn');

        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = {
                name: formData.get('name'),
                email: formData.get('_replyto'),
                subject: formData.get('subject'),
                message: formData.get('message')
            };

            // Simple validation
            if (!data.name || !data.email || !data.subject || !data.message) {
                if (formStatus) {
                    formStatus.textContent = 'Please fill in all fields.';
                    formStatus.className = 'form-status form-status--error';
                }
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                if (formStatus) {
                    formStatus.textContent = 'Please enter a valid email address.';
                    formStatus.className = 'form-status form-status--error';
                }
                return;
            }

            // Show loading state
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.textContent = 'Sending...';
            }
            if (formStatus) {
                formStatus.textContent = '';
                formStatus.className = 'form-status';
            }

            // Submit to Formspree via AJAX
            fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(function(response) {
                if (response.ok) {
                    if (formStatus) {
                        formStatus.textContent = 'Thank you for your message! I will get back to you soon.';
                        formStatus.className = 'form-status form-status--success';
                    }
                    contactForm.reset();
                } else {
                    throw new Error('Form submission failed');
                }
            })
            .catch(function(error) {
                if (formStatus) {
                    formStatus.textContent = 'There was a problem sending your message. Please try again.';
                    formStatus.className = 'form-status form-status--error';
                }
                console.error('Form submission error:', error);
            })
            .finally(function() {
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Send Message';
                }
            });
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add scroll effect to header
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.15)';
            } else {
                header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
            }
        });
    }
});
