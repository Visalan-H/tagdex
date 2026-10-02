// Live demos shown in the specimen card. Each value is trusted, hand-written HTML.
// Elements without a visual get a short code sample instead.

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const code = (s: string) => `<pre class="d-code"><code>${esc(s.trim())}</code></pre>`;

const LANDMARKS = ["header", "nav", "main", "aside", "article", "section", "search", "footer"];

function landmarkMap(active: string) {
  const box = (tag: string, cls = "") =>
    `<div class="lm lm-${tag} ${cls} ${tag === active ? "is-on" : ""}"><span>${tag}</span></div>`;
  return `<div class="d-landmarks">
    ${box("header")}
    ${box("nav")}
    <div class="lm-row">
      <div class="lm lm-main ${active === "main" ? "is-on" : ""}"><span>main</span>
        ${box("search")}
        <div class="lm-pair">${box("article")}${box("section")}</div>
      </div>
      ${box("aside")}
    </div>
    ${box("footer")}
  </div>`;
}

function elementTable(active: string) {
  const on = (tag: string) => (tag === active ? ` class="is-on"` : "");
  return `<table class="d-table">
    <caption${on("caption")}>Lightest elements</caption>
    <colgroup${on("colgroup")}><col${on("col")}><col></colgroup>
    <thead${on("thead")}><tr><th scope="col"${on("th")}>Symbol</th><th scope="col">Name</th></tr></thead>
    <tbody${on("tbody")}>
      <tr${on("tr")}><td${on("td")}>H</td><td>Hydrogen</td></tr>
      <tr><td>He</td><td>Helium</td></tr>
    </tbody>
    <tfoot${on("tfoot")}><tr><td colspan="2">2 of 118</td></tr></tfoot>
  </table>`;
}

const ATOM = `<svg viewBox="0 0 120 120" width="120" height="120" role="img" aria-label="An atom">
  <g fill="none" stroke="currentColor" stroke-width="3">
    <ellipse cx="60" cy="60" rx="52" ry="18"/>
    <ellipse cx="60" cy="60" rx="52" ry="18" transform="rotate(60 60 60)"/>
    <ellipse cx="60" cy="60" rx="52" ry="18" transform="rotate(120 60 60)"/>
  </g>
  <circle cx="60" cy="60" r="9" fill="currentColor"/>
</svg>`;
const ATOM_URL = `data:image/svg+xml,${encodeURIComponent(ATOM.replace("<svg", '<svg xmlns="http://www.w3.org/2000/svg"'))}`;

export const DEMOS: Record<string, string> = {
  html: code(`<!doctype html>\n<html lang="en">\n  <head>…</head>\n  <body>…</body>\n</html>`),
  head: code(`<head>\n  <meta charset="utf-8">\n  <title>Tagdex</title>\n</head>`),
  body: code(`<body>\n  <h1>Everything you see lives here</h1>\n</body>`),
  title: `<div class="d-tab"><span class="d-tab-dot"></span>Tagdex | Every HTML element<span class="d-tab-x">×</span></div>`,
  base: code(`<base href="https://tagdex.visalan.me/">\n<a href="elements/div/">resolves against base</a>`),
  link: code(`<link rel="stylesheet" href="/styles.css">\n<link rel="icon" href="/favicon.svg">\n<link rel="preload" as="font" href="/font.woff2" crossorigin>`),
  meta: code(`<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1">\n<meta name="description" content="Every HTML element.">`),
  style: `<style>.d-styled { color: oklch(55% 0.25 330); font-weight: 800; }</style><p class="d-styled">This text is styled by a style element inside the demo.</p>`,

  h1: `<h1 class="d-h">Heading 1</h1>`,
  h2: `<h2 class="d-h">Heading 2</h2>`,
  h3: `<h3 class="d-h">Heading 3</h3>`,
  h4: `<h4 class="d-h">Heading 4</h4>`,
  h5: `<h5 class="d-h">Heading 5</h5>`,
  h6: `<h6 class="d-h">Heading 6</h6>`,
  hgroup: `<hgroup><h3 class="d-h">Tagdex</h3><p>Every HTML element, in one table</p></hgroup>`,
  address: `<address>Written by <a href="mailto:ada@example.com">Ada Lovelace</a><br>London</address>`,

  p: `<p>A paragraph holds one idea.</p><p>A new idea gets a new paragraph.</p>`,
  hr: `<p>The ship sank at midnight.</p><hr><p>Three days later, a bottle washed ashore.</p>`,
  pre: `<pre class="d-pre">  /\\_/\\
 ( o.o )  spaces stay
  > ^ <   exactly put</pre>`,
  blockquote: `<figure><blockquote><p>Simplicity is prerequisite for reliability.</p></blockquote><figcaption>Edsger Dijkstra</figcaption></figure>`,
  ol: `<ol><li>Open the tag</li><li>Add content</li><li>Close the tag</li></ol>`,
  ul: `<ul><li>Hydrogen</li><li>Helium</li><li>Lithium</li></ul>`,
  menu: `<menu class="d-menu"><li><button type="button">Cut</button></li><li><button type="button">Copy</button></li><li><button type="button">Paste</button></li></menu>`,
  li: `<ul><li>I am a list item</li><li>So am I</li></ul>`,
  dl: `<dl class="d-dl"><dt>Symbol</dt><dd>Dv</dd><dt>Family</dt><dd>Grouping</dd></dl>`,
  dt: `<dl class="d-dl"><dt>Void element</dt><dd>An element that takes no children.</dd></dl>`,
  dd: `<dl class="d-dl"><dt>Void element</dt><dd>An element that takes no children.</dd></dl>`,
  figure: `<figure class="d-figure">${ATOM}<figcaption>Fig. 1. An atom, roughly.</figcaption></figure>`,
  figcaption: `<figure class="d-figure">${ATOM}<figcaption>I am the caption.</figcaption></figure>`,
  div: `<div class="d-divs"><div>div</div><div>div<div>div</div></div><div>div</div></div>`,

  picture: `<picture><source srcset="${ATOM_URL}" type="image/svg+xml"><img src="${ATOM_URL}" alt="An atom" width="100" height="100"></picture>`,
  source: `<picture><source srcset="${ATOM_URL}" type="image/svg+xml"><img src="${ATOM_URL}" alt="An atom" width="100" height="100"></picture>`,
  img: `<img src="${ATOM_URL}" alt="An atom" width="100" height="100">`,
  iframe: `<iframe class="d-iframe" title="Demo frame" srcdoc="<body style='font:16px system-ui;margin:12px'>Hello from a whole other document.</body>"></iframe>`,
  embed: `<embed src="${ATOM_URL}" type="image/svg+xml" width="100" height="100">`,
  object: `<object data="${ATOM_URL}" type="image/svg+xml" width="100" height="100">Fallback text</object>`,
  video: `<video controls width="260" poster="${ATOM_URL}" aria-label="Video player with no source"></video>`,
  audio: `<audio controls aria-label="Audio player with no source"></audio>`,
  track: code(`<video src="talk.mp4" controls>\n  <track kind="captions" src="talk.vtt"\n         srclang="en" label="English" default>\n</video>`),
  map: code(`<img src="planets.png" usemap="#planets" alt="Planets">\n<map name="planets">\n  <area shape="circle" coords="90,58,3"\n        href="mercury.html" alt="Mercury">\n</map>`),
  area: code(`<map name="planets">\n  <area shape="rect" coords="0,0,82,126"\n        href="sun.html" alt="Sun">\n</map>`),
  svg: ATOM,
  math: `<math display="block" class="d-math"><mi>E</mi><mo>=</mo><mi>m</mi><msup><mi>c</mi><mn>2</mn></msup></math>`,

  a: `<p>Go read the <a href="https://html.spec.whatwg.org/">HTML spec</a>. Or don't.</p>`,
  em: `<p>I <em>said</em> close the tag.</p>`,
  strong: `<p><strong>Warning:</strong> the stove is hot.</p>`,
  small: `<p>Free forever.<br><small>Terms and conditions apply.</small></p>`,
  s: `<p>Price: <s>$40</s> $25</p>`,
  cite: `<p>My favorite book is <cite>The Pragmatic Programmer</cite>.</p>`,
  q: `<p>She said <q>close your tags</q> and left.</p>`,
  dfn: `<p>A <dfn>void element</dfn> is one that takes no children.</p>`,
  abbr: `<p>Written in <abbr title="HyperText Markup Language">HTML</abbr>. Hover it.</p>`,
  ruby: `<p class="d-ruby"><ruby>漢<rp>(</rp><rt>kan</rt><rp>)</rp>字<rp>(</rp><rt>ji</rt><rp>)</rp></ruby></p>`,
  rt: `<p class="d-ruby"><ruby>東<rt>tō</rt>京<rt>kyō</rt></ruby></p>`,
  rp: `<p class="d-ruby"><ruby>明<rp>(</rp><rt>mei</rt><rp>)</rp></ruby></p>`,
  data: `<p>Product: <data value="SKU-0042">Mechanical keyboard</data></p>`,
  time: `<p>Launch: <time datetime="2026-10-02">2 October 2026</time></p>`,
  code: `<p>Call <code>dialog.showModal()</code> to open it.</p>`,
  var: `<p>The area is <var>w</var> × <var>h</var>.</p>`,
  samp: `<p>The terminal said <samp>command not found</samp>.</p>`,
  kbd: `<p>Copy with <kbd><kbd>Ctrl</kbd> + <kbd>C</kbd></kbd></p>`,
  sub: `<p class="d-big">H<sub>2</sub>O</p>`,
  sup: `<p class="d-big">E = mc<sup>2</sup></p>`,
  i: `<p>We sailed on the <i>Endeavour</i>, <i lang="fr">bon voyage</i>.</p>`,
  b: `<p>Add <b>flour</b>, <b>sugar</b> and <b>eggs</b>.</p>`,
  u: `<p>I cant <u class="d-squiggle">spel</u> today.</p>`,
  mark: `<p>Search results for "tag": the <mark>tag</mark> opened, the <mark>tag</mark> closed.</p>`,
  bdi: `<ul><li><bdi>إيان</bdi>: 3 posts</li><li><bdi>Ada</bdi>: 5 posts</li></ul>`,
  bdo: `<p><bdo dir="rtl">This text runs backwards.</bdo></p>`,
  span: `<p>Only <span class="d-span">this part</span> is special.</p>`,
  br: `<p>Roses are red<br>Tags close with a slash<br>Forget one and watch<br>Your layout go crash</p>`,
  wbr: `<p class="d-narrow">https://example.com/<wbr>really/<wbr>long/<wbr>path/<wbr>that/<wbr>wraps</p>`,
  ins: `<p>The meeting is on <del>Tuesday</del> <ins>Wednesday</ins>.</p>`,
  del: `<p>The meeting is on <del>Tuesday</del> <ins>Wednesday</ins>.</p>`,

  form: `<form class="d-form" onsubmit="event.preventDefault();this.querySelector('output').value='Sent!'"><label>Email <input type="email" placeholder="you@example.com" required></label><button>Subscribe</button><output></output></form>`,
  label: `<label class="d-row"><input type="checkbox"> Click this text, not just the box</label>`,
  input: `<div class="d-stack"><input type="text" placeholder="text" aria-label="Text"><input type="range" aria-label="Range"><div class="d-row"><input type="color" value="#ff5cad" aria-label="Color"><input type="date" aria-label="Date"></div></div>`,
  button: `<button type="button" class="d-press" onclick="this.textContent = 'Clicked ' + (+this.dataset.c++ + 1) + ' times'" data-c="0">Press me</button>`,
  select: `<select aria-label="Element"><option>div</option><option>span</option><option>marquee</option></select>`,
  datalist: `<input list="d-elements" placeholder="Type an element" aria-label="Element"><datalist id="d-elements"><option value="div"><option value="dialog"><option value="details"><option value="datalist"></datalist>`,
  optgroup: `<select aria-label="Element"><optgroup label="Living"><option>div</option><option>span</option></optgroup><optgroup label="Obsolete"><option>blink</option><option>marquee</option></optgroup></select>`,
  option: `<select aria-label="Element"><option>I am an option</option><option>So am I</option></select>`,
  textarea: `<textarea rows="3" class="d-textarea" aria-label="Notes">Type here. I grow.</textarea>`,
  output: `<form class="d-row" oninput="this.o.value = +this.a.value + +this.b.value"><input name="a" type="number" value="2" aria-label="First number"> + <input name="b" type="number" value="3" aria-label="Second number"> = <output name="o">5</output></form>`,
  progress: `<label class="d-stack">Uploading… <progress value="64" max="100">64%</progress></label><label class="d-stack">Thinking… <progress></progress></label>`,
  meter: `<div class="d-stack"><label>Disk <meter value="0.3" low="0.6" high="0.85" optimum="0.1">30%</meter></label><label>Disk <meter value="0.92" low="0.6" high="0.85" optimum="0.1">92%</meter></label></div>`,
  fieldset: `<fieldset><legend>Favorite element</legend><label class="d-row"><input type="radio" name="fav" checked> div</label><label class="d-row"><input type="radio" name="fav"> dialog</label></fieldset>`,
  legend: `<fieldset><legend>I am the legend</legend><label class="d-row"><input type="checkbox"> Option</label></fieldset>`,
  selectedcontent: code(`<select>\n  <button><selectedcontent></selectedcontent></button>\n  <option>🍎 Apple</option>\n  <option>🍌 Banana</option>\n</select>`),

  details: `<details class="d-details" open><summary>What is a void element?</summary><p>One that takes no children, like br or img.</p></details><details class="d-details"><summary>Click me too</summary><p>Hello.</p></details>`,
  summary: `<details class="d-details"><summary>I am the summary. Click me.</summary><p>Peekaboo.</p></details>`,
  dialog: `<div class="d-dialog-wrap"><dialog open class="d-dialog"><p>I am a dialog. You are inside one right now.</p><button type="button" onclick="this.closest('dialog').close()">Close</button></dialog></div>`,

  script: code(`<script type="module">\n  document.title = "Hello";\n</script>`),
  noscript: code(`<noscript>\n  This site works better with JavaScript.\n</noscript>`),
  template: code(`<template id="row">\n  <li class="item"></li>\n</template>\n<script>\n  const li = row.content.cloneNode(true);\n</script>`),
  slot: code(`<!-- inside a web component's shadow root -->\n<h2><slot name="title">Default title</slot></h2>`),
  canvas: `<canvas class="d-canvas" width="240" height="90" aria-label="Drawn circles" data-draw></canvas>`,

  marquee: `<div class="d-marquee"><span>Welcome to my homepage!!! You are visitor #000042</span></div>`,
  blink: `<p class="d-blink">NEW!</p>`,
  center: `<p style="text-align:center">Everything was centered in 1999.</p>`,
  font: `<p class="d-font">Under construction</p>`,
  big: `<p>Normal, <span style="font-size:1.2em">big</span>, <span style="font-size:1.44em">bigger</span>.</p>`,
  strike: `<p><s>Old way</s>, new way.</p>`,
  tt: `<p>Type <span style="font-family:'Courier New',monospace">teletype</span> here.</p>`,
  frameset: `<div class="d-frames"><div>nav.html</div><div>content.html</div></div>`,
  frame: `<div class="d-frames"><div>nav.html</div><div>content.html</div></div>`,
  xmp: `<pre class="d-code"><code>&lt;b&gt;xmp showed this raw&lt;/b&gt;</code></pre>`,
  plaintext: `<pre class="d-code"><code>Everything after &lt;plaintext&gt;
is text. &lt;/plaintext&gt; does not exist.</code></pre>`,
};

for (const tag of LANDMARKS) DEMOS[tag] = landmarkMap(tag);
for (const tag of ["table", "caption", "colgroup", "col", "thead", "tbody", "tfoot", "tr", "td", "th"]) {
  DEMOS[tag] = elementTable(tag);
}

export function demoFor(tag: string, replacement?: string) {
  if (DEMOS[tag]) return DEMOS[tag];
  if (replacement) return `<p class="d-retired">Retired. Use <strong>${esc(replacement)}</strong> instead.</p>`;
  return code(`<${tag}>…</${tag}>`);
}
