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

const embeddedArticleMarkdown = {
  "stark-current-architecture-snapshot": '---\ntitle: "Stark Current Architecture Snapshot"\ndate: "2026-05-22"\ncategory: "Architecture"\nstatus: "Current"\nsummary: "A readable website version of the current Stark architecture vault: Python runtime authority today, C++ native advisory substrate, memory/context flow, risks, and the next promotion gate."\ntags: ["Architecture", "Native Core", "Python Runtime", "Memory", "Roadmap"]\n---\n\n# Stark Current Architecture Snapshot\n\nThis article summarizes the current Stark architecture from the Obsidian vault.\n\nThe most important truth is simple:\n\n> Stark currently has a real C++ native kernel substrate, but the shipped runtime is still Python-first. The native core is meaningful, bounded, and advisory-only.\n\nThat distinction matters because the project is trying to become a native digital-life architecture without pretending that the native layer already owns every decision.\n\n## Current System Identity\n\nStark is currently best described as:\n\n```text\nA local-first LLM assistant runtime with strong orchestration, memory, policy, tools, and a real model-free C++ native kernel substrate bridged in as advisory evidence.\n```\n\nIt is not yet:\n\n```text\nA fully native digital-life kernel where the native substrate is the primary authority and the LLM is only one swappable organ.\n```\n\n## Current Runtime Map\n\n```mermaid\ngraph TD\n    Start[scripts/start_stark.py] --> HUD[scripts/run_local_hud.py]\n    HUD --> UI[FastAPI Local UI]\n    UI --> Gateway[SessionGateway]\n    Gateway --> Orchestrator[Python Orchestrator]\n    Orchestrator --> Brain[Layered Brain Pipeline]\n    Brain --> Memory[SQLite Memory and Retrieval]\n    Brain --> LLM[LLM Runtime and Router]\n    Brain --> Tools[Tools, Operator, Coding]\n    Gateway --> NativeBridge[NativeKernelBridge]\n    NativeBridge --> NativeCore[C++ Native Core]\n    NativeCore -. advisory snapshot .-> Gateway\n```\n\n## Authority Today\n\n| Layer | Current role |\n|---|---|\n| Python gateway / orchestrator | Owns real shipped runtime decisions |\n| Python policy and tool gates | Protects tool execution and approvals |\n| Python memory and prompt builder | Persists and retrieves context |\n| Native bridge snapshot | Exposes native evidence to Python |\n| C++ native core state | Provides bounded advisory substrate |\n\nThe target direction is different:\n\n```text\nC++ Native Kernel\n  owns state, lifecycle, memory gates, and decision direction\n\nPython / LLM Runtime\n  provides language, tools, UI, persistence, and execution under native governance\n```\n\nBut this target must be reached gradually.\n\n## Native Kernel Layer\n\nThe native kernel lives in:\n\n```text\nnative/stark_native_core/\n```\n\nThe Python bridge lives in:\n\n```text\nassistant/native_bridge/\n```\n\nThe native core is designed to be:\n\n```text\nbounded\nmodel-free\ntool-free\nadvisory-only\n```\n\nIt currently owns low-level concepts such as:\n\n- daemon lifecycle\n- fixed-size state regions\n- sensory signal fusion\n- partition and write monitoring\n- checkpoint deltas\n- chronicle evidence\n- associative memory\n- idle review\n- drive engine\n- projection engine\n- native renderer boundary checks\n- work-mode planning\n- C ABI bridge\n\n## Native State Regions\n\nThe current native state field is:\n\n```text\n10 regions × 64 floats\n```\n\nThe regions are:\n\n| Region | Purpose |\n|---|---|\n| Survival | continuity and safety pressure |\n| Perception | incoming signal interpretation |\n| Host | host/user relationship state |\n| Working | active short-term processing |\n| Concept | conceptual state |\n| Memory | native memory resonance |\n| Goal | goal pressure |\n| Value | value alignment signals |\n| Action | action tendency |\n| SelfModel | internal self-state |\n\nThis is the closest current repo component to the Stark Native Digital Life direction:\n\n```text\ncontinuous low-dimensional state\nnot tokens\nnot transformer hidden states\nnot next-token prediction\n```\n\n## Native Flow Today\n\n```mermaid\ngraph TD\n    Signal[Sensory Signal] --> Fusion[Fusion Engine]\n    Fusion --> Monitor[Partition Monitor]\n    Monitor --> State[State Field]\n    Fusion --> Trace[Learning Source Trace]\n    Fusion --> Delta[Checkpoint Delta]\n    State --> Drive[Drive Engine]\n    State --> Projection[Projection Engine]\n    Projection --> Renderer[Native Renderer]\n    State --> Daemon[Daemon Runtime]\n    Daemon --> Snapshot[C ABI Snapshot]\n```\n\n## Python Runtime Layer\n\nThe Python runtime currently owns the shipped assistant behavior.\n\nIt handles:\n\n- session gateway\n- local UI and HUD\n- orchestration\n- brain pipeline\n- memory persistence\n- LLM runtime\n- tool execution\n- operator and coding modules\n- approvals and policy\n- snapshots\n\nImportant folders:\n\n```text\nassistant/gateway/\nassistant/orchestrator/\nassistant/brain/\nassistant/memory/\nassistant/llm_runtime/\nassistant/tools/\nassistant/operator/\nassistant/coding/\nassistant/security/\nassistant/policy/\nassistant/ui/\n```\n\n## Memory and Context Architecture\n\nThe current memory system is mostly:\n\n```text\nSQLite + FTS5 + ranking + semantic-index scaffolding + memory edges\n```\n\nImportant strengths:\n\n- local-first persistence\n- SQLite WAL / FTS style practicality\n- memory ranking exists\n- memory edges exist\n- semantic index scaffolding exists\n- Obsidian import/export logic exists\n- brain bridge exists\n\nImportant missing pieces for long-term Stark:\n\n- append-only tamper-evident memory journal as source of truth\n- hot / warm / cold memory separation\n- daily and session compaction\n- native memory proposal gate\n- memory authority labels inside prompt composition\n- large-scale vector backend for semantic recall\n- raw event archive separated from learned memories\n- active-thread context manager\n\n## Prompt Context Problem\n\nThe current prompt builder places memory-like context inside the system message under:\n\n```text\n## CONTEXT\n### MEMORIES\n### EVENTS\n```\n\nThat works technically, but it can blur authority between immutable system rules and retrieved memory.\n\nThe recommended future internal prompt object is:\n\n```text\nCore System\nCurrent Mode\nActive Memory State\nActive Thread State\nRecent Raw Conversation\nCurrent User Message\n```\n\nMemory should become active cognitive state, not a raw blob.\n\n## Target Memory Pyramid\n\n```mermaid\ngraph TD\n    Core[Level 5: Sealed Core Rules] --> BrainCells[Level 4: Brain Cells]\n    BrainCells --> Semantic[Level 3: Semantic Memories]\n    Semantic --> Episodic[Level 2: Episodic Memories]\n    Episodic --> Session[Level 1: Session Summaries]\n    Session --> Raw[Level 0: Raw Event Journal]\n```\n\n## Native Bridge Flow\n\nThe current bridge exposes methods such as:\n\n```python\nhealth()\ntick(...)\nplan_work(...)\nsnapshot()\n```\n\nCurrent characteristics:\n\n- uses `ctypes`\n- loads native library from `tmp/native_core_build/`\n- fails closed if the native library is missing\n- marks native as `advisory_only = True`\n- returns `can_execute_tools = False`\n\nCurrent bridge flow:\n\n```mermaid\ngraph TD\n    Gateway[SessionGateway] --> Bridge[NativeKernelBridge]\n    Bridge --> DLL[Native DLL or SO]\n    DLL --> Native[stark_native_core]\n    Native --> Snapshot[Snapshot JSON]\n    Snapshot --> Gateway\n    Gateway --> UI[HUD / Snapshot Bundle]\n```\n\n## Next Recommended Milestone\n\nThe next safe milestone is:\n\n```text\nM1 Native Memory Gate Bridge\n```\n\nGoal:\n\n```text\nConnect native chronicle / memory proposal structures to Python memory persistence as a controlled advisory memory gate.\n```\n\nDo not do these yet:\n\n- do not let native execute tools\n- do not replace SQLite\n- do not redesign the entire prompt builder\n- do not jump straight to a native daemon with broad authority\n\nRecommended flow:\n\n```mermaid\ngraph TD\n    Event[Runtime Event] --> Signal[Native Compact Signal]\n    Signal --> Native[Native Core]\n    Native --> Proposal[MemoryCandidateProposal]\n    Proposal --> Bridge[C ABI Bridge]\n    Bridge --> PyBridge[NativeKernelBridge]\n    PyBridge --> Gate[Python Memory Gate]\n    Gate --> Store[Memory Store]\n    Store --> Result[Commit or Reject Result]\n    Result --> Feedback[Native Feedback]\n```\n\n## Promotion Roadmap\n\n```mermaid\ngraph TD\n    S1[Stage 1: Native Advisory Snapshot] --> S2[Stage 2: Native Memory Proposal Gate]\n    S2 --> S3[Stage 3: Native Mode and Drive Influence]\n    S3 --> S4[Stage 4: Native Permission Advisory Hard Gate]\n    S4 --> S5[Stage 5: Native Daemon Lifecycle Authority]\n    S5 --> S6[Stage 6: Native Primary State Substrate]\n```\n\nThe architecture rule is:\n\n```text\nDo not jump from Stage 1 to Stage 6.\n```\n\nThe safe step is Stage 2.\n\n## Major Risks\n\n| Risk | Mitigation |\n|---|---|\n| Promoting native too fast | promote one gate at a time |\n| Memory poisoning | add authority labels, source tracking, confidence, and host override rules |\n| Giant context dumps | use active memory state, summaries, pinned context, and dynamic thread windows |\n| SQLite becoming both truth and search forever | use journal as truth and DB as rebuildable index |\n| UI showing fake readiness | every module should show live / partial / mock status clearly |\n\n## Builder Target\n\nThe current builder milestone should focus only on:\n\n```text\nNative MemoryCandidateProposal\n  → Python MemoryGate\n  → persistent journal / index\n  → native feedback\n```\n\nAcceptance should include:\n\n- native proposal visible through bridge\n- Python can read proposal fields\n- high-authority core/canon proposals are rejected without explicit host approval\n- normal low-risk proposals can be persisted with native metadata\n- native snapshot behavior remains advisory-only\n- `can_execute_tools` remains false\n- existing shipped tests continue passing\n\n## Summary\n\nStark currently has a strong Python assistant runtime and a real C++ native core substrate.\n\nThe future direction is native authority, but the correct path is not a sudden rewrite. The correct path is staged promotion:\n\n```text\nadvisory native evidence\n  → native memory proposal gate\n  → mode and drive influence\n  → permission advisory gate\n  → daemon lifecycle authority\n  → primary native state substrate\n```\n'
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
  const fallbackClass = fallback.includes("diagram-card--wrapped-flow") ? " diagram-card--wrapped-flow" : "";

  return `
    <figure class="diagram-card${fallbackClass}" data-diagram-renderer="mermaid" data-diagram-source="${encodeDataSource(source)}">
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

function parseDiagramEdge(line, nodes) {
  const cleaned = String(line || "").trim().replace(/;$/, "");
  const arrowPattern = "(?:-->|==>|-\\.->|---)";
  const pipeLabel = new RegExp(`^(.+?)\\s*${arrowPattern}\\s*\\|(.+?)\\|\\s*(.+)$`);
  const textLabel = /^(.+?)\s+--\s+(.+?)\s+-->\s+(.+)$/;
  const plainArrow = new RegExp(`^(.+?)\\s*${arrowPattern}\\s*(.+)$`);

  let match = cleaned.match(pipeLabel);
  if (match) {
    return {
      from: parseNodeToken(match[1], nodes),
      to: parseNodeToken(match[3], nodes),
      label: match[2].trim()
    };
  }

  match = cleaned.match(textLabel);
  if (match) {
    return {
      from: parseNodeToken(match[1], nodes),
      to: parseNodeToken(match[3], nodes),
      label: match[2].trim()
    };
  }

  match = cleaned.match(plainArrow);
  if (match) {
    return {
      from: parseNodeToken(match[1], nodes),
      to: parseNodeToken(match[2], nodes),
      label: ""
    };
  }

  return null;
}

function buildDiagramGraph(ids, edges) {
  const order = new Map(ids.map((id, index) => [id, index]));
  const incoming = new Map(ids.map((id) => [id, 0]));
  const outgoing = new Map(ids.map((id) => [id, []]));

  edges.forEach((edge, edgeIndex) => {
    if (!incoming.has(edge.to) || !outgoing.has(edge.from)) return;
    incoming.set(edge.to, incoming.get(edge.to) + 1);
    outgoing.get(edge.from).push({ ...edge, edgeIndex });
  });

  return { order, incoming, outgoing };
}

function computeDiagramLevels(ids, edges) {
  const { order, incoming, outgoing } = buildDiagramGraph(ids, edges);
  const levels = new Map(ids.map((id) => [id, 0]));
  const sources = ids
    .filter((id) => incoming.get(id) === 0)
    .sort((a, b) => order.get(a) - order.get(b));
  const roots = sources.length ? sources : ids.slice(0, 1);
  const visiting = new Set();

  function visit(id, level) {
    if (!id || visiting.has(id) || level > ids.length + 2) return;

    levels.set(id, Math.max(levels.get(id) || 0, level));
    visiting.add(id);

    const nextEdges = (outgoing.get(id) || []).slice().sort((a, b) => a.edgeIndex - b.edgeIndex);
    nextEdges.forEach((edge) => {
      if (visiting.has(edge.to)) return;

      const targetOrder = order.get(edge.to) ?? 0;
      const sourceOrder = order.get(edge.from) ?? 0;
      const looksLikeBackEdge = targetOrder <= sourceOrder && (levels.get(edge.to) || 0) <= level;
      if (looksLikeBackEdge) return;

      visit(edge.to, level + 1);
    });

    visiting.delete(id);
  }

  roots.forEach((root) => visit(root, 0));

  ids.forEach((id, index) => {
    if (!Number.isFinite(levels.get(id))) levels.set(id, index);
  });

  return levels;
}

function findPrimaryDiagramPath(ids, edges) {
  if (!ids.length) return [];

  const { order, incoming, outgoing } = buildDiagramGraph(ids, edges);
  const start = ids
    .filter((id) => incoming.get(id) === 0)
    .sort((a, b) => order.get(a) - order.get(b))[0] || ids[0];
  const visited = new Set();
  const path = [];
  let current = start;

  while (current && !visited.has(current)) {
    path.push(current);
    visited.add(current);

    const candidates = (outgoing.get(current) || [])
      .filter((edge) => !visited.has(edge.to))
      .sort((a, b) => a.edgeIndex - b.edgeIndex);

    current = candidates[0]?.to || null;
  }

  return path;
}

function hasDiagramCycle(ids, edges) {
  const { outgoing } = buildDiagramGraph(ids, edges);
  const visited = new Set();
  const stack = new Set();

  function visit(id) {
    if (stack.has(id)) return true;
    if (visited.has(id)) return false;

    visited.add(id);
    stack.add(id);

    for (const edge of outgoing.get(id) || []) {
      if (visit(edge.to)) return true;
    }

    stack.delete(id);
    return false;
  }

  return ids.some((id) => visit(id));
}

function chooseDiagramLayoutMode(direction, ids, edges, levels) {
  const primaryPath = findPrimaryDiagramPath(ids, edges);
  const levelKeys = Array.from(new Set(Array.from(levels.values())));
  const groupedCounts = levelKeys.map((level) => Array.from(levels.values()).filter((value) => value === level).length);
  const maxRows = Math.max(...groupedCounts, 1);
  const isMostlyLinear = primaryPath.length >= Math.max(6, Math.floor(ids.length * 0.72));
  const isLongSingleLane = maxRows === 1 && levelKeys.length >= 6;
  const hasCycle = hasDiagramCycle(ids, edges);

  if (direction !== "LR" && (isMostlyLinear || isLongSingleLane || hasCycle)) {
    return { mode: "wrapped-flow", primaryPath };
  }

  return { mode: "layered", primaryPath };
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

function wrapDiagramText(label, maxChars = 18, maxLines = 3) {
  const words = String(label || "").trim().split(/\s+/).filter(Boolean);
  if (!words.length) return [""];

  const lines = [];
  let current = "";

  words.forEach((word) => {
    const next = current ? `${current} ${word}` : word;
    if (next.length <= maxChars || !current) {
      current = next;
      return;
    }

    lines.push(current);
    current = word;
  });

  if (current) lines.push(current);

  if (lines.length <= maxLines) return lines;

  const clipped = lines.slice(0, maxLines);
  clipped[maxLines - 1] = `${clipped[maxLines - 1].replace(/\.+$/, "")}...`;
  return clipped;
}

function renderDiagramNodeText(label, centerX, centerY, boxWidth) {
  const lines = wrapDiagramText(label, Math.max(16, Math.floor((boxWidth - 28) / 7.2)), 3);
  const lineHeight = 15;
  const startY = centerY - ((lines.length - 1) * lineHeight) / 2 + 4;

  return lines.map((line, index) => (
    `<text x="${centerX}" y="${startY + index * lineHeight}">${escapeHtml(line)}</text>`
  )).join("");
}

function getDiagramAnchor(position, boxWidth, boxHeight, side) {
  const centerX = position.x + boxWidth / 2;
  const centerY = position.y + boxHeight / 2;

  switch (side) {
    case "left": return { x: position.x, y: centerY };
    case "right": return { x: position.x + boxWidth, y: centerY };
    case "top": return { x: centerX, y: position.y };
    case "bottom": return { x: centerX, y: position.y + boxHeight };
    default: return { x: centerX, y: centerY };
  }
}

function chooseForwardAnchors(from, to, boxWidth, boxHeight) {
  const fromCenter = { x: from.x + boxWidth / 2, y: from.y + boxHeight / 2 };
  const toCenter = { x: to.x + boxWidth / 2, y: to.y + boxHeight / 2 };
  const dx = toCenter.x - fromCenter.x;
  const dy = toCenter.y - fromCenter.y;

  if (Math.abs(dx) >= Math.abs(dy)) {
    return dx >= 0
      ? { start: getDiagramAnchor(from, boxWidth, boxHeight, "right"), end: getDiagramAnchor(to, boxWidth, boxHeight, "left") }
      : { start: getDiagramAnchor(from, boxWidth, boxHeight, "left"), end: getDiagramAnchor(to, boxWidth, boxHeight, "right") };
  }

  return dy >= 0
    ? { start: getDiagramAnchor(from, boxWidth, boxHeight, "bottom"), end: getDiagramAnchor(to, boxWidth, boxHeight, "top") }
    : { start: getDiagramAnchor(from, boxWidth, boxHeight, "top"), end: getDiagramAnchor(to, boxWidth, boxHeight, "bottom") };
}

function renderDiagramEdge(edge, positions, layoutOrder, boxWidth, boxHeight, width, height, margin) {
  const from = positions.get(edge.from);
  const to = positions.get(edge.to);
  if (!from || !to) return "";

  const fromIndex = layoutOrder.indexOf(edge.from);
  const toIndex = layoutOrder.indexOf(edge.to);
  const isBackEdge = toIndex !== -1 && fromIndex !== -1 && toIndex <= fromIndex;

  if (isBackEdge) {
    const start = getDiagramAnchor(from, boxWidth, boxHeight, "left");
    const end = getDiagramAnchor(to, boxWidth, boxHeight, "top");
    const routeX = Math.max(14, Math.min(from.x, to.x, margin.left) - 34);
    const routeY = Math.max(14, Math.min(from.y, to.y, margin.top) - 30);
    const path = `M ${start.x} ${start.y} L ${routeX} ${start.y} L ${routeX} ${routeY} L ${end.x} ${routeY} L ${end.x} ${end.y}`;
    const labelX = (routeX + end.x) / 2;
    const labelY = routeY - 8;

    return `
      <path d="${path}" class="diagram-edge diagram-edge--loop" marker-end="url(#arrow)" />
      ${buildDiagramLabel(edge.label, labelX, labelY)}
    `;
  }

  const { start, end } = chooseForwardAnchors(from, to, boxWidth, boxHeight);
  const dx = end.x - start.x;
  const dy = end.y - start.y;
  let path;
  let labelX = (start.x + end.x) / 2;
  let labelY = (start.y + end.y) / 2 - 8;

  if (Math.abs(dx) < 8 || Math.abs(dy) < 8) {
    path = `M ${start.x} ${start.y} L ${end.x} ${end.y}`;
  } else if (Math.abs(dx) >= Math.abs(dy)) {
    const midX = start.x + dx / 2;
    path = `M ${start.x} ${start.y} C ${midX} ${start.y}, ${midX} ${end.y}, ${end.x} ${end.y}`;
  } else {
    const midY = start.y + dy / 2;
    path = `M ${start.x} ${start.y} C ${start.x} ${midY}, ${end.x} ${midY}, ${end.x} ${end.y}`;
  }

  return `
    <path d="${path}" class="diagram-edge" marker-end="url(#arrow)" />
    ${buildDiagramLabel(edge.label, labelX, labelY)}
  `;
}

function buildWrappedDiagramLayout(ids, edges, primaryPath) {
  const boxWidth = 216;
  const boxHeight = 74;
  const margin = { top: 78, right: 74, bottom: 76, left: 74 };
  const gapX = 94;
  const gapY = 82;
  const columns = ids.length <= 6 ? 3 : 4;
  const primarySet = new Set(primaryPath);
  const layoutOrder = [
    ...primaryPath,
    ...ids.filter((id) => !primarySet.has(id))
  ];
  const rows = Math.max(1, Math.ceil(layoutOrder.length / columns));
  const width = margin.left + margin.right + columns * boxWidth + Math.max(0, columns - 1) * gapX;
  const height = margin.top + margin.bottom + rows * boxHeight + Math.max(0, rows - 1) * gapY;
  const positions = new Map();

  layoutOrder.forEach((id, index) => {
    const row = Math.floor(index / columns);
    const itemInRow = index % columns;
    const reverse = row % 2 === 1;
    const col = reverse ? columns - 1 - itemInRow : itemInRow;

    positions.set(id, {
      x: margin.left + col * (boxWidth + gapX),
      y: margin.top + row * (boxHeight + gapY),
      row,
      col
    });
  });

  return { positions, width, height, boxWidth, boxHeight, margin, layoutOrder };
}

function buildLayeredDiagramLayout(ids, edges, direction, levels) {
  const boxWidth = 204;
  const boxHeight = 72;
  const margin = { top: 58, right: 64, bottom: 68, left: 64 };
  const gapX = 112;
  const gapY = 56;
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
    height = Math.max(300, margin.top + margin.bottom + maxRows * boxHeight + Math.max(0, maxRows - 1) * gapY);

    levelKeys.forEach((level, columnIndex) => {
      const group = grouped.get(level);
      const groupHeight = group.length * boxHeight + Math.max(0, group.length - 1) * gapY;
      const startY = Math.max(margin.top, (height - groupHeight) / 2);
      const x = margin.left + columnIndex * (boxWidth + gapX);

      group.forEach((id, rowIndex) => {
        positions.set(id, { x, y: startY + rowIndex * (boxHeight + gapY), row: rowIndex, col: columnIndex });
      });
    });
  } else {
    width = Math.max(880, margin.left + margin.right + maxRows * boxWidth + Math.max(0, maxRows - 1) * gapX);
    height = margin.top + margin.bottom + levelKeys.length * boxHeight + Math.max(0, levelKeys.length - 1) * gapY;

    levelKeys.forEach((level, rowIndex) => {
      const group = grouped.get(level);
      const groupWidth = group.length * boxWidth + Math.max(0, group.length - 1) * gapX;
      const startX = Math.max(margin.left, (width - groupWidth) / 2);
      const y = margin.top + rowIndex * (boxHeight + gapY);

      group.forEach((id, columnIndex) => {
        positions.set(id, { x: startX + columnIndex * (boxWidth + gapX), y, row: rowIndex, col: columnIndex });
      });
    });
  }

  const layoutOrder = ids.slice().sort((a, b) => {
    const aPosition = positions.get(a);
    const bPosition = positions.get(b);
    if ((aPosition?.row || 0) !== (bPosition?.row || 0)) return (aPosition?.row || 0) - (bPosition?.row || 0);
    return (aPosition?.col || 0) - (bPosition?.col || 0);
  });

  return { positions, width, height, boxWidth, boxHeight, margin, layoutOrder };
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
    const edge = parseDiagramEdge(line, nodes);
    if (edge) {
      edges.push(edge);
      return;
    }

    parseNodeToken(line, nodes);
  });

  const ids = Array.from(nodes.keys());
  if (!ids.length) {
    return `<pre class="md-code"><code>${escapeHtml(source)}</code></pre>`;
  }

  const levels = computeDiagramLevels(ids, edges);
  const layoutChoice = chooseDiagramLayoutMode(direction, ids, edges, levels);
  const layout = layoutChoice.mode === "wrapped-flow"
    ? buildWrappedDiagramLayout(ids, edges, layoutChoice.primaryPath)
    : buildLayeredDiagramLayout(ids, edges, direction, levels);

  const { positions, width, height, boxWidth, boxHeight, margin, layoutOrder } = layout;

  const pathHtml = edges.map((edge) => (
    renderDiagramEdge(edge, positions, layoutOrder, boxWidth, boxHeight, width, height, margin)
  )).join("");

  const nodeHtml = ids.map((id) => {
    const position = positions.get(id);
    if (!position) return "";
    const centerX = position.x + boxWidth / 2;
    const centerY = position.y + boxHeight / 2;

    return `
      <g class="diagram-node">
        <rect x="${position.x}" y="${position.y}" width="${boxWidth}" height="${boxHeight}" rx="18" />
        ${renderDiagramNodeText(nodes.get(id), centerX, centerY, boxWidth)}
      </g>
    `;
  }).join("");

  return `
    <figure class="diagram-card diagram-card--${layoutChoice.mode}">
      <svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Rendered Markdown diagram">
        <defs>
          <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
            <path d="M0,0 L0,6 L9,3 z" class="diagram-arrow" />
          </marker>
        </defs>
        <g class="diagram-edge-layer">${pathHtml}</g>
        <g class="diagram-node-layer">${nodeHtml}</g>
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

function uniqueValues(values) {
  return [...new Set(values.filter(Boolean))];
}

function buildArticleFetchCandidates(meta) {
  const file = String(meta?.file || "").trim();
  const slug = String(meta?.slug || "").trim();
  const slugFile = slug ? `articles/${slug}.md` : "";
  const normalizedFile = file.replace(/^\.\//, "").replace(/^\//, "");
  const normalizedSlugFile = slugFile.replace(/^\.\//, "").replace(/^\//, "");

  return uniqueValues([
    normalizedFile,
    normalizedSlugFile,
    `./${normalizedFile}`,
    `./${normalizedSlugFile}`
  ]);
}

async function fetchArticleMarkdown(meta) {
  const candidates = buildArticleFetchCandidates(meta);
  const attempts = [];

  for (const path of candidates) {
    try {
      const url = new URL(path, window.location.href);
      url.searchParams.set("v", String(Date.now()));
      const response = await fetch(url.toString(), { cache: "reload" });
      attempts.push(`${path} → HTTP ${response.status}`);

      if (response.ok) {
        return { markdown: await response.text(), attempts, usedFallback: false };
      }
    } catch (error) {
      attempts.push(`${path} → ${error?.message || "fetch failed"}`);
    }
  }

  const embedded = embeddedArticleMarkdown[String(meta?.slug || "")];
  if (embedded) {
    attempts.push("embedded fallback → used");
    return { markdown: embedded, attempts, usedFallback: true };
  }

  const error = new Error("Article Markdown file could not be loaded");
  error.attempts = attempts;
  throw error;
}

async function loadArticle(meta) {
  if (!meta) return;

  articleMount.innerHTML = `<div class="article-loading">Loading ${escapeHtml(meta.title)}…</div>`;

  try {
    const result = await fetchArticleMarkdown(meta);
    renderArticle(result.markdown, meta);

    if (result.usedFallback) {
      const body = articleMount.querySelector(".markdown-article__body");
      if (body) {
        const note = document.createElement("aside");
        note.className = "article-inline-warning";
        note.innerHTML = `
          <strong>Rendered from embedded fallback.</strong>
          <span>The live Markdown file was not reachable from this deployed page. Upload <code>${escapeHtml(meta.file || `articles/${meta.slug}.md`)}</code> to the same GitHub Pages branch so future edits load from the Markdown file directly.</span>
        `;
        body.prepend(note);
      }
    }
  } catch (error) {
    const attempts = Array.isArray(error.attempts) ? error.attempts : [];
    articleMount.innerHTML = `
      <div class="article-empty-state">
        <p class="section-kicker">Markdown file not reachable</p>
        <h2>Could not load the Markdown file.</h2>
        <p>
          The article list loaded successfully, but the selected Markdown file is missing or unreachable from the deployed site.
          Confirm this file exists in the repository at <code>${escapeHtml(meta.file || `articles/${meta.slug}.md`)}</code>.
        </p>
        ${attempts.length ? `<div class="article-fetch-debug"><strong>Fetch attempts</strong><pre class="md-code"><code>${escapeHtml(attempts.join("\n"))}</code></pre></div>` : ""}
        <p>For local preview, run <code>python -m http.server 8000</code> and open <code>http://localhost:8000/articles.html?article=${escapeHtml(meta.slug)}</code>.</p>
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
