import './style.css'
import './guide.css'
import './story-guide.css'
import { storyTemplates, storyLimits } from './storyboard'
import { allSamples } from './data'

/**
 * 「構成づくり 詳しい手順」（story-guide.html）。
 * 構成を組む機能（型・自分の型・AIに頼む・共有リンク・PowerPoint・JSON）を、1手順ずつ写真つきで説明する。
 * 写真は scripts/capture-story-guide.cjs で撮る（public/story-guide/<id>.jpg）。手順の id は撮影スクリプトと合わせる。
 * 使い方ページ（guide.html）の「構成を組んでカット割り表を作る」は概要、こちらは詳しい手順。
 */

type Step = {
  /** 写真のファイル名（public/story-guide/<id>.jpg）。写真のない手順は省く */
  id?: string
  title: string
  body: string
  tip?: string
}

type Course = {
  id: string
  title: string
  time: string
  lead: string
  steps: Step[]
}

const templateNames = storyTemplates.map((template) => `<kbd>${template.name}</kbd>`).join(' ')

const courses: Course[] = [
  {
    id: 'first',
    title: 'はじめての構成を作る',
    time: '約3分',
    lead: '最初からある型を1つ開いて、見本と秒数を選び、流れを再生して確かめます。まずはここだけで構いません。',
    steps: [
      { id: 'open', title: '型を選んで開く', body: `見本帳のトップで、検索欄の下の「目的から選ぶ」の下にある「構成を組む」を探します。${templateNames} のどれかを押すと、構成の画面が開きます。`, tip: '迷ったら「全景から細部へ」から。建築の映像やプレゼンのいちばん基本の流れです。' },
      { id: 'tabs', title: '画面の見方', body: '上のタブで型を切り替えます。その下に、カット（役割）が左から順に並びます。カードの1枚が1カットです。スマートフォンでは、カットを左右にスワイプして見ます。' },
      { id: 'sample', title: 'カットごとに見本を選ぶ', body: '各カットの「見本」から、使いたい動きを選びます。最初に入っているのがおすすめです。選ぶと、カードの画像がその見本の動きに変わります（画像を押すと再生）。' },
      { id: 'seconds', title: '秒数を決める', body: `「秒数」に、そのカットの長さを入れます（${storyLimits.minSeconds}〜${storyLimits.maxSeconds}秒）。下の合計秒数が自動で変わるので、全体の長さの目安にします。` },
      { id: 'play', title: '順に再生して確かめる', body: '右上の「順に再生」を押すと、1カット目から順に再生されます。いま再生中のカットに枠が付きます。流れがおかしければ、見本や順番を選び直します。', tip: '選んだ見本と秒数は、型ごとにこの端末に保存されます。閉じても消えません。' },
    ],
  },
  {
    id: 'handoff',
    title: '構成を人に渡す',
    time: '約2分',
    lead: '組んだ構成を、資料や指示書に使える形で渡します。カット割り表のコピー、PowerPoint、共有リンクの3つの方法があります。',
    steps: [
      { id: 'tool', title: '入れる再現情報を選ぶ', body: '画面の下の「カット割り表に入れる再現情報」で、作る人が使う道具を選びます（PowerPoint、Premiere Pro／After Effects、建築CG、生成AI）。選んだ道具の作り方が、カットごとに入ります。' },
      { id: 'copy', title: 'カット割り表をコピーする', body: '「カット割り表をコピー」を押すと、表の形（Markdown）でコピーされます。Notion や Obsidian に貼ると、そのまま表になります。', tip: 'メールやチャットに貼ると記号（| や ---）が見えます。その場合は PowerPoint か共有リンクで渡すと読みやすくなります。' },
      { id: 'pptx', title: 'PowerPoint の絵コンテで書き出す', body: '「PowerPointで書き出す」を押すと、.pptx のファイルが保存されます。表紙、1カット1枚の絵コンテ（見本の画像・役割・秒数・説明・選んだ道具の再現情報）、最後に一覧表が入ります。発表者ノートには生成AI向けの指示文が入ります。', tip: '打ち合わせ資料の下書きとして、PowerPoint でそのまま文字や画像を差し替えられます。' },
      { id: 'share', title: '共有リンクで送る', body: '「共有リンクをコピー」を押すと、いま開いている構成を開くリンクがコピーされます。メールやチャットに貼って送ります。', tip: 'リンクを知っている人なら誰でも開けます。送る相手に気をつけてください（中身は見本帳のサーバーには送られません）。' },
      { id: 'received', title: 'リンクを受け取った人の画面', body: 'リンクを開くと、構成の画面が開き、その構成が「自分の型」（★の付いたタブ）に追加されます。そのまま「順に再生」やカット割り表のコピーができます。同じリンクを何度開いても、型は増えません。' },
    ],
  },
  {
    id: 'custom',
    title: '自分の型を作る',
    time: '約5分',
    lead: '最初からある型では足りないときは、複製して自分用に作り替えます。カットの名前・数・順番を自由に変えられます。',
    steps: [
      { id: 'duplicate', title: '複製して自分の型にする', body: '元にしたい型を開いて「複製して自分の型にする」を押します。★の付いたタブが増え、編集できる状態になります。何もないところから作るときは「＋ 新しい型」を押します。' },
      { id: 'edit-name', title: '型の名前と説明を書く', body: '「型の名前」と「説明」を書き換えます。どんな場面で使う構成かを書いておくと、あとで選びやすくなります。' },
      { id: 'edit-slot', title: 'カットの役割を書き換え、並べ替える', body: '各カットの役割（例：ゲートから近づく）とねらいを書き換えます。下の ← → でカットの順番を入れ替え、「削除」でカットを減らします。見本は、全見本から選べます。', tip: `自分の型では、見本を${allSamples.length}種類すべてから選べます。元の型の候補は「この役割の候補」として先頭に出ます。` },
      { id: 'add', title: 'カットを足す', body: `並びのいちばん右の「＋ カットを追加」でカットを足します（最大${storyLimits.slots}カット）。` },
      { id: 'finish', title: '編集を終える', body: '「編集を終える」を押すと、ふつうの表示に戻ります。もう一度「編集する」を押せば、いつでも直せます。', tip: '「この型を削除」は、押し間違いを防ぐため2回続けて押すと削除されます。' },
    ],
  },
  {
    id: 'ai',
    title: 'AIに構成を考えてもらう',
    time: '約5分',
    lead: '場面を書くと、Claude や ChatGPT に構成を考えてもらうための依頼文を作れます。返ってきた答えを貼ると、自分の型として読み込めます。見本帳から AI へ直接はつながないので、ふだん使っている AI をそのまま使います。',
    steps: [
      { id: 'ai-scene', title: '場面を書く', body: '構成の画面の「AIに構成を頼む」を開き（見本帳のトップの「AIに構成を頼む」からも開けます）、だれに何を伝えたいかを書きます。', tip: '「だれに（施主の役員、社内の設計者など）」「何を（敷地の広さ、吹抜けの明るさなど）」の2つを書くと、提案が具体的になります。' },
      { id: 'ai-copy', title: '条件を選んで依頼文をコピーする', body: '全体の長さ、主に使う道具、提案の数（1〜3案）を選び、「依頼文をコピー」を押します。依頼文には、見本の一覧と答えの形が入っています。' },
      { title: 'AI に貼り付けて送る', body: 'Claude や ChatGPT を開き、コピーした依頼文をそのまま貼り付けて送ります。しばらくすると、構成の案が返ってきます（JSON という形の文字が含まれます）。', tip: '答えの中身を読む必要はありません。答え全体をそのままコピーしてください。' },
      { id: 'ai-paste', title: '答えを貼り付けて読み込む', body: 'AI の答えをまるごとコピーし、「AIの答えを貼り付ける」に貼って「答えを読み込む」を押します。前後に説明の文章が付いていても読めます。' },
      { id: 'ai-result', title: '自分の型に追加される', body: '提案が「自分の型」（★）に追加され、その型が開きます。「順に再生」で流れを確かめ、気になるところは「編集する」で直します。', tip: '見本帳にない番号を AI が使った場合は、候補の見本に置き換えるか、そのカットを外して知らせます。気に入らなければ、場面の書き方を変えて頼み直してください。' },
    ],
  },
  {
    id: 'json',
    title: 'ファイルで保存する・別の端末へ移す',
    time: '約1分',
    lead: '自分の型や選んだ見本は、その端末のブラウザの中だけに保存されます。別の端末で使うときや、控えを残したいときは JSON のファイルにします。',
    steps: [
      { id: 'json', title: '書き出す・読み込む', body: '構成の画面の「JSONで書き出し・読み込み」を開きます。「この型を書き出す」「自分の型をすべて書き出す」でファイルに保存し、別の端末では「ファイルから読み込む」で取り込みます。スマートフォンでは「この型のJSONをコピー」と貼り付けでも移せます。', tip: '1つの構成を人に渡すだけなら、共有リンクのほうが手軽です。' },
    ],
  },
]

const faq: [string, string][] = [
  ['作った型や選んだ見本が、別の端末にない', 'この端末のブラウザの中だけに保存されます。共有リンクか JSON のファイルで移してください。ブラウザの履歴やサイトデータを消すと、保存した内容も消えます。'],
  ['共有リンクを開いても構成が出ない', 'リンクが途中で切れている可能性があります。最後までコピーできているか確かめてください。開けないときは、理由が構成の画面の上に表示されます。'],
  ['AI の答えを読み込めない', '答えの一部だけを貼ると読めません。答え全体をコピーし直してください。それでも読めないときは、依頼文をもう一度送り、「JSONだけを返して」と頼みます。'],
  ['PowerPoint の画像が古い・ない', '画像は見本の止まった状態です。動きは PowerPoint の中では再生されません。動きは見本帳の「順に再生」で見せてください。'],
  ['最初からある型を直したい', '最初からある型は直接は変えられません。「複製して自分の型にする」で自分の型にしてから直します。'],
]

const stepHtml = (course: Course, step: Step, index: number) => `
  <li class="sg-step" id="${course.id}-${index + 1}">
    <div class="sg-step-text">
      <p class="sg-step-num"><span>${index + 1}</span>手順 ${index + 1} / ${course.steps.length}</p>
      <h3>${step.title}</h3>
      <p>${step.body}</p>
      ${step.tip ? `<p class="g-tip"><strong>ヒント</strong>${step.tip}</p>` : ''}
    </div>
    ${step.id ? `<figure class="sg-shot"><a href="/story-guide/${step.id}.jpg" target="_blank" rel="noopener" aria-label="${step.title}の画面を大きく表示"><img src="/story-guide/${step.id}.jpg" alt="${step.title}の画面。押す場所を朱色の枠で囲んでいる" loading="lazy" /></a><figcaption>画像を押すと大きく表示</figcaption></figure>` : '<div class="sg-shot is-empty"><p>見本帳の外（Claude や ChatGPT）での操作です</p></div>'}
  </li>`

document.querySelector<HTMLDivElement>('#story-guide')!.innerHTML = `
  <header class="site-header">
    <a class="brand" href="/" aria-label="モーション見本帳 トップへ">
      <span class="brand-mark" aria-hidden="true"><i></i><i></i><i></i></span>
      <span>モーション見本帳</span>
    </a>
    <nav class="sg-header-links">
      <a class="guide-link" href="/guide.html">使い方</a>
      <a class="guide-link" href="/">← 見本帳へ戻る</a>
    </nav>
  </header>

  <main class="guide sg" id="top">
    <section class="guide-hero">
      <p class="eyebrow">STEP BY STEP</p>
      <h1>構成づくり 詳しい手順</h1>
      <p class="lead">見本を使う順に並べて「構成」を作り、人に渡すまでを、1手順ずつ写真で説明します。押す場所は<span class="sg-mark-sample">朱色の枠</span>で囲んでいます。</p>
    </section>

    <section class="sg-flow" aria-label="全体の流れ">
      <p class="eyebrow">OVERVIEW</p>
      <h2>全体の流れ</h2>
      <ol class="sg-flow-main">
        <li><strong>型を選ぶ</strong><span>最初からある${storyTemplates.length}つの型、自分の型、AIの提案</span></li>
        <li><strong>見本と秒数を選ぶ</strong><span>カットごとに動きを選ぶ</span></li>
        <li><strong>順に再生</strong><span>流れを確かめる</span></li>
        <li><strong>人に渡す</strong><span>カット割り表・PowerPoint・共有リンク</span></li>
      </ol>
      <p class="sg-flow-note">はじめての方は <a href="#first">1. はじめての構成を作る</a> だけで十分です。ほかは必要になったときに読んでください。</p>
      <ol class="sg-courses">
        ${courses.map((course, index) => `<li><a href="#${course.id}"><span class="sg-course-num">${index + 1}</span><strong>${course.title}</strong><small>${course.steps.length}手順・${course.time}</small></a></li>`).join('')}
        <li><a href="#faq"><span class="sg-course-num">?</span><strong>困ったとき</strong><small>よくある質問</small></a></li>
      </ol>
    </section>

    ${courses.map((course, index) => `
      <section class="sg-course" id="${course.id}" aria-labelledby="${course.id}-title">
        <div class="sg-course-head">
          <p class="g-index">COURSE ${index + 1}</p>
          <h2 id="${course.id}-title">${course.title}</h2>
          <p class="sg-course-meta">${course.steps.length}手順・${course.time}</p>
          <p class="g-lead">${course.lead}</p>
        </div>
        <ol class="sg-steps">${course.steps.map((step, stepIndex) => stepHtml(course, step, stepIndex)).join('')}</ol>
        <p class="sg-next"><a href="#top">ページ上部へ ↑</a>${courses[index + 1] ? `<a href="#${courses[index + 1].id}">次：${courses[index + 1].title} →</a>` : '<a href="#faq">次：困ったとき →</a>'}</p>
      </section>`).join('')}

    <section class="sg-course" id="faq" aria-labelledby="faq-title">
      <div class="sg-course-head">
        <p class="g-index">FAQ</p>
        <h2 id="faq-title">困ったとき</h2>
      </div>
      <dl class="g-faq">${faq.map(([q, a]) => `<dt>${q}</dt><dd>${a}</dd>`).join('')}</dl>
      <p class="sg-next"><a href="/guide.html">使い方（全体）へ</a><a href="/">見本帳へ戻る →</a></p>
    </section>
  </main>

  <footer>
    <p>Motion Sample Book — a small reference for better interactions and edits.</p>
    <a href="#top">ページ上部へ <span aria-hidden="true">↑</span></a>
  </footer>
`
