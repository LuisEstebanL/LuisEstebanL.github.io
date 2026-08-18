/**
 * ==========================================================================
 * PORTFÓLIO PROFISSIONAL - LUIS (ADS DEVELOPER)
 * Arquivo Principal de Scripts (Vanilla JavaScript ES6+)
 * 
 * Todas as funções foram detalhadamente comentadas para facilitar
 * o entendimento, manutenção e customização manual.
 * ==========================================================================
 */

'use strict';

/**
 * --------------------------------------------------------------------------
 * 1. CONFIGURAÇÕES GLOBAIS E INFORMAÇÕES PESSOAIS
 * --------------------------------------------------------------------------
 * Centralize aqui os seus dados para facilitar alterações futuras.
 */
const USER_CONFIG = {
    name: 'Luis',
    role: 'Estudante de Análise e Desenvolvimento de Sistemas',
    email: 'luisestebanletis@gmail.com', // Substitua pelo seu e-mail real quando desejar
    linkedinUrl: 'https://www.linkedin.com/in/luis-esteban-lettis-7518482ba/', // Substitua pelo link do seu perfil no LinkedIn
    githubUrl: 'https://github.com/LuisEstebanL', // Substitua pelo link do seu GitHub
    skills: ['Flutter & Dart', 'Python', 'JavaScript (ES6+)', 'HTML5 & CSS3', 'Sistemas Operacionais', 'Git & GitHub'],
    languages: [
        { lang: 'Português', level: 'Nativo' },
        { lang: 'Inglês (English)', level: 'Fluente (C1/C2)' },
        { lang: 'Espanhol (Español)', level: 'Fluente (C1/C2)' }
    ]
};

/**
 * --------------------------------------------------------------------------
 * 2. INICIALIZAÇÃO PRINCIPAL DO DOCUMENTO (DOMContentLoaded)
 * --------------------------------------------------------------------------
 * Garante que todo o DOM esteja carregado antes de registrar eventos e lógicas.
 */
document.addEventListener('DOMContentLoaded', () => {
    initMouseSpotlight();
    initScrollProgress();
    initHeaderScroll();
    initMobileMenu();
    initTypewriterEffect();
    initTerminalEngine();
    initProjectFilters();
    initCopyEmail();
    initSmoothNavigation();
    initActiveNavObserver();
    updateCopyrightYear();
});

/**
 * --------------------------------------------------------------------------
 * 3. EFEITO DE SPOTLIGHT (LUZ NEON QUE SEGUE O CURSOR)
 * --------------------------------------------------------------------------
 * Atualiza suavemente a posição do elemento de iluminação radial na tela
 * de acordo com as coordenadas do mouse (X, Y).
 */
function initMouseSpotlight() {
    const spotlight = document.getElementById('mouse-spotlight');
    if (!spotlight) return;

    // Detecta se o dispositivo é desktop / possui ponteiro preciso
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    if (isTouchDevice) {
        spotlight.style.display = 'none';
        return;
    }

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    // Atualiza a posição da luz em resposta ao movimento do cursor
    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        spotlight.style.left = `${mouseX}px`;
        spotlight.style.top = `${mouseY}px`;
    }, { passive: true });
}

/**
 * --------------------------------------------------------------------------
 * 4. BARRA DE PROGRESSO DE SCROLL NO TOPO DA PÁGINA
 * --------------------------------------------------------------------------
 * Calcula a porcentagem de leitura da página e preenche a barra neon horizontal.
 */
function initScrollProgress() {
    const progressBar = document.getElementById('scroll-progress');
    if (!progressBar) return;

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercentage = (scrollHeight > 0) ? (scrollTop / scrollHeight) * 100 : 0;

        progressBar.style.width = `${scrollPercentage}%`;
    }, { passive: true });
}

/**
 * --------------------------------------------------------------------------
 * 5. HEADER COM EFEITO DE VIDRO NO SCROLL
 * --------------------------------------------------------------------------
 * Adiciona uma classe com borda e sombra mais escura ao rolar a tela para baixo.
 */
function initHeaderScroll() {
    const header = document.getElementById('header');
    if (!header) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }, { passive: true });
}

/**
 * --------------------------------------------------------------------------
 * 6. MENU MOBILE (HAMBURGER & DRAWER)
 * --------------------------------------------------------------------------
 * Controla a abertura e fechamento da gaveta de navegação em telas menores.
 */
function initMobileMenu() {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const drawer = document.getElementById('mobile-drawer');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');

    if (!menuBtn || !drawer) return;

    /**
     * Alterna o estado do menu (Aberto / Fechado)
     */
    const toggleMenu = () => {
        const isOpen = menuBtn.classList.toggle('active');
        drawer.classList.toggle('open');
        menuBtn.setAttribute('aria-expanded', String(isOpen));
        drawer.setAttribute('aria-hidden', String(!isOpen));
    };

    /**
     * Fecha o menu móvel
     */
    const closeMenu = () => {
        menuBtn.classList.remove('active');
        drawer.classList.remove('open');
        menuBtn.setAttribute('aria-expanded', 'false');
        drawer.setAttribute('aria-hidden', 'true');
    };

    menuBtn.addEventListener('click', toggleMenu);

    // Fecha a gaveta quando o usuário clica em qualquer item de navegação
    mobileLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Fecha o menu ao pressionar a tecla ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && drawer.classList.contains('open')) {
            closeMenu();
        }
    });
}

/**
 * --------------------------------------------------------------------------
 * 7. EFEITO DE DIGITAÇÃO DINÂMICA (TYPEWRITER) NA SEÇÃO HERO
 * --------------------------------------------------------------------------
 * Realiza um loop contínuo escrevendo e apagando frases com pausas naturais.
 */
function initTypewriterEffect() {
    const textElement = document.getElementById('typewriter-text');
    if (!textElement) return;

    const phrases = [
        'Apps Mobile em Flutter',
        'Automações com Python',
        'Interfaces Web com JavaScript',
        'Sistemas Operacionais & Lógica',
        'Comunicação Trilíngue (PT / EN / ES)',
        'Código Limpo & Boas Práticas'
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 90;

    /**
     * Executa um passo do ciclo de digitação
     */
    function typeStep() {
        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            // Apagando caracteres
            textElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 45;
        } else {
            // Digitando caracteres
            textElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 90;
        }

        // Quando termina de digitar a frase inteira
        if (!isDeleting && charIndex === currentPhrase.length) {
            isDeleting = true;
            typingSpeed = 1600; // Pausa antes de começar a apagar
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingSpeed = 400; // Pausa antes de digitar a próxima frase
        }

        setTimeout(typeStep, typingSpeed);
    }

    typeStep();
}

/**
 * --------------------------------------------------------------------------
 * 8. TERMINAL INTERATIVO (DEV CLI ENGINE)
 * --------------------------------------------------------------------------
 * Processa comandos digitados pelo usuário no mini-terminal, gerando saídas
 * estilizadas e interativas.
 */
function initTerminalEngine() {
    const form = document.getElementById('terminal-form');
    const input = document.getElementById('terminal-input');
    const output = document.getElementById('terminal-output');
    const terminalBody = document.getElementById('terminal-body');
    const quickButtons = document.querySelectorAll('.quick-btn');

    if (!form || !input || !output || !terminalBody) return;

    // Histórico de comandos para navegação com as setas para cima/baixo
    const commandHistory = [];
    let historyIndex = -1;

    /**
     * Banco de comandos disponíveis no terminal
     */
    const commands = {
        help: () => {
            return `
                <div class="t-response">
                    <strong>Comandos disponíveis:</strong><br>
                    • <span class="t-cmd-hl">bio</span> - Informações sobre minha formação e trajetória em ADS<br>
                    • <span class="t-cmd-hl">skills</span> - Lista do meu arsenal tecnológico<br>
                    • <span class="t-cmd-hl">languages</span> - Demonstração dos 3 idiomas de fluência<br>
                    • <span class="t-cmd-hl">projects</span> - Resumo dos projetos desenvolvidos<br>
                    • <span class="t-cmd-hl">contact</span> - Links de contato direto e LinkedIn<br>
                    • <span class="t-cmd-hl">linkedin</span> - Abrir o perfil do LinkedIn<br>
                    • <span class="t-cmd-hl">github</span> - Abrir o repositório do GitHub<br>
                    • <span class="t-cmd-hl">whoami</span> - Identificação do visitante atual<br>
                    • <span class="t-cmd-hl">clear</span> - Limpar a tela do terminal
                </div>
            `;
        },

        bio: () => {
            return `
                <div class="t-response">
                    🚀 <strong>Luis</strong> - Estudante de Análise e Desenvolvimento de Sistemas (ADS).<br>
                    Foco em desenvolvimento multiplataforma (Flutter), scripts e automações com Python e frontend moderno.<br>
                    Entusiasta de arquitetura de software, sistemas operacionais e código limpo.
                </div>
            `;
        },

        skills: () => {
            return `
                <div class="t-response">
                    ⚡ <strong>Arsenal Tecnológico:</strong><br>
                    📱 <strong>Flutter & Dart:</strong> Criação de aplicativos Android & iOS com UI moderna e reativa.<br>
                    🐍 <strong>Python:</strong> Automações, scripts utilitários, tratamento de dados.<br>
                    🌐 <strong>JavaScript & Web:</strong> ES6+, Manipulação do DOM, APIs, HTML5 Semântico, CSS3 Flex/Grid.<br>
                    🐧 <strong>Sistemas Operacionais:</strong> Fundamentos de Linux/Bash, processos e arquitetura.<br>
                    🛠️ <strong>Versionamento:</strong> Git, GitHub, Conventional Commits.
                </div>
            `;
        },

        languages: () => {
            return `
                <div class="t-response">
                    🌎 <strong>Comunicação Global (Trilíngue):</strong><br>
                    🇧🇷 <strong>Português:</strong> Nativo (Língua Materna)<br>
                    🇺🇸 <strong>Inglês:</strong> Fluente / Avançado (C1/C2 - Conversação e Escrita Técnica)<br>
                    🇪🇸 <strong>Espanhol:</strong> Fluente / Avançado (C1/C2 - Conversação e Escrita)
                </div>
            `;
        },

        projects: () => {
            return `
                <div class="t-response">
                    📁 <strong>Projetos Recentes:</strong><br>
                    1. <strong>FinTrack Mobile</strong> [Flutter/Dart] - Gerenciamento financeiro pessoal.<br>
                    2. <strong>AutoData Extractor</strong> [Python] - Automação de extração e análise de dados.<br>
                    3. <strong>CyberDev Portfolio</strong> [HTML5/CSS3/JS] - Esta landing page interativa.<br>
                    4. <strong>DevTask Board</strong> [JavaScript/Web] - Gerenciador Kanban ágil.<br>
                    <em>(Navegue até a seção #projetos para ver os cards detalhados)</em>
                </div>
            `;
        },

        contact: () => {
            return `
                <div class="t-response">
                    📬 <strong>Canais de Contato:</strong><br>
                    • E-mail: <span class="t-cmd-hl">${USER_CONFIG.email}</span><br>
                    • LinkedIn: <a href="${USER_CONFIG.linkedinUrl}" target="_blank" style="color:#E9FF1A;text-decoration:underline;">linkedin.com/in/luis-dev</a><br>
                    • GitHub: <a href="${USER_CONFIG.githubUrl}" target="_blank" style="color:#E9FF1A;text-decoration:underline;">github.com/luis-dev</a>
                </div>
            `;
        },

        linkedin: () => {
            window.open(USER_CONFIG.linkedinUrl, '_blank');
            return `<div class="t-response">🔗 Redirecionando para o LinkedIn...</div>`;
        },

        github: () => {
            window.open(USER_CONFIG.githubUrl, '_blank');
            return `<div class="t-response">🐙 Redirecionando para o GitHub...</div>`;
        },

        whoami: () => {
            return `<div class="t-response">👤 Você é um recrutador ou visitante incrível explorando meu portfólio!</div>`;
        },

        clear: () => {
            output.innerHTML = '';
            return null;
        }
    };

    /**
     * Executa a linha de comando e renderiza o feedback no terminal
     * @param {string} rawCmd - Comando digitado pelo usuário
     */
    function executeCommand(rawCmd) {
        const cmd = rawCmd.trim().toLowerCase();
        if (!cmd) return;

        // Guarda no histórico
        commandHistory.push(cmd);
        historyIndex = commandHistory.length;

        // Se for o comando clear, limpa e encerra
        if (cmd === 'clear') {
            commands.clear();
            return;
        }

        // Cria a linha visual do comando que o usuário digitou
        const userLine = document.createElement('div');
        userLine.className = 'terminal-line';
        userLine.innerHTML = `<span class="terminal-prompt">luis@dev:~$</span> <span style="color:#FFF;">${escapeHtml(rawCmd)}</span>`;
        output.appendChild(userLine);

        // Processa o retorno do comando
        let responseHtml = '';
        if (commands[cmd]) {
            responseHtml = commands[cmd]();
        } else {
            responseHtml = `
                <div class="t-response" style="color: #ff5f56;">
                    Comando não reconhecido: "<strong>${escapeHtml(cmd)}</strong>". Digite <span class="t-cmd-hl">help</span> para ver a lista de comandos válidos.
                </div>
            `;
        }

        if (responseHtml) {
            const responseLine = document.createElement('div');
            responseLine.className = 'terminal-line';
            responseLine.innerHTML = responseHtml;
            output.appendChild(responseLine);
        }

        // Auto-scroll até o fim do terminal
        terminalBody.scrollTop = terminalBody.scrollHeight;
    }

    // Evento de submissão do formulário do terminal
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const value = input.value;
        executeCommand(value);
        input.value = '';
    });

    // Navegação no histórico de comandos com ArrowUp e ArrowDown
    input.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (historyIndex > 0) {
                historyIndex--;
                input.value = commandHistory[historyIndex] || '';
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIndex < commandHistory.length - 1) {
                historyIndex++;
                input.value = commandHistory[historyIndex] || '';
            } else {
                historyIndex = commandHistory.length;
                input.value = '';
            }
        }
    });

    // Botões de comandos rápidos abaixo do terminal
    quickButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const cmd = btn.getAttribute('data-cmd');
            if (cmd) {
                executeCommand(cmd);
                input.focus();
            }
        });
    });
}

/**
 * --------------------------------------------------------------------------
 * 9. FILTRO DE PROJETOS POR CATEGORIA
 * --------------------------------------------------------------------------
 * Alterna dinamicamente a visibilidade dos cards de acordo com a aba selecionada.
 */
function initProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    if (!filterButtons.length || !projectCards.length) return;

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Atualiza a classe ativa nos botões
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            // Filtra os cards com animação suave
            projectCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');

                if (filterValue === 'all' || cardCategory === filterValue) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });
}

/**
 * --------------------------------------------------------------------------
 * 10. CÓPIA RÁPIDA DE E-MAIL COM TOAST NOTIFICATION
 * --------------------------------------------------------------------------
 * Copia o endereço de e-mail para a área de transferência do usuário e
 * aciona um Toast flutuante com feedback de sucesso.
 */
function initCopyEmail() {
    const copyBtn = document.getElementById('btn-copy-email');
    const emailValueElem = document.getElementById('contact-email-val');
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toast-message');

    if (!copyBtn || !toast) return;

    // Atualiza o texto do e-mail exibido a partir da configuração central
    if (emailValueElem) {
        emailValueElem.textContent = USER_CONFIG.email;
    }
    copyBtn.setAttribute('data-email', USER_CONFIG.email);

    let toastTimeout = null;

    /**
     * Exibe o Toast de Notificação
     * @param {string} msg - Mensagem a ser exibida
     */
    function showToast(msg) {
        if (toastMessage) {
            toastMessage.textContent = msg;
        }
        toast.classList.add('show');

        if (toastTimeout) clearTimeout(toastTimeout);
        toastTimeout = setTimeout(() => {
            toast.classList.remove('show');
        }, 3200);
    }

    copyBtn.addEventListener('click', async () => {
        const emailToCopy = copyBtn.getAttribute('data-email') || USER_CONFIG.email;

        try {
            if (navigator.clipboard && window.isSecureContext) {
                await navigator.clipboard.writeText(emailToCopy);
            } else {
                // Fallback para ambientes sem API assíncrona de clipboard
                const textArea = document.createElement('textarea');
                textArea.value = emailToCopy;
                textArea.style.position = 'fixed';
                textArea.style.opacity = '0';
                document.body.appendChild(textArea);
                textArea.focus();
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
            }

            showToast(`E-mail copiado: ${emailToCopy}`);
        } catch (err) {
            console.error('Falha ao copiar:', err);
            showToast(`E-mail: ${emailToCopy}`);
        }
    });
}

/**
 * --------------------------------------------------------------------------
 * 11. SCROLL SUAVE PARA LINKS INTERNOS
 * --------------------------------------------------------------------------
 * Assegura que links de âncora (#) rolem de maneira fluida e calibrada.
 */
function initSmoothNavigation() {
    const internalLinks = document.querySelectorAll('a[href^="#"]');

    internalLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            if (targetId === '#' || !targetId) return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/**
 * --------------------------------------------------------------------------
 * 12. OBSERVER DE SEÇÃO ATIVA NO MENU (IntersectionObserver)
 * --------------------------------------------------------------------------
 * Destaca o link correspondente no menu superior conforme o usuário rola a página.
 */
function initActiveNavObserver() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-desktop .nav-link');

    if (!sections.length || !navLinks.length) return;

    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -70% 0px',
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const currentId = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    if (link.getAttribute('href') === `#${currentId}`) {
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));
}

/**
 * --------------------------------------------------------------------------
 * 13. ATUALIZAÇÃO AUTOMÁTICA DO ANO NO RODAPÉ
 * --------------------------------------------------------------------------
 * Mantém o ano do copyright sempre atualizado dinamicamente.
 */
function updateCopyrightYear() {
    const yearElem = document.getElementById('current-year');
    if (yearElem) {
        yearElem.textContent = new Date().getFullYear();
    }
}

/**
 * --------------------------------------------------------------------------
 * 14. FUNÇÕES UTILITÁRIAS
 * --------------------------------------------------------------------------
 */

/**
 * Escapa strings para prevenir injeção de HTML acidental no terminal
 * @param {string} str - Texto não tratado
 * @returns {string} Texto seguro
 */
function escapeHtml(str) {
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}
