// Traductions pour l'interface
const translations = {
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

function updatePreview() {
    const language = document.getElementById('language').value;
    const primaryColor = document.getElementById('primaryColor').value;
    const secondaryColor = document.getElementById('secondaryColor').value;
    const backgroundColor = document.getElementById('backgroundColor').value;
    const fontColor = document.getElementById('fontColor').value;
    const position = document.getElementById('position').value;
    const logo = document.getElementById('logo').value;
    const companyName = document.getElementById('companyName').value;
    
    const t = translations[language];
    
    const preview = document.getElementById('preview');
    preview.innerHTML = `
        <div style="
            position: absolute;
            ${position}: 20px;
            bottom: 20px;
            width: 60px;
            height: 60px;
            border-radius: 30px;
            background: linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            cursor: pointer;
            box-shadow: 0 4px 12px rgba(133, 79, 255, 0.3);
        ">
            💬
        </div>
        
        <div style="
            position: absolute;
            ${position}: 20px;
            bottom: 90px;
            width: 300px;
            height: 200px;
            background: ${backgroundColor};
            border-radius: 12px;
            box-shadow: 0 8px 32px rgba(133, 79, 255, 0.15);
            border: 1px solid rgba(133, 79, 255, 0.2);
            padding: 16px;
            display: flex;
            flex-direction: column;
            font-size: 12px;
        ">
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 16px;">
                ${logo ? `<img src="${logo}" style="width: 24px; height: 24px; border-radius: 4px;">` : '🏢'}
                <span style="font-weight: 600; color: ${fontColor};">${companyName || 'Votre Entreprise'}</span>
            </div>
            
            <div style="text-align: center; flex: 1; display: flex; flex-direction: column; justify-content: center;">
                <h3 style="color: ${fontColor}; margin-bottom: 12px; font-size: 14px;">${t.welcomeText}</h3>
                <button style="
                    background: linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%);
                    color: white;
                    border: none;
                    padding: 8px 16px;
                    border-radius: 6px;
                    font-size: 11px;
                    margin-bottom: 8px;
                    cursor: pointer;
                ">${t.sendMessage}</button>
                <p style="color: ${fontColor}; opacity: 0.7; font-size: 10px;">${t.responseTimeText}</p>
            </div>
        </div>
    `;
}

function generateChatbot() {
    const config = {
        language: document.getElementById('language').value,
        webhookUrl: document.getElementById('webhookUrl').value,
        route: document.getElementById('route').value,
        logo: document.getElementById('logo').value,
        companyName: document.getElementById('companyName').value,
        primaryColor: document.getElementById('primaryColor').value,
        secondaryColor: document.getElementById('secondaryColor').value,
        backgroundColor: document.getElementById('backgroundColor').value,
        fontColor: document.getElementById('fontColor').value,
        position: document.getElementById('position').value
    };
    
    const t = translations[config.language];
    
    // Générer SEULEMENT le script d'intégration
    const integrationScript = `<script>
    window.ChatWidgetConfig = {
        webhook: {
            url: '${config.webhookUrl}',
            route: '${config.route}'
        },
        branding: {
            logo: '${config.logo}',
            name: '${config.companyName}',
            welcomeText: '${t.welcomeText}',
            responseTimeText: '${t.responseTimeText}',
            poweredBy: {
                text: '${t.poweredBy}',
                link: 'https://n8n.partnerlinks.io/m8a94i19zhqq?utm_source=nocodecreative.io'
            }
        },
        style: {
            primaryColor: '${config.primaryColor}',
            secondaryColor: '${config.secondaryColor}',
            position: '${config.position}',
            backgroundColor: '${config.backgroundColor}',
            fontColor: '${config.fontColor}'
        },
        language: '${config.language}'
    };
</script>
<script src="https://cdn.jsdelivr.net/ClosiQode/chat-widget-multilingual.js"></script>`;
    
    // Afficher le code d'intégration
    const codeOutput = document.getElementById('codeOutput');
    codeOutput.textContent = integrationScript;
    codeOutput.style.display = 'block';
    
    // Mettre à jour les étapes
    document.querySelectorAll('.step').forEach((step, index) => {
        if (index <= 1) step.classList.add('active');
    });
    
    // Afficher la section d'intégration
    document.getElementById('integrationSection').style.display = 'block';
    document.getElementById('integrationSection').scrollIntoView({ behavior: 'smooth' });
    
    // Sauvegarder pour les actions
    window.currentIntegrationScript = integrationScript;
}

// Fonctions simplifiées pour les actions
function downloadIntegrationScript() {
    const script = window.currentIntegrationScript;
    const blob = new Blob([script], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'chatbot-script.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function copyIntegrationScript() {
    const script = window.currentIntegrationScript;
    navigator.clipboard.writeText(script).then(() => {
        alert('✅ Script copié dans le presse-papiers !');
    }).catch(err => {
        console.error('Erreur lors de la copie:', err);
        // Fallback
        const textArea = document.createElement('textarea');
        textArea.value = script;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        alert('✅ Script copié dans le presse-papiers !');
    });
}

function generateConfigId() {
    return 'config_' + Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
}

function updateActionButtons(script, configId) {
    const actionsContainer = document.getElementById('actionsContainer') || createActionsContainer();
    
    actionsContainer.innerHTML = `
        <button class="generate-btn" onclick="downloadScript('${script.replace(/'/g, "\\'")}')">📥 Télécharger le script</button>
        <button class="generate-btn" onclick="copyToClipboard('${script.replace(/'/g, "\\'")}')">📋 Copier le script</button>
        <button class="generate-btn" onclick="generateInstructions()">📖 Instructions d'intégration</button>
    `;
}

function createActionsContainer() {
    const container = document.createElement('div');
    container.id = 'actionsContainer';
    container.style.marginTop = '20px';
    container.style.display = 'flex';
    container.style.flexDirection = 'column';
    container.style.gap = '10px';
    document.getElementById('codeOutput').parentNode.appendChild(container);
    return container;
}

function downloadScript(script) {
    const blob = new Blob([script], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'chatbot-integration.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function copyToClipboard(script) {
    navigator.clipboard.writeText(script).then(() => {
        alert('Script copié dans le presse-papiers !');
    }).catch(err => {
        console.error('Erreur lors de la copie:', err);
    });
}

function generateInstructions() {
    const instructions = `
# Instructions d'intégration du chatbot

## Étape 1: Copiez le script
Copiez le script généré ci-dessus.

## Étape 2: Intégrez dans votre site
Collez le script juste avant la balise </body> de vos pages web.

## Étape 3: Testez
Rafraîchissez votre page et le chatbot devrait apparaître.

## Support
En cas de problème, contactez notre support.
    `;
    
    const instructionsWindow = window.open('', '_blank');
    instructionsWindow.document.write(`
        <html>
        <head><title>Instructions d'intégration</title></head>
        <body style="font-family: Arial, sans-serif; padding: 20px; max-width: 800px; margin: 0 auto;">
            <pre style="white-space: pre-wrap;">${instructions}</pre>
        </body>
        </html>
    `);
}

// Fonction pour sauvegarder la config côté serveur (optionnel)
function saveConfigToServer(configId, config) {
    // Cette fonction peut être implémentée pour sauvegarder
    // les configurations sur votre serveur pour un usage futur
    console.log('Configuration sauvegardée:', configId, config);
}

// Mise à jour de l'aperçu en temps réel
document.addEventListener('DOMContentLoaded', function() {
    const inputs = ['language', 'primaryColor', 'secondaryColor', 'backgroundColor', 'fontColor', 'position', 'logo', 'companyName'];
    inputs.forEach(id => {
        const element = document.getElementById(id);
        element.addEventListener('input', updatePreview);
        element.addEventListener('change', updatePreview);
    });
    
    updatePreview();
});