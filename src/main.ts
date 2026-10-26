import './style.css'

type MotionCategory = 'quiet' | 'dynamic' | 'decorative'

type MotionSample = {
  id: string
  number: string
  name: string
  english: string
  description: string
  category: MotionCategory
  categoryLabel: string
  hint: string
}

type VideoSample = {
  id: string
  number: string
  name: string
  english: string
  description: string
  categoryLabel: 'つなぎ' | 'カメラ'
  hint: string
}

const samples: MotionSample[] = [
  { id: 'float', number: '01', name: 'ふわっと浮く', english: 'Float', description: '位置と影を少し動かし、選べる要素だと伝える。', category: 'quiet', categoryLabel: '静か', hint: 'カード・リンク' },
  { id: 'scale', number: '02', name: '大きくなる', english: 'Scale up', description: '要素をわずかに拡大して、注目を集める。', category: 'quiet', categoryLabel: '静か', hint: '画像・アイコン' },
  { id: 'press', number: '03', name: '押し込まれる', english: 'Press', description: '沈み込みで、押した感触を返す。', category: 'quiet', categoryLabel: '静か', hint: 'ボタン' },
  { id: 'bounce', number: '04', name: 'ぷるっと弾む', english: 'Bounce', description: '小さな弾みで、楽しさや完了感を出す。', category: 'dynamic', categoryLabel: 'はっきり', hint: '完了・リアクション' },
  { id: 'shake', number: '05', name: '左右に揺れる', english: 'Shake', description: '左右の反復で、注意やエラーを知らせる。', category: 'dynamic', categoryLabel: 'はっきり', hint: '警告・入力ミス' },
  { id: 'tilt', number: '06', name: '少し傾く', english: 'Tilt', description: '角度と奥行きを加えて、遊びのある反応にする。', category: 'dynamic', categoryLabel: 'はっきり', hint: 'カード・作品' },
  { id: 'underline', number: '07', name: '下線が伸びる', english: 'Underline reveal', description: '文字を動かさず、選択状態を端的に示す。', category: 'decorative', categoryLabel: '装飾', hint: 'ナビゲーション' },
  { id: 'fill', number: '08', name: '背景色が広がる', english: 'Background fill', description: '面が横に満ちる動きで、操作を強く誘導する。', category: 'decorative', categoryLabel: '装飾', hint: '主要ボタン' },
  { id: 'shine', number: '09', name: '光が横切る', english: 'Shine', description: '光沢の移動で、特別感や新しさを表現する。', category: 'decorative', categoryLabel: '装飾', hint: 'おすすめ・新着' },
  { id: 'ripple', number: '10', name: '波紋が広がる', english: 'Ripple', description: '触れた位置から広がる印象で、入力を確認させる。', category: 'dynamic', categoryLabel: 'はっきり', hint: 'タップ操作' },
]

const videoSamples: VideoSample[] = [
  { id: 'cut', number: 'V01', name: 'カット', english: 'Cut', description: '間を作らず、次の画へ瞬時に切り替える。', categoryLabel: 'つなぎ', hint: 'テンポ・会話' },
  { id: 'fade', number: 'V02', name: 'フェード', english: 'Fade', description: '二つの画をゆっくり溶かしてつなぐ。', categoryLabel: 'つなぎ', hint: '時間経過・余韻' },
  { id: 'wipe', number: 'V03', name: 'ワイプ', english: 'Wipe', description: '次の画が横から覆うように切り替わる。', categoryLabel: 'つなぎ', hint: '場面転換・章替え' },
  { id: 'zoom', number: 'V04', name: 'ズーム', english: 'Zoom', description: '被写体へ近づき、視線と注目を集める。', categoryLabel: 'カメラ', hint: '強調・発見' },
  { id: 'pan', number: 'V05', name: 'パン', english: 'Pan', description: '視点を横へ振り、空間や関係を見せる。', categoryLabel: 'カメラ', hint: '空間説明・導入' },
]

const app = document.querySelector<HTMLDivElement>('#app')!

app.innerHTML = `
  <header class="site-header">
    <a class="brand" href="#top" aria-label="モーション見本帳 トップへ">
      <span class="brand-mark" aria-hidden="true"><i></i><i></i><i></i></span>
      <span>モーション見本帳</span>
    </a>
    <span class="edition">15 SAMPLES / 2026</span>
  </header>

  <main id="top">
    <section class="hero" aria-labelledby="page-title">
      <p class="eyebrow">MOTION FIELD NOTES</p>
      <h1 id="page-title">名前より先に、<br><em>動きで見つける。</em></h1>
      <p class="lead">UIの反応も、動画のつなぎも、実際の動きを見ながら探せる見本帳。<br>タブを切り替え、触って試してください。</p>
      <div class="hero-meta" aria-label="収録内容">
        <span><strong>15</strong> samples</span>
        <span><strong>2</strong> libraries</span>
        <span><strong>01</strong> edition</span>
      </div>
    </section>

    <nav class="library-tabs" aria-label="見本帳を切り替える" role="tablist">
      <button class="library-tab is-active" type="button" role="tab" data-library="ui" aria-controls="ui-library" aria-selected="true">
        <span>UIモーション</span><strong>10</strong>
      </button>
      <button class="library-tab" type="button" role="tab" data-library="video" aria-controls="video-library" aria-selected="false">
        <span>動画・カメラ</span><strong>5</strong>
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
      <p class="result" aria-live="polite"><span id="result-count">10</span>件を表示</p>
      <div class="grid" id="motion-grid"></div>
    </section>

    <section class="catalog library-panel" id="video-library" role="tabpanel" data-library-panel="video" aria-labelledby="video-catalog-title" hidden>
      <div class="catalog-head video-head">
        <div>
          <p class="eyebrow">VIDEO & CAMERA</p>
          <h2 id="video-catalog-title">映像の動きから選ぶ</h2>
        </div>
        <p class="catalog-note">プレビューを押すと、何度でも再生できます。</p>
      </div>
      <p class="result"><span>5</span>件を表示</p>
      <div class="grid" id="video-grid"></div>
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
    <div class="usage"><span>向いている場所</span><strong>${sample.hint}</strong></div>
  </article>
`).join('')

const videoGrid = document.querySelector<HTMLDivElement>('#video-grid')!

videoGrid.innerHTML = videoSamples.map((sample) => `
  <article class="sample-card video-card">
    <div class="card-top">
      <span class="number">${sample.number}</span>
      <span class="tag video-tag">${sample.categoryLabel}</span>
    </div>
    <button class="video-stage video-effect-${sample.id}" type="button" aria-label="${sample.name}のプレビューを再生">
      <span class="video-viewport">
        <span class="scene scene-a">
          <i class="scene-shape shape-a"></i>
          <small>SCENE A</small>
        </span>
        <span class="scene scene-b">
          <i class="scene-shape shape-b"></i>
          <small>SCENE B</small>
        </span>
        <span class="pan-track" aria-hidden="true"><i></i><i></i><i></i></span>
        <span class="frame-guides" aria-hidden="true"></span>
      </span>
      <span class="replay-label"><span aria-hidden="true">↻</span> PLAY</span>
    </button>
    <div class="card-copy">
      <p class="english">${sample.english}</p>
      <h3>${sample.name}</h3>
      <p>${sample.description}</p>
    </div>
    <div class="usage"><span>向いている場面</span><strong>${sample.hint}</strong></div>
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

document.querySelectorAll<HTMLButtonElement>('.video-stage').forEach((stage) => {
  stage.addEventListener('click', () => {
    stage.classList.remove('is-playing')
    void stage.offsetWidth
    stage.classList.add('is-playing')
    window.setTimeout(() => stage.classList.remove('is-playing'), 2400)
  })
})
