const SNIPPETS = {
    python:     PYTHON,
    javascript: JAVASCRIPT,
    typescript: TYPESCRIPT,
    sql:        SQL,
    html:       HTML,
    css:        CSS_SNIPPETS,
};

const LANG_META = {
    python:     { en: 'Python',     ja: '基礎' },
    javascript: { en: 'JavaScript', ja: '動作' },
    typescript: { en: 'TypeScript', ja: '型'   },
    sql:        { en: 'SQL',        ja: '問合'  },
    html:       { en: 'HTML',       ja: '構造'  },
    css:        { en: 'CSS',        ja: '装飾'  },
};

// ── ページ要素 ──
const pageHome   = document.getElementById('page-home');
const pageTyping = document.getElementById('page-typing');

// ── タイピング状態 ──
let currentLang   = 'python';
let chars         = [];
let pos           = 0;
let typeablePos   = 0;    // タイプ済みの ASCII 文字数
let typeableCount = 0;    // スニペット内の ASCII 文字総数
let finished      = false;

// ── DOM参照 ──
const codeWrap      = document.getElementById('codeWrap');
const codeText      = document.getElementById('codeText');
const fill          = document.getElementById('fill');
const counter       = document.getElementById('counter');
const doneMsg       = document.getElementById('doneMsg');
const againBtn      = document.getElementById('againBtn');
const nextBtn       = document.getElementById('nextBtn');
const backBtn       = document.getElementById('backBtn');
const currentLangEl = document.getElementById('currentLang');

// ASCII 文字（コードポイント 127 以下）か判定する
// 日本語・全角文字などは false になる
function isTypeable(ch) {
    return ch.codePointAt(0) <= 127;
}

// pos 以降の非 ASCII 文字（日本語など）を自動で done にして読み飛ばす
// scroll=true のときは次のカーソル位置までスクロールする
function skipNonTypeable(scroll) {
    while (pos < chars.length && !isTypeable(chars[pos].ch)) {
        chars[pos].span.classList.remove('cur', 'wait');
        chars[pos].span.classList.add('done');
        pos++;
    }
    if (pos < chars.length) {
        chars[pos].span.classList.remove('wait');
        chars[pos].span.classList.add('cur');
        if (scroll) {
            chars[pos].span.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
        }
    }
}

// ── ページ遷移：ホーム → タイピング ──
function goToTyping(lang) {
    currentLang = lang;
    const meta  = LANG_META[lang];
    currentLangEl.innerHTML =
        `${meta.en}<span class="lang-kanji">${meta.ja}</span>`;
    buildCode(pickSnippet());
    pageHome.style.opacity       = '0';
    pageHome.style.pointerEvents = 'none';
    setTimeout(() => {
        pageHome.style.display   = 'none';
        pageTyping.style.display = 'block';
        void pageTyping.offsetHeight;
        pageTyping.style.opacity      = '1';
        pageTyping.style.pointerEvents = '';
        codeWrap.focus();
    }, 350);
}

// ── ページ遷移：タイピング → ホーム ──
function goToHome() {
    pageTyping.style.opacity      = '0';
    pageTyping.style.pointerEvents = 'none';
    setTimeout(() => {
        pageTyping.style.display = 'none';
        pageHome.style.display   = 'block';
        void pageHome.offsetHeight;
        pageHome.style.opacity      = '1';
        pageHome.style.pointerEvents = '';
    }, 350);
}

// ── ランダムにスニペットを1つ選ぶ ──
function pickSnippet() {
    const pool  = SNIPPETS[currentLang];
    const index = Math.floor(Math.random() * pool.length);
    return pool[index];
}

// ── コードを文字単位のspanに分解して描画 ──
function buildCode(snippet) {
    codeText.innerHTML = '';
    chars         = [];
    pos           = 0;
    typeablePos   = 0;
    typeableCount = 0;
    finished      = false;
    doneMsg.classList.remove('show');
    againBtn.classList.remove('show');
    nextBtn.classList.remove('show');

    for (let i = 0; i < snippet.length; i++) {
        const ch   = snippet[i];
        const span = document.createElement('span');
        span.classList.add('c', 'wait');
        if (ch === '\n') span.classList.add('nl');
        span.textContent = ch;
        chars.push({ span, ch });
        codeText.appendChild(span);
        if (isTypeable(ch)) typeableCount++;
    }

    // 先頭に日本語があれば自動スキップしてカーソルを最初の ASCII 文字に置く
    skipNonTypeable(false);
    syncProgress();
    codeWrap.scrollTop = 0;
}

// ── 進捗バーとカウンターを更新（日本語を除いた文字数で計算）──
function syncProgress() {
    const pct = typeableCount ? (typeablePos / typeableCount * 100).toFixed(1) : 0;
    fill.style.width    = pct + '%';
    counter.textContent = `${typeablePos} / ${typeableCount}`;
}

// ── 全入力完了 ──
function finishTyping() {
    finished = true;
    doneMsg.classList.add('show');
    againBtn.classList.add('show');
    nextBtn.classList.add('show');
}

// ── キー入力の処理 ──
function onKey(e) {
    if (finished) return;
    if (e.key === 'Tab' || e.key === ' ') e.preventDefault();

    const current = chars[pos];
    if (!current) return;

    // Backspace: 直前の ASCII 文字まで戻る
    // 途中の日本語（自動スキップ済み）も一緒に wait に戻す
    if (e.key === 'Backspace') {
        if (typeablePos === 0) return;
        current.span.classList.remove('cur');
        current.span.classList.add('wait');
        pos--;
        while (!isTypeable(chars[pos].ch)) {
            chars[pos].span.classList.remove('done');
            chars[pos].span.classList.add('wait');
            pos--;
        }
        chars[pos].span.classList.remove('done', 'bad');
        chars[pos].span.classList.add('cur');
        typeablePos--;
        syncProgress();
        return;
    }

    // 押されたキーを期待する文字と照合
    const expected = current.ch;
    let   pressed  = null;

    if      (expected === '\n' && e.key === 'Enter') pressed = '\n';
    else if (expected === '\t' && e.key === 'Tab')   pressed = '\t';
    else if (e.key.length === 1)                     pressed = e.key;

    if (pressed === null) return;

    if (pressed === expected) {
        current.span.classList.remove('cur', 'bad', 'wait');
        current.span.classList.add('done');
        pos++;
        typeablePos++;

        if (pos >= chars.length) {
            finishTyping();
        } else {
            // 次が日本語なら自動スキップ
            skipNonTypeable(true);
            if (pos >= chars.length) finishTyping();
        }
    } else {
        current.span.classList.add('bad');
        setTimeout(() => {
            if (!current.span.classList.contains('done')) {
                current.span.classList.remove('bad');
            }
        }, 350);
    }

    syncProgress();
}

// ── イベント登録 ──

document.querySelector('.lang-grid').addEventListener('click', (e) => {
    const card = e.target.closest('.lang-card[data-lang]');
    if (!card) return;
    goToTyping(card.dataset.lang);
});

backBtn.addEventListener('click', goToHome);

againBtn.addEventListener('click', () => {
    buildCode(pickSnippet());
    codeWrap.focus();
});

nextBtn.addEventListener('click', () => {
    buildCode(pickSnippet());
    codeWrap.focus();
});

codeWrap.addEventListener('focus',   () => codeWrap.classList.add('focused'));
codeWrap.addEventListener('blur',    () => codeWrap.classList.remove('focused'));
codeWrap.addEventListener('keydown', onKey);
