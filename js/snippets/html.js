var HTML = [

`<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>最初のページ</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <h1>こんにちは、世界！</h1>
  <p>最初のウェブページへようこそ。</p>
</body>
</html>`,

`<!-- 見出しとテキスト要素 -->
<body>

  <h1>ページタイトル</h1>
  <h2>セクション見出し</h2>
  <h3>サブセクション見出し</h3>

  <p>通常の段落テキストです。</p>

  <p>
    <strong>strong</strong>は重要なテキスト。
    <em>em</em>は強調テキスト。
    <code>code</code>はインラインコード。
    <mark>mark</mark>はハイライト。
    <del>del</del>は削除済みテキスト。
    <abbr title="HyperText Markup Language">HTML</abbr>
  </p>

  <p>1行目。<br>2行目。</p>
  <hr>

</body>`,

`<!-- リンクと画像 -->
<body>

  <a href="https://example.com">Exampleを開く</a>

  <a href="https://example.com" target="_blank" rel="noopener noreferrer">
    新しいタブで開く
  </a>

  <a href="#about">Aboutセクションへ</a>

  <img
    src="photo.jpg"
    alt="山の風景写真"
    width="800"
    height="450"
  >

  <section id="about">
    <h2>About</h2>
    <p>このセクションがジャンプ先になる。</p>
  </section>

</body>`,

`<!-- リスト -->
<body>

  <ul>
    <li>HTML</li>
    <li>CSS</li>
    <li>JavaScript</li>
  </ul>

  <ol>
    <li>Node.jsをインストールする</li>
    <li>npm installを実行する</li>
    <li>npm startで起動する</li>
  </ol>

  <ul>
    <li>フロントエンド
      <ul>
        <li>React</li>
        <li>Vue</li>
      </ul>
    </li>
    <li>バックエンド
      <ul>
        <li>Node.js</li>
        <li>Python</li>
      </ul>
    </li>
  </ul>

</body>`,

`<!-- フォーム -->
<body>

  <form action="/submit" method="post">

    <label for="username">ユーザー名</label>
    <input
      type="text"
      id="username"
      name="username"
      placeholder="名前を入力"
      required
    >

    <label for="email">メールアドレス</label>
    <input type="email" id="email" name="email" required>

    <label for="password">パスワード</label>
    <input type="password" id="password" name="password">

    <label for="age">年齢</label>
    <input type="number" id="age" name="age" min="0" max="120">

    <label for="bio">自己紹介</label>
    <textarea id="bio" name="bio" rows="4" cols="40"></textarea>

    <button type="submit">送信</button>

  </form>

</body>`,

`<!-- セマンティックレイアウト -->
<body>

  <header>
    <h1>zencode</h1>
    <nav>
      <a href="/">ホーム</a>
      <a href="/about">About</a>
      <a href="/contact">連絡先</a>
    </nav>
  </header>

  <main>

    <article>
      <h2>ブログ記事タイトル</h2>
      <p>記事の本文がここに入る...</p>
    </article>

    <aside>
      <h3>関連リンク</h3>
      <ul>
        <li><a href="#">リンク1</a></li>
      </ul>
    </aside>

  </main>

  <footer>
    <p>Copyright 2026 Ichito Watanabe</p>
  </footer>

</body>`,

`<!-- テーブル -->
<body>

  <table>

    <thead>
      <tr>
        <th scope="col">名前</th>
        <th scope="col">言語</th>
        <th scope="col">スコア</th>
      </tr>
    </thead>

    <tbody>
      <tr>
        <td>Ichito</td>
        <td>Python</td>
        <td>95</td>
      </tr>
      <tr>
        <td>Alice</td>
        <td>TypeScript</td>
        <td>88</td>
      </tr>
    </tbody>

    <tfoot>
      <tr>
        <td colspan="2">平均</td>
        <td>91.5</td>
      </tr>
    </tfoot>

  </table>

</body>`,

`<!-- 音声・動画・iframe -->
<body>

  <audio controls>
    <source src="music.mp3" type="audio/mpeg">
    <source src="music.ogg" type="audio/ogg">
    このブラウザは音声再生に対応していません。
  </audio>

  <video
    controls
    width="640"
    height="360"
    poster="thumbnail.jpg"
  >
    <source src="demo.mp4"  type="video/mp4">
    <source src="demo.webm" type="video/webm">
    このブラウザは動画再生に対応していません。
  </video>

  <iframe
    src="https://example.com"
    width="600"
    height="400"
    title="Exampleサイト"
    sandbox
  ></iframe>

</body>`,

`<!-- メタタグとSEO -->
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="プログラマーのための静かなタイピング練習サイト。">
  <meta name="author" content="Ichito Watanabe">

  <meta property="og:title"       content="zencode">
  <meta property="og:description" content="無心に打て。">
  <meta property="og:image"       content="https://example.com/og-image.png">
  <meta property="og:url"         content="https://example.com">
  <meta property="og:type"        content="website">

  <meta name="twitter:card"        content="summary_large_image">
  <meta name="twitter:title"       content="zencode">
  <meta name="twitter:description" content="無心に打て。">
  <meta name="twitter:image"       content="https://example.com/og-image.png">

  <title>zencode — タイピング練習</title>
</head>`,

`<!-- アクセシビリティ（ARIA）-->
<body>

  <div role="button" tabindex="0">カスタムボタン</div>

  <button aria-label="ダイアログを閉じる">×</button>

  <span aria-hidden="true">****-</span>
  <span>5点中4点</span>

  <button aria-expanded="false" aria-controls="menu">
    メニューを開く
  </button>
  <ul id="menu" hidden>
    <li>項目1</li>
    <li>項目2</li>
  </ul>

  <div aria-live="polite" id="status"></div>

</body>`,

`<!-- select / radio / checkbox -->
<body>

  <form>

    <label for="color">好きな色:</label>
    <select id="color" name="color">
      <option value="">-- 選択 --</option>
      <optgroup label="暖色">
        <option value="red">赤</option>
        <option value="orange">橙</option>
      </optgroup>
      <optgroup label="寒色">
        <option value="blue" selected>青</option>
        <option value="green">緑</option>
      </optgroup>
    </select>

    <fieldset>
      <legend>通知方法</legend>
      <label><input type="radio" name="notify" value="email"> メール</label>
      <label><input type="radio" name="notify" value="push">  プッシュ</label>
      <label><input type="radio" name="notify" value="none">  なし</label>
    </fieldset>

    <label>
      <input type="checkbox" name="agree" required>
      利用規約に同意する
    </label>

  </form>

</body>`,

`<!-- input の種類 -->
<body>

  <form>

    <label for="volume">音量</label>
    <input type="range" id="volume" name="volume"
           min="0" max="100" step="5" value="50">

    <label for="color">テーマカラー</label>
    <input type="color" id="color" name="color" value="#1a1a2e">

    <label for="date">日付</label>
    <input type="date" id="date" name="date"
           min="2026-01-01" max="2026-12-31">

    <label for="time">時刻</label>
    <input type="time" id="time" name="time">

    <label for="search">検索</label>
    <input type="search" id="search" name="q" placeholder="検索...">

    <label for="file">ファイル</label>
    <input type="file" id="file" name="file"
           accept=".jpg,.png,.gif" multiple>

  </form>

</body>`,

`<!-- details / summary / dialog -->
<body>

  <details>
    <summary>よくある質問: パスワードを忘れた場合は？</summary>
    <p>ログインページの「パスワードを忘れた方」をクリックして
       メールアドレスを入力してください。</p>
  </details>

  <details open>
    <summary>利用規約（最初から展開）</summary>
    <ul>
      <li>個人情報は適切に保護されます。</li>
      <li>サービスは予告なく変更される場合があります。</li>
    </ul>
  </details>

  <dialog id="myDialog">
    <h2>確認</h2>
    <p>本当に削除しますか？</p>
    <button onclick="document.getElementById('myDialog').close()">
      キャンセル
    </button>
    <button>削除する</button>
  </dialog>

  <button onclick="document.getElementById('myDialog').showModal()">
    ダイアログを開く
  </button>

</body>`,

`<!-- SVG -->
<body>

  <svg width="200" height="200" viewBox="0 0 200 200"
       xmlns="http://www.w3.org/2000/svg">

    <rect x="10" y="10" width="80" height="80"
          fill="#1a1a2e" stroke="#6b1a1a" stroke-width="2" rx="8"/>

    <circle cx="150" cy="50" r="40"
            fill="none" stroke="#0066cc" stroke-width="3"/>

    <line x1="10" y1="130" x2="190" y2="130"
          stroke="#333" stroke-width="1" stroke-dasharray="5,3"/>

    <text x="100" y="170" text-anchor="middle"
          font-family="monospace" font-size="14" fill="#d0d0d0">
      zencode
    </text>

    <path d="M 50 180 Q 100 140 150 180"
          fill="none" stroke="#6b1a1a" stroke-width="2"/>

  </svg>

</body>`,

`<!-- template と クローン -->
<body>

  <template id="card-tpl">
    <article class="card">
      <h2 class="card-title"></h2>
      <p  class="card-body"></p>
      <footer class="card-date"></footer>
    </article>
  </template>

  <div id="cards"></div>

  <script>
    const tpl  = document.getElementById("card-tpl");
    const data = [
      { title: "Python",     body: "基礎から学ぶ",    date: "2026-05-14" },
      { title: "SQL",        body: "データベース入門", date: "2026-05-15" },
      { title: "JavaScript", body: "動的な UI 制御",  date: "2026-05-16" },
    ];

    data.forEach(({ title, body, date }) => {
      const clone = tpl.content.cloneNode(true);
      clone.querySelector(".card-title").textContent = title;
      clone.querySelector(".card-body").textContent  = body;
      clone.querySelector(".card-date").textContent  = date;
      document.getElementById("cards").appendChild(clone);
    });
  </script>

</body>`,

`<!-- data-* 属性 -->
<body>

  <ul id="user-list">
    <li data-user-id="1" data-role="admin"  data-score="95">Ichito</li>
    <li data-user-id="2" data-role="editor" data-score="88">Alice</li>
    <li data-user-id="3" data-role="viewer" data-score="72">Bob</li>
  </ul>

  <script>
    document.querySelectorAll("[data-role='admin']").forEach(el => {
      const id    = el.dataset.userId;
      const score = Number(el.dataset.score);
      console.log("管理者 ID:" + id + " スコア:" + score);
      el.style.fontWeight = "bold";
    });

    document.querySelectorAll("#user-list li").forEach(el => {
      if (Number(el.dataset.score) >= 90) {
        el.classList.add("top-scorer");
      }
    });
  </script>

</body>`,

`<!-- picture と figure -->
<body>

  <figure>
    <picture>
      <source srcset="hero.avif" type="image/avif">
      <source srcset="hero.webp" type="image/webp">
      <img
        src="hero.jpg"
        alt="ヒーロー画像"
        width="1200"
        height="600"
        loading="lazy"
        decoding="async"
      >
    </picture>
    <figcaption>
      zencode — プログラマーのためのタイピング練習
    </figcaption>
  </figure>

  <img
    src="avatar.jpg"
    alt="プロフィール画像"
    width="64"
    height="64"
    loading="eager"
  >

</body>`,

`<!-- script の読み込み方 -->
<head>
  <meta charset="UTF-8">
  <title>スクリプト読み込み</title>

  <!-- defer: HTML 解析完了後に実行 -->
  <script defer src="main.js"></script>

  <!-- async: ダウンロード完了後すぐ実行（順序保証なし）-->
  <script async src="analytics.js"></script>

  <!-- type="module": ES モジュール。自動的に defer になる -->
  <script type="module" src="app.js"></script>

  <!-- インラインモジュール -->
  <script type="module">
    import { greet } from "./utils.js";
    document.addEventListener("DOMContentLoaded", () => {
      console.log(greet("Ichito"));
    });
  </script>

</head>`

];
