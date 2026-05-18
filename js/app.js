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
let isComposing = false;

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
// トレイの上端（bottom:38px）に置くことで、IME候補ウィンドウが
// トレイよりも上（コード側）に出てトレイのテキストに被らなくなる
const hiddenInput = document.createElement('input');
hiddenInput.setAttribute('autocomplete',   'off');
hiddenInput.setAttribute('autocorrect',    'off');
hiddenInput.setAttribute('autocapitalize', 'off');
hiddenInput.setAttribute('spellcheck',     'false');
hiddenInput.style.cssText =
    'position:fixed;bottom:38px;left:48px;opacity:0;width:1px;height:1px;pointer-events:none;';
document.body.appendChild(hiddenInput);

// ── 画面下部の入力トレイ（変換中テキスト・ミスタイプ表示）──
const imeTray = document.createElement('div');
imeTray.style.cssText =
    'position:fixed;bottom:0;left:0;right:0;background:#fafafa;' +
    'border-top:1px solid #e8e8e8;padding:10px 48px;display:none;' +
    'align-items:center;gap:14px;z-index:200;font-family:inherit;';
document.body.appendChild(imeTray);

const trayLabel = document.createElement('span');
trayLabel.style.cssText = 'color:#bbb;font-size:10px;letter-spacing:0.15em;';
trayLabel.textContent = '入力中';

const trayText = document.createElement('span');
trayText.style.cssText = 'font-size:13px;letter-spacing:0.05em;color:#555;';

imeTray.appendChild(trayLabel);
imeTray.appendChild(trayText);

let trayTimer = null;

// トレイを表示する（isError=true のとき赤色で表示し、600ms後に自動で消える）
function showTray(text, isError) {
    clearTimeout(trayTimer);
    trayText.textContent = text;
    trayText.style.color = isError ? '#c0392b' : '#555';
    imeTray.style.display = 'flex';
    if (isError) trayTimer = setTimeout(hideTray, 600);
}

function hideTray() {
    clearTimeout(trayTimer);
    imeTray.style.display = 'none';
    trayText.textContent  = '';
}

// ASCII文字（コードポイント127以下）か判定する
function isTypeable(ch) {
    return ch.codePointAt(0) <= 127;
}

// 全角英数記号を半角に正規化する
// 全角 U+FF01〜U+FF5E は ASCII U+0021〜U+007E と 0xFEE0 だけずれている
function normalize(ch) {
    const code = ch.codePointAt(0);
    if (code >= 0xFF01 && code <= 0xFF5E) return String.fromCodePoint(code - 0xFEE0);
    if (code === 0x3000) return ' ';
    return ch;
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

        // 改行の直後に続く先頭スペース（インデント）を自動スキップ
        if (current.ch === '\n') {
            while (pos < chars.length && chars[pos].ch === ' ') {
                chars[pos].span.classList.remove('cur', 'wait');
                chars[pos].span.classList.add('done');
                pos++;
            }
        }

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
        showTray(ch, true);
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
    hideTray();
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

// ── シンタックスハイライト用キーワードセット ──
const KW = {
    python: new Set([
        'False','None','True','and','as','assert','async','await',
        'break','class','continue','def','del','elif','else',
        'except','finally','for','from','global','if','import',
        'in','is','lambda','nonlocal','not','or','pass','raise',
        'return','self','try','while','with','yield',
    ]),
    javascript: new Set([
        'async','await','break','case','catch','class','const',
        'continue','default','delete','do','else','export','extends',
        'false','finally','for','from','function','if','import',
        'in','instanceof','let','new','null','of','return','static',
        'super','switch','this','throw','true','try','typeof',
        'undefined','var','void','while','yield',
    ]),
    typescript: new Set([
        'abstract','any','as','async','await','boolean','break','case',
        'catch','class','const','continue','declare','default','delete',
        'do','else','enum','export','extends','false','finally','for',
        'from','function','if','implements','import','in','infer',
        'instanceof','interface','keyof','let','namespace','never','new',
        'null','number','object','of','private','protected','public',
        'readonly','return','satisfies','static','string','super',
        'switch','this','throw','true','try','type','typeof',
        'undefined','unknown','var','void','while',
    ]),
    sql: new Set([
        'ALL','ALTER','AND','AS','ASC','AUTOINCREMENT','AVG','BEGIN',
        'BETWEEN','BLOB','BY','CASCADE','CASE','CAST','COALESCE',
        'COMMIT','CONFLICT','COUNT','CREATE','CROSS','DATE','DATETIME',
        'DEFAULT','DELETE','DESC','DISTINCT','DO','DROP','ELSE','END',
        'EXCEPT','EXISTS','FOREIGN','FROM','FULL','GROUP','GROUP_CONCAT',
        'HAVING','IF','IGNORE','IN','INDEX','INNER','INSERT','INTEGER',
        'INTO','IS','JOIN','JULIANDAY','KEY','LEFT','LIKE','LIMIT',
        'LOWER','LTRIM','MAX','MIN','NOT','NULL','OF','OFFSET','ON',
        'OR','ORDER','OUTER','OVER','PARTITION','PRAGMA','PRIMARY',
        'PRINTF','REAL','RECURSIVE','REFERENCES','REPLACE','RESTRICT',
        'RIGHT','ROLLBACK','ROW_NUMBER','RTRIM','SELECT','SET',
        'STRFTIME','SUBSTR','SUM','TABLE','TEXT','THEN','TRANSACTION',
        'TRIM','UNION','UNIQUE','UPDATE','UPPER','VALUES','VIEW',
        'WHEN','WHERE','WITH',
    ]),
    html: new Set([]),
    css:  new Set([
        'absolute','auto','block','bold','center','contain','cover',
        'fixed','flex','grid','hidden','inherit','initial','inline',
        'italic','none','normal','nowrap','relative','solid',
        'sticky','transparent','visible','wrap',
    ]),
};

// ── 文字ごとのトークン種別を返す ──
function tokenize(code, lang) {
    const n = code.length;
    const T = new Array(n).fill('');

    function mark(a, b, t) { for (let k = a; k < b; k++) T[k] = t; }

    let i = 0;
    while (i < n) {
        const s  = i;
        const c0 = code[i];
        const c1 = code[i + 1] ?? '';
        const c2 = code[i + 2] ?? '';

        // コメント
        if (lang === 'python' && c0 === '#') {
            while (i < n && code[i] !== '\n') i++;
            mark(s, i, 'comment'); continue;
        }
        if ((lang === 'javascript' || lang === 'typescript') && c0 === '/' && c1 === '/') {
            while (i < n && code[i] !== '\n') i++;
            mark(s, i, 'comment'); continue;
        }
        if ((lang === 'javascript' || lang === 'typescript' || lang === 'css') && c0 === '/' && c1 === '*') {
            i += 2;
            while (i + 1 < n && !(code[i] === '*' && code[i + 1] === '/')) i++;
            i = Math.min(i + 2, n);
            mark(s, i, 'comment'); continue;
        }
        if (lang === 'sql' && c0 === '-' && c1 === '-') {
            while (i < n && code[i] !== '\n') i++;
            mark(s, i, 'comment'); continue;
        }
        if (lang === 'html' && c0 === '<' && c1 === '!' && c2 === '-') {
            i += 4;
            while (i + 2 < n && !(code[i] === '-' && code[i + 1] === '-' && code[i + 2] === '>')) i++;
            i = Math.min(i + 3, n);
            mark(s, i, 'comment'); continue;
        }

        // 文字列（Python：f/r/b/u プレフィックスと三重クォートに対応）
        if (lang === 'python') {
            let j = i;
            while (j < n && 'fFrRbBuU'.includes(code[j])) j++;
            if (j < n && (code[j] === '"' || code[j] === "'")) {
                const q = code[j];
                if (code[j + 1] === q && code[j + 2] === q) {
                    i = j + 3;
                    while (i + 2 < n && !(code[i] === q && code[i + 1] === q && code[i + 2] === q)) {
                        if (code[i] === '\\') i++;
                        i++;
                    }
                    i = Math.min(i + 3, n);
                } else {
                    i = j + 1;
                    while (i < n && code[i] !== q && code[i] !== '\n') {
                        if (code[i] === '\\') i++;
                        i++;
                    }
                    if (i < n && code[i] === q) i++;
                }
                mark(s, i, 'string'); continue;
            }
        }

        // 文字列（JS / TS：テンプレートリテラルを含む）
        if ((lang === 'javascript' || lang === 'typescript') && (c0 === '"' || c0 === "'" || c0 === '`')) {
            const q = c0; i++;
            while (i < n && code[i] !== q) {
                if (code[i] === '\\') i++;
                i++;
            }
            if (i < n) i++;
            mark(s, i, 'string'); continue;
        }

        // 文字列（SQL）
        if (lang === 'sql' && c0 === "'") {
            i++;
            while (i < n && code[i] !== "'") {
                if (code[i] === '\\') i++;
                i++;
            }
            if (i < n) i++;
            mark(s, i, 'string'); continue;
        }

        // 文字列（HTML / CSS）
        if ((lang === 'html' || lang === 'css') && (c0 === '"' || c0 === "'")) {
            const q = c0; i++;
            while (i < n && code[i] !== q) i++;
            if (i < n) i++;
            mark(s, i, 'string'); continue;
        }

        // CSS の #hex カラー
        if (lang === 'css' && c0 === '#' && /[0-9a-fA-F]/.test(c1)) {
            i++;
            while (i < n && /[0-9a-fA-F]/.test(code[i])) i++;
            mark(s, i, 'number'); continue;
        }

        // 数値
        if (/\d/.test(c0) && (i === 0 || !/[a-zA-Z_$]/.test(code[i - 1]))) {
            while (i < n && /[\da-fA-FxXoObB._]/.test(code[i])) i++;
            mark(s, i, 'number'); continue;
        }

        // デコレーター（Python / TypeScript）
        if ((lang === 'python' || lang === 'typescript') && c0 === '@') {
            i++;
            while (i < n && /[a-zA-Z_0-9.]/.test(code[i])) i++;
            mark(s, i, 'decorator'); continue;
        }

        // CSS @ルール
        if (lang === 'css' && c0 === '@') {
            i++;
            while (i < n && /[a-zA-Z-]/.test(code[i])) i++;
            mark(s, i, 'keyword'); continue;
        }

        // HTML タグ名（< または </）
        if (lang === 'html' && c0 === '<') {
            i++;
            if (i < n && code[i] === '/') i++;
            if (i < n && code[i] === '!') i++;
            const ts = i;
            while (i < n && /[a-zA-Z0-9]/.test(code[i])) i++;
            if (i > ts) mark(s, i, 'keyword');
            continue;
        }

        // キーワード・識別子
        if (/[a-zA-Z_$]/.test(c0)) {
            while (i < n && /[a-zA-Z_$0-9]/.test(code[i])) i++;
            const word = code.slice(s, i);
            const kw   = KW[lang];
            const chk  = lang === 'sql' ? word.toUpperCase() : word;
            if (kw && (kw.has(word) || kw.has(chk))) mark(s, i, 'keyword');
            continue;
        }

        i++;
    }

    return T;
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
    hideTray();
    doneMsg.classList.remove('show');
    againBtn.classList.remove('show');
    nextBtn.classList.remove('show');

    const tokenTypes = tokenize(snippet, currentLang);

    for (let i = 0; i < snippet.length; i++) {
        const ch   = snippet[i];
        const span = document.createElement('span');
        span.classList.add('c', i === 0 ? 'cur' : 'wait');
        if (ch === '\n') span.classList.add('nl');
        if (tokenTypes[i]) span.classList.add('tok-' + tokenTypes[i]);
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

// ── 全入力完了 ──
function finishTyping() {
    finished = true;
    hideTray();
    doneMsg.classList.add('show');
    againBtn.classList.add('show');
    nextBtn.classList.add('show');
}

// ── キー入力の処理 ──
function onKey(e) {
    if (finished) return;
    if (e.isComposing || isComposing) return;

    if (e.key === ' ')   e.preventDefault();
    if (e.key === 'Tab') e.preventDefault();

    const current = chars[pos];
    if (!current) return;

    // 正解済みの文字には戻れない
    if (e.key === 'Backspace') return;

    // 日本語（非ASCII）はcompositionendで変換確定後に処理する
    if (!isTypeable(current.ch)) return;

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

// 変換中のテキストをリアルタイムでトレイに表示する
hiddenInput.addEventListener('compositionupdate', (e) => {
    if (e.data) showTray(e.data, false);
});

hiddenInput.addEventListener('compositionend', (e) => {
    isComposing = false;
    hideTray();
    hiddenInput.value = '';

    if (!e.data) return;

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

codeWrap.addEventListener('click',  () => hiddenInput.focus());
codeWrap.addEventListener('focus',  () => hiddenInput.focus());

hiddenInput.addEventListener('focus', () => codeWrap.classList.add('focused'));
hiddenInput.addEventListener('blur',  () => codeWrap.classList.remove('focused'));

hiddenInput.addEventListener('keydown', onKey);
