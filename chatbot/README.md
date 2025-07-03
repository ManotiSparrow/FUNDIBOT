# FundiBot WhatsApp Chatbot

A comprehensive WhatsApp chatbot for connecting customers with service providers across Kenya.

## Features

### For Customers
- 🔍 Search for service providers
- 📅 Book services instantly
- 📍 Location-based provider matching
- 💬 Natural language interaction
- 💳 Multiple payment options

### For Service Providers
- 👷‍♂️ Easy registration process
- 📱 WhatsApp-based management
- 💰 Direct customer connections
- ⭐ Reputation building

### Bot Capabilities
- Natural language processing
- Service categorization
- Provider matching
- Booking management
- 24/7 availability

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- WhatsApp account
- Chrome/Chromium browser

### Installation

1. **Clone and Install**
```bash
cd chatbot
npm install
```

2. **Environment Setup**
```bash
cp .env.example .env
# Edit .env with your configuration
```

3. **Start the Bot**
```bash
npm run dev
```

4. **Scan QR Code**
- Open your terminal
- Scan the QR code with WhatsApp
- Wait for "Client is ready!" message

## Bot Commands

### Customer Commands
- `hello` / `hi` - Welcome message
- `services` - View all available services
- `find [service]` - Search for specific service
- `book [details]` - Make a booking
- `location` - Set your location
- `help` - Get assistance

### Provider Commands
- `join` - Register as service provider
- `provider` - Provider information

### Examples
```
User: "find plumbing"
Bot: Shows available plumbers

User: "book plumbing tomorrow 2pm in Kilimani"
Bot: Processes booking request

User: "services"
Bot: Lists all available services
```

## Integration with Website

The chatbot is designed to work seamlessly with your FundiBot website:

1. **All website buttons** now redirect to WhatsApp (+254768375519)
2. **Contextual messages** based on user actions
3. **Booking integration** from website to WhatsApp
4. **Provider registration** through WhatsApp

## Deployment Options

### Option 1: Local Development
```bash
npm run dev
```

### Option 2: Production Server
```bash
npm start
```

### Option 3: Cloud Deployment
- Deploy to Heroku, Railway, or DigitalOcean
- Set environment variables
- Configure webhooks if using Business API

## WhatsApp Business API (Optional)

For production use, consider upgrading to WhatsApp Business API:

1. **Apply for Business API** at developers.facebook.com
2. **Get Phone Number ID** and access token
3. **Configure webhooks** in your app
4. **Update environment variables**

## Monitoring & Analytics

The bot includes:
- Message logging
- User session tracking
- Error handling
- Health check endpoint (`/health`)

## Customization

### Adding New Services
Edit the `services` array in `server.js`:
```javascript
services: [
    'Plumbing', 'Electrical', 'Tutoring', 
    'Your New Service'
]
```

### Adding New Locations
Edit the `locations` array:
```javascript
locations: [
    'Nairobi West', 'Kilimani', 
    'Your New Location'
]
```

### Custom Responses
Modify the message handlers in `server.js` to customize bot responses.

## Support

- **Phone**: +254 768 375 519
- **Email**: hello@fundibot.com
- **WhatsApp**: Message the bot directly

## Security Notes

- Keep your `.env` file secure
- Don't commit sensitive tokens
- Use HTTPS in production
- Implement rate limiting for production

## Next Steps

1. **Test the bot** with various commands
2. **Add more providers** to the database
3. **Integrate payment processing**
4. **Add booking confirmations**
5. **Implement provider notifications**

The bot is now ready to handle customer inquiries and provider registrations through WhatsApp!