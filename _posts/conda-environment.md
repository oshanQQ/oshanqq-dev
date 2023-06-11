---
title: "Anacondaの開発環境がどんな感じになっているか掴めたのでまとめた"
excerpt: "🐍 Anacondaはツールがまとまってるからいいね"
date: "2022.06.11"
---

# はじめに

先日、Anaconda の環境構築を行いました。私は研究を始めるまで Python にあまり触れてこなかったため、環境構築の際に`pip`やら`pip3`やら`pyenv`やら`conda`やらで訳分からなくなっていました。
しかし Anaconda を用いて環境構築することで、 Python の開発環境やエコシステムがどんな感じなのかなんとなーく分かってきました。これらを忘れないうちにまとめておきます。

# 理解したこと

**Anaconda をはじめとする Python 開発では、プロダクトごとに仮想環境を用意して、パッケージなどを管理する**

# Python の仮想環境とパッケージマネージャ

Python の開発では、**プロダクトごとに「仮想環境」という独立した実行環境を用意する**のが一般的です。同じ種類の Python ライブラリを使う場合でも、プロダクトによってライブラリのバージョンが違うというのが頻繁に起こります。そして Python ではこういったバージョン違いによってプログラムが動作しないこと（破壊的変更）が非常に多いです。こういう現状があって、Python ではライブラリの依存関係を独立して管理できるツールが提供されています。

ライブラリの依存関係を独立して管理するためには、

- プロダクトごとに環境を分けて、
- その環境単位でライブラリを追加したり削除したりできる

必要があります。Anaconda を使わない Python 環境だと、これらはそれぞれ

- `pyenv`や`venv`などの仮想環境管理ツール
- `pip`や`pip3`などのパッケージマネージャ

を使うことになります。このように、開発環境を管理するツールが複数種類あるので、Python 開発を行う上ではどれを使うか迷うこともあります。

しかし Anaconda 環境では、これらの機能はどちらも `conda`コマンドが担います。

# Anaconda

![](https://upload.wikimedia.org/wikipedia/en/c/cd/Anaconda_Logo.png)

Anaconda は、データサイエンス向けの環境を提供する Python プラットフォームです。Django を使った Web 開発などの一般的な Python プログラミングでは`pip`などを使いますが、データ整理や機械学習、ディープラーニングなどを行うなら Anaconda 環境が適しています。Numpy などのライブラリが最初から提供されているので、スムーズに開発を進める事ができます。

Anaconda では、仮想環境の管理とパッケージの管理はどちらも `conda` コマンドで行うことができます。

## 仮想環境の管理

- `hogehoge`という名前の仮想環境を新規作成する

```bash
conda create --name hogehoge
```

- 仮想環境一覧を表示する

```
conda env list
```

- `hogehoge`という仮想環境を起動する

```bash
conda activate hogehoge
```

- `hogehoge`という仮想環境を終了させる

```
conda deactivate hogehoge
```

## パッケージ管理

- `fugafuga`というパッケージを追加する

```bash
conda install fugafuga
```

- インストールしているパッケージを一覧表示する

```bash
conda list
```

# おわりに

最初に Python を学習したときは、仮想環境とか何も考えずにどんどんパッケージをインストールしていました。基本的な内容でしたが、こうやってまとめておくと頭の中が整理されていいですね。
`pip`とか`pyenv`とかも、機会があればまとめようと思います。