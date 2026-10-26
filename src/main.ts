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

const app = document.querySelector<HTMLDivElement>('#app')!

app.innerHTML = `
  <header class="site-header">
    <a class="brand" href="#top" aria-label="モーション見本帳 トップへ">
      <span class="brand-mark" aria-hidden="true"><i></i><i></i><i></i></span>
      <span>モーション見本帳</span>
    </a>
    <span class="edition">FIRST 10 / 2026</span>
  </header>

  <main id="top">
    <section class="hero" aria-labelledby="page-title">
      <p class="eyebrow">UI MOTION FIELD NOTES</p>
      <h1 id="page-title">操作の動きが、<br><em>一目でわかる。</em></h1>
      <p class="lead">名前を思い出せなくても、実際に触れば見つかる。<br>マウスを重ねるか、タップして試してください。</p>
      <div class="hero-meta" aria-label="収録内容">
        <span><strong>10</strong> samples</span>
        <span><strong>3</strong> moods</span>
        <span><strong>01</strong> edition</span>
      </div>
    </section>

    <section class="catalog" aria-labelledby="catalog-title">
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
  </main>

  <footer>
    <p>Motion Sample Book — a small reference for better interactions.</p>
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

const filters = [...document.querySelectorAll<HTMLButtonElement>('.filter')]
const cards = [...document.querySelectorAll<HTMLElement>('.sample-card')]
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
