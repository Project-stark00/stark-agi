const fallbackProgressData = {
  projectStatus: {
    currentPhase: "Phase 1 — Native Digital Life Micro Kernel",
    activeMilestone: "M1 — Fixed State Core & Inspection Logs",
    overallStatus: "Research prototype",
    lastUpdated: "2026-05-20",
    focus: "Build the smallest inspectable StarkAGI kernel before expanding memory, sleep review, and autonomy."
  },
  logs: [
    {
      date: "2026-05-20",
      title: "Progress page fallback loaded",
      type: "Local Preview",
      status: "Info",
      summary: "If you opened this page directly from your file system, the browser may block data/progress.json. Use python -m http.server 8000 for local preview."
    }
  ],
  milestones: [
    {
      id: "M1",
      title: "Micro Kernel",
      status: "In Progress",
      summary: "Create a fixed-length continuous state core and deterministic inspection logs."
    }
  ],
  notes: [
    {
      title: "Local preview note",
      body: "GitHub Pages will load data/progress.json normally. For local testing, run a small local server instead of opening progress.html directly."
    }
  ]
};

const statusClassMap = {
  "Completed": "status-completed",
  "In Progress": "status-active",
  "Planned": "status-planned",
  "Info": "status-info"
};

function animateProgressHero() {
  const heroTargets = document.querySelectorAll(".progress-hero__content, .progress-status-panel");

  if (typeof anime === "undefined") {
    heroTargets.forEach((item) => {
      item.style.opacity = 1;
    });
    return;
  }

  anime({
    targets: ".progress-hero__content",
    opacity: [0, 1],
    translateY: [28, 0],
    duration: 900,
    easing: "easeOutExpo"
  });

  anime({
    targets: ".progress-status-panel",
    opacity: [0, 1],
    translateY: [34, 0],
    scale: [0.97, 1],
    duration: 1050,
    delay: 140,
    easing: "easeOutExpo"
  });
}

animateProgressHero();

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function setText(id, value) {
  const element = document.getElementById(id);
  if (element) element.textContent = value || "—";
}

function renderStatus(projectStatus = {}) {
  setText("status-current-phase", projectStatus.currentPhase);
  setText("status-active-milestone", projectStatus.activeMilestone);
  setText("status-overall", projectStatus.overallStatus);
  setText("status-last-updated", projectStatus.lastUpdated);
  setText("status-focus", projectStatus.focus);
}

function renderSummary(data) {
  const container = document.getElementById("progress-summary-grid");
  if (!container) return;

  const completed = (data.milestones || []).filter((item) => item.status === "Completed").length;
  const active = (data.milestones || []).filter((item) => item.status === "In Progress").length;
  const planned = (data.milestones || []).filter((item) => item.status === "Planned").length;

  const cards = [
    ["Completed", completed, "Verified milestones"],
    ["Active", active, "Work in progress"],
    ["Planned", planned, "Queued milestones"],
    ["Logs", (data.logs || []).length, "Published updates"]
  ];

  container.innerHTML = cards.map(([label, value, description]) => `
    <article class="progress-stat-card">
      <strong>${escapeHtml(value)}</strong>
      <span>${escapeHtml(label)}</span>
      <p>${escapeHtml(description)}</p>
    </article>
  `).join("");
}

function renderLogs(logs = []) {
  const container = document.getElementById("log-list");
  if (!container) return;

  container.innerHTML = logs.map((log) => {
    const className = statusClassMap[log.status] || "status-info";
    return `
      <article class="log-card">
        <div class="log-date">${escapeHtml(log.date)}</div>
        <div class="log-content">
          <div class="log-meta">
            <span>${escapeHtml(log.type)}</span>
            <span class="status-pill ${className}">${escapeHtml(log.status)}</span>
          </div>
          <h3>${escapeHtml(log.title)}</h3>
          <p>${escapeHtml(log.summary)}</p>
        </div>
      </article>
    `;
  }).join("");
}

function renderMilestones(milestones = []) {
  const container = document.getElementById("milestone-board");
  if (!container) return;

  container.innerHTML = milestones.map((milestone) => {
    const className = statusClassMap[milestone.status] || "status-info";
    return `
      <article class="milestone-card">
        <div class="milestone-card__top">
          <span class="phase-number small">${escapeHtml(milestone.id)}</span>
          <span class="status-pill ${className}">${escapeHtml(milestone.status)}</span>
        </div>
        <h3>${escapeHtml(milestone.title)}</h3>
        <p>${escapeHtml(milestone.summary)}</p>
      </article>
    `;
  }).join("");
}

function renderNotes(notes = []) {
  const container = document.getElementById("notes-grid");
  if (!container) return;

  container.innerHTML = notes.map((note) => `
    <article class="note-card">
      <h3>${escapeHtml(note.title)}</h3>
      <p>${escapeHtml(note.body)}</p>
    </article>
  `).join("");
}

function renderProgress(data) {
  renderStatus(data.projectStatus);
  renderSummary(data);
  renderLogs(data.logs);
  renderMilestones(data.milestones);
  renderNotes(data.notes);

  if (typeof anime !== "undefined") {
    anime({
      targets: ".log-card, .milestone-card, .note-card, .progress-stat-card",
      opacity: [0, 1],
      translateY: [18, 0],
      delay: anime.stagger(55),
      duration: 650,
      easing: "easeOutExpo"
    });
  }
}

fetch("data/progress.json")
  .then((response) => {
    if (!response.ok) throw new Error(`Could not load progress data: ${response.status}`);
    return response.json();
  })
  .then(renderProgress)
  .catch((error) => {
    console.warn(error);
    renderProgress(fallbackProgressData);
  });
