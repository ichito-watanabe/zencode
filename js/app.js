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
let currentLang = 'python';
let chars       = [];
let pos         = 0;
let finished    = false;
let isComposing = false;  // IME変換中フラグ

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

// ── IME入力を受け取るための非表示input要素 ──
// divにはIMEが使えないため、実際のinput要素で入力を受け取り画面外に隠す
const hiddenInput = document.createElement('input');
hiddenInput.setAttribute('autocomplete',   'off');
hiddenInput.setAttribute('autocorrect',    'off');
hiddenInput.setAttribute('autocapitalize', 'off');
hiddenInput.setAttribute('spellcheck',     'false');
hiddenInput.style.cssText =
    'position:fixed;opacity:0;width:1px;height:1px;pointer-events:none;';
document.body.appendChild(hiddenInput);

// ASCII文字（コードポイント127以下）か判定する
function isTypeable(ch) {
    return ch.codePointAt(0) <= 127;
}

// 全角英数記号を半角に正規化する
// 全角 U+FF01〜U+FF5E は ASCII U+0021〜U+007E と 0xFEE0 だけずれている
// 全角スペース U+3000 も半角スペースに変換する
function normalize(ch) {
    const code = ch.codePointAt(0);
    if (code >= 0xFF01 && code <= 0xFF5E) return String.fromCodePoint(code - 0xFEE0);
    if (code === 0x3000) return ' ';
    return ch;
}

// hiddenInputをカーソル文字の真下に移動する
// IMEの候補ウィンドウはinput要素の位置に追従するため、
// これをすることでIMEウィンドウがコード上の正しい位置に出る
function repositionInput() {
    const current = chars[pos] ?? chars[chars.length - 1];
    if (!current) return;
    const rect = current.span.getBoundingClientRect();
    hiddenInput.style.left = rect.left + 'px';
    hiddenInput.style.top  = rect.bottom + 'px';
}

// ── 1文字を正誤判定してカーソルを進める ──
// 一致すれば done にして true を返す。不一致なら bad フラッシュして false を返す
function processChar(ch) {
    if (finished) return false;
    const current = chars[pos];
    if (!current) return false;

    if (normalize(ch) === normalize(current.ch)) {
        current.span.classList.remove('cur', 'bad', 'wait');
        current.span.classList.add('done');
        pos++;

        if (pos >= chars.length) {
            finishTyping();
        } else {
            const next = chars[pos];
            next.span.classList.remove('wait');
            next.span.classList.add('cur');
            next.span.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
        }

        syncProgress();
        return true;
    } else {
        current.span.classList.add('bad');
        setTimeout(() => {
            if (!current.span.classList.contains('done')) {
                current.span.classList.remove('bad');
            }
        }, 350);
        syncProgress();
        return false;
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
        pageTyping.style.opacity       = '1';
        pageTyping.style.pointerEvents = '';
        hiddenInput.focus();
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

// ── 進捗バーとカウンターを更新 ──
function syncProgress() {
    const total = chars.length;
    const pct   = total ? (pos / total * 100).toFixed(1) : 0;
    fill.style.width    = pct + '%';
    counter.textContent = `${pos} / ${total}`;
    repositionInput();
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

    // IME変換中はすべてのキーを無視（IME自体が処理する）
    if (e.isComposing || isComposing) return;

    if (e.key === ' ')   e.preventDefault();
    if (e.key === 'Tab') e.preventDefault();

    const current = chars[pos];
    if (!current) return;

    // Backspace: 1文字戻る
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

    // 次の文字が日本語（非ASCII）ならkeydownでは処理しない
    // compositionendイベントで変換確定後に処理する
    if (!isTypeable(current.ch)) return;

    // ASCII文字・改行・タブを照合
    const expected = current.ch;
    let   pressed  = null;

    if      (expected === '\n' && e.key === 'Enter') pressed = '\n';
    else if (expected === '\t' && e.key === 'Tab')   pressed = '\t';
    else if (e.key.length === 1)                     pressed = e.key;

    if (pressed === null) return;

    processChar(pressed);
}

// ── IME入力（日本語変換）の処理 ──
hiddenInput.addEventListener('compositionstart', () => {
    isComposing = true;
});

hiddenInput.addEventListener('compositionend', (e) => {
    isComposing = false;
    hiddenInput.value = '';  // 入力バッファをクリアして蓄積を防ぐ

    if (!e.data) return;  // Escapeなどでキャンセルされた場合

    // 変換確定したテキストを1文字ずつ処理する
    // 不一致が出たらそこで停止する
    for (const ch of [...e.data]) {
        if (finished) break;
        if (!processChar(ch)) break;
    }
});

// ── イベント登録 ──

document.querySelector('.lang-grid').addEventListener('click', (e) => {
    const card = e.target.closest('.lang-card[data-lang]');
    if (!card) return;
    goToTyping(card.dataset.lang);
});

backBtn.addEventListener('click', goToHome);

againBtn.addEventListener('click', () => { buildCode(pickSnippet()); hiddenInput.focus(); });
nextBtn.addEventListener('click',  () => { buildCode(pickSnippet()); hiddenInput.focus(); });

// コードエリアをクリック・フォーカス → hiddenInputに転送してIME入力を有効にする
codeWrap.addEventListener('click',  () => hiddenInput.focus());
codeWrap.addEventListener('focus',  () => hiddenInput.focus());

// hiddenInputのfocus状態でcodeWrapのUIを制御する
hiddenInput.addEventListener('focus', () => codeWrap.classList.add('focused'));
hiddenInput.addEventListener('blur',  () => codeWrap.classList.remove('focused'));

// キー入力はhiddenInputで受け取る
hiddenInput.addEventListener('keydown', onKey);
