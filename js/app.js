// All snippet arrays are loaded via <script> tags before this file.
// PYTHON, JAVASCRIPT, TYPESCRIPT, SQL, HTML, CSS are global arrays.

const SNIPPETS = {
    python:     PYTHON,
    javascript: JAVASCRIPT,
    typescript: TYPESCRIPT,
    sql:        SQL,
    html:       HTML,
    css:        CSS,
};

// ---- State ----
let currentLang = 'python';
let chars       = [];   // array of { span, ch } for every character
let pos         = 0;    // index of the current (cursor) character
let finished    = false;

// ---- DOM refs ----
const codeWrap = document.getElementById('codeWrap');
const codeText = document.getElementById('codeText');
const fill     = document.getElementById('fill');
const counter  = document.getElementById('counter');
const doneMsg  = document.getElementById('doneMsg');
const againBtn = document.getElementById('againBtn');
const nextBtn  = document.getElementById('nextBtn');

// ---- Pick a random snippet from the current language ----
function pickSnippet() {
    const pool = SNIPPETS[currentLang];
    const index = Math.floor(Math.random() * pool.length);
    return pool[index];
}

// ---- Build character spans from a code string ----
function buildCode(snippet) {
    codeText.innerHTML = '';
    chars    = [];
    pos      = 0;
    finished = false;
    doneMsg.classList.remove('show');
    againBtn.classList.remove('show');
    nextBtn.classList.remove('show');

    for (let i = 0; i < snippet.length; i++) {
        const ch   = snippet[i];
        const span = document.createElement('span');
        span.classList.add('c', i === 0 ? 'cur' : 'wait');
        if (ch === '\n') span.classList.add('nl');
        span.textContent = ch;
        chars.push({ span, ch });
        codeText.appendChild(span);
    }

    syncProgress();
    codeWrap.scrollTop = 0;
}

// ---- Update progress bar and counter ----
function syncProgress() {
    const total = chars.length;
    const pct   = total ? (pos / total * 100).toFixed(1) : 0;
    fill.style.width    = pct + '%';
    counter.textContent = `${pos} / ${total}`;
}

// ---- Handle keyboard input ----
function onKey(e) {
    if (finished) return;
    if (e.key === 'Tab') e.preventDefault();

    const current = chars[pos];
    if (!current) return;

    // Backspace: move back one position
    if (e.key === 'Backspace') {
        if (pos === 0) return;
        current.span.classList.remove('cur');
        current.span.classList.add('wait');
        pos--;
        const prev = chars[pos];
        prev.span.classList.remove('done', 'bad');
        prev.span.classList.add('cur');
        syncProgress();
        return;
    }

    // Map pressed key to the expected character
    const expected = current.ch;
    let   pressed  = null;

    if      (expected === '\n' && e.key === 'Enter') pressed = '\n';
    else if (expected === '\t' && e.key === 'Tab')   pressed = '\t';
    else if (e.key.length === 1)                     pressed = e.key;

    if (pressed === null) return; // ignore modifier / nav keys

    if (pressed === expected) {
        // Correct keystroke
        current.span.classList.remove('cur', 'bad', 'wait');
        current.span.classList.add('done');
        pos++;

        if (pos >= chars.length) {
            finished = true;
            doneMsg.classList.add('show');
            againBtn.classList.add('show');
            nextBtn.classList.add('show');
        } else {
            const next = chars[pos];
            next.span.classList.remove('wait');
            next.span.classList.add('cur');
            next.span.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
        }
    } else {
        // Wrong keystroke — gentle error, stays at same position
        current.span.classList.add('bad');
        setTimeout(() => {
            if (!current.span.classList.contains('done')) {
                current.span.classList.remove('bad');
            }
        }, 350);
    }

    syncProgress();
}

// ---- Language switching ----
document.getElementById('langs').addEventListener('click', (e) => {
    const btn = e.target.closest('.lang[data-lang]');
    if (!btn) return;
    currentLang = btn.dataset.lang;
    document.querySelectorAll('.lang').forEach(b =>
        b.classList.toggle('active', b === btn)
    );
    buildCode(pickSnippet());
    codeWrap.focus();
});

// ---- Try again (same snippet rebuild) ----
againBtn.addEventListener('click', () => {
    buildCode(pickSnippet());
    codeWrap.focus();
});

// ---- Next: pick a new random snippet ----
nextBtn.addEventListener('click', () => {
    buildCode(pickSnippet());
    codeWrap.focus();
});

// ---- Focus tracking ----
codeWrap.addEventListener('focus', () => codeWrap.classList.add('focused'));
codeWrap.addEventListener('blur',  () => codeWrap.classList.remove('focused'));
codeWrap.addEventListener('keydown', onKey);

// ---- Init ----
buildCode(pickSnippet());
codeWrap.focus();
