# ELI5 Bot 🧠

An AI chatbot powered by **Groq** that explains everything as if you're 5 years old — simple words, fun analogies, and lots of emojis!

## Features

- 🤖 Explains any topic in super simple terms
- 💬 Full chat history with a clean UI
- ⚡ Powered by Groq's blazing-fast inference API
- 🔑 No backend — runs entirely in the browser using the OpenAI-compatible SDK
- ⌨️ Press `Enter` to send, `Shift+Enter` for a new line

## Tech Stack

- [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- [OpenAI SDK](https://www.npmjs.com/package/openai) (pointed at Groq's API)
- [Groq API](https://console.groq.com/) — model: `openai/gpt-oss-20b`

## Getting Started

### 1. Clone the repo

```bash
git clone <your-repo-url>
cd like5
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up your API key

Create a `.env` file in the root directory:

```env
VITE_GROK_API_KEY=your_groq_api_key_here
```

Get your free API key at [console.groq.com](https://console.groq.com/).

### 4. Run the dev server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Build for Production

```bash
npm run build
npm run preview
```

## Project Structure

```
like5/
├── public/
├── src/
│   ├── App.jsx       # Main chatbot component
│   ├── App.css       # Chatbot styles
│   ├── main.jsx      # React entry point
│   └── index.css     # Global styles
├── .env              # API key (not committed to git)
├── .gitignore
├── index.html
├── package.json
├── requirements.txt
└── vite.config.js
```

## Environment Variables

| Variable | Description |
|---|---|
| `VITE_GROK_API_KEY` | Your Groq API key (get it from [console.groq.com](https://console.groq.com/)) |

> **Note:** Never commit your `.env` file. It is already added to `.gitignore`.
