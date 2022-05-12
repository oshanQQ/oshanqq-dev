---
title: "package.jsonのバージョン表記では「^0.1.106」と「0.1.106」は意味が違うことがある"
excerpt: "📦ライブラリをダウングレードするときは気を付けよう"
date: "2022.05.09"
---

# はじめに

先日、JS のライブラリのバージョンを下げる対応をしたときに、「バージョン下げてるのに動かないぞ？」という状況に陥りました。色々いじくった結果、バージョン表記の先頭の`^`を消してみたらライブラリがうまく動作しました。

これはバージョンの下げ方と`package-lock.json`が原因なのですが、最初は「なんで`^`を消すと動くんだ？」って感じだったので、調べてまとめてみました。

# 言いたいこと

**適切な方法でバージョンを下げないと、「バージョンを下げたのに動かない」なんてことになる**

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

これらはバージョンの違いによるものです。具体的には、バージョンを`0.1.106`に下げてから使ってほしいとのことです。

https://github.com/zenn-dev/zenn-editor/issues/293

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

つまり今回のケースに関して、**`package.json`のバージョン表記では、`^0.1.106`と`0.1.106`でライブラリのバージョンが異なる**ということです。

では具体的にどう違うのか？気になったので、調べてまとめてみました。

# `package.json`におけるバージョン表記

package.json におけるバージョン表記には、大きく分けて、**チルダ表記 `~`** と**キャレット表記 `^`** があります。

## チルダ表記 `~`

マイナーバージョンまでの挙動を保証します。具体的には、

- `~1.1.2` = `1.1.2 <= version < 1.2.0`
- `~1.1` = `1.1.x`
- `~1` = `1.x`

のバージョンの挙動を保証します。

## キャレット表記 `^`

メジャーバージョンまでの挙動を保証します。具体的には、

- `^1.2.3` := `1.2.3 <= version < 2.0.0`
- `^0.2.3` := `0.2.3 <= version < 0.3.0`
- `^0.0.3` := `0.0.3 <= version < 0.0.4`

のバージョンの挙動を保証します。`package.json`ではキャレット表記が多いかと思います。

https://qiita.com/sotarok/items/4ebd4cfedab186355867

# `package-lock.json`

しかし、キャレット表記 `^`の「メジャーバージョンまでの挙動を保証します」という挙動は、環境構築を行う上では不都合があったりします。

具体的には、各ライブラリが共通の依存先を持っていた場合、キャレット表記 `^`ではその依存先が（メジャーバージョンが変わらない範囲で）新しい方のバージョンに書き変わってしまいます。これでは複数人で同じ作業を行うときに環境が再現できなくなるなどの問題があります。

これを解消しているのが`package-lock.json`です。`package-lock.json`は、それぞれの依存先のバージョンは担保しつつ、ライブラリ自体のバージョンが上がれば書き変わります。これによって、依存関係のバージョンを保ちつつ、ライブラリを更新していくことができます。

https://zenn.dev/nekoniki/articles/ec5bb4d16ef20a

# 原因とその対策

今回の場合、手動で`package.json`のバージョンを`0.1.110`から`0.1.106`に下げて`npm install`し直しました。しかし、**この時点で、`node_module`内の`zenn-embed-contents`のバージョンは`0.1.110`のままでした。これが直接の原因です。**

```json:package-lock.json
"packages": {
    "": {
      "dependencies": {
        ...
        "zenn-content-css": "^0.1.106",
        // ここは0.1.106なのに、
        "zenn-embed-elements": "^0.1.106",
        "zenn-markdown-html": "^0.1.106"
        ...

"node_modules/zenn-embed-elements": {
      // ここは0.1.110のまま
      "version": "0.1.110",
      "resolved": "https://registry.npmjs.org/zenn-embed-elements/-/zenn-embed-elements-0.1.110.tgz",
      "integrity": "sha512-gn1LFWM4deMDCwDuKNcThxV+SR4A30yB4/3gkLyBwo4FhOuDEvC2KKJchXlHlFr4BVHVNPoC0KGqXy2QsC0bvg=="
    },
    ...
```

おそらく`zenn-embed-contents`のバージョンがキャレット表記 `^`だったために、（バージョンが上がれば書き変わるけど）バージョンを下げても`package-lock.json`が書き変わらなかったのでしょう。

キャレット表記 `^`を外せば、それはもう直接のバージョン指定になるので、それで`package-lock.json`が書き変わったのだと思います。

したがって、ライブラリのバージョンを下げるには

- **`package-lock.json`を消してから`npm install`する**
- **`npm install hogehoge@0.1.106`みたいに、バージョンを指定して`npm install`する**

のように行えば間違いないと思います。

ライブラリのバージョンを下げるときは気をつけましょう 📦

# 参考資料

- [zenn-embed-elements が導入できない · Issue #293 · zenn-dev/zenn-editor](https://github.com/zenn-dev/zenn-editor/issues/293)

- [package.json のチルダ(~) とキャレット(^) - Qiita](https://qiita.com/sotarok/items/4ebd4cfedab186355867)

- [【npm,yarn】今さら聞けない lock ファイル](https://zenn.dev/nekoniki/articles/ec5bb4d16ef20a)
