<!DOCTYPE html>
<html lang="pt">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Zam-Zam Falcão</title>
  <link href="https://fonts.googleapis.com/css2?family=Roboto&family=Great+Vibes&display=swap" rel="stylesheet">
  <link rel="manifest" href="manifest.json" />
  <style>
    body { font-family: 'Roboto', sans-serif; margin: 0; background: #f9f9f9;}
    header, footer { background: #00695c; color: white; text-align: center; padding: 20px;}
    nav { background: #004d40; display: flex; justify-content: center; flex-wrap: wrap;}
    nav a { color: white; padding: 15px; text-decoration: none; font-weight: bold;}
    nav a:hover { background: #00796b;}
    section { padding: 20px; margin: 20px; background: white; border-radius: 8px; box-shadow: 0 0 5px rgba(0,0,0,0.1);}
    form { display: flex; flex-direction: column; gap: 10px;}
    input, textarea, button { padding: 10px; font-size: 1em; border: 1px solid #ccc; border-radius: 5px;}
    button { background: #00695c; color: white; cursor: pointer;}
    button:hover { background: #004d40;}
.whatsapp-button { position: fixed; bottom: 20px; right: 20px; background: #25D366; color: white; padding: 15px; border-radius: 50%; font-size: 24px; text-decoration: none; box-shadow: 0 4px 6px rgba(0,0,0,0.2);}
  </style>
</head>
<body>
  <header>
    <h1>MADRASSAH ZAM-ZAM Online</h1>
    <h2>SABEDORIA ISLÂMICA</h2>
    <div class="signature">Ustádz Falcão Farias</div>
  </header>

  <nav>
    <a href="#login">Login</a>
    <a href="#testes">Testes</a>
    <a href="#inscricao">Inscrição</a>
    <a href="#faltas">Faltas</a>
    <a href="#contato">Contato</a>
  </nav>

  <section id="login">
    <h2>Login</h2>
    <form id="loginForm">
      <input type="email" id="email" placeholder="Email" required />
      <input type="password" id="password" placeholder="Senha" required />
      <button type="submit">Entrar</button>
    </form>
    <p id="loginStatus"></p>
  </section>

  <section id="testes">
    <h2>Área de Testes</h2>
    <form id="testeForm">
      <textarea id="conteudoTeste" placeholder="Conteúdo do teste..." required></textarea>
      <textarea id="respostaEstudante" placeholder="Resposta do estudante..." required></textarea>
      <input type="number" id="nota" placeholder="Nota atribuída" required />
      <button type="submit">Enviar Correção</button>
    </form>
  </section>

  <section id="inscricao">
    <h2>Inscrição de Estudantes</h2>
    <form id="inscricaoForm">
      <input type="text" id="nomeEstudante" placeholder="Nome completo" required />
      <input type="email" id="emailEstudante" placeholder="Email" required />
      <input type="tel" id="telefoneEstudante" placeholder="Telefone" required />
      <button type="submit">Inscrever</button>
    </form>
  </section>

  <section id="faltas">
    <h2>Justificação de Faltas</h2>
    <form id="justificarFaltaForm">
      <input type="text" id="nomeFalta" placeholder="Nome do estudante" required />
      <textarea id="motivoFalta" placeholder="Motivo da falta" required></textarea>
      <button type="submit">Justificar</button>
    </form>
  </section>

  <section id="contato">
    <h2>Contato</h2>
    <p><strong>Ustádz Falcão Farias</strong></p>
    <p>Telefone: 870003409</p>
    <p>WhatsApp: 870667410</p>
  </section>

  <footer>
    <p>&copy; 2025 Madrassah Zam-Zam. Todos os direitos reservados.</p>
  </footer>

  <a href="https://wa.me/258870667410" class="whatsapp-button" title="Fale conosco no WhatsApp">📱</a>

  <script src="https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js"></script>
  <script src="https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js"></script>
  <script src="https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js"></script>
  <script src="app.js"></script>
</body>
</html>
```

---

*`app.js`*

```javascript
const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "SEU_DOMINIO.firebaseapp.com",
  projectId: "SEU_ID",
  storageBucket: "SEU_BUCKET",
  messagingSenderId: "SEU_SENDER_ID",
  appId: "SEU_APP_ID"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// Login
document.getElementById('loginForm').addEventListener('submit', e => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  auth.signInWithEmailAndPassword(email, password)
.then(() => {
      document.getElementById('loginStatus').innerText = "Login realizado com sucesso!";
})
.catch(error => {
      document.getElementById('loginStatus').innerText = "Erro: " + error.message;
});
});

// Inscrição
document.getElementById('inscricaoForm').addEventListener('submit', e => {
  e.preventDefault();
  db.collection("inscricoes").add({
    nome: document.getElementById('nomeEstudante').value,
    email: document.getElementById('emailEstudante').value,
    telefone: document.getElementById('telefoneEstudante').value
});
  alert("Inscrição enviada com sucesso!");
});

// Teste
document.getElementById('testeForm').addEventListener('submit', e => {
  e.preventDefault();
  db.collection("testes").add({
    conteudo: document.getElementById('conteudoTeste').value,
    resposta: document.getElementById('respostaEstudante').value,
    nota: parseInt(document.getElementById('nota').value)
});
  alert("Teste enviado!");
});

// Faltas
document.getElementById('justificarFaltaForm').addEventListener('submit', e => {
  e.preventDefault();
  db.collection("faltas").add({
    nome: document.getElementById('nomeFalta').value,
    motivo: document.getElementById('motivoFalta').value
});
  alert("Falta justificada!");
});
```

---

### `manifest.json`

```json
{
  "name": "Zam-Zam Falcão",
  "short_name": "Zam-Zam",
  "start_url": "index.html",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#00695c",
  "icons": [
    {
      "src": "icons/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
},
    {
      "src": "icons/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
}
  ]
}
```
