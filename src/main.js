import "./styles.css";
import {
  audience,
  buildSteps,
  event,
  faq,
  heroes,
  included,
  mappSteps,
  notAudience,
  objections,
  orderBumps,
} from "./content.js";

const app = document.querySelector("#app");
const path = window.location.pathname.replace(/\/+$/, "") || "/";
const publicRoutes = ["/a1", "/a2", "/a3", "/obrigado"];
const resolvedPath = publicRoutes.includes(path) ? path : "/a1";

const icon = (name) => {
  const icons = {
    arrow:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    check:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12 4 4L19 6"/></svg>',
    clock:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8"/><path d="M12 8v5l3 2"/></svg>',
    calendar:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="5" width="16" height="15" rx="2"/><path d="M8 3v4M16 3v4M4 10h16"/></svg>',
  };
  return icons[name];
};

const list = (items, className = "plain-list") => `
  <ul class="${className}">
    ${items
      .map(
        (item) => `<li><span class="list-icon">${icon("check")}</span><span>${item}</span></li>`,
      )
      .join("")}
  </ul>
`;

const cta = (label, className = "button button-primary") => `
  <a class="${className}" href="#ingresso">
    <span>${label}</span>${icon("arrow")}
  </a>
`;

const operationalMap = () => `
  <div class="operational-map motion-region" aria-label="Primeiro desenho operacional">
    <div class="map-title">da dependência à autonomia</div>
    <svg class="map-line" viewBox="0 0 520 300" aria-hidden="true">
      <path class="map-path map-path-base" d="M58 252 C120 230 112 158 190 156 S276 220 326 136 S400 42 466 58" />
      <path class="map-path map-path-flow" d="M58 252 C120 230 112 158 190 156 S276 220 326 136 S400 42 466 58" />
    </svg>
    <div class="map-node node-one"><span>01</span>Recorrência</div>
    <div class="map-node node-two"><span>02</span>Responsável</div>
    <div class="map-node node-three"><span>03</span>Padrão mínimo</div>
    <div class="map-node node-four"><span>04</span>Limite de decisão</div>
    <div class="map-node node-five"><span>05</span>Acompanhamento</div>
  </div>
`;

const countdown = () => `
  <div class="countdown" data-countdown aria-label="Contagem regressiva para o workshop">
    <div><strong data-days>00</strong><span>Dias</span></div>
    <div><strong data-hours>00</strong><span>Horas</span></div>
    <div><strong data-minutes>00</strong><span>Min</span></div>
    <div><strong data-seconds>00</strong><span>Seg</span></div>
  </div>
`;

const renderThankYou = () => {
  document.title = `Inscrição confirmada | ${event.name}`;
  app.innerHTML = `
    <main class="thank-you" id="conteudo">
      <a class="brand" href="/a1" aria-label="A Primeira Dependência">
        <span class="brand-symbol">M</span>
        <span>A Primeira Dependência</span>
      </a>
      <div class="confirmation-mark">${icon("check")}</div>
      <p class="eyebrow">A PRIMEIRA DEPENDÊNCIA</p>
      <h1>Inscrição confirmada.</h1>
      <div class="event-card event-card-center">
        <div>${icon("calendar")}<span>${event.dateLong}</span></div>
        <div>${icon("clock")}<span>${event.duration}</span></div>
      </div>
    </main>
  `;
};

const renderSalesPage = (route) => {
  const hero = heroes[route];
  document.title = `${hero.title} | ${event.name}`;
  app.innerHTML = `
    <header class="site-header">
      <a class="brand" href="/a1" aria-label="A Primeira Dependência">
        <span class="brand-symbol">M</span>
        <span>A Primeira Dependência</span>
      </a>
      <a class="header-cta" href="#ingresso">R$ 197 ${icon("arrow")}</a>
    </header>

    <main id="conteudo">
      <section class="hero section-dark">
        <div class="hero-glow glow-one"></div>
        <div class="hero-glow glow-two"></div>
        <div class="shell hero-grid">
          <div class="hero-copy">
            <p class="eyebrow hero-enter">${hero.kicker}</p>
            <h1 class="hero-enter">${hero.title}</h1>
            <p class="hero-lead hero-enter">${hero.lead}</p>
            ${hero.context
              .map((paragraph) => `<p class="hero-context hero-enter">${paragraph}</p>`)
              .join("")}
            <div class="event-strip hero-enter">
              <span>${icon("calendar")} ${event.dateLong}</span>
              <span>${icon("clock")} ${event.duration} em sala virtual</span>
            </div>
            <div class="hero-actions hero-enter">
              ${cta(hero.cta)}
              <span class="price-note">ingresso: R$ 197</span>
            </div>
          </div>
          <div class="hero-visual hero-enter">
            ${operationalMap()}
          </div>
        </div>
      </section>

      <section class="event-bar" aria-label="Informações do workshop">
        <div class="shell event-bar-grid">
          <div>
            <span class="event-bar-label">Workshop ao vivo</span>
            <strong>A Primeira Dependência</strong>
          </div>
          <div><span>07 de outubro de 2026, às 9h</span><span>2h30 em sala virtual</span></div>
          ${countdown()}
        </div>
      </section>

      <section class="section section-problem reveal">
        <div class="shell problem-grid">
          <div class="section-heading sticky-copy">
            <p class="eyebrow">UMA RECORRÊNCIA REAL</p>
            <h2>Você já tem equipe. Mesmo assim, tudo ainda passa por você?</h2>
          </div>
          <div class="problem-copy">
            <p>A loja funciona, as pessoas trabalham e as rotinas acontecem. Mas basta surgir uma dúvida fora do padrão, uma decisão um pouco diferente, um erro recorrente ou uma cobrança importante para o assunto voltar à sua mesa.</p>
            <p class="cadence">Você responde.<br />Resolve.<br />Corrige.<br />Explica de novo.</p>
            <p>E a operação segue — até a mesma situação reaparecer.</p>
            <p>O problema não é simplesmente “falta de processo”. Também não significa que sua equipe não queira assumir responsabilidade. Muitas vezes, o que falta é transformar uma recorrência em uma estrutura clara: quem responde por ela, qual é o padrão mínimo, até onde a pessoa pode decidir e como acompanhar se aquilo está funcionando.</p>
            <p class="emphasis-line">É exatamente esse primeiro passo que vamos construir no workshop A Primeira Dependência.</p>
          </div>
        </div>
      </section>

      <section class="section section-paper reveal">
        <div class="shell start-grid">
          <div class="large-number" aria-hidden="true">01</div>
          <div>
            <p class="eyebrow">COMEÇAR POR UMA DEPENDÊNCIA</p>
            <h2>Você não precisa organizar a empresa inteira de uma vez</h2>
            <p>Tentar resolver tudo ao mesmo tempo costuma produzir listas longas, documentos que ninguém consulta e uma sensação de que a operação é complexa demais para começar. Neste workshop, o caminho é o oposto: escolher uma recorrência real, trabalhar nela ao vivo e sair com uma estrutura mínima que possa ser colocada em uso.</p>
            <div class="logic-note">
              <strong>A lógica do workshop</strong>
              <p>Começar pequeno não significa pensar pequeno. Significa escolher uma dependência concreta e usá-la para aprender a lógica que depois pode ser aplicada às demais.</p>
            </div>
          </div>
        </div>
      </section>

      <section class="section section-build reveal">
        <div class="shell">
          <div class="section-heading narrow">
            <p class="eyebrow">UMA FICHA PREENCHIDA</p>
            <h2>O que você vai construir durante a sessão</h2>
          </div>
          <ol class="build-grid">
            ${buildSteps
              .map(
                (step, index) => `<li style="--step:${index}"><span>${String(index + 1).padStart(2, "0")}</span><p>${step}</p></li>`,
              )
              .join("")}
          </ol>
          <p class="section-close">Ao final, você terá uma prioridade escolhida e uma ficha preenchida com o primeiro desenho operacional para reduzir a dependência daquela recorrência.</p>
        </div>
      </section>

      <section class="section section-live section-dark reveal">
        <div class="shell live-grid">
          <div class="live-orbit" aria-hidden="true"><span></span><span></span><span></span></div>
          <div>
            <p class="eyebrow">CONSTRUÇÃO GUIADA</p>
            <h2>Não é uma aula para assistir passivamente</h2>
            <p>Você entra com uma situação real da sua operação. Felipe demonstra como uma recorrência pode ser desmontada em partes claras e conduz o diagnóstico para que você aplique a mesma lógica no seu contexto.</p>
            <p>A proposta não é sair com mais teoria sobre gestão. É sair sabendo por onde começar e com uma primeira estrutura feita.</p>
          </div>
        </div>
      </section>

      <section class="section reveal">
        <div class="shell split-editorial">
          <div>
            <p class="eyebrow">TAREFA E DECISÃO</p>
            <h2>Por que “delegar” muitas vezes não resolve sozinho</h2>
          </div>
          <div>
            <p>É possível delegar uma tarefa e continuar centralizando a decisão. A pessoa executa, mas volta para perguntar qual opção escolher, o que fazer quando algo foge do padrão ou até onde pode agir sem autorização.</p>
            <p>Quando responsável, critério e limite não estão claros, a responsabilidade continua presa à liderança. O trabalho muda de mão; a decisão não.</p>
            <p>Por isso, o workshop não termina em “passe essa tarefa para alguém”. O desenho precisa incluir decisão, padrão e acompanhamento para que a recorrência tenha condições de seguir sem depender de uma resposta sua a cada repetição.</p>
          </div>
        </div>
      </section>

      <section class="section section-mapp reveal">
        <div class="shell">
          <div class="section-heading mapp-heading">
            <p class="eyebrow">MAPEAMENTO E ALINHAMENTO DE PESSOAS E PROCESSOS</p>
            <h2>O mecanismo: da dependência à autonomia com a lógica MAPP</h2>
            <p>MAPP significa Mapeamento e Alinhamento de Pessoas e Processos. A lógica começa localizando uma dependência real da operação e transforma essa recorrência em uma estrutura que as pessoas conseguem compreender, executar e acompanhar.</p>
          </div>
          <ol class="mapp-route">
            ${mappSteps
              .map((step, index) => {
                const [title, ...body] = step.split(":");
                return `<li><span class="route-marker">${String(index + 1).padStart(2, "0")}</span><div><strong>${title}</strong><p>${body.join(":").trim()}</p></div></li>`;
              })
              .join("")}
          </ol>
          <p class="section-close">No workshop, você trabalha o primeiro trecho dessa rota sobre uma recorrência específica. O objetivo é tornar o primeiro passo concreto antes de tentar organizar um conjunto maior de dependências.</p>
        </div>
      </section>

      <section class="section section-audience reveal">
        <div class="shell audience-grid">
          <article class="audience-card audience-yes">
            <p class="eyebrow">FAZ SENTIDO</p>
            <h2>Para quem este workshop faz sentido</h2>
            ${list(audience)}
          </article>
          <article class="audience-card audience-no">
            <p class="eyebrow">NÃO É</p>
            <h3>Para quem não é</h3>
            ${list(notAudience)}
          </article>
        </div>
      </section>

      <section class="section section-authority section-dark reveal">
        <div class="shell authority-grid">
          <div class="authority-numbers" aria-label="Experiência registrada">
            <div><strong>10+</strong><span>anos no varejo</span></div>
            <div><strong>7</strong><span>lojas</span></div>
            <div><strong>200+</strong><span>colaboradores e líderes</span></div>
            <div><strong>3</strong><span>empresas</span></div>
          </div>
          <div>
            <p class="eyebrow">EXPERIÊNCIA NA OPERAÇÃO</p>
            <h2>Sobre Felipe</h2>
            <p>Felipe traz uma trajetória de mais de 10 anos no varejo. O material do projeto registra passagem pela gestão de sete lojas e trabalho com mais de 200 colaboradores e líderes em três empresas. Essa experiência é usada no workshop para aproximar o método da rotina real de operação, liderança e execução.</p>
            <p>A autoridade aqui não depende de promessas de resultado nem de depoimentos fabricados. Ela aparece na demonstração do método, nos materiais de trabalho e na aplicação do raciocínio sobre uma dependência concreta.</p>
          </div>
        </div>
      </section>

      <section class="section section-offer reveal" id="ingresso" tabindex="-1">
        <div class="shell offer-grid">
          <div class="offer-copy">
            <p class="eyebrow">INGRESSO AO VIVO</p>
            <h2>O que está incluído no ingresso</h2>
            ${list(included)}
          </div>
          <aside class="ticket-card">
            <div class="ticket-top"><span>A Primeira Dependência</span><span>AO VIVO</span></div>
            <div class="ticket-body">
              <span class="ticket-label">Investimento</span>
              <strong>R$ 197</strong>
              <p>sessão ao vivo em 07 de outubro de 2026, às 9h</p>
              ${cta("GARANTIR MEU INGRESSO PARA 07/10", "button button-primary button-full")}
            </div>
          </aside>
        </div>

        <div class="shell lotes-wrap">
          <div class="section-heading narrow">
            <p class="eyebrow">LOTES</p>
            <h3>Três etapas de ingresso</h3>
          </div>
          <div class="lotes-grid" role="list" aria-label="Comparação de lotes">
            <article class="lote-card is-closed" role="listitem"><span>Lote 1</span><strong>R$ 29,90</strong><small>Encerrado</small></article>
            <article class="lote-card is-closed" role="listitem"><span>Lote 2</span><strong>R$ 79,90</strong><small>Encerrado</small></article>
            <article class="lote-card is-current" role="listitem"><span>Lote 3</span><strong>R$ 197</strong><small>Atual</small></article>
          </div>
        </div>
      </section>

      <section class="section section-bumps reveal">
        <div class="shell">
          <div class="section-heading">
            <p class="eyebrow">RECURSOS COMPLEMENTARES</p>
            <h2>Complementos opcionais no checkout</h2>
            <p>Se você quiser ampliar a aplicação, poderá adicionar recursos complementares à compra. Eles não substituem o conteúdo necessário para cumprir a promessa do workshop.</p>
          </div>
          <div class="bumps-grid">
            ${orderBumps
              .map(
                (item, index) => `<article><span>${String(index + 1).padStart(2, "0")}</span><h3>${item.title}</h3><p>${item.body}</p></article>`,
              )
              .join("")}
          </div>
        </div>
      </section>

      <section class="section section-route reveal">
        <div class="shell route-grid">
          <div class="route-graphic" aria-hidden="true"><span></span><span></span><span></span><span></span></div>
          <div>
            <p class="eyebrow">ROTA MAPP</p>
            <h2>O primeiro desenho não é o fim da rota</h2>
            <p>Uma recorrência organizada mostra o caminho. Mas uma operação pode ter várias dependências ligadas a pessoas, conhecimento, decisões, padrões, rotinas e indicadores.</p>
            <p>Durante o workshop, Felipe apresenta como a Rota MAPP da Dependência à Autonomia amplia essa lógica para um conjunto prioritário de dependências ao longo de 8 semanas. O programa de escala é uma etapa separada, oferecida para quem quiser continuar a implantação com o método completo.</p>
            <p>A compra do workshop não obriga a entrada no programa de escala.</p>
          </div>
        </div>
      </section>

      <section class="section section-objections section-paper reveal">
        <div class="shell">
          <div class="objections-list">
            ${objections
              .map(
                (item, index) => `<article><span>${String(index + 1).padStart(2, "0")}</span><div><h2>${item.title}</h2><p>${item.body}</p></div></article>`,
              )
              .join("")}
          </div>
        </div>
      </section>

      <section class="section section-faq reveal">
        <div class="shell faq-grid">
          <div class="section-heading sticky-copy">
            <p class="eyebrow">ANTES DO WORKSHOP</p>
            <h2>Perguntas frequentes</h2>
          </div>
          <div class="faq-list">
            ${faq
              .map(
                (item, index) => `<details${index === 0 ? " open" : ""}><summary><span>${item.question}</span><i aria-hidden="true"></i></summary><p>${item.answer}</p></details>`,
              )
              .join("")}
          </div>
        </div>
      </section>

      <section class="section final-cta section-dark reveal">
        <div class="shell final-grid">
          <div>
            <p class="eyebrow">07/10/2026 · 9H · AO VIVO</p>
            <h2>Comece pela recorrência que mais volta para você</h2>
            <p>Você não precisa resolver a operação inteira em uma manhã. Precisa escolher um ponto real de dependência e construir clareza suficiente para que ele deixe de depender apenas de uma resposta sua toda vez que se repete.</p>
          </div>
          <div class="final-card">
            <span>A Primeira Dependência</span>
            <strong>R$ 197</strong>
            <p>07/10/2026 · 9h · ao vivo · 2h30</p>
            ${cta("QUERO PARTICIPAR DO WORKSHOP", "button button-light button-full")}
          </div>
        </div>
      </section>
    </main>

    <footer class="site-footer">
      <div class="shell"><span>A Primeira Dependência</span><span>07 de outubro de 2026 · 9h</span></div>
    </footer>
  `;

  setupCountdown();
  setupMotion();
};

function setupCountdown() {
  const target = new Date(event.dateIso).getTime();
  const fields = {
    days: document.querySelector("[data-days]"),
    hours: document.querySelector("[data-hours]"),
    minutes: document.querySelector("[data-minutes]"),
    seconds: document.querySelector("[data-seconds]"),
  };
  if (!fields.days) return;

  const update = () => {
    const distance = Math.max(0, target - Date.now());
    const day = 86_400_000;
    const hour = 3_600_000;
    const minute = 60_000;
    fields.days.textContent = String(Math.floor(distance / day)).padStart(2, "0");
    fields.hours.textContent = String(Math.floor((distance % day) / hour)).padStart(2, "0");
    fields.minutes.textContent = String(Math.floor((distance % hour) / minute)).padStart(2, "0");
    fields.seconds.textContent = String(Math.floor((distance % minute) / 1000)).padStart(2, "0");
  };
  update();
  window.setInterval(update, 1000);
}

function setupMotion() {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const revealItems = document.querySelectorAll(".reveal");
  const motionRegions = document.querySelectorAll(".motion-region");
  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
    motionRegions.forEach((item) => item.classList.add("is-running"));
    return;
  }

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12 },
  );
  revealItems.forEach((item) => revealObserver.observe(item));

  const motionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => entry.target.classList.toggle("is-running", entry.isIntersecting));
    },
    { threshold: 0.2 },
  );
  motionRegions.forEach((item) => motionObserver.observe(item));
}

if (resolvedPath === "/obrigado") {
  renderThankYou();
} else {
  const route = resolvedPath.split("/").filter(Boolean)[0];
  renderSalesPage(route);
}
