const express = require('express');
const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const cron = require('node-cron');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// WhatsApp Client Setup
const client = new Client({
    authStrategy: new LocalAuth({
        clientId: "fundibot-main"
    }),
    puppeteer: {
        headless: true,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-accelerated-2d-canvas',
            '--no-first-run',
            '--no-zygote',
            '--single-process',
            '--disable-gpu'
        ]
    }
});

// Bot Data Storage (In production, use a database)
const botData = {
    users: new Map(),
    providers: new Map(),
    bookings: new Map(),
    services: [
        'Plumbing', 'Electrical', 'Tutoring', 'Cleaning', 
        'Painting', 'Auto Repair', 'Beauty', 'Tech Support'
    ],
    locations: [
        'Nairobi West', 'Kilimani', 'Kawangware', 'Westlands',
        'Karen', 'Langata', 'Kasarani', 'Embakasi'
    ]
};

// Sample providers data
const sampleProviders = [
    {
        id: 'p1',
        name: 'John Mwangi',
        service: 'Plumbing',
        location: 'Nairobi West',
        rating: 4.9,
        price: 'KES 2,500/hr',
        phone: '+254712345678',
        available: true
    },
    {
        id: 'p2',
        name: 'Sarah Njoki',
        service: 'Tutoring',
        location: 'Kilimani',
        rating: 4.8,
        price: 'KES 1,500/hr',
        phone: '+254700000000',
        available: true
    },
    {
        id: 'p3',
        name: 'Michael Ochieng',
        service: 'Electrical',
        location: 'Kawangware',
        rating: 4.7,
        price: 'KES 3,000/hr',
        phone: '+254787654321',
        available: true
    }
];

// Initialize providers
sampleProviders.forEach(provider => {
    botData.providers.set(provider.id, provider);
});

// WhatsApp Client Events
client.on('qr', (qr) => {
    console.log('🔗 Scan this QR code with your WhatsApp:');
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('✅ FundiBot WhatsApp Client is ready!');
    console.log(`📱 Connected to: ${client.info.pushname}`);
});

client.on('message_create', async (message) => {
    // Only respond to messages sent to us, not from us
    if (message.fromMe) return;
    
    await handleMessage(message);
});

// Message Handler
async function handleMessage(message) {
    const chatId = message.from;
    const messageBody = message.body.toLowerCase().trim();
    const userName = message._data.notifyName || 'Friend';
    
    // Get or create user session
    if (!botData.users.has(chatId)) {
        botData.users.set(chatId, {
            name: userName,
            state: 'welcome',
            searchData: {},
            bookingData: {}
        });
    }
    
    const user = botData.users.get(chatId);
    
    try {
        // Handle different message types
        if (messageBody.includes('hello') || messageBody.includes('hi') || messageBody.includes('start')) {
            await sendWelcomeMessage(chatId, userName);
        } else if (messageBody.includes('services') || messageBody.includes('service')) {
            await sendServicesMenu(chatId);
        } else if (messageBody.includes('find') || messageBody.includes('search')) {
            await handleServiceSearch(chatId, messageBody);
        } else if (messageBody.includes('book') || messageBody.includes('booking')) {
            await handleBookingRequest(chatId, messageBody);
        } else if (messageBody.includes('provider') || messageBody.includes('join')) {
            await handleProviderRegistration(chatId);
        } else if (messageBody.includes('help')) {
            await sendHelpMenu(chatId);
        } else if (messageBody.includes('location')) {
            await sendLocationMenu(chatId);
        } else if (messageBody.includes('contact') || messageBody.includes('support')) {
            await sendContactInfo(chatId);
        } else if (isNumericChoice(messageBody)) {
            await handleNumericChoice(chatId, messageBody, user);
        } else {
            await sendDefaultResponse(chatId, messageBody);
        }
    } catch (error) {
        console.error('Error handling message:', error);
        await client.sendMessage(chatId, '❌ Sorry, something went wrong. Please try again or type "help" for assistance.');
    }
}

// Welcome Message
async function sendWelcomeMessage(chatId, userName) {
    const welcomeMsg = `🤖 *Welcome to FundiBot, ${userName}!*

I'm your personal assistant for finding trusted service providers across Kenya.

🔧 *What I can help you with:*
• Find skilled professionals (fundis)
• Book services instantly
• Connect with tutors & freelancers
• Provider registration

📋 *Quick Commands:*
• Type "services" - View all services
• Type "find [service]" - Search providers
• Type "location" - Set your area
• Type "help" - Get assistance

*What would you like to do today?*`;

    await client.sendMessage(chatId, welcomeMsg);
}

// Services Menu
async function sendServicesMenu(chatId) {
    let servicesMsg = `🛠️ *Available Services*\n\n`;
    
    botData.services.forEach((service, index) => {
        const providerCount = Array.from(botData.providers.values())
            .filter(p => p.service === service).length;
        servicesMsg += `${index + 1}. ${service} (${providerCount}+ providers)\n`;
    });
    
    servicesMsg += `\n💡 *How to search:*\n`;
    servicesMsg += `• Type "find plumbing" for plumbers\n`;
    servicesMsg += `• Type "find tutoring" for tutors\n`;
    servicesMsg += `• Or just type the number (1-${botData.services.length})`;
    
    await client.sendMessage(chatId, servicesMsg);
}

// Handle Service Search
async function handleServiceSearch(chatId, messageBody) {
    const searchTerm = messageBody.replace('find', '').trim();
    const matchedService = botData.services.find(service => 
        service.toLowerCase().includes(searchTerm) || 
        searchTerm.includes(service.toLowerCase())
    );
    
    if (matchedService) {
        const providers = Array.from(botData.providers.values())
            .filter(p => p.service === matchedService);
        
        if (providers.length > 0) {
            let providersMsg = `🔍 *${matchedService} Providers*\n\n`;
            
            providers.forEach((provider, index) => {
                providersMsg += `*${index + 1}. ${provider.name}*\n`;
                providersMsg += `📍 ${provider.location}\n`;
                providersMsg += `⭐ ${provider.rating}/5.0\n`;
                providersMsg += `💰 ${provider.price}\n`;
                providersMsg += `${provider.available ? '✅ Available' : '❌ Busy'}\n\n`;
            });
            
            providersMsg += `📞 *To book:* Type "book [number]"\n`;
            providersMsg += `💬 *Example:* "book 1" for ${providers[0].name}`;
            
            await client.sendMessage(chatId, providersMsg);
        } else {
            await client.sendMessage(chatId, `❌ No ${matchedService} providers found in your area. We're expanding our network daily!`);
        }
    } else {
        await client.sendMessage(chatId, `🤔 Service not found. Type "services" to see available options.`);
    }
}

// Handle Booking Request
async function handleBookingRequest(chatId, messageBody) {
    const bookingMsg = `📅 *Booking Process*

To complete your booking, I need:

1️⃣ *Service needed*
2️⃣ *Preferred date & time*
3️⃣ *Your location*
4️⃣ *Brief description*

*Example booking:*
"Book plumbing for tomorrow 2pm in Kilimani. Kitchen sink is blocked."

💳 *Payment Options:*
• M-Pesa
• Cash on completion
• Bank transfer

📞 *Need help?* Call: +254 768 375 519`;

    await client.sendMessage(chatId, bookingMsg);
}

// Handle Provider Registration
async function handleProviderRegistration(chatId) {
    const registrationMsg = `👷‍♂️ *Join as a Service Provider*

*Requirements:*
✅ Valid ID/Passport
✅ Relevant skills/certification
✅ Professional references
✅ Smartphone with WhatsApp

*Benefits:*
💰 Earn KES 50,000+ monthly
📱 Manage bookings via WhatsApp
🎯 Access to verified customers
⭐ Build your reputation

*To register:*
Send us:
1. Full name
2. Service category
3. Location
4. Experience (years)
5. ID number

📞 *Call for fast registration:* +254 768 375 519`;

    await client.sendMessage(chatId, registrationMsg);
}

// Send Help Menu
async function sendHelpMenu(chatId) {
    const helpMsg = `🆘 *FundiBot Help Center*

*🔧 For Customers:*
• "services" - View all services
• "find [service]" - Search providers
• "book [details]" - Make booking
• "location" - Set your area

*👷‍♂️ For Providers:*
• "join" - Register as provider
• "provider" - Provider info

*📞 Contact Support:*
• Phone: +254 768 375 519
• Email: hello@fundibot.com
• Hours: 24/7

*💡 Tips:*
• Be specific in your requests
• Include your location
• Mention preferred time

Type any keyword to get started!`;

    await client.sendMessage(chatId, helpMsg);
}

// Send Location Menu
async function sendLocationMenu(chatId) {
    let locationMsg = `📍 *Select Your Location*\n\n`;
    
    botData.locations.forEach((location, index) => {
        locationMsg += `${index + 1}. ${location}\n`;
    });
    
    locationMsg += `\n💡 Type the number or location name`;
    
    await client.sendMessage(chatId, locationMsg);
}

// Send Contact Info
async function sendContactInfo(chatId) {
    const contactMsg = `📞 *Contact FundiBot*

*Customer Support:*
📱 WhatsApp: +254 768 375 519
📧 Email: hello@fundibot.com
🌐 Website: fundibot.com

*Business Hours:*
🕐 24/7 WhatsApp Support
🕘 Office: Mon-Fri 8AM-6PM

*Emergency Services:*
Available for urgent repairs and services

*Follow Us:*
📘 Facebook: @FundiBot
📸 Instagram: @FundiBotKE
🐦 Twitter: @FundiBot

We're here to help! 🤝`;

    await client.sendMessage(chatId, contactMsg);
}

// Handle Numeric Choices
async function handleNumericChoice(chatId, messageBody, user) {
    const choice = parseInt(messageBody);
    
    if (choice >= 1 && choice <= botData.services.length) {
        const selectedService = botData.services[choice - 1];
        await handleServiceSearch(chatId, `find ${selectedService}`);
    } else if (choice >= 1 && choice <= botData.locations.length) {
        const selectedLocation = botData.locations[choice - 1];
        user.location = selectedLocation;
        await client.sendMessage(chatId, `📍 Location set to *${selectedLocation}*. Now search for services in your area!`);
    } else {
        await client.sendMessage(chatId, `❌ Invalid choice. Please select a valid number.`);
    }
}

// Default Response
async function sendDefaultResponse(chatId, messageBody) {
    const responses = [
        `🤔 I didn't quite understand that. Type "help" for assistance.`,
        `💡 Try typing "services" to see what I can help you with.`,
        `🔍 Looking for a specific service? Type "find [service name]"`,
        `📞 Need immediate help? Call +254 768 375 519`
    ];
    
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    await client.sendMessage(chatId, randomResponse);
}

// Utility Functions
function isNumericChoice(message) {
    return /^\d+$/.test(message.trim());
}

// Scheduled Messages (Optional)
cron.schedule('0 9 * * *', () => {
    console.log('🕘 Good morning! FundiBot is ready for the day.');
});

// Express Routes for Webhook (if using WhatsApp Business API)
app.get('/webhook', (req, res) => {
    const VERIFY_TOKEN = process.env.WEBHOOK_VERIFY_TOKEN;
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    if (mode && token) {
        if (mode === 'subscribe' && token === VERIFY_TOKEN) {
            console.log('✅ Webhook verified');
            res.status(200).send(challenge);
        } else {
            res.sendStatus(403);
        }
    }
});

app.post('/webhook', (req, res) => {
    const body = req.body;
    console.log('📨 Webhook received:', JSON.stringify(body, null, 2));
    res.status(200).send('EVENT_RECEIVED');
});

// Health Check
app.get('/health', (req, res) => {
    res.json({ 
        status: 'healthy', 
        timestamp: new Date().toISOString(),
        service: 'FundiBot WhatsApp'
    });
});

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 FundiBot server running on port ${PORT}`);
});

// Initialize WhatsApp Client
client.initialize();

// Graceful Shutdown
process.on('SIGINT', async () => {
    console.log('🛑 Shutting down FundiBot...');
    await client.destroy();
    process.exit(0);
});