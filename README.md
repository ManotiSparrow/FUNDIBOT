
# 📦 FUNDIBOT

**FUNDIBOT** is an AI-powered web application designed to assist users through a chatbot interface powered by Bolt AI. It combines a modern frontend built with React, Vite, and Tailwind CSS with a backend Node.js chatbot server. This project is structured to support scalable and responsive AI-driven interactions.

## 🚀 Live Demo

👉 [View on Netlify] https://sage-sherbet-8f9d1c.netlify.app/
## 🧠 Features

- 🔹 Interactive AI chatbot via Bolt AI
- 🔹 Fast and modern UI using React + Vite
- 🔹 Tailwind CSS for sleek, responsive design
- 🔹 Chatbot backend powered by Node.js
- 🔹 Environment variable support via `.env`
- 🔹 One-click deployment with Netlify or Vercel

## 📁 Folder Structure

```
project/
├── index.html                  # Main entry HTML
├── package.json                # Frontend dependencies
├── src/                        # React source files
│   └── App.tsx                 # Main app component
├── chatbot/                    # Chatbot backend (Node.js)
│   ├── server.js               # Express-like server
│   └── .env.example            # Env template for backend
└── .bolt/                      # Bolt AI config and prompts
```

## ⚙️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/ManotiSparrow/FUNDIBOT.git
cd FUNDIBOT/project
```

### 2. Install Frontend Dependencies

```bash
npm install
```

### 3. Start the Frontend Development Server

```bash
npm run dev
```

### 4. Run the Chatbot Backend

```bash
cd chatbot
npm install
node server.js
```

> ⚠️ Make sure to create a `.env` file in the chatbot folder based on `.env.example`.

## 🛠 Built With

- **React** + **TypeScript**
- **Vite**
- **Tailwind CSS**
- **Node.js**
- **Bolt AI**

## 🔐 Environment Variables

Copy `.env.example` to `.env` and configure your keys and secrets for chatbot services.

## 📦 Deployment

To deploy with [Netlify](https://netlify.com):

1. Connect your GitHub repo
2. Set build command: `npm run build`
3. Set publish directory: `dist/`

## 🤖 Bolt AI Integration

Bolt AI configurations and prompts are located in the `.bolt/` folder. Ensure your Bolt environment is set up with appropriate tokens and prompt paths.

## 🧾 License

This project is open source and available under the [MIT License](LICENSE).

