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
}

type MotionSample = Sample & { category: MotionCategory }

const samples: MotionSample[] = [
  { id: 'float', number: '01', name: 'ふわっと浮く', english: 'Float', description: '位置と影を少し動かし、選べる要素だと伝える。', category: 'quiet', categoryLabel: '静か', hint: 'カード・リンク', avoid: '押せない要素' },
  { id: 'scale', number: '02', name: '大きくなる', english: 'Scale up', description: '要素をわずかに拡大して、注目を集める。', category: 'quiet', categoryLabel: '静か', hint: '画像・アイコン', avoid: '密に並んだ一覧' },
  { id: 'press', number: '03', name: '押し込まれる', english: 'Press', description: '沈み込みで、押した感触を返す。', category: 'quiet', categoryLabel: '静か', hint: 'ボタン', avoid: '文中のリンク' },
  { id: 'bounce', number: '04', name: 'ぷるっと弾む', english: 'Bounce', description: '小さな弾みで、楽しさや完了感を出す。', category: 'dynamic', categoryLabel: 'はっきり', hint: '完了・リアクション', avoid: 'エラー・真面目な通知' },
  { id: 'shake', number: '05', name: '左右に揺れる', english: 'Shake', description: '左右の反復で、注意やエラーを知らせる。', category: 'dynamic', categoryLabel: 'はっきり', hint: '警告・入力ミス', avoid: '成功・完了の通知' },
  { id: 'tilt', number: '06', name: '少し傾く', english: 'Tilt', description: '角度と奥行きを加えて、遊びのある反応にする。', category: 'dynamic', categoryLabel: 'はっきり', hint: 'カード・作品', avoid: '文字中心の情報カード' },
  { id: 'underline', number: '07', name: '下線が伸びる', english: 'Underline reveal', description: '文字を動かさず、選択状態を端的に示す。', category: 'decorative', categoryLabel: '装飾', hint: 'ナビゲーション', avoid: 'ボタン' },
  { id: 'fill', number: '08', name: '背景色が広がる', english: 'Background fill', description: '面が横に満ちる動きで、操作を強く誘導する。', category: 'decorative', categoryLabel: '装飾', hint: '主要ボタン', avoid: '補助的なリンク' },
  { id: 'shine', number: '09', name: '光が横切る', english: 'Shine', description: '光沢の移動で、特別感や新しさを表現する。', category: 'decorative', categoryLabel: '装飾', hint: 'おすすめ・新着', avoid: '常に並ぶ通常要素' },
  { id: 'ripple', number: '10', name: '波紋が広がる', english: 'Ripple', description: '触れた位置から広がる印象で、入力を確認させる。', category: 'dynamic', categoryLabel: 'はっきり', hint: 'タップ操作', avoid: '静かな読み物画面' },
]

const videoSamples: Sample[] = [
  { id: 'cut', number: 'V01', name: 'カット', english: 'Cut', description: '間を作らず、次の画へ瞬時に切り替える。', categoryLabel: 'つなぎ', hint: 'テンポ・会話', avoid: '余韻を残したい場面' },
  { id: 'fade', number: 'V02', name: 'フェード', english: 'Fade', description: '二つの画をゆっくり溶かしてつなぐ。', categoryLabel: 'つなぎ', hint: '時間経過・余韻', avoid: 'テンポを上げたい場面' },
  { id: 'wipe', number: 'V03', name: 'ワイプ', english: 'Wipe', description: '次の画が横から覆うように切り替わる。', categoryLabel: 'つなぎ', hint: '場面転換・章替え', avoid: '落ち着いた本編の途中' },
  { id: 'zoom', number: 'V04', name: 'ズーム', english: 'Zoom', description: '被写体へ近づき、視線と注目を集める。', categoryLabel: 'カメラ', hint: '強調・発見', avoid: '短い間の多用' },
  { id: 'pan', number: 'V05', name: 'パン', english: 'Pan', description: '視点を横へ振り、空間や関係を見せる。', categoryLabel: 'カメラ', hint: '空間説明・導入', avoid: '主役が一点だけの画' },
  { id: 'tilt', number: 'V06', name: 'チルト', english: 'Tilt', description: '視点を縦に振り、高さやスケールを見せる。', categoryLabel: 'カメラ', hint: '高層・吹抜け', avoid: '横に広い被写体' },
  { id: 'dolly', number: 'V07', name: 'ドリーイン', english: 'Dolly in', description: 'カメラ自体が前へ進み、手前と奥の見え方の差で没入させる。', categoryLabel: 'カメラ', hint: '導入・空間への没入', avoid: '奥行きのない平面' },
  { id: 'orbit', number: 'V08', name: 'オービット', english: 'Orbit', description: '被写体の周りを回り込み、立体の形を見せる。', categoryLabel: 'カメラ', hint: '外観・プロダクト', avoid: '正面だけ見せたい物' },
  { id: 'track', number: 'V09', name: 'トラック', english: 'Truck / Tracking', description: 'カメラが横へ移動し、手前ほど速く流れるずれで奥行きを出す。', categoryLabel: 'カメラ', hint: '街並み・並走', avoid: '一点を注視させたい場面' },
  { id: 'rack', number: 'V10', name: 'ラックフォーカス', english: 'Rack focus', description: 'ピントを手前から奥へ移し、視線の先を切り替える。', categoryLabel: 'カメラ', hint: '主役の切替・ディテール', avoid: '全体を一度に見せたい画' },
]

const textSamples: Sample[] = [
  { id: 'fade-in', number: 'T01', name: 'フェードイン', english: 'Fade in', description: '文字全体を、薄い状態から静かに浮かび上がらせる。', categoryLabel: '静か', hint: '見出し・キャプション', avoid: 'すぐ読ませたい情報' },
  { id: 'typewriter', number: 'T02', name: 'タイプ表示', english: 'Typewriter', description: '一文字ずつ打ち込むように表示し、読む速さを揃える。', categoryLabel: 'リズム', hint: '問いかけ・コード', avoid: '長い文章' },
  { id: 'stagger', number: 'T03', name: '文字送り', english: 'Stagger', description: '文字が少しずつ遅れて順に現れ、リズムを生む。', categoryLabel: 'リズム', hint: 'タイトル・ロゴ', avoid: '本文・注意書き' },
  { id: 'scatter', number: 'T04', name: '分解／集合', english: 'Scatter & assemble', description: 'ばらばらの文字が集まり、一語に組み上がる。', categoryLabel: '演出', hint: 'オープニング・ブランド', avoid: '何度も見る画面' },
  { id: 'mask', number: 'T05', name: 'マスク表示', english: 'Mask reveal', description: '見えない境界の下から、文字がせり上がって現れる。', categoryLabel: '静か', hint: '章タイトル・テロップ', avoid: '小さな文字' },
]

const totalSamples = samples.length + videoSamples.length + textSamples.length
const libraryCount = 3

const usageRows = (sample: Sample, hintLabel: string) => `
    <div class="usage"><span>${hintLabel}</span><strong>${sample.hint}</strong></div>
    <div class="usage usage-avoid"><span>避けたい場面</span><strong>${sample.avoid}</strong></div>`

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

    <nav class="library-tabs" aria-label="見本帳を切り替える" role="tablist">
      <button class="library-tab is-active" type="button" role="tab" data-library="ui" aria-controls="ui-library" aria-selected="true">
        <span>UIモーション</span><strong>${samples.length}</strong>
      </button>
      <button class="library-tab" type="button" role="tab" data-library="video" aria-controls="video-library" aria-selected="false">
        <span>動画・カメラ</span><strong>${videoSamples.length}</strong>
      </button>
      <button class="library-tab" type="button" role="tab" data-library="text" aria-controls="text-library" aria-selected="false">
        <span>文字</span><strong>${textSamples.length}</strong>
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
      <p class="result" aria-live="polite"><span id="result-count">${samples.length}</span>件を表示</p>
      <div class="grid" id="motion-grid"></div>
    </section>

    <section class="catalog library-panel" id="video-library" role="tabpanel" data-library-panel="video" aria-labelledby="video-catalog-title" hidden>
      <div class="catalog-head video-head">
        <div>
          <p class="eyebrow">VIDEO & CAMERA</p>
          <h2 id="video-catalog-title">映像の動きから選ぶ</h2>
        </div>
        <p class="catalog-note">カーソルを重ねるか、タップして動きを試せます。</p>
      </div>
      <p class="result"><span>${videoSamples.length}</span>件を表示</p>
      <div class="grid" id="video-grid"></div>
    </section>

    <section class="catalog library-panel" id="text-library" role="tabpanel" data-library-panel="text" aria-labelledby="text-catalog-title" hidden>
      <div class="catalog-head text-head">
        <div>
          <p class="eyebrow">TYPOGRAPHY</p>
          <h2 id="text-catalog-title">文字の動きから選ぶ</h2>
        </div>
        <p class="catalog-note">カーソルを重ねるか、タップして動きを試せます。</p>
      </div>
      <p class="result"><span>${textSamples.length}</span>件を表示</p>
      <div class="grid" id="text-grid"></div>
    </section>
  </main>

  <footer>
    <p>Motion Sample Book — a small reference for better interactions and edits.</p>
    <a href="#top">ページ上部へ <span aria-hidden="true">↑</span></a>
  </footer>
`

const grid = document.querySelector<HTMLDivElement>('#motion-grid')!

grid.innerHTML = samples.map((sample) => `
  <article class="sample-card" data-category="${sample.category}">
    <div class="card-top">
      <span class="number">${sample.number}</span>
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
  <article class="sample-card video-card">
    <div class="card-top">
      <span class="number">${sample.number}</span>
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
  <article class="sample-card text-card">
    <div class="card-top">
      <span class="number">${sample.number}</span>
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

libraryTabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    const selectedLibrary = tab.dataset.library
    libraryTabs.forEach((item) => {
      const selected = item === tab
      item.classList.toggle('is-active', selected)
      item.setAttribute('aria-selected', String(selected))
    })
    libraryPanels.forEach((panel) => {
      panel.hidden = panel.dataset.libraryPanel !== selectedLibrary
    })
  })
})

const filters = [...document.querySelectorAll<HTMLButtonElement>('.filter')]
const cards = [...document.querySelectorAll<HTMLElement>('#motion-grid .sample-card')]
const resultCount = document.querySelector<HTMLSpanElement>('#result-count')!

filters.forEach((button) => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter
    filters.forEach((item) => item.classList.toggle('is-active', item === button))

    let visible = 0
    cards.forEach((card) => {
      const show = filter === 'all' || card.dataset.category === filter
      card.hidden = !show
      if (show) visible += 1
    })
    resultCount.textContent = String(visible)
  })
})

document.querySelectorAll<HTMLButtonElement>('.motion-stage').forEach((stage) => {
  stage.addEventListener('click', () => {
    stage.classList.remove('is-playing')
    requestAnimationFrame(() => stage.classList.add('is-playing'))
    window.setTimeout(() => stage.classList.remove('is-playing'), 900)
  })
})

const previewPlaybackTimers = new WeakMap<HTMLButtonElement, number>()
const canHover = window.matchMedia('(hover: hover) and (pointer: fine)')

const playPreview = (stage: HTMLButtonElement) => {
  const activeTimer = previewPlaybackTimers.get(stage)
  if (activeTimer !== undefined) window.clearTimeout(activeTimer)

  stage.classList.remove('is-playing')
  void stage.offsetWidth
  stage.classList.add('is-playing')

  const timer = window.setTimeout(() => {
    stage.classList.remove('is-playing')
    previewPlaybackTimers.delete(stage)
  }, 2400)
  previewPlaybackTimers.set(stage, timer)
}

document.querySelectorAll<HTMLButtonElement>('.preview-stage').forEach((stage) => {
  stage.addEventListener('pointerenter', () => {
    if (canHover.matches) playPreview(stage)
  })

  stage.addEventListener('focus', () => {
    window.requestAnimationFrame(() => {
      if (stage.matches(':focus-visible')) playPreview(stage)
    })
  })

  stage.addEventListener('click', () => playPreview(stage))
})
