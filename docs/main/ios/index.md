ionic start fuelteen-app blank-- type=angular
<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Fuelteen Alto Rendimiento</title>
<link rel="icon" href="https://cdn-icons-png.flaticon.com/512/3976/3976617.png" type="image/png" />
<style>
  :root {
    --primary-color: #2469D6;
    --secondary-color: #48C9B0;
    --accent-color: #E63946;
    --background-color: #f2f6fc;
    --text-color: #202936;
    --font-family: 'Poppins', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');
  * {
    box-sizing: border-box;
  }
  body {
    margin: 0;
    background: var(--background-color);
    font-family: var(--font-family);
    color: var(--text-color);
    line-height: 1.5;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  header {
    background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
    color: white;
    padding: 2.5rem 1rem;
    text-align: center;
    box-shadow: 0 10px 25px rgb(0 0 0 / 0.12);
    position: sticky;
    top: 0;
    z-index: 100;
  }
  header h1 {
    margin: 0;
    font-size: 2.8rem;
    font-weight: 700;
    letter-spacing: 3px;
    text-transform: uppercase;
    text-shadow: 2px 2px 6px rgba(0,0,0,0.15);
  }
  header p {
    margin-top: 0.6rem;
    font-size: 1.3rem;
    font-weight: 400;
    font-style: italic;
    opacity: 0.85;
    text-shadow: 1px 1px 3px rgba(0,0,0,0.1);
  }
  main {
    max-width: 960px;
    margin: 2.5rem auto 4rem;
    padding: 0 1rem;
    flex-grow: 1;
  }
  section {
    margin-bottom: 4rem;
    background: white;
    border-radius: 18px;
    box-shadow: 0 20px 40px rgb(0 0 0 / 0.08);
    padding: 2rem 2.5rem;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  section:hover {
    transform: translateY(-6px);
    box-shadow: 0 28px 55px rgba(0,0,0,0.15);
  }
  h2 {
    color: var(--primary-color);
    border-bottom: 4px solid var(--secondary-color);
    padding-bottom: 0.4rem;
    margin-bottom: 2rem;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    font-size: 1.9rem;
  }
  p {
    font-size: 1.18rem;
    margin-bottom: 1rem;
    line-height: 1.6;
    color: #3a4756;
  }
  ul {
    list-style-type: none;
    margin-left: 0;
    padding-left: 0;
    display: grid;
    grid-template-columns: repeat(auto-fit,minmax(280px,1fr));
    gap: 15px;
  }
  ul li {
    position: relative;
    padding-left: 1.8rem;
    margin-bottom: 1rem;
    font-size: 1.1rem;
    color: #425160;
    font-weight: 500;
    line-height: 1.4;
  }
  ul li::before {
    content: "✔";
    position: absolute;
    left: 0;
    color: var(--secondary-color);
    font-weight: 700;
    font-size: 1.15rem;
    top: 2px;
    text-shadow: 0 0 2px rgba(0,0,0,0.1);
  }

  /* Form Styles */
  form {
    background: #fefefe;
    padding: 2rem 2rem;
    border-radius: 20px;
    box-shadow: 0 14px 32px rgba(0,0,0,0.1);
    max-width: 460px;
    margin: 0 auto;
    transition: box-shadow 0.3s ease;
    position: relative;
    z-index: 5;
  }
  form:hover {
    box-shadow: 0 22px 45px rgba(0,0,0,0.18);
  }
  label {
    display: block;
    margin-bottom: 0.6rem;
    margin-top: 1.3rem;
    font-weight: 700;
    color: var(--accent-color);
    font-size: 1rem;
    letter-spacing: 0.02em;
    transition: color 0.3s ease;
  }
  label:hover {
    color: var(--primary-color);
  }
  input[type="number"], select, input[type="text"], input[type="date"] {
    width: 100%;
    padding: 0.75rem 1rem;
    font-size: 1.1rem;
    border: 2px solid #dbe4ee;
    border-radius: 14px;
    transition: border-color 0.3s ease, box-shadow 0.3s ease;
    font-weight: 500;
    color: var(--text-color);
    letter-spacing: 0.01em;
  }
  input[type="number"]:focus, select:focus, input[type="text"]:focus, input[type="date"]:focus {
    border-color: var(--primary-color);
    outline: none;
    box-shadow: 0 0 8px var(--primary-color);
  }
  button {
    margin-top: 2rem;
    background: var(--primary-color);
    color: white;
    font-size: 1.22rem;
    padding: 1rem 1.6rem;
    border: none;
    border-radius: 14px;
    cursor: pointer;
    font-weight: 800;
    letter-spacing: 1.2px;
    transition: background 0.4s ease, transform 0.2s ease;
    width: 100%;
    box-shadow: 0 8px 22px rgb(36 105 214 / 0.4);
  }
  button:hover {
    background: var(--secondary-color);
    color: var(--text-color);
    box-shadow: 0 12px 30px rgb(72 201 176 / 0.6);
    transform: scale(1.06);
  }
  button:active {
    transform: scale(0.97);
    box-shadow: none;
  }

  /* Result Styles */
  #resultadoCalorias, #resultadoIMC, #planPersonalizadoResultado, #aguaRecomendada, #aguaTomadaResultado, #estresResultado {
    margin-top: 1.5rem;
    background: var(--secondary-color);
    color: #06443b;
    padding: 1.4rem 1.7rem;
    border-radius: 20px;
    font-weight: 700;
    text-align: center;
    box-shadow: 0 12px 28px rgba(0,0,0,0.12);
    white-space: pre-wrap;
    font-size: 1.15rem;
    max-width: 460px;
    margin-left: auto;
    margin-right: auto;
    user-select: all;
  }

  /* Food list and tips styling */
  .food-list {
    display: grid;
    grid-template-columns: repeat(auto-fit,minmax(290px,1fr));
    gap: 1.4rem;
  }
  .food-card {
    background: white;
    border-radius: 20px;
    box-shadow: 0 12px 34px rgba(0,0,0,0.1);
    padding: 1.6rem 1.8rem;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    font-weight: 500;
    color: #2a3c4f;
  }
  .food-card:hover {
    transform: translateY(-7px);
    box-shadow: 0 20px 50px rgba(0,0,0,0.18);
  }
  .food-card h3 {
    margin-top: 0;
    color: var(--accent-color);
    font-weight: 900;
    font-size: 1.35rem;
    margin-bottom: 0.5rem;
    letter-spacing: 0.02em;
  }
  .tip-list {
    background: white;
    padding: 1.6rem 2.4rem;
    border-radius: 20px;
    box-shadow: 0 14px 38px rgba(0,0,0,0.12);
    max-width: 750px;
    margin-left: auto;
    margin-right: auto;
    font-size: 1.1rem;
    font-weight: 500;
    color: #2e4053;
    line-height: 1.7;
  }

  /* Table Styles */
  table {
    width: 100%;
    border-collapse: collapse;
    background: white;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 14px 38px rgba(0,0,0,0.14);
    font-size: 1.03rem;
  }
  th, td {
    padding: 1.3rem 1.8rem;
    border-bottom: 1.7px solid #dde4f0;
    text-align: center;
    font-weight: 600;
    color: #34495e;
  }
  th {
    background-color: var(--primary-color);
    color: white;
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }
  tr:hover {
    background-color: #d0e4ff;
    color: var(--primary-color);
    font-weight: 700;
  }

  /* Seguimiento avances list */
  #seguimientoList, #estresList, #aguaTomadaList {
    background: white;
    border-radius: 18px;
    padding: 1.5rem 2rem;
    max-width: 760px;
    margin: 1.8rem auto;
    box-shadow: 0 14px 38px rgba(0,0,0,0.12);
    max-height: 260px;
    overflow-y: auto;
    font-size: 1rem;
    font-weight: 500;
    color: #34495e;
  }
  #seguimientoList h3, #estresList h3, #aguaTomadaList h3 {
    color: var(--accent-color);
    margin-top: 0;
    font-weight: 900;
    font-size: 1.3rem;
    text-align: center;
  }
  #seguimientoList ul, #estresList ul, #aguaTomadaList ul {
    max-height: 205px;
    overflow-y: auto;
    padding-left: 1.8rem;
    margin: 0;
  }
  #seguimientoList ul li, #estresList ul li, #aguaTomadaList ul li {
    margin-bottom: 0.7rem;
    padding-left: 0.5rem;
    border-left: 4px solid var(--secondary-color);
    line-height: 1.45;
    letter-spacing: 0.02em;
    color: #2c3e50;
  }

  /* Layout and view control */
  #appContent, #inicio {
    display: none;
  }
  #inicio.active, #appContent.active {
    display: block;
  }

  /* QR Container */
  #qrCodeContainer {
    max-width: 160px;
    margin: 2rem auto 4rem;
    text-align: center;
  }
  #qrCodeContainer canvas {
    width: 160px !important;
    height: 160px !important;
    margin: 0 auto;
    filter: drop-shadow(2px 2px 3px rgba(0,0,0,0.12));
  }
  #qrCodeContainer p {
    font-size: 1rem;
    margin-top: 0.7rem;
    color: var(--primary-color);
    font-weight: 700;
    letter-spacing: 0.02em;
  }

  /* Scrollbar styling */
  #seguimientoList ul::-webkit-scrollbar,
  #estresList ul::-webkit-scrollbar,
  #aguaTomadaList ul::-webkit-scrollbar {
    width: 8px;
  }
  #seguimientoList ul::-webkit-scrollbar-track,
  #estresList ul::-webkit-scrollbar-track,
  #aguaTomadaList ul::-webkit-scrollbar-track {
    background: #f4f7fa;
    border-radius: 4px;
  }
  #seguimientoList ul::-webkit-scrollbar-thumb,
  #estresList ul::-webkit-scrollbar-thumb,
  #aguaTomadaList ul::-webkit-scrollbar-thumb {
    background: var(--secondary-color);
    border-radius: 4px;
  }

  /* Responsive */
  @media (max-width: 700px) {
    header h1 {
      font-size: 2rem;
      letter-spacing: 1.5px;
    }
    header p {
      font-size: 1rem;
    }
    main {
      margin: 2rem 1rem 3rem;
      padding: 0 0.8rem;
    }
    section {
      padding: 1.8rem 1.5rem;
      margin-bottom: 3rem;
    }
    h2 {
      font-size: 1.6rem;
    }
    form {
      max-width: 100%;
      padding: 1.8rem 1.3rem;
    }
    #seguimientoList, table,
    #estresList, #aguaTomadaList {
      max-width: 100%;
    }
  }
  @media (max-width: 400px) {
    header h1 {
      font-size: 1.6rem;
      letter-spacing: 1px;
    }
    header p {
      font-size: 0.95rem;
    }
    h2 {
      font-size: 1.4rem;
    }
    button {
      font-size: 1.05rem;
      padding: 0.85rem 1.2rem;
    }
  }
</style>
</head>
<body>
<header>
  <h1>Fuelteen Alto Rendimiento</h1>
  <p id="bienvenidaHeader">Alto rendimiento en cualquier disciplina: potencia tu cuerpo y mente</p>
</header>

<main>
  <!-- Pantalla inicio -->
  <section id="inicio" class="active" aria-label="Inicio - Conocer al adolescente y objetivos">
    <h2>¡Bienvenido! Queremos conocerte</h2>
    <form id="formInicio" onsubmit="iniciarSesion(event)">
      <label for="nombreUsuario">¿Cómo te llamas?</label>
      <input type="text" id="nombreUsuario" name="nombreUsuario" placeholder="Tu nombre" required maxlength="30" autocomplete="name" />

      <label for="objetivos">¿Cuáles son tus objetivos actuales? (elige hasta 3)</label>
      <select id="objetivos" name="objetivos" multiple size="6" required aria-label="Selecciona tus objetivos deportivos y nutricionales">
        <option value="Aumentar fuerza">Aumentar fuerza</option>
        <option value="Perder grasa">Perder grasa</option>
        <option value="Mejorar resistencia">Mejorar resistencia</option>
        <option value="Recuperación rápida">Recuperación rápida</option>
        <option value="Mejorar flexibilidad">Mejorar flexibilidad</option>
        <option value="Desarrollo muscular">Desarrollo muscular</option>
      </select>

      <small>Para seleccionar múltiples, mantén presionada la tecla CTRL (CMD en Mac)</small>

      <button type="submit">Continuar</button>

      <div id="qrCodeContainer" aria-label="Código QR para acceder a esta aplicación" style="margin-top:1.8rem;">
        <!-- QR generator -->
      </div>
    </form>
  </section>

  <!-- Contenido principal -->
  <section id="appContent" aria-label="Contenido principal de la aplicación" tabindex="0" >
    <h2>Hola, <span id="nombreMostrado"></span>!</h2>
    <p id="objetivosMostrados" style="text-align:center;font-weight:600;letter-spacing:0.1em;margin-bottom: 2rem;"></p>

    <section>
      <h2>Selecciona tus alimentos favoritos</h2>
      <form id="formAlimentosPreferidos" onsubmit="actualizarPlanPersonalizado(event)">
        <label for="alimentosGustos">Elige los alimentos que te gustan (mínimo 3)</label>
        <select id="alimentosGustos" name="alimentosGustos" multiple size="8" required aria-label="Lista de alimentos para seleccionar gustos">
          <option value="Avena">Avena</option>
          <option value="Frutas frescas">Frutas frescas</option>
          <option value="Huevos">Huevos</option>
          <option value="Pescado azul">Pescado azul</option>
          <option value="Legumbres">Legumbres</option>
          <option value="Agua">Agua</option>
          <option value="Pollo">Pollo</option>
          <option value="Arroz integral">Arroz integral</option>
          <option value="Vegetales">Vegetales</option>
          <option value="Yogur natural">Yogur natural</option>
          <option value="Nueces">Nueces</option>
          <option value="Pan integral">Pan integral</option>
          <option value="Leche">Leche</option>
          <option value="Quinoa">Quinoa</option>
          <option value="Pasta integral">Pasta integral</option>
          <option value="Carne magra">Carne magra</option>
          <option value="Batidos">Batidos</option>
        </select>

        <small>Para seleccionar múltiples, mantén presionada la tecla CTRL (CMD en Mac)</small>

        <button type="submit" aria-label="Generar plan personalizado basado en gustos y calorías">Generar plan personalizado</button>
      </form>
      <div id="planPersonalizadoResultado" aria-live="polite" role="region"></div>
    </section>

    <section>
      <h2>Calcula tus necesidades calóricas</h2>
      <form id="caloriasForm" onsubmit="calcularCalorias(event)">
        <label for="edad">Edad (años)</label>
        <input type="number" id="edad" name="edad" min="12" max="19" required value="16" autocomplete="off" />

        <label for="peso">Peso (kg)</label>
        <input type="number" id="peso" name="peso" min="30" max="120" step="0.1" required value="60" autocomplete="off" />

        <label for="altura">Altura (cm)</label>
        <input type="number" id="altura" name="altura" min="130" max="210" required value="170" autocomplete="off" />

        <label for="genero">Género</label>
        <select id="genero" name="genero" required aria-label="Seleccione el género">
          <option value="" disabled selected>Selecciona</option>
          <option value="male">Masculino</option>
          <option value="female">Femenino</option>
        </select>

        <label for="actividad">Nivel de actividad física</label>
        <select id="actividad" name="actividad" required aria-label="Seleccione nivel de actividad física">
          <option value="" disabled selected>Selecciona</option>
          <option value="1.55">Moderado (3-5 días/semana)</option>
          <option value="1.725">Alto (6-7 días/semana)</option>
          <option value="1.9">Muy alto (entrenamientos diarios intensos)</option>
        </select>

        <button type="submit" aria-label="Calcular las necesidades calóricas">Calcular</button>
      </form>
      <div id="resultadoCalorias" aria-live="polite" role="region"></div>
    </section>

    <section>
      <h2>Recomendación de consumo de agua</h2>
      <p id="aguaRecomendada" aria-live="polite"></p>
      <form id="aguaTomadaForm" onsubmit="registrarAguaTomada(event)">
        <label for="aguaTomada">¿Cuánta agua has tomado hoy? (ml)</label>
        <input type="number" id="aguaTomada" name="aguaTomada" min="0" step="50" required placeholder="Ej: 1500" autocomplete="off" />
        <button type="submit" aria-label="Registrar cantidad de agua tomada">Registrar agua</button>
      </form>
      <div id="aguaTomadaResultado" aria-live="polite" role="region"></div>
      <div id="aguaTomadaList" aria-label="Historial de agua tomada">
        <h3>Historial de agua tomada</h3>
        <ul id="listaAguaTomada"></ul>
      </div>
    </section>

    <section>
      <h2>Índice de Masa Corporal (IMC)</h2>
      <form id="imcForm" onsubmit="calcularIMC(event)">
        <label for="pesoIMC">Peso (kg)</label>
        <input type="number" id="pesoIMC" name="pesoIMC" min="30" max="120" step="0.1" required value="60" autocomplete="off" />

        <label for="alturaIMC">Altura (cm)</label>
        <input type="number" id="alturaIMC" name="alturaIMC" min="130" max="210" required value="170" autocomplete="off" />

        <button type="submit" aria-label="Calcular el Índice de Masa Corporal">Calcular IMC</button>
      </form>
      <div id="resultadoIMC" aria-live="polite" role="region"></div>
    </section>

    <section>
      <h2>Planes de alimentación sugeridos</h2>
      <p>Planes básicos para una nutrición equilibrada durante la semana.</p>
      <table aria-label="Planes de alimentación semanal">
        <thead>
          <tr>
            <th>Día</th>
            <th>Desayuno</th>
            <th>Almuerzo</th>
            <th>Cena</th>
            <th>Snack</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Lunes</td>
            <td>Avena con frutas y nueces</td>
            <td>Pollo a la plancha con arroz integral y vegetales</td>
            <td>Pescado al horno con puré de papa y ensalada</td>
            <td>Yogur natural con semillas</td>
          </tr>
          <tr>
            <td>Martes</td>
            <td>Huevos revueltos con pan integral y tomate</td>
            <td>Ensalada de legumbres con quinoa y verduras</td>
            <td>Pasta integral con salsa de tomate y carne magra</td>
            <td>Frutas frescas</td>
          </tr>
          <tr>
            <td>Miércoles</td>
            <td>Batido de plátano, leche y avena</td>
            <td>Filete de ternera con puré de calabaza y brócoli</td>
            <td>Tortilla de espinaca y ensalada fresca</td>
            <td>Puñado de nueces</td>
          </tr>
          <tr>
            <td>Jueves</td>
            <td>Pan integral con queso fresco y mermelada natural</td>
            <td>Arroz con lentejas, ensalada de remolacha</td>
            <td>Merluza al vapor con verduras al wok</td>
            <td>Zanahoria baby con hummus</td>
          </tr>
          <tr>
            <td>Viernes</td>
            <td>Cereal integral con leche y frutas</td>
            <td>Ensalada César con pollo y garbanzos</td>
            <td>Pizza casera con base integral y verduras</td>
            <td>Barra de cereal casera</td>
          </tr>
        </tbody>
      </table>
    </section>

    <section>
      <h2>Alimentos recomendados</h2>
      <div class="food-list" aria-label="Lista de alimentos recomendados para adolescentes deportistas">
        <div class="food-card" tabindex="0">
          <h3>Avena</h3>
          <p>Carbohidratos complejos y fibra para energía duradera.</p>
        </div>
        <div class="food-card" tabindex="0">
          <h3>Frutas frescas</h3>
          <p>Vitaminas y antioxidantes para recuperación y salud inmunológica.</p>
        </div>
        <div class="food-card" tabindex="0">
          <h3>Huevos</h3>
          <p>Proteínas altas para reparación y crecimiento muscular.</p>
        </div>
        <div class="food-card" tabindex="0">
          <h3>Pescado azul</h3>
          <p>Omega-3 para salud cerebral y antiinflamación.</p>
        </div>
        <div class="food-card" tabindex="0">
          <h3>Legumbres</h3>
          <p>Proteínas vegetales y fibra para salud digestiva.</p>
        </div>
        <div class="food-card" tabindex="0">
          <h3>Agua</h3>
          <p>Hidratación esencial para rendimiento y concentración.</p>
        </div>
      </div>
    </section>

    <section>
      <h2>Consejos prácticos para una nutrición óptima</h2>
      <div class="tip-list" aria-label="Consejos prácticos de nutrición">
        <ul>
          <li>Consume comidas balanceadas con proteína, carbohidratos y grasas saludables.</li>
          <li>Incluye snacks saludables para mantener energía constante.</li>
          <li>Evita azúcares refinados y comida procesada.</li>
          <li>Duerme 8 horas para favorecer la recuperación.</li>
          <li>Ingiere alimentos ricos en hierro y calcio para desarrollo óptimo.</li>
          <li>Consulta un especialista si tienes intolerancias o necesidades específicas.</li>
        </ul>
      </div>
    </section>

    <section>
      <h2>Recomendaciones para prevenir y tratar lesiones</h2>
      <div class="tip-list" aria-label="Recomendaciones para lesiones">
        <ul>
          <li>Calienta adecuadamente antes del entrenamiento.</li>
          <li>Mantén hidratación constante todo el día.</li>
          <li>Incluye alimentos antiinflamatorios como jengibre y cúrcuma.</li>
          <li>Escucha a tu cuerpo y descansa si hay dolor intenso.</li>
          <li>Realiza ejercicios de fortalecimiento y estiramiento específicos.</li>
          <li>Consulta un profesional de salud si tienes lesiones.</li>
        </ul>
      </div>
    </section>

    <section>
      <h2>Seguimiento de tus avances</h2>
      <form id="seguimientoForm" onsubmit="agregarAvance(event)" aria-label="Formulario para añadir avance">
        <label for="fechaAvance">Fecha</label>
        <input type="date" id="fechaAvance" name="fechaAvance" required max="" />

        <label for="pesoAvance">Peso (kg)</label>
        <input type="number" id="pesoAvance" name="pesoAvance" min="30" max="120" step="0.1" required />

        <label for="comentariosAvance">Comentarios</label>
        <input type="text" id="comentariosAvance" name="comentariosAvance" maxlength="100" placeholder="Ej: Me sentí con más energía" />

        <button type="submit" aria-label="Guardar avance">Guardar avance</button>
      </form>

      <div id="seguimientoList" aria-live="polite" role="region" tabindex="0" aria-label="Lista de avances guardados">
        <h3>Tus avances guardados</h3>
        <ul id="listaAvances"></ul>
      </div>
    </section>

    <section>
      <h2>Seguimiento del estrés psicológico y emocional</h2>
      <form id="estresForm" onsubmit="agregarEstres(event)" aria-label="Formulario para añadir nivel de estrés">
        <label for="fechaEstres">Fecha</label>
        <input type="date" id="fechaEstres" name="fechaEstres" required max="" />

        <label for="nivelEstres">Nivel de estrés (1 - Muy bajo, 5 - Muy alto)</label>
        <select id="nivelEstres" name="nivelEstres" required>
          <option value="" disabled selected>Selecciona nivel</option>
          <option value="1">1 - Muy bajo</option>
          <option value="2">2 - Bajo</option>
          <option value="3">3 - Moderado</option>
          <option value="4">4 - Alto</option>
          <option value="5">5 - Muy alto</option>
        </select>

        <label for="comentariosEstres">Comentarios</label>
        <input type="text" id="comentariosEstres" name="comentariosEstres" maxlength="100" placeholder="Ej: Sentí mucha presión en el entrenamiento" />

        <button type="submit" aria-label="Registrar nivel de estrés">Registrar estrés</button>
      </form>

      <div id="estresList" aria-live="polite" role="region" tabindex="0" aria-label="Lista de registros de estrés">
        <h3>Historial de estrés</h3>
        <ul id="listaEstres"></ul>
      </div>
    </section>
  </section>
</main>

<footer style="text-align:center; padding:1rem 0; font-size:0.85rem; color:#6481a0; background:#e8f0fe;">
  &copy; 2024 Fuelteen Alto Rendimiento. Todos los derechos reservados.
</footer>

<script src="https://cdn.jsdelivr.net/npm/qrcode/build/qrcode.min.js"></script>

<script>
  const hoyISO = new Date().toISOString().split('T')[0];
  document.getElementById('fechaAvance').max = hoyISO;
  document.getElementById('fechaEstres').max = hoyISO;

  function iniciarSesion(event) {
    event.preventDefault();
    const nombreUsuario = document.getElementById('nombreUsuario').value.trim();
    const select = document.getElementById('objetivos');
    const opcionesSeleccionadas = Array.from(select.selectedOptions).map(option => option.value);

    if (nombreUsuario.length === 0 || opcionesSeleccionadas.length === 0) {
      alert('Por favor ingresa tu nombre y selecciona al menos un objetivo.');
      return;
    }
    if (opcionesSeleccionadas.length > 3) {
      alert('Selecciona hasta 3 objetivos.');
      return;
    }

    localStorage.setItem('nombreUsuario', nombreUsuario);
    localStorage.setItem('objetivos', JSON.stringify(opcionesSeleccionadas));

    generarQR();

    document.getElementById('inicio').classList.remove('active');
    document.getElementById('appContent').classList.add('active');
    actualizarBienvenida();
    cargarAvances();
    cargarAlimentosPreferidos();
    cargarAguaTomada();
    cargarEstres();
  }

  function actualizarBienvenida() {
    const nombre = localStorage.getItem('nombreUsuario') || '';
    const objetivos = JSON.parse(localStorage.getItem('objetivos') || '[]');

    document.getElementById('nombreMostrado').textContent = nombre;
    if (objetivos.length > 0) {
      document.getElementById('objetivosMostrados').textContent = 'Tus objetivos actuales son: ' + objetivos.join(', ') + '.';
    } else {
      document.getElementById('objetivosMostrados').textContent = '';
    }
    document.getElementById('bienvenidaHeader').textContent = `Hola ${nombre}, optimiza tu nutrición y rendimiento.`;
  }

  window.onload = () => {
    const nombreGuardado = localStorage.getItem('nombreUsuario');
    if(nombreGuardado){
      document.getElementById('inicio').classList.remove('active');
      document.getElementById('appContent').classList.add('active');
      actualizarBienvenida();
      cargarAvances();
      cargarAlimentosPreferidos();
      cargarAguaTomada();
      cargarEstres();
      generarQR();
    } else {
      generarQR();
    }
  };

  function calcularCalorias(event) {
    event.preventDefault();

    const edad = parseInt(document.getElementById('edad').value, 10);
    const peso = parseFloat(document.getElementById('peso').value);
    const altura = parseInt(document.getElementById('altura').value, 10);
    const genero = document.getElementById('genero').value;
    const actividad = parseFloat(document.getElementById('actividad').value);

    if (!(edad >= 12 && edad <= 19)) {
      alert('La edad debe estar entre 12 y 19 años.');
      return;
    }

    let bmr;
    if (genero === 'male') {
      bmr = 88.362 + (13.397 * peso) + (4.799 * altura) - (5.677 * edad);
    } else if (genero === 'female') {
      bmr = 447.593 + (9.247 * peso) + (3.098 * altura) - (4.330 * edad);
    } else {
      alert('Selecciona un género válido.');
      return;
    }

    const tdee = Math.round(bmr * actividad);

    const resultado = document.getElementById('resultadoCalorias');
    resultado.textContent = `Tu estimación diaria de calorías para mantener un alto rendimiento es: ${tdee} kcal`;

    localStorage.setItem('caloriasEstimadas', tdee);

    mostrarRecomendacionAgua(peso, actividad);
    if(localStorage.getItem('alimentosGustos')){
      actualizarPlanPersonalizado();
    }
  }

  function mostrarRecomendacionAgua(peso, actividad){
    // Recomendación diaria de agua en ml:
    // Regla sencilla: 35 ml por kg peso + 500 ml extra si actividad alta o muy alta
    let base = peso * 35; // ml
    base += actividad >= 1.725 ? 500 : 0; // ml adicionales para nivel alto

    const litros = (base / 1000).toFixed(2);
    document.getElementById('aguaRecomendada').textContent = `Basándonos en tu peso y actividad, te recomendamos beber aprox. ${litros} litros de agua al día.`;
  }

  function registrarAguaTomada(event){
    event.preventDefault();

    const fecha = new Date().toISOString().split('T')[0];
    const mlTomados = parseInt(document.getElementById('aguaTomada').value, 10);

    if(mlTomados <= 0){
      alert('Ingresa una cantidad válida de agua en ml.');
      return;
    }

    let historial = JSON.parse(localStorage.getItem('aguaTomadaHistorial') || '[]');

    // Si ya hay dato para hoy, sumar
    const indexHoy = historial.findIndex(item => item.fecha === fecha);
    if(indexHoy >= 0){
      historial[indexHoy].ml += mlTomados;
    } else {
      historial.push({fecha: fecha, ml: mlTomados});
    }

    localStorage.setItem('aguaTomadaHistorial', JSON.stringify(historial));
    cargarAguaTomada();
    document.getElementById('aguaTomadaForm').reset();
  }

  function cargarAguaTomada(){
    const lista = document.getElementById('listaAguaTomada');
    lista.innerHTML = '';
    const historial = JSON.parse(localStorage.getItem('aguaTomadaHistorial') || '[]');
    if(historial.length === 0){
      lista.innerHTML = '<li>No has registrado consumo de agua aún.</li>';
      document.getElementById('aguaTomadaResultado').textContent = '';
      return;
    }
    // Mostrar del más reciente al antiguo
    historial.sort((a,b) => new Date(b.fecha) - new Date(a.fecha));
    historial.forEach(item => {
      const li = document.createElement('li');
      const fechaStr = new Date(item.fecha).toLocaleDateString('es-ES', { year:'numeric', month:'short', day:'numeric' });
      li.textContent = `${fechaStr}: ${item.ml} ml de agua`;
      lista.appendChild(li);
    });

    // Mostrar cantidad hoy
    const hoy = new Date().toISOString().split('T')[0];
    const hoyRegistro = historial.find(item => item.fecha === hoy);
    if(hoyRegistro){
      document.getElementById('aguaTomadaResultado').textContent =
        `Hoy has tomado ${hoyRegistro.ml} ml de agua. ¡Sigue hidratado!`;
    } else {
      document.getElementById('aguaTomadaResultado').textContent = 'Aún no has registrado agua hoy.';
    }
  }

  function calcularIMC(event) {
    event.preventDefault();

    const peso = parseFloat(document.getElementById('pesoIMC').value);
    const alturaCm = parseInt(document.getElementById('alturaIMC').value, 10);

    if (!(peso > 0 && alturaCm > 0)) {
      alert('Peso y altura deben ser números positivos.');
      return;
    }

    const alturaM = alturaCm / 100;
    const imc = peso / (alturaM * alturaM);
    const imcRedondeado = imc.toFixed(1);

    let interpretacion = '';

    if (imc < 18.5) {
      interpretacion = 'Peso bajo: Es importante asegurar una nutrición adecuada para un buen desarrollo.';
    } else if (imc < 24.9) {
      interpretacion = 'Peso normal saludable.';
    } else if (imc < 29.9) {
      interpretacion = 'Sobrepeso: Se recomienda ajustar la alimentación y actividad física.';
    } else {
      interpretacion = 'Obesidad: Consulta a un especialista para un plan personalizado.';
    }

    const resultadoIMC = document.getElementById('resultadoIMC');
    resultadoIMC.textContent = `Tu IMC es ${imcRedondeado}. ${interpretacion}`;
  }

  function agregarAvance(event) {
    event.preventDefault();

    const fecha = document.getElementById('fechaAvance').value;
    const peso = parseFloat(document.getElementById('pesoAvance').value);
    const comentarios = document.getElementById('comentariosAvance').value.trim();

    if (!fecha) {
      alert('Selecciona una fecha válida.');
      return;
    }
    if (!(peso > 0)) {
      alert('Ingresa un peso válido.');
      return;
    }

    const avance = { fecha, peso, comentarios };
    let avances = JSON.parse(localStorage.getItem('avances')) || [];

    avances.push(avance);
    avances.sort((a,b) => new Date(b.fecha) - new Date(a.fecha));

    localStorage.setItem('avances', JSON.stringify(avances));
    cargarAvances();

    document.getElementById('seguimientoForm').reset();
    document.getElementById('fechaAvance').max = new Date().toISOString().split('T')[0];
  }

  function cargarAvances() {
    const lista = document.getElementById('listaAvances');
    lista.innerHTML = '';
    let avances = JSON.parse(localStorage.getItem('avances')) || [];
    if(avances.length === 0){
      lista.innerHTML = '<li>No tienes avances guardados aún.</li>';
      return;
    }
    avances.forEach(a => {
      const li = document.createElement('li');
      const fechaStr = new Date(a.fecha).toLocaleDateString('es-ES', { year:'numeric', month:'short', day:'numeric' });
      li.textContent = `${fechaStr}: Peso ${a.peso} kg` + (a.comentarios ? `, Nota: ${a.comentarios}` : '');
      lista.appendChild(li);
    });
  }

  function actualizarPlanPersonalizado(event){
    if(event) event.preventDefault();
    const select = document.getElementById('alimentosGustos');
    let seleccionados = [];
    if(select){
      seleccionados = Array.from(select.selectedOptions).map(option => option.value);
      if (seleccionados.length < 3) {
        alert('Por favor selecciona al menos 3 alimentos que te gusten para generar un plan personalizado.');
        return;
      }
      localStorage.setItem('alimentosGustos', JSON.stringify(seleccionados));
    } else {
      seleccionados = JSON.parse(localStorage.getItem('alimentosGustos') || '[]');
    }

    let calorias = parseInt(localStorage.getItem('caloriasEstimadas'));
    if(!calorias || isNaN(calorias)){
      calorias = 2500;
    }

    const caloriasDesayuno = Math.round(calorias * 0.30);
    const caloriasAlmuerzo = Math.round(calorias * 0.35);
    const caloriasCena = Math.round(calorias * 0.25);
    const caloriasSnacks = calorias - (caloriasDesayuno + caloriasAlmuerzo + caloriasCena);

    function comidaRandom(comidasArray, numItems) {
      const shuffled = comidasArray.slice().sort(() => 0.5 - Math.random());
      return shuffled.slice(0, Math.min(numItems, shuffled.length));
    }

    const desayuno = comidaRandom(seleccionados, 3);
    const almuerzo = comidaRandom(seleccionados.filter(x => !desayuno.includes(x)), 3);
    const cena = comidaRandom(seleccionados.filter(x => !desayuno.includes(x) && !almuerzo.includes(x)), 2);
    const snacks = comidaRandom(seleccionados.filter(x => !desayuno.includes(x) && !almuerzo.includes(x) && !cena.includes(x)), 2);

    let planTexto = `Plan de alimentación personalizado según tus ${calorias} kcal estimadas:\n\n`;
    planTexto += `Desayuno (~${caloriasDesayuno} kcal): ${desayuno.length > 0 ? desayuno.join(', ') : 'Selecciona más alimentos'}.\n`;
    planTexto += `Almuerzo (~${caloriasAlmuerzo} kcal): ${almuerzo.length > 0 ? almuerzo.join(', ') : 'Selecciona más alimentos'}.\n`;
    planTexto += `Cena (~${caloriasCena} kcal): ${cena.length > 0 ? cena.join(', ') : 'Selecciona más alimentos'}.\n`;
    planTexto += `Snacks (~${caloriasSnacks} kcal): ${snacks.length > 0 ? snacks.join(', ') : 'Selecciona más alimentos'}.\n`;
    planTexto += `\nRecuerda equilibrar las porciones y consultar con un especialista para un plan detallado.`;

    document.getElementById('planPersonalizadoResultado').textContent = planTexto;
  }

  function cargarAlimentosPreferidos(){
    const almacenados = JSON.parse(localStorage.getItem('alimentosGustos') || '[]');
    const select = document.getElementById('alimentosGustos');
    if(!select) return;
    for(let option of select.options){
      option.selected = almacenados.includes(option.value);
    }
  }

  function agregarEstres(event){
    event.preventDefault();

    const fecha = document.getElementById('fechaEstres').value;
    const nivel = parseInt(document.getElementById('nivelEstres').value, 10);
    const comentarios = document.getElementById('comentariosEstres').value.trim();

    if(!fecha){
      alert('Selecciona una fecha válida.');
      return;
    }
    if(!(nivel >= 1 && nivel <= 5)){
      alert('Selecciona un nivel de estrés válido.');
      return;
    }

    const estresEntry = { fecha, nivel, comentarios };
    let estresData = JSON.parse(localStorage.getItem('estres')) || [];
    estresData.push(estresEntry);
    estresData.sort((a,b) => new Date(b.fecha) - new Date(a.fecha));
    localStorage.setItem('estres', JSON.stringify(estresData));
    cargarEstres();

    document.getElementById('estresForm').reset();
    document.getElementById('fechaEstres').max = new Date().toISOString().split('T')[0];
  }

  function cargarEstres(){
    const lista = document.getElementById('listaEstres');
    lista.innerHTML = '';
    let estresData = JSON.parse(localStorage.getItem('estres')) || [];
    if(estresData.length === 0){
      lista.innerHTML = '<li>No has registrado niveles de estrés aún.</li>';
      document.getElementById('estresResultado').textContent = '';
      return;
    }
    estresData.forEach(entry => {
      const li = document.createElement('li');
      const fechaStr = new Date(entry.fecha).toLocaleDateString('es-ES', { year:'numeric', month:'short', day:'numeric' });
      li.textContent = `${fechaStr}: Nivel ${entry.nivel}` + (entry.comentarios ? `, Nota: ${entry.comentarios}` : '');
      lista.appendChild(li);
    });
  }

  function generarQR(){
    const contenedorQR = document.getElementById('qrCodeContainer');
    contenedorQR.innerHTML = '';

    let url = window.location.href;
    if(url.startsWith('file://')){
      const p = document.createElement('p');
      p.textContent = 'Guarda este archivo HTML y ábrelo en tu navegador para usar la aplicación.';
      contenedorQR.appendChild(p);
      return;
    }

    QRCode.toCanvas(url, {width:160, margin:2, color: {dark:"#2469D6", light:"#f2f6fc"}}, function (error, canvas) {
      if (error) {
        console.error(error);
        contenedorQR.innerHTML = '<p>Error al generar código QR.</p>';
        return;
      }
      contenedorQR.appendChild(canvas);
      const p = document.createElement('p');
      p.textContent = 'Escanea este código QR para abrir la aplicación en otro dispositivo';
      contenedorQR.appendChild(p);
    });
  }
</script>
</body>
</html>


ionic serve 
title: Getting Started
description: Communicate between JavaScript and Native Swift or Objective-C code
slug: /ios
contributors:
  - dotNetkow
  - mlynch
---

# Capacitor iOS Documentation

Capacitor features a native iOS runtime that enables developers to communicate between JavaScript and Native Swift or Objective-C code.

Capacitor iOS apps are configured and managed with Xcode and [CocoaPods](https://cocoapods.org/).

## iOS Support

iOS 14+ is supported. Xcode 16.0+ is required (see [Environment Setup](/main/getting-started/environment-setup.md#ios-requirements)). Capacitor uses [WKWebView](https://developer.apple.com/documentation/webkit/wkwebview), not the deprecated [UIWebView](https://developer.apple.com/documentation/uikit/uiwebview).

## Adding the iOS Platform

First, install the `@capacitor/ios` package.

```bash
npm install @capacitor/ios
```

Then, add the iOS platform.

```bash
npx cap add ios
```

## Opening the iOS Project

To open the project in Xcode, run:

```bash
npx cap open ios
```

Alternatively, you can open Xcode manually by running:

```bash
open ios/App/App.xcworkspace
```

## Running Your App

You can either run your app on the command-line or with Xcode.

### Running on the Command-Line

To run the project on a device or simulator, run:

```bash
npx cap run ios
```

The command will prompt you to select a target. [Learn more about `run`](/cli/commands/run.md).

### Running in Xcode

In Xcode, first select the device or simulator and then click the play button to run your app.

![Running your app](../../../static/img/v6/docs/ios/running.png)

## Troubleshooting

If you encountered any issues while getting started, you can consult the [iOS Troubleshooting Guide](/main/ios/troubleshooting.md). Feel free to [open a discussion](https://github.com/ionic-team/capacitor/discussions/) if you need help.

## Next steps

You are now ready to continue developing and building your app. Use the various APIs available, Capacitor or Cordova plugins, or custom native code to build out the rest of your app.

## Further Reading

Follow these guides for more information on each topic:

[Configuring and setting permissions for iOS &#8250;](/main/ios/configuration.md)

[Building Native Plugins for iOS &#8250;](/plugins/creating-plugins/ios-guide.md)
