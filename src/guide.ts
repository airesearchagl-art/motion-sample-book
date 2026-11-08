import './style.css'
import './guide.css'
import {
  samples, videoSamples, textSamples, environmentSamples, allSamples,
  finderWords, strengthSamples, directionSamples, settingOptions, suggestedCollections,
} from './data'
import { purposes, shotScaleNote } from './purposes'
import { storyTemplates, storyLimits } from './storyboard'
import { recipeTools } from './recipes'
import mapData from './guide-map.json'

/**
 * 使い方ページ。
 * 機能を追加したら、下の `sections` に1項目足し、`changelog` に1行足す。
 * 件数や「強さ」「向き」が効く見本の一覧は data.ts から自動で反映される。
 */

type Section = { id: string, title: string, lead: string, body: string }

const names = (numbers: Set<string>) => allSamples
  .filter((sample) => numbers.has(sample.number))
  .map((sample) => `<li><span class="g-num">${sample.number}</span>${sample.name}</li>`)
  .join('')

const optionLabels = (setting: keyof typeof settingOptions) => settingOptions[setting].options.map(([, label]) => `<kbd>${label}</kbd>`).join(' ')

/**
 * 画面マップ。番号の位置は scripts/capture-guide-map.cjs が src/guide-map.json に書き出す。
 * ここでは番号ごとの名前・ひとこと説明・詳しい説明の項目を決める。
 */
/** side：番号を部分の左右どちらに付けるか（重ならないように分ける） */
const mapItems: { n: number, title: string, summary: string, section: string, side?: 'left' | 'right' }[] = [
  { n: 1, title: '検索欄', summary: '思い浮かんだ言葉で4つの見本帳を探す', section: 'search' },
  { n: 2, title: '感覚語のボタン', summary: '押すだけで検索語に追加・解除', section: 'search' },
  { n: 13, title: '目的から選ぶ', summary: '伝えたいことから見本をしぼり、使う順に並べる', section: 'purpose' },
  { n: 14, title: '構成を組む', summary: '型に見本を並べ、カット割り表をコピー。自分の型やAIの提案も', section: 'story' },
  { n: 3, title: '調整バー', summary: '速度・強さ・向きを変える', section: 'adjust' },
  { n: 4, title: 'タブ', summary: '見本帳と保存を切り替える（数字は件数）', section: 'libraries' },
  { n: 5, title: '雰囲気の絞り込み', summary: 'UIを「静か・はっきり・装飾」で絞る', section: 'libraries' },
  { n: 6, title: 'プレビュー', summary: '重ねる・タップで再生', section: 'play', side: 'right' },
  { n: 7, title: '強さ・向きの印', summary: '調整が効く見本の目印', section: 'adjust', side: 'right' },
  { n: 8, title: '向いている／避けたい場面', summary: '使いどころの目安', section: 'play', side: 'right' },
  { n: 9, title: '感覚語のタグ', summary: '押すとその言葉で探し直す', section: 'search' },
  { n: 10, title: '保存', summary: '保存タブに集め、用途別に分ける', section: 'save' },
  { n: 11, title: '比較に追加', summary: '2つを横並びで同時に再生', section: 'compare', side: 'right' },
  { n: 12, title: '再現情報を見る', summary: 'CSS・編集・PPT・CG・AI向け情報をコピー', section: 'reuse', side: 'right' },
]

const markerByNumber = new Map(mapData.markers.map((marker) => [marker.n, marker]))

/** マップの記号はアルファベット（A, B, …）。説明の項目番号（01, 02, …）と区別する */
/** mapItems の並び（画面の上から順）で A, B, C … を振る */
const letterOf = (n: number) => String.fromCharCode(65 + mapItems.findIndex((item) => item.n === n))

/** 説明の項目番号と見出し。マップの凡例に「→ 05 印象の言葉で探す」のように表示する */
const sectionLabel = (id: string) => {
  const index = sections.findIndex((section) => section.id === id)
  return index < 0 ? '' : `${String(index + 1).padStart(2, '0')} ${sections[index].title}`
}

const renderMap = () => `
  <section class="guide-map" id="map" aria-labelledby="map-title">
    <div class="guide-map-head">
      <p class="eyebrow">SCREEN MAP</p>
      <h2 id="map-title">画面の見方</h2>
      <p>記号（A〜${letterOf(mapItems[mapItems.length - 1].n)}）を押すと、その部分の詳しい説明へ移動します。説明側の「画面マップへ戻る」で、ここに戻れます。</p>
    </div>
    <div class="guide-map-layout" style="--map-ratio: ${(mapData.width / mapData.height).toFixed(4)}">
      <figure class="map-figure">
        <img src="/guide/map.jpg" width="${mapData.width}" height="${mapData.height}" alt="見本帳の画面。検索欄、調整バー、タブ、見本のカードが並んでいる" loading="eager">
        ${mapItems.map((item) => {
          const marker = markerByNumber.get(item.n)
          if (!marker) return ''
          return `
          <span class="map-area" data-map="${item.n}" style="left:${marker.x}%;top:${marker.y}%;width:${marker.w}%;height:${marker.h}%" aria-hidden="true"></span>
          <a class="map-pin" data-map="${item.n}" href="#${item.section}" style="left:${Math.min(Math.max(item.side === 'right' ? marker.x + marker.w : marker.x, 2.5), 97.5)}%;top:${marker.y + marker.h / 2}%" aria-label="${letterOf(item.n)} ${item.title}の説明へ">${letterOf(item.n)}</a>`
        }).join('')}
      </figure>
      <ol class="map-legend">
        ${mapItems.map((item) => `
          <li data-map="${item.n}">
            <a href="#${item.section}">
              <span class="map-num">${letterOf(item.n)}</span>
              <strong class="map-title">${item.title}</strong>
              <span class="map-dest" title="${sectionLabel(item.section)}">→ ${sectionLabel(item.section).slice(0, 2)}</span>
              <span class="map-summary">${item.summary}</span>
            </a>
          </li>`).join('')}
      </ol>
    </div>
  </section>`

/** 各説明の上に置く「マップへ戻る」と、その説明を指しているマップの記号 */
const backToMap = (sectionId: string) => {
  const letters = mapItems.filter((item) => item.section === sectionId).map((item) => `<span class="map-num small">${letterOf(item.n)}</span>`).join('')
  return `<a class="back-to-map" href="#map">${letters ? `<span class="back-letters" aria-label="マップの記号">${letters}</span>` : ''}↑ 画面マップへ戻る</a>`
}

const sections: Section[] = [
  {
    id: 'start',
    title: 'まず試す',
    lead: '名前を知らなくても、動きを見ながら探せる見本帳です。',
    body: `
      <ol class="g-steps">
        <li><strong>タブを選ぶ</strong><span>「UIモーション」「動画・カメラ」「文字」「環境」から見たい種類を開きます。</span></li>
        <li><strong>動きを見る</strong><span>プレビューにカーソルを重ねるか、タップすると動きます。</span></li>
        <li><strong>印象で探す</strong><span>「ふわっと」「高級感」など、思い浮かんだ言葉を検索欄に入れます。</span></li>
      </ol>`,
  },
  {
    id: 'play',
    title: '見本を再生する',
    lead: 'どの見本も、同じ操作で再生できます。',
    body: `
      <table class="g-table">
        <thead><tr><th>使っている機器</th><th>再生のしかた</th></tr></thead>
        <tbody>
          <tr><td>PC（マウス）</td><td>プレビューにカーソルを重ねると1回再生。クリックすると最初から再生し直します。</td></tr>
          <tr><td>スマートフォン・タブレット</td><td>プレビューをタップすると再生します。もう一度タップすると最初から。</td></tr>
          <tr><td>キーボード</td><td>Tabキーでプレビューへ移ると再生します。Enterで再生し直します。</td></tr>
        </tbody>
      </table>
      <p>各カードには、名前、英語名、説明、<strong>向いている場面</strong>、<strong>避けたい場面</strong>、感覚語のタグが付いています。</p>`,
  },
  {
    id: 'libraries',
    title: '4つの見本帳',
    lead: `全${allSamples.length}種類を、種類ごとのタブに分けています。`,
    body: `
      <div class="g-cards is-four">
        <div><h4>UIモーション <small>${samples.length}</small></h4><p>ボタンやカードの反応、画面の切り替え、平面図や階の操作。雰囲気「静か／はっきり／装飾」で絞り込めます。</p></div>
        <div><h4>動画・カメラ <small>${videoSamples.length}</small></h4><p>カット・フェード・マッチカットなどのつなぎ、ズーム・パン・ドリーなどのカメラワーク、断面カットや照明シーン・仕上げ材の切り替えなどの建築CG。</p></div>
        <div><h4>文字 <small>${textSamples.length}</small></h4><p>見出しやテロップの出し方と、数値の見せ方。フェードイン、タイプ表示、寸法線や注記、棒グラフや割合のリングなど。</p></div>
        <div><h4>環境 <small>${environmentSamples.length}</small></h4><p>建物とカメラは止めたまま動かす、風・水・人・天気・光・季節。植栽の揺れ、水面、人の往来、雨・雪、噴水、夜景のまたたき、ガラスの映り込みなど。1枚のパースを生成AIで動画にするときにも。</p></div>
      </div>
      <p>5つ目の「保存」タブには、自分で保存した見本が集まります（<a href="#save">保存とコレクション</a>）。</p>`,
  },
  {
    id: 'search',
    title: '印象の言葉で探す',
    lead: '名前が分からなくても、受ける印象や使う場所の言葉で探せます。',
    body: `
      <ul class="g-list">
        <li>検索欄に言葉を入れると、4つの見本帳をまとめて絞り込みます。タブの数字が、それぞれの該当件数に変わります。</li>
        <li>よく使う言葉はボタンで用意しています：${finderWords.map((word) => `<kbd>${word}</kbd>`).join(' ')}。押すと検索に追加、もう一度押すと外れます。</li>
        <li>カードの下の <kbd>#ふわっと</kbd> のようなタグを押すと、その言葉で探し直します。</li>
        <li>「ボタン」「見出し」のような<strong>使う場所</strong>や、「Zoom」のような英語名でも探せます。</li>
        <li>言葉をスペースで区切ると、<strong>すべてに当てはまる</strong>見本だけを表示します。0件になったら言葉を減らしてください。</li>
        <li>ひらがな・カタカナ、全角・半角の違いは気にしなくて大丈夫です（「フワット」でも見つかります）。</li>
        <li>今のタブに結果がなく、ほかのタブにある場合は、結果のあるタブへ自動で切り替わります。</li>
      </ul>`,
  },
  {
    id: 'purpose',
    title: '目的から選ぶ',
    lead: '建築プレゼンで何を伝えたいかから、使う見本を選べます。',
    body: `
      <p>検索欄の下にある${purposes.length}つの入口のどれかを押すと、4つの見本帳をまとめて絞り込みます。見本は、その目的で<strong>使う順のおすすめ</strong>に並びます。もう一度押すか「目的の選択を解除」で元に戻ります。検索語と組み合わせることもできます。</p>
      <table class="g-table">
        <thead><tr><th>目的</th><th>どんなときに使うか</th></tr></thead>
        <tbody>${purposes.map((purpose) => `<tr><td>${purpose.name}</td><td>${purpose.description}</td></tr>`).join('')}</tbody>
      </table>
      <h4>カットの大きさの印</h4>
      <p>カメラ系の見本には、番号の横にカットの大きさを示す印があります。「周囲 → 建物 → ディテール」のように、引きから寄りへ順に組むのが基本です。</p>
      <ul class="g-list">${Object.entries(shotScaleNote).map(([scale, note]) => `<li><span class="scale-badge">${scale}</span>　${note}</li>`).join('')}</ul>`,
  },
  {
    id: 'story',
    title: '構成を組んでカット割り表を作る',
    lead: '見本を使う順に並べて、そのまま制作へ渡せるカット割り表にします。',
    body: `
      <p class="g-note"><strong>詳しい手順</strong>　写真つきで1手順ずつ説明したページがあります：<a href="/story-guide.html">構成づくり 詳しい手順</a>（はじめての構成／人に渡す／自分の型／AIに頼む／ファイルで保存）。ここでは概要だけをまとめています。</p>
      <ol class="g-steps">
        <li><strong>型を選ぶ</strong><span>目的の入口の下にある ${storyTemplates.map((template) => `<kbd>${template.name}</kbd>`).join(' ')} のどれかを押すと、構成の画面が開きます。自分で作った型は <kbd>★ 自分の型</kbd> から開きます。上のタブで型を切り替えられます。</span></li>
        <li><strong>見本を選ぶ</strong><span>カットごとに、候補から見本を選びます。最初に入っているのがおすすめです。秒数も変えられます（1〜30秒）。</span></li>
        <li><strong>通して見る</strong><span><kbd>順に再生</kbd> で、1カットずつ順番に再生して流れを確かめます。</span></li>
        <li><strong>コピーする</strong><span>「カット割り表に入れる再現情報」で道具を選び、<kbd>カット割り表をコピー</kbd> を押します。表の形（Markdown）でコピーされ、NotionやObsidianに貼り付けると表になります。</span></li>
      </ol>
      <table class="g-table">
        <thead><tr><th>構成の型</th><th>流れ</th></tr></thead>
        <tbody>${storyTemplates.map((template) => `<tr><td>${template.name}</td><td>${template.description}</td></tr>`).join('')}</tbody>
      </table>
      <p class="g-tip"><strong>使い方の例</strong>　「計画の説明」で見本を選び、再現情報に「PowerPoint」を選んでコピーすると、スライドごとのアニメーション設定つきの構成表になります。生成AIを選ぶと、カットごとの英語の指示文が入ります。</p>
      <h4>自分の型を作る</h4>
      <ul class="g-list">
        <li>最初からある型は <kbd>複製して自分の型にする</kbd> で、名前やカットを変えられる「自分の型」（★）になります。<kbd>＋ 新しい型</kbd> で空から作ることもできます。</li>
        <li><kbd>編集する</kbd> を押すと、型の名前・説明、カットの役割・ねらいを書き換え、<kbd>←</kbd> <kbd>→</kbd> で並べ替え、<kbd>＋ カットを追加</kbd>・<kbd>削除</kbd> ができます（最大${storyLimits.slots}カット）。</li>
        <li>自分の型では、見本を${allSamples.length}種類すべてから選べます。複製元の候補は「この役割の候補」として先頭に出ます。</li>
        <li><kbd>この型を削除</kbd> は、2回続けて押すと削除します。</li>
      </ul>
      <h4>AIに構成を頼む</h4>
      <p>場面に合う構成を、ClaudeやChatGPTなどの生成AIに考えてもらえます。見本帳からAIへ直接はつながず、依頼文のコピーと答えの貼り付けでやりとりします。AIは、ふだん使っているClaudeやChatGPTをそのまま使います（見本帳の側でAPIキーや料金の設定はいりません）。</p>
      <ol class="g-steps">
        <li><strong>場面を書く</strong><span>「目的から選ぶ」の下の <kbd>AIに構成を頼む</kbd>（構成の画面では同じ名前の欄）を開き、だれに何を伝えたいかを書きます。全体の長さ、主に使う道具、提案の数（1〜3案）も選べます。</span></li>
        <li><strong>依頼文をコピー</strong><span><kbd>依頼文をコピー</kbd> を押し、ClaudeやChatGPTに貼り付けて送ります。依頼文には、${allSamples.length}種類の見本の一覧と、答えの形（JSON）が入っています。</span></li>
        <li><strong>答えを読み込む</strong><span>AIの答えをそのまま「AIの答えを貼り付ける」に貼り、<kbd>答えを読み込む</kbd> を押します。提案が「自分の型」（★）に追加され、そのまま再生・編集・カット割り表のコピーができます。</span></li>
      </ol>
      <p class="g-tip"><strong>メモ</strong>　AIが見本帳にない番号を使った場合は、候補の見本に置き換えるか、そのカットを外して知らせます。気に入らなければ、場面の書き方を変えて頼み直すか、読み込んだ型を編集してください。書きかけの場面は、この端末に残ります。</p>
      <h4>PowerPoint の絵コンテで書き出す</h4>
      <ul class="g-list">
        <li><kbd>PowerPointで書き出す</kbd> を押すと、今の構成を PowerPoint のファイル（.pptx）で保存します。表紙、1カット1枚の絵コンテ、最後にカット割りの一覧表が入ります。</li>
        <li>各カットには、見本の画像、役割とねらい、見本の名前、カットの大きさ、秒数、説明が入ります。「カット割り表に入れる再現情報」で道具を選ぶと、その道具の再現情報も下に入ります。</li>
        <li>発表者ノートには、カットの要点と、生成AI向けの指示文が入ります。打ち合わせ資料の下書きとして、そのまま編集できます。</li>
      </ul>
      <h4>共有リンクで送る</h4>
      <ul class="g-list">
        <li>構成の画面の <kbd>共有リンクをコピー</kbd> を押すと、今の型（最初からある型も、選んだ見本と秒数で）を開くリンクがコピーされます。メールやチャットに貼って送れます。</li>
        <li>リンクを開いた人の画面では、構成の画面が開き、その型が「自分の型」（★）に追加されます。そのまま <kbd>順に再生</kbd> やカット割り表のコピーができます。同じリンクを何度開いても、型は増えません。</li>
        <li>構成の中身はリンクの <code>#</code> の後ろに入っていて、見本帳のサーバーには送られません。リンクを知っている人なら誰でも開けるので、送る相手に気をつけてください。</li>
      </ul>
      <h4>JSONで書き出し・読み込み</h4>
      <p>構成の画面の「JSONで書き出し・読み込み」を開きます。型を別の端末へ移したり、人と共有したりするときに使います。</p>
      <ul class="g-list">
        <li><kbd>この型を書き出す（.json）</kbd>：今の型（最初からある型も、選んだ見本と秒数で）をファイルに保存します。<kbd>自分の型をすべて書き出す</kbd> で、まとめて1つのファイルにできます。</li>
        <li><kbd>この型のJSONをコピー</kbd>：ファイルを扱いにくいスマートフォンでは、コピーしてメモやメッセージで送れます。</li>
        <li><kbd>ファイルから読み込む</kbd> または貼り付けて <kbd>貼り付けたJSONを読み込む</kbd>：「自分の型」に追加します。この見本帳にない見本の番号は、候補に置き換えるか、そのカットを外して知らせます。</li>
      </ul>
      <p class="g-note"><strong>保存先について</strong>　選んだ見本と秒数、自分の型は、この端末のブラウザの中だけに残ります。ほかの端末で使うときは、JSONで書き出して読み込んでください。JSONの形は、リポジトリの <code>docs/STORYBOARD_JSON.md</code> にまとめています。</p>`,
  },
  {
    id: 'compare',
    title: '2つを並べて比べる',
    lead: '似た動きの違いは、横に並べて同時に再生すると分かりやすくなります。',
    body: `
      <ol class="g-steps">
        <li><strong>選ぶ</strong><span>カードの <kbd>＋ 比較に追加</kbd> を2つ押します。タブをまたいで選べます。</span></li>
        <li><strong>開く</strong><span>画面下のバーの <kbd>並べて見る</kbd> を押すと、2つが横に並んで同時に再生されます。</span></li>
        <li><strong>見直す</strong><span><kbd>2つ同時に再生</kbd> で何度でも再生できます。速度などの調整も比較画面の中で変えられます。</span></li>
      </ol>
      <p class="g-tip"><strong>おすすめの組み合わせ</strong>　ズームとドリーイン（寄り方の違い）、パンとトラック（奥行きの出方の違い）、フェードとフェードイン（映像と文字の違い）</p>
      <p>3つ目を選ぶと、古い方と入れ替わります。<kbd>解除</kbd> ですべて外せます。</p>`,
  },
  {
    id: 'adjust',
    title: '速度・強さ・向きを変える',
    lead: 'タブの上の調整バーで変えます。PCでは、スクロールしても画面の上に残ります。',
    body: `
      <table class="g-table">
        <thead><tr><th>項目</th><th>選択肢</th><th>効く見本</th></tr></thead>
        <tbody>
          <tr><td>速度</td><td>${optionLabels('speed')}</td><td>すべての見本</td></tr>
          <tr><td>強さ</td><td>${optionLabels('strength')}</td><td>カードに <span class="g-badge">強さ</span> の印がある${strengthSamples.size}種類</td></tr>
          <tr><td>向き</td><td>${optionLabels('direction')}</td><td>カードに <span class="g-badge">向き</span> の印がある${directionSamples.size}種類</td></tr>
        </tbody>
      </table>
      <div class="g-columns">
        <div><h4>強さが効く見本</h4><ul class="g-names">${names(strengthSamples)}</ul></div>
        <div><h4>向きが効く見本</h4><ul class="g-names">${names(directionSamples)}</ul></div>
      </div>
      <p class="g-tip"><strong>強さの違いが分かりやすい見本</strong>　V07 ドリーイン、T04 分解／集合、05 左右に揺れる。動きが小さい見本（大きくなる、少し傾く）は差が控えめです。</p>
      <p>選んだ設定は、この端末に保存され、次に開いたときもそのまま使えます。</p>`,
  },
  {
    id: 'save',
    title: '保存とコレクション',
    lead: '気になった見本を集めて、用途ごとに分けておけます。',
    body: `
      <ol class="g-steps">
        <li><strong>保存する</strong><span>カードの <kbd>☆ 保存</kbd> を押すと <kbd>★ 保存済み</kbd> に変わり、「保存」タブに集まります。</span></li>
        <li><strong>コレクションを作る</strong><span>「保存」タブで名前を入れて作成します。用途別の候補 ${suggestedCollections.map((name) => `<kbd>＋ ${name}</kbd>`).join(' ')} からも作れます。</span></li>
        <li><strong>振り分ける</strong><span>各見本の下のボタンで、入れるコレクションを選びます。1つの見本を複数に入れられます。</span></li>
      </ol>
      <ul class="g-list">
        <li>上のボタンで「すべての保存」と各コレクションを切り替えて表示します。</li>
        <li>コレクションを削除しても、見本の保存は残ります。<kbd>保存から外す</kbd> を押すと、すべてのコレクションからも外れます。</li>
      </ul>
      <p class="g-note"><strong>保存先について</strong>　保存した見本・コレクション・調整の設定は、<strong>この端末のブラウザの中だけ</strong>に残ります。PCとスマートフォンの間では共有されません。ブラウザの履歴やサイトデータを消すと、保存も消えます。</p>`,
  },
  {
    id: 'reuse',
    title: '再現情報をコピーする',
    lead: '気に入った動きを、Webや動画編集、PowerPoint、建築CGで作るための手がかりです。',
    body: `
      <ol class="g-steps">
        <li><strong>開く</strong><span>カードの <kbd>⧉ 再現情報を見る</kbd> を押します。右側の小さな印は、情報がある道具です。</span></li>
        <li><strong>選ぶ</strong><span>使いたい道具の欄の <kbd>コピー</kbd> を押します。<kbd>すべてコピー</kbd> で全部をまとめてコピーできます。</span></li>
        <li><strong>貼り付ける</strong><span>コード、編集ソフトでの探し方、生成AIへの指示文として、そのまま使えます。</span></li>
      </ol>
      <table class="g-table">
        <thead><tr><th>欄</th><th>中身</th></tr></thead>
        <tbody>
          <tr><td>依頼文（日本語）</td><td>名前・説明・向いている場面・避けたい場面・印象をまとめた文。人に作業を頼むときに使います。</td></tr>
          ${recipeTools.map((tool) => `<tr><td>${tool.label}</td><td>${{
            css: 'Webで作るときの短いコード例。',
            edit: 'エフェクトやトランジションの名前と、主な操作。',
            powerpoint: '近いアニメーション（開始効果・強調・画面切り替え）と設定。',
            cg: 'カメラパス、断面、時刻など、建築CGソフトでの作り方。カメラワークと建築CGの見本にあります。',
            prompt: '動画・画像生成AIへ渡す英語の指示文。',
          }[tool.key]}</td></tr>`).join('')}
        </tbody>
      </table>
      <h4>確認状態の印</h4>
      <p>各欄の見出しの横に、実際のソフトで確かめたかどうかを表示しています。カードのボタンの道具の印に「✓」が付いているものは、実機で確認済みです。</p>
      <ul class="g-list">
        <li><span class="check-badge is-device">✓ 実機で確認</span>　Windows PCで実際のソフトを使って確かめた（PowerPoint／SketchUp／D5 Render／After Effects／Premiere Pro。編集ソフトはエフェクトやプロパティなどの名前を確認）。記載と違ったものは修正済み</li>
        <li><span class="check-badge is-unverified">未確認</span>　まだ確かめていない（Lumion／Twinmotion／Enscape など）</li>
      </ul>
      <p class="g-tip"><strong>メモ</strong>　PowerPointや編集ソフトの欄は「近い表現」です。まったく同じ動きにならない場合は、速度や強さを見本と見比べて調整してください。</p>`,
  },
  {
    id: 'reduced-motion',
    title: '動きを減らす設定',
    lead: '端末で「視差効果を減らす」「アニメーションを減らす」を有効にしている場合の表示です。',
    body: `
      <p>端末の設定で動きを減らしている場合、見本の動きは一瞬で終わり、最後の状態だけを表示します。動きを確かめたいときは、一時的に端末の設定を戻してください。</p>
      <ul class="g-list">
        <li>iPhone：設定 → アクセシビリティ → 動作 → 視差効果を減らす</li>
        <li>Mac：システム設定 → アクセシビリティ → ディスプレイ → 視差効果を減らす</li>
        <li>Windows：設定 → アクセシビリティ → 視覚効果 → アニメーション効果</li>
      </ul>`,
  },
  {
    id: 'faq',
    title: 'よくある質問',
    lead: '',
    body: `
      <dl class="g-faq">
        <dt>プレビューが動きません</dt>
        <dd>PCではカーソルを重ねるかクリック、スマートフォンではタップしてください。それでも動かない場合は「<a href="#reduced-motion">動きを減らす設定</a>」が有効になっていないか確認してください。</dd>
        <dt>検索したら見本が消えました</dt>
        <dd>検索欄の言葉に合う見本だけを表示しています。検索欄の <kbd>クリア</kbd> を押すと全件に戻ります。</dd>
        <dt>強さを変えても違いが分かりません</dt>
        <dd>強さは印の付いた見本だけに効きます。差が大きいV07 ドリーインで試してみてください。</dd>
        <dt>スマートフォンで保存した見本が、PCに出てきません</dt>
        <dd>保存先は端末ごとです。今の版では、端末の間で共有する仕組みはありません。</dd>
      </dl>`,
  },
]

/** 更新履歴。新しいものを上に追加する */
const changelog: [string, string][] = [
  ['v1.2', '見本を100種類に（追加した39種類の再現情報は Windows の実機で確認。建築CGの一部は未確認と表示）。動画・カメラに12種類（マッチカット、ホイップパン、形のワイプ、白く飛ばす、画面分割、ドリーズーム、前景から抜ける、俯瞰から目線へ、ハイパーラプス、照明シーンの切り替え、仕上げ材の切り替え、気流・動線の見える化）。UIに10種類（スライドイン、順に現れる、スクロールで現れる、開閉、下から出るシート、タブの切り替え、前後へ進む、注目点の脈動、階の切り替え、平面図の部屋を強調）。文字に7種類（ぼかしから浮かぶ、単語の入れ替え、マーカー、ばらばらの文字から確定、テロップ、棒グラフ、割合のリング）。環境に10種類（桜吹雪・落ち葉、はためき、湯気・煙、噴水、人が集まる、鳥、夜景のまたたき、雨上がりの水たまり、ガラスに映る雲、縦の動線）で、合計100種類に'],
  ['v1.1', '「構成づくり 詳しい手順」のページ（写真つき、5つのコース）を追加。構成を共有リンクで送る（開くと相手の「自分の型」に追加され、そのまま再生できる）。構成を PowerPoint の絵コンテ（表紙・1カット1枚・一覧表）で書き出す'],
  ['v1.0.2', 'D5 Render の水面の波（E02）・車（E08）・室内の木漏れ日（E05）を動画で確認。E08 は「パスを十分な長さに引く」ように修正し、E02・E05 の手順にコツを追加。環境の見本の D5 の動きはすべて確認済みに'],
  ['v1.0.1', '環境の動き（E01〜E10）と V21 の再現情報を実機で確認（After Effects・PowerPoint・D5 Render・SketchUp）し、12件を修正。D5 Render の手順を実機で作った内容に。建築CGの確認状態の表示を、実際に確かめた道具に合わせて表示。D5 Render の植栽の揺れ・霧・季節などは動画を書き出して動きまで確認し、手順を更新（水の波・車は設定のみ確認）'],
  ['v1.0', '目的と流れで組む。目的から選ぶ入口（6つ）とカットの大きさの印。構成を組む（3つの型・自分の型・JSON）とカット割り表のコピー、AIに構成を頼む。見本帳「環境」（E01〜E10）と建築CG「構造・設備・仕上げを重ねる」（V21）を追加し、合計61種類・4つの見本帳に。再現情報を実機で確認（PowerPoint・SketchUp・D5 Render・After Effects・Premiere Pro）し、修正と確認状態の印を反映'],
  ['v0.6', '動画・カメラに建築寄りの8種類（日影の移動、平面図から立体へ、分解／組み上げ、クレーンアップ、プルバック、フライスルー、線画からレンダーへ、ミニチュア）、UIモーションに10種類（前後比較スライダー、画像のクリップ表示、視差、ケン・バーンズ、詳細へ拡大、カードの裏返し、カーテン遷移、グリッドの並び替え、横スクロール、ピンが落ちる）、文字に5種類（字間が開く、線で描かれる文字、数字のカウントアップ、寸法線と一緒に表示、引き出し線の注記）を追加し、合計50種類に'],
  ['v0.5', '再現情報（CSS、編集ソフト、PowerPoint、建築CG、生成AI）のコピー。建築CGの見本「断面カット」「デイ・トゥ・ナイト」を試験追加'],
  ['v0.4', '感覚語検索、2案比較、速度・強さ・向きの調整、保存とコレクション、使い方ページ'],
  ['v0.3', 'カメラワーク5種類と文字5種類を追加し、合計25種類に。「避けたい場面」を追加'],
  ['v0.2', '動画・カメラタブ（カット、フェード、ワイプ、ズーム、パン）'],
  ['v0.1', 'UIモーション10種類、雰囲気による絞り込み'],
]

document.querySelector<HTMLDivElement>('#guide')!.innerHTML = `
  <header class="site-header">
    <a class="brand" href="/" aria-label="モーション見本帳 トップへ">
      <span class="brand-mark" aria-hidden="true"><i></i><i></i><i></i></span>
      <span>モーション見本帳</span>
    </a>
    <a class="guide-link" href="/">← 見本帳へ戻る</a>
  </header>

  <main class="guide" id="top">
    <section class="guide-hero">
      <p class="eyebrow">HOW TO USE</p>
      <h1>使い方</h1>
      <p class="lead">見本の再生、検索、比較、調整、保存、再現情報のコピーのしかたをまとめています。まずは下の画面マップで、どこに何があるかを確かめてください。</p>
    </section>

    ${renderMap()}

    <div class="guide-layout">
      <nav class="guide-toc" aria-label="目次">
        <p class="eyebrow">CONTENTS</p>
        <ol>
          <li class="toc-map"><a href="#map">画面の見方</a></li>
          ${sections.map((section) => `<li><a href="#${section.id}">${section.title}</a></li>`).join('')}
          <li><a href="#changelog">更新履歴</a></li>
        </ol>
      </nav>

      <div class="guide-body">
        ${sections.map((section, index) => `
          <section class="guide-section" id="${section.id}" aria-labelledby="${section.id}-title">
            <div class="g-head">
              <p class="g-index">${String(index + 1).padStart(2, '0')}</p>
              ${backToMap(section.id)}
            </div>
            <h2 id="${section.id}-title">${section.title}</h2>
            ${section.lead ? `<p class="g-lead">${section.lead}</p>` : ''}
            ${section.body}
          </section>`).join('')}

        <section class="guide-section" id="changelog" aria-labelledby="changelog-title">
          <p class="g-index">${String(sections.length + 1).padStart(2, '0')}</p>
          <h2 id="changelog-title">更新履歴</h2>
          <dl class="g-changelog">
            ${changelog.map(([version, text]) => `<dt>${version}</dt><dd>${text}</dd>`).join('')}
          </dl>
        </section>

        <p class="guide-back"><a class="guide-link" href="/">見本帳へ戻る</a></p>
      </div>
    </div>
  </main>

  <footer>
    <p>Motion Sample Book — a small reference for better interactions and edits.</p>
    <a href="#top">ページ上部へ <span aria-hidden="true">↑</span></a>
  </footer>
`

// 中身はJSで描画するため、「#adjust」などのリンクで開いたときは描画後に該当箇所へ移動する
const scrollToHash = () => {
  if (!window.location.hash) return
  document.getElementById(decodeURIComponent(window.location.hash.slice(1)))?.scrollIntoView()
}
scrollToHash()
window.addEventListener('load', scrollToHash)
// Webフォントの読み込みで行の高さが変わるため、読み込み後にもう一度合わせる
void document.fonts?.ready.then(scrollToHash)

// 凡例と番号を連動させ、どの部分の説明かを画像の上で強調する
const setActive = (n: string | null) => {
  document.querySelectorAll<HTMLElement>('[data-map]').forEach((element) => {
    element.classList.toggle('is-active', element.dataset.map === n)
  })
}
document.querySelectorAll<HTMLElement>('.map-legend li, .map-pin').forEach((element) => {
  element.addEventListener('mouseenter', () => setActive(element.dataset.map ?? null))
  element.addEventListener('mouseleave', () => setActive(null))
  element.addEventListener('focusin', () => setActive(element.dataset.map ?? null))
  element.addEventListener('focusout', () => setActive(null))
})
