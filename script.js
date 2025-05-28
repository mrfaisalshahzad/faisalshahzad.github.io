document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('nav ul');
    
    mobileMenuBtn.addEventListener('click', function() {
        nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
    });
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                nav.style.display = 'none';
            }
        });
    });
    
    // Header scroll effect
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Dark/Light mode toggle
    const themeToggle = document.querySelector('.theme-toggle');
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        
        // Save preference to localStorage
        const isDarkMode = document.body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', isDarkMode);
    });
    
    // Check for saved theme preference
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
    }
    
    // Typewriter effect for hero section
    const typewriterTexts = [
        "Fintech Sales Leader",
        "Mobile Payments Expert",
        "Business Growth Strategist"
    ];
    let currentTextIndex = 0;
    const typewriterElement = document.querySelector('.typewriter');
    
    function typeWriter(text, i, fnCallback) {
        if (i < text.length) {
            typewriterElement.innerHTML = text.substring(0, i + 1);
            setTimeout(function() {
                typeWriter(text, i + 1, fnCallback)
            }, 100);
        } else if (typeof fnCallback == 'function') {
            setTimeout(fnCallback, 2000);
        }
    }
    
    function startTextAnimation() {
        if (currentTextIndex >= typewriterTexts.length) {
            currentTextIndex = 0;
        }
        const text = typewriterTexts[currentTextIndex];
        
        // Type current text
        typeWriter(text, 0, function() {
            // After typing, erase it
            setTimeout(function() {
                eraseText(text.length);
            }, 1000);
        });
        
        currentTextIndex++;
    }
    
    function eraseText(i) {
        if (i >= 0) {
            typewriterElement.innerHTML = typewriterTexts[currentTextIndex - 1].substring(0, i);
            setTimeout(function() {
                eraseText(i - 1)
            }, 50);
        } else {
            // Start next text
            setTimeout(startTextAnimation, 500);
        }
    }
    
    // Initialize typewriter if element exists
    if (typewriterElement) {
        typewriterElement.style.display = 'inline-block';
        startTextAnimation();
    }
    
    // Expandable timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => {
        const content = item.querySelector('.timeline-content');
        const shortContent = content.innerHTML;
        const fullContent = `
            ${content.innerHTML}
            <div class="timeline-full-content" style="display: none;">
                <!-- Additional details would go here -->
                <p>More detailed information about this role...</p>
                <button class="btn-secondary see-less-btn">See Less</button>
            </div>
            <button class="btn-secondary see-more-btn">See More</button>
        `;
        
        content.innerHTML = fullContent;
        
        const seeMoreBtn = content.querySelector('.see-more-btn');
        const seeLessBtn = content.querySelector('.see-less-btn');
        const fullContentDiv = content.querySelector('.timeline-full-content');
        
        seeMoreBtn.addEventListener('click', function() {
            fullContentDiv.style.display = 'block';
            seeMoreBtn.style.display = 'none';
        });
        
        seeLessBtn.addEventListener('click', function() {
            fullContentDiv.style.display = 'none';
            seeMoreBtn.style.display = 'inline-block';
        });
    });
    
    // Project carousel with modal
    const projectCards = document.querySelectorAll('.project-card');
    const projectModal = document.querySelector('.project-modal');
    const modalContent = document.querySelector('.modal-body');
    const closeModal = document.querySelector('.close-modal');
    
    projectCards.forEach(card => {
        card.addEventListener('click', function() {
            const projectTitle = this.querySelector('h3').textContent;
            const projectDetails = `
                <h3>${projectTitle}</h3>
                <p>Detailed information about this project...</p>
                <ul>
                    <li>Key achievement 1</li>
                    <li>Key achievement 2</li>
                    <li>Key achievement 3</li>
                </ul>
                <div class="project-stats">
                    <div class="stat">
                        <h4>10%</h4>
                        <p>Revenue Growth</p>
                    </div>
                    <div class="stat">
                        <h4>50+</h4>
                        <p>New Clients</p>
                    </div>
                </div>
            `;
            
            document.querySelector('.modal-title').textContent = projectTitle;
            modalContent.innerHTML = projectDetails;
            projectModal.style.display = 'flex';
        });
    });
    
    closeModal.addEventListener('click', function() {
        projectModal.style.display = 'none';
    });
    
    window.addEventListener('click', function(e) {
        if (e.target === projectModal) {
            projectModal.style.display = 'none';
        }
    });
    
    // Form validation
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        const inputs = contactForm.querySelectorAll('input, textarea');
        
        inputs.forEach(input => {
            const container = document.createElement('div');
            container.className = 'input-container';
            input.parentNode.insertBefore(container, input);
            container.appendChild(input);
            
            const errorMsg = document.createElement('span');
            errorMsg.className = 'error-message';
            container.appendChild(errorMsg);
            
            // Real-time validation
            input.addEventListener('input', function() {
                validateInput(this);
            });
            
            input.addEventListener('blur', function() {
                validateInput(this);
            });
        });
        
        function validateInput(input) {
            const container = input.parentNode;
            const errorMsg = container.querySelector('.error-message');
            
            if (input.value.trim() === '') {
                input.classList.add('input-error');
                errorMsg.textContent = 'This field is required';
                errorMsg.style.display = 'block';
                return false;
            }
            
            if (input.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) {
                input.classList.add('input-error');
                errorMsg.textContent = 'Please enter a valid email';
                errorMsg.style.display = 'block';
                return false;
            }
            
            input.classList.remove('input-error');
            errorMsg.style.display = 'none';
            return true;
        }
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            inputs.forEach(input => {
                if (!validateInput(input)) {
                    isValid = false;
                }
            });
            
            if (isValid) {
                // Form submission would go here
                const formData = {
                    name: this.querySelector('input[type="text"]').value,
                    email: this.querySelector('input[type="email"]').value,
                    message: this.querySelector('textarea').value
                };
                
                console.log('Form submitted:', formData);
                
                // Show success message
                const successMsg = document.createElement('div');
                successMsg.className = 'success-message';
                successMsg.innerHTML = `
                    <i class="fas fa-check-circle"></i>
                    <p>Thank you for your message! I'll get back to you soon.</p>
                `;
                contactForm.appendChild(successMsg);
                
                // Reset form
                this.reset();
                
                // Remove success message after 5 seconds
                setTimeout(() => {
                    successMsg.remove();
                }, 5000);
            }
        });
    }
    
    // Scroll animations
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.animate-on-scroll');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.classList.add('animated');
            }
        });
    };
    
    // Add animate-on-scroll class to elements
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('animate-on-scroll');
    });
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on load
});