const steps = document.querySelectorAll(".step");
const vizTitle = document.getElementById("viz-title");
const vizBody = document.getElementById("viz-body");
const vizLabel = document.getElementById("viz-label");
const vizGear = document.getElementById("viz-gear");
const vizLegend = document.getElementById("viz-legend");
const gearSummary = document.getElementById("gear-summary");

const gearColors = {
  value: { primary: "#f29d38", secondary: "#f7c88a" },
  instrument: { primary: "#62d8ff", secondary: "#a3f3ff" },
  duration: { primary: "#9f7aea", secondary: "#c3b5ff" },
  interval: { primary: "#7de2d1", secondary: "#b9f6ea" },
  cliff: { primary: "#ff7d7d", secondary: "#ffb2b2" },
  curve: { primary: "#ffd166", secondary: "#ffe6a7" },
};

const scenes = [
  {
    label: "Building Block",
    title: "Value",
    body:
      "The total monetary amount tied to the grant, converted into shares at grant time. The realized value moves with the stock price.",
    color: "value",
    legend: [{ label: "Value snapshot", class: "value" }],
    card: [
      "<strong>Value:</strong> $200k notional",
      "<strong>Instrument:</strong> RSUs",
      "<strong>Cliff:</strong> 12 months",
      "<strong>Duration:</strong> 4 years",
      "<strong>Interval:</strong> Monthly",
      "<strong>Curve:</strong> 25 / 25 / 25 / 25",
    ],
  },
  {
    label: "Building Block",
    title: "Instrument",
    body:
      "RSUs deliver shares at vest; options deliver the right to buy at a strike price. Choose simplicity vs. upside emphasis.",
    color: "instrument",
    legend: [{ label: "RSUs vs. options", class: "instrument" }],
    card: [
      "<strong>Value:</strong> $200k notional",
      "<strong>Instrument:</strong> RSUs (no exercise; taxed at vest)",
      "<strong>Cliff:</strong> 12 months",
      "<strong>Duration:</strong> 4 years",
      "<strong>Interval:</strong> Monthly",
      "<strong>Curve:</strong> 25 / 25 / 25 / 25",
    ],
  },
  {
    label: "Building Block",
    title: "Duration",
    body:
      "How long the incentive stays active. Commonly 4 years; shorter for make-wholes, longer for founders and execs.",
    color: "duration",
    legend: [{ label: "Runway length", class: "duration" }],
    card: [
      "<strong>Value:</strong> $200k notional",
      "<strong>Instrument:</strong> RSUs",
      "<strong>Cliff:</strong> 12 months",
      "<strong>Duration:</strong> 4 years (standard runway)",
      "<strong>Interval:</strong> Monthly",
      "<strong>Curve:</strong> 25 / 25 / 25 / 25",
    ],
  },
  {
    label: "Building Block",
    title: "Interval",
    body:
      "How often vesting occurs. Monthly feels smooth; quarterly or annual feels like repeated cliffs—stickier for retention.",
    color: "interval",
    legend: [{ label: "Cadence", class: "interval" }],
    card: [
      "<strong>Value:</strong> $200k notional",
      "<strong>Instrument:</strong> RSUs",
      "<strong>Cliff:</strong> 12 months",
      "<strong>Duration:</strong> 4 years",
      "<strong>Interval:</strong> Monthly (employee-friendly)",
      "<strong>Curve:</strong> 25 / 25 / 25 / 25",
    ],
  },
  {
    label: "Building Block",
    title: "Cliff",
    body:
      "The probationary period before vesting begins—often 12 months for initial grants. Refreshers frequently skip cliffs.",
    color: "cliff",
    legend: [{ label: "Delayed start", class: "cliff" }],
    card: [
      "<strong>Value:</strong> $200k notional",
      "<strong>Instrument:</strong> RSUs",
      "<strong>Cliff:</strong> 12 months (lump after cliff)",
      "<strong>Duration:</strong> 4 years",
      "<strong>Interval:</strong> Monthly thereafter",
      "<strong>Curve:</strong> 25 / 25 / 25 / 25",
    ],
  },
  {
    label: "Building Block",
    title: "Curve",
    body:
      "The weighting by year. Straight-line is predictable; front-loaded helps candidates; back-loaded maximizes stickiness.",
    color: "curve",
    legend: [
      { label: "Straight-line", class: "curve" },
      { label: "Front / back-loaded variants", class: "duration" },
    ],
    card: [
      "<strong>Value:</strong> $200k notional",
      "<strong>Instrument:</strong> RSUs",
      "<strong>Cliff:</strong> 12 months",
      "<strong>Duration:</strong> 4 years",
      "<strong>Interval:</strong> Monthly",
      "<strong>Curve:</strong> Example 5 / 15 / 40 / 40 (back-loaded)",
    ],
  },
];

function updateScene(index) {
  const scene = scenes[index];
  if (!scene) return;

  vizLabel.textContent = scene.label;
  vizTitle.textContent = scene.title;
  vizBody.textContent = scene.body;

  vizLegend.innerHTML = "";
  scene.legend.forEach((item) => {
    const span = document.createElement("span");
    const dot = document.createElement("span");
    dot.className = `dot ${item.class}`;
    span.appendChild(dot);
    span.insertAdjacentText("beforeend", item.label);
    vizLegend.appendChild(span);
  });

  gearSummary.innerHTML = scene.card.map((entry) => `<li>${entry}</li>`).join("");

  steps.forEach((step) => step.classList.remove("is-active"));
  const current = steps[index];
  if (current) current.classList.add("is-active");

  const colorSet = gearColors[scene.color] || gearColors.value;
  vizGear.style.setProperty("--gear-color", colorSet.primary);
  vizGear.style.setProperty("--gear-secondary", colorSet.secondary);
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
  updateScene(0);
  setupObserver();
});
