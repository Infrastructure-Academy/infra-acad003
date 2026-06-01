// ============================================
// INFRASTRUCTURE ACADEMY - MAIN JAVASCRIPT
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize navigation
    initializeNavigation();
    
    // Initialize hamburger menu
    initializeHamburgerMenu();
    
    // Initialize relay navigation if present
    initializeRelayNavigation();
    
    // Initialize Return to Top button
    initializeReturnToTop();
});

/**
 * Initialize hamburger menu for mobile
 */
function initializeHamburgerMenu() {
    const hamburger = document.getElementById('hamburger-menu');
    const navMenu = document.getElementById('nav-menu');
    
    if (!hamburger || !navMenu) return;
    
    // Toggle menu on hamburger click
    const navRow2 = document.getElementById('nav-row2');
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('open');
        if (navRow2) navRow2.classList.toggle('open');
    });
    
    // Do NOT close menu when a link is clicked
    // User must manually click hamburger to collapse
}

/**
 * Initialize main navigation highlighting
 */
function initializeNavigation() {
    const currentPage = window.location.pathname.toLowerCase();
    const navLinks = document.querySelectorAll('#nav-menu a, #nav-row2 a');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href').toLowerCase();
        let isActive = false;
        
        if (currentPage.includes('mobilisation-clock')) {
            isActive = href.includes('mobilisation-clock');
        } else if (currentPage.includes('pioneers')) {
            isActive = href.includes('pioneers');
        } else if (currentPage.includes('taxonomy')) {
            isActive = href.includes('taxonomy');
        } else if (currentPage.includes('outriders')) {
            isActive = href.includes('outriders');
        } else if (currentPage.includes('civilisation-clock')) {
            isActive = href.includes('civilisation-clock');
        } else if (currentPage.includes('institutions')) {
            isActive = href.includes('institutions');
        } else if (currentPage.includes('library')) {
            isActive = href.includes('library');
        } else if (currentPage.includes('volume1')) {
            isActive = href.includes('volume1');
        } else if (currentPage.includes('volume2')) {
            isActive = href.includes('volume2');
        } else if (currentPage.includes('volume3')) {
            isActive = href.includes('volume3');
        } else if (currentPage.includes('framework')) {
            isActive = href.includes('framework');
        } else if (currentPage.includes('resources')) {
            isActive = href.includes('resources');
        } else if (currentPage.includes('author')) {
            isActive = href.includes('author');
        } else if (currentPage.includes('executive') || currentPage.includes('precis')) {
            isActive = href.includes('executive') || href.includes('precis');
        } else if (currentPage === '/' || currentPage.endsWith('index.html')) {
            isActive = href.includes('home') || href === './' || href === './index.html';
        }
        
        if (isActive) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

/**
 * Initialize relay navigation buttons
 */
function initializeRelayNavigation() {
    const relayButtons = document.querySelectorAll('.relay-nav button');
    
    relayButtons.forEach(button => {
        button.addEventListener('click', function() {
            const relayId = this.getAttribute('data-relay');
            navigateToRelay(relayId);
        });
    });
}

/**
 * Navigate to a specific relay page
 */
function navigateToRelay(relayId) {
    const baseUrl = window.location.pathname.split('/').slice(0, -1).join('/');
    
    // Map relay IDs to page names
    // EP = Planetary Engine (framing), 1-12 = the 12 gamed relays, T = Torus (closing)
    const relayPages = {
        'ES': 'executive-summary',
        'EP': 'planetary-engine',
        '1': 'relay-01-fire',
        '2': 'relay-02-tree',
        '3': 'relay-03-river',
        '4': 'relay-04-horse',
        '5': 'relay-05-roads',
        '6': 'relay-06-ships',
        '7': 'relay-07-loom',
        '8': 'relay-08-rail',
        '9': 'relay-09-engine',
        '10': 'relay-10-aaa',
        '11': 'relay-11-orbit',
        '12': 'relay-12-human-nodes',
        'T': 'torus'
    };
    
    const pageName = relayPages[relayId];
    if (pageName) {
        window.location.href = `${baseUrl}/${pageName}.html`;
    }
}

/**
 * Smooth scroll to section
 */
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

/**
 * Toggle content visibility
 */
function toggleContent(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.classList.toggle('hidden');
        element.classList.toggle('visible');
    }
}

/**
 * Load content dynamically
 */
function loadContent(url, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    container.innerHTML = '<p style="text-align: center; color: var(--color-accent-gold);">Loading content...</p>';
    
    fetch(url)
        .then(response => response.text())
        .then(data => {
            container.innerHTML = data;
        })
        .catch(error => {
            console.error('Error loading content:', error);
            container.innerHTML = '<p style="color: red;">Error loading content. Please try again.</p>';
        });
}

/**
 * Highlight active relay in relay navigation
 */
function setActiveRelay(relayId) {
    const relayButtons = document.querySelectorAll('.relay-nav button');
    
    relayButtons.forEach(button => {
        if (button.getAttribute('data-relay') === relayId) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });
}

/**
 * Utility: Get URL parameter
 */
function getUrlParameter(name) {
    const url = new URL(window.location);
    return url.searchParams.get(name);
}

/**
 * Utility: Format relay number
 */
function formatRelayNumber(num) {
    return String(num).padStart(2, '0');
}

/**
 * Initialize Return to Top button
 * Appears after scrolling down 400px on any page
 */
function initializeReturnToTop() {
    // Create the button
    const btn = document.createElement('button');
    btn.id = 'return-to-top';
    btn.innerHTML = '&#9650; TOP';
    btn.setAttribute('aria-label', 'Return to top of page');
    btn.setAttribute('title', 'Return to top');
    
    // Style the button
    Object.assign(btn.style, {
        position: 'fixed',
        bottom: '30px',
        right: '30px',
        zIndex: '9999',
        display: 'none',
        padding: '10px 16px',
        fontSize: '13px',
        fontFamily: 'Georgia, serif',
        fontWeight: 'bold',
        letterSpacing: '1px',
        color: '#ffd700',
        backgroundColor: 'rgba(10, 22, 40, 0.9)',
        border: '2px solid #ffd700',
        borderRadius: '4px',
        cursor: 'pointer',
        transition: 'opacity 0.3s ease, transform 0.3s ease',
        opacity: '0',
        transform: 'translateY(10px)',
        boxShadow: '0 2px 12px rgba(255, 215, 0, 0.3)'
    });
    
    document.body.appendChild(btn);
    
    // Show/hide on scroll
    let visible = false;
    window.addEventListener('scroll', function() {
        if (window.scrollY > 400) {
            if (!visible) {
                visible = true;
                btn.style.display = 'block';
                // Trigger reflow for transition
                btn.offsetHeight;
                btn.style.opacity = '1';
                btn.style.transform = 'translateY(0)';
            }
        } else {
            if (visible) {
                visible = false;
                btn.style.opacity = '0';
                btn.style.transform = 'translateY(10px)';
                setTimeout(function() {
                    if (!visible) btn.style.display = 'none';
                }, 300);
            }
        }
    });
    
    // Scroll to top on click
    btn.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    // Hover effect
    btn.addEventListener('mouseenter', function() {
        btn.style.backgroundColor = 'rgba(255, 215, 0, 0.15)';
        btn.style.boxShadow = '0 2px 20px rgba(255, 215, 0, 0.5)';
    });
    btn.addEventListener('mouseleave', function() {
        btn.style.backgroundColor = 'rgba(10, 22, 40, 0.9)';
        btn.style.boxShadow = '0 2px 12px rgba(255, 215, 0, 0.3)';
    });
}

// Export functions for use in other scripts
window.InfrastructureAcademy = {
    scrollToSection,
    toggleContent,
    loadContent,
    setActiveRelay,
    getUrlParameter,
    formatRelayNumber,
    navigateToRelay
};
