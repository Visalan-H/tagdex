# Tagdex

Every HTML element arranged like the periodic table. Each tile opens a specimen card with a live demo of the element.
Live at [tagdex.visalan.me](https://tagdex.visalan.me).

## Run it

```bash
npm install
npm run dev
```

| Script                 | What it does                                            |
| ---------------------- | ------------------------------------------------------- |
| `npm run dev`          | Starts the dev server on port 4321.                     |
| `npm run build`        | Type-checks with `astro check`, then builds to `dist/`. |
| `npm run preview`      | Serves the built site.                                  |
| `npm run format`       | Formats everything with Prettier.                       |
| `npm run format:check` | Fails if any file is unformatted. Use it in CI.         |

## Stack

- **Astro 7** renders every page to static HTML. The table works without JavaScript; scripts only add search, filters,
  keyboard navigation and the dialog.
- **Tailwind CSS 4** handles styling. Theme tokens live in `src/styles/starwind.css` and `src/styles/global.css`.
- **Starwind UI** supplies the dialog, toggle group, input, button, badge and kbd components. They are copied into
  `src/components/starwind/` and owned by this repo, shadcn style. Update them with `npx starwind@latest update`.

## Structure

```text
src/
  components/
    periodic/        The table: tiles, hover preview, search, family filter, key
    specimen/        The specimen card and the dialog that shows it
    starwind/        Generated UI components. Edit through the Starwind CLI where possible.
    Masthead.astro
  data/
    elements.json    Source of truth for every element
    usage.json       Real usage numbers from the 2024 Web Almanac, with source
  layouts/           Page shell: head tags, fonts, skip link
  lib/
    elements.ts          Typed collection helpers
    periodic-layout.ts   Turns families into grid positions
    specimen-demos.ts    Hand-written demo HTML for each element
  pages/
    index.astro          The table
    elements/[tag].astro One static page per element
  scripts/           Client-side enhancements, one concern per file
  styles/            Global tokens, Starwind theme, demo styles
  content.config.ts  Zod schema that validates elements.json at build time
```

## Conventions

- **Data drives everything.** Add or edit an element in `src/data/elements.json` and the table, card and page update.
  The schema in `content.config.ts` fails the build on a bad family, symbol or version.
- **Each family fills whole columns.** Column heights live in `BANDS` in `periodic-layout.ts`. If a family grows, the
  build throws until the heights add up again.
- **Element numbers follow table order.** They run down each column, left to right. Renumber when you move a family.
- **One card, two homes.** `SpecimenCard.astro` renders inside the dialog and on `/elements/[tag]/`. Change it once.
- **Theme is a `.dark` class on `<html>`.** An inline script in `BaseLayout` sets it before paint from the saved
  choice or the system setting. `src/scripts/theme.ts` runs the toggle button.
- **Colors come from `data-family`.** Any element with that attribute gets `--fill` for its family.
- **Obsolete elements fake their look.** Tiles never render a real `<font>` or `<marquee>`, so the page stays valid HTML.

## URLs

- `/#dialog` opens the dialog card.
- `/?family=form` highlights one family.
- `/?q=dia` runs a search.
- `/elements/dialog/` is the standalone page.
