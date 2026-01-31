---
title: CLI Command - cap add
description: Capacitor CLI - cap add
contributors:
  - dotNetkow
sidebar_label: add
---

# Capacitor CLI - cap add

Add a native platform project to your app.

```bash
npx cap add <platform>
```

<strong>Inputs:</strong>

- `platform` (required): `android`, `ios`

<strong>Options:</strong>

iOS Only:
- `--packagemanager`: `SPM`, `Cocoapods`
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
<title>Street Beats RPG</title>
<style>
  :root {
    --bg: #0a0a0a;
    --panel: #141414;
    --accent: #ffd700;
    --danger: #ff4444;
    --success: #00ff88;
    --law: #4db8ff;
    --love: #ff69b4;
    --studio: #a855f7;
    --text: #ffffff;
    --sub: #888;
    --xp: #ff9500;
    --herb: #2ecc71;
    --pure: #9b59b6;
  }
  
  * { box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
  
  body {
    margin: 0; padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    background: var(--bg); color: var(--text);
    height: 100vh; overflow: hidden;
    display: flex; flex-direction: column;
    background-image: 
      radial-gradient(circle at 20% 80%, rgba(255, 215, 0, 0.03) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(168, 85, 247, 0.03) 0%, transparent 50%);
  }

  /* --- HUD --- */
  #hud {
    background: rgba(20, 20, 20, 0.95);
    padding: 10px 15px;
    border-bottom: 1px solid #333;
    display: grid; grid-template-columns: 1fr 1fr 1fr;
    gap: 10px; z-index: 10;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
  }
  .stat-box { 
    display: flex; 
    flex-direction: column; 
    justify-content: center;
    position: relative;
  }
  .stat-box .progress-bar {
    position: absolute;
    bottom: -6px;
    left: 0;
    height: 3px;
    background: var(--sub);
    width: 100%;
    border-radius: 2px;
    overflow: hidden;
  }
  .stat-box .progress-fill {
    height: 100%;
    background: var(--accent);
    width: 0%;
    transition: width 0.5s ease;
  }
  .label { 
    font-size: 10px; 
    color: var(--sub); 
    text-transform: uppercase; 
    letter-spacing: 1px; 
    margin-bottom: 2px;
  }
  .value { 
    font-size: 16px; 
    font-weight: 700; 
    color: var(--text);
    display: flex;
    align-items: center;
    gap: 5px;
  }
  .value.money { color: var(--accent); }
  .value.hp { color: var(--success); }
  .value.fans { color: var(--studio); }
  .strikes { color: var(--danger); letter-spacing: 2px; }
  .xp-display {
    font-size: 10px;
    color: var(--xp);
    margin-top: 2px;
    font-weight: bold;
  }

  /* --- GAME AREA --- */
  #game-area {
    flex: 1;
    overflow-y: auto;
    padding: 15px;
    background: linear-gradient(180deg, #0a0a0a 0%, #111 100%);
    position: relative;
  }
  
  /* Custom scrollbar */
  #game-area::-webkit-scrollbar {
    width: 4px;
  }
  #game-area::-webkit-scrollbar-track {
    background: rgba(255,255,255,0.05);
  }
  #game-area::-webkit-scrollbar-thumb {
    background: var(--accent);
    border-radius: 4px;
  }

  /* --- CARDS --- */
  .card {
    background: var(--panel);
    border-radius: 16px;
    padding: 16px;
    margin-bottom: 12px;
    border: 1px solid #222;
    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    transition: transform 0.2s, box-shadow 0.2s;
    overflow: hidden;
  }
  .card:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0,0,0,0.4);
  }
  .card-header { 
    display: flex; 
    justify-content: space-between; 
    align-items: center; 
    margin-bottom: 8px; 
  }
  .card-title { 
    font-size: 16px; 
    font-weight: 700; 
    color: var(--text); 
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .card-sub { 
    font-size: 12px; 
    color: var(--sub); 
  }
  .card-icon {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    font-weight: bold;
  }
  .card-herb .card-icon {
    background: var(--herb);
    color: white;
  }
  .card-pure .card-icon {
    background: var(--pure);
    color: white;
  }
  
  /* --- BUTTONS --- */
  button {
    width: 100%; 
    border: none; 
    outline: none;
    padding: 14px; 
    border-radius: 12px;
    font-size: 14px; 
    font-weight: 700;
    cursor: pointer; 
    margin-top: 8px;
    transition: transform 0.1s, filter 0.2s;
    position: relative;
    overflow: hidden;
  }
  button:active { transform: scale(0.97); }
  button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  button:not(:disabled):hover {
    filter: brightness(1.1);
  }
  
  .btn-primary { 
    background: var(--accent); 
    color: #000; 
  }
  .btn-danger { 
    background: var(--danger); 
    color: #fff; 
  }
  .btn-studio { 
    background: var(--studio); 
    color: #fff; 
  }
  .btn-law { 
    background: var(--law); 
    color: #000; 
  }
  .btn-love { 
    background: var(--love); 
    color: #fff; 
  }
  .btn-sec { 
    background: #333; 
    color: #fff; 
  }
  .btn-herb {
    background: var(--herb);
    color: white;
  }
  .btn-pure {
    background: var(--pure);
    color: white;
  }
  
  .button-badge {
    position: absolute;
    top: -5px;
    right: -5px;
    background: var(--danger);
    color: white;
    font-size: 10px;
    padding: 2px 6px;
    border-radius: 10px;
    font-weight: bold;
  }

  /* --- BOTTOM NAV --- */
  #nav {
    display: grid; 
    grid-template-columns: repeat(4, 1fr);
    background: #000; 
    border-top: 1px solid #333;
    padding-bottom: env(safe-area-inset-bottom);
    position: relative;
    z-index: 5;
  }
  .nav-item {
    padding: 15px 0; 
    text-align: center;
    font-size: 10px; 
    font-weight: bold; 
    color: var(--sub);
    text-transform: uppercase; 
    cursor: pointer;
    transition: all 0.2s;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 4px;
  }
  .nav-item.active { 
    color: var(--accent); 
    background: rgba(255, 215, 0, 0.05);
  }
  .nav-icon {
    font-size: 16px;
  }
  
  /* --- OVERLAYS --- */
  .overlay {
    position: absolute; 
    inset: 0;
    background: rgba(0,0,0,0.95);
    z-index: 100;
    display: none;
    flex-direction: column; 
    align-items: center; 
    justify-content: center;
    padding: 20px; 
    text-align: center;
  }
  .chase-bar-box { 
    width: 100%; 
    height: 24px; 
    background: #333; 
    border-radius: 12px; 
    margin: 20px 0; 
    overflow: hidden; 
    border: 2px solid #555; 
  }
  .chase-fill { 
    height: 100%; 
    width: 50%; 
    background: linear-gradient(90deg, var(--law), #4a8eff);
    transition: width 0.1s;
    position: relative;
    overflow: hidden;
  }
  .chase-fill::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
    animation: shimmer 1s infinite;
  }
  
  .siren-text { 
    color: var(--danger); 
    font-size: 32px; 
    font-weight: 900; 
    animation: blink 0.4s infinite; 
    margin-bottom: 10px;
    text-shadow: 0 0 10px rgba(255,68,68,0.7);
  }
  @keyframes blink { 
    0%, 100% { opacity: 1; } 
    50% { opacity: 0.5; color: blue; } 
  }
  @keyframes shimmer {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }
  
  .event-header {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
  }
  .event-description {
    margin-bottom: 20px;
    max-width: 300px;
    line-height: 1.4;
  }
  
  .xp-gain {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 24px;
    font-weight: bold;
    color: var(--xp);
    z-index: 1000;
    pointer-events: none;
    opacity: 0;
    animation: xpFloat 2s ease-out;
  }
  
  @keyframes xpFloat {
    0% { opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
    20% { opacity: 1; transform: translate(-50%, -100%) scale(1); }
    100% { opacity: 0; transform: translate(-50%, -200%) scale(1); }
  }

  #toast {
    position: fixed; 
    top: 80px; 
    left: 50%; 
    transform: translateX(-50%);
    background: #fff; 
    color: #000; 
    padding: 12px 24px;
    border-radius: 50px; 
    font-weight: bold; 
    font-size: 12px;
    pointer-events: none; 
    opacity: 0; 
    transition: opacity 0.3s, top 0.3s; 
    z-index: 200;
    box-shadow: 0 4px 20px rgba(0,0,0,0.5);
    max-width: 80%;
    text-align: center;
  }
  #toast.show { 
    opacity: 1; 
    top: 90px;
  }
  
  .xp-bar-container {
    width: 100%;
    height: 4px;
    background: rgba(255,255,255,0.1);
    border-radius: 2px;
    margin-top: 5px;
    overflow: hidden;
  }
  
  .xp-bar {
    height: 100%;
    background: var(--xp);
    width: 0%;
    transition: width 0.5s ease;
  }
  
  .day-display {
    position: absolute;
    top: 10px;
    right: 15px;
    font-size: 10px;
    color: var(--sub);
    text-transform: uppercase;
    letter-spacing: 1px;
  }
  
  /* Achievement popup */
  .achievement-popup {
    position: fixed;
    top: 100px;
    right: 20px;
    background: var(--panel);
    border-left: 4px solid var(--accent);
    padding: 12px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.5);
    display: flex;
    align-items: center;
    gap: 10px;
    transform: translateX(120%);
    transition: transform 0.3s ease;
    z-index: 150;
    max-width: 300px;
  }
  
  .achievement-popup.show {
    transform: translateX(0);
  }
  
  .achievement-icon {
    font-size: 24px;
  }
  
  .achievement-text {
    font-size: 12px;
  }
  
  .achievement-title {
    font-weight: bold;
    color: var(--accent);
  }
  
  /* Inventory display */
  .inventory-display {
    display: flex;
    gap: 10px;
    margin-top: 10px;
  }
  
  .inventory-item {
    display: flex;
    align-items: center;
    gap: 5px;
    background: rgba(255,255,255,0.05);
    padding: 5px 10px;
    border-radius: 20px;
    font-size: 12px;
  }
  
  .inventory-count {
    font-weight: bold;
    color: var(--accent);
  }

</style>
</head>
<body>

  <div id="hud">
    <div class="stat-box">
      <span class="label">Cash</span>
      <span class="value money" id="ui-cash">$0</span>
      <div class="progress-bar">
        <div class="progress-fill" id="cash-progress"></div>
      </div>
    </div>
    <div class="stat-box" style="align-items:center;">
      <span class="label">Strikes</span>
      <span class="value strikes" id="ui-strikes">. . . . .</span>
    </div>
    <div class="stat-box" style="align-items:flex-end;">
      <span class="label">Health</span>
      <span class="value hp" id="ui-hp">100%</span>
      <div class="progress-bar">
        <div class="progress-fill" id="hp-progress"></div>
      </div>
    </div>
    <div class="day-display">Day <span id="ui-day">1</span></div>
  </div>

  <div id="game-area">
    <!-- Content will be generated here -->
  </div>

  <div id="nav">
    <div class="nav-item active" onclick="nav('trap')">
      <div class="nav-icon">💰</div>
      <div>Trap</div>
    </div>
    <div class="nav-item" onclick="nav('studio')">
      <div class="nav-icon">🎵</div>
      <div>Studio</div>
    </div>
    <div class="nav-item" onclick="nav('city')">
      <div class="nav-icon">🏙️</div>
      <div>City</div>
    </div>
    <div class="nav-item" onclick="nav('empire')">
      <div class="nav-icon">👑</div>
      <div>Empire</div>
    </div>
  </div>

  <div id="overlay-chase" class="overlay">
    <div class="siren-text">🚨 POLICE CHASE! 🚨</div>
    <p style="margin-bottom: 20px;">TAP 'GAS' TO ESCAPE!</p>
    <div class="chase-bar-box">
      <div id="chase-fill" class="chase-fill"></div>
    </div>
    <button class="btn-primary" style="height: 80px; font-size: 24px; margin-top: 30px;" onclick="pushGas()">
      ⚡ GAS ⚡
    </button>
    <p style="margin-top: 20px; font-size: 12px; color: #aaa;">Progress: <span id="chase-progress-text">50</span>%</p>
  </div>

  <div id="overlay-battle" class="overlay">
    <h1 style="color:var(--danger)">💥 AMBUSH! 💥</h1>
    <p class="event-description">Rivals pulled up on you at the trap spot.</p>
    <button class="btn-danger" onclick="resolveBattle('fight')">🥊 FIGHT BACK (Risk HP)</button>
    <button class="btn-sec" onclick="resolveBattle('run')">🏃 RUN (Lose Cash)</button>
    <button class="btn-studio" onclick="resolveBattle('pay')" style="margin-top: 20px;">💰 PAY THEM OFF ($5,000)</button>
  </div>

  <div id="overlay-event" class="overlay">
    <h1 id="event-title" class="event-header">Event</h1>
    <p id="event-description" class="event-description">Event description</p>
    <div id="event-choices">
      <!-- Buttons will be added here -->
    </div>
  </div>

  <div id="toast">Notification</div>
  
  <div id="xp-gain" class="xp-gain">+100 XP</div>
  
  <div id="achievement-popup" class="achievement-popup">
    <div class="achievement-icon">🏆</div>
    <div class="achievement-text">
      <div class="achievement-title" id="achievement-title">Achievement Unlocked!</div>
      <div id="achievement-desc">Description</div>
    </div>
  </div>

<script>
/* --- ENHANCED GAME STATE --- */
const game = {
  cash: 500,
  hp: 100,
  maxHp: 100,
  strikes: 0,
  fans: 0,
  day: 1,
  xp: 0,
  level: 1,
  inventory: { herb: 5, pure: 0 },
  jewelry: [],
  studioLevel: 1,
  girls: [],
  lawyerFee: 50000,
  tab: 'trap',
  achievements: []
};

const market = {
  herb: { 
    name: "Herb", 
    emoji: "🍁",
    buy: 40, 
    sellMin: 60, 
    sellMax: 100, 
    risk: 0.15,
    description: "Street-level product"
  },
  pure: { 
    name: "Pure", 
    emoji: "💎",
    buy: 1200, 
    sellMin: 2500, 
    sellMax: 4000, 
    risk: 0.40,
    description: "High-end product"
  }
};

const studioGear = [
  { name: "Phone Mic", mult: 1, cost: 0, emoji: "🎤" },
  { name: "USB Mic", mult: 5, cost: 2500, emoji: "🎙️" },
  { name: "Vocal Booth", mult: 15, cost: 15000, emoji: "🎧" },
  { name: "Pro Console", mult: 50, cost: 100000, emoji: "🎛️" }
];

const achievements = [
  { id: "first_sale", name: "First Sale", desc: "Make your first sale", reward: 100, unlocked: false },
  { id: "studio_upgrade", name: "Studio Pro", desc: "Upgrade your studio gear", reward: 250, unlocked: false },
  { id: "first_girlfriend", name: "Ladies Man", desc: "Get your first girlfriend", reward: 150, unlocked: false },
  { id: "millionaire", name: "Paper Chaser", desc: "Reach $1,000,000", reward: 1000, unlocked: false },
  { id: "five_chains", name: "Bling King", desc: "Own 5 chains", reward: 500, unlocked: false }
];

const levelThresholds = [0, 100, 300, 600, 1000, 1500, 2100, 2800, 3600, 4500];

/* --- CORE FUNCTIONS --- */
function init() {
  loadGame();
  render();
  
  // Enhanced RNG Loop with day progression
  setInterval(() => {
    // 3% chance of random event per tick if healthy
    if(game.hp > 0 && Math.random() < 0.03 && 
       document.getElementById('overlay-chase').style.display === 'none' &&
       document.getElementById('overlay-battle').style.display === 'none' &&
       document.getElementById('overlay-event').style.display === 'none') {
       
      // Increase chance based on strike count
      let eventChance = 0.03;
      if (game.strikes > 0) eventChance += game.strikes * 0.01;
      if (Math.random() < eventChance) {
        triggerEvent();
      }
    }
    
    // Auto-heal slowly over time (1% per minute)
    if (game.hp < game.maxHp && game.day % 5 === 0) {
      game.hp = Math.min(game.maxHp, game.hp + 1);
      updateHUD();
    }
  }, 3000);
  
  // Add XP bar to HUD
  updateHUD();
}

function nav(tabName) {
  game.tab = tabName;
  document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
  event.currentTarget.classList.add('active');
  render();
}

function updateHUD() {
  // Update HUD
  document.getElementById('ui-cash').innerText = `$${game.cash.toLocaleString()}`;
  document.getElementById('ui-hp').innerText = `${game.hp}%`;
  document.getElementById('ui-day').innerText = game.day;
  
  // Update cash progress bar (towards next 10k)
  const cashProgress = Math.min(100, (game.cash % 10000) / 100);
  document.getElementById('cash-progress').style.width = `${cashProgress}%`;
  
  // Update HP progress bar
  document.getElementById('hp-progress').style.width = `${game.hp}%`;
  
  let s = "";
  for(let i=0; i<5; i++) s += (i < game.strikes) ? "❌ " : "⚪ ";
  document.getElementById('ui-strikes').innerText = s;
}

function render() {
  updateHUD();
  
  // Render Tab Content
  const area = document.getElementById('game-area');
  area.innerHTML = '';

  if (game.tab === 'trap') renderTrap(area);
  else if (game.tab === 'studio') renderStudio(area);
  else if (game.tab === 'city') renderCity(area);
  else if (game.tab === 'empire') renderEmpire(area);

  saveGame();
}

/* --- ENHANCED TAB RENDERERS --- */
function renderTrap(container) {
  container.innerHTML = `
    <div class="card card-herb">
      <div class="card-header">
        <span class="card-title">
          <div class="card-icon">${market.herb.emoji}</div>
          ${market.herb.name}
        </span>
        <span class="card-sub">Stock: ${game.inventory.herb}</span>
      </div>
      <p style="font-size:12px; color:#aaa; margin-bottom: 10px;">${market.herb.description}</p>
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
        <button class="btn-sec" onclick="trade('buy', 'herb')">
          Buy $${market.herb.buy}
        </button>
        <button class="btn-herb" onclick="trade('sell', 'herb')" ${game.inventory.herb === 0 ? 'disabled' : ''}>
          Sell ($${market.herb.sellMin}-$${market.herb.sellMax})
          ${game.inventory.herb > 0 ? `<span class="button-badge">${game.inventory.herb}</span>` : ''}
        </button>
      </div>
    </div>
    <div class="card card-pure" style="border-color:${game.fans > 1000 ? 'var(--pure)' : '#333'}">
      <div class="card-header">
        <span class="card-title">
          <div class="card-icon">${market.pure.emoji}</div>
          ${market.pure.name}
        </span>
        <span class="card-sub">Stock: ${game.inventory.pure}</span>
      </div>
      <p style="font-size:12px; color:#aaa; margin-bottom: 10px;">${market.pure.description}</p>
      ${game.fans < 1000 ? `
        <div style="background: rgba(155, 89, 182, 0.1); padding: 10px; border-radius: 8px; margin-bottom: 10px;">
          <p style="font-size:12px;color:#9b59b6; margin:0;">
            🔒 Requires 1,000 Fans to unlock connection
          </p>
          <div class="xp-bar-container">
            <div class="xp-bar" style="width: ${Math.min(100, (game.fans / 1000) * 100)}%"></div>
          </div>
          <p style="font-size:10px; color:#666; margin-top:5px;">${game.fans}/1,000 Fans</p>
        </div>
      ` : `
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
        <button class="btn-sec" onclick="trade('buy', 'pure')" ${game.cash < market.pure.buy ? 'disabled' : ''}>
          Buy $${market.pure.buy.toLocaleString()}
        </button>
        <button class="btn-pure" onclick="trade('sell', 'pure')" ${game.inventory.pure === 0 ? 'disabled' : ''}>
          Sell ($${market.pure.sellMin.toLocaleString()}-$${market.pure.sellMax.toLocaleString()})
          ${game.inventory.pure > 0 ? `<span class="button-badge">${game.inventory.pure}</span>` : ''}
        </button>
      </div>
      `}
    </div>
    
    <div class="card">
      <div class="card-header">
        <span class="card-title">📦 Inventory</span>
      </div>
      <div class="inventory-display">
        <div class="inventory-item">
          <span>${market.herb.emoji}</span>
          <span class="inventory-count">${game.inventory.herb}</span>
        </div>
        <div class="inventory-item">
          <span>${market.pure.emoji}</span>
          <span class="inventory-count">${game.inventory.pure}</span>
        </div>
        <div class="inventory-item">
          <span>💍</span>
          <span class="inventory-count">${game.jewelry.length}</span>
        </div>
      </div>
      <p style="font-size:10px; color:#666; margin-top:10px;">
        💡 Tip: Sell in small batches to minimize risk
      </p>
    </div>
  `;
}

function renderStudio(container) {
  const gear = studioGear[game.studioLevel - 1];
  const nextGear = studioGear[game.studioLevel];
  
  let html = `
    <div class="card" style="border-color:var(--studio)">
      <div class="card-header">
        <span class="card-title">${gear.emoji} Recording Session</span>
        <span class="card-sub">Fans: ${game.fans.toLocaleString()}</span>
      </div>
      <p style="font-size:12px; color:#ccc; margin-bottom: 10px;">
        Setup: ${gear.name} (Quality x${gear.mult})
      </p>
      <button class="btn-studio" onclick="recordTrack()" ${game.cash < 1000 ? 'disabled' : ''}>
        🎵 Record Hit ($1,000)
      </button>
      <p style="font-size:10px; color:#888; margin-top: 10px;">
        Each track costs $1,000 but can earn fans and money
      </p>
    </div>`;

  if (nextGear) {
    html += `
    <div class="card">
      <div class="card-header">
        <span class="card-title">⬆️ Upgrade Studio</span>
      </div>
      <p style="font-size:12px; color:#ccc; margin-bottom: 5px;">
        Next: ${nextGear.emoji} ${nextGear.name}
      </p>
      <p style="font-size:11px; color:#aaa; margin-bottom: 10px;">
        Increases track quality multiplier to x${nextGear.mult}
      </p>
      <button class="btn-sec" onclick="buyUpgrade()" ${game.cash < nextGear.cost ? 'disabled' : ''}>
        Buy Gear ($${nextGear.cost.toLocaleString()})
      </button>
    </div>`;
  }
  
  // Display level and XP
  const nextLevelXP = levelThresholds[game.level] || levelThresholds[levelThresholds.length - 1];
  const currentLevelXP = levelThresholds[game.level - 1] || 0;
  const xpProgress = game.xp - currentLevelXP;
  const xpNeeded = nextLevelXP - currentLevelXP;
  const xpPercent = Math.min(100, (xpProgress / xpNeeded) * 100);
  
  html += `
    <div class="card">
      <div class="card-header">
        <span class="card-title">⭐ Reputation</span>
        <span class="card-sub">Level ${game.level}</span>
      </div>
      <p style="font-size:12px; color:#ccc; margin-bottom: 5px;">
        XP: ${game.xp} / ${nextLevelXP}
      </p>
      <div class="xp-bar-container">
        <div class="xp-bar" style="width: ${xpPercent}%"></div>
      </div>
      <p style="font-size:10px; color:#888; margin-top: 10px;">
        Higher level reduces police risk and increases prices
      </p>
    </div>
  `;
  
  container.innerHTML = html;
}

function renderCity(container) {
  // Hospital
  container.innerHTML += `
    <div class="card" style="border-color:var(--success)">
      <div class="card-header">
        <span class="card-title">🏥 Hospital</span>
        <span class="card-sub">HP: ${game.hp}/${game.maxHp}</span>
      </div>
      <button class="btn-sec" onclick="healAction()" ${game.cash < 500 || game.hp >= game.maxHp ? 'disabled' : ''}>
        Heal Injuries ($500)
      </button>
      <p style="font-size:10px; color:#888; margin-top: 10px;">
        Full healing restores you to 100%
      </p>
    </div>
  `;

  // Lawyer
  container.innerHTML += `
    <div class="card" style="border-color:var(--law)">
      <div class="card-header">
        <span class="card-title">⚖️ Saul The Lawyer</span>
        <span class="card-sub">Strikes: ${game.strikes}/5</span>
      </div>
      <button class="btn-law" onclick="payLawyer()" ${game.cash < game.lawyerFee || game.strikes === 0 ? 'disabled' : ''}>
        Remove Strike ($${game.lawyerFee.toLocaleString()})
      </button>
      <p style="font-size:10px; color:#888; margin-top: 10px;">
        Each strike increases police attention by 20%
      </p>
    </div>
  `;

  // Park (Girls)
  container.innerHTML += `
    <div class="card" style="border-color:var(--love)">
      <div class="card-header">
        <span class="card-title">🌳 The Park</span>
        <span class="card-sub">Socialize</span>
      </div>
      <button class="btn-love" onclick="scoutGirl()" ${game.cash < 200 ? 'disabled' : ''}>
        💝 Find Girlfriend ($200)
      </button>
      <p style="font-size:10px; color:#888; margin-top: 10px;">
        Girlfriends provide fan boosts and special perks
      </p>
    </div>
  `;

  // Girlfriends List
  if (game.girls.length > 0) {
    game.girls.forEach((g, i) => {
      const loveHearts = "❤️".repeat(Math.min(5, g.love)) + "🤍".repeat(Math.max(0, 5 - g.love));
      container.innerHTML += `
        <div class="card">
          <div class="card-header">
            <span class="card-title">${g.emoji || '👩'} ${g.name}</span>
            <span class="card-sub">${loveHearts}</span>
          </div>
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
            <button class="btn-sec" onclick="giftGirl(${i})" ${game.cash < 500 ? 'disabled' : ''}>
              Gift ($500)
            </button>
            <button class="btn-love" onclick="dateGirl(${i})">
              Date
            </button>
          </div>
          <p style="font-size:10px; color:#888; margin-top: 10px;">
            Level ${g.love}: +${g.love * 100} fans per date
          </p>
        </div>`;
    });
  }
  
  // Random events button
  container.innerHTML += `
    <div class="card">
      <div class="card-header">
        <span class="card-title">🎲 Street Events</span>
      </div>
      <button class="btn-primary" onclick="triggerEvent()">
        Test Your Luck
      </button>
      <p style="font-size:10px; color:#888; margin-top: 10px;">
        Random events can bring rewards or trouble
      </p>
    </div>
  `;
}

function renderEmpire(container) {
  const jewelryValue = game.jewelry.length * 50000;
  const totalNetWorth = game.cash + jewelryValue;
  const goal = 36000000;
  const progressPercent = Math.min(100, (totalNetWorth / goal) * 100);
  
  container.innerHTML = `
    <div class="card" style="text-align:center; border-color:var(--accent);">
      <h2 style="color:var(--accent); margin:0 0 10px 0;">💰 GOAL: $36,000,000</h2>
      <p style="color:#ccc; margin-bottom: 5px;">Current Net Worth: $${totalNetWorth.toLocaleString()}</p>
      <div class="xp-bar-container" style="height: 10px; margin: 10px 0;">
        <div class="xp-bar" style="width: ${progressPercent}%; background: var(--accent);"></div>
      </div>
      <p style="color:#666; font-size: 12px;">${progressPercent.toFixed(1)}% to goal</p>
    </div>
    
    <div class="card" style="border-color:gold">
      <div class="card-header">
        <span class="card-title">💎 Jeweler</span>
        <span class="card-sub">${game.jewelry.length} owned</span>
      </div>
      <p style="font-size:12px; color:#ccc; margin-bottom: 10px;">
        Gold chains increase your status and net worth
      </p>
      <button class="btn-primary" style="background:linear-gradient(135deg, gold, orange); color:#000;" 
              onclick="buyChain()" ${game.cash < 50000 ? 'disabled' : ''}>
        Buy Chain ($50,000)
      </button>
      <p style="font-size:10px; color:#888; margin-top: 10px;">
        Each chain adds $50,000 to net worth and +500 fans
      </p>
    </div>
    
    <div class="card">
      <div class="card-header">
        <span class="card-title">🏆 Achievements</span>
        <span class="card-sub">${game.achievements.length}/${achievements.length}</span>
      </div>
      <div style="max-height: 200px; overflow-y: auto; margin-top: 10px;">
        ${achievements.map(a => `
          <div style="display: flex; align-items: center; padding: 8px; background: rgba(255,255,255,0.03); 
                      border-radius: 8px; margin-bottom: 5px; ${a.unlocked ? 'border-left: 3px solid var(--accent)' : ''}">
            <div style="font-size: 20px; margin-right: 10px;">${a.unlocked ? '🏆' : '🔒'}</div>
            <div style="flex: 1;">
              <div style="font-weight: bold; font-size: 12px; color: ${a.unlocked ? 'var(--accent)' : '#666'}">
                ${a.name}
              </div>
              <div style="font-size: 10px; color: #888;">${a.desc}</div>
            </div>
            <div style="font-size: 10px; color: var(--xp); font-weight: bold;">
              +${a.reward} XP
            </div>
          </div>
        `).join('')}
      </div>
    </div>
    
    <div style="margin-top:20px; text-align:center;">
      <button class="btn-danger" style="width:auto; padding:10px 20px; font-size:12px;" 
              onclick="if(confirm('Reset all progress?')) resetSave()">
        🔄 RESET GAME
      </button>
      <p style="font-size:10px; color:#666; margin-top:10px;">
        Version 1.1 • Day ${game.day}
      </p>
    </div>
  `;
}

/* --- ENHANCED ACTIONS --- */
function trade(action, type) {
  const item = market[type];
  if (action === 'buy') {
    if (game.cash >= item.buy) {
      game.cash -= item.buy;
      game.inventory[type]++;
      notify(`Bought ${item.emoji} ${item.name} for $${item.buy}`);
      addXP(5);
    } else {
      notify("Need more cash!");
    }
  } else {
    if (game.inventory[type] > 0) {
      // Risk Check - reduced by level
      let risk = item.risk;
      risk -= (game.level - 1) * 0.02; // 2% less risk per level
      risk = Math.max(0.05, risk); // Minimum 5% risk
      
      if (game.strikes > 0) risk += game.strikes * 0.05; // More strikes = more risk
      
      if (Math.random() < risk) {
        startChase();
        return;
      }
      
      const profit = Math.floor(Math.random() * (item.sellMax - item.sellMin) + item.sellMin);
      // Level bonus to profit
      const levelBonus = 1 + (game.level - 1) * 0.05;
      const finalProfit = Math.floor(profit * levelBonus);
      
      game.cash += finalProfit;
      game.inventory[type]--;
      game.day++; // Each sale takes a day
      
      const profitMsg = `Sold ${item.emoji} for $${finalProfit.toLocaleString()}${levelBonus > 1 ? ` (+${Math.round((levelBonus-1)*100)}% level bonus)` : ''}`;
      notify(profitMsg);
      addXP(10);
      
      // Check for first sale achievement
      if (!achievements[0].unlocked) {
        unlockAchievement(0);
      }
    } else {
      notify("No stock to sell!");
    }
  }
  render();
}

function recordTrack() {
  if (game.cash >= 1000) {
    game.cash -= 1000;
    const gear = studioGear[game.studioLevel - 1];
    
    // Quality affects fan gain and payout
    let newFans = Math.floor((Math.random() * 50 + 10) * gear.mult);
    game.fans += newFans;
    
    // Payout based on fans and quality
    let payout = Math.floor((game.fans * 0.5) + (Math.random() * 500 * gear.mult));
    if (payout > 500000) payout = 500000;
    
    game.cash += payout;
    game.day++; // Recording takes a day
    game.xp += 15;
    
    notify(`🎵 Hit recorded! +${newFans.toLocaleString()} Fans | Earned $${payout.toLocaleString()}`);
    render();
    
    // Check studio upgrade achievement
    if (!achievements[1].unlocked && game.studioLevel > 1) {
      unlockAchievement(1);
    }
  } else {
    notify("Studio session costs $1,000");
  }
}

function buyUpgrade() {
  const next = studioGear[game.studioLevel];
  if (game.cash >= next.cost) {
    game.cash -= next.cost;
    game.studioLevel++;
    notify(`🎛️ Upgraded to ${next.name}!`);
    addXP(50);
    
    // Check achievement
    if (!achievements[1].unlocked) {
      unlockAchievement(1);
    }
    
    render();
  } else {
    notify("Too expensive!");
  }
}

function healAction() {
  if (game.hp < game.maxHp && game.cash >= 500) {
    game.cash -= 500;
    game.hp = game.maxHp;
    notify("🏥 Fully healed!");
    render();
  } else if (game.hp >= game.maxHp) {
    notify("Already at full health");
  } else {
    notify("Need $500 for treatment");
  }
}

function payLawyer() {
  if (game.strikes > 0 && game.cash >= game.lawyerFee) {
    game.cash -= game.lawyerFee;
    game.strikes--;
    game.lawyerFee = Math.floor(game.lawyerFee * 1.5); // Price increases
    notify("⚖️ Strike removed!");
    render();
  } else if (game.strikes === 0) {
    notify("No strikes to remove");
  } else {
    notify(`Need $${game.lawyerFee.toLocaleString()}`);
  }
}

function scoutGirl() {
  if (game.cash >= 200) {
    game.cash -= 200;
    game.day++; // Takes a day
    
    if (Math.random() > 0.6) {
      const names = ["Lexi", "Tiana", "Jasmine", "Chloe", "Kira"];
      const emojis = ["💃", "👩‍🎤", "👸", "🎀", "🦋"];
      const idx = Math.floor(Math.random() * names.length);
      const name = names[idx];
      const emoji = emojis[idx];
      
      game.girls.push({ name, emoji, love: 1 });
      notify(`💝 Met ${emoji} ${name}!`);
      addXP(20);
      
      // Check achievement
      if (!achievements[2].unlocked) {
        unlockAchievement(2);
      }
    } else {
      notify("No luck today at the park");
    }
    render();
  } else {
    notify("Need $200 for drinks");
  }
}

function giftGirl(idx) {
  if (game.cash >= 500) {
    game.cash -= 500;
    game.girls[idx].love++;
    notify("🎁 She loved the gift!");
    render();
  }
}

function dateGirl(idx) {
  const g = game.girls[idx];
  const fanGain = g.love * 100;
  game.fans += fanGain;
  game.day++; // Date takes a day
  notify(`💑 Date with ${g.emoji} ${g.name}. Fans +${fanGain.toLocaleString()}`);
  render();
}

function buyChain() {
  if (game.cash >= 50000) {
    game.cash -= 50000;
    game.jewelry.push("Gold Chain");
    game.fans += 500;
    game.xp += 100;
    notify("💎 New ice! +500 fans");
    
    // Check 5 chains achievement
    if (game.jewelry.length >= 5 && !achievements[4].unlocked) {
      unlockAchievement(4);
    }
    
    render();
  } else {
    notify("Need $50,000 for that chain");
  }
}

/* --- ENHANCED EVENTS --- */
function triggerEvent() {
  const events = [
    {
      title: "🎤 Freestyle Battle",
      desc: "A local rapper challenges you to a freestyle battle. Winning could gain you fans.",
      choices: [
        { text: "Accept Challenge", action: () => freestyleBattle() },
        { text: "Ignore", action: () => notify("Played it safe") }
      ]
    },
    {
      title: "💰 Investment Opportunity",
      desc: "A friend has a 'sure thing' investment. It could double your money or lose it all.",
      choices: [
        { text: "Invest $10,000", action: () => investMoney() },
        { text: "Too risky", action: () => notify("Saved your money") }
      ]
    },
    {
      title: "🚓 Police Raid",
      desc: "Police are searching the neighborhood. You have product on you.",
      choices: [
        { text: "Try to hide", action: () => hideFromPolice() },
        { text: "Ditch the product", action: () => ditchProduct() }
      ]
    }
  ];
  
  const event = events[Math.floor(Math.random() * events.length)];
  showEvent(event);
}

function showEvent(event) {
  document.getElementById('event-title').innerText = event.title;
  document.getElementById('event-description').innerText = event.desc;
  
  const choicesDiv = document.getElementById('event-choices');
  choicesDiv.innerHTML = '';
  
  event.choices.forEach((choice, i) => {
    const btn = document.createElement('button');
    btn.className = i === 0 ? 'btn-primary' : 'btn-sec';
    btn.innerText = choice.text;
    btn.onclick = function() {
      document.getElementById('overlay-event').style.display = 'none';
      choice.action();
      render();
    };
    choicesDiv.appendChild(btn);
  });
  
  document.getElementById('overlay-event').style.display = 'flex';
}

function freestyleBattle() {
  const winChance = 0.3 + (game.studioLevel * 0.1); // Better studio = better chance
  if (Math.random() < winChance) {
    const fanGain = Math.floor(Math.random() * 500 + 200);
    game.fans += fanGain;
    notify(`🔥 Won the battle! +${fanGain} fans`);
    addXP(50);
  } else {
    game.hp -= 10;
    notify("💀 Lost the battle. Took some hits.");
  }
}

function investMoney() {
  if (game.cash >= 10000) {
    game.cash -= 10000;
    if (Math.random() < 0.4) {
      const returns = Math.floor(Math.random() * 20000 + 10000);
      game.cash += returns;
      notify(`💰 Investment paid off! +$${returns.toLocaleString()}`);
      addXP(30);
    } else {
      notify("💸 Investment failed. Money lost.");
    }
  } else {
    notify("Need $10,000 to invest");
  }
}

function hideFromPolice() {
  const successChance = 0.7 - (game.strikes * 0.1);
  if (Math.random() < successChance) {
    notify("👮 Hid successfully");
  } else {
    game.strikes++;
    notify("🚨 Caught with product! Strike +1");
    if (game.strikes >= 5) gameOver();
  }
}

function ditchProduct() {
  const totalLoss = game.inventory.herb * market.herb.buy + game.inventory.pure * market.pure.buy;
  game.inventory.herb = 0;
  game.inventory.pure = 0;
  notify(`🗑️ Ditched all product to avoid police. Lost $${totalLoss}`);
}

function resolveBattle(choice) {
  document.getElementById('overlay-battle').style.display = 'none';
  if (choice === 'fight') {
    if (Math.random() > 0.4) {
      const loot = Math.floor(Math.random() * 3000 + 1000);
      game.cash += loot;
      notify(`🥊 Won the fight! Looted $${loot.toLocaleString()}`);
      addXP(30);
    } else {
      game.hp -= 40;
      notify("💥 Shot! HP -40");
      if (game.hp <= 0) gameOver();
    }
  } else if (choice === 'run') {
    const lost = Math.floor(game.cash * 0.3);
    game.cash -= lost;
    notify(`🏃 Ran away. Lost $${lost.toLocaleString()}`);
  } else if (choice === 'pay') {
    if (game.cash >= 5000) {
      game.cash -= 5000;
      notify("💰 Paid them off. Peace restored.");
    } else {
      notify("Not enough to pay them off");
      resolveBattle('run'); // Auto run if can't pay
    }
  }
  render();
}

/* --- CHASE MINI GAME --- */
let chaseProgress = 50;
let chaseInterval;

function startChase() {
  chaseProgress = 50;
  document.getElementById('overlay-chase').style.display = 'flex';
  updateChaseProgressText();
  
  // Chase speed depends on strikes
  const speed = 2 + (game.strikes * 0.5);
  
  chaseInterval = setInterval(() => {
    chaseProgress -= speed;
    updateChaseBar();
    if (chaseProgress <= 0) {
      endChase(false);
    }
  }, 100);
}

function pushGas() {
  // Gas effectiveness depends on cash (better car)
  const gasPower = 8 + Math.floor(game.cash / 50000) * 2;
  chaseProgress += gasPower;
  chaseProgress = Math.min(100, chaseProgress);
  updateChaseBar();
  if (chaseProgress >= 100) {
    endChase(true);
  }
}

function updateChaseBar() {
  document.getElementById('chase-fill').style.width = chaseProgress + '%';
  updateChaseProgressText();
  
  // Change color based on progress
  const fill = document.getElementById('chase-fill');
  if (chaseProgress > 70) {
    fill.style.background = 'linear-gradient(90deg, var(--success), #00cc66)';
  } else if (chaseProgress > 30) {
    fill.style.background = 'linear-gradient(90deg, var(--law), #4a8eff)';
  } else {
    fill.style.background = 'linear-gradient(90deg, var(--danger), #ff6666)';
  }
}

function updateChaseProgressText() {
  document.getElementById('chase-progress-text').innerText = Math.floor(chaseProgress);
}

function endChase(success) {
  clearInterval(chaseInterval);
  document.getElementById('overlay-chase').style.display = 'none';
  if (success) {
    notify("🚗 Escaped the police!");
    addXP(20);
  } else {
    game.strikes++;
    const lostCash = Math.floor(game.cash * 0.7);
    game.cash -= lostCash;
    notify(`🚓 CAUGHT! Strike +1 | Lost $${lostCash.toLocaleString()}`);
    if (game.strikes >= 5) {
      alert("5 STRIKES. LIFE IN PRISON. GAME OVER.");
      resetSave();
    }
  }
  render();
}

function gameOver() {
  alert("WASTED. HP hit 0.");
  game.cash = Math.floor(game.cash / 2);
  game.inventory = { herb: 0, pure: 0 };
  game.hp = 50;
  game.strikes = Math.min(5, game.strikes + 1);
  render();
}

/* --- XP & ACHIEVEMENTS --- */
function addXP(amount) {
  const oldLevel = game.level;
  game.xp += amount;
  
  // Show XP gain animation
  const xpDiv = document.getElementById('xp-gain');
  xpDiv.innerText = `+${amount} XP`;
  xpDiv.style.opacity = 0;
  xpDiv.style.animation = 'none';
  setTimeout(() => {
    xpDiv.style.animation = 'xpFloat 2s ease-out';
  }, 10);
  
  // Check for level up
  while (game.level < levelThresholds.length && game.xp >= levelThresholds[game.level]) {
    game.level++;
  }
  
  if (game.level > oldLevel) {
    notify(`🎉 Level up! Now level ${game.level}`);
    game.maxHp = 100 + (game.level - 1) * 10;
    game.hp = game.maxHp;
  }
  
  // Check millionaire achievement
  if (game.cash >= 1000000 && !achievements[3].unlocked) {
    unlockAchievement(3);
  }
  
  render();
}

function unlockAchievement(index) {
  if (!achievements[index].unlocked) {
    achievements[index].unlocked = true;
    game.achievements.push(achievements[index].id);
    addXP(achievements[index].reward);
    
    // Show achievement popup
    const popup = document.getElementById('achievement-popup');
    document.getElementById('achievement-title').innerText = achievements[index].name;
    document.getElementById('achievement-desc').innerText = achievements[index].desc;
    
    popup.classList.remove('show');
    setTimeout(() => {
      popup.classList.add('show');
      setTimeout(() => {
        popup.classList.remove('show');
      }, 3000);
    }, 10);
    
    saveGame();
  }
}

/* --- UTILS --- */
function notify(msg) {
  const t = document.getElementById('toast');
  t.innerText = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2000);
}

function saveGame() {
  const saveData = {
    ...game,
    achievements: achievements.filter(a => a.unlocked).map(a => a.id)
  };
  localStorage.setItem('sb_save_v2', JSON.stringify(saveData));
}

function loadGame() {
  const saved = localStorage.getItem('sb_save_v2');
  if (saved) {
    const parsed = JSON.parse(saved);
    Object.assign(game, parsed);
    
    // Restore achievement states
    if (game.achievements) {
      achievements.forEach(a => {
        a.unlocked = game.achievements.includes(a.id);
      });
    }
  }
}

function resetSave() {
  localStorage.removeItem('sb_save_v2');
  location.reload();
}

// Initialize the game
init();
</script>
</body>
</html>
