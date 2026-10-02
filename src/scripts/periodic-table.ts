// Enhances the static table: hover preview, search, family filter and arrow-key
// navigation. Without JavaScript every tile is still a plain link.

const board = document.querySelector<HTMLElement>("[data-board]");
const preview = document.querySelector<HTMLElement>("[data-preview]");
const search = document.querySelector<HTMLInputElement>("[data-element-search]");
const searchStatus = document.querySelector<HTMLElement>("[data-search-status]");
const filter = document.querySelector<HTMLElement>("[data-family-filter]");

if (board) {
  const tiles = [...board.querySelectorAll<HTMLLIElement>("li[data-tag]")];
  const linkOf = (tile: HTMLElement) => tile.querySelector<HTMLAnchorElement>("a[data-tile]")!;
  const byPosition = new Map(tiles.map((tile) => [`${tile.dataset.row},${tile.dataset.col}`, tile]));

  // --- Preview ---------------------------------------------------------------
  function showPreview(tile: HTMLElement) {
    if (!preview) return;
    const d = tile.dataset;
    preview.dataset.family = d.family;
    const set = (field: string, value: string) => {
      preview.querySelector(`[data-field="${field}"]`)!.textContent = value;
    };
    set("n", d.n!);
    set("symbol", d.symbol!);
    set("tag", `<${d.tag}>`);
    set("name", d.name!);
    set("summary", d.summary!);
  }

  for (const type of ["pointerover", "focusin"]) {
    board.addEventListener(type, (event) => {
      const tile = (event.target as Element).closest<HTMLElement>("li[data-tag]");
      if (tile) showPreview(tile);
    });
  }

  // --- Search and family filter ---------------------------------------------
  let query = "";
  let family: string | null = null;

  // Search and filter live in the query string so a view can be shared.
  function syncUrl() {
    const url = new URL(location.href);
    for (const [key, value] of [
      ["q", query],
      ["family", family],
    ] as const) {
      if (value) url.searchParams.set(key, value);
      else url.searchParams.delete(key);
    }
    history.replaceState(history.state, "", url);
  }

  function applyDimming() {
    let matches = 0;
    for (const tile of tiles) {
      const hit = (!family || tile.dataset.family === family) && (!query || tile.dataset.search!.includes(query));
      tile.toggleAttribute("data-dimmed", !hit);
      if (hit) matches++;
    }
    if (searchStatus) {
      searchStatus.textContent = !query
        ? ""
        : matches === 0
          ? `Nothing matches “${query}”. Try a tag name, like dialog.`
          : `${matches} ${matches === 1 ? "match" : "matches"}. Press Enter to open the first.`;
    }
    syncUrl();
  }

  const firstMatch = () => tiles.find((tile) => !tile.hasAttribute("data-dimmed"));

  search?.addEventListener("input", () => {
    query = search.value.trim().toLowerCase();
    applyDimming();
  });

  search?.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      const tile = firstMatch();
      if (tile) linkOf(tile).click();
    } else if (event.key === "Escape" && search.value) {
      event.preventDefault();
      search.value = "";
      query = "";
      applyDimming();
    }
  });

  document.addEventListener("keydown", (event) => {
    const target = event.target as HTMLElement;
    const typing = target.closest("input, textarea, select, [contenteditable]");
    if (event.key === "/" && !typing && !event.metaKey && !event.ctrlKey) {
      event.preventDefault();
      search?.focus();
    }
  });

  filter?.addEventListener("click", () => {
    // Read pressed state after Starwind updates it.
    queueMicrotask(() => {
      const pressed = filter.querySelector<HTMLElement>('[aria-pressed="true"]');
      family = pressed?.dataset.family ?? null;
      applyDimming();
    });
  });

  const params = new URLSearchParams(location.search);
  const initialQuery = params.get("q");
  if (search && initialQuery) {
    search.value = initialQuery;
    query = initialQuery.trim().toLowerCase();
  }
  // Pressing the chip lets Starwind own its pressed state; the click handler above does the rest.
  const initialFamily = params.get("family");
  if (initialFamily) filter?.querySelector<HTMLElement>(`[data-family="${CSS.escape(initialFamily)}"]`)?.click();
  else if (query) applyDimming();

  // --- Arrow keys move between tiles (roving tab stop) ------------------------
  const STEP: Record<string, [number, number]> = {
    ArrowUp: [-1, 0],
    ArrowDown: [1, 0],
    ArrowLeft: [0, -1],
    ArrowRight: [0, 1],
  };

  function setTabStop(tile: HTMLElement) {
    for (const t of tiles) linkOf(t).tabIndex = t === tile ? 0 : -1;
  }
  setTabStop(tiles[0]);

  board.addEventListener("focusin", (event) => {
    const tile = (event.target as Element).closest<HTMLElement>("li[data-tag]");
    if (tile) setTabStop(tile);
  });

  board.addEventListener("keydown", (event) => {
    const step = STEP[event.key];
    const tile = (event.target as Element).closest<HTMLElement>("li[data-tag]");
    if (!step || !tile) return;
    event.preventDefault();
    let row = Number(tile.dataset.row);
    let col = Number(tile.dataset.col);
    // Walk past empty cells until a tile turns up or we run off the board.
    for (let i = 0; i < 20; i++) {
      row += step[0];
      col += step[1];
      const next = byPosition.get(`${row},${col}`);
      if (next) {
        linkOf(next).focus();
        return;
      }
    }
  });
}
