class PartnersCarousel extends HTMLElement {
    constructor() {
        super();
        this.isDark = false;
        this.position = 0;
        this.currentSpeed = -40; // px per second (auto-scroll left)
        this.baseSpeed = -40;
        this.loopWidth = 0;
        this.isDragging = false;
        this.lastPointerX = 0;
        this.lastTimestamp = 0;
        this.rafId = null;
    }

    connectedCallback() {
        // Список партнеров - топ бренды инженерных систем
        const partners = [
            {
                name: 'Daikin',
                url: 'https://www.daikin.ru',
                logo: 'assets/partners/daikin.svg',
                description: 'Кондиционирование и вентиляция'
            },
            {
                name: 'Mitsubishi Electric',
                url: 'https://www.mitsubishi-electric.ru',
                logo: 'assets/partners/mitsubishi.svg',
                description: 'HVAC системы'
            },
            {
                name: 'Viessmann',
                url: 'https://www.viessmann.ru',
                logo: 'assets/partners/viessmann.svg',
                description: 'Отопительное оборудование'
            },
            {
                name: 'Grundfos',
                url: 'https://www.grundfos.ru',
                logo: 'assets/partners/grundfos.svg',
                description: 'Насосное оборудование'
            },
            {
                name: 'Vaillant',
                url: 'https://www.vaillant.ru',
                logo: 'assets/partners/vaillant.svg',
                description: 'Котлы и отопление'
            },
            {
                name: 'Bosch',
                url: 'https://www.bosch-home.ru',
                logo: 'assets/partners/bosch.svg',
                description: 'Инженерные системы'
            },
            {
                name: 'LG',
                url: 'https://www.lg.com/ru',
                logo: 'assets/partners/lg.svg',
                description: 'Кондиционирование'
            },
            {
                name: 'Samsung',
                url: 'https://www.samsung.com/ru',
                logo: 'assets/partners/samsung.svg',
                description: 'HVAC решения'
            },
            {
                name: 'Trane',
                url: 'https://www.trane.com',
                logo: 'assets/partners/trane.svg',
                description: 'Коммерческие HVAC'
            },
            {
                name: 'Carrier',
                url: 'https://www.carrier.com',
                logo: 'assets/partners/carrier.svg',
                description: 'Климатическое оборудование'
            }
        ];

        this.attachShadow({ mode: 'open' });
        this.render(partners);
        
        // Инициализируем тему после небольшой задержки, чтобы DOM был готов
        setTimeout(() => {
            this.updateTheme();
            this.setupThemeObserver();
            this.setupCarousel();
        }, 50);
    }

    updateTheme() {
        this.isDark = document.documentElement.classList.contains('dark');
        const section = this.shadowRoot.querySelector('.partners-section');
        const title = this.shadowRoot.querySelector('.partners-title');
        const host = this.shadowRoot.host;
        const partnerItems = this.shadowRoot.querySelectorAll('.partner-item');
        
        if (this.isDark) {
            // Темная тема
            host.style.background = 'linear-gradient(135deg, #1a202c 0%, #2d3748 100%)';
            if (title) {
                title.style.color = '#ffffff';
                title.style.textShadow = '0 2px 4px rgba(0, 0, 0, 0.3)';
            }
            // Карточки остаются белыми для лучшей видимости логотипов
            partnerItems.forEach(item => {
                item.style.background = '#ffffff';
                item.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.3)';
                item.style.border = '1px solid rgba(255, 255, 255, 0.2)';
                // Обновляем hover эффект для темной темы
                const originalHover = item.onmouseenter;
                item.onmouseenter = function() {
                    this.style.boxShadow = '0 8px 15px rgba(0, 0, 0, 0.4)';
                };
                item.onmouseleave = function() {
                    this.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.3)';
                };
            });
        } else {
            // Светлая тема
            host.style.background = 'linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%)';
            if (title) {
                title.style.color = '#1a365d';
                title.style.textShadow = 'none';
            }
            partnerItems.forEach(item => {
                item.style.background = '#ffffff';
                item.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.07)';
                item.style.border = 'none';
                // Обновляем hover эффект для светлой темы
                item.onmouseenter = function() {
                    this.style.boxShadow = '0 8px 15px rgba(0, 0, 0, 0.15)';
                };
                item.onmouseleave = function() {
                    this.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.07)';
                };
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

        // Также слушаем события изменения темы
        document.addEventListener('themechange', () => {
            setTimeout(() => this.updateTheme(), 10);
        });

        // Периодически проверяем тему (на случай, если MutationObserver не сработает)
        setInterval(() => {
            const currentIsDark = document.documentElement.classList.contains('dark');
            if (currentIsDark !== this.isDark) {
                this.updateTheme();
            }
        }, 500);
    }

    setupCarousel() {
        const track = this.shadowRoot.querySelector('.partners-track');
        if (!track) return;

        const updateLoopWidth = () => {
            // Длина первой половины (до дублирования)
            this.loopWidth = track.scrollWidth / 2;
        };

        updateLoopWidth();
        window.addEventListener('resize', () => {
            updateLoopWidth();
        });

        const animate = (timestamp) => {
            if (!this.lastTimestamp) this.lastTimestamp = timestamp;
            const delta = (timestamp - this.lastTimestamp) / 1000; // seconds
            this.lastTimestamp = timestamp;

            if (!this.isDragging) {
                // Плавно возвращаемся к базовой скорости, если пользователь отпустил
                const drift = (this.baseSpeed - this.currentSpeed) * 0.05;
                this.currentSpeed += drift;
                this.position += this.currentSpeed * delta; // px = (px/s) * s
            }

            // Зацикливание
            if (this.loopWidth > 0) {
                if (this.position <= -this.loopWidth) {
                    this.position += this.loopWidth;
                } else if (this.position >= 0) {
                    this.position -= this.loopWidth;
                }
            } else {
                updateLoopWidth();
            }

            track.style.transform = `translateX(${this.position}px)`;
            this.rafId = requestAnimationFrame(animate);
        };

        this.rafId = requestAnimationFrame(animate);

        // Drag / swipe управление
        const startDrag = (event) => {
            this.isDragging = true;
            this.lastPointerX = event.clientX;
            this.lastTimestamp = performance.now();
            track.style.cursor = 'grabbing';
            track.classList.add('dragging');
            track.setPointerCapture?.(event.pointerId);
        };

        const moveDrag = (event) => {
            if (!this.isDragging) return;
            const now = performance.now();
            const deltaX = event.clientX - this.lastPointerX;
            const deltaTime = Math.max(now - this.lastTimestamp, 1);

            this.position += deltaX;
            this.lastPointerX = event.clientX;
            this.lastTimestamp = now;
            this.currentSpeed = (deltaX / deltaTime) * 1000; // px per second на основании жеста

            // Ограничиваем скорость, чтобы не было рывков
            const maxSpeed = 450;
            this.currentSpeed = Math.max(Math.min(this.currentSpeed, maxSpeed), -maxSpeed);

            track.style.transform = `translateX(${this.position}px)`;
        };

        const endDrag = (event) => {
            if (!this.isDragging) return;
            this.isDragging = false;
            // Если пользователь отпустил почти без движения, возвращаем базовую скорость
            if (Math.abs(this.currentSpeed) < Math.abs(this.baseSpeed) / 2) {
                this.currentSpeed = this.baseSpeed;
            }
            track.style.cursor = 'grab';
            track.classList.remove('dragging');
            if (event?.pointerId && track.releasePointerCapture) {
                track.releasePointerCapture(event.pointerId);
            }
        };

        track.addEventListener('pointerdown', startDrag);
        track.addEventListener('pointermove', moveDrag);
        ['pointerup', 'pointercancel', 'pointerleave'].forEach(evt => {
            track.addEventListener(evt, endDrag);
        });

    }

    disconnectedCallback() {
        if (this.rafId) cancelAnimationFrame(this.rafId);
    }

    render(partners) {
        this.shadowRoot.innerHTML = `
            <style>
                :host { 
                    display: block;
                    width: 100%;
                    background: linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%);
                    padding: 40px 0;
                    overflow: hidden;
                    position: relative;
                    transition: background 0.3s ease;
                }
                
                .partners-section {
                    width: 100%;
                    position: relative;
                }
                
                .partners-title {
                    text-align: center;
                    font-size: 1.75rem;
                    font-weight: 700;
                    color: #1a365d;
                    margin-bottom: 40px;
                    padding: 0 20px;
                    transition: color 0.3s ease, text-shadow 0.3s ease;
                    letter-spacing: 0.5px;
                    line-height: 1.4;
                }
                
                .partners-container {
                    overflow: hidden;
                    position: relative;
                    width: 100%;
                }
                
                .partners-wrapper {
                    display: flex;
                    width: fit-content;
                }
                
                .partners-track {
                    display: flex;
                    gap: 60px;
                    will-change: transform;
                    cursor: grab;
                    touch-action: pan-y;
                    user-select: none;
                }
                
                .partners-track.dragging {
                    cursor: grabbing;
                }
                
                .partner-item {
                    flex-shrink: 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 180px;
                    height: 100px;
                    background: white;
                    border-radius: 12px;
                    padding: 20px;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07);
                    transition: all 0.3s ease;
                    cursor: pointer;
                }
                
                .partner-item:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.15);
                }
                
                .partner-link {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 100%;
                    height: 100%;
                    text-decoration: none;
                    color: inherit;
                }
                
                .partner-logo {
                    max-width: 100%;
                    max-height: 60px;
                    object-fit: contain;
                    filter: grayscale(0%) opacity(1);
                    transition: all 0.3s ease;
                }
                
                .partner-item:hover .partner-logo {
                    filter: grayscale(0%) opacity(1);
                    transform: scale(1.1);
                }
                
                .partner-name {
                    font-size: 0.875rem;
                    color: #1a202c;
                    text-align: center;
                    margin-top: 8px;
                    font-weight: 500;
                }
                
                .partner-name-fallback {
                    color: #1a202c !important;
                    font-weight: 600;
                    font-size: 14px;
                }
                
                @keyframes scroll {
                    0% {
                        transform: translateX(0);
                    }
                    100% {
                        transform: translateX(-50%);
                    }
                }
                
                @media (max-width: 768px) {
                    .partner-item {
                        width: 140px;
                        height: 80px;
                        padding: 15px;
                    }
                    
                    .partners-title {
                        font-size: 1.25rem;
                        margin-bottom: 30px;
                    }
                    
                    .partners-track {
                        gap: 40px;
                    }
                }
            </style>
            
            <div class="partners-section">
                <h3 class="partners-title">Наши партнёры и официальные дилеры</h3>
                <div class="partners-container">
                    <div class="partners-wrapper" id="partnersWrapper"></div>
                </div>
            </div>
        `;

        // Создаем элементы партнеров (дублируем для бесконечной прокрутки)
        const wrapper = this.shadowRoot.getElementById('partnersWrapper');
        
        // Создаем трек
        const track = document.createElement('div');
        track.className = 'partners-track';
        
        // Добавляем партнеров дважды для бесконечной прокрутки
        partners.forEach(partner => {
            const item = document.createElement('div');
            item.className = 'partner-item';
            item.innerHTML = `
                <a href="${partner.url}" target="_blank" rel="noopener noreferrer" class="partner-link" aria-label="${partner.name} - ${partner.description}">
                    <img src="${partner.logo}" alt="${partner.name}" class="partner-logo" loading="lazy" onerror="this.style.display='none'; this.parentElement.innerHTML='<span class=\\'partner-name-fallback\\'>${partner.name}</span>'">
                </a>
            `;
            track.appendChild(item);
        });
        
        // Дублируем все элементы для бесконечной прокрутки
        partners.forEach(partner => {
            const item = document.createElement('div');
            item.className = 'partner-item';
            item.innerHTML = `
                <a href="${partner.url}" target="_blank" rel="noopener noreferrer" class="partner-link" aria-label="${partner.name} - ${partner.description}">
                    <img src="${partner.logo}" alt="${partner.name}" class="partner-logo" loading="lazy" onerror="this.style.display='none'; this.parentElement.innerHTML='<span class=\\'partner-name-fallback\\'>${partner.name}</span>'">
                </a>
            `;
            track.appendChild(item);
        });
        
        wrapper.appendChild(track);
    }
}

customElements.define('partners-carousel', PartnersCarousel);
