// Modern Multilingual Chat Widget with Dark Mode & Animations
(function() {

    // Detect system theme preference
    const getSystemTheme = () => {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        }
        return 'light';
    };

    // Create and inject modern styles with dark mode support
    const styles = `
        .n8n-chat-widget {
            --chat--color-primary: var(--n8n-chat-primary-color, #854fff);
            --chat--color-secondary: var(--n8n-chat-secondary-color, #6b3fd4);
            --chat--color-accent: var(--n8n-chat-accent-color, #ff6b6b);
            font-family: 'Geist Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
            
            /* Light theme variables */
            --chat--bg-primary: #ffffff;
            --chat--bg-secondary: #f8fafc;
            --chat--bg-tertiary: #f1f5f9;
            --chat--text-primary: #1e293b;
            --chat--text-secondary: #64748b;
            --chat--border-color: #e2e8f0;
            --chat--shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
            --chat--shadow-hover: 0 20px 60px rgba(0, 0, 0, 0.15);
        }

        .n8n-chat-widget[data-theme="dark"] {
            /* Dark theme variables */
            --chat--bg-primary: var(--chat-dark-bg, #0f172a);
            --chat--bg-secondary: #1e293b;
            --chat--bg-tertiary: #334155;
            --chat--text-primary: var(--chat-dark-text, #f1f5f9);
            --chat--text-secondary: #94a3b8;
            --chat--border-color: var(--chat-dark-border, #334155);
            --chat--shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
            --chat--shadow-hover: 0 20px 60px rgba(0, 0, 0, 0.4);
        }

        .n8n-chat-widget[data-theme="light"] {
            /* Light theme variables */
            --chat--bg-primary: var(--chat-background-color, #ffffff);
            --chat--text-primary: var(--chat-font-color, #1e293b);
            --chat--border-color: var(--chat-border-color, #e2e8f0);
        }

        @media (prefers-color-scheme: dark) {
            .n8n-chat-widget:not([data-theme="light"]) {
                --chat--bg-primary: var(--chat-dark-bg, #0f172a);
                --chat--bg-secondary: #1e293b;
                --chat--bg-tertiary: #334155;
                --chat--text-primary: var(--chat-dark-text, #f1f5f9);
                --chat--text-secondary: #94a3b8;
                --chat--border-color: var(--chat-dark-border, #334155);
                --chat--shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
                --chat--shadow-hover: 0 20px 60px rgba(0, 0, 0, 0.4);
            }
        }

        .n8n-chat-widget .chat-container {
            position: fixed;
            bottom: var(--chat-margin, 20px);
            right: var(--chat-margin, 20px);
            z-index: 1000;
            display: none;
            width: var(--chat-width, 380px);
            height: var(--chat-height, 600px);
            background: var(--chat--bg-primary);
            border-radius: var(--chat-border-radius, 20px);
            box-shadow: var(--chat--shadow);
            border: var(--chat-border-width, 1px) solid var(--chat-border-color, var(--chat--border-color));
            overflow: hidden;
            font-family: var(--chat-font-family, inherit);
            font-size: var(--chat-font-size, 14px);
            font-weight: var(--chat-font-weight, 400);
            backdrop-filter: blur(var(--chat-backdrop-blur, 20px));
            transition: all var(--chat-animation-speed, 0.4s) var(--chat-animation-easing, cubic-bezier(0.4, 0, 0.2, 1));
            transform: translateY(100%) scale(0.8);
            opacity: var(--chat-opacity, 0);
        }

        .n8n-chat-widget .minimize-button {
            position: absolute;
            right: 60px;
            top: 50%;
            transform: translateY(-50%);
            background: var(--chat--bg-tertiary);
            border: none;
            color: var(--chat--text-secondary);
            cursor: pointer;
            padding: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            font-size: 18px;
            border-radius: 50%;
            width: 32px;
            height: 32px;
        }

        .n8n-chat-widget .minimize-button:hover {
            background: var(--chat--color-primary);
            color: white;
            transform: translateY(-50%) rotate(180deg);
        }

        .n8n-chat-widget .chat-container.position-left {
            right: auto;
            left: var(--chat-margin, 20px);
        }

        .n8n-chat-widget .chat-container.open {
            display: flex;
            flex-direction: column;
            transform: translateY(0) scale(1);
            opacity: 1;
            animation: slideInUp var(--chat-animation-speed, 0.5s) var(--chat-animation-easing, cubic-bezier(0.4, 0, 0.2, 1));
        }

        @keyframes slideInUp {
            from {
                transform: translateY(100%) scale(0.8);
                opacity: 0;
            }
            to {
                transform: translateY(0) scale(1);
                opacity: 1;
            }
        }

        @keyframes fadeInScale {
            from {
                transform: scale(0.8);
                opacity: 0;
            }
            to {
                transform: scale(1);
                opacity: 1;
            }
        }

        @keyframes pulse {
            0%, 100% {
                transform: scale(1);
            }
            50% {
                transform: scale(1.05);
            }
        }

        @keyframes shimmer {
            0% {
                background-position: -200% 0;
            }
            100% {
                background-position: 200% 0;
            }
        }

        .n8n-chat-widget .brand-header {
            padding: 20px;
            display: flex;
            align-items: center;
            gap: 12px;
            border-bottom: 1px solid var(--chat--border-color);
            position: relative;
            background: linear-gradient(135deg, var(--chat--bg-primary) 0%, var(--chat--bg-secondary) 100%);
        }

        .n8n-chat-widget .close-button {
            position: absolute;
            right: 20px;
            top: 50%;
            transform: translateY(-50%);
            background: var(--chat--bg-tertiary);
            border: none;
            color: var(--chat--text-secondary);
            cursor: pointer;
            padding: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            font-size: 18px;
            border-radius: 50%;
            width: 32px;
            height: 32px;
        }

        .n8n-chat-widget .close-button:hover {
            background: var(--chat--color-accent);
            color: white;
            transform: translateY(-50%) rotate(90deg);
        }

        .n8n-chat-widget .brand-header img {
            width: var(--chat-logo-size, 32px);
            height: var(--chat-logo-size, 32px);
            border-radius: var(--chat-logo-radius, 50%);
            transition: all var(--chat-animation-speed, 0.4s) var(--chat-animation-easing, cubic-bezier(0.4, 0, 0.2, 1));
            opacity: 1;
        }

        .n8n-chat-widget .brand-header img.logo-light {
            display: block;
        }

        .n8n-chat-widget .brand-header img.logo-dark {
            display: none;
        }

        .n8n-chat-widget[data-theme="dark"] .brand-header img.logo-light {
            display: none;
        }

        .n8n-chat-widget[data-theme="dark"] .brand-header img.logo-dark {
            display: block;
        }

        @media (prefers-color-scheme: dark) {
            .n8n-chat-widget:not([data-theme="light"]) .brand-header img.logo-light {
                display: none;
            }
            .n8n-chat-widget:not([data-theme="light"]) .brand-header img.logo-dark {
                display: block;
            }
        }

        .n8n-chat-widget .brand-header img:hover {
            transform: scale(1.1) rotate(5deg);
        }

        .n8n-chat-widget .brand-header span {
            font-size: 18px;
            font-weight: 600;
            color: var(--chat--text-primary);
            background: linear-gradient(135deg, var(--chat--color-primary), var(--chat--color-secondary));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }

        .n8n-chat-widget .new-conversation {
            position: absolute;
            top: var(--welcome-screen-top, 50%);
            left: var(--welcome-screen-left, 50%);
            transform: var(--welcome-screen-transform, translate(-50%, -50%));
            padding: 30px;
            text-align: center;
            width: 100%;
            max-width: 320px;
            animation: fadeInScale var(--chat-animation-speed, 0.6s) var(--chat-animation-easing, cubic-bezier(0.4, 0, 0.2, 1)) 0.2s both;
        }

        .n8n-chat-widget .welcome-text {
            font-size: 28px;
            font-weight: 700;
            color: var(--chat--text-primary);
            margin-bottom: 30px;
            line-height: 1.3;
            background: linear-gradient(135deg, var(--chat--color-primary), var(--chat--color-secondary), var(--chat--color-accent));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            animation: shimmer calc(var(--chat-animation-speed, 0.5s) * 6) ease-in-out infinite;
            background-size: 200% 100%;
        }

        .n8n-chat-widget .new-chat-btn {
            background: linear-gradient(135deg, var(--chat--color-primary), var(--chat--color-secondary));
            color: white;
            border: none;
            padding: 18px 28px;
            border-radius: 50px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            display: flex;
            align-items: center;
            gap: 12px;
            margin: 0 auto 20px;
            box-shadow: 0 8px 25px rgba(133, 79, 255, 0.3);
            position: relative;
            overflow: hidden;
        }

        .n8n-chat-widget .new-chat-btn::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
            transition: left 0.5s;
        }

        .n8n-chat-widget .new-chat-btn:hover {
            transform: translateY(-3px) scale(1.05);
            box-shadow: 0 15px 35px rgba(133, 79, 255, 0.4);
            animation: pulse calc(var(--chat-animation-speed, 0.5s) * 4) infinite;
        }

        .n8n-chat-widget .new-chat-btn:hover::before {
            left: 100%;
        }

        .n8n-chat-widget .message-icon {
            width: 22px;
            height: 22px;
            transition: transform 0.3s ease;
        }

        .n8n-chat-widget .new-chat-btn:hover .message-icon {
            transform: scale(1.2) rotate(10deg);
        }

        .n8n-chat-widget .response-text {
            color: var(--chat--text-secondary);
            font-size: 14px;
            margin: 0;
            opacity: 0.8;
        }

        .n8n-chat-widget .chat-interface {
            display: none;
            flex-direction: column;
            height: 100%;
            animation: fadeInScale var(--chat-animation-speed, 0.5s) var(--chat-animation-easing, cubic-bezier(0.4, 0, 0.2, 1));
        }

        .n8n-chat-widget .chat-interface.active {
            display: flex;
        }

        .n8n-chat-widget .chat-messages {
            flex: 1;
            padding: 20px;
            overflow-y: auto;
            display: flex;
            flex-direction: column;
            gap: 16px;
            background: var(--chat--bg-secondary);
        }

        .n8n-chat-widget .chat-messages::-webkit-scrollbar {
            width: 6px;
        }

        .n8n-chat-widget .chat-messages::-webkit-scrollbar-track {
            background: var(--chat--bg-tertiary);
            border-radius: 3px;
        }

        .n8n-chat-widget .chat-messages::-webkit-scrollbar-thumb {
            background: var(--chat--color-primary);
            border-radius: 3px;
        }

        .n8n-chat-widget .chat-message {
            max-width: 85%;
            padding: 14px 18px;
            border-radius: 20px;
            font-size: 14px;
            line-height: 1.5;
            word-wrap: break-word;
            position: relative;
            animation: fadeInScale var(--chat-animation-speed, 0.4s) var(--chat-animation-easing, cubic-bezier(0.4, 0, 0.2, 1));
            backdrop-filter: blur(10px);
        }

        .n8n-chat-widget .chat-message.user {
            background: linear-gradient(135deg, var(--chat--color-primary), var(--chat--color-secondary));
            color: white;
            align-self: flex-end;
            border-bottom-right-radius: 6px;
            box-shadow: 0 4px 15px rgba(133, 79, 255, 0.3);
        }

        .n8n-chat-widget .chat-message.bot {
            background: var(--chat--bg-primary);
            color: var(--chat--text-primary);
            align-self: flex-start;
            border-bottom-left-radius: 6px;
            border: 1px solid var(--chat--border-color);
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }

        .n8n-chat-widget .chat-message.typing {
            background: var(--chat--bg-primary);
            color: var(--chat--text-secondary);
            align-self: flex-start;
            border-bottom-left-radius: 6px;
            border: 1px solid var(--chat--border-color);
        }

        .n8n-chat-widget .typing-indicator {
            display: flex;
            gap: 4px;
            padding: 8px 0;
        }

        .n8n-chat-widget .typing-dot {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: var(--chat--color-primary);
            animation: typingBounce calc(var(--chat-animation-speed, 0.35s) * 4) infinite ease-in-out;
        }

        .n8n-chat-widget .typing-dot:nth-child(1) { animation-delay: -0.32s; }
        .n8n-chat-widget .typing-dot:nth-child(2) { animation-delay: -0.16s; }

        @keyframes typingBounce {
            0%, 80%, 100% {
                transform: scale(0.8);
                opacity: 0.5;
            }
            40% {
                transform: scale(1.2);
                opacity: 1;
            }
        }

        .n8n-chat-widget .chat-input {
            padding: 20px;
            border-top: 1px solid var(--chat--border-color);
            display: flex;
            gap: 12px;
            align-items: flex-end;
            background: var(--chat--bg-primary);
        }

        .n8n-chat-widget .chat-input textarea {
            flex: 1;
            border: 2px solid var(--chat--border-color);
            border-radius: 25px;
            padding: 14px 20px;
            font-size: 16px;
            resize: none;
            outline: none;
            font-family: inherit;
            max-height: 120px;
            min-height: 44px;
            background: var(--chat--bg-secondary);
            color: var(--chat--text-primary);
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            overflow: hidden;
        }

        .n8n-chat-widget .chat-input textarea:focus {
            border-color: var(--chat--color-primary);
            box-shadow: 0 0 0 3px rgba(133, 79, 255, 0.1);
            transform: scale(1.02);
        }

        .n8n-chat-widget .chat-input textarea::placeholder {
            color: var(--chat--text-secondary);
        }

        .n8n-chat-widget .chat-input button {
            background: linear-gradient(135deg, var(--chat--color-primary), var(--chat--color-secondary));
            color: white;
            border: none;
            border-radius: 50%;
            width: 44px;
            height: 44px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            box-shadow: 0 4px 15px rgba(133, 79, 255, 0.3);
        }

        .n8n-chat-widget .chat-input button:hover {
            transform: scale(1.1) rotate(15deg);
            box-shadow: 0 6px 20px rgba(133, 79, 255, 0.4);
        }

        .n8n-chat-widget .chat-input button:active {
            transform: scale(0.95);
        }

        .n8n-chat-widget .chat-footer {
            padding: 16px 20px;
            text-align: center;
            border-top: 1px solid var(--chat--border-color);
            background: var(--chat--bg-secondary);
        }

        .n8n-chat-widget .chat-footer a {
            color: var(--chat--text-secondary);
            text-decoration: none;
            font-size: 12px;
            transition: color 0.3s ease;
        }

        .n8n-chat-widget .chat-footer a:hover {
            color: var(--chat--color-primary);
        }

        .n8n-chat-widget .chat-toggle {
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 64px;
            height: 64px;
            border-radius: 50%;
            background: linear-gradient(135deg, var(--chat--color-primary), var(--chat--color-secondary));
            border: none;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: var(--chat--shadow);
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            z-index: 999;
            overflow: hidden;
            animation: var(--chat-toggle-animation, breathe) var(--chat-toggle-animation-duration, 3s) ease-in-out infinite;
        }

        /* Nouvelles animations configurables */
        @keyframes breathe {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
        }

        @keyframes bounce {
            0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
            40% { transform: translateY(-10px); }
            60% { transform: translateY(-5px); }
        }

        @keyframes wiggle {
            0%, 100% { transform: rotate(0deg); }
            25% { transform: rotate(-3deg); }
            75% { transform: rotate(3deg); }
        }

        @keyframes glow {
            0%, 100% { box-shadow: var(--chat--shadow); }
            50% { box-shadow: 0 0 30px var(--chat--color-primary); }
        }

        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-2px); }
            75% { transform: translateX(2px); }
        }

        .n8n-chat-widget .chat-toggle::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(135deg, var(--chat--color-secondary), var(--chat--color-accent));
            opacity: 0;
            transition: opacity 0.3s ease;
        }

        .n8n-chat-widget .chat-toggle:hover::before {
            opacity: 1;
        }

        .n8n-chat-widget .chat-toggle.position-left {
            right: auto;
            left: 20px;
        }

        .n8n-chat-widget .chat-toggle:hover {
            transform: scale(var(--chat-toggle-hover-scale, 1.15)) rotate(var(--chat-toggle-hover-rotation, 10deg));
            box-shadow: var(--chat--shadow-hover);
            animation: pulse var(--chat-toggle-pulse-speed, 2s) infinite;
        }

        @keyframes glow {
            0%, 100% { 
                box-shadow: var(--chat--shadow); 
            }
            50% { 
                box-shadow: 0 0 var(--chat-toggle-glow-intensity, 30px) var(--chat-toggle-glow-color, var(--chat--color-primary));
            }
        }

        .n8n-chat-widget .chat-toggle svg {
            width: 28px;
            height: 28px;
            fill: white;
            z-index: 1;
            position: relative;
            transition: transform 0.3s ease;
        }

        .n8n-chat-widget .chat-toggle:hover svg {
            transform: scale(1.1);
        }

        /* Theme toggle button */
        .n8n-chat-widget .theme-toggle {
            position: absolute;
            right: 100px;
            top: 50%;
            transform: translateY(-50%);
            background: var(--chat--bg-tertiary);
            border: 1px solid var(--chat--border-color);
            border-radius: 50%;
            width: 32px;
            height: 32px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease;
            color: var(--chat--text-secondary);
        }

        .n8n-chat-widget .theme-toggle:hover {
            background: var(--chat--color-primary);
            color: white;
            transform: translateY(-50%) rotate(180deg);
            transition: all var(--chat-animation-speed, 0.3s) var(--chat-animation-easing, cubic-bezier(0.4, 0, 0.2, 1));
        }

        @media (max-width: 480px) {
            .n8n-chat-widget .chat-container {
                width: 100vw;
                height: 100vh;
                bottom: 0;
                right: 0;
                border-radius: 0;
                transform: translateY(100%);
            }
            
            .n8n-chat-widget .chat-container.position-left {
                left: 0;
            }

            .n8n-chat-widget .chat-container.open {
                transform: translateY(0);
            }
        }

        /* Accessibility improvements */
        @media (prefers-reduced-motion: reduce) {
            .n8n-chat-widget * {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
            }
        }
    `;

    // Inject styles
    const styleSheet = document.createElement('style');
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);

    // Default configuration
    // Dans la section de configuration par défaut, remplacez :
    const defaultConfig = {
        webhook: {
            url: 'https://your-n8n-webhook-url.com',
            route: 'chat'
        },
        branding: {
            name: 'Assistant IA',
            logo: {
                light: '', // Logo pour le mode clair
                dark: ''   // Logo pour le mode sombre
            },
            welcomeText: 'Salut 👋, comment pouvons-nous vous aider ?',
            sendMessage: 'Envoyez-nous un message',
            responseTimeText: 'Nous répondons généralement immédiatement',
            placeholder: 'Tapez votre message ici...',
            send: 'Envoyer',
            poweredBy: {
                text: 'Propulsé par n8n',
                link: 'https://n8n.io'
            }
        },
        style: {
            primaryColor: '',
            secondaryColor: '',
            accentColor: '',
            position: 'right',
            theme: 'auto' // 'light', 'dark', or 'auto'
        },
    };

    // Merge user config with defaults
    const config = {
        ...defaultConfig,
        ...window.ChatWidgetConfig,
        webhook: { ...defaultConfig.webhook, ...(window.ChatWidgetConfig?.webhook || {}) },
        branding: { ...defaultConfig.branding, ...(window.ChatWidgetConfig?.branding || {}) },
        style: { ...defaultConfig.style, ...(window.ChatWidgetConfig?.style || {}) },
        metadata: { ...(window.ChatWidgetConfig?.metadata || {}) }
    };


    // Prevent multiple initializations
    if (window.N8NChatWidgetInitialized) return;
    window.N8NChatWidgetInitialized = true;

    let currentSessionId = '';
    let currentTheme = config.style.theme === 'auto' ? getSystemTheme() : config.style.theme;
    let isChatClosed = false;
    
    // Fonction pour générer des clés de stockage isolées par domaine
    function getDomainBasedKey(baseKey) {
        const domain = window.location.hostname;
        return `${baseKey}-${domain}`;
    }
    
    // Fonctions de persistance des conversations
    function saveMessageToSession(message, isUser = false) {
        if (!currentSessionId) return;
        
        const storageKey = getDomainBasedKey(`n8n-chat-messages-${currentSessionId}`);
        const messages = JSON.parse(sessionStorage.getItem(storageKey) || '[]');
        
        messages.push({
            text: message,
            isUser: isUser,
            timestamp: Date.now()
        });
        
        sessionStorage.setItem(storageKey, JSON.stringify(messages));
    }
    
    function loadMessagesFromSession() {
        if (!currentSessionId) return [];
        
        const storageKey = getDomainBasedKey(`n8n-chat-messages-${currentSessionId}`);
        return JSON.parse(sessionStorage.getItem(storageKey) || '[]');
    }
    
    function clearSessionMessages() {
        if (!currentSessionId) return;
        
        const storageKey = getDomainBasedKey(`n8n-chat-messages-${currentSessionId}`);
        sessionStorage.removeItem(storageKey);
        sessionStorage.removeItem(getDomainBasedKey('n8n-chat-session-id'));
        sessionStorage.removeItem(getDomainBasedKey('n8n-chat-active'));
    }
    
    function restoreMessagesFromSession() {
        const messages = loadMessagesFromSession();
        messagesContainer.innerHTML = '';
        
        messages.forEach(msg => {
            if (msg.isUser) {
                const userMessageDiv = document.createElement('div');
                userMessageDiv.className = 'chat-message user';
                userMessageDiv.textContent = msg.text;
                messagesContainer.appendChild(userMessageDiv);
            } else {
                // Créer le message du bot sans le sauvegarder à nouveau
                const botMessageDiv = document.createElement('div');
                botMessageDiv.className = 'chat-message bot';
                botMessageDiv.innerHTML = marked.parse(msg.text);
                messagesContainer.appendChild(botMessageDiv);
            }
        });
        
        if (messages.length > 0) {
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }
    }
    
    // Fonction pour gérer la fermeture du chat via N8n
    function handleChatClosure() {
        isChatClosed = true;
        sessionStorage.setItem(getDomainBasedKey('n8n-chat-active'), 'false');
        
        // Masquer le champ de saisie et le bouton d'envoi
        const chatInput = chatContainer.querySelector('.chat-input');
        if (chatInput) {
            chatInput.style.display = 'none';
        }
        
        // Ajouter un message indiquant que la conversation est terminée
        const closureMessageDiv = document.createElement('div');
        closureMessageDiv.className = 'chat-message bot';
        closureMessageDiv.innerHTML = '<em>🔒 Cette conversation est maintenant terminée.</em>';
        messagesContainer.appendChild(closureMessageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
    
    // Fonction de confirmation pour la fermeture du chat
    function confirmChatClosure() {
        const confirmed = confirm(
            'Êtes-vous sûr de vouloir fermer cette conversation ?\n\n' +
            '⚠️ Attention : L\'historique de la conversation sera définitivement perdu et une nouvelle conversation débutera.'
        );
        
        if (confirmed) {
            resetChat();
        }
        
        return confirmed;
    }
    
    // Fonction pour réinitialiser complètement le chat
    function resetChat() {
        // Effacer l'historique
        clearSessionMessages();
        
        // Réinitialiser les variables
        currentSessionId = '';
        isChatClosed = false;
        
        // Vider le conteneur de messages
        messagesContainer.innerHTML = '';
        
        // Réafficher le champ de saisie si il était masqué
        const chatInput = chatContainer.querySelector('.chat-input');
        if (chatInput) {
            chatInput.style.display = 'flex';
        }
        
        // Retourner à l'écran d'accueil
        chatInterface.classList.remove('active');
        chatContainer.querySelector('.new-conversation').style.display = 'block';
        const brandHeader = chatContainer.querySelector('.brand-header');
        if (brandHeader) {
            brandHeader.style.display = 'flex';
        }
        
        // Fermer le widget
        chatContainer.classList.remove('open');
    }

    // Create widget container
    const widgetContainer = document.createElement('div');
    widgetContainer.className = 'n8n-chat-widget';
    widgetContainer.setAttribute('data-theme', currentTheme);
    
    // Set CSS variables for colors
    if (config.style.primaryColor) {
        widgetContainer.style.setProperty('--n8n-chat-primary-color', config.style.primaryColor);
    }
    if (config.style.secondaryColor) {
        widgetContainer.style.setProperty('--n8n-chat-secondary-color', config.style.secondaryColor);
    }
    if (config.style.accentColor) {
        widgetContainer.style.setProperty('--n8n-chat-accent-color', config.style.accentColor);
    }
    
    // === NOUVELLES VARIABLES CSS POUR TOUS LES PARAMÈTRES ===
    // Dimensions
    if (config.style.width) {
        widgetContainer.style.setProperty('--chat-width', config.style.width);
    }
    if (config.style.height) {
        widgetContainer.style.setProperty('--chat-height', config.style.height);
    }
    
    // Bordures et coins
    if (config.style.borderRadius) {
        widgetContainer.style.setProperty('--chat-border-radius', config.style.borderRadius);
    }
    if (config.style.borderWidth) {
        widgetContainer.style.setProperty('--chat-border-width', config.style.borderWidth);
    }
    if (config.style.borderColor) {
        widgetContainer.style.setProperty('--chat-border-color', config.style.borderColor);
    }
    
    // Typographie
    if (config.style.fontFamily) {
        widgetContainer.style.setProperty('--chat-font-family', config.style.fontFamily);
    }
    if (config.style.fontSize) {
        widgetContainer.style.setProperty('--chat-font-size', config.style.fontSize);
    }
    if (config.style.fontWeight) {
        widgetContainer.style.setProperty('--chat-font-weight', config.style.fontWeight);
    }
    
    // Espacement
    if (config.style.padding) {
        widgetContainer.style.setProperty('--chat-padding', config.style.padding);
    }
    if (config.style.margin) {
        widgetContainer.style.setProperty('--chat-margin', config.style.margin);
    }
    
    // Ombres
    if (config.style.shadowColor) {
        widgetContainer.style.setProperty('--chat-shadow-color', config.style.shadowColor);
    }
    if (config.style.shadowBlur) {
        widgetContainer.style.setProperty('--chat-shadow-blur', config.style.shadowBlur);
    }
    
    // Animations
    if (config.style.animationSpeed) {
        widgetContainer.style.setProperty('--chat-animation-speed', config.style.animationSpeed);
    }
    if (config.style.animationEasing) {
        widgetContainer.style.setProperty('--chat-animation-easing', config.style.animationEasing);
    }
    
    // Logo
    if (config.style.logoSize) {
        widgetContainer.style.setProperty('--chat-logo-size', config.style.logoSize);
    }
    if (config.style.logoRadius) {
        widgetContainer.style.setProperty('--chat-logo-radius', config.style.logoRadius);
    }
    
    // Effets visuels
    if (config.style.backdropBlur) {
        widgetContainer.style.setProperty('--chat-backdrop-blur', config.style.backdropBlur);
    }
    if (config.style.opacity) {
        widgetContainer.style.setProperty('--chat-opacity', config.style.opacity);
    }
    
    // Couleurs mode sombre
    if (config.style.darkBackgroundColor) {
        widgetContainer.style.setProperty('--chat-dark-bg', config.style.darkBackgroundColor);
    }
    if (config.style.darkFontColor) {
        widgetContainer.style.setProperty('--chat-dark-text', config.style.darkFontColor);
    }
    if (config.style.darkBorderColor) {
        widgetContainer.style.setProperty('--chat-dark-border', config.style.darkBorderColor);
    }
    
    // Couleurs de base
    if (config.style.backgroundColor) {
        widgetContainer.style.setProperty('--chat-background-color', config.style.backgroundColor);
    }
    if (config.style.fontColor) {
        widgetContainer.style.setProperty('--chat-font-color', config.style.fontColor);
    }
    
    // Positionnement écran d'accueil
    if (config.style.welcomeScreenTop) {
        widgetContainer.style.setProperty('--welcome-screen-top', config.style.welcomeScreenTop);
    }
    if (config.style.welcomeScreenLeft) {
        widgetContainer.style.setProperty('--welcome-screen-left', config.style.welcomeScreenLeft);
    }
    if (config.style.welcomeScreenTransform) {
        widgetContainer.style.setProperty('--welcome-screen-transform', config.style.welcomeScreenTransform);
    }
    
    // Animations de la bulle
    if (config.style.toggleAnimation) {
        widgetContainer.style.setProperty('--chat-toggle-animation', config.style.toggleAnimation);
    }
    if (config.style.toggleAnimationDuration) {
        widgetContainer.style.setProperty('--chat-toggle-animation-duration', config.style.toggleAnimationDuration);
    }
    if (config.style.toggleAnimationDelay) {
        widgetContainer.style.setProperty('--chat-toggle-animation-delay', config.style.toggleAnimationDelay);
    }
    if (config.style.toggleHoverScale) {
        widgetContainer.style.setProperty('--chat-toggle-hover-scale', config.style.toggleHoverScale);
    }
    if (config.style.toggleHoverRotation) {
        widgetContainer.style.setProperty('--chat-toggle-hover-rotation', config.style.toggleHoverRotation);
    }
    if (config.style.toggleGlowColor) {
        widgetContainer.style.setProperty('--chat-toggle-glow-color', config.style.toggleGlowColor);
    }
    if (config.style.toggleGlowIntensity) {
        widgetContainer.style.setProperty('--chat-toggle-glow-intensity', config.style.toggleGlowIntensity);
    }

    const chatContainer = document.createElement('div');
    chatContainer.className = `chat-container${config.style.position === 'left' ? ' position-left' : ''}`;
    
    // Fonction pour générer les logos
    function generateLogosHTML(config) {
    const lightLogo = config.branding.logo?.light || config.branding.logo || '';
    const darkLogo = config.branding.logo?.dark || config.branding.logo || '';
    
    let logosHTML = '';
    
    // Add light logo
    if (lightLogo) {
        logosHTML += `<img src="${lightLogo}" alt="${config.branding.name}" class="logo-light">`;
    } else if (darkLogo) {
        logosHTML += `<img src="${darkLogo}" alt="${config.branding.name}" class="logo-light">`;
    }
    
    // Add dark logo
    if (darkLogo) {
        logosHTML += `<img src="${darkLogo}" alt="${config.branding.name}" class="logo-dark">`;
    } else if (lightLogo) {
        logosHTML += `<img src="${lightLogo}" alt="${config.branding.name}" class="logo-dark">`;
    }
    
    return logosHTML;
    }
    
    // Remplacez les sections HTML par :
    const newConversationHTML = `
    <div class="brand-header">
        ${generateLogosHTML(config)}
        <span>${config.branding.name}</span>
        <button class="theme-toggle" title="Changer le thème">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z"/>
            </svg>
        </button>
        <button class="minimize-button" title="Réduire">−</button>
        <button class="close-button">×</button>
    </div>
    <div class="new-conversation">
        <h2 class="welcome-text">${config.branding.welcomeText}</h2>
        <button class="new-chat-btn">
            <svg class="message-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path fill="currentColor" d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.2L4 17.2V4h16v12z"/>
            </svg>
            ${config.branding.sendMessage}
        </button>
        <p class="response-text">${config.branding.responseTimeText}</p>
    </div>
    `;
    
    const chatInterfaceHTML = `
    <div class="chat-interface">
        <div class="brand-header">
            ${generateLogosHTML(config)}
            <span>${config.branding.name}</span>
            <button class="theme-toggle" title="Changer le thème">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z"/>
                </svg>
            </button>
            <button class="minimize-button" title="Réduire">−</button>
            <button class="close-button">×</button>
        </div>
        <div class="chat-messages"></div>
        <div class="chat-input">
            <textarea placeholder="${config.branding.placeholder}" rows="1"></textarea>
            <button type="submit">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                </svg>
            </button>
        </div>
        <div class="chat-footer">
            <a href="${config.branding.poweredBy.link}" target="_blank">${config.branding.poweredBy.text}</a>
        </div>
    </div>
    `;
    
    chatContainer.innerHTML = newConversationHTML + chatInterfaceHTML;
    
    const toggleButton = document.createElement('button');
    toggleButton.className = `chat-toggle${config.style.position === 'left' ? ' position-left' : ''}`;
    toggleButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M12 2C6.477 2 2 6.477 2 12c0 1.821.487 3.53 1.338 5L2.5 21.5l4.5-.838A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18c-1.476 0-2.886-.313-4.156-.878l-3.156.586.586-3.156A7.962 7.962 0 014 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z"/>
        </svg>`;
    
    widgetContainer.appendChild(chatContainer);
    widgetContainer.appendChild(toggleButton);
    const markedScript = document.createElement('script');
    markedScript.src = 'https://cdn.jsdelivr.net/npm/marked/lib/marked.umd.min.js';
    document.head.appendChild(markedScript);

    document.body.appendChild(widgetContainer);

    // Get DOM elements
    const newChatBtn = chatContainer.querySelector('.new-chat-btn');
    const chatInterface = chatContainer.querySelector('.chat-interface');
    const messagesContainer = chatContainer.querySelector('.chat-messages');
    const textarea = chatContainer.querySelector('textarea');
    const sendButton = chatContainer.querySelector('button[type="submit"]');
    const themeToggleButtons = chatContainer.querySelectorAll('.theme-toggle');

    // Theme toggle functionality
    function toggleTheme() {
        currentTheme = currentTheme === 'light' ? 'dark' : 'light';
        widgetContainer.setAttribute('data-theme', currentTheme);
        localStorage.setItem('n8n-chat-theme', currentTheme);
    }

    // Load saved theme
    const savedTheme = localStorage.getItem('n8n-chat-theme');
    if (savedTheme && config.style.theme === 'auto') {
        currentTheme = savedTheme;
        widgetContainer.setAttribute('data-theme', currentTheme);
    }

    // Listen for system theme changes
    if (config.style.theme === 'auto') {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem('n8n-chat-theme')) {
                currentTheme = e.matches ? 'dark' : 'light';
                widgetContainer.setAttribute('data-theme', currentTheme);
            }
        });
    }

    function generateUUID() {
        return crypto.randomUUID();
    }

    function showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'chat-message typing';
        typingDiv.innerHTML = `
            <div class="typing-indicator">
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
            </div>
        `;
        messagesContainer.appendChild(typingDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        return typingDiv;
    }

    
    function addBotMessage(text) {
        const botMessageDiv = document.createElement('div');
        botMessageDiv.className = 'chat-message bot';
        botMessageDiv.innerHTML = marked.parse(text);
        messagesContainer.appendChild(botMessageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        
        // Sauvegarder le message du bot
        saveMessageToSession(text, false);
    }

    async function startNewConversation() {
        // Vérifier s'il y a une session existante
        const existingSessionId = sessionStorage.getItem(getDomainBasedKey('n8n-chat-session-id'));
        const chatActive = sessionStorage.getItem(getDomainBasedKey('n8n-chat-active'));
        
        if (existingSessionId && chatActive === 'true') {
            // Restaurer la session existante
            currentSessionId = existingSessionId;
            isChatClosed = false;
        } else {
            // Créer une nouvelle session
            currentSessionId = generateUUID();
            sessionStorage.setItem(getDomainBasedKey('n8n-chat-session-id'), currentSessionId);
            sessionStorage.setItem(getDomainBasedKey('n8n-chat-active'), 'true');
            isChatClosed = false;
        }
        
        const data = [{
            action: "loadPreviousSession",
            sessionId: currentSessionId,
            route: config.webhook.route,
            metadata: {
                userId: config.metadata?.userId || ""
            }
        }];

        try {
            const brandHeader = chatContainer.querySelector('.brand-header');
            if (brandHeader) {
                brandHeader.style.display = 'none';
            }
            chatContainer.querySelector('.new-conversation').style.display = 'none';
            chatInterface.classList.add('active');

            // Restaurer les messages existants avant d'afficher l'indicateur de frappe
            const existingMessages = loadMessagesFromSession();
            if (existingMessages.length > 0) {
                restoreMessagesFromSession();
                return; // Ne pas envoyer de requête si on a déjà des messages
            }

            const typingIndicator = showTypingIndicator();

            const response = await fetch(config.webhook.url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const responseData = await response.json();
            
            // Remove typing indicator
            typingIndicator.remove();

            // Ajouter le message initial seulement pour une nouvelle session
            if (config.branding.initialMessage && !existingSessionId) {
                addBotMessage(config.branding.initialMessage);
            }

        } catch (error) {
            console.error('Error:', error);
            // En cas d'erreur, supprimer l'indicateur de frappe s'il existe
            const typingIndicator = messagesContainer.querySelector('.typing');
            if (typingIndicator) {
                typingIndicator.remove();
            }
        }
    }

    async function sendMessage(message) {
        // Vérifier si le chat est fermé
        if (isChatClosed) {
            return;
        }
        
        const messageData = {
            action: "sendMessage",
            sessionId: currentSessionId,
            route: config.webhook.route,
            chatInput: message,
            metadata: {
            userId: config.metadata?.userId || ""
        }
        };

        const userMessageDiv = document.createElement('div');
        userMessageDiv.className = 'chat-message user';
        userMessageDiv.textContent = message;
        messagesContainer.appendChild(userMessageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        
        // Sauvegarder le message utilisateur
        saveMessageToSession(message, true);

        const typingIndicator = showTypingIndicator();

        try {
            const response = await fetch(config.webhook.url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(messageData)
            });
            
            const data = await response.json();
            
            // Remove typing indicator
            typingIndicator.remove();
            
            // Gérer la réponse avec le nouveau format {output, close_chat}
            let messageText, shouldCloseChat = false;
            
            if (Array.isArray(data)) {
                // Format tableau (ancien format)
                messageText = data[0].output.output;
                shouldCloseChat = data[0].output.close_chat || false;
            } else {
                // Format objet direct
                messageText = data.output.output;
                shouldCloseChat = data.output.close_chat || false;
            }
            
            // Afficher le message du bot
            if (messageText) {
                addBotMessage(messageText);
            }
            
            // Gérer la fermeture du chat si demandée
            if (shouldCloseChat) {
                handleChatClosure();
            }
            
        } catch (error) {
            console.error('Error:', error);
            typingIndicator.remove();
            
            // Afficher un message d'erreur à l'utilisateur
            const errorMessageDiv = document.createElement('div');
            errorMessageDiv.className = 'chat-message bot';
            errorMessageDiv.innerHTML = '<em>❌ Désolé, une erreur s\'est produite. Veuillez réessayer.</em>';
            messagesContainer.appendChild(errorMessageDiv);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }
    }

    // Event listeners
    newChatBtn.addEventListener('click', startNewConversation);
    
    sendButton.addEventListener('click', () => {
        const message = textarea.value.trim();
        if (message) {
            sendMessage(message);
            textarea.value = '';
            textarea.style.height = 'auto';
        }
    });
    
    textarea.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            const message = textarea.value.trim();
            if (message) {
                sendMessage(message);
                textarea.value = '';
                textarea.style.height = 'auto';
            }
        }
    });

    // Auto-resize textarea
    textarea.addEventListener('input', () => {
        textarea.style.height = 'auto';
        textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
    });

    // Ensure event listener for minimize
    const minimizeButtons = chatContainer.querySelectorAll('.minimize-button');
    minimizeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            chatContainer.classList.remove('open');
            // No reset, keep sessionStorage
        });
    });
    
    toggleButton.addEventListener('click', () => {
        const isOpening = !chatContainer.classList.contains('open');
        
        if (isOpening) {
            // Vérifier s'il y a une session active à restaurer
            const existingSessionId = sessionStorage.getItem(getDomainBasedKey('n8n-chat-session-id'));
            const chatActive = sessionStorage.getItem(getDomainBasedKey('n8n-chat-active'));
            
            if (existingSessionId && chatActive === 'true') {
                // Restaurer la session existante
                currentSessionId = existingSessionId;
                isChatClosed = chatActive === 'false';
                
                // Passer directement à l'interface de chat
                const brandHeader = chatContainer.querySelector('.brand-header');
                if (brandHeader) {
                    brandHeader.style.display = 'none';
                }
                chatContainer.querySelector('.new-conversation').style.display = 'none';
                chatInterface.classList.add('active');
                
                // Restaurer les messages
                restoreMessagesFromSession();
                
                // Si le chat était fermé, masquer les contrôles
                if (isChatClosed) {
                    const chatInput = chatContainer.querySelector('.chat-input');
                    if (chatInput) {
                        chatInput.style.display = 'none';
                    }
                }
            }
        }
        
        chatContainer.classList.toggle('open');
    });
    
    // Fonction d'initialisation au chargement de la page
    function initializeOnPageLoad() {
        const existingSessionId = sessionStorage.getItem(getDomainBasedKey('n8n-chat-session-id'));
        const chatActive = sessionStorage.getItem(getDomainBasedKey('n8n-chat-active'));
        
        if (existingSessionId && chatActive === 'true') {
            currentSessionId = existingSessionId;
            isChatClosed = chatActive === 'false';
        }
    }
    
    // Initialiser au chargement
    initializeOnPageLoad();

    // Theme toggle event listeners
    themeToggleButtons.forEach(button => {
        button.addEventListener('click', toggleTheme);
    });

    // Close button handlers avec confirmation
    const closeButtons = chatContainer.querySelectorAll('.close-button');
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Si il y a des messages dans la conversation, demander confirmation
            const messages = loadMessagesFromSession();
            if (messages.length > 0) {
                confirmChatClosure();
            } else {
                // Si pas de messages, fermer simplement
                chatContainer.classList.remove('open');
            }
        });
    });
})();



