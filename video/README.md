# 森のアトリエ サンプル動画（Remotion）

Claude Code の使い方を紹介する 15 秒のサンプル動画です。Remotion で React コンポーネントとして動画を構築しています。

## 構成（合計 15 秒・30fps・1920x1080）

| 時間 | シーン | 内容 |
| --- | --- | --- |
| 0–3 秒 | タイトル | 「Claude Code の使い方」 |
| 3–6 秒 | ステップ1 | `npm install -g @anthropic-ai/claude-code` |
| 6–9 秒 | ステップ2 | `claude` で起動 |
| 9–12 秒 | ステップ3 | 自然言語で指示する例 |
| 12–15 秒 | 締め | 「さあ、はじめましょう。」 |

## セットアップ

```bash
cd video
npm install
```

## プレビュー（Remotion Studio）

```bash
npm run dev
```

ブラウザでスタジオが開き、コンポーネントを編集しながらリアルタイムでプレビューできます。

## 動画書き出し

```bash
npm run build
```

`video/out/claude-code-intro.mp4` が生成されます。初回は Chromium をダウンロードするためサイズが大きくなります。

## 配色

森のアトリエのカラーパレットに準拠しています。

- メインの緑：`#2d6a4f` / `#40916c` / `#52b788`
- アクセントのオレンジ：`#f4a261` / `#e76f51`
