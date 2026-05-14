// 各スニペットファイル（python.js等）が先に読み込まれ、
// PYTHON / JAVASCRIPT / TYPESCRIPT / SQL / HTML / CSS というグローバル配列が存在する前提

const SNIPPETS = {
    python:     PYTHON,
    javascript: JAVASCRIPT,
    typescript: TYPESCRIPT,
    sql:        SQL,
    html:       HTML,
    css:        CSS_SNIPPETS,
};

// 各言語の表示名と漢字ラベル
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
let chars       = [];   // { span, ch } の配列（コード全文字分）
let pos         = 0;    // 現在のカーソル位置（文字インデックス）
let finished    = false;

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

// ── ページ遷移：ホーム → タイピング ──
function goToTyping(lang) {
    currentLang = lang;
    const meta  = LANG_META[lang];

    // ヘッダーの言語表示を更新
    currentLangEl.innerHTML =
        `${meta.en}<span class="lang-kanji">${meta.ja}</span>`;

    buildCode(pickSnippet());

    // フェードアウト → 画面切り替え → フェードイン
    pageHome.style.opacity       = '0';
    pageHome.style.pointerEvents = 'none';

    setTimeout(() => {
        pageHome.style.display  = 'none';
        pageTyping.style.display = 'block';

        // offsetHeight を読むことでブラウザに強制リフローさせる
        // これがないと display:block 直後の opacity 変更がトランジションせず一瞬で切り替わる
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
    chars    = [];
    pos      = 0;
    finished = false;
    doneMsg.classList.remove('show');
    againBtn.classList.remove('show');
    nextBtn.classList.remove('show');

    for (let i = 0; i < snippet.length; i++) {
        const ch   = snippet[i];
        const span = document.createElement('span');

        // 最初の文字だけカーソル状態（cur）、それ以外は未入力（wait）
        span.classList.add('c', i === 0 ? 'cur' : 'wait');

        // 改行文字には特別なクラスを付与（↵の擬似要素表示に使う）
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
}

// ── キー入力の処理 ──
function onKey(e) {
    if (finished) return;

    // Tab・Space はブラウザのデフォルト動作（フォーカス移動・スクロール）を止める
    if (e.key === 'Tab' || e.key === ' ') e.preventDefault();

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

    // 押されたキーを期待する文字と照合
    const expected = current.ch;
    let   pressed  = null;

    if      (expected === '\n' && e.key === 'Enter') pressed = '\n';
    else if (expected === '\t' && e.key === 'Tab')   pressed = '\t';
    else if (e.key.length === 1)                     pressed = e.key;

    // 修飾キーや矢印キーなどは無視
    if (pressed === null) return;

    if (pressed === expected) {
        // 正解：入力済み（done）に変えて次へ進む
        current.span.classList.remove('cur', 'bad', 'wait');
        current.span.classList.add('done');
        pos++;

        if (pos >= chars.length) {
            // 全文字入力完了
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
        // 不正解：一時的に赤く光らせて、350ms後に戻す（位置は変わらない）
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

// 言語カードをクリック → タイピング画面へ遷移
document.querySelector('.lang-grid').addEventListener('click', (e) => {
    const card = e.target.closest('.lang-card[data-lang]');
    if (!card) return;
    goToTyping(card.dataset.lang);
});

// 戻るボタン → ホーム画面へ遷移
backBtn.addEventListener('click', goToHome);

// また打つ：同言語でランダムに再抽選
againBtn.addEventListener('click', () => {
    buildCode(pickSnippet());
    codeWrap.focus();
});

// 次のコード：同言語でランダムに別のコードを選ぶ
nextBtn.addEventListener('click', () => {
    buildCode(pickSnippet());
    codeWrap.focus();
});

// フォーカス状態を管理（コードを薄くするエフェクト用）
codeWrap.addEventListener('focus',   () => codeWrap.classList.add('focused'));
codeWrap.addEventListener('blur',    () => codeWrap.classList.remove('focused'));
codeWrap.addEventListener('keydown', onKey);
