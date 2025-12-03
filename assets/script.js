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

    // Formspree Contact Form Handling
    var form = document.getElementById('my-form');
    if (form) {
        async function handleSubmit(event) {
            event.preventDefault();
            var status = document.getElementById('my-form-status');
            var data = new FormData(event.target);
            try {
                var response = await fetch(event.target.action, {
                    method: 'POST',
                    body: data,
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                if (response.ok) {
                    status.textContent = 'Thank you for your message! I will get back to you soon.';
                    status.classList.remove('form-status-error');
                    status.classList.add('form-status-success');
                    event.target.reset();
                } else {
                    var responseData = await response.json();
                    if (responseData.errors) {
                        status.textContent = responseData.errors.map(function(error) { return error.message; }).join(', ');
                    } else {
                        status.textContent = 'Oops! There was a problem submitting your form.';
                    }
                    status.classList.remove('form-status-success');
                    status.classList.add('form-status-error');
                }
            } catch (error) {
                status.textContent = 'Oops! There was a problem submitting your form.';
                status.classList.remove('form-status-success');
                status.classList.add('form-status-error');
            }
        }
        form.addEventListener('submit', handleSubmit);
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
