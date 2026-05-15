# zencode

コードの写経サイト。6言語・120問以上のスニペットをひたすら打つ。

**[→ zencode を開く](https://ichito-watanabe.github.io/zencode/)**

---

## 概要

学習目的で作った静的Webアプリ。「コードは読むより打つほうが身につく」という考えのもと、実際に使う構文・パターンを題材にしている。

対応言語：Python / JavaScript / TypeScript / SQL / HTML / CSS

## 機能

- ランダムなスニペットが出題され、1文字ずつ正誤判定
- 改行後のインデントは自動スキップ（写経に集中できる）
- 日本語IME入力対応・全角半角の自動正規化
- 変換中テキストのリアルタイムプレビュー（画面下部トレイ）
- 進捗バーとカウンター表示

## 技術構成

| 項目 | 内容 |
|---|---|
| 構成 | 純粋な HTML / CSS / JavaScript（ビルドツールなし） |
| フォント | JetBrains Mono（Google Fonts） |
| デプロイ | GitHub Pages |
| 依存ライブラリ | なし |

## ローカルで動かす

```bash
git clone git@github.com:ichito-watanabe/zencode.git
cd zencode
# 任意のHTTPサーバーで開く（ファイル直接開きでも動作する）
open index.html
```

## ディレクトリ構成

```
zencode/
├── index.html
├── css/
│   └── style.css
└── js/
    ├── app.js
    └── snippets/
        ├── python.js
        ├── javascript.js
        ├── typescript.js
        ├── sql.js
        ├── html.js
        └── css.js
```

## 作者

[ichito-watanabe](https://github.com/ichito-watanabe)
