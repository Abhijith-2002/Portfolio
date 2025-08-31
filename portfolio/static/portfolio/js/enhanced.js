// Enhanced Portfolio Features
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize all features
    initializeScrollToTop();
    initializeDarkMode();
    initializePageTransitions();
    initializeTooltips();
    initializeAnimations();
    
    // Scroll to Top Button
    function initializeScrollToTop() {
        const scrollBtn = document.createElement('button');
        scrollBtn.innerHTML = '↑';
        scrollBtn.className = 'scroll-to-top';
        scrollBtn.setAttribute('aria-label', 'Scroll to top');
        document.body.appendChild(scrollBtn);
        
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                scrollBtn.classList.add('visible');
            } else {
                scrollBtn.classList.remove('visible');
            }
        });
        
        scrollBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Dark Mode Toggle
    function initializeDarkMode() {
        const darkModeToggle = document.createElement('button');
        darkModeToggle.innerHTML = '🌙';
        darkModeToggle.className = 'dark-mode-toggle';
        darkModeToggle.setAttribute('aria-label', 'Toggle dark mode');
        document.body.appendChild(darkModeToggle);
        
        // Check for saved dark mode preference
        const isDarkMode = localStorage.getItem('darkMode') === 'true';
        if (isDarkMode) {
            document.body.classList.add('dark-mode');
            darkModeToggle.innerHTML = '☀️';
        }
        
        darkModeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            const isDark = document.body.classList.contains('dark-mode');
            
            // Update icon
            this.innerHTML = isDark ? '☀️' : '🌙';
            
            // Save preference
            localStorage.setItem('darkMode', isDark);
            
            // Show toast notification
            showToast(isDark ? 'Dark mode enabled' : 'Light mode enabled');
        });
    }
    
    // Page Transitions
    function initializePageTransitions() {
        document.body.classList.add('page-transition');
        
        setTimeout(() => {
            document.body.classList.add('loaded');
        }, 100);
    }
    
    // Toast Notifications
    function showToast(message, type = 'success') {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.textContent = message;
        document.body.appendChild(toast);
        
        setTimeout(() => toast.classList.add('show'), 100);
        
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }
    
    // Tooltips for Skills
    function initializeTooltips() {
        const skillItems = document.querySelectorAll('.skill-item');
        skillItems.forEach(item => {
            item.addEventListener('mouseenter', function() {
                const tooltip = document.createElement('div');
                tooltip.className = 'tooltip';
                tooltip.textContent = 'Click for more details';
                tooltip.style.cssText = `
                    position: absolute;
                    bottom: 100%;
                    left: 50%;
                    transform: translateX(-50%);
                    background: rgba(0, 0, 0, 0.8);
                    color: white;
                    padding: 5px 10px;
                    border-radius: 4px;
                    font-size: 0.8rem;
                    white-space: nowrap;
                    z-index: 1000;
                    opacity: 0;
                    transition: opacity 0.3s ease;
                `;
                
                this.style.position = 'relative';
                this.appendChild(tooltip);
                
                setTimeout(() => tooltip.style.opacity = '1', 100);
            });
            
            item.addEventListener('mouseleave', function() {
                const tooltip = this.querySelector('.tooltip');
                if (tooltip) {
                    tooltip.style.opacity = '0';
                    setTimeout(() => tooltip.remove(), 300);
                }
            });
        });
    }
    
    // Enhanced Animations
    function initializeAnimations() {
        // Parallax effect for header
        window.addEventListener('scroll', function() {
            const header = document.querySelector('.header');
            const scrolled = window.pageYOffset;
            header.style.transform = `translateY(${scrolled * 0.5}px)`;
        });
        
        // Stagger animation for cards
        const cards = document.querySelectorAll('.card');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 100);
                }
            });
        }, { threshold: 0.1 });
        
        cards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'all 0.6s ease';
            observer.observe(card);
        });
    }
    
    // Copy to Clipboard functionality
    function initializeCopyFeatures() {
        const projectLinks = document.querySelectorAll('.project-link');
        projectLinks.forEach(link => {
            link.addEventListener('contextmenu', function(e) {
                e.preventDefault();
                navigator.clipboard.writeText(this.href).then(() => {
                    showToast('Link copied to clipboard!');
                });
            });
        });
    }
    
    // Keyboard Navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            // Close any open modals or reset state
            document.body.classList.remove('modal-open');
        }
        
        if (e.ctrlKey || e.metaKey) {
            switch(e.key) {
                case 'p':
                    e.preventDefault();
                    window.print();
                    break;
                case 'd':
                    e.preventDefault();
                    document.querySelector('.dark-mode-toggle').click();
                    break;
            }
        }
    });
    
    // Performance Monitoring
    function trackPerformance() {
        if ('performance' in window) {
            window.addEventListener('load', function() {
                setTimeout(() => {
                    const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
                    console.log(`Page loaded in ${loadTime}ms`);
                    
                    if (loadTime > 3000) {
                        showToast('Page took longer than expected to load', 'warning');
                    }
                }, 0);
            });
        }
    }
    
    // Initialize additional features
    initializeCopyFeatures();
    trackPerformance();
    
    // Add smooth reveal animation to sections
    const sections = document.querySelectorAll('.section');
    sections.forEach((section, index) => {
        section.style.animationDelay = `${index * 0.1}s`;
    });
    
    // Add loading state management
    window.addEventListener('beforeunload', function() {
        document.body.classList.add('page-transition');
        document.body.classList.remove('loaded');
    });
    
    // Initialize intersection observer for lazy loading
    if ('IntersectionObserver' in window) {
        const lazyElements = document.querySelectorAll('[data-lazy]');
        const lazyObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    element.classList.add('loaded');
                    lazyObserver.unobserve(element);
                }
            });
        });
        
        lazyElements.forEach(element => {
            lazyObserver.observe(element);
        });
    }
    
    // Add print optimization
    window.addEventListener('beforeprint', function() {
        document.body.classList.add('printing');
    });
    
    window.addEventListener('afterprint', function() {
        document.body.classList.remove('printing');
    });
});

// Service Worker Registration (for PWA capabilities)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}
