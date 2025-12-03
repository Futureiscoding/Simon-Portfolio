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

    // Contact Form Handling with Formspree
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

            // Get form action URL
            const formAction = contactForm.getAttribute('action');
            
            // Check if Formspree is configured
            if (!formAction || formAction.includes('{your-form-id}')) {
                alert('Form submission is not configured yet. Please set up your Formspree form ID.');
                console.log('Form data (not sent):', data);
                return;
            }

            // Submit form via fetch API
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;

            // Create AbortController for timeout
            const TIMEOUT_MS = 30000; // 30 second timeout
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);

            fetch(formAction, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                },
                signal: controller.signal
            })
            .then(response => {
                clearTimeout(timeoutId);
                if (response.ok) {
                    alert('Thank you for your message! I will get back to you soon.');
                    contactForm.reset();
                    return;
                }
                return response.json()
                    .then(data => {
                        if (data.errors) {
                            throw new Error(data.errors.map(error => error.message).join(', '));
                        }
                        throw new Error('There was an error sending your message. Please try again.');
                    })
                    .catch(parseError => {
                        // If JSON parsing fails or error was thrown above
                        throw parseError;
                    });
            })
            .catch(error => {
                clearTimeout(timeoutId);
                console.error('Form submission error:', error);
                if (error.name === 'AbortError') {
                    alert('Request timed out. Please check your connection and try again.');
                } else if (error.message) {
                    alert(error.message);
                } else {
                    alert('There was an error sending your message. Please try again.');
                }
            })
            .finally(() => {
                submitButton.textContent = originalText;
                submitButton.disabled = false;
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
