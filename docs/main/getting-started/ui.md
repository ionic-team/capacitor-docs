// KrushiLink - AI Powered Farming App (Next.js + Gemini + Tailwind + Firebase)

// 📁 Folder Structure Overview
// - pages/
//     index.tsx         --> Home UI
//     api/chat.ts       --> Gemini API call
// - components/
//     ChatBox.tsx       --> Chat UI component
//     WeatherCard.tsx   --> Weather info card (example)
// - utils/
//     firebase.ts       --> Firebase setup
//     gemini.ts         --> Gemini setup
// - .env.local          --> Secret API keys

//------------------------------------------------------
// ✅ 1. .env.local (Place in root folder)
//------------------------------------------------------
GEMINI_API_KEY=your_gemini_api_key_here
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=xxx.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=xxx

//------------------------------------------------------
// ✅ 2. utils/gemini.ts
//------------------------------------------------------
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function askGemini(prompt: string) {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const result = await model.generateContent(prompt);
  return result.response.text();
}

//------------------------------------------------------
// ✅ 3. utils/firebase.ts
//------------------------------------------------------
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
};

export const firebaseApp = initializeApp(firebaseConfig);

//------------------------------------------------------
// ✅ 4. pages/api/chat.ts (API Route)
//------------------------------------------------------
import type { NextApiRequest, NextApiResponse } from 'next';
import { askGemini } from '@/utils/gemini';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { prompt } = req.body;
  const reply = await askGemini(prompt);
  res.status(200).json({ reply });
}

//------------------------------------------------------
// ✅ 5. components/ChatBox.tsx
//------------------------------------------------------
import { useState } from 'react';

export default function ChatBox() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");

  const sendPrompt = async () => {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: input }),
    });
    const data = await res.json();
    setResponse(data.reply);
  };

  return (
    <div className="p-4 bg-white rounded-xl shadow-md max-w-xl mx-auto">
      <h2 className="text-lg font-bold mb-2">Krushi AI Chatbot</h2>
      <textarea
        className="w-full border rounded-md p-2"
        rows={3}
        placeholder="Tamaro prashn lakhvo..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        className="mt-2 bg-green-600 text-white px-4 py-2 rounded"
        onClick={sendPrompt}
      >
        Puchho
      </button>
      <div className="mt-4 bg-gray-100 p-3 rounded">
        <strong>Javab:</strong> {response}
      </div>
    </div>
  );
}

//------------------------------------------------------
// ✅ 6. pages/index.tsx (Main UI)
//------------------------------------------------------
import ChatBox from '@/components/ChatBox';

export default function Home() {
  return (
    <main className="min-h-screen bg-green-50 p-8">
      <h1 className="text-2xl font-bold text-center mb-4">🌾 KrushiLink - Smart Farming App</h1>
      <ChatBox />
    </main>
  );
}

//------------------------------------------------------
// ✅ 7. tailwind.config.js (required setup)
//------------------------------------------------------
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

//------------------------------------------------------
// ✅ 8. Install Required Packages
//------------------------------------------------------
npm install next react react-dom tailwindcss postcss autoprefixer firebase @google/generative-ai
npx tailwindcss init -p
