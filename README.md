# oshanqq-dev

# 開発環境の構築

開発には、DockerとDocker Composeが必要です。

初めて開発する際は、まずDockerイメージをビルドしておきます。

```bash
$ docker-compose build
```

Dockerイメージをビルドできたら、Docker Composeで開発サーバーとなるコンテナを起動します。

```bash
$ docker-compose up -d
```

Docker Composeから、起動中のコンテナを確認できます。

```bash
$ docker-compose ps
CONTAINER ID   IMAGE                  COMMAND                  CREATED          STATUS          PORTS                    NAMES
0be5c0afb1e5   oshanqq-dev-frontend   "docker-entrypoint.s…"   13 seconds ago   Up 11 seconds   0.0.0.0:3000->3000/tcp   frontend
```

開発サーバーを起動できたら、ブラウザで以下のURLを入力して出力を確認できます。

```bash
$ http://localhost:3000/
```

開発サーバーを終了する際は、Docker Compose経由でコンテナを停止します。

```bash
docker-compose up -d
```
