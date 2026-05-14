var HTML = [

`<!DOCTYPE html>
<!-- DOCTYPE宣言: ブラウザにHTML5であることを伝える -->
<!-- これがないとブラウザが「互換モード」で動作し、レイアウトがずれる -->

<html lang="ja">
<!-- html: ページ全体を包む最上位の要素（ルート要素）-->
<!-- lang="ja": スクリーンリーダーや検索エンジンに言語を伝える -->

<head>
  <!-- head: メタデータを書く場所。画面には表示されない -->

  <meta charset="UTF-8">
  <!-- charset: 文字コードを指定する。UTF-8はほぼすべての文字に対応 -->

  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <!-- viewport: モバイルブラウザが自動でズームアウトするのを防ぐ -->
  <!-- initial-scale=1.0: 初期表示を100%（等倍）にする -->

  <title>最初のページ</title>
  <!-- title: ブラウザのタブと検索結果に表示されるテキスト -->

  <link rel="stylesheet" href="style.css">
  <!-- link: 外部CSSファイルを読み込む -->
  <!-- rel="stylesheet": リソースの種類（スタイルシート）を指定 -->
</head>

<body>
  <!-- body: 画面に表示されるすべてのコンテンツをここに書く -->

  <h1>こんにちは、世界！</h1>
  <!-- h1: ページの大見出し。1ページに1回だけ使う -->

  <p>最初のウェブページへようこそ。</p>
  <!-- p: 段落（パラグラフ）。テキストをまとまりとして表示する -->
</body>
</html>`,

`<!-- 見出しとテキスト要素 -->
<body>

  <!-- h1〜h6: 重要度の順に見出しを付ける（h1が最重要）-->
  <h1>ページタイトル（h1・最重要）</h1>
  <h2>セクション見出し（h2）</h2>
  <h3>サブセクション見出し（h3）</h3>

  <!-- p: ブロックレベルの段落要素 -->
  <p>通常の段落テキストです。</p>

  <!-- インラインテキスト装飾要素: 文章の一部に意味や見た目を加える -->
  <p>
    <strong>strong</strong>は重要なテキストを太字にする。
    <em>em</em>は強調を表し、斜体になる。
    <code>code</code>はコードをモノスペースフォントで表示する。
    <mark>mark</mark>はテキストをハイライト表示する。
    <del>del</del>は削除済みテキストに取り消し線を引く。
    <abbr title="HyperText Markup Language">HTML</abbr>
    <!-- abbr: 略語にhover時のツールチップ（全称）を付ける -->
  </p>

  <!-- br: 改行（自己終了タグ・中身なし）-->
  <p>1行目。<br>2行目（同じ段落内）。</p>

  <!-- hr: テーマの区切り線。見た目は水平線で表示される -->
  <hr>

  <p>区切り線の後のコンテンツ。</p>

</body>`,

`<!-- リンクと画像 -->
<body>

  <!-- a: アンカー要素。クリックできるリンクを作る -->
  <!-- href: リンク先のURL（HyperText Reference）-->
  <a href="https://example.com">Exampleを開く</a>

  <!-- target="_blank": 別タブで開く -->
  <!-- rel="noopener noreferrer": _blankを使うときのセキュリティ対策 -->
  <a href="https://example.com" target="_blank" rel="noopener noreferrer">
    新しいタブで開く
  </a>

  <!-- ページ内の特定のidへジャンプするリンク -->
  <a href="#about">Aboutセクションへ</a>

  <!-- img: 画像を埋め込む自己終了タグ -->
  <!-- src: 画像ファイルのパス -->
  <!-- alt: 画像が読み込めない場合や視覚障害者向けの代替テキスト -->
  <!-- width/height: 画像のスペースを事前確保してレイアウトのズレを防ぐ -->
  <img
    src="photo.jpg"
    alt="山の風景写真"
    width="800"
    height="450"
  >

  <!-- 上のリンク先となるid付きのセクション -->
  <section id="about">
    <h2>About</h2>
    <p>このセクションがジャンプ先になる。</p>
  </section>

</body>`,

`<!-- リスト -->
<body>

  <!-- ul: 順序なしリスト。各項目が箇条書き（●）で表示される -->
  <ul>
    <li>HTML</li>
    <!-- li: リストの項目1つ。ul・ol・menuの直下に書く -->
    <li>CSS</li>
    <li>JavaScript</li>
  </ul>

  <!-- ol: 順序付きリスト。自動的に番号が振られる -->
  <ol>
    <li>Node.jsをインストールする</li>
    <li>npm installを実行する</li>
    <li>npm startで起動する</li>
  </ol>

  <!-- start属性: 番号の開始値を指定できる -->
  <ol start="3">
    <li>これが3番目</li>
    <li>これが4番目</li>
  </ol>

  <!-- ネストしたリスト: li の中にさらに ul や ol を入れられる -->
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

  <!-- dl: 定義リスト。用語と説明のペアに使う -->
  <dl>
    <dt>HTML</dt>   <!-- dt: 定義する用語（Definition Term）-->
    <dd>ウェブコンテンツを構造化するマークアップ言語。</dd>
    <!-- dd: 用語の説明（Definition Description）-->
    <dt>CSS</dt>
    <dd>HTMLの見た目を制御するスタイルシート言語。</dd>
  </dl>

</body>`,

`<!-- フォームと入力要素 -->
<body>

  <!-- form: 入力データをサーバーに送信するための容器 -->
  <!-- action: データの送信先URL -->
  <!-- method: "get"はURLにデータを付加、"post"はリクエスト本文に入れる -->
  <form action="/submit" method="post">

    <!-- label: クリックすると対応するinputにフォーカスする -->
    <!-- for属性の値は、対応するinputのid属性と一致させる必要がある -->
    <label for="username">ユーザー名</label>
    <input
      type="text"
      id="username"
      name="username"
      placeholder="名前を入力"
      required
    >
    <!-- required: この入力欄が空のままではフォームを送信できない -->

    <label for="email">メールアドレス</label>
    <input type="email" id="email" name="email" required>
    <!-- type="email": ブラウザがメール形式かどうか自動で検証する -->

    <label for="password">パスワード</label>
    <input type="password" id="password" name="password">
    <!-- type="password": 入力内容が●●●で隠される -->

    <label for="age">年齢</label>
    <input type="number" id="age" name="age" min="0" max="120">
    <!-- min/max: ブラウザがこの範囲外の値を拒否する -->

    <!-- textarea: 複数行のテキスト入力エリア -->
    <label for="bio">自己紹介</label>
    <textarea id="bio" name="bio" rows="4" cols="40"></textarea>

    <!-- button type="submit": フォームデータを送信する -->
    <button type="submit">送信</button>

  </form>

</body>`,

`<!-- セマンティックなレイアウト要素 -->
<body>

  <!-- header: サイトロゴ・ナビ・キャッチコピーなど導入コンテンツ -->
  <header>
    <h1>zencode</h1>
    <nav>
      <!-- nav: ナビゲーションリンクのグループ -->
      <a href="/">ホーム</a>
      <a href="/about">About</a>
      <a href="/contact">連絡先</a>
    </nav>
  </header>

  <!-- main: ページの主要コンテンツ。1ページに1つだけ使う -->
  <main>

    <!-- article: それ単独で意味が完結するコンテンツ（ブログ記事など）-->
    <article>
      <h2>ブログ記事タイトル</h2>
      <p>記事の本文がここに入る...</p>
    </article>

    <!-- aside: メインコンテンツに関連する補足情報（サイドバーなど）-->
    <aside>
      <h3>関連リンク</h3>
      <ul>
        <li><a href="#">リンク1</a></li>
      </ul>
    </aside>

  </main>

  <!-- footer: 著作権・連絡先・補足リンクなど締めくくりのコンテンツ -->
  <footer>
    <p>Copyright 2026 Ichito Watanabe</p>
  </footer>

</body>`,

`<!-- テーブル（表）-->
<body>

  <!-- table: 行と列でデータを表示する -->
  <table>

    <!-- thead: ヘッダー行のグループ（見出し行を囲む）-->
    <thead>
      <tr>
        <!-- tr: テーブルの行（Table Row）-->
        <th scope="col">名前</th>
        <!-- th: 見出しセル（太字・中央寄せで表示される）-->
        <!-- scope="col": スクリーンリーダーに列の見出しと伝える -->
        <th scope="col">言語</th>
        <th scope="col">スコア</th>
      </tr>
    </thead>

    <!-- tbody: データ行のグループ（実際のデータを囲む）-->
    <tbody>
      <tr>
        <td>Ichito</td>
        <!-- td: データセル（通常のテーブルの中身）-->
        <td>Python</td>
        <td>95</td>
      </tr>
      <tr>
        <td>Alice</td>
        <td>TypeScript</td>
        <td>88</td>
      </tr>
    </tbody>

    <!-- tfoot: フッター行のグループ（合計・まとめ行を囲む）-->
    <tfoot>
      <tr>
        <td colspan="2">平均</td>
        <!-- colspan: この1つのセルが2列分を占める -->
        <td>91.5</td>
      </tr>
    </tfoot>

  </table>

</body>`,

`<!-- 音声・動画・iframe -->
<body>

  <!-- audio: 音声ファイルを埋め込む -->
  <!-- controls: ブラウザ標準の再生・一時停止・音量UIを表示する -->
  <audio controls>
    <!-- source: 複数のフォーマットを書くと対応形式を自動選択する -->
    <source src="music.mp3" type="audio/mpeg">
    <source src="music.ogg" type="audio/ogg">
    このブラウザは音声再生に対応していません。
    <!-- 両方のsourceが再生できない場合に表示されるフォールバックテキスト -->
  </audio>

  <!-- video: 動画ファイルを埋め込む -->
  <!-- poster: 再生前に表示するサムネイル画像 -->
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

  <!-- iframe: 別のウェブページをページ内に埋め込む -->
  <!-- sandbox: 埋め込んだページの権限を制限してセキュリティを高める -->
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

  <!-- description: Google検索結果のスニペット（説明文）として表示される -->
  <!-- 160文字以内に収めると表示が切れにくい -->
  <meta name="description" content="プログラマーのための静かなタイピング練習サイト。">

  <!-- keywords: 現在のSEOへの影響は小さいが記録として書くことはある -->
  <meta name="keywords" content="タイピング, コード, プログラミング, 練習">

  <!-- author: ページ制作者の名前 -->
  <meta name="author" content="Ichito Watanabe">

  <!-- OGP（Open Graph Protocol）: SNSでシェアされたときの表示を制御する -->
  <meta property="og:title"       content="zencode">
  <meta property="og:description" content="無心に打て。">
  <meta property="og:image"       content="https://example.com/og-image.png">
  <meta property="og:url"         content="https://example.com">
  <meta property="og:type"        content="website">

  <!-- Twitter Card: Twitter/Xでシェアされたときの表示を制御する -->
  <meta name="twitter:card"        content="summary_large_image">
  <meta name="twitter:title"       content="zencode">
  <meta name="twitter:description" content="無心に打て。">
  <meta name="twitter:image"       content="https://example.com/og-image.png">

  <title>zencode — タイピング練習</title>
</head>`,

`<!-- アクセシビリティ属性（ARIA）-->
<body>

  <!-- role: 要素が何であるかをスクリーンリーダーに伝える -->
  <!-- セマンティックHTMLで代替できる場合はroleより要素選択を優先する -->
  <div role="button" tabindex="0">カスタムボタン</div>
  <!-- tabindex="0": Tabキーでフォーカスできるようにする -->

  <!-- aria-label: テキストを持たない要素に読み上げ用のラベルを付ける -->
  <button aria-label="ダイアログを閉じる">×</button>
  <!-- スクリーンリーダーは「×ボタン」ではなく「ダイアログを閉じるボタン」と読む -->

  <!-- aria-hidden: 装飾的な要素をスクリーンリーダーから隠す -->
  <span aria-hidden="true">★★★★☆</span>
  <span>5点中4点</span>
  <!-- 読み上げは「5点中4点」のみ。記号の読み上げを避けられる -->

  <!-- aria-expanded: 折りたたみ可能なセクションが開いているか示す -->
  <button aria-expanded="false" aria-controls="menu">
    メニューを開く
  </button>
  <ul id="menu" hidden>
    <li>項目1</li>
    <li>項目2</li>
  </ul>

  <!-- aria-live: 動的に変化するコンテンツをスクリーンリーダーに通知する -->
  <!-- "polite": ユーザーが操作を止めたタイミングで読み上げる -->
  <!-- "assertive": 現在の読み上げを中断して即座に通知する -->
  <div aria-live="polite" id="status"></div>
  <!-- JSで#statusのテキストを変更すると、スクリーンリーダーが読み上げる -->

</body>`

];
