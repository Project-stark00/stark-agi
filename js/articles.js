const fallbackArticles = {
  articles: [
    {
      slug: "stark-native-kernel-debugging-example",
      title: "Example: Debugging the First StarkAGI Kernel Loop",
      date: "2026-05-20",
      status: "Example",
      summary: "A sample Markdown article that demonstrates solved problems, unresolved notes, a diagram, and a chart.",
      file: "articles/stark-native-kernel-debugging-example.md",
      tags: ["Example", "Kernel", "Debugging"]
    }
  ]
};

const articleList = document.getElementById("articleList");
const articleMount = document.getElementById("articleMount");

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function normalizeUrl(url) {
  const value = String(url || "").trim();
  if (!value) return "#";
  if (/^(https?:|mailto:|#|\.\/|\.\.\/|\/)/i.test(value)) return value;
  return "#";
}

function slugify(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "section";
}

function inlineMarkdown(value) {
  let html = escapeHtml(value);

  html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (_match, alt, url) => {
    return `<img src="${escapeHtml(normalizeUrl(url))}" alt="${escapeHtml(alt)}" loading="lazy" />`;
  });

  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_match, text, url) => {
    return `<a href="${escapeHtml(normalizeUrl(url))}" target="_blank" rel="noreferrer">${text}</a>`;
  });

  html = html.replace(/`([^`]+)`/g, "<code>$1</code>");
  html = html.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/__([^_]+)__/g, "<strong>$1</strong>");
  html = html.replace(/\*([^*]+)\*/g, "<em>$1</em>");
  html = html.replace(/_([^_]+)_/g, "<em>$1</em>");

  return html;
}

function parseFrontMatter(markdown) {
  const source = String(markdown || "");
  if (!source.startsWith("---\n")) {
    return { frontMatter: {}, body: source };
  }

  const endIndex = source.indexOf("\n---", 4);
  if (endIndex === -1) {
    return { frontMatter: {}, body: source };
  }

  const raw = source.slice(4, endIndex).trim();
  const body = source.slice(endIndex + 5).trimStart();
  const frontMatter = {};

  raw.split(/\r?\n/).forEach((line) => {
    const match = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (!match) return;
    const key = match[1];
    const rawValue = match[2].trim();

    if (rawValue.startsWith("[") && rawValue.endsWith("]")) {
      frontMatter[key] = rawValue
        .slice(1, -1)
        .split(",")
        .map((item) => item.trim().replace(/^['"]|['"]$/g, ""))
        .filter(Boolean);
      return;
    }

    frontMatter[key] = rawValue.replace(/^['"]|['"]$/g, "");
  });

  return { frontMatter, body };
}

function extractFencedBlocks(markdown) {
  const blocks = [];
  const body = String(markdown || "").replace(/```([A-Za-z0-9_-]+)?\s*\n([\s\S]*?)```/g, (_match, language, content) => {
    const id = blocks.length;
    blocks.push({ language: String(language || "text").toLowerCase(), content: content.replace(/\n$/, "") });
    return `\n\n@@STARK_CODE_BLOCK_${id}@@\n\n`;
  });

  return { body, blocks };
}

function renderTable(lines, startIndex) {
  const headerLine = lines[startIndex];
  const separatorLine = lines[startIndex + 1] || "";

  if (!/^\s*\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?\s*$/.test(separatorLine)) {
    return null;
  }

  const rows = [];
  let index = startIndex + 2;

  while (index < lines.length && /^\s*\|.*\|\s*$/.test(lines[index])) {
    rows.push(lines[index]);
    index += 1;
  }

  const splitCells = (line) => line
    .trim()
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((cell) => cell.trim());

  const headers = splitCells(headerLine);
  const bodyRows = rows.map(splitCells);

  const html = ["<div class=\"md-table-wrap\"><table><thead><tr>"];
  headers.forEach((header) => html.push(`<th>${inlineMarkdown(header)}</th>`));
  html.push("</tr></thead><tbody>");

  bodyRows.forEach((row) => {
    html.push("<tr>");
    row.forEach((cell) => html.push(`<td>${inlineMarkdown(cell)}</td>`));
    html.push("</tr>");
  });

  html.push("</tbody></table></div>");
  return { html: html.join(""), nextIndex: index };
}

function renderMarkdownBody(markdown, blocks) {
  const lines = String(markdown || "").split(/\r?\n/);
  const html = [];
  let i = 0;

  const pushParagraph = (parts) => {
    if (!parts.length) return;
    html.push(`<p>${inlineMarkdown(parts.join(" "))}</p>`);
  };

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    if (!trimmed) {
      i += 1;
      continue;
    }

    const blockMatch = trimmed.match(/^@@STARK_CODE_BLOCK_(\d+)@@$/);
    if (blockMatch) {
      const block = blocks[Number(blockMatch[1])];
      html.push(renderCodeBlock(block));
      i += 1;
      continue;
    }

    if (/^---+$/.test(trimmed)) {
      html.push("<hr />");
      i += 1;
      continue;
    }

    const heading = trimmed.match(/^(#{1,4})\s+(.+)$/);
    if (heading) {
      const level = heading[1].length;
      const text = heading[2].trim();
      const id = slugify(text);
      html.push(`<h${level} id="${id}">${inlineMarkdown(text)}</h${level}>`);
      i += 1;
      continue;
    }

    if (trimmed.startsWith(">")) {
      const quoteLines = [];
      while (i < lines.length && lines[i].trim().startsWith(">")) {
        quoteLines.push(lines[i].trim().replace(/^>\s?/, ""));
        i += 1;
      }
      html.push(`<blockquote>${quoteLines.map((part) => `<p>${inlineMarkdown(part)}</p>`).join("")}</blockquote>`);
      continue;
    }

    const table = renderTable(lines, i);
    if (table) {
      html.push(table.html);
      i = table.nextIndex;
      continue;
    }

    if (/^[-*]\s+/.test(trimmed)) {
      const items = [];
      while (i < lines.length && /^[-*]\s+/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^[-*]\s+/, ""));
        i += 1;
      }
      html.push(`<ul>${items.map((item) => `<li>${inlineMarkdown(item)}</li>`).join("")}</ul>`);
      continue;
    }

    if (/^\d+\.\s+/.test(trimmed)) {
      const items = [];
      while (i < lines.length && /^\d+\.\s+/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^\d+\.\s+/, ""));
        i += 1;
      }
      html.push(`<ol>${items.map((item) => `<li>${inlineMarkdown(item)}</li>`).join("")}</ol>`);
      continue;
    }

    const paragraph = [trimmed];
    i += 1;
    while (i < lines.length) {
      const next = lines[i].trim();
      if (!next) break;
      if (/^(#{1,4})\s+/.test(next) || /^[-*]\s+/.test(next) || /^\d+\.\s+/.test(next) || next.startsWith(">") || /^@@STARK_CODE_BLOCK_\d+@@$/.test(next) || /^---+$/.test(next)) {
        break;
      }
      paragraph.push(next);
      i += 1;
    }
    pushParagraph(paragraph);
  }

  return html.join("\n");
}

function encodeDataSource(value) {
  return escapeHtml(encodeURIComponent(String(value || "")));
}

function decodeDataSource(value) {
  try {
    return decodeURIComponent(String(value || ""));
  } catch (error) {
    return String(value || "");
  }
}

function extractFigureInner(figureHtml) {
  return String(figureHtml || "")
    .replace(/^\s*<figure[^>]*>/, "")
    .replace(/<\/figure>\s*$/, "");
}

function renderMermaidBlock(source) {
  const fallback = renderDiagram(source);
  const fallbackInner = extractFigureInner(fallback);

  return `
    <figure class="diagram-card" data-diagram-renderer="mermaid" data-diagram-source="${encodeDataSource(source)}">
      <div class="diagram-mermaid-host" aria-label="Mermaid diagram output"></div>
      <div class="diagram-fallback">${fallbackInner}</div>
      <figcaption>Mermaid-ready diagram. Local fallback is shown when Mermaid.js is not installed.</figcaption>
    </figure>
  `;
}

function renderChartBlock(source) {
  const fallback = renderFallbackChart(source);
  if (!fallback.trim().startsWith("<figure")) {
    return fallback;
  }

  const fallbackInner = extractFigureInner(fallback);

  return `
    <figure class="chart-card" data-chart-renderer="chartjs" data-chart-source="${encodeDataSource(source)}">
      <div class="chart-canvas-wrap">
        <canvas class="chart-canvas" aria-label="Chart.js chart output"></canvas>
      </div>
      <div class="chart-fallback">${fallbackInner}</div>
      <figcaption>Chart.js-ready chart. Local SVG fallback is shown when Chart.js is not installed.</figcaption>
    </figure>
  `;
}

function renderCodeBlock(block) {
  if (!block) return "";
  if (["mermaid", "diagram", "flowchart"].includes(block.language)) {
    return renderMermaidBlock(block.content);
  }
  if (["chart", "chartjs", "graph"].includes(block.language)) {
    return renderChartBlock(block.content);
  }

  return `<pre class="md-code"><code>${escapeHtml(block.content)}</code></pre>`;
}

function parseNodeToken(token, nodes) {
  const cleaned = String(token || "").trim().replace(/;$/, "");
  const match = cleaned.match(/^([A-Za-z0-9_-]+)(?:\[([^\]]+)\]|\{([^}]+)\}|\(\(([^)]+)\)\)|\(([^)]+)\))?$/);

  if (!match) {
    const fallbackId = slugify(cleaned).replaceAll("-", "_") || `node_${nodes.size + 1}`;
    if (!nodes.has(fallbackId)) nodes.set(fallbackId, cleaned || fallbackId);
    return fallbackId;
  }

  const id = match[1];
  const label = match[2] || match[3] || match[4] || match[5] || id;
  if (!nodes.has(id)) nodes.set(id, label);
  return id;
}

function computeDiagramLevels(ids, edges) {
  const order = new Map(ids.map((id, index) => [id, index]));
  const incoming = new Map(ids.map((id) => [id, 0]));
  const outgoing = new Map(ids.map((id) => [id, []]));

  edges.forEach((edge) => {
    if (!incoming.has(edge.to) || !outgoing.has(edge.from)) return;
    incoming.set(edge.to, incoming.get(edge.to) + 1);
    outgoing.get(edge.from).push(edge.to);
  });

  const queue = ids
    .filter((id) => incoming.get(id) === 0)
    .sort((a, b) => order.get(a) - order.get(b));
  const levels = new Map(ids.map((id) => [id, 0]));
  let visited = 0;

  while (queue.length) {
    const id = queue.shift();
    visited += 1;

    outgoing.get(id).forEach((nextId) => {
      levels.set(nextId, Math.max(levels.get(nextId), levels.get(id) + 1));
      incoming.set(nextId, incoming.get(nextId) - 1);
      if (incoming.get(nextId) === 0) {
        queue.push(nextId);
        queue.sort((a, b) => order.get(a) - order.get(b));
      }
    });
  }

  if (visited !== ids.length) {
    return new Map(ids.map((id, index) => [id, index]));
  }

  return levels;
}

function buildDiagramLabel(label, x, y) {
  if (!label) return "";

  const width = Math.max(52, String(label).length * 7.4 + 18);
  const height = 20;

  return `
    <g class="diagram-edge-label-group">
      <rect x="${x - width / 2}" y="${y - height + 4}" width="${width}" height="${height}" rx="10" />
      <text x="${x}" y="${y}">${escapeHtml(label)}</text>
    </g>
  `;
}

function renderDiagram(source) {
  const lines = String(source || "")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith("%%"));

  const firstLine = lines[0] || "flowchart TD";
  const direction = /\bLR\b|\bRL\b/i.test(firstLine) ? "LR" : "TD";
  const graphLines = /^(flowchart|graph)\b/i.test(firstLine) ? lines.slice(1) : lines;
  const nodes = new Map();
  const edges = [];

  graphLines.forEach((line) => {
    const edgeMatch = line.match(/^(.+?)\s*-->(?:\|(.+?)\|)?\s*(.+)$/);
    if (!edgeMatch) {
      parseNodeToken(line, nodes);
      return;
    }

    const from = parseNodeToken(edgeMatch[1], nodes);
    const label = edgeMatch[2] || "";
    const to = parseNodeToken(edgeMatch[3], nodes);
    edges.push({ from, to, label });
  });

  const ids = Array.from(nodes.keys());
  const boxWidth = 178;
  const boxHeight = 60;
  const margin = { top: 44, right: 56, bottom: 54, left: 56 };
  const gapX = 108;
  const gapY = 38;
  const levels = computeDiagramLevels(ids, edges);
  const grouped = new Map();

  ids.forEach((id) => {
    const level = levels.get(id) || 0;
    if (!grouped.has(level)) grouped.set(level, []);
    grouped.get(level).push(id);
  });

  const levelKeys = Array.from(grouped.keys()).sort((a, b) => a - b);
  const maxRows = Math.max(...levelKeys.map((level) => grouped.get(level).length), 1);
  const positions = new Map();
  let width;
  let height;

  if (direction === "LR") {
    width = margin.left + margin.right + levelKeys.length * boxWidth + Math.max(0, levelKeys.length - 1) * gapX;
    height = Math.max(260, margin.top + margin.bottom + maxRows * boxHeight + Math.max(0, maxRows - 1) * gapY);

    levelKeys.forEach((level, columnIndex) => {
      const group = grouped.get(level);
      const groupHeight = group.length * boxHeight + Math.max(0, group.length - 1) * gapY;
      const startY = Math.max(margin.top, (height - groupHeight) / 2);
      const x = margin.left + columnIndex * (boxWidth + gapX);

      group.forEach((id, rowIndex) => {
        positions.set(id, {
          x,
          y: startY + rowIndex * (boxHeight + gapY)
        });
      });
    });
  } else {
    width = Math.max(760, margin.left + margin.right + maxRows * boxWidth + Math.max(0, maxRows - 1) * gapX);
    height = margin.top + margin.bottom + levelKeys.length * boxHeight + Math.max(0, levelKeys.length - 1) * gapY;

    levelKeys.forEach((level, rowIndex) => {
      const group = grouped.get(level);
      const groupWidth = group.length * boxWidth + Math.max(0, group.length - 1) * gapX;
      const startX = Math.max(margin.left, (width - groupWidth) / 2);
      const y = margin.top + rowIndex * (boxHeight + gapY);

      group.forEach((id, columnIndex) => {
        positions.set(id, {
          x: startX + columnIndex * (boxWidth + gapX),
          y
        });
      });
    });
  }

  const pathHtml = edges.map((edge) => {
    const from = positions.get(edge.from);
    const to = positions.get(edge.to);
    if (!from || !to) return "";

    const x1 = direction === "LR" ? from.x + boxWidth : from.x + boxWidth / 2;
    const y1 = direction === "LR" ? from.y + boxHeight / 2 : from.y + boxHeight;
    const x2 = direction === "LR" ? to.x : to.x + boxWidth / 2;
    const y2 = direction === "LR" ? to.y + boxHeight / 2 : to.y;
    const midX = (x1 + x2) / 2;
    const midY = (y1 + y2) / 2;
    const curve = direction === "LR"
      ? `M ${x1} ${y1} C ${midX} ${y1}, ${midX} ${y2}, ${x2} ${y2}`
      : `M ${x1} ${y1} C ${x1} ${midY}, ${x2} ${midY}, ${x2} ${y2}`;

    return `
      <path d="${curve}" class="diagram-edge" marker-end="url(#arrow)" />
      ${buildDiagramLabel(edge.label, midX, midY - 8)}
    `;
  }).join("");

  const nodeHtml = ids.map((id) => {
    const position = positions.get(id);
    return `
      <g class="diagram-node">
        <rect x="${position.x}" y="${position.y}" width="${boxWidth}" height="${boxHeight}" rx="16" />
        <text x="${position.x + boxWidth / 2}" y="${position.y + 36}">${escapeHtml(nodes.get(id))}</text>
      </g>
    `;
  }).join("");

  return `
    <figure class="diagram-card">
      <svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Rendered Markdown diagram">
        <defs>
          <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
            <path d="M0,0 L0,6 L9,3 z" class="diagram-arrow" />
          </marker>
        </defs>
        ${pathHtml}
        ${nodeHtml}
      </svg>
      <figcaption>Diagram rendered from a Markdown code fence.</figcaption>
    </figure>
  `;
}

function renderFallbackChart(source) {
  let data;
  try {
    data = JSON.parse(source);
  } catch (error) {
    return `<pre class="md-code"><code>${escapeHtml(source)}</code></pre>`;
  }

  const chartJsDataset = Array.isArray(data.data?.datasets) ? data.data.datasets[0] : null;
  const labels = Array.isArray(data.labels)
    ? data.labels
    : (Array.isArray(data.data?.labels) ? data.data.labels : []);
  const values = Array.isArray(data.values)
    ? data.values.map(Number)
    : (Array.isArray(chartJsDataset?.data) ? chartJsDataset.data.map(Number) : []);
  const title = data.title || data.options?.plugins?.title?.text || chartJsDataset?.label || "Markdown Chart";
  const type = data.type === "line" ? "line" : "bar";

  if (!labels.length || !values.length || labels.length !== values.length) {
    return `<pre class="md-code"><code>${escapeHtml(source)}</code></pre>`;
  }

  const width = 760;
  const height = 340;
  const padding = { top: 58, right: 34, bottom: 72, left: 54 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;
  const maxValue = Math.max(...values, 1);

  const points = values.map((value, index) => {
    const x = padding.left + (labels.length === 1 ? chartWidth / 2 : (index / (labels.length - 1)) * chartWidth);
    const y = padding.top + chartHeight - (value / maxValue) * chartHeight;
    return { x, y, value };
  });

  const bars = values.map((value, index) => {
    const barGap = 18;
    const barWidth = Math.max(28, (chartWidth / values.length) - barGap);
    const x = padding.left + index * (chartWidth / values.length) + barGap / 2;
    const barHeight = (value / maxValue) * chartHeight;
    const y = padding.top + chartHeight - barHeight;
    return `
      <rect class="chart-bar" x="${x}" y="${y}" width="${barWidth}" height="${barHeight}" rx="8"></rect>
      <text class="chart-value" x="${x + barWidth / 2}" y="${y - 8}">${escapeHtml(value)}</text>
      <text class="chart-label" x="${x + barWidth / 2}" y="${height - 34}">${escapeHtml(labels[index])}</text>
    `;
  }).join("");

  const linePath = points.map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`).join(" ");
  const line = `
    <path class="chart-line" d="${linePath}"></path>
    ${points.map((point, index) => `
      <circle class="chart-point" cx="${point.x}" cy="${point.y}" r="6"></circle>
      <text class="chart-value" x="${point.x}" y="${point.y - 12}">${escapeHtml(point.value)}</text>
      <text class="chart-label" x="${point.x}" y="${height - 34}">${escapeHtml(labels[index])}</text>
    `).join("")}
  `;

  return `
    <figure class="chart-card">
      <svg viewBox="0 0 ${width} ${height}" role="img" aria-label="${escapeHtml(title)}">
        <text class="chart-title" x="${padding.left}" y="32">${escapeHtml(title)}</text>
        <line class="chart-axis" x1="${padding.left}" y1="${padding.top + chartHeight}" x2="${width - padding.right}" y2="${padding.top + chartHeight}"></line>
        <line class="chart-axis" x1="${padding.left}" y1="${padding.top}" x2="${padding.left}" y2="${padding.top + chartHeight}"></line>
        ${type === "line" ? line : bars}
      </svg>
      <figcaption>Chart rendered from a JSON code fence inside Markdown.</figcaption>
    </figure>
  `;
}


const visualVendorPaths = {
  mermaid: "vendor/mermaid.esm.min.mjs",
  chart: "vendor/chart.umd.min.js"
};

let mermaidLoaderPromise = null;
let chartLoaderPromise = null;

async function localAssetExists(path) {
  try {
    const response = await fetch(path, { method: "HEAD", cache: "no-store" });
    return response.ok;
  } catch (error) {
    return false;
  }
}

async function loadLocalMermaid() {
  if (!mermaidLoaderPromise) {
    mermaidLoaderPromise = (async () => {
      if (!(await localAssetExists(visualVendorPaths.mermaid))) return null;

      const module = await import(`./${visualVendorPaths.mermaid}?v=${Date.now()}`);
      const mermaid = module.default || module.mermaid || window.mermaid;
      if (!mermaid) return null;

      mermaid.initialize({
        startOnLoad: false,
        theme: "dark",
        securityLevel: "strict",
        flowchart: {
          curve: "basis",
          htmlLabels: false
        },
        themeVariables: {
          darkMode: true,
          background: "transparent",
          mainBkg: "rgba(255,255,255,0.08)",
          primaryColor: "rgba(116,220,255,0.16)",
          primaryTextColor: "#f4f8ff",
          primaryBorderColor: "#74dcff",
          lineColor: "#74dcff",
          secondaryColor: "rgba(167,117,255,0.18)",
          tertiaryColor: "rgba(3,5,11,0.48)",
          fontFamily: "Inter, system-ui, sans-serif"
        }
      });

      return mermaid;
    })().catch(() => null);
  }

  return mermaidLoaderPromise;
}

async function loadLocalChartJs() {
  if (window.Chart) return window.Chart;

  if (!chartLoaderPromise) {
    chartLoaderPromise = (async () => {
      if (!(await localAssetExists(visualVendorPaths.chart))) return null;

      return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = visualVendorPaths.chart;
        script.async = true;
        script.onload = () => resolve(window.Chart || null);
        script.onerror = () => resolve(null);
        document.head.appendChild(script);
      });
    })();
  }

  return chartLoaderPromise;
}

async function upgradeMermaidDiagrams() {
  const cards = Array.from(document.querySelectorAll('[data-diagram-renderer="mermaid"]'));
  if (!cards.length) return;

  const mermaid = await loadLocalMermaid();
  if (!mermaid) return;

  for (const [index, card] of cards.entries()) {
    const source = decodeDataSource(card.dataset.diagramSource);
    const host = card.querySelector(".diagram-mermaid-host");
    if (!host || !source.trim()) continue;

    try {
      const renderId = `stark-mermaid-${Date.now()}-${index}`;
      const result = await mermaid.render(renderId, source);
      host.innerHTML = result.svg || "";
      card.classList.add("is-mermaid");
    } catch (error) {
      card.classList.add("has-render-error");
    }
  }
}

function normalizeChartConfig(source) {
  const raw = JSON.parse(source);

  if (raw && raw.type && raw.data) {
    return {
      ...raw,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            labels: { color: "#d9e8ff" }
          },
          ...(raw.options?.plugins || {})
        },
        scales: {
          x: {
            ticks: { color: "#a6b5ca" },
            grid: { color: "rgba(255,255,255,0.08)" },
            ...(raw.options?.scales?.x || {})
          },
          y: {
            beginAtZero: true,
            ticks: { color: "#a6b5ca" },
            grid: { color: "rgba(255,255,255,0.08)" },
            ...(raw.options?.scales?.y || {})
          }
        },
        ...(raw.options || {})
      }
    };
  }

  const labels = Array.isArray(raw.labels) ? raw.labels : [];
  const values = Array.isArray(raw.values) ? raw.values.map(Number) : [];
  const type = raw.type === "line" ? "line" : "bar";

  return {
    type,
    data: {
      labels,
      datasets: [
        {
          label: raw.title || raw.label || "Markdown chart",
          data: values,
          borderWidth: 2,
          tension: 0.35,
          fill: type === "line" ? false : true,
          borderColor: "rgba(116,220,255,0.95)",
          backgroundColor: type === "line" ? "rgba(116,220,255,0.16)" : "rgba(116,220,255,0.42)",
          pointBackgroundColor: "#74dcff",
          pointBorderColor: "rgba(255,255,255,0.88)"
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: { color: "#d9e8ff" }
        },
        title: {
          display: Boolean(raw.title),
          text: raw.title || "",
          color: "#f4f8ff",
          font: { size: 18, weight: "bold" }
        }
      },
      scales: {
        x: {
          ticks: { color: "#a6b5ca" },
          grid: { color: "rgba(255,255,255,0.08)" }
        },
        y: {
          beginAtZero: true,
          ticks: { color: "#a6b5ca" },
          grid: { color: "rgba(255,255,255,0.08)" }
        }
      }
    }
  };
}

async function upgradeChartBlocks() {
  const cards = Array.from(document.querySelectorAll('[data-chart-renderer="chartjs"]'));
  if (!cards.length) return;

  const ChartConstructor = await loadLocalChartJs();
  if (!ChartConstructor) return;

  cards.forEach((card) => {
    const canvas = card.querySelector(".chart-canvas");
    if (!canvas || canvas.dataset.rendered === "true") return;

    try {
      const source = decodeDataSource(card.dataset.chartSource);
      const config = normalizeChartConfig(source);
      new ChartConstructor(canvas, config);
      canvas.dataset.rendered = "true";
      card.classList.add("is-chartjs");
    } catch (error) {
      card.classList.add("has-render-error");
    }
  });
}

function upgradeExternalVisuals() {
  upgradeMermaidDiagrams();
  upgradeChartBlocks();
}


function renderArticle(markdown, meta) {
  const parsed = parseFrontMatter(markdown);
  const details = { ...meta, ...parsed.frontMatter };
  const extracted = extractFencedBlocks(parsed.body);
  const tags = Array.isArray(details.tags) ? details.tags : String(details.tags || "").split(",").map((tag) => tag.trim()).filter(Boolean);

  const header = `
    <header class="markdown-article__header">
      <a class="article-back" href="articles.html">← All articles</a>
      <p class="section-kicker">${escapeHtml(details.status || "Article")}</p>
      <h1 class="article-document-title">${escapeHtml(details.title || "Untitled Article")}</h1>
      <p class="article-meta">${escapeHtml(details.date || "No date")} · ${escapeHtml(details.category || "Development Note")}</p>
      ${details.summary ? `<p class="article-summary">${escapeHtml(details.summary)}</p>` : ""}
      ${tags.length ? `<div class="article-tags">${tags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join("")}</div>` : ""}
    </header>
  `;

  articleMount.innerHTML = `${header}<div class="markdown-article__body">${renderMarkdownBody(extracted.body, extracted.blocks)}</div>`;
  renderLocalAnimations();
  upgradeExternalVisuals();
}

function renderArticleList(data, activeSlug) {
  const articles = Array.isArray(data.articles) ? data.articles : [];
  if (!articles.length) {
    articleList.innerHTML = `<div class="article-loading">No articles found. Add entries to <code>data/articles.json</code>.</div>`;
    return;
  }

  articleList.innerHTML = articles.map((article) => {
    const active = article.slug === activeSlug ? " is-active" : "";
    return `
      <a class="article-list-card${active}" href="articles.html?article=${encodeURIComponent(article.slug)}">
        <span class="status-pill status-info">${escapeHtml(article.status || "Article")}</span>
        <strong>${escapeHtml(article.title)}</strong>
        <small>${escapeHtml(article.date || "No date")}</small>
        <p>${escapeHtml(article.summary || "")}</p>
      </a>
    `;
  }).join("");
}

async function loadJson(path, fallback) {
  try {
    const response = await fetch(path, { cache: "no-store" });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json();
  } catch (error) {
    return fallback;
  }
}

async function loadArticle(meta) {
  if (!meta) return;

  articleMount.innerHTML = `<div class="article-loading">Loading ${escapeHtml(meta.title)}…</div>`;

  try {
    const response = await fetch(meta.file, { cache: "no-store" });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const markdown = await response.text();
    renderArticle(markdown, meta);
  } catch (error) {
    articleMount.innerHTML = `
      <div class="article-empty-state">
        <p class="section-kicker">Local preview note</p>
        <h2>Could not load the Markdown file.</h2>
        <p>
          Browsers usually block Markdown loading when this page is opened with <code>file://</code>.
          Preview through a local server instead:
        </p>
        <pre class="md-code"><code>python -m http.server 8000</code></pre>
        <p>Then open <code>http://localhost:8000/articles.html?article=${escapeHtml(meta.slug)}</code>.</p>
      </div>
    `;
  }
}

function getRequestedSlug() {
  const params = new URLSearchParams(window.location.search);
  return params.get("article") || "";
}

function renderLocalAnimations() {
  if (typeof anime === "undefined") {
    document.querySelectorAll(".markdown-article__header, .markdown-article__body > *").forEach((item) => {
      item.style.opacity = 1;
    });
    return;
  }

  anime({
    targets: ".markdown-article__header, .markdown-article__body > *",
    opacity: [0, 1],
    translateY: [18, 0],
    delay: anime.stagger(26),
    duration: 520,
    easing: "easeOutExpo"
  });
}

async function bootArticles() {
  const data = await loadJson("data/articles.json", fallbackArticles);
  const requestedSlug = getRequestedSlug();
  const articles = Array.isArray(data.articles) ? data.articles : [];
  const selected = articles.find((article) => article.slug === requestedSlug) || articles[0];

  renderArticleList(data, selected?.slug);

  if (selected) {
    await loadArticle(selected);
  }

  if (typeof anime !== "undefined") {
    anime({
      targets: ".article-hero__content, .article-reader-panel, .article-layout",
      opacity: [0, 1],
      translateY: [28, 0],
      delay: anime.stagger(110),
      duration: 850,
      easing: "easeOutExpo"
    });

    anime({
      targets: ".particle",
      translateY: () => anime.random(-36, 36),
      translateX: () => anime.random(-22, 22),
      scale: () => anime.random(8, 18) / 10,
      opacity: [0.18, 0.55, 0.18],
      duration: () => anime.random(4200, 7600),
      delay: anime.stagger(280),
      direction: "alternate",
      loop: true,
      easing: "easeInOutSine"
    });
  } else {
    document.querySelectorAll(".article-hero__content, .article-reader-panel, .article-layout").forEach((item) => {
      item.style.opacity = 1;
    });
  }
}

bootArticles();
