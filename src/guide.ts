import './style.css'
import './guide.css'
import {
  samples, videoSamples, textSamples, allSamples,
  finderWords, strengthSamples, directionSamples, settingOptions, suggestedCollections,
} from './data'
import { recipeTools } from './recipes'

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

const sections: Section[] = [
  {
    id: 'start',
    title: 'まず試す',
    lead: '名前を知らなくても、動きを見ながら探せる見本帳です。',
    body: `
      <ol class="g-steps">
        <li><strong>タブを選ぶ</strong><span>「UIモーション」「動画・カメラ」「文字」から見たい種類を開きます。</span></li>
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
    title: '3つの見本帳',
    lead: `全${allSamples.length}種類を、種類ごとのタブに分けています。`,
    body: `
      <div class="g-cards">
        <div><h4>UIモーション <small>${samples.length}</small></h4><p>ボタンやカードの反応。雰囲気「静か／はっきり／装飾」で絞り込めます。</p></div>
        <div><h4>動画・カメラ <small>${videoSamples.length}</small></h4><p>カット・フェードなどのつなぎ、ズーム・パン・ドリーなどのカメラワーク、断面カットなどの建築CG。</p></div>
        <div><h4>文字 <small>${textSamples.length}</small></h4><p>見出しやテロップの出し方。フェードイン、タイプ表示など。</p></div>
      </div>
      <p>4つ目の「保存」タブには、自分で保存した見本が集まります（<a href="#save">保存とコレクション</a>）。</p>`,
  },
  {
    id: 'search',
    title: '印象の言葉で探す',
    lead: '名前が分からなくても、受ける印象や使う場所の言葉で探せます。',
    body: `
      <ul class="g-list">
        <li>検索欄に言葉を入れると、3つの見本帳をまとめて絞り込みます。タブの数字が、それぞれの該当件数に変わります。</li>
        <li>よく使う言葉はボタンで用意しています：${finderWords.map((word) => `<kbd>${word}</kbd>`).join(' ')}。押すと検索に追加、もう一度押すと外れます。</li>
        <li>カードの下の <kbd>#ふわっと</kbd> のようなタグを押すと、その言葉で探し直します。</li>
        <li>「ボタン」「見出し」のような<strong>使う場所</strong>や、「Zoom」のような英語名でも探せます。</li>
        <li>言葉をスペースで区切ると、<strong>すべてに当てはまる</strong>見本だけを表示します。0件になったら言葉を減らしてください。</li>
        <li>ひらがな・カタカナ、全角・半角の違いは気にしなくて大丈夫です（「フワット」でも見つかります）。</li>
        <li>今のタブに結果がなく、ほかのタブにある場合は、結果のあるタブへ自動で切り替わります。</li>
      </ul>`,
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
      <p class="lead">見本の再生、検索、比較、調整、保存のしかたをまとめています。</p>
    </section>

    <div class="guide-layout">
      <nav class="guide-toc" aria-label="目次">
        <p class="eyebrow">CONTENTS</p>
        <ol>
          ${sections.map((section) => `<li><a href="#${section.id}">${section.title}</a></li>`).join('')}
          <li><a href="#changelog">更新履歴</a></li>
        </ol>
      </nav>

      <div class="guide-body">
        ${sections.map((section, index) => `
          <section class="guide-section" id="${section.id}" aria-labelledby="${section.id}-title">
            <p class="g-index">${String(index + 1).padStart(2, '0')}</p>
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
