// Opens the shared Starwind dialog with the specimen card for a clicked tile.
// The URL hash names the open element, so a link like /#dialog opens it.
import { createDialog } from "@starwind-ui/runtime/dialog";
import { drawSpecimens } from "./draw-specimens";

const root = document.getElementById("specimen-dialog");
const popup = document.querySelector<HTMLElement>("[data-specimen-popup]");
const slot = document.querySelector<HTMLElement>("[data-specimen-slot]");

if (root && popup && slot) {
  // Starwind keeps one controller per root, so this returns the one it made.
  const dialog = createDialog(root);

  function open(tag: string, trigger?: Element) {
    const template = document.getElementById(`specimen-${tag}`);
    if (!(template instanceof HTMLTemplateElement)) return;

    slot!.replaceChildren(template.content.cloneNode(true));
    const card = slot!.querySelector<HTMLElement>("article")!;
    // Starwind links the title once at startup, so point it at this card's heading.
    popup!.setAttribute("aria-labelledby", card.dataset.titleId!);
    popup!.setAttribute("aria-describedby", card.dataset.summaryId!);
    drawSpecimens(slot!);

    dialog.setOpen(true, { reason: "imperative-action", trigger });
    popup!.scrollTop = 0;
    history.replaceState(null, "", `#${tag}`);
  }

  dialog.subscribe("closeComplete", () => {
    slot.replaceChildren();
    history.replaceState(null, "", location.pathname + location.search);
  });

  document.addEventListener("click", (event) => {
    const link = (event.target as Element).closest<HTMLAnchorElement>("a[data-tile]");
    if (!link || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
    const tag = link.closest<HTMLElement>("[data-tag]")?.dataset.tag;
    if (!tag) return;
    event.preventDefault();
    open(tag, link);
  });

  const initial = decodeURIComponent(location.hash.slice(1));
  if (initial) open(initial);
}
