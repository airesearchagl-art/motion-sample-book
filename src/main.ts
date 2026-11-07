import './style.css'
import {
  type Sample, type Setting, samples, videoSamples, textSamples, environmentSamples, allSamples,
  finderWords, strengthSamples, directionSamples, settingOptions, defaultSettings, suggestedCollections,
} from './data'
import { type Recipe, recipes, recipeTools, missingRecipes } from './recipes'
import { recipeChecks } from './recipe-checks'
import { purposes, purposeById, purposesOf, shotScale, shotScaleNote } from './purposes'
import {
  type CustomTemplate, type StoryFileTemplate, storyTemplates, storyTemplateById, storyLimits,
  newStoryId, clampSeconds, toStoryFile, parseStoryFile,
} from './storyboard'
import { buildStoryPrompt, storyRequestTools, storyRequestLengths, lengthLabel } from './story-prompt'

const totalSamples = allSamples.length
/** 番号（01 / V01 / T01）から見本を引く。比較パネルで使う */
const sampleByNumber = new Map<string, Sample>(allSamples.map((sample) => [sample.number, sample]))
const libraryCount = 4

// 開発中だけ、再現情報が欠けている見本を知らせる（見本を足したときの書き忘れ防止）
if (import.meta.env.DEV) {
  const missing = missingRecipes(allSamples.map((sample) => sample.number))
  if (missing.length) console.warn(`再現情報（src/recipes.ts）がない見本: ${missing.join(', ')}`)
}

/** 再現情報を開くボタン。どの道具の情報があるかを小さく添える */
/**
 * 再現情報の確認状態（Windowsスレッドの実機確認、src/recipe-checks.ts）。
 * mismatch は修正案を recipes.ts に反映済みなので「実機で確認」として扱う。
 * CSSは見本帳そのものが動作例、生成AI向けの指示文は確認の対象外。
 */
type CheckView = { level: 'device' | 'docs' | 'unverified' | 'none', text: string }
const checkView = (number: string, key: keyof Recipe): CheckView => {
  if (key === 'css') return { level: 'none', text: '見本帳の動きがそのまま動作例' }
  if (key === 'prompt') return { level: 'none', text: '確認の対象外（生成AIの結果は毎回変わる）' }
  const check = recipeChecks[number]?.[key as 'edit' | 'powerpoint' | 'cg']
  if (!check) return { level: 'unverified', text: '未確認' }
  // 「PowerPoint (Microsoft 365) 2610 / 日本語UI」→「PowerPoint 2610」、「After Effects 2026 (26.5)・Premiere Pro 2026 / 日本語UI」→「After Effects 2026・Premiere Pro 2026」
  const tool = check.checkedWith.split('/')[0].replace(/\s*\([^)]*\)/g, '').trim()
  if (key === 'cg') {
    // 実機で確かめた道具（SketchUp は checkedWith にあるときだけ）と、欄に書かれているが未確認の道具
    const sketchup = /SketchUp/.test(check.checkedWith) && (check.status === 'device' || check.status === 'mismatch')
    const tools = [sketchup ? 'SketchUp' : '', check.d5 ? 'D5 Render' : ''].filter(Boolean)
    // D5 で動きまで見られなかったもの（note が「見た目は未確認」）と、欄にあるが確かめていない道具
    const d5Motion = check.d5 && check.note?.includes('見た目は未確認') ? 'D5での動き' : ''
    const others = ['Lumion', 'Twinmotion', 'Enscape', 'Navisworks'].filter((name) => recipes[number]?.cg?.includes(name)).join('／')
    const pending = [d5Motion, others].filter(Boolean).join('、')
    const rest = pending ? `（${pending}は未確認）` : ''
    return tools.length ? { level: 'device', text: `${tools.join('・')}は実機で確認${rest}` } : { level: 'unverified', text: '未確認' }
  }
  if (check.status === 'device') return { level: 'device', text: `実機で確認（${tool}）` }
  if (check.status === 'mismatch') return { level: 'device', text: `実機で確認・修正済み（${tool}）` }
  if (check.status === 'docs') return { level: 'docs', text: '公式資料で確認' }
  return { level: 'unverified', text: '未確認' }
}

const recipeButton = (sample: Sample) => {
  const recipe = recipes[sample.number]
  if (!recipe) return ''
  const tools = recipeTools.filter((tool) => recipe[tool.key]).map((tool) => {
    const verified = checkView(sample.number, tool.key).level === 'device'
    return `<i class="${verified ? 'is-verified' : ''}" title="${verified ? '実機で確認済み' : ''}">${verified ? '✓' : ''}${tool.short}</i>`
  }).join('')
  return `<button class="recipe-open" type="button" data-recipe="${sample.number}"><span>⧉ 再現情報を見る</span><span class="recipe-tools" aria-label="対応する道具">${tools}</span></button>`
}

const usageRows = (sample: Sample, hintLabel: string) => `
    <div class="usage"><span>${hintLabel}</span><strong>${sample.hint}</strong></div>
    <div class="usage usage-avoid"><span>避けたい場面</span><strong>${sample.avoid}</strong></div>
    <div class="feel-tags" aria-label="感覚語">${sample.feel.map((word) => `<button class="feel-tag" type="button" data-feel="${word}">#${word}</button>`).join('')}</div>
    <div class="card-buttons">
      <button class="save-toggle" type="button" data-save="${sample.number}" aria-pressed="false">☆ 保存</button>
      <button class="compare-toggle" type="button" data-compare="${sample.number}" aria-pressed="false">＋ 比較に追加</button>
    </div>
    ${recipeButton(sample)}`

/** 全角・半角、大文字・小文字、ひらがな・カタカナの違いを吸収して比較する */
const normalize = (text: string) => text
  .normalize('NFKC')
  .toLowerCase()
  .replace(/[ぁ-ゖ]/g, (char) => String.fromCharCode(char.charCodeAt(0) + 0x60))

const searchText = (sample: Sample) => normalize([
  sample.name, sample.english, sample.description, sample.categoryLabel, sample.hint, ...sample.feel,
  shotScale[sample.number] ?? '', ...purposesOf(sample.number).map((purpose) => purpose.name),
].join(' '))



const adjustBadges = (sample: Sample) => {
  const labels = [
    strengthSamples.has(sample.number) ? '強さ' : '',
    directionSamples.has(sample.number) ? '向き' : '',
  ].filter(Boolean)
  return labels.length ? `<span class="adjust-badges" title="「強さ」「向き」の調整が効く見本">${labels.map((label) => `<i>${label}</i>`).join('')}</span>` : ''
}

/** カットの大きさの印（引き・中・寄り・目線）。カメラ系の見本だけに付く */
const scaleBadge = (sample: Sample) => {
  const scale = shotScale[sample.number]
  return scale ? `<span class="scale-badge" title="カットの大きさ：${shotScaleNote[scale]}">${scale}</span>` : ''
}

const cardId = (sample: Sample) => `<span class="card-id"><span class="number">${sample.number}</span>${scaleBadge(sample)}${adjustBadges(sample)}</span>`


const playbackControls = (idPrefix: string) => `
  <div class="playback-controls" role="group" aria-label="再生の調整">
    ${(Object.keys(settingOptions) as Setting[]).map((setting) => `
      <div class="segment" role="radiogroup" aria-labelledby="${idPrefix}-${setting}">
        <span class="segment-label" id="${idPrefix}-${setting}">${settingOptions[setting].label}</span>
        ${settingOptions[setting].options.map(([value, label]) => `<button type="button" role="radio" aria-checked="false" data-setting="${setting}" data-value="${value}">${label}</button>`).join('')}
      </div>`).join('')}
  </div>`

const app = document.querySelector<HTMLDivElement>('#app')!

app.innerHTML = `
  <header class="site-header">
    <a class="brand" href="#top" aria-label="モーション見本帳 トップへ">
      <span class="brand-mark" aria-hidden="true"><i></i><i></i><i></i></span>
      <span>モーション見本帳</span>
    </a>
    <div class="header-links">
      <span class="edition">${totalSamples} SAMPLES / 2026</span>
      <a class="guide-link" href="/guide.html">使い方</a>
    </div>
  </header>

  <main id="top">
    <section class="hero" aria-labelledby="page-title">
      <p class="eyebrow">MOTION FIELD NOTES</p>
      <h1 id="page-title">名前より先に、<br><em>動きで見つける。</em></h1>
      <p class="lead">UIの反応も、動画のつなぎやカメラワークも、文字の動きも、風や水などの環境の動きも、実際の動きを見ながら探せる見本帳。<br>タブを切り替え、触って試してください。</p>
      <div class="hero-meta" aria-label="収録内容">
        <span><strong>${totalSamples}</strong> samples</span>
        <span><strong>${libraryCount}</strong> libraries</span>
        <span><strong>01</strong> edition</span>
      </div>
    </section>

    <section class="finder" aria-labelledby="finder-title">
      <div class="finder-head">
        <p class="eyebrow">SEARCH BY FEELING</p>
        <label id="finder-title" for="finder-input">印象の言葉や用途で探す</label>
      </div>
      <div class="finder-field">
        <input id="finder-input" type="search" placeholder="例：ふわっと　高級感　ボタン" autocomplete="off" enterkeyhint="search">
        <button class="finder-clear" type="button" hidden>クリア</button>
      </div>
      <div class="finder-chips" role="group" aria-label="よく使う感覚語">
        ${finderWords.map((word) => `<button class="finder-chip" type="button" data-feel="${word}">${word}</button>`).join('')}
      </div>
      <p class="finder-status" aria-live="polite"></p>
    </section>

    <section class="purpose-bar" aria-labelledby="purpose-title">
      <div class="purpose-head">
        <p class="eyebrow">CHOOSE BY PURPOSE</p>
        <h2 id="purpose-title">目的から選ぶ</h2>
        <p>プレゼンで何を伝えたいかから、使う見本をしぼります。並びは、その目的で使う順のおすすめです。</p>
      </div>
      <div class="purpose-list" role="group" aria-label="目的">
        ${purposes.map((purpose) => `
          <button class="purpose-card" type="button" data-purpose="${purpose.id}" aria-pressed="false">
            <strong>${purpose.name}</strong>
            <span>${purpose.summary}</span>
            <small>${purpose.samples.length}種類</small>
          </button>`).join('')}
      </div>
      <p class="purpose-status" aria-live="polite" hidden><span></span><button class="purpose-clear" type="button">目的の選択を解除</button></p>
      <div class="story-entry">
        <div><strong>構成を組む</strong><span>型を選んで見本を並べ、カット割り表としてコピーできます。</span></div>
        <div class="story-entry-buttons">${storyTemplates.map((template) => `<button class="story-open" type="button" data-story="${template.id}">${template.name}</button>`).join('')}<button class="story-open-custom" type="button">＋ 自分の型を作る</button><button class="story-open-ai" type="button">AIに構成を頼む</button></div>
      </div>
    </section>

    <section class="playback-bar" aria-label="再生の調整">
      ${playbackControls('page')}
      <p class="playback-note">速度はすべての見本に、「強さ」「向き」は印の付いた見本に効きます。<a href="/guide.html#adjust">詳しく</a></p>
    </section>

    <nav class="library-tabs" aria-label="見本帳を切り替える" role="tablist">
      <button class="library-tab is-active" type="button" role="tab" data-library="ui" aria-controls="ui-library" aria-selected="true">
        <span>UIモーション</span><strong data-tab-count>${samples.length}</strong>
      </button>
      <button class="library-tab" type="button" role="tab" data-library="video" aria-controls="video-library" aria-selected="false">
        <span>動画・カメラ</span><strong data-tab-count>${videoSamples.length}</strong>
      </button>
      <button class="library-tab" type="button" role="tab" data-library="text" aria-controls="text-library" aria-selected="false">
        <span>文字</span><strong data-tab-count>${textSamples.length}</strong>
      </button>
      <button class="library-tab" type="button" role="tab" data-library="environment" aria-controls="environment-library" aria-selected="false">
        <span>環境</span><strong data-tab-count>${environmentSamples.length}</strong>
      </button>
      <button class="library-tab saved-tab" type="button" role="tab" data-library="saved" aria-controls="saved-library" aria-selected="false">
        <span>保存</span><strong data-saved-count>0</strong>
      </button>
    </nav>

    <section class="catalog library-panel" id="ui-library" role="tabpanel" data-library-panel="ui" aria-labelledby="catalog-title">
      <div class="catalog-head">
        <div>
          <p class="eyebrow">INDEX</p>
          <h2 id="catalog-title">動きから選ぶ</h2>
        </div>
        <div class="filters" role="group" aria-label="雰囲気で絞り込む">
          <button class="filter is-active" type="button" data-filter="all">すべて</button>
          <button class="filter" type="button" data-filter="quiet">静か</button>
          <button class="filter" type="button" data-filter="dynamic">はっきり</button>
          <button class="filter" type="button" data-filter="decorative">装飾</button>
        </div>
      </div>
      <p class="result" aria-live="polite"><span data-result-count>${samples.length}</span>件を表示</p>
      <div class="grid" id="motion-grid"></div>
      <p class="empty-note" hidden>このタブには該当する見本がありません。上の件数を見て、ほかのタブを開いてください。</p>
    </section>

    <section class="catalog library-panel" id="video-library" role="tabpanel" data-library-panel="video" aria-labelledby="video-catalog-title" hidden>
      <div class="catalog-head video-head">
        <div>
          <p class="eyebrow">VIDEO & CAMERA</p>
          <h2 id="video-catalog-title">映像の動きから選ぶ</h2>
        </div>
        <p class="catalog-note">カーソルを重ねるか、タップして動きを試せます。</p>
      </div>
      <p class="result" aria-live="polite"><span data-result-count>${videoSamples.length}</span>件を表示</p>
      <div class="grid" id="video-grid"></div>
      <p class="empty-note" hidden>このタブには該当する見本がありません。上の件数を見て、ほかのタブを開いてください。</p>
    </section>

    <section class="catalog library-panel" id="text-library" role="tabpanel" data-library-panel="text" aria-labelledby="text-catalog-title" hidden>
      <div class="catalog-head text-head">
        <div>
          <p class="eyebrow">TYPOGRAPHY</p>
          <h2 id="text-catalog-title">文字の動きから選ぶ</h2>
        </div>
        <p class="catalog-note">カーソルを重ねるか、タップして動きを試せます。</p>
      </div>
      <p class="result" aria-live="polite"><span data-result-count>${textSamples.length}</span>件を表示</p>
      <div class="grid" id="text-grid"></div>
      <p class="empty-note" hidden>このタブには該当する見本がありません。上の件数を見て、ほかのタブを開いてください。</p>
    </section>

    <section class="catalog library-panel" id="environment-library" role="tabpanel" data-library-panel="environment" aria-labelledby="environment-catalog-title" hidden>
      <div class="catalog-head environment-head">
        <div>
          <p class="eyebrow">ENVIRONMENT</p>
          <h2 id="environment-catalog-title">環境の動きから選ぶ</h2>
        </div>
        <p class="catalog-note">建物とカメラは止めたまま、風・水・人・天気・光だけが動きます。1枚のパースを生成AIで動画にするときの指示にも使えます。</p>
      </div>
      <p class="result" aria-live="polite"><span data-result-count>${environmentSamples.length}</span>件を表示</p>
      <div class="grid" id="environment-grid"></div>
      <p class="empty-note" hidden>このタブには該当する見本がありません。上の件数を見て、ほかのタブを開いてください。</p>
    </section>

    <section class="catalog library-panel saved-panel" id="saved-library" role="tabpanel" data-library-panel="saved" aria-labelledby="saved-title" hidden>
      <div class="catalog-head">
        <div>
          <p class="eyebrow">MY COLLECTIONS</p>
          <h2 id="saved-title">保存した見本</h2>
        </div>
        <form class="collection-form">
          <label class="visually-hidden" for="collection-name">新しいコレクション名</label>
          <input id="collection-name" type="text" maxlength="20" placeholder="新しいコレクション名（例：提案用）" autocomplete="off">
          <button type="submit">作成</button>
        </form>
      </div>
      <p class="saved-note">保存した内容は、この端末のブラウザの中だけに残ります。ほかの端末とは共有されません。</p>
      <div class="collection-filter" role="group" aria-label="表示するコレクション"></div>
      <div class="collection-suggest"></div>
      <div class="grid saved-grid"></div>
      <p class="empty-note saved-empty" hidden></p>
    </section>
  </main>

  <div class="compare-tray" role="region" aria-label="比較する見本" hidden>
    <p class="compare-tray-text" aria-live="polite"></p>
    <div class="compare-tray-actions">
      <button class="compare-open" type="button" disabled>並べて見る</button>
      <button class="compare-reset" type="button">解除</button>
    </div>
  </div>

  <dialog class="compare-dialog" aria-labelledby="compare-title">
    <div class="compare-dialog-body">
    <div class="compare-dialog-head">
      <div>
        <p class="eyebrow">COMPARE</p>
        <h2 id="compare-title">2つの動きを比べる</h2>
      </div>
      <div class="compare-dialog-actions">
        <button class="compare-close" type="button">閉じる</button>
        <button class="compare-play-both" type="button">2つ同時に再生</button>
      </div>
    </div>
    ${playbackControls('compare')}
    <div class="compare-columns"></div>
    </div>
  </dialog>

  <dialog class="story-dialog" aria-labelledby="story-title">
    <div class="compare-dialog-body">
      <div class="compare-dialog-head">
        <div>
          <p class="eyebrow">STORYBOARD</p>
          <h2 id="story-title">構成を組む</h2>
        </div>
        <div class="compare-dialog-actions">
          <button class="story-close" type="button">閉じる</button>
          <button class="story-play" type="button">順に再生</button>
        </div>
      </div>
      <div class="story-templates" role="tablist" aria-label="構成の型"></div>
      <div class="story-tools"></div>
      <details class="story-ai">
        <summary>AIに構成を頼む</summary>
        <div class="story-ai-body">
          <p class="story-ai-lead">場面を書いて依頼文をコピーし、ClaudeやChatGPTに貼り付けます。返ってきた答えを下に貼ると、「自分の型」に追加されます。</p>
          <ol class="story-ai-steps">
            <li>
              <strong class="story-ai-step"><span>1</span>依頼文を作ってコピーする</strong>
              <label class="story-field">場面（だれに、何を伝えたいか）
                <textarea class="story-ai-situation" rows="3" maxlength="600" placeholder="例：工場の新しい厚生棟を、施主の役員に初めて説明する。敷地の広さと、社員が集まる吹抜けの明るさを伝えたい。"></textarea>
              </label>
              <div class="story-ai-options">
                <label class="story-field">全体の長さ
                  <select class="story-ai-length">${storyRequestLengths.map((seconds) => `<option value="${seconds}">${lengthLabel(seconds)}</option>`).join('')}</select>
                </label>
                <label class="story-field">主に使う道具
                  <select class="story-ai-tool">${Object.entries(storyRequestTools).map(([key, label]) => `<option value="${key}">${label}</option>`).join('')}</select>
                </label>
                <label class="story-field">提案の数
                  <select class="story-ai-count"><option value="1">1案</option><option value="2">2案</option><option value="3" selected>3案</option></select>
                </label>
              </div>
              <div class="story-json-actions"><button type="button" class="story-ai-copy">依頼文をコピー</button></div>
            </li>
            <li>
              <strong class="story-ai-step"><span>2</span>AIの答えを読み込む</strong>
              <label class="story-paste">AIの答えを貼り付ける（JSONの前後に文章があっても読めます）
                <textarea class="story-ai-answer" rows="3" placeholder="AIの答えをそのまま貼り付け"></textarea>
              </label>
              <div class="story-json-actions"><button type="button" class="story-ai-import">答えを読み込む</button></div>
            </li>
          </ol>
          <p class="story-ai-status story-json-status" aria-live="polite"></p>
        </div>
      </details>
      <details class="story-json">
        <summary>JSONで書き出し・読み込み</summary>
        <div class="story-json-body">
          <div class="story-json-actions">
            <button type="button" data-json="download-one">この型を書き出す（.json）</button>
            <button type="button" data-json="download-all">自分の型をすべて書き出す</button>
            <button type="button" data-json="copy-one">この型のJSONをコピー</button>
            <label class="story-file">ファイルから読み込む<input class="story-file-input" type="file" accept=".json,application/json"></label>
          </div>
          <label class="story-paste">JSONを貼り付けて読み込む
            <textarea class="story-paste-input" rows="3" placeholder='{ "format": "motion-sample-book/storyboard", "version": 1, "templates": [ … ] }'></textarea>
          </label>
          <div class="story-json-actions"><button type="button" data-json="paste">貼り付けたJSONを読み込む</button></div>
          <p class="story-json-status" aria-live="polite"></p>
        </div>
      </details>
      <div class="story-meta"></div>
      <ol class="story-slots"></ol>
      <div class="story-export">
        <label>カット割り表に入れる再現情報
          <select class="story-tool">
            <option value="">入れない（見本の名前と説明だけ）</option>
            <option value="powerpoint">PowerPoint</option>
            <option value="edit">Premiere Pro／After Effects</option>
            <option value="cg">建築CG（SketchUp／D5 Renderなど）</option>
            <option value="prompt">生成AI向けの指示文</option>
          </select>
        </label>
        <span class="story-total"></span>
        <button class="story-copy" type="button">カット割り表をコピー</button>
      </div>
    </div>
  </dialog>

  <dialog class="recipe-dialog" aria-labelledby="recipe-title">
    <div class="compare-dialog-body">
      <div class="compare-dialog-head">
        <div>
          <p class="eyebrow">REUSE</p>
          <h2 id="recipe-title"></h2>
          <p class="recipe-english"></p>
        </div>
        <div class="compare-dialog-actions">
          <button class="recipe-close" type="button">閉じる</button>
          <button class="recipe-copy-all" type="button">すべてコピー</button>
        </div>
      </div>
      <p class="recipe-note">別の道具で同じ動きを作るための手がかりです。各欄の「コピー」で貼り付けて使えます。</p>
      <div class="recipe-body"></div>
      <p class="recipe-status visually-hidden" aria-live="polite"></p>
    </div>
  </dialog>

  <footer>
    <p>Motion Sample Book — a small reference for better interactions and edits.</p>
    <a href="#top">ページ上部へ <span aria-hidden="true">↑</span></a>
  </footer>
`

const grid = document.querySelector<HTMLDivElement>('#motion-grid')!

/**
 * 見本の倍増で追加したUIモーション（11〜20）は、画面全体を使う場面型の見本。
 * 動画・文字と同じく、ホバー／タップ／フォーカスで2.4秒再生する（preview-stage）。
 */
const uiPhoto = (extra = '') => `<span class="ui-photo ${extra}"><i class="ph-sky"></i><i class="ph-far"></i><i class="ph-building"></i><i class="ph-ground"></i></span>`
const uiScenes: Record<string, string> = {
  beforeafter: `
      <span class="ba-before" aria-hidden="true"><i class="ba-bldg"></i><i class="ba-crack c1"></i><i class="ba-crack c2"></i></span>
      <span class="ba-after" aria-hidden="true"><i class="ba-bldg"></i><i class="ba-tree"></i></span>
      <span class="ba-handle" aria-hidden="true"><i></i></span>
      <small class="ui-caption left">BEFORE</small><small class="ui-caption right">AFTER</small>`,
  clipreveal: `<span class="ui-frame clip-frame" aria-hidden="true">${uiPhoto()}</span>`,
  parallax: `
      <span class="px-layer px-sky" aria-hidden="true"></span>
      <span class="px-layer px-far" aria-hidden="true"><i></i><i></i><i></i></span>
      <span class="px-layer px-building" aria-hidden="true"><i></i></span>
      <span class="px-layer px-near" aria-hidden="true"><i></i><i></i><i></i></span>
      <span class="px-scrollbar" aria-hidden="true"><i></i></span>`,
  kenburns: `<span class="ui-frame kb-frame" aria-hidden="true">${uiPhoto('kb-photo')}</span>`,
  expand: `
      <span class="xp-grid" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i></span>
      <span class="xp-card" aria-hidden="true">${uiPhoto()}<b class="xp-title">PROJECT 03</b></span>`,
  flip: `
      <span class="fl-stage" aria-hidden="true"><span class="fl-card">
        <span class="fl-face fl-front">${uiPhoto()}</span>
        <span class="fl-face fl-back"><i class="fl-room r1"></i><i class="fl-room r2"></i><i class="fl-room r3"></i></span>
      </span></span>`,
  curtain: `
      <span class="cu-page cu-a" aria-hidden="true"><b>01</b><i></i><i></i></span>
      <span class="cu-page cu-b" aria-hidden="true"><b>02</b><i></i><i></i></span>
      <span class="cu-curtain" aria-hidden="true"></span>`,
  gridreflow: `
      <span class="gr-filter" aria-hidden="true"><i>すべて</i><i>住宅</i></span>
      <span class="gr-grid" aria-hidden="true">${Array.from({ length: 6 }, (_, index) => `<i class="gr-tile t${index + 1}"></i>`).join('')}</span>`,
  hscroll: `
      <span class="hs-track" aria-hidden="true">${Array.from({ length: 5 }, (_, index) => `<i class="hs-panel"><b>0${index + 1}</b></i>`).join('')}</span>
      <span class="hs-progress" aria-hidden="true"><i></i></span>`,
  pindrop: `
      <span class="pd-map" aria-hidden="true"><i class="pd-road h"></i><i class="pd-road v"></i><i class="pd-park"></i><i class="pd-river"></i></span>
      ${[[22, 38], [58, 30], [74, 62]].map(([x, y], index) => `<span class="pd-pin" style="--x:${x}%;--y:${y}%;--i:${index}" aria-hidden="true"><i class="pd-head"></i><i class="pd-shadow"></i></span>`).join('')}`,
}

grid.innerHTML = samples.map((sample) => `
  <article class="sample-card" data-number="${sample.number}" data-category="${sample.category}" data-search="${searchText(sample)}">
    <div class="card-top">
      ${cardId(sample)}
      <span class="tag">${sample.categoryLabel}</span>
    </div>
    ${uiScenes[sample.id]
      ? `<button class="motion-stage preview-stage ui-scene ui-effect-${sample.id}" type="button" aria-label="${sample.name}の動きを試す">${uiScenes[sample.id]}
      <span class="interaction-label">HOVER / TAP</span>
    </button>`
      : `<button class="motion-stage effect-${sample.id}" type="button" aria-label="${sample.name}の動きを試す">
      <span class="demo-object">
        <span class="demo-label">TRY ME</span>
      </span>
    </button>`}
    <div class="card-copy">
      <p class="english">${sample.english}</p>
      <h3>${sample.name}</h3>
      <p>${sample.description}</p>
    </div>
    ${usageRows(sample, '向いている場所')}
  </article>
`).join('')

/** v0.2の5種類（つなぎ・ズーム・パン）が共有する画面 */
const transitionScene = `
        <span class="scene scene-a">
          <i class="scene-shape shape-a"></i>
          <small>SCENE A</small>
        </span>
        <span class="scene scene-b">
          <i class="scene-shape shape-b"></i>
          <small>SCENE B</small>
        </span>
        <span class="pan-track" aria-hidden="true"><i></i><i></i><i></i></span>`

/** v0.3で追加したカメラワークごとの画面 */
const cameraScenes: Record<string, string> = {
  tilt: `
        <span class="camera-layer tilt-track" aria-hidden="true">
          <i class="tilt-tower"></i><i class="tilt-ground"></i>
        </span>`,
  dolly: `
        <span class="camera-layer dolly-far" aria-hidden="true"><i></i><i></i><i></i></span>
        <span class="camera-layer dolly-subject" aria-hidden="true"><i></i></span>
        <span class="camera-layer dolly-near" aria-hidden="true"><i></i><i></i></span>`,
  orbit: `
        <span class="camera-layer orbit-bg" aria-hidden="true"></span>
        <span class="camera-layer orbit-stage" aria-hidden="true">
          <i class="orbit-shadow"></i>
          <span class="orbit-cube"><i class="face-front"></i><i class="face-right"></i><i class="face-back"></i><i class="face-left"></i></span>
        </span>`,
  track: `
        <span class="camera-layer track-far" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i></span>
        <span class="camera-layer track-ground" aria-hidden="true"></span>
        <span class="camera-layer track-subject" aria-hidden="true"><i></i></span>
        <span class="camera-layer track-near" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i></span>`,
  rack: `
        <span class="camera-layer rack-far" aria-hidden="true"><i></i></span>
        <span class="camera-layer rack-near" aria-hidden="true"><i></i></span>`,
  // v0.5 トライアル：建築CG
  section: `
        <span class="camera-layer sec-ground" aria-hidden="true"></span>
        <span class="sec-building" aria-hidden="true">
          <span class="sec-interior"><i class="sec-room r1"></i><i class="sec-room r2"></i><i class="sec-room r3"></i><i class="sec-room r4"></i><i class="sec-void"></i><i class="sec-stair"></i><i class="sec-slab s1"></i><i class="sec-slab s2"></i><i class="sec-slab s3"></i></span>
          <span class="sec-facade"></span>
          <span class="sec-line"></span>
        </span>
        <small class="scene-caption">SECTION</small>`,
  daynight: `
        <span class="camera-layer dn-sky" aria-hidden="true"><i class="dn-dusk"></i><i class="dn-night"></i></span>
        <span class="dn-building" aria-hidden="true">${Array.from({ length: 12 }, (_, index) => `<i style="--d:${[3, 7, 1, 10, 5, 0, 8, 2, 11, 6, 4, 9][index]}"></i>`).join('')}</span>
        <span class="camera-layer dn-ground" aria-hidden="true"></span>`,
  // 見本の倍増（建築寄り）
  sunstudy: `
        <span class="camera-layer ss-ground" aria-hidden="true"><i class="ss-road"></i><i class="ss-tree t1"></i><i class="ss-tree t2"></i><i class="ss-tree t3"></i></span>
        <span class="ss-site" aria-hidden="true"><i class="ss-shadow"></i><i class="ss-building"></i></span>
        <span class="ss-sun-orbit" aria-hidden="true"><i class="ss-sun"></i></span>
        <small class="scene-caption">SUN STUDY</small>`,
  plan3d: `
        <span class="camera-layer p3-bg" aria-hidden="true"></span>
        <span class="p3-stage" aria-hidden="true">
          <span class="p3-plan">
            <i class="p3-room r1"></i><i class="p3-room r2"></i><i class="p3-room r3"></i>
            <i class="p3-wall w-front"></i><i class="p3-wall w-back"></i><i class="p3-wall w-left"></i><i class="p3-wall w-right"></i><i class="p3-wall w-mid"></i>
          </span>
        </span>
        <small class="scene-caption">PLAN → 3D</small>`,
  exploded: `
        <span class="camera-layer ex-bg" aria-hidden="true"></span>
        <span class="ex-stage" aria-hidden="true">
          <span class="ex-axo">
            <i class="ex-layer l0" style="--i:0"></i><i class="ex-layer l1" style="--i:1"></i><i class="ex-layer l2" style="--i:2"></i><i class="ex-layer l3" style="--i:3"></i>
          </span>
        </span>
        <small class="scene-caption">AXONOMETRIC</small>`,
  // v1.0-4 構造 → 設備 → 仕上げを段階的に重ねる（左側は仕上げを外した切り欠き）
  layers: `
        <span class="camera-layer lb-bg" aria-hidden="true"></span>
        <span class="lb-frame" aria-hidden="true">
          <span class="lb-structure">${[0, 1, 2, 3].map((index) => `<i class="lb-col" style="--i:${index}"></i>`).join('')}${[0, 1, 2, 3].map((index) => `<i class="lb-beam" style="--i:${index}"></i>`).join('')}</span>
          <span class="lb-mep">${[0, 1, 2].map((index) => `<i class="lb-duct" style="--i:${index}"></i>`).join('')}<i class="lb-pipe"></i><i class="lb-cable"></i></span>
          <span class="lb-finish"><i class="lb-panel"></i><i class="lb-glass g1"></i><i class="lb-glass g2"></i><i class="lb-glass g3"></i></span>
        </span>
        <i class="lb-ground" aria-hidden="true"></i>
        <span class="lb-steps" aria-hidden="true"><b>構造</b><b>設備</b><b>仕上げ</b></span>`,
  crane: `
        <span class="camera-layer cr-sky" aria-hidden="true"></span>
        <span class="camera-layer cr-skyline" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></span>
        <span class="camera-layer cr-building" aria-hidden="true"><i class="cr-tower"></i><i class="cr-ground"></i></span>
        <span class="camera-layer cr-near" aria-hidden="true"><i></i><i></i><i></i><i></i></span>`,
  pullback: `
        <span class="camera-layer pb-scene" aria-hidden="true">
          <i class="pb-ground"></i><i class="pb-neighbor n1"></i><i class="pb-neighbor n2"></i>
          <i class="pb-building"></i><i class="pb-detail"></i>
        </span>`,
  flythrough: `
        <span class="camera-layer ft-interior" aria-hidden="true"><i class="ft-floor"></i><i class="ft-back"></i><i class="ft-window"></i><i class="ft-person"></i></span>
        <span class="camera-layer ft-facade" aria-hidden="true"><i class="ft-wall top"></i><i class="ft-wall bottom"></i><i class="ft-wall left"></i><i class="ft-wall right"></i></span>`,
  linerender: `
        <span class="camera-layer lr-paper" aria-hidden="true"></span>
        <span class="camera-layer lr-sky" aria-hidden="true"></span>
        <svg class="lr-lines" viewBox="0 0 200 120" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
          <g class="lr-fill">
            <rect x="-60" y="100" width="320" height="30" fill="#9aa58f" />
            <rect x="60" y="58" width="80" height="42" fill="#f4efe4" />
            <polygon points="52,60 100,30 148,60" fill="#cf795f" />
            <rect x="74" y="74" width="18" height="26" fill="#7d5a44" />
            <rect x="104" y="72" width="26" height="16" fill="#9cc3d5" />
          </g>
          <path pathLength="1" d="M10 100 H190" />
          <path pathLength="1" d="M60 100 V58 H140 V100" />
          <path pathLength="1" d="M52 60 L100 30 L148 60" />
          <path pathLength="1" d="M74 100 V74 H92 V100" />
          <path pathLength="1" d="M104 72 H130 V88 H104 Z" />
        </svg>
        <small class="scene-caption">SKETCH → RENDER</small>`,
  tiltshift: `
        <span class="camera-layer ts-city" aria-hidden="true">
          ${Array.from({ length: 18 }, (_, index) => `<i class="ts-block" style="--c:${index % 6};--r:${Math.floor(index / 6)}"></i>`).join('')}
          <i class="ts-road h"></i><i class="ts-road v"></i>
          <i class="ts-car c1"></i><i class="ts-car c2"></i><i class="ts-car c3"></i>
        </span>
        <span class="camera-layer ts-blur top" aria-hidden="true"></span>
        <span class="camera-layer ts-blur bottom" aria-hidden="true"></span>
        <small class="scene-caption">MINIATURE</small>`,
}

const videoGrid = document.querySelector<HTMLDivElement>('#video-grid')!

videoGrid.innerHTML = videoSamples.map((sample) => `
  <article class="sample-card video-card" data-number="${sample.number}" data-search="${searchText(sample)}">
    <div class="card-top">
      ${cardId(sample)}
      <span class="tag video-tag">${sample.categoryLabel}</span>
    </div>
    <button class="video-stage preview-stage video-effect-${sample.id}" type="button" aria-label="${sample.name}のプレビューを再生">
      <span class="video-viewport">${cameraScenes[sample.id] ?? transitionScene}
        <span class="frame-guides" aria-hidden="true"></span>
      </span>
      <span class="interaction-label">HOVER / TAP</span>
    </button>
    <div class="card-copy">
      <p class="english">${sample.english}</p>
      <h3>${sample.name}</h3>
      <p>${sample.description}</p>
    </div>
    ${usageRows(sample, '向いている場面')}
  </article>
`).join('')

const sampleText = '動きで見つける'
/** 分解／集合で、各文字が散らばる位置（em単位）と角度 */
const scatterOffsets = [
  [-2.4, -1.6, -38], [1.8, 1.9, 24], [-0.6, -2.2, 52], [2.6, -1.1, -18],
  [-1.9, 1.7, 30], [0.8, 2.3, -46], [2.2, -1.9, 16],
]

const textChars = [...sampleText].map((char, index) => {
  const [x, y, r] = scatterOffsets[index % scatterOffsets.length]
  return `<span class="ch" style="--i:${index};--x:${x}em;--y:${y}em;--r:${r}deg">${char}</span>`
}).join('')

const textGrid = document.querySelector<HTMLDivElement>('#text-grid')!

/** 見本の倍増（建築寄り）で追加した文字の見本（T06〜T10）。共通の「動きで見つける」とは別の画面を持つ */
const textScenes: Record<string, string> = {
  tracking: `
      <span class="tk-frame" aria-hidden="true">
        <span class="tk-title">SEASIDE HOUSE</span>
        <span class="tk-sub">竣工 2026 ／ 設計：モーション見本帳</span>
      </span>`,
  strokedraw: `
      <svg class="sd-svg" viewBox="0 0 320 120" aria-hidden="true">
        <text x="160" y="78" text-anchor="middle">美術館</text>
      </svg>
      <span class="sd-sub" aria-hidden="true">ART MUSEUM</span>`,
  counter: `
      <span class="ct-grid" aria-hidden="true">
        <span><small>延床面積</small><b><span data-count-to="12480">12,480</span><em>㎡</em></b></span>
        <span><small>階数</small><b><span data-count-to="24">24</span><em>F</em></b></span>
        <span><small>高さ</small><b><span data-count-to="98.5" data-decimals="1">98.5</span><em>m</em></b></span>
      </span>`,
  dimension: `
      <span class="dm-frame" aria-hidden="true">
        <i class="dm-wall left"></i><i class="dm-wall right"></i><i class="dm-room"></i>
        <span class="dm-dim"><i class="dm-ext left"></i><i class="dm-ext right"></i><i class="dm-line"></i><i class="dm-tick left"></i><i class="dm-tick right"></i><b class="dm-value">7,200</b></span>
      </span>`,
  callout: `
      <span class="co-photo" aria-hidden="true"><i class="ph-sky"></i><i class="ph-far"></i><i class="ph-building"></i><i class="ph-ground"></i></span>
      <span class="co-note n1" aria-hidden="true"><i class="co-dot"></i><i class="co-leader"></i><b class="co-label">Low-E複層ガラス</b></span>
      <span class="co-note n2" aria-hidden="true"><i class="co-dot"></i><i class="co-leader"></i><b class="co-label">木製ルーバー</b></span>`,
}

textGrid.innerHTML = textSamples.map((sample) => `
  <article class="sample-card text-card" data-number="${sample.number}" data-search="${searchText(sample)}">
    <div class="card-top">
      ${cardId(sample)}
      <span class="tag text-tag">${sample.categoryLabel}</span>
    </div>
    <button class="text-stage preview-stage text-effect-${sample.id}" type="button" aria-label="${sample.name}のプレビューを再生">
      ${textScenes[sample.id] ?? `<span class="text-frame">
        <span class="text-mask"><span class="text-line" aria-hidden="true">${textChars}<i class="caret"></i></span></span>
        <span class="text-sub" aria-hidden="true">FIND BY MOTION</span>
      </span>`}
      <span class="interaction-label">HOVER / TAP</span>
    </button>
    <div class="card-copy">
      <p class="english">${sample.english}</p>
      <h3>${sample.name}</h3>
      <p>${sample.description}</p>
    </div>
    ${usageRows(sample, '向いている場面')}
  </article>
`).join('')

/*
 * v1.0-3 環境の動き。共通の外観（空・遠景・建物・地面）に、風・水・人・天気・光の要素を重ねる。
 * 建物とカメラは動かさない（生成AIで1枚のパースを動画にするときの基本と同じ）。
 */
const envBase = (building = '') => `
        <i class="ev-sky"></i><i class="ev-far"></i>
        <span class="ev-bldg">${building}</span>
        <i class="ev-ground"></i>`
const envTrees = (extra = '') => `<i class="ev-tree t1${extra}"></i><i class="ev-tree t2${extra}"></i><i class="ev-tree t3${extra}"></i>`
const envScenes: Record<string, string> = {
  foliage: `${envBase()}${envTrees()}`,
  water: `${envBase()}<span class="ev-pool"><i class="ev-refl"></i><i class="ev-glints"></i></span>`,
  people: `${envBase()}<i class="ev-person far p1"></i><i class="ev-person far p2"></i><i class="ev-person near p3"></i><i class="ev-person near p4"></i><i class="ev-person near p5"></i>`,
  clouds: `${envBase('<i class="ev-cshadow"></i>')}<i class="ev-cloud c1"></i><i class="ev-cloud c2"></i><i class="ev-cloud c3"></i>`,
  dappled: `<i class="ev-wall"></i><i class="ev-window"></i><i class="ev-floor"></i>${Array.from({ length: 7 }, (_, index) => `<i class="ev-spot s${index + 1}"></i>`).join('')}`,
  rain: `${envBase()}<i class="ev-rain r1"></i><i class="ev-rain r2"></i>${Array.from({ length: 5 }, (_, index) => `<i class="ev-drop d${index + 1}"></i>`).join('')}`,
  snow: `${envBase()}<i class="ev-snow f1"></i><i class="ev-snow f2"></i>`,
  trails: `${envBase(Array.from({ length: 9 }, () => '<i></i>').join(''))}<i class="ev-road"></i><i class="ev-trail head l1"></i><i class="ev-trail head l2"></i><i class="ev-trail tail l3"></i><i class="ev-trail tail l4"></i>`,
  mist: `${envBase()}<i class="ev-forest"></i><i class="ev-mist m1"></i><i class="ev-mist m2"></i>`,
  seasons: `${envBase()}${envTrees()}<small class="scene-caption ev-season"><b>春</b><b>夏</b><b>秋</b><b>冬</b></small>`,
}

const environmentGrid = document.querySelector<HTMLDivElement>('#environment-grid')!

environmentGrid.innerHTML = environmentSamples.map((sample) => `
  <article class="sample-card video-card environment-card" data-number="${sample.number}" data-search="${searchText(sample)}">
    <div class="card-top">
      ${cardId(sample)}
      <span class="tag environment-tag">${sample.categoryLabel}</span>
    </div>
    <button class="video-stage preview-stage env-effect-${sample.id}" type="button" aria-label="${sample.name}のプレビューを再生">
      <span class="video-viewport env-scene" aria-hidden="true">${envScenes[sample.id]}</span>
      <span class="interaction-label">HOVER / TAP</span>
    </button>
    <div class="card-copy">
      <p class="english">${sample.english}</p>
      <h3>${sample.name}</h3>
      <p>${sample.description}</p>
    </div>
    ${usageRows(sample, '向いている場面')}
  </article>
`).join('')

const libraryTabs = [...document.querySelectorAll<HTMLButtonElement>('.library-tab')]
const libraryPanels = [...document.querySelectorAll<HTMLElement>('[data-library-panel]')]

const selectLibrary = (library: string | undefined) => {
  libraryTabs.forEach((item) => {
    const selected = item.dataset.library === library
    item.classList.toggle('is-active', selected)
    item.setAttribute('aria-selected', String(selected))
  })
  libraryPanels.forEach((panel) => {
    panel.hidden = panel.dataset.libraryPanel !== library
  })
}

libraryTabs.forEach((tab) => {
  tab.addEventListener('click', () => selectLibrary(tab.dataset.library))
})

const libraryNames: Record<string, string> = { ui: 'UI', video: '動画・カメラ', text: '文字', environment: '環境' }
const filters = [...document.querySelectorAll<HTMLButtonElement>('.filter')]
const finderInput = document.querySelector<HTMLInputElement>('#finder-input')!
const finderClear = document.querySelector<HTMLButtonElement>('.finder-clear')!
const finderStatus = document.querySelector<HTMLParagraphElement>('.finder-status')!
const finderChips = [...document.querySelectorAll<HTMLButtonElement>('.finder-chip')]
let uiFilter = 'all'
let activePurpose: string | null = null
const purposeCards = [...document.querySelectorAll<HTMLButtonElement>('.purpose-card')]
const purposeStatus = document.querySelector<HTMLParagraphElement>('.purpose-status')!

const queryTerms = () => normalize(finderInput.value).split(/\s+/).filter(Boolean)

/** 検索語（すべて含む）とUIの雰囲気フィルターを重ねて、4つの見本帳へ同時に反映する */
const applyFilters = () => {
  const terms = queryTerms()
  const counts: Record<string, number> = {}

  libraryPanels.forEach((panel) => {
    const library = panel.dataset.libraryPanel!
    if (!(library in libraryNames)) return
    let visible = 0
    panel.querySelectorAll<HTMLElement>('.sample-card').forEach((card) => {
      const text = card.dataset.search ?? ''
      const matchesQuery = terms.every((term) => text.includes(term))
      const matchesCategory = library !== 'ui' || uiFilter === 'all' || card.dataset.category === uiFilter
      const purpose = activePurpose ? purposeById.get(activePurpose) : null
      const purposeIndex = purpose ? purpose.samples.indexOf(card.dataset.number ?? '') : -1
      const matchesPurpose = !purpose || purposeIndex >= 0
      // 目的を選んでいる間は、おすすめの順に並べる
      card.style.order = purpose && purposeIndex >= 0 ? String(purposeIndex) : ''
      const show = matchesQuery && matchesCategory && matchesPurpose
      card.hidden = !show
      if (show) visible += 1
    })
    counts[library] = visible
    panel.querySelector('[data-result-count]')!.textContent = String(visible)
    panel.querySelector<HTMLElement>('.empty-note')!.hidden = visible > 0
  })

  libraryTabs.forEach((tab) => {
    const count = counts[tab.dataset.library!]
    if (count !== undefined) tab.querySelector('[data-tab-count]')!.textContent = String(count)
  })

  finderClear.hidden = terms.length === 0 && !activePurpose
  finderChips.forEach((chip) => chip.classList.toggle('is-active', terms.includes(normalize(chip.dataset.feel!))))
  purposeCards.forEach((card) => {
    const selected = card.dataset.purpose === activePurpose
    card.classList.toggle('is-active', selected)
    card.setAttribute('aria-pressed', String(selected))
  })

  purposeStatus.hidden = !activePurpose
  if (activePurpose) {
    const purpose = purposeById.get(activePurpose)!
    purposeStatus.querySelector('span')!.textContent = `「${purpose.name}」：${purpose.description} 下の見本は、使う順のおすすめに並んでいます（${Object.keys(libraryNames).map((key) => `${libraryNames[key]} ${counts[key]}`).join('／')}）。`
  }

  if (terms.length === 0 && !activePurpose) {
    finderStatus.textContent = ''
    return
  }
  const conditions = [
    activePurpose ? `目的「${purposeById.get(activePurpose)!.name}」` : '',
    terms.length ? `「${finderInput.value.trim()}」` : '',
  ].filter(Boolean).join('と')
  const total = Object.values(counts).reduce((sum, count) => sum + count, 0)
  finderStatus.textContent = total === 0
    ? `${conditions}に合う見本はありません。言葉を減らすか、別の言い方で試してください。`
    : `${conditions}に合う見本：${Object.keys(libraryNames).map((key) => `${libraryNames[key]} ${counts[key]}`).join('／')}`

  // 今のタブに結果がなく、ほかのタブにある場合は、結果のあるタブへ切り替える
  const activeLibrary = libraryTabs.find((tab) => tab.classList.contains('is-active'))?.dataset.library
  if (activeLibrary && counts[activeLibrary] === 0) {
    const next = Object.keys(libraryNames).find((key) => counts[key] > 0)
    if (next) selectLibrary(next)
  }
}

filters.forEach((button) => {
  button.addEventListener('click', () => {
    uiFilter = button.dataset.filter ?? 'all'
    filters.forEach((item) => item.classList.toggle('is-active', item === button))
    applyFilters()
  })
})

finderInput.addEventListener('input', applyFilters)

/** 目的の入口：押すとその目的で絞り込み、もう一度押すと解除。検索語とは組み合わせて使える */
purposeCards.forEach((card) => {
  card.addEventListener('click', () => {
    activePurpose = activePurpose === card.dataset.purpose ? null : card.dataset.purpose!
    applyFilters()
    // 目的を選んだときは、件数の多いタブ（ふつうは動画・カメラ）を開く
    if (activePurpose) {
      const purpose = purposeById.get(activePurpose)!
      const firstVisible = ['video', 'ui', 'text', 'environment'].find((library) => document.querySelector(`[data-library-panel="${library}"] .sample-card[data-number="${purpose.samples[0]}"]`))
      if (firstVisible) selectLibrary(firstVisible)
    }
  })
})

document.querySelector('.purpose-clear')!.addEventListener('click', () => {
  activePurpose = null
  applyFilters()
})

finderClear.addEventListener('click', () => {
  finderInput.value = ''
  activePurpose = null
  applyFilters()
  finderInput.focus()
})

/** 感覚語ボタン：押すと検索語に追加、もう一度押すと外す */
const toggleFeel = (word: string) => {
  const words = finderInput.value.trim().split(/\s+/).filter(Boolean)
  const exists = words.some((item) => normalize(item) === normalize(word))
  finderInput.value = (exists ? words.filter((item) => normalize(item) !== normalize(word)) : [...words, word]).join(' ')
  applyFilters()
}

finderChips.forEach((chip) => chip.addEventListener('click', () => toggleFeel(chip.dataset.feel!)))

/** カード内の感覚語：その言葉だけで探し直し、検索欄まで戻る */
document.querySelectorAll<HTMLButtonElement>('.feel-tag').forEach((tag) => {
  tag.addEventListener('click', () => {
    finderInput.value = tag.dataset.feel!
    applyFilters()
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    document.querySelector('.finder')!.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' })
  })
})

const settings: Record<Setting, string> = { ...defaultSettings }
const speed = () => Number(settings.speed)

/** 端末内に保存（使えない環境では毎回標準に戻るだけ） */
try {
  const saved = JSON.parse(window.localStorage.getItem('motion-sample-book:playback') ?? '{}') as Partial<Record<Setting, string>>
  ;(Object.keys(settingOptions) as Setting[]).forEach((setting) => {
    const value = saved[setting]
    if (value && settingOptions[setting].options.some(([option]) => option === value)) settings[setting] = value
  })
} catch { /* 保存できない環境では標準のまま */ }

const applySettings = () => {
  const root = document.documentElement
  root.style.setProperty('--strength', settings.strength)
  root.dataset.direction = settings.direction
  document.querySelectorAll<HTMLButtonElement>('[data-setting]').forEach((button) => {
    const checked = settings[button.dataset.setting as Setting] === button.dataset.value
    button.setAttribute('aria-checked', String(checked))
    button.classList.toggle('is-active', checked)
  })
  try { window.localStorage.setItem('motion-sample-book:playback', JSON.stringify(settings)) } catch { /* 無視 */ }
}

/** 再生中のアニメーションへ速度を反映する（遅延も含めて伸び縮みする） */
const applySpeed = (element: Element, subtree = true) => {
  element.getAnimations({ subtree }).forEach((animation) => { animation.playbackRate = speed() })
}

document.addEventListener('click', (event) => {
  const button = (event.target as Element).closest<HTMLButtonElement>('[data-setting]')
  if (!button) return
  settings[button.dataset.setting as Setting] = button.dataset.value!
  applySettings()
})

// ホバーで始まるUIモーション（CSSのtransition／animation）にも速度を効かせる
;['transitionrun', 'animationstart'].forEach((type) => {
  document.addEventListener(type, (event) => {
    const target = event.target as Element
    if (target.closest('.motion-stage, .preview-stage')) applySpeed(target, false)
  })
})

applySettings()

const motionPlaybackTimers = new WeakMap<HTMLButtonElement, number>()
const previewPlaybackTimers = new WeakMap<HTMLButtonElement, number>()
const canHover = window.matchMedia('(hover: hover) and (pointer: fine)')

/** UIモーション：クリックで0.9秒だけ再生（ホバーはCSSで反応） */
const playMotion = (stage: HTMLButtonElement) => {
  const activeTimer = motionPlaybackTimers.get(stage)
  if (activeTimer !== undefined) window.clearTimeout(activeTimer)
  stage.classList.remove('is-playing')
  void stage.offsetWidth
  stage.classList.add('is-playing')
  applySpeed(stage)
  motionPlaybackTimers.set(stage, window.setTimeout(() => {
    stage.classList.remove('is-playing')
    motionPlaybackTimers.delete(stage)
  }, 900 / speed()))
}

/** 動画・文字：ホバー／タップ／フォーカスで2.4秒再生。連続再生しても前のタイマーで止まらない */
/** 数字のカウントアップ（T08）。CSSでは数えられないので、再生のたびにJSで0から数える */
const counterFrames = new WeakMap<HTMLElement, number>()
const runCounters = (stage: HTMLElement) => {
  stage.querySelectorAll<HTMLElement>('[data-count-to]').forEach((element) => {
    const to = Number(element.dataset.countTo)
    const decimals = Number(element.dataset.decimals ?? 0)
    const format = (value: number) => value.toLocaleString('ja-JP', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const previous = counterFrames.get(element)
    if (previous !== undefined) window.cancelAnimationFrame(previous)
    if (reduce) {
      element.textContent = format(to)
      return
    }
    const delay = 200 / speed()
    const duration = 1600 / speed()
    const start = performance.now() + delay
    const step = (now: number) => {
      const progress = Math.min(Math.max((now - start) / duration, 0), 1)
      const eased = 1 - (1 - progress) ** 3
      element.textContent = format(to * eased)
      if (progress < 1) counterFrames.set(element, window.requestAnimationFrame(step))
      else counterFrames.delete(element)
    }
    element.textContent = format(0)
    counterFrames.set(element, window.requestAnimationFrame(step))
  })
}

const playPreview = (stage: HTMLButtonElement) => {
  const activeTimer = previewPlaybackTimers.get(stage)
  if (activeTimer !== undefined) window.clearTimeout(activeTimer)

  stage.classList.remove('is-playing')
  void stage.offsetWidth
  stage.classList.add('is-playing')
  applySpeed(stage)
  runCounters(stage)

  const timer = window.setTimeout(() => {
    stage.classList.remove('is-playing')
    previewPlaybackTimers.delete(stage)
  }, 2400 / speed())
  previewPlaybackTimers.set(stage, timer)
}

const playStage = (stage: HTMLButtonElement) => {
  if (stage.classList.contains('preview-stage')) playPreview(stage)
  else playMotion(stage)
}

const bindStage = (stage: HTMLButtonElement) => {
  if (stage.classList.contains('preview-stage')) {
    stage.addEventListener('pointerenter', () => {
      if (canHover.matches) playPreview(stage)
    })
    stage.addEventListener('focus', () => {
      window.requestAnimationFrame(() => {
        if (stage.matches(':focus-visible')) playPreview(stage)
      })
    })
  }
  stage.addEventListener('click', () => playStage(stage))
}

document.querySelectorAll<HTMLButtonElement>('.motion-stage, .preview-stage').forEach(bindStage)

/* v0.4-2 Compare: 2つまで選び、横並びで同時に再生する */
const compareSelection: string[] = []
const compareTray = document.querySelector<HTMLDivElement>('.compare-tray')!
const compareTrayText = document.querySelector<HTMLParagraphElement>('.compare-tray-text')!
const compareOpen = document.querySelector<HTMLButtonElement>('.compare-open')!
const compareDialog = document.querySelector<HTMLDialogElement>('.compare-dialog')!
const compareColumns = document.querySelector<HTMLDivElement>('.compare-columns')!
const compareToggles = [...document.querySelectorAll<HTMLButtonElement>('.compare-toggle')]

const sampleTitle = (number: string) => `${number} ${sampleByNumber.get(number)!.name}`

const updateCompare = () => {
  compareToggles.forEach((toggle) => {
    const selected = compareSelection.includes(toggle.dataset.compare!)
    toggle.setAttribute('aria-pressed', String(selected))
    toggle.classList.toggle('is-selected', selected)
    toggle.textContent = selected ? '✓ 比較に追加済み' : '＋ 比較に追加'
  })
  compareTray.hidden = compareSelection.length === 0
  document.body.classList.toggle('has-compare-tray', compareSelection.length > 0)
  compareOpen.disabled = compareSelection.length < 2
  compareTrayText.textContent = compareSelection.length < 2
    ? `${compareSelection.map(sampleTitle).join('')} を選択中。もう1つ選んでください。`
    : `${compareSelection.map(sampleTitle).join(' ／ ')}`
}

compareToggles.forEach((toggle) => {
  toggle.addEventListener('click', () => {
    const number = toggle.dataset.compare!
    const index = compareSelection.indexOf(number)
    if (index >= 0) compareSelection.splice(index, 1)
    else {
      // 3つ目を選んだときは、古い方と入れ替える
      if (compareSelection.length === 2) compareSelection.shift()
      compareSelection.push(number)
    }
    updateCompare()
  })
})

document.querySelector('.compare-reset')!.addEventListener('click', () => {
  compareSelection.length = 0
  updateCompare()
})

const compareStages = () => [...compareColumns.querySelectorAll<HTMLButtonElement>('.motion-stage, .preview-stage')]

compareOpen.addEventListener('click', () => {
  compareColumns.innerHTML = ''
  compareSelection.forEach((number) => {
    const sample = sampleByNumber.get(number)!
    const original = document.querySelector<HTMLButtonElement>(`.compare-toggle[data-compare="${number}"]`)!
      .closest('.sample-card')!
      .querySelector<HTMLButtonElement>('.motion-stage, .preview-stage')!
    const stage = original.cloneNode(true) as HTMLButtonElement
    stage.classList.remove('is-playing')

    const column = document.createElement('section')
    column.className = 'compare-column'
    column.innerHTML = `
      <div class="card-top">${cardId(sample)}<span class="tag">${sample.categoryLabel}</span></div>
      <div class="compare-stage-slot"></div>
      <div class="card-copy">
        <p class="english">${sample.english}</p>
        <h3>${sample.name}</h3>
        <p>${sample.description}</p>
      </div>
      <dl class="compare-facts">
        <div><dt>向いている場面</dt><dd>${sample.hint}</dd></div>
        <div><dt>避けたい場面</dt><dd>${sample.avoid}</dd></div>
        <div><dt>感覚語</dt><dd>${sample.feel.join('・')}</dd></div>
      </dl>`
    column.querySelector('.compare-stage-slot')!.append(stage)
    bindStage(stage)
    compareColumns.append(column)
  })
  compareDialog.showModal()
  window.setTimeout(() => compareStages().forEach(playStage), 200)
})

document.querySelector('.compare-play-both')!.addEventListener('click', () => compareStages().forEach(playStage))
document.querySelector('.compare-close')!.addEventListener('click', () => compareDialog.close())
compareDialog.addEventListener('click', (event) => {
  // 背景（ダイアログの外側）を押したら閉じる
  if (event.target === compareDialog) compareDialog.close()
})
compareDialog.addEventListener('close', () => { compareColumns.innerHTML = '' })

/* v0.4-4 保存とコレクション：端末内（localStorage）に保存する */
type Collection = { id: string, name: string, items: string[] }
type SavedState = { saved: string[], collections: Collection[] }

const savedKey = 'motion-sample-book:saved'

const loadSaved = (): SavedState => {
  try {
    const raw = JSON.parse(window.localStorage.getItem(savedKey) ?? '{}') as Partial<SavedState>
    const saved = (raw.saved ?? []).filter((number) => sampleByNumber.has(number))
    const collections = (raw.collections ?? [])
      .filter((collection) => collection && typeof collection.name === 'string')
      .map((collection) => ({ ...collection, items: (collection.items ?? []).filter((number) => saved.includes(number)) }))
    return { saved, collections }
  } catch {
    return { saved: [], collections: [] }
  }
}

const savedState = loadSaved()
let activeCollection = 'all'

const persistSaved = () => {
  try { window.localStorage.setItem(savedKey, JSON.stringify(savedState)) } catch { /* 保存できない環境ではこのページを開いている間だけ有効 */ }
}

const escapeHtml = (text: string) => text.replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]!))

const savedGrid = document.querySelector<HTMLDivElement>('.saved-grid')!
const savedEmpty = document.querySelector<HTMLParagraphElement>('.saved-empty')!
const collectionFilter = document.querySelector<HTMLDivElement>('.collection-filter')!
const collectionSuggest = document.querySelector<HTMLDivElement>('.collection-suggest')!
const collectionForm = document.querySelector<HTMLFormElement>('.collection-form')!
const collectionInput = document.querySelector<HTMLInputElement>('#collection-name')!

const addCollection = (name: string) => {
  const trimmed = name.trim().slice(0, 20)
  if (!trimmed) return
  const existing = savedState.collections.find((collection) => collection.name === trimmed)
  if (existing) {
    activeCollection = existing.id
    return
  }
  const id = `c${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`
  savedState.collections.push({ id, name: trimmed, items: [] })
  activeCollection = id
}

const renderSaved = () => {
  // カード側の「保存」ボタンとタブの件数
  document.querySelectorAll<HTMLButtonElement>('.save-toggle').forEach((toggle) => {
    const saved = savedState.saved.includes(toggle.dataset.save!)
    toggle.setAttribute('aria-pressed', String(saved))
    toggle.classList.toggle('is-saved', saved)
    toggle.textContent = saved ? '★ 保存済み' : '☆ 保存'
  })
  document.querySelector('[data-saved-count]')!.textContent = String(savedState.saved.length)

  if (activeCollection !== 'all' && !savedState.collections.some((collection) => collection.id === activeCollection)) activeCollection = 'all'
  const current = savedState.collections.find((collection) => collection.id === activeCollection)

  collectionFilter.innerHTML = [
    `<button class="collection-tab${activeCollection === 'all' ? ' is-active' : ''}" type="button" data-show-collection="all" aria-pressed="${activeCollection === 'all'}">すべての保存 <span>${savedState.saved.length}</span></button>`,
    ...savedState.collections.map((collection) => `<button class="collection-tab${collection.id === activeCollection ? ' is-active' : ''}" type="button" data-show-collection="${collection.id}" aria-pressed="${collection.id === activeCollection}">${escapeHtml(collection.name)} <span>${collection.items.length}</span></button>`),
    current ? `<button class="collection-delete" type="button" data-delete-collection="${current.id}">「${escapeHtml(current.name)}」を削除</button>` : '',
  ].join('')

  const missing = suggestedCollections.filter((name) => !savedState.collections.some((collection) => collection.name === name))
  collectionSuggest.innerHTML = missing.length
    ? `<span>用途別の候補：</span>${missing.map((name) => `<button type="button" data-suggest-collection="${name}">＋ ${name}</button>`).join('')}`
    : ''

  const visible = current ? savedState.saved.filter((number) => current.items.includes(number)) : savedState.saved
  savedGrid.innerHTML = ''
  visible.forEach((number) => {
    const sample = sampleByNumber.get(number)!
    const original = document.querySelector<HTMLButtonElement>(`.save-toggle[data-save="${number}"]`)!
      .closest('.sample-card')!
      .querySelector<HTMLButtonElement>('.motion-stage, .preview-stage')!
    const stage = original.cloneNode(true) as HTMLButtonElement
    stage.classList.remove('is-playing')

    const card = document.createElement('article')
    card.className = 'saved-card'
    card.innerHTML = `
      <div class="card-top">${cardId(sample)}<button class="save-remove" type="button" data-unsave="${number}">保存から外す</button></div>
      <div class="saved-stage-slot"></div>
      <div class="card-copy">
        <p class="english">${sample.english}</p>
        <h3>${sample.name}</h3>
      </div>
      <div class="collection-chips" role="group" aria-label="${sample.name}を入れるコレクション">
        ${savedState.collections.length
          ? savedState.collections.map((collection) => {
            const inside = collection.items.includes(number)
            return `<button class="collection-chip${inside ? ' is-active' : ''}" type="button" data-collection="${collection.id}" data-item="${number}" aria-pressed="${inside}">${inside ? '✓ ' : '＋ '}${escapeHtml(collection.name)}</button>`
          }).join('')
          : '<span class="collection-hint">コレクションを作ると、ここで振り分けられます。</span>'}
      </div>`
    card.querySelector('.saved-stage-slot')!.append(stage)
    bindStage(stage)
    savedGrid.append(card)
  })

  savedEmpty.hidden = visible.length > 0
  savedEmpty.textContent = savedState.saved.length === 0
    ? 'まだ保存した見本はありません。各カードの「☆ 保存」を押すと、ここに集まります。'
    : 'このコレクションにはまだ見本がありません。「すべての保存」から振り分けてください。'
}

const updateSaved = () => {
  persistSaved()
  renderSaved()
}

document.addEventListener('click', (event) => {
  const target = event.target as Element

  const saveToggle = target.closest<HTMLButtonElement>('.save-toggle')
  if (saveToggle) {
    const number = saveToggle.dataset.save!
    if (savedState.saved.includes(number)) {
      savedState.saved = savedState.saved.filter((item) => item !== number)
      savedState.collections.forEach((collection) => { collection.items = collection.items.filter((item) => item !== number) })
    } else {
      savedState.saved.push(number)
    }
    updateSaved()
    return
  }

  const unsave = target.closest<HTMLButtonElement>('[data-unsave]')
  if (unsave) {
    const number = unsave.dataset.unsave!
    savedState.saved = savedState.saved.filter((item) => item !== number)
    savedState.collections.forEach((collection) => { collection.items = collection.items.filter((item) => item !== number) })
    updateSaved()
    return
  }

  const chip = target.closest<HTMLButtonElement>('.collection-chip')
  if (chip) {
    const collection = savedState.collections.find((item) => item.id === chip.dataset.collection)
    if (!collection) return
    const number = chip.dataset.item!
    collection.items = collection.items.includes(number)
      ? collection.items.filter((item) => item !== number)
      : [...collection.items, number]
    updateSaved()
    return
  }

  const show = target.closest<HTMLButtonElement>('[data-show-collection]')
  if (show) {
    activeCollection = show.dataset.showCollection!
    renderSaved()
    return
  }

  const remove = target.closest<HTMLButtonElement>('[data-delete-collection]')
  if (remove) {
    // コレクションだけを消す。見本の保存はそのまま残す
    savedState.collections = savedState.collections.filter((collection) => collection.id !== remove.dataset.deleteCollection)
    activeCollection = 'all'
    updateSaved()
    return
  }

  const suggest = target.closest<HTMLButtonElement>('[data-suggest-collection]')
  if (suggest) {
    addCollection(suggest.dataset.suggestCollection!)
    updateSaved()
  }
})

collectionForm.addEventListener('submit', (event) => {
  event.preventDefault()
  addCollection(collectionInput.value)
  collectionInput.value = ''
  updateSaved()
})

renderSaved()

/* v0.5 再現情報：別の道具で同じ動きを作るための手がかりを表示し、コピーできるようにする */
const recipeDialog = document.querySelector<HTMLDialogElement>('.recipe-dialog')!
const recipeBody = document.querySelector<HTMLDivElement>('.recipe-body')!
const recipeStatus = document.querySelector<HTMLParagraphElement>('.recipe-status')!
let recipeTexts: { label: string, text: string, check?: CheckView }[] = []

/** 見本の情報から、そのまま人に渡せる日本語の依頼文を作る */
const briefText = (sample: Sample) => [
  `「${sample.name}」（${sample.english}）の動きでお願いします。`,
  sample.description,
  `向いている場面：${sample.hint}`,
  `避けたい場面：${sample.avoid}`,
  `印象：${sample.feel.join('・')}`,
].join('\n')

const copyText = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    // クリップボードAPIが使えない環境向け
    const area = document.createElement('textarea')
    area.value = text
    area.setAttribute('readonly', '')
    area.style.position = 'fixed'
    area.style.opacity = '0'
    document.body.append(area)
    area.select()
    const ok = document.execCommand('copy')
    area.remove()
    return ok
  }
}

const flashCopied = (button: HTMLButtonElement, ok: boolean) => {
  const original = button.dataset.label ?? button.textContent ?? ''
  button.dataset.label = original
  button.textContent = ok ? 'コピーしました' : 'コピーできませんでした'
  button.classList.toggle('is-copied', ok)
  recipeStatus.textContent = button.textContent
  window.setTimeout(() => {
    button.textContent = original
    button.classList.remove('is-copied')
  }, 1600)
}

const openRecipe = (number: string) => {
  const sample = sampleByNumber.get(number)
  const recipe = recipes[number]
  if (!sample || !recipe) return

  recipeTexts = [
    { label: '依頼文（日本語）', text: briefText(sample) },
    ...recipeTools
      .filter((tool) => recipe[tool.key as keyof Recipe])
      .map((tool) => ({ label: tool.label, text: recipe[tool.key as keyof Recipe]!, check: checkView(number, tool.key) })),
  ]

  document.querySelector('#recipe-title')!.textContent = `${sample.number} ${sample.name}`
  document.querySelector('.recipe-english')!.textContent = sample.english
  recipeBody.innerHTML = recipeTexts.map((item, index) => `
    <section class="recipe-block">
      <div class="recipe-block-head">
        <h3>${item.label}${item.check && item.check.level !== 'none' ? `<span class="check-badge is-${item.check.level}">${item.check.level === 'device' ? '✓ ' : ''}${item.check.text}</span>` : ''}</h3>
        <button class="recipe-copy" type="button" data-copy-index="${index}">コピー</button>
      </div>
      <pre><code>${escapeHtml(item.text)}</code></pre>
    </section>`).join('')
  recipeDialog.showModal()
}

document.addEventListener('click', async (event) => {
  const target = event.target as Element

  const open = target.closest<HTMLButtonElement>('.recipe-open')
  if (open) {
    openRecipe(open.dataset.recipe!)
    return
  }

  const copy = target.closest<HTMLButtonElement>('.recipe-copy')
  if (copy) {
    flashCopied(copy, await copyText(recipeTexts[Number(copy.dataset.copyIndex)].text))
    return
  }

  const copyAll = target.closest<HTMLButtonElement>('.recipe-copy-all')
  if (copyAll) {
    const title = document.querySelector('#recipe-title')!.textContent
    const all = [`# ${title}`, ...recipeTexts.map((item) => `## ${item.label}\n${item.text}`)].join('\n\n')
    flashCopied(copyAll, await copyText(all))
  }
})

document.querySelector('.recipe-close')!.addEventListener('click', () => recipeDialog.close())
recipeDialog.addEventListener('click', (event) => {
  if (event.target === recipeDialog) recipeDialog.close()
})


/*
 * v1.0-2 構成を組む：型ごとに役割（カット）へ見本を割り当て、順に再生し、カット割り表をコピーする。
 * 最初からある型（storyboard.ts）は複製して「自分の型」にでき、自分の型はカットの追加・削除・並べ替えができる。
 * 型はJSONで書き出し・読み込みできる（生成AIが作った構成も同じ読み込み口から入れる）。
 */
const storyDialog = document.querySelector<HTMLDialogElement>('.story-dialog')!
const storySlotsEl = document.querySelector<HTMLOListElement>('.story-slots')!
const storyTool = document.querySelector<HTMLSelectElement>('.story-tool')!
const storyTabsEl = document.querySelector<HTMLDivElement>('.story-templates')!
const storyToolsEl = document.querySelector<HTMLDivElement>('.story-tools')!
const storyMetaEl = document.querySelector<HTMLDivElement>('.story-meta')!
const storyJsonStatus = document.querySelector<HTMLParagraphElement>('.story-json .story-json-status')!
const storyAiStatus = document.querySelector<HTMLParagraphElement>('.story-ai-status')!
const storyKey = 'motion-sample-book:story'
const storyCustomKey = 'motion-sample-book:story-custom'
let storyTemplateId = storyTemplates[0].id
let storyEditing = false

const readJson = <T,>(key: string, fallback: T): T => {
  try { return JSON.parse(window.localStorage.getItem(key) ?? '') as T } catch { return fallback }
}
const writeJson = (key: string, value: unknown) => {
  try { window.localStorage.setItem(key, JSON.stringify(value)) } catch { /* 保存できない環境では開いている間だけ */ }
}

/** 最初からある型での選択（役割ごとの見本の番号と秒数）。端末内に保存して、次に開いたときも残す */
let storyChoices: Record<string, { numbers: string[], seconds: number[] }> = readJson(storyKey, {})
if (!storyChoices || typeof storyChoices !== 'object') storyChoices = {}
const saveStory = () => writeJson(storyKey, storyChoices)

/** 自分の型。端末内に保存し、JSONで持ち運ぶ */
let customTemplates: CustomTemplate[] = readJson(storyCustomKey, [])
if (!Array.isArray(customTemplates)) customTemplates = []
customTemplates = customTemplates.filter((template) => template && Array.isArray(template.slots) && template.slots.length)
const saveCustom = () => writeJson(storyCustomKey, customTemplates)
const customById = (id: string) => customTemplates.find((template) => template.id === id)

type StoryView = {
  id: string
  name: string
  description: string
  custom: boolean
  slots: { role: string, note: string, candidates: string[], number: string, seconds: number }[]
}

/** 最初からある型と自分の型を、同じ形で扱う */
const storyView = (id: string): StoryView => {
  const custom = customById(id)
  if (custom) {
    return {
      id, name: custom.name, description: custom.description, custom: true,
      slots: custom.slots.map((slot) => ({
        role: slot.role, note: slot.note, candidates: slot.candidates, seconds: slot.seconds,
        number: sampleByNumber.has(slot.sample) ? slot.sample : (slot.candidates[0] ?? allSamples[0].number),
      })),
    }
  }
  const template = storyTemplateById.get(id) ?? storyTemplates[0]
  const saved = storyChoices[template.id]
  return {
    id: template.id, name: template.name, description: template.description, custom: false,
    slots: template.slots.map((slot, index) => ({
      role: slot.role, note: slot.note, candidates: slot.candidates,
      number: saved?.numbers?.[index] && slot.candidates.includes(saved.numbers[index]) ? saved.numbers[index] : slot.candidates[0],
      seconds: clampSeconds(saved?.seconds?.[index], slot.seconds),
    })),
  }
}

const stageOf = (number: string) => document.querySelector<HTMLButtonElement>(`.sample-card[data-number="${number}"] .motion-stage, .sample-card[data-number="${number}"] .preview-stage`)

const sampleLabel = (number: string) => {
  const sample = sampleByNumber.get(number)!
  return `${number} ${sample.name}${shotScale[number] ? `・${shotScale[number]}` : ''}`
}

/** 見本の選択肢。最初からある型は候補だけ、自分の型は候補（あれば）＋すべての見本 */
const sampleOptions = (view: StoryView, slot: StoryView['slots'][number]) => {
  const option = (number: string, selected: boolean, suffix = '') => `<option value="${number}" ${selected ? 'selected' : ''}>${escapeHtml(sampleLabel(number))}${suffix}</option>`
  if (!view.custom) return slot.candidates.map((number, index) => option(number, number === slot.number, index === 0 ? '（おすすめ）' : '')).join('')
  let picked = false
  const pick = (number: string) => {
    const selected = !picked && number === slot.number
    if (selected) picked = true
    return selected
  }
  const groups: [string, string[]][] = [
    ['この役割の候補', slot.candidates],
    ['UIモーション', samples.map((sample) => sample.number)],
    ['動画・カメラ', videoSamples.map((sample) => sample.number)],
    ['文字', textSamples.map((sample) => sample.number)],
    ['環境', environmentSamples.map((sample) => sample.number)],
  ]
  return groups.filter(([, numbers]) => numbers.length).map(([label, numbers]) => `<optgroup label="${label}">${numbers.map((number) => option(number, pick(number))).join('')}</optgroup>`).join('')
}

const renderStoryEntry = () => {
  const button = document.querySelector<HTMLButtonElement>('.story-open-custom')!
  button.textContent = customTemplates.length ? `★ 自分の型（${customTemplates.length}）` : '＋ 自分の型を作る'
}

const renderStory = () => {
  if (!customById(storyTemplateId) && !storyTemplateById.has(storyTemplateId)) storyTemplateId = storyTemplates[0].id
  if (!customById(storyTemplateId)) storyEditing = false
  const view = storyView(storyTemplateId)
  const tab = (id: string, name: string, custom: boolean) => `<button class="story-template${custom ? ' is-custom' : ''}${id === view.id ? ' is-active' : ''}" type="button" role="tab" data-story-template="${id}" aria-selected="${id === view.id}">${custom ? '★ ' : ''}${escapeHtml(name)}</button>`
  storyTabsEl.innerHTML = [
    ...storyTemplates.map((template) => tab(template.id, template.name, false)),
    ...customTemplates.map((template) => tab(template.id, template.name, true)),
  ].join('')

  storyToolsEl.innerHTML = view.custom
    ? `<button type="button" data-story-action="edit" class="${storyEditing ? 'is-on' : ''}">${storyEditing ? '編集を終える' : '編集する'}</button>
       <button type="button" data-story-action="duplicate">複製</button>
       <button type="button" data-story-action="delete">この型を削除</button>
       <button type="button" data-story-action="new">＋ 新しい型</button>`
    : `<button type="button" data-story-action="duplicate">複製して自分の型にする</button>
       <button type="button" data-story-action="new">＋ 新しい型</button>
       <span class="story-tools-note">最初からある型は、複製すると名前やカットを変えられます。</span>`

  storyMetaEl.innerHTML = storyEditing
    ? `<label class="story-field">型の名前<input class="story-name" type="text" maxlength="40" value="${escapeHtml(view.name)}"></label>
       <label class="story-field">説明<input class="story-desc" type="text" maxlength="200" value="${escapeHtml(view.description)}" placeholder="どんな場面で使う構成か"></label>`
    : `<p class="story-description">${escapeHtml(view.description) || '（説明なし）'}</p>`

  storySlotsEl.innerHTML = ''
  storySlotsEl.classList.toggle('is-editing', storyEditing)
  view.slots.forEach((slot, index) => {
    const sample = sampleByNumber.get(slot.number)!
    const item = document.createElement('li')
    item.className = 'story-slot'
    item.dataset.index = String(index)
    const last = view.slots.length - 1
    item.innerHTML = `
      <div class="story-slot-head"><span class="story-num">${String(index + 1).padStart(2, '0')}</span>${storyEditing
        ? `<input class="story-role" type="text" maxlength="40" value="${escapeHtml(slot.role)}" aria-label="${index + 1}カット目の役割" data-index="${index}">`
        : `<strong>${escapeHtml(slot.role)}</strong>`}</div>
      ${storyEditing
        ? `<input class="story-note-input" type="text" maxlength="120" value="${escapeHtml(slot.note)}" placeholder="ねらい（任意）" aria-label="${index + 1}カット目のねらい" data-index="${index}">
           <div class="story-slot-tools">
             <button type="button" data-slot-action="left" data-index="${index}" ${index === 0 ? 'disabled' : ''} aria-label="前へ移す">←</button>
             <button type="button" data-slot-action="right" data-index="${index}" ${index === last ? 'disabled' : ''} aria-label="後ろへ移す">→</button>
             <button type="button" data-slot-action="remove" data-index="${index}" ${last === 0 ? 'disabled' : ''}>削除</button>
           </div>`
        : `<p class="story-note">${escapeHtml(slot.note)}</p>`}
      <div class="story-stage"></div>
      <label class="story-field">見本
        <select class="story-select" data-index="${index}">${sampleOptions(view, slot)}</select>
      </label>
      <label class="story-field seconds">秒数
        <input class="story-seconds" type="number" min="${storyLimits.minSeconds}" max="${storyLimits.maxSeconds}" step="1" value="${slot.seconds}" data-index="${index}">
      </label>
      <p class="story-sample">${sample.description}</p>`
    const original = stageOf(slot.number)
    if (original) {
      const stage = original.cloneNode(true) as HTMLButtonElement
      stage.classList.remove('is-playing')
      item.querySelector('.story-stage')!.append(stage)
      bindStage(stage)
    }
    storySlotsEl.append(item)
  })
  if (storyEditing) {
    const add = document.createElement('li')
    add.className = 'story-slot story-add'
    add.innerHTML = `<button type="button" data-slot-action="add" ${view.slots.length >= storyLimits.slots ? 'disabled' : ''}>＋ カットを追加</button>`
    storySlotsEl.append(add)
  }
  const total = view.slots.reduce((sum, slot) => sum + slot.seconds, 0)
  document.querySelector('.story-total')!.textContent = `${view.slots.length}カット・合計 約${total}秒`
  document.querySelector<HTMLButtonElement>('[data-json="download-all"]')!.disabled = !customTemplates.length
  renderStoryEntry()
}

/** 見本・秒数の変更。最初からある型は選択として、自分の型は型そのものに保存する */
const updateStoryChoice = (index: number, change: { number?: string, seconds?: number }) => {
  const custom = customById(storyTemplateId)
  if (custom) {
    const slot = custom.slots[index]
    if (change.number) slot.sample = change.number
    if (change.seconds !== undefined) slot.seconds = clampSeconds(change.seconds, slot.seconds)
    saveCustom()
  } else {
    const view = storyView(storyTemplateId)
    const state = { numbers: view.slots.map((slot) => slot.number), seconds: view.slots.map((slot) => slot.seconds) }
    if (change.number) state.numbers[index] = change.number
    if (change.seconds !== undefined) state.seconds[index] = clampSeconds(change.seconds, state.seconds[index])
    storyChoices[storyTemplateId] = state
    saveStory()
  }
  renderStory()
}

storySlotsEl.addEventListener('change', (event) => {
  const target = event.target as HTMLElement
  const index = Number(target.dataset.index)
  if (target.matches('.story-select')) updateStoryChoice(index, { number: (target as HTMLSelectElement).value })
  if (target.matches('.story-seconds')) updateStoryChoice(index, { seconds: Number((target as HTMLInputElement).value) || 1 })
})

/** 文字の入力は、入力のたびに保存する（描き直さないので、入力中のカーソルが外れない） */
storyDialog.addEventListener('input', (event) => {
  const custom = customById(storyTemplateId)
  const target = event.target as HTMLInputElement
  if (!custom || !storyEditing) return
  const index = Number(target.dataset.index)
  if (target.matches('.story-role')) custom.slots[index].role = target.value
  else if (target.matches('.story-note-input')) custom.slots[index].note = target.value
  else if (target.matches('.story-name')) {
    custom.name = target.value
    const tab = storyTabsEl.querySelector<HTMLButtonElement>(`[data-story-template="${custom.id}"]`)
    if (tab) tab.textContent = `★ ${target.value}`
  } else if (target.matches('.story-desc')) custom.description = target.value
  else return
  saveCustom()
})
/** 名前を空のまま終えたときは、元の形に戻す */
storyDialog.addEventListener('focusout', (event) => {
  const custom = customById(storyTemplateId)
  const target = event.target as HTMLInputElement
  if (!custom) return
  if (target.matches('.story-name') && !target.value.trim()) { custom.name = '名前のない型'; saveCustom(); renderStory() }
  if (target.matches('.story-role') && !target.value.trim()) { custom.slots[Number(target.dataset.index)].role = `カット${Number(target.dataset.index) + 1}`; saveCustom(); renderStory() }
})

storySlotsEl.addEventListener('click', (event) => {
  const button = (event.target as HTMLElement).closest<HTMLButtonElement>('[data-slot-action]')
  const custom = customById(storyTemplateId)
  if (!button || !custom) return
  const index = Number(button.dataset.index)
  const slots = custom.slots
  switch (button.dataset.slotAction) {
    case 'left': [slots[index - 1], slots[index]] = [slots[index], slots[index - 1]]; break
    case 'right': [slots[index + 1], slots[index]] = [slots[index], slots[index + 1]]; break
    case 'remove': if (slots.length > 1) slots.splice(index, 1); break
    case 'add': {
      if (slots.length >= storyLimits.slots) return
      const previous = slots[slots.length - 1]
      slots.push({ role: `カット${slots.length + 1}`, note: '', sample: previous?.sample ?? 'V08', seconds: 5, candidates: [] })
      break
    }
  }
  saveCustom()
  renderStory()
  if (button.dataset.slotAction === 'add') storySlotsEl.lastElementChild?.previousElementSibling?.scrollIntoView({ block: 'nearest', inline: 'nearest' })
})

storyTabsEl.addEventListener('click', (event) => {
  const tab = (event.target as HTMLElement).closest<HTMLButtonElement>('[data-story-template]')
  if (!tab) return
  stopStory()
  storyTemplateId = tab.dataset.storyTemplate!
  storyEditing = false
  renderStory()
})

/** 名前が重ならないようにする（「訪問の順（自分用）」「訪問の順（自分用）2」…） */
const uniqueName = (name: string) => {
  const names = new Set([...storyTemplates, ...customTemplates].map((template) => template.name))
  if (!names.has(name)) return name
  let count = 2
  while (names.has(`${name} ${count}`)) count += 1
  return `${name} ${count}`
}

const addCustom = (template: Omit<CustomTemplate, 'id'>) => {
  const created: CustomTemplate = { ...template, id: newStoryId(), name: uniqueName(template.name) }
  customTemplates.push(created)
  saveCustom()
  return created
}

let deleteArmed = 0
storyToolsEl.addEventListener('click', (event) => {
  const button = (event.target as HTMLElement).closest<HTMLButtonElement>('[data-story-action]')
  if (!button) return
  const view = storyView(storyTemplateId)
  switch (button.dataset.storyAction) {
    case 'edit':
      storyEditing = !storyEditing
      break
    case 'duplicate': {
      if (customTemplates.length >= storyLimits.templates) return
      const created = addCustom({
        name: view.custom ? `${view.name}（複製）` : `${view.name}（自分用）`,
        description: view.description,
        basedOn: view.custom ? customById(view.id)?.basedOn : view.id,
        slots: view.slots.map((slot) => ({ role: slot.role, note: slot.note, sample: slot.number, seconds: slot.seconds, candidates: [...slot.candidates] })),
      })
      storyTemplateId = created.id
      storyEditing = true
      break
    }
    case 'new': {
      if (customTemplates.length >= storyLimits.templates) return
      const created = addCustom({ name: '新しい型', description: '', slots: [{ role: 'カット1', note: '', sample: 'V08', seconds: 5, candidates: [] }] })
      storyTemplateId = created.id
      storyEditing = true
      break
    }
    case 'delete':
      // 押し間違いを防ぐため、2回押して削除する
      if (Date.now() - deleteArmed > 3000) {
        deleteArmed = Date.now()
        button.textContent = 'もう一度押すと削除'
        button.classList.add('is-armed')
        return
      }
      deleteArmed = 0
      {
        const basedOn = customById(view.id)?.basedOn
        customTemplates = customTemplates.filter((template) => template.id !== view.id)
        saveCustom()
        storyTemplateId = basedOn && storyTemplateById.has(basedOn) ? basedOn : storyTemplates[0].id
      }
      storyEditing = false
      break
  }
  stopStory()
  renderStory()
})

const openStory = (id: string, editing = false) => {
  storyTemplateId = id
  storyEditing = editing
  storyJsonStatus.textContent = ''
  storyAiStatus.textContent = ''
  renderStory()
  if (!storyDialog.open) storyDialog.showModal()
}

document.querySelectorAll<HTMLButtonElement>('.story-open').forEach((button) => {
  button.addEventListener('click', () => openStory(button.dataset.story!))
})
document.querySelector('.story-open-custom')!.addEventListener('click', () => {
  if (customTemplates.length) openStory(customTemplates[customTemplates.length - 1].id)
  else {
    const created = addCustom({ name: '新しい型', description: '', slots: [{ role: 'カット1', note: '', sample: 'V08', seconds: 5, candidates: [] }] })
    openStory(created.id, true)
  }
})
renderStoryEntry()

let storyTimers: number[] = []
const stopStory = () => {
  storyTimers.forEach((timer) => window.clearTimeout(timer))
  storyTimers = []
  storySlotsEl.querySelectorAll('.story-slot').forEach((slot) => slot.classList.remove('is-current'))
}

/** 役割の順に1つずつ再生する（プレビューは約2.4秒。速度の設定に合わせる） */
document.querySelector('.story-play')!.addEventListener('click', () => {
  stopStory()
  const slots = [...storySlotsEl.querySelectorAll<HTMLElement>('.story-slot:not(.story-add)')]
  const step = 2600 / speed()
  slots.forEach((slot, index) => {
    storyTimers.push(window.setTimeout(() => {
      slots.forEach((item) => item.classList.toggle('is-current', item === slot))
      slot.scrollIntoView({ block: 'nearest', inline: 'nearest' })
      const stage = slot.querySelector<HTMLButtonElement>('.motion-stage, .preview-stage')
      if (stage) playStage(stage)
    }, index * step))
  })
  storyTimers.push(window.setTimeout(() => slots.forEach((item) => item.classList.remove('is-current')), slots.length * step))
})

const toolNames: Record<string, string> = { powerpoint: 'PowerPoint', edit: 'Premiere Pro／After Effects', cg: '建築CG', prompt: '生成AI向けの指示文' }
const cell = (text: string) => text.replace(/\|/g, '／').replace(/\n/g, ' ')

/** カット割り表（Markdownの表）。そのまま資料や指示書に貼れる */
const storyTable = () => {
  const view = storyView(storyTemplateId)
  const tool = storyTool.value as keyof Recipe | ''
  const head = ['No.', '役割', '見本', 'カット', '秒数', '内容', ...(tool ? [toolNames[tool]] : [])]
  const rows = view.slots.map((slot, index) => {
    const sample = sampleByNumber.get(slot.number)!
    const recipeText = tool ? (recipes[slot.number]?.[tool] ?? '（この見本には記載なし）') : ''
    return [String(index + 1), slot.role, `${slot.number} ${sample.name}（${sample.english}）`, shotScale[slot.number] ?? '—', `${slot.seconds}秒`, sample.description, ...(tool ? [recipeText] : [])]
  })
  const total = view.slots.reduce((sum, slot) => sum + slot.seconds, 0)
  return [
    `# 構成：${view.name}（${view.slots.length}カット・約${total}秒）`,
    ...(view.description ? ['', view.description] : []),
    '',
    `| ${head.join(' | ')} |`,
    `| ${head.map(() => '---').join(' | ')} |`,
    ...rows.map((row) => `| ${row.map(cell).join(' | ')} |`),
    '',
    '出典：モーション見本帳 https://motion-sample-book.vercel.app/',
  ].join('\n')
}

document.querySelector('.story-copy')!.addEventListener('click', async (event) => {
  flashCopied(event.currentTarget as HTMLButtonElement, await copyText(storyTable()))
})

/* ---------- JSONの書き出し・読み込み ---------- */
const fileTemplate = (view: StoryView): StoryFileTemplate => ({
  name: view.name,
  description: view.description,
  ...(view.custom ? (customById(view.id)?.basedOn ? { basedOn: customById(view.id)!.basedOn } : {}) : { basedOn: view.id }),
  slots: view.slots.map((slot) => ({ role: slot.role, note: slot.note, sample: slot.number, seconds: slot.seconds, ...(slot.candidates.length ? { candidates: slot.candidates } : {}) })),
})
const storyJson = (templates: StoryFileTemplate[]) => JSON.stringify(toStoryFile(templates), null, 2)
const fileName = (name: string) => `storyboard-${name.replace(/[\\/:*?"<>|\s]+/g, '-').slice(0, 40) || 'template'}.json`

const download = (name: string, content: string) => {
  const url = URL.createObjectURL(new Blob([content], { type: 'application/json' }))
  const link = document.createElement('a')
  link.href = url
  link.download = name
  document.body.append(link)
  link.click()
  link.remove()
  window.setTimeout(() => URL.revokeObjectURL(url), 1000)
}

let statusTarget: HTMLElement = storyJsonStatus
const setJsonStatus = (message: string, error = false) => {
  ;[storyJsonStatus, storyAiStatus].forEach((element) => { if (element !== statusTarget) element.textContent = '' })
  statusTarget.textContent = message
  statusTarget.classList.toggle('is-error', error)
}

const importStory = (source: string, target: HTMLElement = storyJsonStatus) => {
  statusTarget = target
  try {
    const result = parseStoryFile(source, (number) => sampleByNumber.has(number))
    const room = storyLimits.templates - customTemplates.length
    if (room <= 0) throw new Error(`自分の型は${storyLimits.templates}件までです。不要な型を削除してから読み込んでください。`)
    const created = result.templates.slice(0, room).map(addCustom)
    if (result.templates.length > room) result.warnings.push(`自分の型が${storyLimits.templates}件に達したため、${result.templates.length - room}件は取り込みませんでした。`)
    storyTemplateId = created[0].id
    storyEditing = false
    renderStory()
    setJsonStatus([`${created.length}件の型を「自分の型」に読み込みました（${created.map((template) => template.name).join('、')}）。`, ...result.warnings].join(' '))
    return true
  } catch (error) {
    setJsonStatus((error as Error).message, true)
    return false
  }
}

document.querySelector('.story-json')!.addEventListener('click', async (event) => {
  const button = (event.target as HTMLElement).closest<HTMLButtonElement>('[data-json]')
  if (!button) return
  const view = storyView(storyTemplateId)
  switch (button.dataset.json) {
    case 'download-one':
      download(fileName(view.name), storyJson([fileTemplate(view)]))
      setJsonStatus(`「${view.name}」を書き出しました。`)
      break
    case 'download-all':
      download(fileName('自分の型'), storyJson(customTemplates.map((template) => fileTemplate(storyView(template.id)))))
      setJsonStatus(`自分の型${customTemplates.length}件を書き出しました。`)
      break
    case 'copy-one':
      flashCopied(button, await copyText(storyJson([fileTemplate(view)])))
      break
    case 'paste': {
      const input = document.querySelector<HTMLTextAreaElement>('.story-paste-input')!
      if (!input.value.trim()) { setJsonStatus('JSONを貼り付けてください。', true); return }
      if (importStory(input.value)) input.value = ''
      break
    }
  }
})

document.querySelector<HTMLInputElement>('.story-file-input')!.addEventListener('change', async (event) => {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file) return
  if (file.size > 1024 * 1024) setJsonStatus('ファイルが大きすぎます（1MBまで）。', true)
  else importStory(await file.text())
  input.value = ''
})

document.querySelector('.story-close')!.addEventListener('click', () => storyDialog.close())
storyDialog.addEventListener('click', (event) => { if (event.target === storyDialog) storyDialog.close() })
storyDialog.addEventListener('close', () => { stopStory(); storySlotsEl.innerHTML = '' })

/* ---------- v1.0-2b AIに構成を頼む：依頼文をコピーし、AIの答え（JSON）を読み込む ---------- */
const storyAi = document.querySelector<HTMLDetailsElement>('.story-ai')!
const storyAiDraftKey = 'motion-sample-book:story-ai'
const aiSituation = document.querySelector<HTMLTextAreaElement>('.story-ai-situation')!
const aiLength = document.querySelector<HTMLSelectElement>('.story-ai-length')!
const aiTool = document.querySelector<HTMLSelectElement>('.story-ai-tool')!
const aiCount = document.querySelector<HTMLSelectElement>('.story-ai-count')!

/** 書きかけの場面と条件は、端末に残しておく */
const aiDraft = readJson<{ situation?: string, length?: string, tool?: string, count?: string }>(storyAiDraftKey, {}) ?? {}
aiSituation.value = aiDraft.situation ?? ''
if (aiDraft.length && [...aiLength.options].some((option) => option.value === aiDraft.length)) aiLength.value = aiDraft.length
if (aiDraft.tool !== undefined && [...aiTool.options].some((option) => option.value === aiDraft.tool)) aiTool.value = aiDraft.tool
if (aiDraft.count && [...aiCount.options].some((option) => option.value === aiDraft.count)) aiCount.value = aiDraft.count
const saveAiDraft = () => writeJson(storyAiDraftKey, { situation: aiSituation.value, length: aiLength.value, tool: aiTool.value, count: aiCount.value })
;[aiSituation, aiLength, aiTool, aiCount].forEach((element) => element.addEventListener('change', saveAiDraft))
aiSituation.addEventListener('input', saveAiDraft)

document.querySelector('.story-ai-copy')!.addEventListener('click', async (event) => {
  const button = event.currentTarget as HTMLButtonElement
  const prompt = buildStoryPrompt(
    { situation: aiSituation.value, totalSeconds: Number(aiLength.value), count: Number(aiCount.value), tool: aiTool.value },
    [['UIモーション', samples], ['動画・カメラ', videoSamples], ['文字', textSamples], ['環境', environmentSamples]],
  )
  const ok = await copyText(prompt)
  flashCopied(button, ok)
  statusTarget = storyAiStatus
  setJsonStatus(ok
    ? `依頼文（約${Math.round(prompt.length / 100) / 10}千字）をコピーしました。ClaudeやChatGPTに貼り付けて送り、返ってきた答えを下に貼ってください。`
    : 'コピーできませんでした。ブラウザのクリップボードの許可を確認してください。', !ok)
})

document.querySelector('.story-ai-import')!.addEventListener('click', () => {
  const answer = document.querySelector<HTMLTextAreaElement>('.story-ai-answer')!
  if (!answer.value.trim()) { statusTarget = storyAiStatus; setJsonStatus('AIの答えを貼り付けてください。', true); return }
  if (importStory(answer.value, storyAiStatus)) answer.value = ''
})

document.querySelector('.story-open-ai')!.addEventListener('click', () => {
  openStory(storyTemplateId)
  storyAi.open = true
  aiSituation.focus()
})

