(function() {
    // Translations
    const widgetTranslations = {
        fr: {
            welcomeText: "Salut 👋, comment pouvons-nous vous aider ?",
            responseTimeText: "Nous répondons généralement immédiatement",
            sendMessage: "Envoyez-nous un message",
            placeholder: "Tapez votre message ici...",
            send: "Envoyer",
            poweredBy: "Propulsé par n8n"
        },
        en: {
            welcomeText: "Hi 👋, how can we help?",
            responseTimeText: "We typically respond right away",
            sendMessage: "Send us a message",
            placeholder: "Type your message here...",
            send: "Send",
            poweredBy: "Powered by n8n"
        },
        es: {
            welcomeText: "Hola 👋, ¿cómo podemos ayudarte?",
            responseTimeText: "Normalmente respondemos de inmediato",
            sendMessage: "Envíanos un mensaje",
            placeholder: "Escribe tu mensaje aquí...",
            send: "Enviar",
            poweredBy: "Desarrollado por n8n"
        },
        de: {
            welcomeText: "Hallo 👋, wie können wir helfen?",
            responseTimeText: "Wir antworten normalerweise sofort",
            sendMessage: "Senden Sie uns eine Nachricht",
            placeholder: "Geben Sie hier Ihre Nachricht ein...",
            send: "Senden",
            poweredBy: "Unterstützt von n8n"
        }
    };

    // Create and inject styles
    const styles = `
        .n8n-chat-widget {
            --chat--color-primary: var(--n8n-chat-primary-color, #854fff);
            --chat--color-secondary: var(--n8n-chat-secondary-color, #6b3fd4);
            --chat--color-background: var(--n8n-chat-background-color, #ffffff);
            --chat--color-font: var(--n8n-chat-font-color, #333333);
            font-family: 'Geist Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        }

        .n8n-chat-widget .chat-container {
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 1000;
            display: none;
            width: 380px;
            height: 600px;
            background: var(--chat--color-background);
            border-radius: 12px;
            box-shadow: 0 8px 32px rgba(133, 79, 255, 0.15);
            border: 1px solid rgba(133, 79, 255, 0.2);
            overflow: hidden;
            font-family: inherit;
        }

        .n8n-chat-widget .chat-container.position-left {
            right: auto;
            left: 20px;
        }

        .n8n-chat-widget .chat-container.open {
            display: flex;
            flex-direction: column;
        }

        .n8n-chat-widget .brand-header {
            padding: 16px;
            display: flex;
            align-items: center;
            gap: 12px;
            border-bottom: 1px solid rgba(133, 79, 255, 0.1);
            position: relative;
        }

        .n8n-chat-widget .close-button {
            position: absolute;
            right: 16px;
            top: 50%;
            transform: translateY(-50%);
            background: none;
            border: none;
            color: var(--chat--color-font);
            cursor: pointer;
            padding: 4px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: color 0.2s;
            font-size: 20px;
            opacity: 0.6;
        }

        .n8n-chat-widget .close-button:hover {
            opacity: 1;
        }

        .n8n-chat-widget .brand-header img {
            width: 32px;
            height: 32px;
        }

        .n8n-chat-widget .brand-header span {
            font-size: 18px;
            font-weight: 500;
            color: var(--chat--color-font);
        }

        .n8n-chat-widget .new-conversation {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            padding: 20px;
            text-align: center;
            width: 100%;
            max-width: 300px;
        }

        .n8n-chat-widget .welcome-text {
            font-size: 24px;
            font-weight: 600;
            color: var(--chat--color-font);
            margin-bottom: 24px;
            line-height: 1.3;
        }

        .n8n-chat-widget .new-chat-btn {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            width: 100%;
            padding: 16px 24px;
            background: linear-gradient(135deg, var(--chat--color-primary) 0%, var(--chat--color-secondary) 100%);
            color: white;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-size: 16px;
            transition: transform 0.3s;
            font-weight: 500;
            font-family: inherit;
            margin-bottom: 12px;
        }

        .n8n-chat-widget .new-chat-btn:hover {
            transform: scale(1.02);
        }

        .n8n-chat-widget .message-icon {
            width: 20px;
            height: 20px;
        }

        .n8n-chat-widget .response-text {
            font-size: 14px;
            color: var(--chat--color-font);
            opacity: 0.7;
            margin: 0;
        }

        .n8n-chat-widget .chat-interface {
            display: none;
            flex-direction: column;
            height: 100%;
        }

        .n8n-chat-widget .chat-interface.active {
            display: flex;
        }

        .n8n-chat-widget .chat-messages {
            flex: 1;
            overflow-y: auto;
            padding: 20px;
            background: var(--chat--color-background);
            display: flex;
            flex-direction: column;
        }

        .n8n-chat-widget .chat-message {
            padding: 12px 16px;
            margin: 8px 0;
            border-radius: 12px;
            max-width: 80%;
            word-wrap: break-word;
            font-size: 14px;
            line-height: 1.5;
        }

        .n8n-chat-widget .chat-message.user {
            background: linear-gradient(135deg, var(--chat--color-primary) 0%, var(--chat--color-secondary) 100%);
            color: white;
            align-self: flex-end;
            box-shadow: 0 4px 12px rgba(133, 79, 255, 0.2);
            border: none;
        }

        .n8n-chat-widget .chat-message.bot {
            background: var(--chat--color-background);
            border: 1px solid rgba(133, 79, 255, 0.2);
            color: var(--chat--color-font);
            align-self: flex-start;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        }

        .n8n-chat-widget .chat-input {
            padding: 16px;
            background: var(--chat--color-background);
            border-top: 1px solid rgba(133, 79, 255, 0.1);
            display: flex;
            gap: 8px;
        }

        .n8n-chat-widget .chat-input textarea {
            flex: 1;
            padding: 12px;
            border: 1px solid rgba(133, 79, 255, 0.2);
            border-radius: 8px;
            background: var(--chat--color-background);
            color: var(--chat--color-font);
            resize: none;
            font-family: inherit;
            font-size: 14px;
        }

        .n8n-chat-widget .chat-input textarea::placeholder {
            color: var(--chat--color-font);
            opacity: 0.6;
        }

        .n8n-chat-widget .chat-input button {
            background: linear-gradient(135deg, var(--chat--color-primary) 0%, var(--chat--color-secondary) 100%);
            color: white;
            border: none;
            border-radius: 8px;
            padding: 0 20px;
            cursor: pointer;
            transition: transform 0.2s;
            font-family: inherit;
            font-weight: 500;
        }

        .n8n-chat-widget .chat-input button:hover {
            transform: scale(1.05);
        }

        .n8n-chat-widget .chat-toggle {
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 60px;
            height: 60px;
            border-radius: 30px;
            background: linear-gradient(135deg, var(--chat--color-primary) 0%, var(--chat--color-secondary) 100%);
            color: white;
            border: none;
            cursor: pointer;
            box-shadow: 0 4px 12px rgba(133, 79, 255, 0.3);
            z-index: 999;
            transition: transform 0.3s;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .n8n-chat-widget .chat-toggle.position-left {
            right: auto;
            left: 20px;
        }

        .n8n-chat-widget .chat-toggle:hover {
            transform: scale(1.05);
        }

        .n8n-chat-widget .chat-toggle svg {
            width: 24px;
            height: 24px;
            fill: currentColor;
        }

        .n8n-chat-widget .chat-footer {
            padding: 8px;
            text-align: center;
            background: var(--chat--color-background);
            border-top: 1px solid rgba(133, 79, 255, 0.1);
        }

        .n8n-chat-widget .chat-footer a {
            color: var(--chat--color-primary);
            text-decoration: none;
            font-size: 12px;
            opacity: 0.8;
            transition: opacity 0.2s;
            font-family: inherit;
        }

        .n8n-chat-widget .chat-footer a:hover {
            opacity: 1;
        }
    `;

    // Load Geist font
    const fontLink = document.createElement('link');
    fontLink.rel = 'stylesheet';
    fontLink.href = 'https://cdn.jsdelivr.net/npm/geist@1.0.0/dist/fonts/geist-sans/style.css';
    document.head.appendChild(fontLink);

    // Inject styles
    const styleSheet = document.createElement('style');
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);

    // Default configuration
    const defaultConfig = {
        webhook: {
            url: '',
            route: ''
        },
        branding: {
            logo: '',
            name: '',
            welcomeText: '',
            responseTimeText: '',
            poweredBy: {
                text: 'Powered by n8n',
                link: 'https://n8n.partnerlinks.io/m8a94i19zhqq?utm_source=nocodecreative.io'
            }
        },
        style: {
            primaryColor: '',
            secondaryColor: '',
            position: 'right',
            backgroundColor: '#ffffff',
            fontColor: '#333333'
        },
        language: 'en'
    };

    // Merge user config with defaults
    const config = window.ChatWidgetConfig ? 
        {
            webhook: { ...defaultConfig.webhook, ...window.ChatWidgetConfig.webhook },
            branding: { ...defaultConfig.branding, ...window.ChatWidgetConfig.branding },
            style: { ...defaultConfig.style, ...window.ChatWidgetConfig.style },
            language: window.ChatWidgetConfig.language || defaultConfig.language
        } : defaultConfig;

    // Get translations for current language
    const currentLang = config.language || 'en';
    const t = widgetTranslations[currentLang] || widgetTranslations.en;

    // Prevent multiple initializations
    if (window.N8NChatWidgetInitialized) return;
    window.N8NChatWidgetInitialized = true;

    let currentSessionId = '';

    // Create widget container
    const widgetContainer = document.createElement('div');
    widgetContainer.className = 'n8n-chat-widget';
    
    // Set CSS variables for colors
    widgetContainer.style.setProperty('--n8n-chat-primary-color', config.style.primaryColor);
    widgetContainer.style.setProperty('--n8n-chat-secondary-color', config.style.secondaryColor);
    widgetContainer.style.setProperty('--n8n-chat-background-color', config.style.backgroundColor);
    widgetContainer.style.setProperty('--n8n-chat-font-color', config.style.fontColor);

    const chatContainer = document.createElement('div');
    chatContainer.className = `chat-container${config.style.position === 'left' ? ' position-left' : ''}`;
    
    const newConversationHTML = `
        <div class="welcome-header">
            <div class="chat-avatar">
                <img src="${config.branding.logo}" alt="${config.branding.name}" style="display: ${config.branding.logo ? 'block' : 'none'};">
                <i class="fas fa-robot" style="display: ${config.branding.logo ? 'none' : 'block'};"></i>
            </div>
            <div class="chat-info">
                <div class="chat-title">${config.branding.name}</div>
                <div class="chat-status">En ligne maintenant</div>
            </div>
            <button class="close-button">×</button>
        </div>
        <div class="new-conversation">
            <h2 class="welcome-message">${config.branding.welcomeText || t.welcomeText}</h2>
            <button class="start-chat-btn">
                <i class="fas fa-comment"></i>
                ${t.sendMessage}
            </button>
            <p class="response-time">${config.branding.responseTimeText || t.responseTimeText}</p>
        </div>
    `;
    
    const chatInterfaceHTML = `
        <div class="chat-interface">
            <div class="chat-header">
                <button class="back-button">←</button>
                <div class="chat-avatar">
                    <img src="${config.branding.logo}" alt="${config.branding.name}" style="display: ${config.branding.logo ? 'block' : 'none'};">
                    <i class="fas fa-robot" style="display: ${config.branding.logo ? 'none' : 'block'};"></i>
                </div>
                <div class="chat-info">
                    <div class="chat-title">${config.branding.name}</div>
                    // Ligne 345 - Changer la langue par défaut
                    language: 'fr'
                    
                    // Ligne 412 - Utiliser les traductions pour le statut
                    <div class="chat-status">${t.onlineStatus || 'En ligne maintenant'}</div>
                    
                    // Ligne 443 - Corriger le sélecteur
                    const messageInput = chatContainer.querySelector('.message-input');
                    const sendButton = chatContainer.querySelector('.send-button');
                    
                    // Ajouter les traductions manquantes dans widgetTranslations
                    fr: {
                        welcomeText: "Salut 👋, comment pouvons-nous vous aider ?",
                        responseTimeText: "Nous répondons généralement immédiatement",
                        sendMessage: "Envoyez-nous un message",
                        placeholder: "Tapez votre message ici...",
                        send: "Envoyer",
                        poweredBy: "Propulsé par n8n",
                        onlineStatus: "En ligne maintenant"
                    },
                    en: {
                        welcomeText: "Hi 👋, how can we help?",
                        responseTimeText: "We typically respond right away",
                        sendMessage: "Send us a message",
                        placeholder: "Type your message here...",
                        send: "Send",
                        poweredBy: "Powered by n8n",
                        onlineStatus: "Online now"
                    }
                </div>
                <button class="close-button">×</button>
            </div>
            <div class="chat-messages"></div>
            <div class="chat-input">
                <input type="text" placeholder="${t.placeholder}" class="message-input">
                <button type="submit" class="send-button">
                    <i class="fas fa-paper-plane"></i>
                </button>
            </div>
            <div class="chat-footer">
                <a href="${config.branding.poweredBy.link}" target="_blank">${config.branding.poweredBy.text || t.poweredBy}</a>
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
    document.body.appendChild(widgetContainer);

    const newChatBtn = chatContainer.querySelector('.new-chat-btn');
    const chatInterface = chatContainer.querySelector('.chat-interface');
    const messagesContainer = chatContainer.querySelector('.chat-messages');
    const textarea = chatContainer.querySelector('textarea');
    const sendButton = chatContainer.querySelector('button[type="submit"]');

    function generateUUID() {
        return crypto.randomUUID();
    }

    // Ajouter une variable pour suivre l'état de la conversation
    let conversationStarted = false;
    let currentSessionId = '';

    
    // Modifier la fonction startNewConversation pour ne démarrer qu'une seule fois
    async function startNewConversation() {
        // Ne démarrer une nouvelle conversation que si aucune n'est en cours
        if (currentSessionId) {
            // Si une conversation existe déjà, juste basculer vers l'interface de chat
            showChatInterface();
            return;
        }
        
        currentSessionId = generateUUID();
        conversationStarted = true;
        
        const data = [{
            action: "loadPreviousSession",
            sessionId: currentSessionId,
            route: config.webhook.route,
            metadata: {
                userId: ""
            }
        }];
    
        try {
            const response = await fetch(config.webhook.url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
    
            const responseData = await response.json();
            showChatInterface();
               
            chatContainer.querySelector('.brand-header').style.display = 'none';
            chatContainer.querySelector('.new-conversation').style.display = 'none';
            chatInterface.classList.add('active');

            const botMessageDiv = document.createElement('div');
            botMessageDiv.className = 'chat-message bot';
            botMessageDiv.textContent = "Array.isArray(responseData) ? responseData[0].output : responseData.output";
            messagesContainer.appendChild(botMessageDiv);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
                
        } catch (error) {
            console.error('Error:', error);
        }
    }

    // Fonction pour afficher l'interface de chat
    function showChatInterface() {
        // Cacher l'écran de bienvenue et afficher l'interface de chat
        chatContainer.querySelector('.new-conversation').style.display = 'none';
        chatInterface.style.display = 'flex';
        chatInterface.classList.add('active');
    }

    // Fonction pour revenir à l'écran d'accueil
    function showWelcomeScreen() {
        chatInterface.classList.remove('active');
        chatInterface.style.display = 'none';
        chatContainer.querySelector('.new-conversation').style.display = 'flex';
        
        // Modifier le texte du bouton si une conversation existe
        const startBtn = chatContainer.querySelector('.start-chat-btn');
        if (startBtn && conversationStarted) {
            startBtn.innerHTML = `
                <svg class="message-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.2L4 17.2V4h16v12z"/>
                </svg>
                Continuer la conversation
            `;
        }
    }

    // Modifier les événements pour utiliser les nouvelles fonctions
    newChatBtn.addEventListener('click', startNewConversation);

    // Ajouter l'événement pour le bouton retour (à adapter selon la nouvelle structure)
    const backButton = chatContainer.querySelector('.back-button');
    if (backButton) {
        backButton.addEventListener('click', showWelcomeScreen);
    }

    // Modifier les sélecteurs selon la nouvelle structure (exemple avec le design de l'aperçu)
    const startChatBtn = chatContainer.querySelector('.start-chat-btn'); // nouveau sélecteur
    const messageInput = chatContainer.querySelector('.message-input'); // nouveau sélecteur
    const sendButton = chatContainer.querySelector('.send-button'); // nouveau sélecteur

    // Adapter les événements aux nouveaux sélecteurs
    if (startChatBtn) {
        startChatBtn.addEventListener('click', startNewConversation);
    }

    if (sendButton) {
        sendButton.addEventListener('click', () => {
            const message = messageInput.value.trim();
            if (message) {
                sendMessage(message);
                messageInput.value = '';
            }
        });
    }

    if (messageInput) {
        messageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                const message = messageInput.value.trim();
                if (message) {
                    sendMessage(message);
                    messageInput.value = '';
                }
            }
        });
    }
    
    toggleButton.addEventListener('click', () => {
        chatContainer.classList.toggle('open');
    });

    // Add close button handlers
    const closeButtons = chatContainer.querySelectorAll('.close-button');
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            chatContainer.classList.remove('open');
        });
    });
})();