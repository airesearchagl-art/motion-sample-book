# Claude音声セッション引き継ぎ書

- 作成日: 2026-10-27 JST
- 対象リポジトリ: `airesearchagl-art/motion-sample-book`
- 目的: ChatGPTの音声会話で進めたMVP開発を、Claudeの音声会話へ安全に引き継ぐ
- この文書の位置づけ: 状態を固定する参考記録。作業開始時は必ずGitHubの現在状態を読み直す

## 1. プロジェクトの目的

「モーション見本帳」は、名称を思い出せないUI・動画・カメラの動きを、実際のプレビューから探すための個人用Web見本帳です。

正式名:

- 日本語: モーション見本帳
- 英語: Motion Sample Book
- リポジトリ名: `motion-sample-book`
- 説明文: `A motion sample book for UI interactions.`

公開リポジトリ:

- https://github.com/airesearchagl-art/motion-sample-book

## 2. ここまでの経緯

ChatGPTとの音声会話を中心に、次の順で進めました。

1. 用途、名称、最初の10種類を決定
2. GitHubに公開リポジトリを作成
3. Vite + TypeScript + CSSで初版を実装
4. UIモーション10種類をmainへ反映
5. Vercelと接続して本番公開
6. Notionのアプリケーション管理とObsidian Vaultへ記録
7. 将来の拡張ロードマップを作成
8. 動画・カメラの基礎5種類をDraft PR #3へ追加
9. PC・iPhone・キーボードで使える再生方式へ修正

認証、空リポジトリの最初の作成、mergeや正式公開などの重要な承認はHumanが行いました。「完全自動」「画面操作なしで完成」ではありません。

## 3. mainへ反映済み

### 初版

- UIモーション10種類
- 雰囲気による絞り込み
- PCのホバーとクリック／iPhoneのタップ
- スマートフォン表示
- `prefers-reduced-motion`への配慮

### ロードマップ

Application Roadmap PR #2はmerge済みです。

- PR: https://github.com/airesearchagl-art/motion-sample-book/pull/2
- merge commit: `e41ca6fdaaf49022ace592ec8b05435fe19e8150`

ロードマップの段階:

1. UIと動画の基礎を揃える
2. カメラ5種類と文字5種類を追加し、合計25種類へ拡張
3. 感覚語検索、比較、速度・方向・強さの調整、お気に入り
4. 制作指示、CSS名、編集ソフト上の呼び方、生成AI向けプロンプト
5. Web、動画、プレゼン、建築CGを切り替えられる総合見本帳

関連するObsidian Vault Roadmap PR #562も、ゲート成功後にmerge済みです。

- https://github.com/airesearchagl-art/obsidian-vault/pull/562
- merge commit: `4c829de8354e9560ac911ef8bce8446da6ae19f2`

Notionの「モーション見本帳」管理ページもロードマップのmerge済み状態へ更新済みです。

## 4. 現在の開発対象: Draft PR #3

- PR: https://github.com/airesearchagl-art/motion-sample-book/pull/3
- 状態: OPEN / Draft / 未merge
- 記録時のHEAD: `0fac051c5f22cd013a0af0e2a35154249b2981a0`
- 記録時のbase: `e41ca6fdaaf49022ace592ec8b05435fe19e8150`
- 作業ブランチ: `feat/video-motion-foundation`

追加した5種類:

1. カット / Cut
2. フェード / Fade
3. ワイプ / Wipe
4. ズーム / Zoom
5. パン / Pan

操作仕様:

- PC: プレビューへカーソルを置くと1回再生
- PC: クリックすると最初から再再生
- iPhoneなど: タップで再生
- キーボード: フォーカスすると再生
- 連続して再生しても、以前のタイマーで途中停止しない
- UI側の絞り込みは動画カードへ影響しない
- 見出し横の説明は「カーソルを重ねるか、タップして動きを試せます。」
- 各プレビュー右下の表示は `HOVER / TAP`

記録時の確認結果:

- `npm ci`: PASS
- `npm run build`: PASS
- TypeScript: PASS
- Vite production build: PASS
- `git diff --check`: PASS
- Vercel: READY / SUCCESS
- 配信されたJavaScriptに、ホバー、細かなポインター判定、キーボードフォーカス、絞り込み範囲の修正が含まれることを確認
- 配信されたJavaScriptで、新しい説明文と `HOVER / TAP`、旧 `PLAY` 表示の除去を確認

記録時のVercelプレビュー:

- https://motion-sample-book-ijx1kzpfp-airesearchagls-projects.vercel.app/

プレビューはVercelのログイン保護が表示される場合があります。保護を解除せず、所有者の通常のVercelアカウントで確認してください。

## 5. Human確認が残っている項目

PCとiPhoneで、次を確認してください。

- 「動画・カメラ 5」タブへ切り替えられる
- 5種類の違いを見分けられる
- PCでホバー再生とクリック再再生ができる
- iPhoneでタップ再生できる
- 同じ見本を連続再生しても途中で止まらない
- UI側で「静か」などに絞り込んだ後も、動画5件が残る
- 文字、カード、速度、色が見やすい
- UIモーション10種類に回帰がない

## 6. Claudeで再開する手順

PR #4がmainへmergeされた後に実施します。

1. Claudeの新しい通常チャットを開き、音声会話を開始する
2. 下の「開始用指示」を読み上げるか貼り付ける
3. Claudeに、この文書と`ROADMAP.md`、README、Draft PR #3を読ませる
4. Claudeから、現在のHEAD、base、Draft状態、Vercel状態を読み返してもらう
5. 上記と一致しない場合は、古い情報を使わず、現在のGitHubを正とする
6. まずHuman確認の指摘を整理し、修正が必要なら既存のPR #3で進める
7. Humanの明示承認があるまで、PR #3をReady化・merge・Production反映しない

## 7. Claudeへの開始用指示

> GitHubの公開リポジトリ `airesearchagl-art/motion-sample-book` を確認してください。最初にmainの `docs/CLAUDE_VOICE_HANDOFF.md`、`ROADMAP.md`、READMEを読み、その後Draft PR #3の現在状態、HEAD、base、差分、Vercelチェックを読み取り専用で確認してください。引き継ぎ書の記録と現在状態が違う場合はGitHubの現在状態を優先してください。目的は、動画・カメラ5種類のHuman UX確認と必要な修正を、音声会話中心で続けることです。まず現在地、確認済み、未確認、次の一手を短く整理してください。私が明示的に承認するまで、PR #3のReady化、merge、Production反映、Vercel設定変更、Notion・Obsidian Vault更新はしないでください。

## 8. 安全境界

- 秘密情報、トークン、アカウントIDを文書やPRへ記録しない
- Vercelの保護設定を確認の都合だけで解除しない
- PR #3のDraft状態をHuman承認なしに変えない
- mainやProductionをHuman承認なしに変更しない
- 新しいPRを増やす前に、PR #3で扱う変更かを判断する
- 「音声だけですべて自動化できた」と表現しない

## 9. 引き継ぎ完了条件

次の4点をClaudeが読み返せたら、引き継ぎ完了です。

- mainへ反映済みの範囲
- Draft PR #3の現在状態
- Human確認が残る項目
- mergeとProduction反映にはHuman承認が必要であること
