---
title: "package.jsonのバージョン表記では「^0.1.106」と「0.1.106」は意味が違うことがある"
excerpt: "📦バージョンをダウングレードするときは気を付けよう"
date: "2022.05.09"
---

# はじめに

先日、JS のライブラリのバージョンを下げる対応をしたときに、「バージョン下げてるのに動かないぞ？」という状況に陥りました。色々いじくった結果、バージョン表記の先頭の`^`を消してみたらライブラリがうまく動作しました。

しかし、`^`を消すとか全然聞いたことがない対応だったので、調べてまとめてみました。

# 言いたいこと

**`package.json`のバージョン表記において、`^0.1.106`と`0.1.106`ではダウンロードされるパッケージが異なることがある**

# 経緯

「バージョンを下げてるのに動かない」というエラーは、本ブログを開発していたときに確認しました。

本ブログの Markdown のスタイリングには`zenn-embed-contents`というライブラリを使っています。2022 年 5 月時点で`npm install`した分（バージョン`0.1.110`）では、`README.md`どおりの記述だと`import error`を吐きます。

```json:package.json
{
  "private": true,
  "scripts": {
    "dev": "next",
    ...
  },
  "dependencies": {
    "classnames": "2.3.1",
    ...
    "zenn-content-css": "^0.1.110", // import error
    "zenn-embed-elements": "^0.1.110", // import error
    "zenn-markdown-html": "^0.1.110" // import error
  },
  "devDependencies": {
    "@types/jest": "^26.0.23",
    ...
  }
}

```

```tsx:_app.tsx
import { AppProps } from "next/app";
import "../styles/index.css";
import { useEffect } from "react";
// ここでエラー
// モジュール 'zenn-embed-elements/lib/init-twitter-script-inner' またはそれに対応する型宣言が見つかりません。ts(2307)
import initTwitterScriptInner from "zenn-embed-elements/lib/init-twitter-script-inner";

export default function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    import("zenn-embed-elements");
  }, []);
  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: initTwitterScriptInner,
        }}
      />
      <Component {...pageProps} />
    </>
  );
}

```

確かに、バージョン`0.1.110`では、`zenn-embed-content`の実装に`init-twitter-script-inner`は見当たりませんでした。

これらはバージョンの違いによるものです。具体的には、バージョンを`0.1.106`に下げてから使ってほしいとのことです[^1]。

そこで、`package.json`上のバージョン表記を`0.1.106`に変更して、`node_modules`を消去してから、`npm install`しなおすことにしました。

```diff json:package.json
 {
   "private": true,
   "scripts": {
     "dev": "next",
     ...
   },
   "dependencies": {
     "classnames": "2.3.1",
     ...
-    "zenn-content-css": "^0.1.110",
-    "zenn-embed-elements": "^0.1.110",
-    "zenn-markdown-html": "^0.1.110"
+    "zenn-content-css": "^0.1.106",
+    "zenn-embed-elements": "^0.1.106",
+    "zenn-markdown-html": "^0.1.106"
   },
   "devDependencies": {
     "@types/jest": "^26.0.23",
     ...
   }
 }
```

しかし、こちらの対応だけではエラーが解消されませんでした。

最終的に、**バージョン表記の先頭の"^"を消して**、`node_module`削除後に`npm install`で再ダウンロードすることでエラーは解消されました。

```diff json:package.json
 {
   "private": true,
   "scripts": {
     "dev": "next",
     ...
   },
   "dependencies": {
     "classnames": "2.3.1",
     ...
-    "zenn-content-css": "^0.1.106",
-    "zenn-embed-elements": "^0.1.106",
-    "zenn-markdown-html": "^0.1.106"
+    "zenn-content-css": "0.1.106",
+    "zenn-embed-elements": "0.1.106",
+    "zenn-markdown-html": "0.1.106"
   },
   "devDependencies": {
     "@types/jest": "^26.0.23",
     ...
   }
 }
```

つまり今回のケースに関して、**`package.json`のバージョン表記では、`^0.1.106`と`0.1.106`でダウンロードされるパッケージが異なる**ということです。

では具体的にどう違うのか？気になったので、調べてまとめてみました。

