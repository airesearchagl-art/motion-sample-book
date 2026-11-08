/**
 * コマ並べ（/frames.html）：1つの見本の動きを、再生開始からの時刻で止めたコマにして横に並べる。
 * 静止画しか扱えない場面（紹介動画のスライド、資料の図）で、動きの流れを1枚で見せるためのページ。
 *
 *   /frames.html?n=V01                       … 見本ごとのおすすめの時刻（presets）で並べる
 *   /frames.html?n=V01&t=0.2,0.6,1.2         … 時刻（秒）を指定する。0 は「再生前（操作前）」
 *   &label=切り替え前,途中,切り替え後          … コマの下の見出し（省略すると時刻）
 *   &strength=0.6|1|1.5  &dir=normal|reverse  … 強さ・向き（見本帳の調整と同じ値）
 *
 * 仕組み：見本帳の画面（main.ts）を隠したまま作り、その中の見本の舞台を複製する。
 * 複製に再生中の印（is-playing）を付け、ブラウザの Web Animations API で各アニメーションを指定の時刻に止める。
 * JS で動かす数字（T08 など）と文字の入れ替え（T14）は、時刻から値を計算して書き込む。速度は常に ×1。
 */
import './main'
import './frames.css'
import { allSamples } from './data'

type Preset = { times: number[], labels: string[], note?: string }

/** おすすめの時刻と見出し。再生の長さは UI 01〜10 が 0.3〜0.7 秒、ほかは 2.4 秒 */
const presets: Record<string, Preset> = {
  '01': { times: [0, 0.1, 0.6], labels: ['操作前', '持ち上がる途中', '反応後（浮いて影が出る）'] },
  '02': { times: [0, 0.1, 0.6], labels: ['操作前', '大きくなる途中', '反応後（ひと回り大きい）'] },
  '03': { times: [0, 0.08, 0.6], labels: ['操作前', '沈む途中', '押した状態（沈んで影が消える）'] },
  '04': { times: [0, 0.26, 0.44], labels: ['操作前', '弾んで上がる', '沈んで戻る'], note: '弾んだあと、元の位置に戻ります' },
  '05': { times: [0, 0.1, 0.2], labels: ['操作前', '左へ振れる', '右へ振れる'], note: '左右に2往復して、元の位置に戻ります' },
  '06': { times: [0, 0.1, 0.6], labels: ['操作前', '傾く途中', '反応後（傾いて奥行きが出る）'] },
  '07': { times: [0, 0.1, 0.6], labels: ['操作前', '下線が伸びる途中', '反応後（下線が引かれた）'] },
  '08': { times: [0, 0.12, 0.6], labels: ['操作前', '色が広がる途中', '反応後（面が色で満ちた）'] },
  '09': { times: [0, 0.12, 0.24], labels: ['操作前', '光が入る', '光が横切る'], note: '光は通り抜けて、元の見た目に戻ります' },
  '10': { times: [0, 0.12, 0.3], labels: ['操作前（触れる）', '波紋が広がり始める', '波紋が広がって薄れる'], note: '波紋は広がりきると消えます' },
  V01: { times: [0.6, 1.3], labels: ['切り替え前（SCENE A）', '切り替え後（SCENE B）'], note: 'あいだに途中の画はなく、一瞬で切り替わります' },
  V22: { times: [0.95, 1.2, 2.3], labels: ['切り替え前（外観の丸窓に寄る）', '切り替え後（室内の丸い天窓）', '室内へ引く'], note: '1 と 2 は、丸の位置と大きさが同じ。形をそろえて、外から内へつなぎます' },
  V25: { times: [0.2, 0.75, 1.9], labels: ['白くなる前（SCENE A）', '白く飛ぶ途中', '次の画が現れた後（SCENE B）'] },
}

const params = new URLSearchParams(window.location.search)
const number = (params.get('n') ?? '').toUpperCase().replace(/^(\d)$/, '0$1')
const sample = allSamples.find((item) => item.number === number)
const root = document.querySelector<HTMLElement>('#frames')!

const libraryName = (num: string) => (/^\d/.test(num) ? 'UIモーション' : num.startsWith('V') ? '動画・カメラ' : num.startsWith('T') ? '文字' : '環境')
const formatTime = (time: number) => (time === 0 ? '再生前' : `${Number(time.toFixed(2))} 秒`)
const escape = (text: string) => text.replace(/[&<>"]/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[char]!))

/** 強さ・向き（main.ts が保存した値ではなく、URL の値か標準を使う） */
const html = document.documentElement
html.style.setProperty('--strength', params.get('strength') ?? '1')
html.dataset.direction = params.get('dir') === 'reverse' ? 'reverse' : 'normal'

/** 数字のカウントアップ（main.ts の runCounters と同じ式） */
const counterAt = (element: HTMLElement, time: number) => {
  const to = Number(element.dataset.countTo)
  const decimals = Number(element.dataset.decimals ?? 0)
  const progress = Math.min(Math.max((time - 0.2) / 1.6, 0), 1)
  const value = to * (1 - (1 - progress) ** 3)
  element.textContent = value.toLocaleString('ja-JP', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
}

/** 文字の入れ替え（main.ts の runScrambles と同じ進み方。決まっていない文字は時刻から決まる文字にする） */
const scrambleChars = 'ABCDEFGHJKLMNPQRSTUVWXYZ0123456789#%&*+'
const scrambleAt = (element: HTMLElement, time: number) => {
  const target = element.dataset.scramble ?? ''
  const progress = Math.min(Math.max((time - 0.15) / 1.5, 0), 1)
  const fixed = Math.floor(progress * target.length)
  element.textContent = [...target].map((char, index) => (index < fixed || char === '-' ? char : scrambleChars[(index * 7 + Math.floor(time * 30)) % scrambleChars.length])).join('')
}

/** 舞台の複製を、指定の時刻の見た目で止める */
const freeze = (stage: HTMLElement, time: number) => {
  if (time <= 0) return
  stage.classList.add('is-playing')
  void getComputedStyle(stage).opacity // 再生中の見た目を確定させて、transition と animation を始めさせる
  stage.getAnimations({ subtree: true }).forEach((animation) => {
    animation.pause()
    animation.playbackRate = 1
    animation.currentTime = time * 1000
  })
  stage.querySelectorAll<HTMLElement>('[data-count-to]').forEach((element) => counterAt(element, time))
  stage.querySelectorAll<HTMLElement>('[data-scramble]').forEach((element) => scrambleAt(element, time))
}

const render = () => {
  if (!sample) {
    root.innerHTML = `<section class="frames-empty"><h1>コマ並べ</h1><p>見本の番号を <code>?n=V01</code> のように指定してください。</p>
      <p>例：<a href="?n=01">01 ふわっと浮く</a>・<a href="?n=V01">V01 カット</a>・<a href="?n=V22">V22 マッチカット</a>・<a href="?n=V25">V25 白く飛ばしてつなぐ</a></p></section>`
    document.body.dataset.ready = 'true'
    return
  }
  const preset = presets[sample.number]
  const fromUrl = params.get('t')?.split(',').map(Number).filter((value) => Number.isFinite(value) && value >= 0).slice(0, 4)
  // おすすめの無い見本は、再生の始め・途中・終わり近く（2.4 秒で止まる見本は、止まると再生前の見た目に戻る）
  const times = fromUrl?.length ? fromUrl : preset?.times ?? [0.3, 1, 2]
  const customLabels = params.get('label')?.split(',')
  const labels = times.map((time, index) => customLabels?.[index] ?? (fromUrl?.length ? undefined : preset?.labels[index]) ?? formatTime(time))
  const source = document.querySelector<HTMLElement>(`.sample-card[data-number="${sample.number}"] .preview-stage, .sample-card[data-number="${sample.number}"] .motion-stage`)
  if (!source) {
    root.innerHTML = `<section class="frames-empty"><p>${escape(sample.number)} の見本が見つかりませんでした。</p></section>`
    document.body.dataset.ready = 'true'
    return
  }

  document.title = `${sample.number} ${sample.name} — コマ並べ — モーション見本帳`
  root.innerHTML = `
    <div class="frames-head">
      <p class="frames-library">${libraryName(sample.number)}</p>
      <h1><span class="frames-number">${escape(sample.number)}</span>${escape(sample.name)}<small>${escape(sample.english)}</small></h1>
      <p class="frames-description">${escape(sample.description)}</p>
    </div>
    <ol class="frames-row" style="--count: ${times.length}"></ol>
    <div class="frames-foot">
      <p>${escape((fromUrl?.length ? '' : preset?.note) ?? '')}</p>
      <p>モーション見本帳 — 再生開始からの時刻で止めたコマ（速度 ×1）</p>
    </div>`
  const row = root.querySelector<HTMLOListElement>('.frames-row')!
  const stages: [HTMLElement, number][] = []
  times.forEach((time, index) => {
    const item = document.createElement('li')
    item.className = 'frames-item'
    const stage = source.cloneNode(true) as HTMLElement
    stage.removeAttribute('id')
    stage.setAttribute('tabindex', '-1')
    stage.setAttribute('aria-label', `${sample.name}：${labels[index]}`)
    stage.querySelector('.interaction-label')?.remove()
    stage.classList.remove('is-playing')
    const frame = document.createElement('div')
    frame.className = 'frames-stage'
    frame.append(stage)
    item.append(frame)
    item.insertAdjacentHTML('beforeend', `<p class="frames-label"><span class="frames-step">${index + 1}</span>${escape(labels[index])}${labels[index] === formatTime(time) ? '' : `<small>${formatTime(time)}</small>`}</p>`)
    row.append(item)
    stages.push([stage, time])
  })
  // 画面に並べてから止める（表示されていない要素では transition が始まらない）
  window.requestAnimationFrame(() => {
    stages.forEach(([stage, time]) => freeze(stage, time))
    document.body.dataset.ready = 'true'
  })
}

render()
