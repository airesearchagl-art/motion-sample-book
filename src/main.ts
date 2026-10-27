import './style.css'

type MotionCategory = 'quiet' | 'dynamic' | 'decorative'

/** すべての見本が共通で持つメタデータ（v0.3で共通形式に統一） */
type Sample = {
  id: string
  number: string
  name: string
  english: string
  description: string
  categoryLabel: string
  /** 向いている場所・場面 */
  hint: string
  /** 避けたい場面 */
  avoid: string
  /** 感覚語（v0.4）。名前を知らなくても、印象の言葉から探せるようにする */
  feel: string[]
}

type MotionSample = Sample & { category: MotionCategory }

const samples: MotionSample[] = [
  { id: 'float', number: '01', name: 'ふわっと浮く', english: 'Float', description: '位置と影を少し動かし、選べる要素だと伝える。', category: 'quiet', categoryLabel: '静か', hint: 'カード・リンク', avoid: '押せない要素', feel: ['ふわっと', '軽い', '上品'] },
  { id: 'scale', number: '02', name: '大きくなる', english: 'Scale up', description: '要素をわずかに拡大して、注目を集める。', category: 'quiet', categoryLabel: '静か', hint: '画像・アイコン', avoid: '密に並んだ一覧', feel: ['注目させる', '控えめ', '親しみ'] },
  { id: 'press', number: '03', name: '押し込まれる', english: 'Press', description: '沈み込みで、押した感触を返す。', category: 'quiet', categoryLabel: '静か', hint: 'ボタン', avoid: '文中のリンク', feel: ['手応え', '確か', '控えめ'] },
  { id: 'bounce', number: '04', name: 'ぷるっと弾む', english: 'Bounce', description: '小さな弾みで、楽しさや完了感を出す。', category: 'dynamic', categoryLabel: 'はっきり', hint: '完了・リアクション', avoid: 'エラー・真面目な通知', feel: ['楽しい', '弾む', '勢いがある'] },
  { id: 'shake', number: '05', name: '左右に揺れる', english: 'Shake', description: '左右の反復で、注意やエラーを知らせる。', category: 'dynamic', categoryLabel: 'はっきり', hint: '警告・入力ミス', avoid: '成功・完了の通知', feel: ['注意', '焦り', '勢いがある'] },
  { id: 'tilt', number: '06', name: '少し傾く', english: 'Tilt', description: '角度と奥行きを加えて、遊びのある反応にする。', category: 'dynamic', categoryLabel: 'はっきり', hint: 'カード・作品', avoid: '文字中心の情報カード', feel: ['遊び心', '奥行き', '立体的'] },
  { id: 'underline', number: '07', name: '下線が伸びる', english: 'Underline reveal', description: '文字を動かさず、選択状態を端的に示す。', category: 'decorative', categoryLabel: '装飾', hint: 'ナビゲーション', avoid: 'ボタン', feel: ['上品', 'すっきり', '控えめ'] },
  { id: 'fill', number: '08', name: '背景色が広がる', english: 'Background fill', description: '面が横に満ちる動きで、操作を強く誘導する。', category: 'decorative', categoryLabel: '装飾', hint: '主要ボタン', avoid: '補助的なリンク', feel: ['力強い', '誘導', 'はっきり'] },
  { id: 'shine', number: '09', name: '光が横切る', english: 'Shine', description: '光沢の移動で、特別感や新しさを表現する。', category: 'decorative', categoryLabel: '装飾', hint: 'おすすめ・新着', avoid: '常に並ぶ通常要素', feel: ['高級感', '特別', 'きらっと'] },
  { id: 'ripple', number: '10', name: '波紋が広がる', english: 'Ripple', description: '触れた位置から広がる印象で、入力を確認させる。', category: 'dynamic', categoryLabel: 'はっきり', hint: 'タップ操作', avoid: '静かな読み物画面', feel: ['手応え', '広がる', 'やわらかい'] },
]

const videoSamples: Sample[] = [
  { id: 'cut', number: 'V01', name: 'カット', english: 'Cut', description: '間を作らず、次の画へ瞬時に切り替える。', categoryLabel: 'つなぎ', hint: 'テンポ・会話', avoid: '余韻を残したい場面', feel: ['一瞬で', 'テンポ', '歯切れよく'] },
  { id: 'fade', number: 'V02', name: 'フェード', english: 'Fade', description: '二つの画をゆっくり溶かしてつなぐ。', categoryLabel: 'つなぎ', hint: '時間経過・余韻', avoid: 'テンポを上げたい場面', feel: ['ふわっと', '余韻', 'しっとり'] },
  { id: 'wipe', number: 'V03', name: 'ワイプ', english: 'Wipe', description: '次の画が横から覆うように切り替わる。', categoryLabel: 'つなぎ', hint: '場面転換・章替え', avoid: '落ち着いた本編の途中', feel: ['勢いがある', '区切り', '軽快'] },
  { id: 'zoom', number: 'V04', name: 'ズーム', english: 'Zoom', description: '被写体へ近づき、視線と注目を集める。', categoryLabel: 'カメラ', hint: '強調・発見', avoid: '短い間の多用', feel: ['注目させる', '迫る', '発見'] },
  { id: 'pan', number: 'V05', name: 'パン', english: 'Pan', description: '視点を横へ振り、空間や関係を見せる。', categoryLabel: 'カメラ', hint: '空間説明・導入', avoid: '主役が一点だけの画', feel: ['広がる', '見渡す', '落ち着いた'] },
  { id: 'tilt', number: 'V06', name: 'チルト', english: 'Tilt', description: '視点を縦に振り、高さやスケールを見せる。', categoryLabel: 'カメラ', hint: '高層・吹抜け', avoid: '横に広い被写体', feel: ['見上げる', 'スケール感', '壮大'] },
  { id: 'dolly', number: 'V07', name: 'ドリーイン', english: 'Dolly in', description: 'カメラ自体が前へ進み、手前と奥の見え方の差で没入させる。', categoryLabel: 'カメラ', hint: '導入・空間への没入', avoid: '奥行きのない平面', feel: ['没入', '奥行き', '引き込む'] },
  { id: 'orbit', number: 'V08', name: 'オービット', english: 'Orbit', description: '被写体の周りを回り込み、立体の形を見せる。', categoryLabel: 'カメラ', hint: '外観・プロダクト', avoid: '正面だけ見せたい物', feel: ['立体的', '高級感', '見回す'] },
  { id: 'track', number: 'V09', name: 'トラック', english: 'Truck / Tracking', description: 'カメラが横へ移動し、手前ほど速く流れるずれで奥行きを出す。', categoryLabel: 'カメラ', hint: '街並み・並走', avoid: '一点を注視させたい場面', feel: ['並走', '奥行き', '軽快'] },
  { id: 'rack', number: 'V10', name: 'ラックフォーカス', english: 'Rack focus', description: 'ピントを手前から奥へ移し、視線の先を切り替える。', categoryLabel: 'カメラ', hint: '主役の切替・ディテール', avoid: '全体を一度に見せたい画', feel: ['視線誘導', '繊細', '映画的'] },
]

const textSamples: Sample[] = [
  { id: 'fade-in', number: 'T01', name: 'フェードイン', english: 'Fade in', description: '文字全体を、薄い状態から静かに浮かび上がらせる。', categoryLabel: '静か', hint: '見出し・キャプション', avoid: 'すぐ読ませたい情報', feel: ['ふわっと', '上品', '静か'] },
  { id: 'typewriter', number: 'T02', name: 'タイプ表示', english: 'Typewriter', description: '一文字ずつ打ち込むように表示し、読む速さを揃える。', categoryLabel: 'リズム', hint: '問いかけ・コード', avoid: '長い文章', feel: ['一文字ずつ', 'リズム', '語りかける'] },
  { id: 'stagger', number: 'T03', name: '文字送り', english: 'Stagger', description: '文字が少しずつ遅れて順に現れ、リズムを生む。', categoryLabel: 'リズム', hint: 'タイトル・ロゴ', avoid: '本文・注意書き', feel: ['リズム', '軽快', '弾む'] },
  { id: 'scatter', number: 'T04', name: '分解／集合', english: 'Scatter & assemble', description: 'ばらばらの文字が集まり、一語に組み上がる。', categoryLabel: '演出', hint: 'オープニング・ブランド', avoid: '何度も見る画面', feel: ['勢いがある', '組み上がる', '演出'] },
  { id: 'mask', number: 'T05', name: 'マスク表示', english: 'Mask reveal', description: '見えない境界の下から、文字がせり上がって現れる。', categoryLabel: '静か', hint: '章タイトル・テロップ', avoid: '小さな文字', feel: ['高級感', 'すっきり', '映画的'] },
]

const totalSamples = samples.length + videoSamples.length + textSamples.length
/** 番号（01 / V01 / T01）から見本を引く。比較パネルで使う */
const sampleByNumber = new Map<string, Sample>([...samples, ...videoSamples, ...textSamples].map((sample) => [sample.number, sample]))
const libraryCount = 3

const usageRows = (sample: Sample, hintLabel: string) => `
    <div class="usage"><span>${hintLabel}</span><strong>${sample.hint}</strong></div>
    <div class="usage usage-avoid"><span>避けたい場面</span><strong>${sample.avoid}</strong></div>
    <div class="feel-tags" aria-label="感覚語">${sample.feel.map((word) => `<button class="feel-tag" type="button" data-feel="${word}">#${word}</button>`).join('')}</div>
    <button class="compare-toggle" type="button" data-compare="${sample.number}" aria-pressed="false">＋ 比較に追加</button>`

/** 全角・半角、大文字・小文字、ひらがな・カタカナの違いを吸収して比較する */
const normalize = (text: string) => text
  .normalize('NFKC')
  .toLowerCase()
  .replace(/[ぁ-ゖ]/g, (char) => String.fromCharCode(char.charCodeAt(0) + 0x60))

const searchText = (sample: Sample) => normalize([
  sample.name, sample.english, sample.description, sample.categoryLabel, sample.hint, ...sample.feel,
].join(' '))

const finderWords = ['ふわっと', '一瞬で', '高級感', '勢いがある', '上品', '奥行き', '注目させる', 'リズム']

/* v0.4-3 再生の調整：速度はすべての見本、強さ・向きは意味のある見本だけに効く */
const strengthSamples = new Set(['01', '02', '04', '05', '06', 'V04', 'V07', 'T01', 'T03', 'T04'])
const directionSamples = new Set(['07', '08', '09', 'V03', 'V05', 'V06', 'V08', 'V09', 'T05'])

const adjustBadges = (sample: Sample) => {
  const labels = [
    strengthSamples.has(sample.number) ? '強さ' : '',
    directionSamples.has(sample.number) ? '向き' : '',
  ].filter(Boolean)
  return labels.length ? `<span class="adjust-badges" title="「強さ」「向き」の調整が効く見本">${labels.map((label) => `<i>${label}</i>`).join('')}</span>` : ''
}

const cardId = (sample: Sample) => `<span class="card-id"><span class="number">${sample.number}</span>${adjustBadges(sample)}</span>`

type Setting = 'speed' | 'strength' | 'direction'
const settingOptions: Record<Setting, { label: string, options: [string, string][] }> = {
  speed: { label: '速度', options: [['0.5', '×0.5'], ['1', '×1'], ['1.5', '×1.5']] },
  strength: { label: '強さ', options: [['0.5', '弱'], ['1', '標準'], ['1.6', '強']] },
  direction: { label: '向き', options: [['normal', '標準'], ['reverse', '反対']] },
}
const defaultSettings: Record<Setting, string> = { speed: '1', strength: '1', direction: 'normal' }

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
    <span class="edition">${totalSamples} SAMPLES / 2026</span>
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
      <p class="playback-note">速度はすべての見本に、「強さ」「向き」は印の付いた見本に効きます。</p>
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

  <footer>
    <p>Motion Sample Book — a small reference for better interactions and edits.</p>
    <a href="#top">ページ上部へ <span aria-hidden="true">↑</span></a>
  </footer>
`

const grid = document.querySelector<HTMLDivElement>('#motion-grid')!

grid.innerHTML = samples.map((sample) => `
  <article class="sample-card" data-category="${sample.category}" data-search="${searchText(sample)}">
    <div class="card-top">
      ${cardId(sample)}
      <span class="tag">${sample.categoryLabel}</span>
    </div>
    <button class="motion-stage effect-${sample.id}" type="button" aria-label="${sample.name}の動きを試す">
      <span class="demo-object">
        <span class="demo-label">TRY ME</span>
      </span>
    </button>
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
    tab.querySelector('[data-tab-count]')!.textContent = String(counts[tab.dataset.library!])
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
