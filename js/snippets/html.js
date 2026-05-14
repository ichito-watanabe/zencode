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

</body>`

];
