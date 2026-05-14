const CSS = [

`/* Selectors — how to target HTML elements */

/* Element selector: targets ALL <p> tags on the page */
p {
  color: #333;        /* text color */
  line-height: 1.6;   /* space between lines */
}

/* Class selector: targets elements with class="card" */
.card {
  background: white;
  border-radius: 8px; /* rounded corners */
  padding: 16px;      /* inner spacing on all 4 sides */
}

/* ID selector: targets the single element with id="header" */
/* IDs must be unique per page */
#header {
  position: fixed;    /* stays at the top while scrolling */
  top: 0;
  width: 100%;
}

/* Descendant: targets <a> that is INSIDE a .nav element */
.nav a {
  text-decoration: none;  /* remove underline from links */
}

/* Child (>): targets DIRECT children only */
.menu > li {
  list-style: none;   /* remove bullet points */
}

/* Pseudo-class: applies when the user hovers */
a:hover {
  color: #0066cc;
}

/* Pseudo-element: styles only the first line of a <p> */
p::first-line {
  font-weight: bold;
}`,

`/* The Box Model */
/* Every element is a rectangular box with 4 layers:
   content -> padding -> border -> margin               */

.box {
  /* Content area: the actual width/height of the element */
  width:  200px;
  height: 100px;

  /* Padding: space INSIDE the border (between content and border) */
  /* Four sides at once: top right bottom left (clockwise) */
  padding: 16px 24px 16px 24px;
  /* Shorthand: padding: 16px 24px;  (top/bottom 16px, left/right 24px) */

  /* Border: a visible line around the padding area */
  border: 2px solid #ccc;
  /* border: width style color */

  /* Margin: space OUTSIDE the border (between this box and others) */
  margin: 20px auto;
  /* auto for left/right: centers the element horizontally */

  /* box-sizing: border-box makes width/height include padding + border */
  /* Without it, a 200px element with 24px padding would be 248px wide */
  box-sizing: border-box;

  background-color: #f5f5f5;
}`,

`/* Display & Positioning */

/* display: controls how the element participates in layout */
.block-element {
  display: block;   /* takes full width, stacks vertically */
}

.inline-element {
  display: inline; /* sits in text flow, respects only left/right margin */
}

.inline-block {
  display: inline-block; /* inline flow + respects width/height/margin */
}

.hidden {
  display: none;   /* completely removed from layout and accessibility tree */
}

/* position: how the element is placed in the document */
.relative {
  position: relative;  /* stays in flow; children positioned relative to it */
  top: 10px;           /* offset 10px from its normal position */
}

.absolute {
  position: absolute;  /* removed from flow; positioned relative to nearest
                          non-static ancestor */
  top:  20px;
  right: 20px;
}

.fixed {
  position: fixed;     /* positioned relative to the viewport; stays on scroll */
  bottom: 16px;
  right:  16px;
}

.sticky {
  position: sticky;    /* acts like relative until scroll reaches threshold */
  top: 0;              /* sticks to top of viewport when scrolled past */
}`,

`/* Flexbox — one-dimensional layout (row OR column) */

.container {
  display: flex;              /* turn on flexbox for this element */
  flex-direction: row;        /* main axis: left to right (default) */
  /* flex-direction: column; would stack items top to bottom */

  justify-content: space-between;
  /* justify-content controls alignment on the MAIN axis */
  /* Options: flex-start | flex-end | center | space-between | space-around */

  align-items: center;
  /* align-items controls alignment on the CROSS axis */
  /* Options: flex-start | flex-end | center | stretch | baseline */

  flex-wrap: wrap;
  /* wrap: items move to next line if they don't fit */
  /* nowrap (default): items shrink to fit in one line */

  gap: 16px;
  /* gap: space between items (replaces margin hacks) */
}

.item {
  flex: 1;
  /* flex: 1 is shorthand for flex-grow: 1, flex-shrink: 1, flex-basis: 0 */
  /* All items with flex: 1 share the available space equally */
}

.item-large {
  flex: 2;
  /* This item gets twice as much space as flex: 1 items */
}`,

`/* CSS Grid — two-dimensional layout (rows AND columns) */

.grid-container {
  display: grid;

  /* Define 3 columns: 200px fixed, flexible, flexible */
  grid-template-columns: 200px 1fr 1fr;
  /* 1fr = one fraction of the remaining space */

  /* Define 2 rows, each 100px tall */
  grid-template-rows: 100px 100px;

  /* repeat(n, size): shorthand for repeated tracks */
  /* grid-template-columns: repeat(3, 1fr); creates 3 equal columns */

  gap: 16px;  /* space between grid cells */
}

.grid-item {
  background: #e0e0e0;
  padding: 16px;
}

/* span: make an item occupy multiple cells */
.header-item {
  grid-column: 1 / -1;
  /* 1 / -1 means: start at column line 1, end at the last column line */
  /* The element spans the full width */
}

.sidebar {
  grid-column: 1;
  grid-row: 1 / 3;
  /* Spans from row line 1 to row line 3 (two rows tall) */
}

/* auto-fill + minmax: responsive grid without media queries */
.auto-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  /* Each column is at least 200px, at most 1fr */
  /* auto-fill adds as many columns as fit */
}`,

`/* Typography */

body {
  /* font-family: list fonts in preference order */
  /* The browser uses the first one it finds installed */
  font-family: 'Inter', 'Helvetica Neue', Arial, sans-serif;

  font-size:   16px;   /* base font size for the page */
  line-height: 1.6;    /* 1.6 × font-size = comfortable reading space */
  color:       #1a1a1a;
}

h1 {
  font-size:      2rem;     /* rem: relative to root font-size (16px × 2 = 32px) */
  font-weight:    700;      /* 100=thin, 400=normal, 700=bold, 900=black */
  letter-spacing: -0.02em;  /* negative: tighten letters (common for large text) */
  line-height:    1.2;      /* headings usually look better with tighter lines */
  margin-bottom:  0.5em;    /* em: relative to this element's font-size */
}

p {
  max-width:     65ch;      /* ch: width of the "0" character — limits line length */
  /* ~65 characters per line is considered ideal for reading */
  margin-bottom: 1em;
}

/* text-transform: change capitalisation without editing HTML */
.label {
  text-transform: uppercase;
  letter-spacing: 0.1em;    /* uppercase text often needs extra spacing */
  font-size:      0.75rem;
}`,

`/* Colors & Backgrounds */

.box {
  /* Named color */
  color: white;

  /* Hex: #RRGGBB or #RGB (shorthand) */
  background-color: #1a1a2e;

  /* rgb(red, green, blue) — values 0-255 */
  border-color: rgb(100, 200, 255);

  /* rgba: like rgb, plus alpha (opacity) 0.0-1.0 */
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
  /* box-shadow: x-offset y-offset blur spread color */

  /* hsl(hue, saturation, lightness) — intuitive for color design */
  /* Hue: 0-360 (red=0, green=120, blue=240) */
  /* Saturation: 0%=gray, 100%=vivid */
  /* Lightness: 0%=black, 50%=normal, 100%=white */
  outline: 2px solid hsl(220, 90%, 60%);
}

/* Linear gradient: color transition in a direction */
.gradient-bg {
  background: linear-gradient(135deg, #0f0c29, #302b63, #24243e);
  /* 135deg: direction; colors listed left to right along that axis */
}

/* Background image */
.hero {
  background-image:    url('hero.jpg');
  background-size:     cover;    /* scale to cover the entire element */
  background-position: center;   /* center the image */
  background-repeat:   no-repeat;
}`,

`/* Transitions & Animations */

/* transition: smoothly animate a property when it changes */
.button {
  background-color: #333;
  color:            white;
  padding:          10px 20px;
  border:           none;
  border-radius:    4px;
  cursor:           pointer;

  /* Syntax: property duration timing-function delay */
  transition: background-color 0.2s ease, transform 0.15s ease;
  /* ease: slow start, fast middle, slow end (most natural) */
  /* linear: constant speed */
}

.button:hover {
  background-color: #555;
  transform: translateY(-2px);  /* move 2px upward on hover */
}

/* @keyframes: define an animation sequence */
@keyframes fadeIn {
  from {
    opacity:   0;
    transform: translateY(10px);  /* start 10px below */
  }
  to {
    opacity:   1;
    transform: translateY(0);     /* end at natural position */
  }
}

/* animation: apply the keyframes to an element */
.card {
  animation-name:            fadeIn;
  animation-duration:        0.4s;
  animation-timing-function: ease-out;
  animation-fill-mode:       both;  /* keep final state after animation ends */
}`,

`/* Responsive Design & Media Queries */

/* Mobile-first approach: write base styles for small screens,
   then add complexity as the screen gets larger */

/* Base styles (applies to ALL screen sizes, including mobile) */
.container {
  width:   100%;
  padding: 0 16px;
}

.grid {
  display:               grid;
  grid-template-columns: 1fr;     /* single column on mobile */
  gap:                   16px;
}

/* min-width: apply these rules ONLY on screens 768px wide or wider */
@media (min-width: 768px) {
  .container {
    max-width: 720px;
    margin:    0 auto;  /* center on wider screens */
    padding:   0 24px;
  }

  .grid {
    grid-template-columns: repeat(2, 1fr);  /* two columns on tablet */
  }
}

/* Larger breakpoint for desktop */
@media (min-width: 1024px) {
  .container {
    max-width: 960px;
  }

  .grid {
    grid-template-columns: repeat(3, 1fr);  /* three columns on desktop */
  }
}

/* prefers-color-scheme: adapt to the user's OS dark/light mode setting */
@media (prefers-color-scheme: dark) {
  body {
    background: #0d0d0d;
    color:      #e0e0e0;
  }
}`,

`/* CSS Custom Properties (Variables) */

/* Define variables on :root so they are available everywhere */
:root {
  /* Naming convention: -- prefix is required */
  --color-bg:       #0c0c0c;
  --color-surface:  #141414;
  --color-text:     #d0d0d0;
  --color-muted:    #5a5a5a;
  --color-accent:   #4a9eff;

  --spacing-sm:     8px;
  --spacing-md:     16px;
  --spacing-lg:     32px;

  --radius:         6px;
  --font-mono:      'JetBrains Mono', 'Fira Mono', monospace;
  --transition:     0.2s ease;
}

body {
  background-color: var(--color-bg);    /* var(--name): read the variable */
  color:            var(--color-text);
  font-family:      var(--font-mono);
}

.card {
  background:    var(--color-surface);
  border-radius: var(--radius);
  padding:       var(--spacing-md);
}

/* Override variables for a specific scope */
/* Dark theme already, so override for a light card variant */
.card-light {
  --color-surface: #f5f5f5;
  --color-text:    #1a1a1a;
  /* These overrides only affect elements inside .card-light */
}`

];
