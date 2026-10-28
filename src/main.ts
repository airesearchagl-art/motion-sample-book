import './style.css'
import {
  type Sample, type Setting, samples, videoSamples, textSamples, allSamples,
  finderWords, strengthSamples, directionSamples, settingOptions, defaultSettings, suggestedCollections,
} from './data'
import { type Recipe, recipes, recipeTools, missingRecipes } from './recipes'

const totalSamples = samples.length + videoSamples.length + textSamples.length
/** 番号（01 / V01 / T01）から見本を引く。比較パネルで使う */
const sampleByNumber = new Map<string, Sample>(allSamples.map((sample) => [sample.number, sample]))
const libraryCount = 3

// 開発中だけ、再現情報が欠けている見本を知らせる（見本を足したときの書き忘れ防止）
if (import.meta.env.DEV) {
  const missing = missingRecipes(allSamples.map((sample) => sample.number))
  if (missing.length) console.warn(`再現情報（src/recipes.ts）がない見本: ${missing.join(', ')}`)
}

/** 再現情報を開くボタン。どの道具の情報があるかを小さく添える */
const recipeButton = (sample: Sample) => {
  const recipe = recipes[sample.number]
  if (!recipe) return ''
  const tools = recipeTools.filter((tool) => recipe[tool.key]).map((tool) => `<i>${tool.short}</i>`).join('')
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
].join(' '))



const adjustBadges = (sample: Sample) => {
  const labels = [
    strengthSamples.has(sample.number) ? '強さ' : '',
    directionSamples.has(sample.number) ? '向き' : '',
  ].filter(Boolean)
  return labels.length ? `<span class="adjust-badges" title="「強さ」「向き」の調整が効く見本">${labels.map((label) => `<i>${label}</i>`).join('')}</span>` : ''
}

const cardId = (sample: Sample) => `<span class="card-id"><span class="number">${sample.number}</span>${adjustBadges(sample)}</span>`


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
      <p class="lead">UIの反応も、動画のつなぎやカメラワークも、文字の動きも、実際の動きを見ながら探せる見本帳。<br>タブを切り替え、触って試してください。</p>
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
  <article class="sample-card" data-category="${sample.category}" data-search="${searchText(sample)}">
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
  <article class="sample-card video-card" data-search="${searchText(sample)}">
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

textGrid.innerHTML = textSamples.map((sample) => `
  <article class="sample-card text-card" data-search="${searchText(sample)}">
    <div class="card-top">
      ${cardId(sample)}
      <span class="tag text-tag">${sample.categoryLabel}</span>
    </div>
    <button class="text-stage preview-stage text-effect-${sample.id}" type="button" aria-label="${sample.name}のプレビューを再生">
      <span class="text-frame">
        <span class="text-mask"><span class="text-line" aria-hidden="true">${textChars}<i class="caret"></i></span></span>
        <span class="text-sub" aria-hidden="true">FIND BY MOTION</span>
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

const libraryNames: Record<string, string> = { ui: 'UI', video: '動画・カメラ', text: '文字' }
const filters = [...document.querySelectorAll<HTMLButtonElement>('.filter')]
const finderInput = document.querySelector<HTMLInputElement>('#finder-input')!
const finderClear = document.querySelector<HTMLButtonElement>('.finder-clear')!
const finderStatus = document.querySelector<HTMLParagraphElement>('.finder-status')!
const finderChips = [...document.querySelectorAll<HTMLButtonElement>('.finder-chip')]
let uiFilter = 'all'

const queryTerms = () => normalize(finderInput.value).split(/\s+/).filter(Boolean)

/** 検索語（すべて含む）とUIの雰囲気フィルターを重ねて、3つの見本帳へ同時に反映する */
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
      const show = matchesQuery && matchesCategory
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

  finderClear.hidden = terms.length === 0
  finderChips.forEach((chip) => chip.classList.toggle('is-active', terms.includes(normalize(chip.dataset.feel!))))

  if (terms.length === 0) {
    finderStatus.textContent = ''
    return
  }
  const total = Object.values(counts).reduce((sum, count) => sum + count, 0)
  finderStatus.textContent = total === 0
    ? `「${finderInput.value.trim()}」に合う見本はありません。言葉を減らすか、別の言い方で試してください。`
    : `「${finderInput.value.trim()}」に合う見本：${Object.keys(libraryNames).map((key) => `${libraryNames[key]} ${counts[key]}`).join('／')}`

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

finderClear.addEventListener('click', () => {
  finderInput.value = ''
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
const playPreview = (stage: HTMLButtonElement) => {
  const activeTimer = previewPlaybackTimers.get(stage)
  if (activeTimer !== undefined) window.clearTimeout(activeTimer)

  stage.classList.remove('is-playing')
  void stage.offsetWidth
  stage.classList.add('is-playing')
  applySpeed(stage)

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
let recipeTexts: { label: string, text: string }[] = []

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
      .map((tool) => ({ label: tool.label, text: recipe[tool.key as keyof Recipe]! })),
  ]

  document.querySelector('#recipe-title')!.textContent = `${sample.number} ${sample.name}`
  document.querySelector('.recipe-english')!.textContent = sample.english
  recipeBody.innerHTML = recipeTexts.map((item, index) => `
    <section class="recipe-block">
      <div class="recipe-block-head">
        <h3>${item.label}</h3>
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
