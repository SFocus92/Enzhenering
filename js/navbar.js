class CustomNavbar extends HTMLElement {
    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                :host { display: block; }
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }
                .navbar {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    z-index: 1000;
                    background: rgba(255, 255, 255, 0.95);
                    backdrop-filter: blur(10px);
                    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
                    transition: all 0.3s ease;
                }
                :host-context(.dark) .navbar,
                :host-context(html.dark) .navbar {
                    background: rgba(26, 32, 44, 0.95);
                    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                }
                .navbar-scrolled {
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                }
                .nav-container {
                    max-width: 1280px;
                    margin: 0 auto;
                    padding: 1rem 1.5rem;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }
                .logo {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    text-decoration: none;
                    color: #1a365d;
                    font-weight: bold;
                    font-size: 1.25rem;
                }
                :host-context(.dark) .logo,
                :host-context(html.dark) .logo {
                    color: #ffffff;
                }
                .logo-icon {
                    width: 40px;
                    height: 40px;
                    background: #c05621;
                    border-radius: 8px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .logo-text {
                    display: flex;
                    align-items: center;
                    gap: 0.25rem;
                }
                .logo-text span {
                    color: #c05621;
                }
                .nav-links {
                    display: flex;
                    align-items: center;
                    gap: 2rem;
                    list-style: none;
                }
                .nav-link {
                    text-decoration: none;
                    color: #1a365d;
                    font-weight: 500;
                    transition: color 0.3s;
                    position: relative;
                }
                :host-context(.dark) .nav-link,
                :host-context(html.dark) .nav-link {
                    color: #e2e8f0;
                }
                .nav-link:hover {
                    color: #c05621;
                }
                .nav-link::after {
                    content: '';
                    position: absolute;
                    bottom: -4px;
                    left: 0;
                    width: 0;
                    height: 2px;
                    background: #c05621;
                    transition: width 0.3s;
                }
                .nav-link:hover::after {
                    width: 100%;
                }
                .mobile-menu-btn {
                    display: none;
                    background: none;
                    border: none;
                    cursor: pointer;
                    padding: 0.5rem;
                    color: #1a365d;
                    transition: transform 0.3s ease;
                    z-index: 1002;
                }
                .mobile-menu-btn:hover {
                    transform: scale(1.1);
                }
                .mobile-menu-btn:active {
                    transform: scale(0.95);
                }
                :host-context(.dark) .mobile-menu-btn,
                :host-context(html.dark) .mobile-menu-btn {
                    color: #e2e8f0;
                }
                .mobile-menu {
                    display: none;
                    position: absolute;
                    top: 100%;
                    left: 0;
                    right: 0;
                    background: white;
                    border-top: 1px solid rgba(0, 0, 0, 0.1);
                    padding: 1rem;
                    flex-direction: column;
                    gap: 1rem;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                    z-index: 1001;
                    max-height: 0;
                    overflow: hidden;
                    transition: max-height 0.3s ease-out, opacity 0.3s ease-out;
                    opacity: 0;
                }
                :host-context(.dark) .mobile-menu,
                :host-context(html.dark) .mobile-menu {
                    background: #1a202c;
                    border-top: 1px solid rgba(255, 255, 255, 0.1);
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
                }
                .mobile-menu.active {
                    display: flex;
                    max-height: 500px;
                    opacity: 1;
                }
                .mobile-nav-link {
                    text-decoration: none;
                    color: #1a365d;
                    font-weight: 500;
                    padding: 0.75rem;
                    border-radius: 8px;
                    transition: background 0.3s;
                }
                :host-context(.dark) .mobile-nav-link,
                :host-context(html.dark) .mobile-nav-link {
                    color: #e2e8f0;
                }
                .mobile-nav-link:hover {
                    background: rgba(192, 86, 33, 0.1);
                }
                @media (max-width: 1024px) {
                    .nav-links {
                        display: none;
                    }
                    .mobile-menu-btn {
                        display: block;
                    }
                }
            </style>
            <nav class="navbar">
                <div class="nav-container">
                    <a href="index.html" class="logo">
                        <div class="logo-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
                                <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                                <path d="M2 17l10 5 10-5"></path>
                                <path d="M2 12l10 5 10-5"></path>
                            </svg>
                        </div>
                        <div class="logo-text">
                            Крым<span>Инженеринг</span>
                        </div>
                    </a>
                    <ul class="nav-links">
                        <li><a href="index.html" class="nav-link">Главная</a></li>
                        <li><a href="services.html" class="nav-link">Услуги</a></li>
                        <li><a href="gallery.html" class="nav-link">Галерея</a></li>
                        <li><a href="about.html" class="nav-link">О нас</a></li>
                        <li><a href="contact.html" class="nav-link">Контакты</a></li>
                    </ul>
                    <button class="mobile-menu-btn" id="mobileMenuBtn">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="3" y1="6" x2="21" y2="6"></line>
                            <line x1="3" y1="12" x2="21" y2="12"></line>
                            <line x1="3" y1="18" x2="21" y2="18"></line>
                        </svg>
                    </button>
                    <div class="mobile-menu" id="mobileMenu">
                        <a href="index.html" class="mobile-nav-link">Главная</a>
                        <a href="services.html" class="mobile-nav-link">Услуги</a>
                        <a href="gallery.html" class="mobile-nav-link">Галерея</a>
                        <a href="about.html" class="mobile-nav-link">О нас</a>
                        <a href="contact.html" class="mobile-nav-link">Контакты</a>
                    </div>
                </div>
            </nav>
        `;

        // Mobile menu toggle
        const mobileBtn = this.shadowRoot.getElementById('mobileMenuBtn');
        const mobileMenu = this.shadowRoot.getElementById('mobileMenu');
        
        if (mobileBtn && mobileMenu) {
            mobileBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                e.preventDefault();
                mobileMenu.classList.toggle('active');
                
                // Update button icon (optional - can add X icon when open)
                const icon = mobileBtn.querySelector('svg');
                if (mobileMenu.classList.contains('active')) {
                    // Menu is open - could change icon to X
                    if (icon) {
                        icon.innerHTML = `
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        `;
                    }
                } else {
                    // Menu is closed - hamburger icon
                    if (icon) {
                        icon.innerHTML = `
                            <line x1="3" y1="6" x2="21" y2="6"></line>
                            <line x1="3" y1="12" x2="21" y2="12"></line>
                            <line x1="3" y1="18" x2="21" y2="18"></line>
                        `;
                    }
                }
            });
            
            // Close menu when clicking on a link
            const mobileLinks = mobileMenu.querySelectorAll('.mobile-nav-link');
            mobileLinks.forEach(link => {
                link.addEventListener('click', () => {
                    mobileMenu.classList.remove('active');
                    const icon = mobileBtn.querySelector('svg');
                    if (icon) {
                        icon.innerHTML = `
                            <line x1="3" y1="6" x2="21" y2="6"></line>
                            <line x1="3" y1="12" x2="21" y2="12"></line>
                            <line x1="3" y1="18" x2="21" y2="18"></line>
                        `;
                    }
                });
            });
        }

        // Navbar scroll effect
        let lastScroll = 0;
        const navbar = this.shadowRoot.querySelector('.navbar');
        
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            if (currentScroll > 50) {
                navbar.classList.add('navbar-scrolled');
            } else {
                navbar.classList.remove('navbar-scrolled');
            }
            lastScroll = currentScroll;
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (mobileMenu && !this.shadowRoot.contains(e.target) && mobileMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
                const icon = mobileBtn?.querySelector('svg');
                if (icon) {
                    icon.innerHTML = `
                        <line x1="3" y1="6" x2="21" y2="6"></line>
                        <line x1="3" y1="12" x2="21" y2="12"></line>
                        <line x1="3" y1="18" x2="21" y2="18"></line>
                    `;
                }
            }
        });
        
        // Close mobile menu on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mobileMenu && mobileMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
                const icon = mobileBtn?.querySelector('svg');
                if (icon) {
                    icon.innerHTML = `
                        <line x1="3" y1="6" x2="21" y2="6"></line>
                        <line x1="3" y1="12" x2="21" y2="12"></line>
                        <line x1="3" y1="18" x2="21" y2="18"></line>
                    `;
                }
            }
        });
    }
}
customElements.define('custom-navbar', CustomNavbar);
