const steps = document.querySelectorAll(".step");
const vizTitle = document.getElementById("viz-title");
const vizBody = document.getElementById("viz-body");
const vizLabel = document.getElementById("viz-label");
const vizGrid = document.getElementById("viz-grid");
const vizLegend = document.getElementById("viz-legend");
const heroCardList = document.querySelector(".hero__card ul");

const scenes = [
  {
    label: "Grant Types",
    title: "Restricted Stock Units (RSUs)",
    body:
      "RSUs are company shares that settle into your account as they vest. No strike prices, and the value is clear on each vest date.",
    grid: { active: 18, color: "rsu" },
    legend: [
      { label: "RSUs", class: "rsu" },
      { label: "Options", class: "options" },
      { label: "Performance", class: "performance" },
    ],
    card: [
      "<strong>Program:</strong> Time-based RSUs",
      "<strong>Vesting:</strong> 1-year cliff, monthly thereafter",
      "<strong>Refresh:</strong> Annual performance cycle",
      "<strong>Tax:</strong> Ordinary income at vest",
    ],
  },
  {
    label: "Vesting",
    title: "Front-loaded vs steady vesting",
    body:
      "Front-loaded vesting (e.g., 40/20/20/20) helps new joiners realize value early. Straight-line vesting provides steady predictability.",
    grid: { active: 12, color: "rsu" },
    legend: [
      { label: "Front-loaded", class: "rsu" },
      { label: "Straight-line", class: "options" },
    ],
    card: [
      "<strong>Program:</strong> RSUs with front-loaded curve",
      "<strong>Vesting:</strong> 40% first year, then 20/20/20",
      "<strong>Refresh:</strong> Begins at first anniversary",
      "<strong>Tax:</strong> Withholding applied at each vest",
    ],
  },
  {
    label: "Refresh",
    title: "Refresh grants keep equity alive",
    body:
      "Annual refreshes based on performance maintain momentum. Spot grants for promotions or retention avoid equity cliffs.",
    grid: { active: 10, color: "performance" },
    legend: [
      { label: "Base grant", class: "rsu" },
      { label: "Refresh", class: "performance" },
    ],
    card: [
      "<strong>Program:</strong> RSUs + annual refresh",
      "<strong>Vesting:</strong> 25/25/25/25 on refreshes",
      "<strong>Refresh:</strong> Calibrated to performance bands",
      "<strong>Tax:</strong> Standard withholding at vest",
    ],
  },
  {
    label: "Tax & Liquidity",
    title: "Plan for taxes and trading windows",
    body:
      "RSUs trigger income at vest, while options involve strike prices and exercise windows. Clear blackout calendars reduce surprises.",
    grid: { active: 8, color: "options" },
    legend: [
      { label: "RSU vest", class: "rsu" },
      { label: "Exercise window", class: "options" },
    ],
    card: [
      "<strong>Program:</strong> RSUs plus legacy options",
      "<strong>Vesting:</strong> Monthly after 1-year cliff",
      "<strong>Refresh:</strong> Annual; spot grants allowed",
      "<strong>Tax:</strong> Coordinate with blackout periods",
    ],
  },
  {
    label: "Communication",
    title: "Narratives make equity tangible",
    body:
      "Pair numbers with stories. Show modeled outcomes at different stock prices and clarify what happens during promotions or market swings.",
    grid: { active: 16, color: "rsu" },
    legend: [
      { label: "Modeled value", class: "rsu" },
      { label: "Downside scenario", class: "options" },
      { label: "Upside scenario", class: "performance" },
    ],
    card: [
      "<strong>Program:</strong> Story-first equity brief",
      "<strong>Vesting:</strong> Clear visualization by year",
      "<strong>Refresh:</strong> Scenario modeling included",
      "<strong>Tax:</strong> FAQs and guidance links",
    ],
  },
];

function buildGrid() {
  vizGrid.innerHTML = "";
  for (let i = 0; i < 24; i++) {
    const cell = document.createElement("div");
    cell.classList.add("viz-cell");
    vizGrid.appendChild(cell);
  }
}

function updateScene(index) {
  const scene = scenes[index];
  if (!scene) return;

  vizLabel.textContent = scene.label;
  vizTitle.textContent = scene.title;
  vizBody.textContent = scene.body;

  const cells = vizGrid.querySelectorAll(".viz-cell");
  cells.forEach((cell, i) => {
    cell.className = "viz-cell";
    if (i < scene.grid.active) {
      cell.classList.add("viz-cell--active", scene.grid.color);
    }
  });

  vizLegend.innerHTML = "";
  scene.legend.forEach((item) => {
    const span = document.createElement("span");
    const dot = document.createElement("span");
    dot.className = `dot ${item.class}`;
    span.appendChild(dot);
    span.insertAdjacentText("beforeend", item.label);
    vizLegend.appendChild(span);
  });

  heroCardList.innerHTML = "";
  scene.card.forEach((entry) => {
    const li = document.createElement("li");
    li.innerHTML = entry;
    heroCardList.appendChild(li);
  });

  steps.forEach((step) => step.classList.remove("is-active"));
  const current = steps[index];
  if (current) current.classList.add("is-active");
}

function setupObserver() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = Number(entry.target.dataset.step);
          updateScene(index);
        }
      });
    },
    {
      rootMargin: "-40% 0px -40% 0px",
      threshold: 0.3,
    }
  );

  steps.forEach((step) => observer.observe(step));
}

document.addEventListener("DOMContentLoaded", () => {
  buildGrid();
  updateScene(0);
  setupObserver();
});
