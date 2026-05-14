var CSS_SNIPPETS = [

`/* セレクターの種類 */

p {
  color: #333;
  line-height: 1.6;
}

.card {
  background: white;
  border-radius: 8px;
  padding: 16px;
}

#header {
  position: fixed;
  top: 0;
  width: 100%;
}

.nav a      { text-decoration: none; }
.menu > li  { list-style: none; }

a:hover       { color: #0066cc; }
p::first-line { font-weight: bold; }`,

`/* ボックスモデル */

.box {
  width:  200px;
  height: 100px;

  padding: 16px 24px 16px 24px;
  border:  2px solid #ccc;
  margin:  20px auto;

  box-sizing:       border-box;
  background-color: #f5f5f5;
}`,

`/* display と position */

.block  { display: block; }
.inline { display: inline; }
.iblock { display: inline-block; }
.hidden { display: none; }

.relative {
  position: relative;
  top: 10px;
}

.absolute {
  position: absolute;
  top:   20px;
  right: 20px;
}

.fixed {
  position: fixed;
  bottom: 16px;
  right:  16px;
}

.sticky {
  position: sticky;
  top: 0;
}`,

`/* Flexbox */

.container {
  display:         flex;
  flex-direction:  row;
  justify-content: space-between;
  align-items:     center;
  flex-wrap:       wrap;
  gap:             16px;
}

.item       { flex: 1; }
.item-large { flex: 2; }`,

`/* CSS Grid */

.grid-container {
  display:               grid;
  grid-template-columns: 200px 1fr 1fr;
  grid-template-rows:    100px 100px;
  gap: 16px;
}

.grid-item   { background: #e0e0e0; padding: 16px; }
.header-item { grid-column: 1 / -1; }
.sidebar     { grid-column: 1; grid-row: 1 / 3; }

.auto-grid {
  display:               grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
}`,

`/* タイポグラフィ */

body {
  font-family: 'Inter', 'Helvetica Neue', Arial, sans-serif;
  font-size:   16px;
  line-height: 1.6;
  color:       #1a1a1a;
}

h1 {
  font-size:      2rem;
  font-weight:    700;
  letter-spacing: -0.02em;
  line-height:    1.2;
  margin-bottom:  0.5em;
}

p {
  max-width:     65ch;
  margin-bottom: 1em;
}

.label {
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-size:      0.75rem;
}`,

`/* 色と背景 */

.box {
  color:            white;
  background-color: #1a1a2e;
  border-color:     rgb(100, 200, 255);
  box-shadow:       0 4px 16px rgba(0, 0, 0, 0.3);
  outline:          2px solid hsl(220, 90%, 60%);
}

.gradient-bg {
  background: linear-gradient(135deg, #0f0c29, #302b63, #24243e);
}

.hero {
  background-image:    url('hero.jpg');
  background-size:     cover;
  background-position: center;
  background-repeat:   no-repeat;
}`,

`/* トランジションとアニメーション */

.button {
  background-color: #333;
  color:            white;
  padding:          10px 20px;
  border:           none;
  border-radius:    4px;
  cursor:           pointer;
  transition:       background-color 0.2s ease, transform 0.15s ease;
}

.button:hover {
  background-color: #555;
  transform:        translateY(-2px);
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
}

.card {
  animation-name:            fadeIn;
  animation-duration:        0.4s;
  animation-timing-function: ease-out;
  animation-fill-mode:       both;
}`,

`/* レスポンシブデザイン */

.container {
  width:   100%;
  padding: 0 16px;
}

.grid {
  display:               grid;
  grid-template-columns: 1fr;
  gap:                   16px;
}

@media (min-width: 768px) {
  .container {
    max-width: 720px;
    margin:    0 auto;
    padding:   0 24px;
  }
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .container { max-width: 960px; }
  .grid      { grid-template-columns: repeat(3, 1fr); }
}

@media (prefers-color-scheme: dark) {
  body { background: #0d0d0d; color: #e0e0e0; }
}`,

`/* CSS カスタムプロパティ（変数）*/

:root {
  --color-bg:      #0c0c0c;
  --color-surface: #141414;
  --color-text:    #d0d0d0;
  --color-accent:  #6b1a1a;

  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 32px;

  --radius:     4px;
  --font-mono:  'JetBrains Mono', 'Fira Mono', monospace;
  --transition: 0.2s ease;
}

body {
  background-color: var(--color-bg);
  color:            var(--color-text);
  font-family:      var(--font-mono);
}

.card {
  background:    var(--color-surface);
  border-radius: var(--radius);
  padding:       var(--spacing-md);
}

.card-light {
  --color-surface: #f5f5f5;
  --color-text:    #1a1a1a;
}`,

`/* transform と hover エフェクト */

.card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform:  translateY(-8px) scale(1.02);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

.rotate   { transform: rotate(45deg); }
.skew     { transform: skewX(-10deg); }
.flip     { transform: rotateY(180deg); }

.perspective-wrap {
  perspective: 800px;
}

.cube {
  transform:       rotateX(20deg) rotateY(30deg);
  transform-style: preserve-3d;
}`,

`/* フィルターとエフェクト */

.blur-bg {
  backdrop-filter: blur(12px) saturate(1.5);
  background:      rgba(255, 255, 255, 0.08);
}

.image-fx {
  filter: brightness(1.1) contrast(1.2) saturate(1.3);
}

.grayscale {
  filter:     grayscale(1);
  transition: filter 0.3s ease;
}

.grayscale:hover {
  filter: grayscale(0);
}

.text-shadow {
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
}

.glow {
  box-shadow: 0 0 20px rgba(107, 26, 26, 0.6),
              0 0 40px rgba(107, 26, 26, 0.3);
}`,

`/* scroll-snap */

.scroll-x {
  overflow-x:       scroll;
  scroll-snap-type: x mandatory;
  scroll-behavior:  smooth;
  display:          flex;
  gap:              16px;
  padding:          16px;
}

.scroll-item {
  scroll-snap-align: start;
  scroll-snap-stop:  always;
  flex-shrink:       0;
  width:             80vw;
  height:            400px;
  border-radius:     8px;
  background:        #141414;
}

.scroll-y {
  overflow-y:       scroll;
  scroll-snap-type: y mandatory;
  height:           100vh;
}

.scroll-section {
  scroll-snap-align: start;
  height:            100vh;
}`,

`/* :is() / :where() / :has() */

:is(h1, h2, h3) {
  font-weight:   700;
  line-height:   1.2;
  margin-bottom: 0.5em;
}

:where(ul, ol) {
  padding-left: 1.5em;
  margin:       1em 0;
}

.card:has(img) {
  padding:  0;
  overflow: hidden;
}

form:has(input:invalid) .submit-btn {
  opacity:        0.5;
  pointer-events: none;
}

.nav-item:has(+ .nav-item.active) {
  border-right: 2px solid #6b1a1a;
}`,

`/* counter と自動番号 */

.numbered {
  counter-reset: section;
  list-style:    none;
  padding:       0;
}

.numbered li {
  counter-increment: section;
  padding:           12px 16px 12px 48px;
  position:          relative;
}

.numbered li::before {
  content:     counter(section, decimal-leading-zero);
  position:    absolute;
  left:        8px;
  color:       #6b1a1a;
  font-weight: 700;
  font-size:   0.8em;
}

.chapter { counter-reset: sub; }

.sub {
  counter-increment: sub;
}

.sub::before {
  content: counters(sub, ".") " ";
}`,

`/* aspect-ratio と object-fit */

.thumbnail {
  aspect-ratio: 16 / 9;
  overflow:     hidden;
}

.thumbnail img {
  width:           100%;
  height:          100%;
  object-fit:      cover;
  object-position: center top;
}

.avatar {
  width:         64px;
  aspect-ratio:  1;
  border-radius: 50%;
  overflow:      hidden;
}

.avatar img {
  width:      100%;
  height:     100%;
  object-fit: cover;
}

.square-box {
  aspect-ratio: 1;
  background:   #0c0c0c;
  display:      grid;
  place-items:  center;
}`,

`/* clip-path */

.diamond {
  clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
}

.triangle {
  clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
}

.hexagon {
  clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%);
}

.circle-clip {
  clip-path: circle(50% at center);
}

.hero-angled {
  clip-path: polygon(0 0, 100% 0, 100% 88%, 0 100%);
}

.reveal {
  clip-path:  inset(0 100% 0 0);
  transition: clip-path 0.5s ease;
}

.reveal:hover {
  clip-path: inset(0 0% 0 0);
}`,

`/* @layer */

@layer reset, base, components, utilities;

@layer reset {
  *, *::before, *::after {
    box-sizing: border-box;
    margin:     0;
    padding:    0;
  }
}

@layer base {
  body {
    font-family: system-ui, sans-serif;
    line-height: 1.6;
    color:       #1a1a1a;
  }
}

@layer components {
  .btn {
    display:       inline-flex;
    align-items:   center;
    padding:       8px 16px;
    border-radius: 4px;
    cursor:        pointer;
  }
}

@layer utilities {
  .sr-only {
    position: absolute;
    width:    1px;
    height:   1px;
    overflow: hidden;
    clip:     rect(0, 0, 0, 0);
  }
}`,

`/* container queries */

.card-wrapper {
  container-type: inline-size;
}

@container (min-width: 600px) {
  .card {
    display:               grid;
    grid-template-columns: 1fr 2fr;
    gap:                   16px;
  }
}

@container (min-width: 400px) {
  .card-title {
    font-size: 1.5rem;
  }
}

.sidebar {
  container-type: inline-size;
  container-name: sidebar;
}

@container sidebar (min-width: 300px) {
  .widget {
    display: flex;
    gap:     12px;
  }
}`

];
