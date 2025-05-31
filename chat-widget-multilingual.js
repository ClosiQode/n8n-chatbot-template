// Multilingual Chat Widget
(function() {
    // Translations
    const translations = {
        fr: {
            welcomeText: "Salut 👋, comment pouvons-nous vous aider ?",
            sendMessage: "Envoyez-nous un message",
            responseTimeText: "Nous répondons généralement immédiatement",
            placeholder: "Tapez votre message ici...",
            send: "Envoyer",
            poweredBy: "Propulsé par n8n",
            onlineStatus: "En ligne maintenant"
        },
        en: {
            welcomeText: "Hi 👋, how can we help you?",
            sendMessage: "Send us a message",
            responseTimeText: "We typically respond right away",
            placeholder: "Type your message here...",
            send: "Send",
            poweredBy: "Powered by n8n",
            onlineStatus: "Online now"
        },
        es: {
            welcomeText: "Hola 👋, ¿cómo podemos ayudarte?",
            sendMessage: "Envíanos un mensaje",
            responseTimeText: "Normalmente respondemos de inmediato",
            placeholder: "Escribe tu mensaje aquí...",
            send: "Enviar",
            poweredBy: "Desarrollado por n8n",
            onlineStatus: "En línea ahora"
        },
        de: {
            welcomeText: "Hallo 👋, wie können wir Ihnen helfen?",
            sendMessage: "Senden Sie uns eine Nachricht",
            responseTimeText: "Wir antworten normalerweise sofort",
            placeholder: "Geben Sie hier Ihre Nachricht ein...",
            send: "Senden",
            poweredBy: "Unterstützt von n8n",
            onlineStatus: "Jetzt online"
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
            background: linear-gradient(135deg, var(--chat--color-primary), var(--chat--color-secondary));
            color: white;
            border: none;
            padding: 16px 24px;
            border-radius: 8px;
            font-size: 16px;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            gap: 8px;
            margin: 0 auto 16px;
            box-shadow: 0 4px 12px rgba(133, 79, 255, 0.3);
        }

        .n8n-chat-widget .new-chat-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(133, 79, 255, 0.4);
        }

        .n8n-chat-widget .message-icon {
            width: 20px;
            height: 20px;
        }

        .n8n-chat-widget .response-text {
            color: #666;
            font-size: 14px;
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
            padding: 20px;
            overflow-y: auto;
            display: flex;
            flex-direction: column;
            gap: 12px;
        }

        .n8n-chat-widget .chat-message {
            max-width: 80%;
            padding: 12px 16px;
            border-radius: 18px;
            font-size: 14px;
            line-height: 1.4;
            word-wrap: break-word;
        }

        .n8n-chat-widget .chat-message.user {
            background: var(--chat--color-primary);
            color: white;
            align-self: flex-end;
            border-bottom-right-radius: 4px;
        }

        .n8n-chat-widget .chat-message.bot {
            background: #f1f3f5;
            color: var(--chat--color-font);
            align-self: flex-start;
            border-bottom-left-radius: 4px;
        }

        .n8n-chat-widget .chat-input {
            padding: 20px;
            border-top: 1px solid #eee;
            display: flex;
            gap: 12px;
            align-items: flex-end;
        }

        .n8n-chat-widget .chat-input textarea {
            flex: 1;
            border: 1px solid #ddd;
            border-radius: 20px;
            padding: 12px 16px;
            font-size: 14px;
            resize: none;
            outline: none;
            font-family: inherit;
            max-height: 100px;
            min-height: 40px;
        }

        .n8n-chat-widget .chat-input textarea:focus {
            border-color: var(--chat--color-primary);
        }

        .n8n-chat-widget .chat-input button {
            background: var(--chat--color-primary);
            color: white;
            border: none;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: background-color 0.2s;
        }

        .n8n-chat-widget .chat-input button:hover {
            background: var(--chat--color-secondary);
        }

        .n8n-chat-widget .chat-footer {
            padding: 12px 20px;
            text-align: center;
            border-top: 1px solid #eee;
        }

        .n8n-chat-widget .chat-footer a {
            color: #666;
            text-decoration: none;
            font-size: 12px;
        }

        .n8n-chat-widget .chat-footer a:hover {
            color: var(--chat--color-primary);
        }

        .n8n-chat-widget .chat-toggle {
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 60px;
            height: 60px;
            border-radius: 50%;
            background: linear-gradient(135deg, var(--chat--color-primary), var(--chat--color-secondary));
            border: none;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 20px rgba(133, 79, 255, 0.3);
            transition: all 0.3s ease;
            z-index: 999;
        }

        .n8n-chat-widget .chat-toggle.position-left {
            right: auto;
            left: 20px;
        }

        .n8n-chat-widget .chat-toggle:hover {
            transform: scale(1.1);
            box-shadow: 0 6px 25px rgba(133, 79, 255, 0.4);
        }

        .n8n-chat-widget .chat-toggle svg {
            width: 24px;
            height: 24px;
            fill: white;
        }

        @media (max-width: 480px) {
            .n8n-chat-widget .chat-container {
                width: 100vw;
                height: 100vh;
                bottom: 0;
                right: 0;
                border-radius: 0;
            }
            
            .n8n-chat-widget .chat-container.position-left {
                left: 0;
            }
        }
    `;

    // Inject styles
    const styleSheet = document.createElement('style');
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);

    // Default configuration
    const defaultConfig = {
        webhook: {
            url: 'https://your-n8n-webhook-url.com',
            route: 'chat'
        },
        branding: {
            name: 'Assistant IA',
            logo: '',
            welcomeText: 'Salut 👋, comment pouvons-nous vous aider ?',
            responseTimeText: 'Nous répondons généralement immédiatement',
            poweredBy: {
                text: 'Propulsé par n8n',
                link: 'https://n8n.io'
            }
        },
        style: {
            primaryColor: '',
            secondaryColor: '',
            position: 'right',
            backgroundColor: '#ffffff',
            fontColor: '#333333'
        },
        language: 'fr' // Default language
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
    const t = translations[config.language] || translations.fr;

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
        <div class="brand-header">
            <img src="${config.branding.logo}" alt="${config.branding.name}" style="display: ${config.branding.logo ? 'block' : 'none'};">
            <span>${config.branding.name}</span>
            <button class="close-button">×</button>
        </div>
        <div class="new-conversation">
            <h2 class="welcome-text">${t.welcomeText}</h2>
            <button class="new-chat-btn">
                <svg class="message-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.2L4 17.2V4h16v12z"/>
                </svg>
                ${t.sendMessage}
            </button>
            <p class="response-text">${t.responseTimeText}</p>
        </div>
    `;

    const chatInterfaceHTML = `
        <div class="chat-interface">
            <div class="brand-header">
                <img src="${config.branding.logo}" alt="${config.branding.name}" style="display: ${config.branding.logo ? 'block' : 'none'};">
                <span>${config.branding.name}</span>
                <button class="close-button">×</button>
            </div>
            <div class="chat-messages"></div>
            <div class="chat-input">
                <textarea placeholder="${t.placeholder}" rows="1"></textarea>
                <button type="submit">${t.send}</button>
            </div>
            <div class="chat-footer">
                <a href="${config.branding.poweredBy.link}" target="_blank">${t.poweredBy}</a>
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

    // Get DOM elements
    const newChatBtn = chatContainer.querySelector('.new-chat-btn');
    const chatInterface = chatContainer.querySelector('.chat-interface');
    const messagesContainer = chatContainer.querySelector('.chat-messages');
    const textarea = chatContainer.querySelector('textarea');
    const sendButton = chatContainer.querySelector('button[type="submit"]');

    function generateUUID() {
        return crypto.randomUUID();
    }

    async function startNewConversation() {
        currentSessionId = generateUUID();
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
            const brandHeader = chatContainer.querySelector('.brand-header');
            if (brandHeader) {
                brandHeader.style.display = 'none';
            }
            chatContainer.querySelector('.new-conversation').style.display = 'none';
            chatInterface.classList.add('active');

            const botMessageDiv = document.createElement('div');
            botMessageDiv.className = 'chat-message bot';
            botMessageDiv.textContent = Array.isArray(responseData) ? responseData[0].output : responseData.output;
            messagesContainer.appendChild(botMessageDiv);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        } catch (error) {
            console.error('Error:', error);
        }
    }

    async function sendMessage(message) {
        const messageData = {
            action: "sendMessage",
            sessionId: currentSessionId,
            route: config.webhook.route,
            chatInput: message,
            metadata: {
                userId: ""
            }
        };

        const userMessageDiv = document.createElement('div');
        userMessageDiv.className = 'chat-message user';
        userMessageDiv.textContent = message;
        messagesContainer.appendChild(userMessageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;

        try {
            const response = await fetch(config.webhook.url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(messageData)
            });
            
            const data = await response.json();
            
            const botMessageDiv = document.createElement('div');
            botMessageDiv.className = 'chat-message bot';
            botMessageDiv.textContent = Array.isArray(data) ? data[0].output : data.output;
            messagesContainer.appendChild(botMessageDiv);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        } catch (error) {
            console.error('Error:', error);
        }
    }

    // Event listeners
    newChatBtn.addEventListener('click', startNewConversation);
    
    sendButton.addEventListener('click', () => {
        const message = textarea.value.trim();
        if (message) {
            sendMessage(message);
            textarea.value = '';
        }
    });
    
    textarea.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            const message = textarea.value.trim();
            if (message) {
                sendMessage(message);
                textarea.value = '';
            }
        }
    });
    
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