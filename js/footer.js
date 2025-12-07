class CustomFooter extends HTMLElement {
    constructor() {
        super();
        this.isDark = false;
    }

    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.render();
        
        // Инициализируем тему после небольшой задержки
        setTimeout(() => {
            this.updateTheme();
            this.setupThemeObserver();
        }, 100);
        
        // Инициализация иконок
        setTimeout(() => feather?.replace(), 0);
    }

    updateTheme() {
        this.isDark = document.documentElement.classList.contains('dark');
        const footer = this.shadowRoot.querySelector('.footer');
        const host = this.shadowRoot.host;
        const allTextElements = this.shadowRoot.querySelectorAll('.footer-section, .section-title, .footer-description, .nav-link, .contact-info, .footer-bottom');
        const socialLinks = this.shadowRoot.querySelectorAll('.social-link');
        const socialIcons = this.shadowRoot.querySelectorAll('.social-link img');
        
        if (this.isDark) {
            // Темная тема
            footer.style.background = 'linear-gradient(135deg, #1a202c 0%, #2d3748 100%)';
            footer.style.color = '#e2e8f0';
            footer.classList.remove('light-theme');
            footer.classList.add('dark-theme');
            
            allTextElements.forEach(el => {
                el.style.color = '#e2e8f0';
            });
            
            socialLinks.forEach(link => {
                link.style.background = 'rgba(255, 255, 255, 0.1)';
            });
            
            socialIcons.forEach(icon => {
                icon.style.filter = 'none';
            });
        } else {
            // Светлая тема
            footer.style.background = 'linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%)';
            footer.style.color = '#1a202c';
            footer.classList.remove('dark-theme');
            footer.classList.add('light-theme');
            
            allTextElements.forEach(el => {
                if (el.classList.contains('section-title')) {
                    el.style.color = '#1a365d';
                } else if (el.classList.contains('footer-description') || el.classList.contains('contact-info') || el.classList.contains('footer-bottom')) {
                    el.style.color = '#4a5568';
                } else {
                    el.style.color = '#1a202c';
                }
            });
            
            socialLinks.forEach(link => {
                link.style.background = 'rgba(26, 32, 44, 0.08)';
            });
            
            socialIcons.forEach(icon => {
                icon.style.filter = 'none';
            });
        }
    }

    setupThemeObserver() {
        // Отслеживаем изменения класса dark на document.documentElement
        const observer = new MutationObserver(() => {
            setTimeout(() => this.updateTheme(), 10);
        });

        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class']
        });

        // Периодически проверяем тему
        setInterval(() => {
            const currentIsDark = document.documentElement.classList.contains('dark');
            if (currentIsDark !== this.isDark) {
                this.updateTheme();
            }
        }, 500);
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                :host { 
                    display: block;
                    width: 100%;
                }
                
                .footer {
                    background: linear-gradient(135deg, #1a202c 0%, #2d3748 100%);
                    color: #e2e8f0;
                    padding: 60px 20px 30px;
                    transition: background 0.3s ease, color 0.3s ease;
                    font-family: 'Inter', system-ui, sans-serif;
                }
                
                .footer-container {
                    max-width: 1200px;
                    margin: 0 auto;
                }
                
                .footer-grid {
                    display: grid;
                    grid-template-columns: 1fr;
                    gap: 40px;
                    margin-bottom: 40px;
                }
                
                @media (min-width: 768px) {
                    .footer-grid {
                        grid-template-columns: repeat(2, 1fr);
                        gap: 50px;
                    }
                }
                
                @media (min-width: 1024px) {
                    .footer-grid {
                        grid-template-columns: repeat(4, 1fr);
                        gap: 40px;
                    }
                }
                
                .footer-section {
                    text-align: center;
                }
                
                @media (min-width: 768px) {
                    .footer-section {
                        text-align: left;
                    }
                }
                
                .logo-container {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 12px;
                    margin-bottom: 20px;
                }
                
                @media (min-width: 768px) {
                    .logo-container {
                        justify-content: flex-start;
                    }
                }
                
                .logo-icon {
                    width: 48px;
                    height: 48px;
                    background: #c05621;
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                }
                
                .logo-text {
                    font-size: 1.5rem;
                    font-weight: 700;
                    color: inherit;
                    letter-spacing: -0.5px;
                }
                
                .logo-text .highlight {
                    color: #c05621;
                }
                
                .footer-description {
                    font-size: 0.95rem;
                    line-height: 1.7;
                    color: inherit;
                    opacity: 0.85;
                    margin-top: 12px;
                }
                
                .section-title {
                    font-size: 1.1rem;
                    font-weight: 700;
                    margin-bottom: 20px;
                    color: inherit;
                    letter-spacing: 0.3px;
                }
                
                .nav-list {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                    align-items: center;
                }
                
                @media (min-width: 768px) {
                    .nav-list {
                        align-items: flex-start;
                    }
                }
                
                .nav-link {
                    color: inherit;
                    text-decoration: none;
                    font-size: 0.95rem;
                    opacity: 0.8;
                    transition: all 0.3s ease;
                    display: inline-block;
                }
                
                .nav-link:hover {
                    opacity: 1;
                    color: #c05621;
                    transform: translateX(4px);
                }
                
                .social-links {
                    display: flex;
                    gap: 12px;
                    justify-content: center;
                }
                
                @media (min-width: 768px) {
                    .social-links {
                        justify-content: flex-start;
                    }
                }
                
                .social-link {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    width: 48px;
                    height: 48px;
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 50%;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    text-decoration: none;
                    backdrop-filter: blur(10px);
                    -webkit-backdrop-filter: blur(10px);
                }
                
                .social-link:hover {
                    background: #c05621;
                    transform: translateY(-4px) scale(1.05);
                    box-shadow: 0 6px 20px rgba(192, 86, 33, 0.5);
                }
                
                .social-link:active {
                    transform: translateY(-2px) scale(1.02);
                }
                
                .social-link img {
                    width: 26px;
                    height: 26px;
                    object-fit: contain;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    filter: none;
                }
                
                .social-link:hover img {
                    transform: scale(1.15);
                    filter: drop-shadow(0 2px 8px rgba(255, 255, 255, 0.4));
                }
                
                /* Иконки отображаются в оригинальных цветах */
                .footer.dark-theme .social-link img,
                .footer.light-theme .social-link img {
                    filter: none !important;
                }
                
                .footer.dark-theme .social-link:hover img,
                .footer.light-theme .social-link:hover img {
                    filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.3)) !important;
                }
                
                .contact-info {
                    font-size: 0.95rem;
                    line-height: 1.8;
                    color: inherit;
                    opacity: 0.85;
                }
                
                .contact-info a {
                    color: inherit;
                    text-decoration: none;
                    transition: color 0.3s ease;
                }
                
                .contact-info a:hover {
                    color: #c05621;
                }
                
                .footer-bottom {
                    margin-top: 50px;
                    padding-top: 30px;
                    border-top: 1px solid rgba(255, 255, 255, 0.1);
                    text-align: center;
                    font-size: 0.875rem;
                    opacity: 0.7;
                    color: inherit;
                    transition: color 0.3s ease, border-color 0.3s ease;
                }
                
                .footer.dark-theme .footer-bottom {
                    border-top-color: rgba(255, 255, 255, 0.1);
                    color: #94a3b8;
                }
                
                .footer.light-theme .footer-bottom {
                    border-top-color: rgba(0, 0, 0, 0.1);
                    color: #64748b;
                }
                
                .nav-link {
                    transition: all 0.3s ease;
                }
                
                .footer.dark-theme .nav-link {
                    color: #cbd5e0;
                }
                
                .footer.light-theme .nav-link {
                    color: #4a5568;
                }
                
                .footer.dark-theme .section-title {
                    color: #ffffff;
                }
                
                .footer.light-theme .section-title {
                    color: #1a365d;
                }
                
                .footer.dark-theme .footer-description,
                .footer.dark-theme .contact-info {
                    color: #cbd5e0;
                }
                
                .footer.light-theme .footer-description,
                .footer.light-theme .contact-info {
                    color: #4a5568;
                }
            </style>

            <footer class="footer">
                <div class="footer-container">
                    <div class="footer-grid">
                        <!-- Логотип + описание -->
                        <div class="footer-section">
                            <div class="logo-container">
                                <div class="logo-icon">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                                        <path d="M2 17l10 5 10-5"></path>
                                        <path d="M2 12l10 5 10-5"></path>
                                    </svg>
                                </div>
                                <div class="logo-text">Крым<span class="highlight">Инженеринг</span></div>
                            </div>
                            <p class="footer-description">
                                Премиальные инженерные системы для элитной недвижимости Крыма. Проектирование • Монтаж • Сервис 24/7
                            </p>
                        </div>

                        <!-- Навигация -->
                        <div class="footer-section">
                            <h4 class="section-title">Навигация</h4>
                            <ul class="nav-list">
                                <li><a href="index.html" class="nav-link">Главная</a></li>
                                <li><a href="about.html" class="nav-link">О нас</a></li>
                                <li><a href="services.html" class="nav-link">Услуги</a></li>
                                <li><a href="gallery.html" class="nav-link">Галерея</a></li>
                                <li><a href="contact.html" class="nav-link">Контакты</a></li>
                            </ul>
                        </div>

                        <!-- Соцсети -->
                        <div class="footer-section">
                            <h4 class="section-title">Мы в соцсетях</h4>
                            <div class="social-links">
                                <a href="https://vk.com/krym_engineering" target="_blank" rel="noopener noreferrer" aria-label="ВКонтакте" class="social-link">
                                    <img src="assets/logo/vk-icon.png?v=2" alt="ВКонтакте" width="24" height="24" style="filter: none !important;">
                                </a>
                                <a href="https://t.me/krym_engineering" target="_blank" rel="noopener noreferrer" aria-label="Telegram" class="social-link">
                                    <img src="assets/logo/telegram-icon.png?v=2" alt="Telegram" width="24" height="24" style="filter: none !important;">
                                </a>
                            </div>
                        </div>

                        <!-- Контакты -->
                        <div class="footer-section">
                            <h4 class="section-title">Контакты</h4>
                            <div class="contact-info">
                                <p><a href="tel:+79780000000">+7 (978) 000-00-00</a></p>
                                <p><a href="mailto:info@krym-engineering.ru">info@krym-engineering.ru</a></p>
                                <p>Севастополь и весь Крым</p>
                            </div>
                        </div>
                    </div>

                    <div class="footer-bottom">
                        <p>© 2025 Крым Инженеринг. Все права защищены.</p>
                        <div style="margin-top: 12px; display: flex; flex-wrap: wrap; justify-content: center; gap: 16px; font-size: 0.85rem;">
                            <a href="privacy-policy.html" class="nav-link" style="opacity: 0.8;">Политика конфиденциальности</a>
                            <span style="opacity: 0.5;">|</span>
                            <a href="terms-of-use.html" class="nav-link" style="opacity: 0.8;">Пользовательское соглашение</a>
                            <span style="opacity: 0.5;">|</span>
                            <a href="requisites.html" class="nav-link" style="opacity: 0.8;">Реквизиты</a>
                        </div>
                    </div>
                </div>
            </footer>
        `;
    }
}

customElements.define('custom-footer', CustomFooter);
