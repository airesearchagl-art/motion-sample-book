# 構成（ストーリーボード）のJSON形式

「構成を組む」で書き出し・読み込みするJSONの形です。人が書いたものも、生成AIが書いたものも、同じ読み込み口（構成の画面の「JSONで書き出し・読み込み」）から取り込みます。読み込みの確認は `src/storyboard.ts` の `parseStoryFile` にあります。

## 形

```json
{
  "format": "motion-sample-book/storyboard",
  "version": 1,
  "exportedAt": "2026-11-02T00:00:00.000Z",
  "source": "https://motion-sample-book.vercel.app/",
  "templates": [
    {
      "name": "工場見学の導入",
      "description": "ゲートから近づき、生産ラインの見学通路へ入る",
      "basedOn": "visit",
      "slots": [
        { "role": "ゲートから近づく", "note": "アプローチを歩く目線", "sample": "V09", "seconds": 5, "candidates": ["V09", "V07", "V16"] },
        { "role": "規模を伝える", "note": "延床面積と階数", "sample": "T08", "seconds": 4 }
      ]
    }
  ]
}
```

| 項目 | 必須 | 内容 |
| --- | --- | --- |
| `format` | 任意 | `motion-sample-book/storyboard`。違う値なら読み込まない |
| `version` | 任意 | 形式の版。今は `1` |
| `templates` | 必須 | 型の一覧（最大50件） |
| `templates[].name` | 推奨 | 型の名前（40文字まで）。同じ名前があれば末尾に番号を付ける |
| `templates[].description` | 任意 | 説明（200文字まで） |
| `templates[].basedOn` | 任意 | 複製元の型（`site-to-detail`／`visit`／`design-story`） |
| `templates[].slots` | 必須 | カットの並び（最大30カット） |
| `slots[].role` | 推奨 | 役割（40文字まで） |
| `slots[].note` | 任意 | ねらい（120文字まで） |
| `slots[].sample` | 必須 | 見本の番号（`01`〜`20`、`V01`〜`V20`、`T01`〜`T10`、`E01`〜`E10`）。`v8` のような表記も直して読む |
| `slots[].seconds` | 任意 | 秒数。1〜30に直す（なければ5秒） |
| `slots[].candidates` | 任意 | 候補の見本（おすすめ順）。`sample` が存在しない番号なら、候補の先頭に置き換える |

生成AIの答えのように、JSONの前後に文章やコードブロック（```json … ```）が付いていても、中のJSONを取り出して読みます。

`templates` のない、型1つだけのオブジェクト（`name` と `slots`）や、型の配列も読み込めます。

## 読み込むときの扱い

- 存在しない見本の番号は、候補があれば候補の先頭に置き換え、なければそのカットを外して知らせます。
- 使える見本が1つもない型は取り込みません。
- 取り込んだ型は「自分の型」に追加され、この端末のブラウザに保存されます（最大50件）。

## AIへの依頼文

構成の画面の「AIに構成を頼む」でコピーする依頼文は `src/story-prompt.ts` の `buildStoryPrompt` で作ります。場面・全体の長さ・主に使う道具・提案の数に加え、見本の一覧（番号・名前・説明・向く／避ける場面・カットの大きさ・目的）と、この形の例を入れています。見本を足すと依頼文にも自動で入ります。
