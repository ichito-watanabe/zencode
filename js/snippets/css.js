var CSS_SNIPPETS = [

`/* セレクターの種類 */

/* 要素セレクター: ページ上のすべての<p>要素を対象にする */
p {
  color: #333;        /* テキストの色 */
  line-height: 1.6;   /* 行間（フォントサイズの1.6倍） */
}

/* クラスセレクター: class="card" を持つ要素を対象にする */
.card {
  background: white;
  border-radius: 8px; /* 角を丸くする半径 */
  padding: 16px;      /* 要素内側の余白（上下左右すべて）*/
}

/* IDセレクター: id="header" を持つ要素を対象にする */
/* IDはページ内で1つだけ使うこと */
#header {
  position: fixed;    /* スクロールしても画面上部に固定される */
  top: 0;
  width: 100%;
}

/* 子孫セレクター: .nav の中にある <a> 要素を対象にする */
.nav a {
  text-decoration: none;  /* リンクの下線を消す */
}

/* 直接の子セレクター（>）: .menu の直接の子 <li> だけを対象にする */
.menu > li {
  list-style: none;   /* 箇条書きの●を消す */
}

/* 疑似クラス: ユーザーがホバーしたときだけスタイルを適用する */
a:hover {
  color: #0066cc;
}

/* 疑似要素: <p>の最初の行だけにスタイルを適用する */
p::first-line {
  font-weight: bold;
}`,

`/* ボックスモデル */
/* すべての要素は4層の矩形ボックスで構成される:
   コンテンツ -> パディング -> ボーダー -> マージン   */

.box {
  /* コンテンツ領域: 実際の幅と高さ */
  width:  200px;
  height: 100px;

  /* パディング: ボーダーの内側（コンテンツとボーダーの間）の余白 */
  /* 4方向を一度に指定: 上 右 下 左（時計回り）*/
  padding: 16px 24px 16px 24px;
  /* 省略形: padding: 16px 24px; -> 上下16px、左右24px */

  /* ボーダー: パディング領域を囲む線 */
  border: 2px solid #ccc;
  /* border: 太さ スタイル 色 */

  /* マージン: ボーダーの外側（他の要素との間）の余白 */
  margin: 20px auto;
  /* 左右auto: 要素を水平方向に中央揃えにする */

  /* box-sizing: border-box にすると width にパディングとボーダーが含まれる */
  /* デフォルトでは width がコンテンツ幅のみになり計算が複雑になる */
  box-sizing: border-box;

  background-color: #f5f5f5;
}`,

`/* display と position */

/* display: 要素がどのようにレイアウトに参加するかを決める */
.block-element {
  display: block;        /* 幅が100%になり、縦に積み重なる */
}

.inline-element {
  display: inline;       /* テキストと同じ行に並ぶ（幅・高さ指定不可）*/
}

.inline-block {
  display: inline-block; /* 行内に並びつつ幅・高さ・マージンも指定できる */
}

.hidden {
  display: none;         /* レイアウトからも完全に消える */
}

/* position: 要素をどのように配置するかを決める */
.relative {
  position: relative;    /* 通常の位置を基準にオフセットできる */
  top: 10px;             /* 通常の位置から10px下にずらす */
}

.absolute {
  position: absolute;    /* 通常のレイアウトから切り離される */
  /* 最も近い position:relative/absolute/fixed/sticky の祖先を基準に配置 */
  top:  20px;
  right: 20px;
}

.fixed {
  position: fixed;       /* ビューポート（画面）を基準に配置。スクロールしても動かない */
  bottom: 16px;
  right:  16px;
}

.sticky {
  position: sticky;      /* 通常の位置に留まるが、スクロールで閾値を超えると固定される */
  top: 0;                /* 画面上端にくっついて動かなくなる */
}`,

`/* Flexbox:1次元レイアウト（行または列）*/

.container {
  display: flex;              /* この要素にFlexboxを適用する */
  flex-direction: row;        /* 主軸の方向: row=横、column=縦 */

  justify-content: space-between;
  /* justify-content: 主軸方向のアイテム配置を制御する */
  /* 選択肢: flex-start | flex-end | center | space-between | space-around */

  align-items: center;
  /* align-items: 交差軸（主軸と垂直）方向のアイテム配置を制御する */
  /* 選択肢: flex-start | flex-end | center | stretch | baseline */

  flex-wrap: wrap;
  /* wrap: 幅に収まらないアイテムは次の行に折り返す */
  /* nowrap（デフォルト）: 収まらなくても1行に詰め込む */

  gap: 16px;
  /* gap: アイテム間のスペース（marginのハックを使わなくてよくなる）*/
}

.item {
  flex: 1;
  /* flex: 1 は flex-grow:1 flex-shrink:1 flex-basis:0 の省略形 */
  /* flex:1のアイテムは残りのスペースを均等に分け合う */
}

.item-large {
  flex: 2;
  /* flex:1のアイテムの2倍のスペースを占める */
}`,

`/* CSS Grid:2次元レイアウト（行と列）*/

.grid-container {
  display: grid;

  /* 3列を定義: 200px固定・残りを均等に2分割 */
  grid-template-columns: 200px 1fr 1fr;
  /* 1fr = 利用可能な空きスペースの1単位 */

  /* 2行を定義: それぞれ100pxの高さ */
  grid-template-rows: 100px 100px;

  /* repeat(n, サイズ): 同じ値を繰り返す省略形 */
  /* grid-template-columns: repeat(3, 1fr); は3等分列 */

  gap: 16px;  /* グリッドセルの間隔 */
}

.grid-item {
  background: #e0e0e0;
  padding: 16px;
}

/* アイテムが複数のセルを占める場合 */
.header-item {
  grid-column: 1 / -1;
  /* 1 / -1: 列ライン1番から最後の列ラインまで（全幅いっぱい）*/
}

.sidebar {
  grid-column: 1;
  grid-row: 1 / 3;  /* 行ライン1番から3番まで（2行分の高さ）*/
}

/* auto-fill + minmax: メディアクエリなしのレスポンシブグリッド */
.auto-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  /* 各列は最小200px・最大1fr。収まる限り列を自動的に増やす */
}`,

`/* タイポグラフィ */

body {
  /* font-family: 優先順にフォントを並べる */
  /* 前のフォントが使えない場合に次のフォントへフォールバックする */
  font-family: 'Inter', 'Helvetica Neue', Arial, sans-serif;

  font-size:   16px;   /* ページの基準フォントサイズ */
  line-height: 1.6;    /* 行間 = フォントサイズ × 1.6 */
  color:       #1a1a1a;
}

h1 {
  font-size:      2rem;     /* rem: ルート要素のフォントサイズ基準（16px×2=32px）*/
  font-weight:    700;      /* 100=極細 400=標準 700=太字 900=最太 */
  letter-spacing: -0.02em;  /* 文字間隔を詰める（大きい見出しに多く使われる）*/
  line-height:    1.2;      /* 見出しは行間を狭めると引き締まって見える */
  margin-bottom:  0.5em;    /* em: このフォントサイズを基準にした相対値 */
}

p {
  max-width:     65ch;      /* ch: "0"文字の幅を1単位とする */
  /* 1行あたり約65文字が読みやすいとされる */
  margin-bottom: 1em;
}

/* text-transform: HTMLを変更せずに大文字小文字を変換できる */
.label {
  text-transform: uppercase;  /* すべて大文字に変換 */
  letter-spacing: 0.1em;      /* 大文字表記では字間を広げると読みやすい */
  font-size:      0.75rem;
}`,

`/* 色と背景 */

.box {
  /* カラー名 */
  color: white;

  /* 16進数: #RRGGBB または省略形#RGB */
  background-color: #1a1a2e;

  /* rgb(赤, 緑, 青): 各値は0〜255 */
  border-color: rgb(100, 200, 255);

  /* rgba: rgbにアルファ（透明度）0.0〜1.0を追加 */
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
  /* box-shadow: X軸 Y軸 ぼかし 広がり 色 */

  /* hsl(色相, 彩度, 明度): 直感的に色を指定できる */
  /* 色相: 0〜360度（赤=0, 緑=120, 青=240）*/
  /* 彩度: 0%=グレー, 100%=鮮やか */
  /* 明度: 0%=黒, 50%=通常, 100%=白 */
  outline: 2px solid hsl(220, 90%, 60%);
}

/* リニアグラジェント: 方向に沿って色を滑らかに変化させる */
.gradient-bg {
  background: linear-gradient(135deg, #0f0c29, #302b63, #24243e);
  /* 135度の方向に#0f0c29から始まり#24243eで終わる */
}

/* 背景画像 */
.hero {
  background-image:    url('hero.jpg');
  background-size:     cover;     /* 要素全体を覆うようにスケーリング */
  background-position: center;    /* 画像を中央を基準に配置 */
  background-repeat:   no-repeat; /* 繰り返しを禁止する */
}`,

`/* トランジションとアニメーション */

/* transition: プロパティの変化を滑らかにアニメーションする */
.button {
  background-color: #333;
  color:            white;
  padding:          10px 20px;
  border:           none;
  border-radius:    4px;
  cursor:           pointer;

  /* 書式: プロパティ名 時間 タイミング関数 遅延 */
  transition: background-color 0.2s ease, transform 0.15s ease;
  /* ease: ゆっくり始まり、速く中間を通り、ゆっくり終わる（最も自然）*/
  /* linear: 一定速度 */
}

.button:hover {
  background-color: #555;
  transform: translateY(-2px);  /* ホバー時に2px上に動かす */
}

/* @keyframes: アニメーションの各段階（フレーム）を定義する */
@keyframes fadeIn {
  from {
    opacity:   0;             /* 開始: 完全透明 */
    transform: translateY(10px);  /* 10px下から始まる */
  }
  to {
    opacity:   1;             /* 終了: 完全不透明 */
    transform: translateY(0); /* 通常の位置に戻る */
  }
}

/* animation: キーフレームを要素に適用する */
.card {
  animation-name:            fadeIn;
  animation-duration:        0.4s;
  animation-timing-function: ease-out;
  animation-fill-mode:       both;  /* アニメーション終了後も最終状態を保持する */
}`,

`/* レスポンシブデザインとメディアクエリ */

/* モバイルファースト: まず小さい画面向けのスタイルを書く */
/* その後、大きい画面向けに上書きしていく */

/* 基本スタイル（すべての画面サイズに適用）*/
.container {
  width:   100%;
  padding: 0 16px;
}

.grid {
  display:               grid;
  grid-template-columns: 1fr;  /* モバイルでは1列 */
  gap:                   16px;
}

/* min-width 768px以上の画面（タブレット〜）にのみ適用 */
@media (min-width: 768px) {
  .container {
    max-width: 720px;
    margin:    0 auto;   /* 大きい画面では中央揃えにする */
    padding:   0 24px;
  }

  .grid {
    grid-template-columns: repeat(2, 1fr);  /* タブレットでは2列 */
  }
}

/* 1024px以上（デスクトップ）にのみ適用 */
@media (min-width: 1024px) {
  .container {
    max-width: 960px;
  }

  .grid {
    grid-template-columns: repeat(3, 1fr);  /* デスクトップでは3列 */
  }
}

/* ユーザーのOSのダーク/ライトモード設定に合わせる */
@media (prefers-color-scheme: dark) {
  body {
    background: #0d0d0d;
    color:      #e0e0e0;
  }
}`,

`/* CSS カスタムプロパティ（変数）*/

/* :root に定義すると全体で使えるグローバル変数になる */
:root {
  /* 命名規則: --プレフィックスが必須 */
  --color-bg:       #0c0c0c;
  --color-surface:  #141414;
  --color-text:     #d0d0d0;
  --color-muted:    #5a5a5a;
  --color-accent:   #6b1a1a;  /* 朱色のアクセントカラー */

  --spacing-sm:     8px;
  --spacing-md:     16px;
  --spacing-lg:     32px;

  --radius:         4px;
  --font-mono:      'JetBrains Mono', 'Fira Mono', monospace;
  --transition:     0.2s ease;
}

body {
  background-color: var(--color-bg);    /* var(--変数名): 変数の値を読む */
  color:            var(--color-text);
  font-family:      var(--font-mono);
}

.card {
  background:    var(--color-surface);
  border-radius: var(--radius);
  padding:       var(--spacing-md);
}

/* スコープを絞って変数を上書きする */
/* .card-light 内の要素だけに影響する（外の要素には影響しない）*/
.card-light {
  --color-surface: #f5f5f5;
  --color-text:    #1a1a1a;
}`

];
