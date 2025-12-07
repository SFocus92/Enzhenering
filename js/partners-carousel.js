class PartnersCarousel extends HTMLElement {
    constructor() {
        super();
        this.isDark = false;
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
                    animation: scroll 40s linear infinite;
                    will-change: transform;
                }
                
                .partners-track:hover {
                    animation-play-state: paused;
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
