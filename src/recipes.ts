/**
 * 再現情報（v0.5「使う」）。見本の番号ごとに、別の道具で同じ動きを作るための手がかりを持つ。
 *
 * - css:        Webで作るときの短いコード例（作れないものは省略）
 * - edit:       Premiere Pro／After Effectsでの呼び方・主な操作
 * - powerpoint: PowerPointで近いアニメーション（開始効果／強調／画面切り替え）
 * - cg:         SketchUp／D5 Render／Lumion／Twinmotion／Enscapeなど建築CGでの作り方（関係するものだけ）
 * - prompt:     動画・画像生成AIへ渡す英語の指示文
 *
 * 新しい見本を足すときは、ここにも同じ番号で1件追加する。
 * 足りない番号は、ビルド時の型チェックでは見つからないため、確認用の関数 missingRecipes() を使う。
 */

export type Recipe = {
  css?: string
  edit: string
  powerpoint: string
  cg?: string
  prompt: string
}

export const recipes: Record<string, Recipe> = {
  /* ---------- UIモーション ---------- */
  '01': {
    css: `.card { transition: transform .3s, box-shadow .3s; }
.card:hover { transform: translateY(-10px); box-shadow: 0 18px 28px rgb(0 0 0 / .18); }`,
    edit: 'After Effects：位置Yを少し上げ、ドロップシャドウの距離を同時に広げる（イーズイン・アウト）',
    powerpoint: '「アニメーションの軌跡（直線・上）」で少しだけ上へ動かし、影の書式を濃くする（登場時なら開始効果「フロートイン」）',
    prompt: 'A UI card gently lifts upward on hover with a soft growing shadow, smooth ease-out, minimal interface, light background',
  },
  '02': {
    css: `.thumb { transition: transform .3s; }
.thumb:hover { transform: scale(1.12); }`,
    edit: 'After Effects：スケール 100→112%（イーズアウト）',
    powerpoint: '強調「拡大/収縮」（効果のオプション画面でサイズをユーザー設定110%、「滑らかに終了」を0.5秒程度）',
    prompt: 'A thumbnail image smoothly scales up by about 10 percent when hovered, subtle and clean UI motion',
  },
  '03': {
    css: `.button { box-shadow: 0 8px 0 #c4b9a6; transition: transform .1s, box-shadow .1s; }
.button:active { transform: translateY(7px); box-shadow: 0 1px 0 #c4b9a6; }`,
    edit: 'After Effects：位置Yを数px下げ、影を縮める短い2キー（0.1秒）',
    powerpoint: '強調「拡大/収縮」（サイズをユーザー設定95%、効果のオプション画面で「オートリバース」をオン）。または軌跡で数pxだけ下へ',
    prompt: 'A physical-looking button is pressed down, sinking a few pixels as its bottom shadow shrinks, tactile UI feedback',
  },
  '04': {
    css: `@keyframes bounce { 40% { transform: translateY(-16px) scale(1.04,.96); } 68% { transform: translateY(3px); } }
.icon.done { animation: bounce .65s ease; }`,
    edit: 'After Effects：位置Yにオーバーシュートするキーを付け、グラフエディターで減衰させる（減衰する弾みのエクスプレッションを使ってもよい）',
    powerpoint: '開始効果「バウンド」、または強調「シーソー」を弱めに',
    prompt: 'A small icon pops and bounces once with a playful squash and stretch, celebrating a completed action',
  },
  '05': {
    css: `@keyframes shake { 20%,60% { transform: translateX(-8px); } 40%,80% { transform: translateX(8px); } }
.field.error { animation: shake .5s ease; }`,
    edit: 'After Effects：位置Xを左右に4往復（ウィグラーや wiggle() でも可）',
    powerpoint: '強調「シーソー」、または「アニメーションの軌跡：直線」の効果のオプション「右へ」で少しだけ動かし、「オートリバース」と「繰り返し：2」',
    prompt: 'An input field shakes quickly left and right to signal an error, short and clear UI feedback',
  },
  '06': {
    css: `.card { transition: transform .3s; }
.card:hover { transform: perspective(700px) rotate(-5deg) rotateY(12deg) translateY(-3px); }`,
    edit: 'After Effects：3Dレイヤーにして Y回転12°・Z回転-5°',
    powerpoint: '強調「スピン」を小さな角度で、または「変形」で傾けたスライドへ切り替え',
    prompt: 'A portfolio card tilts slightly in 3D perspective toward the viewer on hover, playful but restrained',
  },
  '07': {
    css: `.link::after { content: ''; display: block; height: 3px; background: currentColor; transform: scaleX(0); transform-origin: left; transition: transform .35s; }
.link:hover::after { transform: scaleX(1); }`,
    edit: 'After Effects：シェイプの線に「パスのトリミング」で終了点 0→100%',
    powerpoint: '下線の図形に開始効果「ワイプ（方向：左から）」',
    prompt: 'A thin accent underline grows from left to right beneath a navigation label, elegant minimal web interaction',
  },
  '08': {
    css: `.btn { background: linear-gradient(#315c70 0 0) left / 0 100% no-repeat; transition: background-size .4s; }
.btn:hover { background-size: 100% 100%; color: #fff; }`,
    edit: 'After Effects：塗りの長方形に「リニアワイプ」、またはマスクパスを左→右へ',
    powerpoint: '背景の長方形に開始効果「ワイプ（左から）」＋文字色を強調「フォントの色」',
    prompt: 'A button background fills with deep blue color sweeping from left to right while the label turns white',
  },
  '09': {
    css: `.badge::before { content: ''; position: absolute; inset: -60% auto; left: -55%; width: 34%; background: rgb(255 255 255 / .55); transform: skewX(-18deg); transition: left .55s; }
.badge:hover::before { left: 125%; }`,
    edit: 'After Effects：エフェクト「CC Light Sweep」',
    powerpoint: '斜めの白い半透明図形を「アニメーションの軌跡：直線（右へ）」で横切らせる（はみ出す部分は、背景と同じ色の図形を上に重ねて隠す）',
    prompt: 'A glossy light reflection sweeps diagonally across a premium badge, subtle shine effect',
  },
  '10': {
    css: `@keyframes ripple { from { transform: scale(0); opacity: .8; } to { transform: scale(13); opacity: 0; } }
.button .wave { border-radius: 50%; animation: ripple .7s ease-out; }`,
    edit: 'After Effects：円シェイプのスケール 0→大＋不透明度 80→0%',
    powerpoint: '円の図形に開始効果「ズーム」＋終了効果「フェード」を同時に',
    prompt: 'A soft circular ripple expands from the tapped point on a button and fades out, material-style touch feedback',
  },

  '11': {
    css: `/* 後の画像を左から切り抜き、つまみの位置（--pos）に合わせる */
.after { clip-path: inset(0 0 0 var(--pos, 50%)); }
.handle { left: var(--pos, 50%); }
/* input[type=range] の値を --pos に入れると、ドラッグで動かせる */`,
    edit: 'After Effects：上の画像にマスク（または「リニアワイプ」）を付け、境界線のシェイプと一緒に左右へ動かす',
    powerpoint: '前後の画像を重ね、上の画像に開始効果「ワイプ（左から）」、境界線を「アニメーションの軌跡（右へ）」で同時に',
    prompt: 'Before and after comparison of a building renovation with a vertical divider sliding across the image, clean presentation style',
  },
  '12': {
    css: `.photo { clip-path: inset(0 100% 0 0); transform: scale(1.15); transition: clip-path 1s cubic-bezier(.7,0,.2,1), transform 1.4s; }
.photo.is-visible { clip-path: inset(0); transform: scale(1); }`,
    edit: 'After Effects：画像にマスクを付けてマスクパスを広げ、同時にスケール115→100%',
    powerpoint: '開始効果「ワイプ（左から）」＋強調「拡大/収縮」（縮小方向）を同時に',
    prompt: 'An architectural photograph is revealed by an expanding rectangular mask while gently scaling down, elegant website intro',
  },
  '13': {
    css: `/* スクロール量に応じて層ごとに動かす量を変える */
.layer { transform: translateY(calc(var(--scroll) * var(--depth) * 1px)); }
.sky { --depth: .1; } .building { --depth: .3; } .trees { --depth: .7; }`,
    edit: 'After Effects：前景・建物・空を別レイヤーにし、位置Yの移動量を手前ほど大きくする（3Dレイヤー＋カメラでも可）',
    powerpoint: '前景・建物・空を別画像にし、移動量を変えた「アニメーションの軌跡（上へ）」を同時に',
    prompt: 'Parallax scrolling of a building photo split into sky, building and foreground trees layers moving at different speeds',
  },
  '14': {
    css: `@keyframes ken-burns { from { transform: scale(1) translate(0, 0); } to { transform: scale(1.15) translate(-3%, -2%); } }
.hero-photo { animation: ken-burns 8s ease-out both; }`,
    edit: 'Premiere Pro：エフェクトコントロールの「モーション」で「スケール」と「位置」にキーフレーム／After Effects：スケール100→115%と位置',
    powerpoint: '画像に強調「拡大/収縮」（ユーザー設定110〜115%、継続時間を長く）＋「その他のアニメーションの軌跡効果」の「対角線（右上へ）」を「直前の動作と同時」で',
    prompt: 'Slow Ken Burns zoom and drift across a still exterior photograph of a modern building at dusk',
  },
  '15': {
    css: `/* FLIP：拡大前後の位置の差を transform で埋めて、滑らかにつなぐ */
const first = thumb.getBoundingClientRect(); detail.classList.add('open');
const last = detail.getBoundingClientRect();
detail.animate([{ transform: \`translate(\${first.left - last.left}px, \${first.top - last.top}px) scale(\${first.width / last.width})\` }, { transform: 'none' }], 500);`,
    edit: 'After Effects：サムネイルのレイヤーを、位置とスケールで画面いっぱいまで動かし、詳細の文字をあとから重ねる',
    powerpoint: '一覧のスライドと詳細のスライドで同じ画像を使い、画面切り替え「変形」でつなぐ（画像の名前をそろえる）',
    prompt: 'A thumbnail in an architecture portfolio grid smoothly expands to fill the screen and becomes the project detail page',
  },
  '16': {
    css: `.card { transform-style: preserve-3d; transition: transform .7s; }
.card.is-flipped { transform: rotateY(180deg); }
.front, .back { backface-visibility: hidden; } .back { transform: rotateY(180deg); }`,
    edit: 'After Effects：表と裏の2枚を3Dレイヤーにし、Y回転0→180°（裏は最初から180°回しておく）',
    powerpoint: '表と裏の2枚のスライドを画面切り替え「フリップ」でつなぐ（またはオブジェクトに「変形」）',
    prompt: 'A card showing a building exterior flips in 3D to reveal the floor plan on its back, smooth UI animation',
  },
  '17': {
    css: `.curtain { transform: translateY(100%); }
.is-leaving .curtain { animation: curtain 1.2s cubic-bezier(.7,0,.3,1) both; }
@keyframes curtain { 50% { transform: translateY(0); } 100% { transform: translateY(-100%); } }`,
    edit: 'After Effects：単色の平面を下から上へ通過させ、幕が画面を覆った瞬間に次の場面へカット',
    powerpoint: '画面切り替え「カーテン」または「プッシュ（下から）」。単色の幕を挟むなら「ワイプ」2回',
    prompt: 'A solid color curtain sweeps up across the screen and reveals the next page of an architecture website, bold transition',
  },
  '18': {
    css: `/* FLIP：並び替え前の位置を記録し、並び替え後に差分から戻す */
const before = new Map(items.map((el) => [el, el.getBoundingClientRect()]));
applyFilter();
items.forEach((el) => { const a = before.get(el), b = el.getBoundingClientRect(); el.animate([{ transform: \`translate(\${a.left - b.left}px, \${a.top - b.top}px)\` }, { transform: 'none' }], 400); });`,
    edit: 'After Effects：外れる画像を不透明度で消し、残る画像の位置を新しい位置へ（イーズイン・アウト）',
    powerpoint: '並び替え前後の2枚のスライドを画面切り替え「変形」でつなぐ（各画像の名前をそろえる）',
    prompt: 'A grid of architecture project thumbnails animates as a filter is applied, unmatched items fade out and the rest slide into place',
  },
  '19': {
    css: `/* 縦スクロール量を横移動に変える */
.track { transform: translateX(calc(var(--progress) * -1 * (100% - 100vw))); }
/* 対応ブラウザなら animation-timeline: scroll() でJSなしでも可 */`,
    edit: 'After Effects：横長に並べたパネルの位置Xを動かし、下に進行バーを付ける',
    powerpoint: '横長の画像に「アニメーションの軌跡（左へ）」、または「変形」でパネルを1枚ずつ送る',
    prompt: 'Horizontal scrolling gallery of architecture project panels sliding sideways with a progress bar, smooth editorial website',
  },
  '20': {
    css: `@keyframes drop { 0% { transform: translateY(-40px); opacity: 0; } 60% { transform: translateY(4px); opacity: 1; } 80% { transform: translateY(-2px); } 100% { transform: none; } }
.pin { animation: drop .6s cubic-bezier(.3,1.4,.5,1) both; animation-delay: calc(var(--i) * .15s); }`,
    edit: 'After Effects：ピンの位置Yを上から落とし、オーバーシュートで弾ませる。影のスケールを同時に変える',
    powerpoint: 'ピンの図形に開始効果「バウンド」（地点ごとに遅延をずらす）',
    prompt: 'Map markers drop and bounce onto a site plan to show building locations, playful but clean UI animation',
  },

  /* ---------- v1.2-2 UI 21〜30 ---------- */
  '21': {
    css: `@keyframes slide-in { from { transform: translateX(120%); opacity: 0; } }
.panel { animation: slide-in .6s cubic-bezier(.2,.8,.2,1) both; } /* 左からは translateX(-120%) */`,
    edit: 'After Effects：パネルの位置Xを画面の外から定位置へ、不透明度を 0→100% に（イージーイーズ）。Premiere Pro：「モーション」の位置にキー',
    powerpoint: '開始効果「スライドイン」（効果のオプション：右から）。少し透けた状態から出すなら、開始効果「フェード」を「直前の動作と同時」に重ねる',
    prompt: 'A UI card panel slides in smoothly from the right edge of the screen and settles into place, clean and minimal',
  },
  '22': {
    css: `@keyframes rise { from { opacity: 0; transform: translateY(18px) scale(.96); } }
.tile { animation: rise .5s cubic-bezier(.2,.8,.2,1) both; animation-delay: calc(var(--i) * .08s); }`,
    edit: 'After Effects：カードのレイヤーに同じアニメーション（位置Y＋不透明度）を付け、「シーケンスレイヤー」やレイヤーを数フレームずつずらして順に出す',
    powerpoint: '各カードに開始効果「フェード」（またはライズアップ）を付け、2つ目以降を「直前の動作の後」、遅延 0.1 秒で順に',
    prompt: 'A grid of architecture project cards appears one by one in a staggered sequence, each card fading and rising slightly',
  },
  '23': {
    css: `/* 画面に入ったら .is-visible を付ける */
new IntersectionObserver((entries) => entries.forEach((e) => e.target.classList.toggle('is-visible', e.isIntersecting)), { threshold: .2 }).observe(el);
.block { opacity: 0; transform: translateY(24px); transition: .7s ease; } .block.is-visible { opacity: 1; transform: none; }`,
    edit: 'After Effects：画面全体を上へ流すスクロールのキー（位置Y）に合わせて、各ブロックの不透明度と位置Yのキーを順に置く',
    powerpoint: '縦長のスライドの内容を、ブロックごとに開始効果「フェード」（またはライズアップ）を「クリック時」で出す（スクロールの代わりにクリックで進める）',
    prompt: 'A long architecture website page scrolls down, and each section of text and images softly fades up as it enters the screen',
  },
  '24': {
    css: `/* details と summary を使うと、開閉は標準で動く。高さの動きは grid-template-rows で付ける */
.body { display: grid; grid-template-rows: 0fr; transition: grid-template-rows .3s ease; } .is-open .body { grid-template-rows: 1fr; }
.body > div { overflow: hidden; } .is-open .chev { transform: rotate(180deg); }`,
    edit: 'After Effects：中身のレイヤーにマスクを付け、マスクの下端を下へ伸ばす（同時に下の行の位置Yも下げる）。矢印の回転にキー',
    powerpoint: '中身の図形に開始効果「ワイプ」（効果のオプション：上から）。下の行は軌跡「直線（下へ）」で同時に下げる',
    prompt: 'A clean accordion list of building specifications, one row expands downward to reveal its details while its arrow rotates',
  },
  '25': {
    css: `@keyframes up { from { transform: translateY(105%); } } @keyframes dim { from { opacity: 0; } }
.sheet { animation: up .45s cubic-bezier(.2,.85,.25,1) both; } .backdrop { background: rgb(0 0 0 / .45); animation: dim .45s both; }`,
    edit: 'After Effects：シートの位置Yを画面の下から上へ（オーバーシュート少し）、後ろに黒の平面の不透明度 0→45% を同時に',
    powerpoint: 'シートの図形に開始効果「スライドイン」（下から）、全面の黒い四角（透過50%程度）に開始効果「フェード」を「直前の動作と同時」に',
    prompt: 'On a smartphone screen, a bottom sheet with room details slides up from the bottom while the background dims slightly',
  },
  '26': {
    css: `/* 前の内容を縮めながら消し、消えきってから次を出す（重ねない） */
@keyframes out { to { opacity: 0; transform: scale(.94); } } @keyframes in { from { opacity: 0; transform: scale(.94); } }
.old { animation: out .09s ease both; } .new { animation: in .21s .09s ease both; }`,
    edit: 'After Effects：前の内容の不透明度とスケール（100→94%）を短く下げ、消えたあとで次の内容を 94→100% に上げる（2つを重ねない）',
    powerpoint: 'タブごとにスライドを分け、画面切り替え「フェード」（効果のオプション：スムーズ）を短め（0.3 秒）に',
    prompt: 'A tab bar with exterior, plan and section; switching tabs makes the current content shrink and fade out before the next content fades in',
  },
  '27': {
    css: `@keyframes out { to { opacity: 0; transform: translateX(-30%); } } @keyframes in { from { opacity: 0; transform: translateX(30%); } }
.old { animation: out .3s cubic-bezier(.4,0,.2,1) both; } .new { animation: in .3s .1s cubic-bezier(.4,0,.2,1) both; }`,
    edit: 'After Effects：前の画面を左へ少し動かしながら不透明度を下げ、次の画面を右から少し動かして出す。手順の線（シェイプ）の幅にキー',
    powerpoint: '手順ごとにスライドを分け、画面切り替え「プッシュ」（効果のオプション：右から）。手順の線は「変形」で伸ばす',
    prompt: 'A step-by-step guide, the current step slides left and fades while the next step slides in from the right, and the progress line grows',
  },
  '28': {
    css: `@keyframes ring { from { opacity: .9; transform: scale(1); } to { opacity: 0; transform: scale(3.6); } }
.ring { border: 2px solid; border-radius: 50%; animation: ring 1.1s ease-out infinite; } .ring + .ring { animation-delay: .45s; }`,
    edit: 'After Effects：円のシェイプのスケール（100→360%）と不透明度（90→0%）にキーを打ち、ループ（loopOut()）。2つの輪を半分ずらす',
    powerpoint: '注目点の円に強調「パルス」を「繰り返し：スライドの最後まで」で。外側の輪は、開始効果「ズーム」と終了効果「フェード」を組み合わせる',
    prompt: 'Hotspot markers on an architectural photo, each emitting a soft pulsing ring that expands and fades, inviting the viewer to look',
  },
  '29': {
    css: `/* 各階を rotateX・rotateZ で寝かせて重ね、選んだ階だけ translateZ で持ち上げる */
.floor { transform: rotateX(58deg) rotateZ(-30deg); transition: transform .5s, opacity .5s; }
.floor:not(.is-active) { opacity: .35; } .floor.is-active { transform: rotateX(58deg) rotateZ(-30deg) translateZ(22px); }`,
    edit: 'After Effects：各階の平面を 3D レイヤーにして重ね、選んだ階の位置Z（または位置Y）を上げ、ほかの階の不透明度を下げる',
    powerpoint: '各階の平面図を斜めに重ねて置き、選ぶ階に軌跡「直線（上へ）」、ほかの階に強調「透過性」（効果のオプション：50%）',
    cg: 'SketchUp：階ごとにタグを分け、選んだ階を上へずらした複製を別のタグで用意して、表示するタグを切り替えたシーンを作る（グループの位置はシーンに保存されない。切り替えは瞬時）。ほかの階は非表示にするか、面スタイル「X 線」のスタイルを保存してシーンに割り当てる',
    prompt: 'An exploded axonometric of stacked floor plans; the selected second floor lifts up from the stack while the other floors fade, clean diagram style',
  },
  '30': {
    css: `/* 部屋ごとに要素（SVG の path なら hover）を作り、指した部屋に色と名前、ほかは薄く */
.plan:hover .room { opacity: .45; } .plan .room:hover { opacity: 1; fill: rgb(207 121 95 / .4); }
.room:hover + .label { opacity: 1; transform: none; }`,
    edit: 'After Effects：部屋ごとのシェイプの塗り（不透明度）にキーを打ち、カーソルの位置の動きに合わせて色を付け、部屋名のテキストを出す',
    powerpoint: '部屋の図形に強調「塗りつぶしの色」、ほかの部屋に強調「透過性」、部屋名のテキストに開始効果「フェード」を同時に',
    prompt: 'An architectural floor plan, a cursor moves over a meeting room which fills with a warm color and shows its name and area, while other rooms fade',
  },

  /* ---------- 動画・カメラ ---------- */
  V01: {
    css: '/* 切り替え時に、次の画面を0秒で表示するだけ */\n.scene-b { opacity: 0; } .scene-b.is-active { opacity: 1; }',
    edit: 'Premiere Pro：トランジションを入れない「カット編集」。リズムよく切るなら「Jカット／Lカット」も',
    powerpoint: '画面切り替え「カット」（または「なし」）',
    cg: 'Lumion／Twinmotion：別々のカメラクリップをムービー編集でつなぐ（トランジションなし）／D5 Render：1つのクリップに視点（ショット）を複数並べると、ショットの境目でカットになる',
    prompt: 'A hard cut between two architectural shots, no transition, crisp editorial pacing',
  },
  V02: {
    css: `.scene-a { transition: opacity 1.5s; } .scene-b { opacity: 0; transition: opacity 1.5s; }
.is-next .scene-a { opacity: 0; } .is-next .scene-b { opacity: 1; }`,
    edit: 'Premiere Pro：トランジション「クロスディゾルブ」（黒を挟むなら「暗転」）',
    powerpoint: '画面切り替え「フェード」（効果のオプション：スムーズ）',
    cg: 'Lumion／Twinmotion：クリップ間のトランジション「フェード」／D5 Render：不可（ショットやクリップの間にトランジション（フェード）を付ける設定がない。書き出した動画を編集ソフトでフェード）',
    prompt: 'A slow cross dissolve between an exterior daytime shot and an interior shot of a building, calm and atmospheric',
  },
  V03: {
    css: `.scene-b { clip-path: inset(0 100% 0 0); transition: clip-path 1.2s cubic-bezier(.65,0,.35,1); }
.is-next .scene-b { clip-path: inset(0); }`,
    edit: 'Premiere Pro：トランジション「ワイプ」／After Effects：「リニアワイプ」',
    powerpoint: '画面切り替え「ワイプ」（効果のオプション：右から／左から）',
    prompt: 'A clean horizontal wipe transition reveals the next architectural scene from left to right',
  },
  V04: {
    css: `@keyframes zoom { to { transform: scale(1.28); } }
.shot { animation: zoom 2s cubic-bezier(.2,.75,.2,1) both; }`,
    edit: 'Premiere Pro：エフェクトコントロール「スケール」にキーフレーム／After Effects：スケール（ドリーと違い、遠近感は変わらない）',
    powerpoint: '画像に強調「拡大/収縮」、または画面切り替え「変形」で拡大した画像へ',
    cg: 'Lumion／Twinmotion：カメラの「画角（焦点距離）」をキーフレームで変える／D5 Render：動画モードで視点ごとに「FOV (Horizontal)」（または Focal Length）を変え、「↻」で視点を更新',
    prompt: 'Slow optical zoom in toward the main entrance of a modern building, focal length change, static camera position',
  },
  V05: {
    css: `@keyframes pan { to { transform: translateX(-42%); } }
.panorama { width: 175%; animation: pan 2.2s ease-in-out both; }`,
    edit: 'After Effects：3Dカメラの「Y 回転」（または「方向」）にキー、または画像の位置Xを動かす',
    powerpoint: '横長画像に「アニメーションの軌跡（左へ）」、または画面切り替え「パン」',
    cg: 'SketchUp：シーン間でカメラの向きだけ変える／Lumion・Twinmotion：同じ位置で向きだけを変えた2キー／D5 Render：テンプレート「Camera Movement」の「Pan Left」／「Pan Right」（その場で向きだけ変える。Start Rotation で角度）',
    prompt: 'A slow horizontal camera pan across a building facade and its surrounding plaza, steady tripod movement',
  },
  V06: {
    css: `@keyframes tilt { to { transform: translateY(0); } }
.tall-shot { height: 175%; transform: translateY(-43%); animation: tilt 2.2s ease-in-out both; }`,
    edit: 'After Effects：3Dカメラの「X 回転」にキー（チルトアップ）、または縦長画像の位置Y',
    powerpoint: '縦長画像に「アニメーションの軌跡（下へ）」で、下から上へ見上げる',
    cg: 'SketchUp／Lumion／Twinmotion：同じ位置で、視線を地上から上層部へ上げた2キー／D5 Render：テンプレート「Camera Movement」の「Pan Up」（その場で視線を上げる）',
    prompt: 'Camera tilts up slowly from the street level to the top of a high-rise tower, emphasizing height and scale',
  },
  V07: {
    css: `/* 手前ほど大きく拡大させ、奥行きの差を出す */
.near { animation: grow 2.2s both; --to: 2.4; } .subject { --to: 1.45; } .far { --to: 1.1; }
@keyframes grow { to { transform: scale(var(--to)); } }`,
    edit: 'After Effects：3Dカメラを前進（Z位置）。ズーム（スケール）と違い、手前と奥の見え方が変わる',
    powerpoint: '前景・被写体・背景を別画像にして、手前ほど大きく「拡大/収縮」させる',
    cg: 'Lumion／Twinmotion／Enscape：カメラ位置を前進させたキーフレーム（画角は固定）／D5 Render：テンプレート「Camera Movement」の「Horizontal Push」（Distance で前進量。画角は固定）',
    prompt: 'Smooth dolly-in camera move through foreground columns toward a building entrance, strong parallax, cinematic',
  },
  V08: {
    css: `.stage { perspective: 640px; } .cube { transform-style: preserve-3d; animation: orbit 2.2s ease-in-out both; }
@keyframes orbit { from { transform: rotateY(-28deg); } to { transform: rotateY(-118deg); } }`,
    edit: 'After Effects：3Dカメラを「カーソルのまわりを周回ツール」で回した位置にキー、またはヌルを親にしてY 回転',
    powerpoint: '画面切り替え「オービット」、または角度違いの画像を「変形」でつなぐ',
    cg: 'SketchUp：建物を中心に角度を変えたシーンを複数作る／Lumion・Twinmotion：「オービット」系のカメラパス／D5 Render：テンプレート「Camera Movement」の「360° Pan」（Calibre=半径、Circle center height、Movement Degree で回り込む角度）',
    prompt: 'Slow aerial orbit around a contemporary building at golden hour, revealing all facades, smooth and level',
  },
  V09: {
    css: `/* 層ごとに移動量を変える（手前ほど速い） */
.far { animation: slide 2.2s both; --to: -8%; } .mid { --to: -20%; } .near { --to: -42%; }
@keyframes slide { to { transform: translateX(var(--to)); } }`,
    edit: 'After Effects：3Dカメラを「カーソルの下でパンツール」で横に動かした位置にキー（カメラの「X 位置」）。パン（向きだけ）と違い視差が出る',
    powerpoint: '前景・中景・背景を別画像にし、移動量を変えた「アニメーションの軌跡（左へ）」を同時に',
    cg: 'Lumion／Twinmotion：カメラを建物と平行に横移動させたキーフレーム／D5 Render：テンプレート「Camera Movement」の「Slide Left」／「Slide Right」（Distance で移動量）',
    prompt: 'Camera trucks sideways along a street facade with columns passing in the foreground, layered parallax',
  },
  V10: {
    css: `.near { animation: blur-out 2.2s both; } .far { filter: blur(6px); animation: focus-in 2.2s both; }
@keyframes blur-out { to { filter: blur(7px); } } @keyframes focus-in { to { filter: blur(0); } }`,
    edit: 'After Effects：3Dカメラの被写界深度をオンにし「フォーカス距離」をキーフレーム／Premiere Pro：「ブラー（ガウス）」を2層で入れ替え',
    powerpoint: 'ぼかし加工した画像とシャープな画像を重ね、「フェード」で入れ替える（図の書式「アート効果：ぼかし」）',
    cg: 'Lumion：エフェクト「被写界深度」の焦点距離をキー／Twinmotion：「被写界深度」のフォーカス／D5 Render：Preference > Widget で「Advanced Camera Tool」を有効にし、「Add Camera」で置いたカメラの「Depth of Field」「Set Focus」「Blur」を設定（動画でピント位置をキー間で変える方法は未確認）',
    prompt: 'Rack focus from a blurred material sample in the foreground to the building interior in the background, shallow depth of field',
  },
  V11: {
    edit: 'After Effects：外観の画像にマスクを付け、切断線と一緒にマスクパスを左→右へ動かす',
    powerpoint: '断面図の上に外観図を重ね、外観図に終了効果「ワイプ（左から）」＋赤い切断線を「アニメーションの軌跡」で同時に',
    cg: 'SketchUp：「断面平面」を置き、位置を変えたシーンでアニメーション／Enscape・Twinmotion：「断面（クリッピング平面）」の位置をキー／D5 Render：Preference > Widget で「Section Tools」を有効にし、「Section」>「Section Plane」を置く。動画モードで断面を選び、Inspector の「◇」で位置・角度をキーフレーム',
    prompt: 'An animated section cut sweeps across a multi-story building, slicing away the facade to reveal floors, rooms and stairs inside, clean architectural diagram style',
  },
  V12: {
    edit: 'After Effects：昼と夜の2枚の外観を不透明度で重ね、窓の明かりをレイヤーごとに時間差で点灯',
    powerpoint: '昼の画像に夜の画像を「フェード」で重ね、窓の光の図形を開始効果「表示」で順に表示（「直前の動作の後」で遅延をずらす）',
    cg: 'Lumion／Twinmotion：「時刻（太陽の位置）」をキーフレームで夕方→夜へ。照明は「夜だけ点灯」設定／SketchUp：影の設定の時刻をシーンごとに変える／D5 Render：動画モードで2つ目の視点の Environment「Sky Light」の時刻を夜にして「↻」で更新すると、夕方→夜へ補間される（照明の夜だけ点灯は未確認）',
    prompt: 'Time-lapse of a building facade from late afternoon to night, the sky deepens to dusk while interior lights switch on window by window',
  },

  V13: {
    css: `/* 影を建物の中心で回し、朝夕は長く・昼は短くする */
.shadow { transform-origin: 50% 0; animation: sun 2.2s ease-in-out both; }
@keyframes sun { 0% { transform: rotate(-70deg) scaleY(1.6); } 50% { transform: rotate(0) scaleY(.6); } 100% { transform: rotate(70deg) scaleY(1.6); } }`,
    edit: 'After Effects：影のシェイプを建物の足元を中心に回転させ、スケールで長さを変える（太陽のアイコンを円弧のパスで動かす）',
    powerpoint: '時刻ごとの日影図を並べ、画面切り替え「変形」でつなぐ（影の図形を同じ名前にしておくと滑らかに回る）',
    cg: 'SketchUp：「影」パネルで日付と時刻を設定し、時刻を変えたシーンを並べてアニメーション／Lumion・Twinmotion：太陽の「時刻」をキーフレーム／D5 Render：視点ごとに Environment「Sky Light」の時刻を変え、「↻」で更新すると太陽の位置が補間される',
    prompt: 'Top-down site plan animation of building shadows sweeping from morning to evening as the sun moves across the sky, clean architectural diagram',
  },
  V14: {
    css: `/* 平面を傾け、壁を床面から立ち上げる */
.plan { transform-style: preserve-3d; animation: tilt 2.2s both; }
@keyframes tilt { to { transform: rotateX(58deg) rotateZ(-35deg); } }
.wall { transform-origin: bottom; animation: rise 1s 1s both; }
@keyframes rise { from { transform: rotateX(-90deg) scaleY(0); } to { transform: rotateX(-90deg) scaleY(1); } }`,
    edit: 'After Effects：平面図のレイヤーを3D化して X回転で寝かせ、壁のレイヤーをアンカーポイントを下端にしてスケールYで立ち上げる',
    powerpoint: '平面図とアイソメ図の2枚を画面切り替え「変形」でつなぐ。壁は開始効果「ワイプ（下から）」で追加',
    cg: 'SketchUp：上面図のシーンと、壁を押し出した（プッシュ／プル）アイソメのシーンを用意してアニメーション。押し出し途中の段階をシーンで刻むと滑らか／D5 Render：テンプレート「Animation」の「Rise」（Edit Objects で対象を選ぶ）。壁を別モデルとして読み込むと段階的に立ち上げられる',
    prompt: 'A flat architectural floor plan tilts into an isometric view and its walls extrude upward into a 3D model, clean white diagram style',
  },
  V15: {
    css: `.axo { transform-style: preserve-3d; transform: rotateX(58deg) rotateZ(-45deg); }
.layer { animation: explode 2.2s ease-in-out both; }
@keyframes explode { 50% { transform: translateZ(calc(var(--i) * 46px)); } }`,
    edit: 'After Effects：各階を3Dレイヤーにし、Z位置を階ごとに離してから戻す（ヌルを親にして全体をアイソメ角度に）',
    powerpoint: '各階の図形を「アニメーションの軌跡：直線（上へ）」で階ごとに距離を変えて「直前の動作と同時」に動かし、効果のオプション画面で「オートリバース」をオンにする',
    cg: 'SketchUp：重ねた状態と上下に離した状態を別タグの複製で用意し、タグの表示を切り替えたシーンを作る（分解アクソメ。切り替えは瞬時なので、途中段階のシーンを足すと動いて見える）／Twinmotion：オブジェクトの「アニメーター（移動）」／D5 Render：テンプレート「Animation」の「Ascend」／「Descend」などを階ごとに設定（.skp を1ファイルで読み込むと1モデルになるため、階ごとに別ファイルで読み込む）',
    prompt: 'Exploded axonometric animation of a building: roof, floor slabs and foundation separate vertically and then reassemble, minimal diagram',
  },
  V16: {
    css: `/* 層ごとに下へ流す量を変えて、上昇感を出す */
.near { animation: up 2.2s both; --to: 70%; } .building { --to: 22%; } .skyline { --to: 6%; }
@keyframes up { to { transform: translateY(var(--to)); } }`,
    edit: 'After Effects：3Dカメラの「Y 位置」を上げる（画面上では「カーソルの下でパンツール」で上へ）。手前の木を別レイヤーにすると視差が出る',
    powerpoint: '手前・建物・背景を別画像にし、手前ほど大きく「アニメーションの軌跡（下へ）」で動かす',
    cg: 'Lumion／Twinmotion／Enscape：カメラの高さを上げたキーフレーム（視線は建物に向けたまま）／SketchUp：視点の高さを変えたシーン／D5 Render：テンプレート「Camera Movement」の「Slide Up」＋ショットの「Camera Target」をオン（Focus On で建物を指定）',
    prompt: 'Crane shot rising from eye level over foreground trees to reveal a building and the city skyline behind it, smooth vertical movement',
  },
  V17: {
    css: `/* 寄りの状態から等倍へ。origin を見せたいディテールに合わせる */
.scene { transform-origin: 62% 38%; animation: pull 2.2s cubic-bezier(.3,0,.2,1) both; }
@keyframes pull { from { transform: scale(3.5); } to { transform: scale(1); } }`,
    edit: 'After Effects：3Dカメラを後退（Z位置）、または高解像度の全景をスケール350→100%（アンカーポイントをディテールに）',
    powerpoint: '全景の画像に強調「拡大/収縮」の逆（大きい状態から100%へ）、または寄りと引きの2枚を「変形」でつなぐ',
    cg: 'Lumion／Twinmotion：ディテールに寄ったカメラから、建物全体が入る位置まで後退するキーフレーム／D5 Render：テンプレート「Camera Movement」の「Horizontal Pull」（Distance で後退量）',
    prompt: 'Camera pulls back from a close-up of a facade material detail to reveal the entire building and its surroundings, slow and cinematic',
  },
  V18: {
    css: `/* 開口の枠は大きく拡大して画面外へ、内部はゆっくり近づく */
.frame { animation: pass 2.2s both; } .interior { animation: enter 2.2s both; }
@keyframes pass { to { transform: scale(6); opacity: 0; } } @keyframes enter { to { transform: scale(1.5); } }`,
    edit: 'After Effects：3Dカメラを開口に向けて前進。入口の枠を手前のレイヤーにすると「抜ける」感じが出る',
    powerpoint: '外観と内観を画面切り替え「ズーム」系（または「フライスルー」）でつなぐ。開口の位置を合わせると自然',
    cg: 'Lumion／Twinmotion／Enscape：入口の外から開口を通り、室内まで進むカメラパス（ドアは開けておく）／SketchUp：「ウォーク」ツールの視点でシーンを並べる／D5 Render：入口の外→開口→室内の順に「Add Current View」で視点を追加し、「Edit Path」で経路を調整',
    prompt: 'Smooth fly-through camera move passing through the main entrance opening into a bright double-height lobby, architectural walkthrough',
  },
  V19: {
    css: `/* SVGの線を描いてから、色の層をフェードで重ねる */
.line path { stroke-dasharray: 1; stroke-dashoffset: 1; animation: draw 1.1s ease forwards; }
@keyframes draw { to { stroke-dashoffset: 0; } }
.render { opacity: 0; animation: show .9s 1.1s forwards; } @keyframes show { to { opacity: 1; } }`,
    edit: 'After Effects：線画に「線（ストローク）」エフェクトまたは「パスのトリミング」で描画し、レンダー画像を不透明度で重ねる／Premiere Pro：線画とレンダーを「クロスディゾルブ」',
    powerpoint: '線画に開始効果「ワイプ」、続けてレンダー画像を開始効果「フェード」（「直前の動作の後」）',
    cg: 'SketchUp：スタイル「スケッチ エッジ」と、面スタイル「テクスチャーで陰影をつける」のスタイルを切り替えたシーンをつなぐ（切り替えは瞬時。溶けるように見せるなら書き出した2枚を動画編集でクロスフェード）／Lumion：「スケッチ」エフェクトの強さをキー／D5 Render：Effect > Style の「Outline mode」で線画風にできる（視点ごとの切り替え・補間は未確認）',
    prompt: 'A hand-drawn architectural line sketch of a house draws itself and then dissolves into a fully colored photorealistic rendering',
  },
  V20: {
    css: `/* 上下にぼかしの帯を重ね、彩度を少し上げる */
.city { filter: saturate(1.3); }
.blur-top, .blur-bottom { backdrop-filter: blur(6px); mask-image: linear-gradient(to bottom, #000, transparent); }`,
    edit: 'After Effects：「ブラー（カメラレンズ）」をグラデーションのマップで上下だけに。彩度を上げ、再生速度を少し速めると模型らしくなる',
    powerpoint: '同じ画像を2枚重ね、上の画像に「アート効果：ぼかし」をかけ、中央を透明から白へのグラデーションで塗った図形を重ねてぼかしの境目をなじませる',
    cg: 'Lumion：エフェクト「ティルトシフト（ミニチュア）」／Twinmotion：被写界深度を強め、高い位置からの俯瞰カメラ／D5 Render：不可（ティルトシフトの機能はない。近い表現は「Add Camera」のカメラで「Depth of Field」の Blur を強め、高い位置から俯瞰）',
    prompt: 'High-angle tilt-shift shot of a city block with blurred top and bottom edges and saturated colors, looking like a miniature architectural model',
  },

  V21: {
    css: `/* 構造 → 設備 → 仕上げの順に、遅らせて現れる */
.column { transform-origin: bottom; animation: rise .45s ease-out both; }
.duct { transform-origin: left; animation: grow .4s .85s ease-out both; }
.finish { animation: slide .55s 1.5s cubic-bezier(.2,.8,.2,1) both; }
@keyframes rise { from { transform: scaleY(0); } } @keyframes grow { from { transform: scaleX(0); } } @keyframes slide { from { transform: translateX(105%); } }`,
    edit: 'After Effects：構造・設備・仕上げを別々に書き出した画像（または線画）を3つのレイヤーに分け、構造は「リニアワイプ」で下から、設備は線ごとに「パスのトリミング」、仕上げは位置または「リニアワイプ」で順に重ねる。段階名のラベルを添える',
    powerpoint: '構造・設備・仕上げの3枚の画像（同じ位置・同じ大きさで書き出し）を重ね、構造に開始効果「ワイプ（下から）」、設備に「フェード」、仕上げに「ワイプ（右から）」を「直前の動作の後」で順に',
    cg: 'SketchUp：構造・設備・仕上げをタグで分け、表示するタグを1つずつ増やしたシーンを並べる（タグの切り替えは瞬時。滑らかにしたいときは書き出した画像を動画編集でつなぐ）／Navisworks：TimeLiner で施工順序（4D）を再生／D5 Render：構造・設備・仕上げを別々の .skp で書き出して順に読み込むと、Object リストに別のモデルとして入る。D5 では各モデルの基準点が箱の下の中央になるので、Inspector の Location に SketchUp 上の位置の差を入れて重ねる。Object リストの目のアイコンで表示を切り替え、段階ごとに画像（または動画）を書き出して編集ソフトで重ねる',
    prompt: 'Architectural BIM build-up animation on a clean grid background: first the steel columns and beams appear, then colored ducts, pipes and cable trays are added floor by floor, and finally the facade panels and glazing slide in, leaving a cutaway that shows the layers inside',
  },

  /* ---------- v1.2-1 つなぎ・カメラ・建築CG（V22〜V33） ---------- */
  V22: {
    css: `/* 前の画の丸を少し寄せ、同じ位置の丸がある次の画へ一瞬で切り替える */
.scene-a { animation: push 1.1s ease-in both; }
.scene-b { animation: cut 2.2s steps(1, end) both, pull 1.1s 1.1s ease-out both; }
@keyframes cut { 0%, 49% { opacity: 0; } 50%, 100% { opacity: 1; } }`,
    edit: 'Premiere Pro：2つのクリップをカットでつなぎ、後ろのクリップの「モーション」の位置とスケールで、丸い形が前のクリップと同じ位置・大きさに来るように合わせる。つなぎ目の前後に少しだけスケールのキーを入れると自然',
    powerpoint: '2枚のスライドで、丸い形（窓と天窓）を同じ位置・同じ大きさに置く（「配置」やスマートガイドで揃える）。画面切り替えは「なし」か短い「フェード」',
    cg: 'D5 Render：外観の丸窓と室内の天窓を、丸が画面の同じ位置・大きさに来るように視点を合わせ、画像モード（または動画モードのクリップ2本）で別々に書き出す。つなぎは編集ソフトでカット／SketchUp：2つの視点のシーンを作り、同じように丸の位置・大きさを合わせて書き出す',
    prompt: 'Match cut: a round window on a brick facade, then a cut to a round skylight inside the building in exactly the same position and size in the frame, smooth and elegant transition',
  },
  V23: {
    css: `/* 2つの場面を横に並べ、速く動かしながら途中だけ横方向にぼかす */
.track { animation: move 2.2s cubic-bezier(.85,0,.15,1) both, blur 2.2s cubic-bezier(.85,0,.15,1) both; }
@keyframes move { 0%, 25% { transform: translateX(0); } 75%, 100% { transform: translateX(-50%); } }
@keyframes blur { 50% { filter: blur(10px); } }`,
    edit: 'After Effects：前後のクリップを並べて位置にキーを打ち、つなぎ目の前後数フレームで速く動かして「ブラー(方向）」（方向 90°）をかける。Premiere Pro では同じく「モーション」の位置にキーと「ブラー (方向)」',
    powerpoint: '画面切り替え「プッシュ」（効果のオプション：右から）を、期間 0.3〜0.5 秒と短めに',
    cg: 'D5 Render：動画モードでクリップを2本作り、前のクリップの最後と次のクリップの最初にカメラを横へ速く振るキーフレームを足して書き出す。つなぎと方向ブラーは編集ソフトで足す／Lumion・Twinmotion：同じように2本の動画を書き出し、つなぎ目は編集ソフトで作る',
    prompt: 'A fast whip pan from a building exterior to the next scene, strong horizontal motion blur in the middle of the camera move, energetic transition',
  },
  V24: {
    css: `/* 次の場面を円で切り抜き、中央から広げる */
.scene-b { clip-path: circle(0% at 50% 50%); animation: iris 2.2s cubic-bezier(.65,0,.35,1) both; }
@keyframes iris { 15% { clip-path: circle(0% at 50% 50%); } 85%, 100% { clip-path: circle(75% at 50% 50%); } }`,
    edit: 'Premiere Pro：ビデオトランジション「アイリス (円形)」（レガシー）／After Effects：次のクリップに楕円のマスクを付け、マスクの拡張にキー',
    powerpoint: '画面切り替え「図形」（効果のオプション：円）',
    cg: 'D5 Render：不可（動画モードにクリップ間のトランジションがない）。前後の視点を書き出し、編集ソフトの「アイリス (円形)」や PowerPoint の画面切り替え「図形」（円）でつなぐ／SketchUp：不可（同じく書き出してつなぐ）',
    prompt: 'Iris transition: the next scene of a building interior opens from a small circle at the center of the frame and expands to fill the screen',
  },
  V25: {
    css: `/* 前の画を明るく飛ばし、白い光を一番明るい所で次の画へ切り替える */
.scene-a { animation: bright 2.2s ease-in both; } /* filter: brightness(1.8) */
.flash { animation: flash 2.2s ease-in-out both; }
@keyframes flash { 0%, 10% { opacity: 0; } 46%, 54% { opacity: 1; } 90%, 100% { opacity: 0; } }`,
    edit: 'Premiere Pro：トランジション「ホワイトアウト」（白みを長くするならデュレーションを長めに）／After Effects：白の平面レイヤーの不透明度にキーを打ち、前のクリップの「露光量」も上げる',
    powerpoint: '画面切り替え「フラッシュ」、または白い四角形を全面に置いて開始効果「フェード」→ 次のスライドへ',
    cg: 'D5 Render：動画モードで同じ視点のキーフレームを2つ置き、2つ目のキーを選んで Inspector の Property「Exposure Compensation」を上げる（例 5）。白く飛んだところで次のクリップへ、つなぎは編集ソフトで',
    prompt: 'The image of a building washes out into bright white light, and the next scene of a morning interior emerges from the glow, dreamy time-skip transition',
  },
  V26: {
    css: `/* 3つの画を重ね、clip-path で 1 → 2 → 3 画面に分ける */
.p2 { animation: two 2.2s both; } .p3 { animation: three 2.2s both; }
@keyframes two { 40%, 55% { clip-path: inset(0 0 0 50%); } 85%, 100% { clip-path: inset(0 33.3% 0 33.3%); } }
@keyframes three { 0%, 55% { clip-path: inset(0 0 0 100%); } 85%, 100% { clip-path: inset(0 0 0 66.7%); } }`,
    edit: 'Premiere Pro：3つのクリップを上下のトラックに重ね、エフェクト「クロップ」（レガシー。「モーション」の切り抜きでも可）で幅を切り、「モーション」の位置で並べる（左右の切り抜きにキーを打つと分割していく動きになる）',
    powerpoint: '3つの画像を横に並べて置き、開始効果「ワイプ」（効果のオプション：左から）を「直前の動作の後」で順に。境目に細い白線を引く',
    cg: 'D5 Render：不可（1つの画面に複数の視点を並べられない）。案ごとに同じ視点の画像・動画を書き出し、編集ソフトの「クロップ」や PowerPoint で並べる／SketchUp：同じく案ごとに書き出して並べる',
    prompt: 'Split screen showing three design options of the same building side by side, each panel slides in one after another, clean white dividers',
  },
  V27: {
    css: `/* 手前の建物はそのまま、背景のレイヤーだけを拡大する */
.background { transform-origin: 50% 60%; animation: dolly-zoom 2.2s cubic-bezier(.45,0,.2,1) both; }
@keyframes dolly-zoom { to { transform: scale(1.7); } }`,
    edit: 'After Effects：3D カメラの位置（Z）を被写体から離しながら、カメラの「ズーム」を上げて被写体の大きさを保つ（2つのキーを同時に打つ）。合成なら、背景のレイヤーだけ「スケール」を上げる',
    powerpoint: '背景の画像に強調「拡大/収縮」（例 150%）を、手前の建物（背景を削除した画像）は動かさずに重ねる',
    cg: 'D5 Render：動画モードで、被写体に近い位置のキーフレーム（FOV 90° など）を置く。カメラを後ろへ引いて2つ目のキーを置き、そのキーを選んで Inspector の「FOV (Horizontal)」を、被写体が同じ大きさに見えるまで狭める（例 40°。途中で被写体が少し小さくなる）／SketchUp：カメラを後ろに引いたシーンと、「カメラ」>「視野」を狭くしたシーンを作り、遷移で切り替える',
    prompt: 'Dolly zoom (vertigo effect): the building in the foreground stays the same size while the background city appears to stretch and rush toward the camera, dramatic',
  },
  V28: {
    css: `/* 手前の柱・葉のレイヤーを画面の外へ動かし、奥の建物を少し戻す */
.near { filter: blur(2px); animation: out 2.2s cubic-bezier(.45,0,.25,1) both; }
.building { animation: drift 2.2s cubic-bezier(.45,0,.25,1) both; }
@keyframes out { to { transform: translateX(-82%); } } @keyframes drift { from { transform: translateX(6%) scale(1.04); } }`,
    edit: 'After Effects：手前（ぼかした柱や葉）・奥（建物）を別レイヤーにし、手前の位置を大きく、奥を少しだけ動かす（「ブラー（ガウス）」で手前をぼかす）。実写なら、柱の陰からカメラを横に動かして撮る',
    powerpoint: '手前の柱の画像（ぼかし）に終了効果「スライドアウト」（左へ）、奥の建物の画像に強調「拡大/収縮」（少し縮小）を同時に',
    cg: 'D5 Render：手前に柱や木がある位置にキーフレームを置き、カメラを横へ動かして2つ目のキーを置く（前景が大きく、奥が少しだけ動く）。被写界深度（Depth of Field）で手前をぼかすと前景らしくなる／Lumion・Twinmotion：同じように横へ動くカメラのキーフレーム（またはパス）を置く／SketchUp：柱の陰の視点と、抜けた視点のシーンを2つ作る',
    prompt: 'The camera slides out from behind a blurred column and tree leaves in the foreground, revealing the building facade behind, cinematic parallax reveal',
  },
  V29: {
    css: `/* 配置図の面を、真上（rotateX 0）から寝かせて（rotateX 74deg）目線の高さへ */
.view { perspective: 420px; perspective-origin: 50% 20%; }
.plane { transform-origin: 50% 100%; animation: descend 2.2s cubic-bezier(.45,0,.2,1) both; }
@keyframes descend { from { transform: rotateX(0) scale(1); } to { transform: translateY(18%) rotateX(74deg) scale(1.9); } }`,
    edit: 'After Effects：配置図を 3D レイヤーにし、「X 回転」を 0° から 70° 前後へ、同時に 3D カメラを下げる。最後に目線のパースへクロスディゾルブ',
    powerpoint: '配置図のスライドと目線のパースのスライドを、画面切り替え「ズーム」（または同じ建物を置いて「変形」）でつなぐ',
    cg: 'D5 Render：真上から見下ろすキーフレームと、人の目線の高さのキーフレームを置く（間は自動でつながる）／SketchUp：標準ビュー「平面」と目線のシーンを作り、モデル情報の「アニメーション」で「シーンの切り替え」の秒数を長めに',
    prompt: 'The camera starts directly above the site plan looking straight down, then smoothly tilts and descends to eye level in front of the building',
  },
  V30: {
    css: `/* 街並みを段階的（steps）に拡大し、雲だけを速く流す */
.street { transform-origin: 50% 58%; animation: lapse 2.2s steps(7, end) both; }
.cloud { animation: cloud 2.2s linear both; }
@keyframes lapse { to { transform: scale(1.9); } } @keyframes cloud { to { transform: translateX(-160%); } }`,
    edit: 'Premiere Pro：歩きながら撮った（または一定間隔で撮った）素材の「速度・デュレーション」を 1000% 前後に上げ、エフェクト「ワープスタビライザー」で揺れを抑える',
    powerpoint: '少しずつ前に進んだ数枚の画像を、画面切り替え「なし」・自動で 0.2 秒ごとに切り替える（コマ送り）',
    cg: 'D5 Render：動画モードでアプローチに沿ってキーフレームを並べ（Edit Path で経路を調整）、1つ目のキーの前に朝、最後のキーの前に夕方の時刻を設定してから置く（時刻はキーごとに記録され補間される）。雲は Cloud の Global Settings「Speed」を上げる。書き出した動画を編集ソフトで速める／Lumion・Twinmotion：アプローチに沿った長いカメラパスで書き出し、編集ソフトで速度を上げる',
    prompt: 'Hyperlapse walking along a street toward the building, the camera moves forward in quick steps, clouds and people rush by, time passing fast',
  },
  V31: {
    css: `/* 照明シーンごとの重ね（全般・作業・くつろぎ・常夜灯）を、順に不透明度で切り替える */
.general { animation: s1 2.2s both; } .task { animation: s2 2.2s both; }
@keyframes s1 { 0%, 18% { opacity: 1; } 28%, 100% { opacity: 0; } }
@keyframes s2 { 0%, 18% { opacity: 0; } 28%, 45% { opacity: 1; } 55%, 100% { opacity: 0; } }`,
    edit: 'After Effects／Premiere Pro：照明シーンごとに書き出した同じ視点の画像を重ね、「クロスディゾルブ」（または不透明度のキー）で順に切り替え、シーン名のテロップを添える',
    powerpoint: '照明シーンごとの画像を同じ位置に重ね、開始効果「フェード」を「直前の動作の後」で順に（またはスライドを分けて画面切り替え「フェード」）',
    cg: 'D5 Render：ライトの強さ（Intensity）と色温度（Temperature）を変えるごとに、同じ視点の画像を書き出す（動画モードではライトの強さ・色温度を変えられないので、画像を編集ソフトでつなぐ）／SketchUp：照明の計算はできないため、レンダリングソフトで作る',
    prompt: 'The same living room interior with the camera locked, the lighting changes from bright general lighting, to task lights over the table, to warm relaxing wall-washing light, to a dim night light',
  },
  V32: {
    css: `/* 仕上げごとの面を重ね、clip-path のワイプで順に入れ替える。光の線を横切らせる */
.wood { clip-path: inset(0 100% 0 0); animation: in 2.2s cubic-bezier(.65,0,.35,1) both; }
@keyframes in { 33%, 100% { clip-path: inset(0); } }
.sweep { animation: sweep .73s linear 3; } @keyframes sweep { from { left: 0; } to { left: 100%; } }`,
    edit: 'After Effects：仕上げごとに書き出した同じ視点の画像を重ね、上の画像に「リニアワイプ」（変換終了にキー）で順に入れ替える。境目に細い光の線を添える',
    powerpoint: '仕上げごとの画像を同じ位置に重ね、開始効果「ワイプ」（効果のオプション：左から）を「直前の動作の後」で順に。仕上げ名のテキストも切り替える',
    cg: 'D5 Render：通常の画面でマテリアルピッカー（I キー）で外壁を選び、仕上げのマテリアルを差し替えるたびに、同じ視点（画像モード）で1枚ずつ書き出す（動画モードではマテリアルを変えられない）／SketchUp：シーンはマテリアルを保存しないため、仕上げごとの面をタグで分け、シーンで表示するタグを切り替える',
    prompt: 'The same building facade with the camera locked, the exterior finish changes one after another from exposed concrete to wood, to metal panels, to tiles, with a thin light sweep at each change',
  },
  V33: {
    css: `/* SVG の線を破線にし、stroke-dashoffset を動かして流れて見せる */
.flow { fill: none; stroke-dasharray: 6 7; animation: flow .55s linear infinite; }
@keyframes flow { from { stroke-dashoffset: 26; } to { stroke-dashoffset: 0; } }`,
    edit: 'After Effects：断面図の上に、シェイプレイヤーで流れの曲線を描き、線を破線にして「破線」の「オフセット」にキー（または「パスのトリミング」で伸ばす）。給気は青、還気は赤に',
    powerpoint: '断面図の上に曲線の矢印を描き、開始効果「ワイプ」（効果のオプションは上下左右の4方向だけなので、流れに近い向きを選ぶ）を「直前の動作の後」で順に。人の動線は点線で',
    cg: 'D5 Render：不可（気流の計算はできない）。気流解析（CFD）ソフトの結果の流線を画像・動画で書き出して重ねるか、流線を線のモデルとして読み込んで表示を切り替える／SketchUp：流れの曲線をタグで分け、シーンで順に表示する',
    prompt: 'A clean architectural section diagram: blue supply air streams flow down from ceiling diffusers, red return air flows back to the return grille, and a dotted green line shows how people move through the space',
  },

  /* ---------- 文字 ---------- */
  T01: {
    css: `@keyframes fade-in { from { opacity: 0; transform: translateY(.25em); filter: blur(6px); } }
.title { animation: fade-in 1.7s ease both; }`,
    edit: 'After Effects：プリセット「フェードアップ」系、または不透明度＋ブラー（ガウス）／Premiere Pro：テキストを置き、エフェクトコントロール（または「プロパティ」パネル）の「不透明度」にキー',
    powerpoint: '開始効果「フェード」（ぼかしは画像化して重ねる）',
    prompt: 'A title fades in softly from a slight blur, calm and elegant typography for an architectural film',
  },
  T02: {
    css: `.char { opacity: 0; animation: show .01s steps(1) both; animation-delay: calc(var(--i) * .18s); }
@keyframes show { to { opacity: 1; } }`,
    edit: 'After Effects：テキストアニメーター（不透明度0＋範囲セレクター）、またはプリセット「タイプライタ」',
    powerpoint: '開始効果「表示」＋効果のオプション画面の「テキストの動作：文字単位で表示」（「秒文字間で遅延」を0.05秒程度）',
    prompt: 'Text appears letter by letter like a typewriter with a blinking cursor, minimal and clear',
  },
  T03: {
    css: `.char { display: inline-block; animation: rise .55s cubic-bezier(.2,.8,.2,1) both; animation-delay: calc(var(--i) * .1s); }
@keyframes rise { from { opacity: 0; transform: translateY(.9em); } }`,
    edit: 'After Effects：テキストアニメーター（位置Y＋不透明度）で範囲セレクターのオフセットをキー（文字ごとに時間差）',
    powerpoint: '開始効果「フロートイン」＋効果のオプション画面の「テキストの動作：文字単位で表示」（「%文字間で遅延」を調整）',
    prompt: 'Letters of a title rise into place one after another with a smooth staggered rhythm',
  },
  T04: {
    css: `.char { display: inline-block; animation: assemble 1.6s cubic-bezier(.2,.8,.2,1) both; }
@keyframes assemble { from { opacity: .35; transform: translate(var(--x), var(--y)) rotate(var(--r)); } }`,
    edit: 'After Effects：テキストアニメーター（位置・回転＋ウィグリーセレクター）を収束させる、またはプリセット「ランダムシャッフルイン」など',
    powerpoint: '開始効果「スライドイン（各方向）」を文字ごとに設定、または「変形」でばらばらの文字から整列へ',
    prompt: 'Scattered letters fly in from different directions and assemble into a brand name, dynamic opening title',
  },
  T05: {
    css: `.mask { overflow: hidden; } .mask .line { animation: up 1.1s cubic-bezier(.7,0,.2,1) both; }
@keyframes up { from { transform: translateY(115%); } }`,
    edit: 'After Effects：トラックマット（アルファ）で文字を枠の下から上へ／Premiere Pro：「クロップ」＋位置',
    powerpoint: '開始効果「ワイプ」（効果のオプション：下から）',
    prompt: 'A chapter title slides up from behind an invisible line with a thin accent rule, refined editorial motion',
  },
  T06: {
    css: `@keyframes tracking { from { letter-spacing: -.04em; opacity: 0; } to { letter-spacing: .4em; opacity: 1; } }
.title { animation: tracking 2s cubic-bezier(.2,.7,.2,1) both; }`,
    edit: 'After Effects：テキストアニメーター「トラッキング」の「トラッキングの量」をキーフレーム／プリセット「トラッキング (拡張)」など',
    powerpoint: '開始効果「フェード」＋強調「拡大/収縮」を「直前の動作と同時」で近い印象に。字間そのものは「変形」で、字間の違う2枚のスライドをつなぐ',
    prompt: 'An elegant title whose letters slowly spread apart with increasing letter spacing while fading in, luxury architectural film opening',
  },
  T07: {
    css: `/* SVGの文字に線を描かせてから塗る */
text { fill: transparent; stroke: currentColor; stroke-dasharray: 600; stroke-dashoffset: 600; animation: stroke 1.4s ease forwards, fill .6s 1.3s forwards; }
@keyframes stroke { to { stroke-dashoffset: 0; } } @keyframes fill { to { fill: currentColor; } }`,
    edit: 'After Effects：テキストからシェイプを作成し、「パスのトリミング」で線を描いてから塗りの不透明度を上げる／エフェクト「線（ストローク）」',
    powerpoint: '文字を図形に変換（図形の結合）し、輪郭だけの図に開始効果「ワイプ」、続けて塗りありの図を「フェード」',
    cg: 'SketchUp：3Dテキストの「エッジのみ」と「塗りあり」のスタイルを切り替えたシーンをつなぐ／D5 Render：Effect > Style の「Outline mode」で線画風／通常を切り替え（視点ごとの切り替えは未確認）',
    prompt: 'The outline strokes of a building name are drawn by an invisible pen, then the letters fill in with color, refined title animation',
  },
  T08: {
    css: `/* JSで値を数える（表示は3桁区切り） */
const run = (el, to, ms) => { const t0 = performance.now(); const step = (t) => { const p = Math.min((t - t0) / ms, 1); el.textContent = Math.round(to * (1 - (1 - p) ** 3)).toLocaleString(); if (p < 1) requestAnimationFrame(step); }; requestAnimationFrame(step); };`,
    edit: 'After Effects：エフェクト「番号」、またはテキストのソーステキストにエクスプレッション（スライダー制御で値をキー）',
    powerpoint: '標準機能での数え上げはない。数値を数枚に分けて「変形」でつなぐか、開始効果「スピン」「ズーム」で数値を強調',
    prompt: 'Animated statistics for a building project counting up from zero: floor area 12,480 square meters, 24 floors, height 98.5 meters, clean infographic',
  },
  T09: {
    css: `.dim-line { transform: scaleX(0); transform-origin: center; animation: dim 1s cubic-bezier(.2,.8,.2,1) both; }
.dim-value { opacity: 0; animation: fade .5s .9s forwards; }
@keyframes dim { to { transform: scaleX(1); } }`,
    edit: 'After Effects：線のシェイプのスケールXを中央から伸ばし、端の矢印と数値をあとからフェード',
    powerpoint: '寸法線の図形に開始効果「ストレッチ」（効果のオプション：中心から）、数値に「フェード」を「直前の動作の後」で',
    cg: 'SketchUp：「寸法」ツールで寸法を付け、寸法のあるシーンとないシーンをつなぐ（寸法の表示はスタイル・タグで切り替え）／D5 Render：不可（SketchUpの寸法は読み込まれず、D5に寸法ツールもない。書き出した画像・動画に後から追記）',
    prompt: 'An architectural dimension line extends from the center to both sides between two walls and the measurement 7,200 appears above it, clean technical drawing style',
  },
  T10: {
    css: `.dot { animation: pop .3s both; } .leader { transform: scaleX(0); transform-origin: left; animation: grow .5s .3s both; }
.label { opacity: 0; transform: translateX(-6px); animation: show .4s .7s both; }`,
    edit: 'After Effects：点・引き出し線（パスのトリミング）・ラベルの順に時間差で表示',
    powerpoint: '点に開始効果「ズーム」、線に「ワイプ（左から）」、ラベルに「フェード」を「直前の動作の後」で順に',
    cg: 'SketchUp：「テキスト」ツールで引き出し線付きの注記を付け、注記の有無でシーンを分ける／Twinmotion・Lumion：書き出した画像に後から注記／D5 Render：不可（SketchUpのテキスト（注記）は読み込まれず、D5に注記ツールもない。書き出した画像・動画に後から追記）',
    prompt: 'Leader callouts appear on an architectural rendering: a dot, a thin line and a label naming the facade material, one after another',
  },
  /* ---------- v1.2-3 文字・数値（T11〜T17） ---------- */
  T11: {
    css: `@keyframes blur-in { from { opacity: 0; filter: blur(12px); transform: scale(1.06); } }
.char { display: inline-block; animation: blur-in 1.2s cubic-bezier(.2,.7,.2,1) both; animation-delay: calc(var(--i) * .07s); }`,
    edit: 'After Effects：テキストに「ブラー（ガウス）」をかけ、ブラーの量を 30→0、不透明度を 0→100% に。文字ごとにずらすならテキストアニメーターの「ブラー」と範囲セレクター',
    powerpoint: '開始効果「フェード」に、テキストの「ぼかし」はアニメーションできないため、ぼかした文字の画像とはっきりした文字を重ね、ぼかしの方に終了効果「フェード」・はっきりした方に開始効果「フェード」を同時に',
    prompt: 'A Japanese title slowly comes into focus from a soft blur, letter by letter, calm and elegant opening title',
  },
  T12: {
    css: `/* 言葉を縦に並べ、枠からはみ出た分を隠して、上へ送る */
.slot { display: inline-block; height: 1.3em; overflow: hidden; } .roll b { display: block; height: 1.3em; }
.roll { animation: roll 6s cubic-bezier(.7,0,.3,1) infinite; } @keyframes roll { 33% { transform: translateY(-1.3em); } 66% { transform: translateY(-2.6em); } }`,
    edit: 'After Effects：入れ替える言葉を縦に並べた1つのテキストにマスクを付け、位置Yを1行ずつ上げるキーを（イージーイーズ）',
    powerpoint: '言葉ごとのテキストボックスを同じ位置に重ね、前の言葉に終了効果「スライドアウト」（上へ）・次の言葉に開始効果「スライドイン」（下から）を「直前の動作と同時」に',
    prompt: 'A Japanese phrase where only one word keeps rolling up and changing — work, gather, relax — kinetic typography, clean background',
  },
  T13: {
    css: `/* 帯をグラデーションで描き、background-size を 0→100% に */
mark { background: linear-gradient(transparent 58%, rgb(234 107 77 / .42) 58% 92%, transparent 92%) no-repeat 0 0 / 0% 100%; transition: background-size 1s cubic-bezier(.6,0,.3,1); }
.is-visible mark { background-size: 100% 100%; }`,
    edit: 'After Effects：言葉の下に半透明の長方形（シェイプ）を置き、「パスのトリミング」または長方形のスケールX（アンカーは左端）を 0→100% に',
    powerpoint: '言葉の下に半透明の四角形を置き、開始効果「ワイプ」（効果のオプション：左から）',
    prompt: 'A highlighter marker stroke is drawn from left to right under the key phrase in a Japanese sentence, simple clean presentation style',
  },
  T14: {
    css: `/* JS：ランダムな文字に入れ替えながら、左から順に正しい文字に決める */
const step = (p) => el.textContent = [...target].map((c, i) => i < p * target.length ? c : chars[Math.random() * chars.length | 0]).join('');
// requestAnimationFrame で p を 0→1 に`,
    edit: 'After Effects：テキストアニメーターの「文字のオフセット」（または「文字の値」）を追加し、範囲セレクターの開始を 0→100% に動かすと、決まっていない文字がランダムに変わる',
    powerpoint: '標準機能ではできない。ランダムな文字のテキストを数枚重ね、画面切り替え「なし」で短く自動切り替えし、最後に正しい文字のスライド',
    prompt: 'Digital text scramble effect: random letters and numbers flicker rapidly and lock into place from left to right, revealing a project code',
  },
  T15: {
    css: `@keyframes bar { from { clip-path: inset(0 100% 0 0); } } @keyframes text { from { opacity: 0; transform: translateX(-10px); } }
.lower-third { animation: bar .6s cubic-bezier(.2,.8,.2,1) both; } .title { animation: text .4s .35s both; } .sub { animation: text .4s .5s both; }`,
    edit: 'Premiere Pro：「テキスト」パネル（またはグラフィックテンプレート）で帯と文字を作り、帯に「クロップ」の右にキー、文字の不透明度と位置にキー。After Effects なら帯のマスクと文字の位置',
    powerpoint: '帯の四角形に開始効果「ワイプ」（左から）、名前と場所のテキストに開始効果「フェード」を「直前の動作の後」で順に',
    prompt: 'A clean lower-third title bar slides in at the bottom left of an architecture video, showing the building name and location in Japanese',
  },
  T16: {
    css: `@keyframes grow { from { transform: scaleY(0); } }
.bar { height: var(--h); transform-origin: bottom; animation: grow .8s cubic-bezier(.2,.8,.2,1) both; animation-delay: calc(var(--i) * .15s); }`,
    edit: 'After Effects：棒ごとの長方形のスケールY（アンカーは下端）を 0→100% に、棒ごとに数フレームずつずらす。数値は「番号」エフェクトかテキストのソーステキストにキー',
    powerpoint: 'グラフ（棒グラフ）に開始効果「ワイプ」（下から）、効果のオプションの「連続」を「系列別」または「項目別」に',
    prompt: 'An animated bar chart of floor areas per level, bars grow upward one after another and their values appear, clean infographic style',
  },
  T17: {
    css: `/* SVG の円に pathLength="100" を付け、stroke-dasharray を 0 100 → 32 100 に */
.ring { fill: none; stroke-width: 10; stroke-linecap: round; stroke-dasharray: 32 100; transform: rotate(-90deg); animation: draw 1.6s cubic-bezier(.2,.7,.2,1) both; }
@keyframes draw { from { stroke-dasharray: 0 100; } }`,
    edit: 'After Effects：楕円のシェイプの線に「パスのトリミング」を追加し、終了を 0→32% に。中央の数字は「番号」エフェクト（またはソーステキストのエクスプレッション）で 0→32',
    powerpoint: '円グラフ（ドーナツ）に開始効果「ホイール」、または円弧（ブロック円弧）に開始効果「ホイール」。中央の数字は別のテキストで「フェード」',
    prompt: 'A donut ring chart fills to 32 percent with a smooth stroke animation while the number in the center counts up, green ratio for planting rate',
  },


  /* ---------- 環境の動き（v1.0-3）：建物とカメラは止め、環境だけを動かす ---------- */
  E01: {
    css: `/* 木ごとに周期をずらし、足元を中心に揺らす */
.tree { transform-origin: 50% 100%; animation: sway 1.2s ease-in-out infinite; }
.tree:nth-child(2) { animation-duration: .8s; }
@keyframes sway { 30% { transform: rotate(3.5deg); } 70% { transform: rotate(-2.5deg); } }`,
    edit: 'After Effects：木だけを切り抜いたレイヤー（またはマスク）に「タービュレントディスプレイス」をかけ、「展開」にエクスプレッション time*40 などで揺らす。幹の根元はピンで固定するか、パペットツールで揺らす',
    powerpoint: '木の画像（背景を削除して切り抜く）に強調「シーソー」をかけ、効果のオプション画面で「繰り返し：スライドの最後まで」。木ごとに継続時間を変えると自然に見える',
    cg: 'D5 Render：Environment > Weather の「Wind」をオンにし、Strength（強さ）と Direction（向き）を設定してから、動画モードでカメラのキーフレームを置いて書き出す（キーを置いたあとで変えた環境は、そのキーに入らない）／Lumion・Twinmotion：植栽の風（Wind）の強さを設定',
    prompt: 'Keep the camera locked and the building completely unchanged. Only the trees in the foreground sway gently in a light breeze, leaves rustling, natural and subtle motion, photorealistic architectural visualization',
  },
  E02: {
    css: `/* 映り込みを上下反転し、細かく横に揺らぐ */
.reflection { transform: scaleY(-1); transform-origin: top; animation: shimmer .6s ease-in-out infinite; }
@keyframes shimmer { 25% { transform: scaleY(-1) skewX(4deg); } 75% { transform: scaleY(-1) skewX(-4deg); } }`,
    edit: 'After Effects：水面の部分だけにマスクをかけ、「波形ワープ」（波形の高さを小さく、波形の速度を遅く）またはディスプレイスメントマップにフラクタルノイズを使って揺らす。きらめきは「コースティック」',
    powerpoint: '映り込みの画像（上下反転）に軌跡「直線（右へ）」を数pxだけ付け、「オートリバース」と「繰り返し：スライドの最後まで」。水面に細い白線の図形を重ね、強調「パルス」を「繰り返し：スライドの最後まで」で明滅',
    cg: 'D5 Render：水盤の面に Assets > Material > Water の水マテリアル（例：Blue pool water）を貼り、Normal で波の大きさ（最大5）、Flow Velocity で速さ（最大1）を調整。水盤に深さを付けて底を暗くし、水面を低い角度から見ると、映り込みの揺れで波が分かりやすい／Lumion・Twinmotion：水のマテリアル（または水面オブジェクト）の波の設定',
    prompt: 'Keep the camera locked and the building unchanged. The reflecting pool in front gently ripples, the mirrored facade wavers softly with small glints of light on the water, calm and elegant',
  },
  E03: {
    css: `/* 手前は速く、奥はゆっくり。上下に小さく弾ませて歩く感じに */
.person.near { animation: walk 6s linear infinite; }
.person.far { animation: walk 14s linear infinite reverse; }
@keyframes walk { from { transform: translateX(-20vw); } to { transform: translateX(120vw); } }`,
    edit: 'After Effects／Premiere Pro：歩く人の切り抜き素材（グリーンバックやアルファ付きのストック動画）を手前と奥に大きさを変えて合成し、奥ほど小さく・遅くする。足元に薄い影を付ける',
    powerpoint: '人のシルエット（図形または切り抜き画像）に軌跡「直線（右へ）」、奥の人には「直線（左へ）」。継続時間を手前は短く、奥は長くし、「滑らかに開始」「滑らかに終了」を0にして一定の速さで動かす',
    cg: 'D5 Render：ツールバーの Path > Character で歩かせたい線を引き、Content の＋から歩行アニメーション付きの人物を追加。Density（密度）と Speed で調整し、Road で一方向／双方向を切り替える／Lumion・Twinmotion：歩く人物を経路（パス）に沿って配置',
    prompt: 'Keep the camera locked and the building unchanged. People walk across the plaza in both directions at different distances and speeds, natural pedestrian flow, lively but calm, photorealistic',
  },
  E04: {
    css: `/* 雲と外壁の雲の影を、同じ向きにゆっくり流す */
.cloud { animation: drift 40s linear infinite; }
.cloud-shadow { animation: drift 40s linear infinite; mix-blend-mode: multiply; }
@keyframes drift { from { transform: translateX(-30%); } to { transform: translateX(130%); } }`,
    edit: 'After Effects：空をマスクで切り分け、雲の画像（または「フラクタルノイズ」で作った雲）の位置Xをゆっくり動かす。外壁には黒の柔らかい楕円を「乗算」で重ね、同じ速さで流すと雲の影になる',
    powerpoint: '空の部分に雲の画像を重ね、軌跡「直線（右へ）」を長い継続時間（20秒程度）で、「滑らかに開始」「滑らかに終了」を0に',
    cg: 'D5 Render：環境の「天気」（Weather）の「Cloud」で雲を表示し、Global Settings の Speed（速さ）・Direction（向き）で動かして動画にする／Lumion・Twinmotion：雲の速さ・量を設定',
    prompt: 'Keep the camera locked and the building unchanged. White clouds drift slowly across the blue sky and their soft shadows pass over the facade, calm time-lapse feeling',
  },
  E05: {
    css: `/* 光の斑ごとに周期を変え、明るさと位置を少し揺らす */
.spot { mix-blend-mode: screen; animation: flicker .8s ease-in-out infinite; }
.spot:nth-child(2n) { animation-duration: 1.2s; }
@keyframes flicker { 40% { opacity: .35; transform: translate(6%, -4%) scale(.9); } }`,
    edit: 'After Effects：床と壁に、葉の形の明るい模様（フラクタルノイズにしきい値やレベル補正をかけたもの）を「スクリーン」または「加算」で重ね、「展開」をゆっくり動かして明滅させる',
    powerpoint: 'ぼかした楕円（光の色、透過50%程度）をいくつか重ね、強調「パルス」を「繰り返し：スライドの最後まで」で。継続時間を楕円ごとに変える',
    cg: 'D5 Render：窓の外に揺れる木（Assets > Model > Nature、Filter で Dynamic）を置き、Geo Sky の時刻と North Offset（0〜180°）で日差しが窓から室内に入る向きにする（ビューポートで分かりにくいときは静止画を書き出して確かめる）。動画モード側でも時刻・North Offset を合わせ、Environment > Weather > Wind をオンにしてからキーフレームを置いて書き出す／Lumion・Twinmotion：太陽光と植栽の風',
    prompt: 'Keep the camera locked and the interior unchanged. Dappled sunlight filtering through trees outside flickers softly across the floor and wall as the leaves move in the breeze, warm and peaceful',
  },
  E06: {
    css: `/* 斜めの線の模様を下へ流す。地面の波紋は拡大しながら消す */
.rain { background: repeating-linear-gradient(105deg, transparent 0 14px, rgb(255 255 255 / .5) 14px 15px, transparent 15px 30px); animation: fall .3s linear infinite; }
@keyframes fall { to { background-position: -16px 60px; } }`,
    edit: 'After Effects：エフェクト「CC Rainfall」（Drops で量、Speed で速さ、Wind で傾き）を重ね、地面には小さな波紋の素材を合成。空と外観は「トーンカーブ」で暗く、彩度を少し下げる',
    powerpoint: '雨のストック動画を挿入し、再生タブで「停止するまで繰り返す」（動画には「透明色を指定」が使えないので、黒背景の動画はパースの上に重ねられない。パースと合成済みの動画を使う）。PowerPointの効果だけで雨を作るのは難しい',
    cg: 'D5 Render：Environment > Weather > Precipitation をオンにし、Rain／Snow のスライダーを Rain 側に。Strength（強さ）・Puddle（水たまり）・Raindrop Transparency で調整／Lumion・Twinmotion：天気の雨',
    prompt: 'Keep the camera locked and the building unchanged. Light rain falls diagonally, small ripples appear on the wet pavement, overcast sky, quiet and cinematic mood',
  },
  E07: {
    css: `/* 大きさの違う2層の雪を、違う速さで下へ流す */
.snow { background-image: radial-gradient(circle, #fff 0 2px, transparent 2.5px); background-size: 48px 48px; animation: snow 1.2s linear infinite; }
@keyframes snow { 50% { background-position: 5px 24px; } 100% { background-position: 0 48px; } }`,
    edit: 'After Effects：エフェクト「CC Snowfall」（雪の量・大きさ・速さ・揺れ）を、大きい雪と小さい雪の2つ重ねて奥行きを出す。地面と屋根は白く補正',
    powerpoint: '雪のストック動画を挿入し、再生タブで「停止するまで繰り返す」（背景を透過できないので、パースと合成済みの動画を使う）。図形で作るなら、白い小さな円に軌跡「直線（下へ）」を、円ごとに継続時間と開始を変える',
    cg: 'D5 Render：環境の「天気」（Weather）の「Precipitation」を雪（Snow）側にして降らせる（積雪の調整項目はないが、地形は白っぽくなる。建物の屋根や舗装を白く見せるのは別に作る）／Lumion・Twinmotion：天気の雪と積雪',
    prompt: 'Keep the camera locked and the building unchanged. Soft snow falls slowly in flakes of different sizes, swaying gently, a thin layer of snow on the ground, quiet winter atmosphere',
  },
  E08: {
    css: `/* 光の筋を道路に沿って流す。前照灯は白、尾灯は赤で逆向き */
.trail.head { background: linear-gradient(90deg, transparent, #fff8d6); animation: right .8s linear infinite; }
.trail.tail { background: linear-gradient(270deg, transparent, #ff463c); animation: right .6s linear infinite reverse; }
@keyframes right { from { transform: translateX(-160%); } to { transform: translateX(260%); } }`,
    edit: 'After Effects：車の動画（または光の点）に「エコー」をかけて光の尾を伸ばし、「グロー」でにじませる。ストック素材の光跡を「スクリーン」で道路に重ねてもよい',
    powerpoint: '道路の上に細い光の線（グラデーション）を置き、開始効果「ワイプ」（効果のオプション：左から）と終了効果「ワイプ」を「直前の動作の後」で続ける。赤い線は逆向き。繰り返し流すなら、スライドの切り替えを自動にし、スライドショーの設定で「Esc キーが押されるまで繰り返す」',
    cg: 'D5 Render：Path > Vehicle で道路に沿って十分な長さの線を引き（短い線では車が現れない）、Content の＋から車を追加（Speed で速さ、Specified の Light でライト）。動画モード側で時刻を夜にしてからキーフレームを置いて書き出す。光跡は書き出した動画に編集ソフトで「エコー」などを足す／Lumion・Twinmotion：車の経路（パス）',
    prompt: 'Keep the camera locked and the building unchanged. At night, cars pass along the road leaving long streaks of white headlights and red taillights, long exposure light trails, lit windows on the facade',
  },
  E09: {
    css: `/* 白いもやの帯を、ゆっくり左右に流す */
.mist { background: radial-gradient(ellipse at 30% 50%, rgb(255 255 255 / .9), transparent 60%); animation: mist 8s ease-in-out infinite alternate; }
@keyframes mist { to { transform: translateX(-12%); } }`,
    edit: 'After Effects：「フラクタルノイズ」で作った雲模様を地面近くの帯にマスクし、「スクリーン」で重ねて「展開」と位置Xをゆっくり動かす。奥ほど濃くすると奥行きが出る',
    powerpoint: 'ぼかした白い楕円（透過40〜60%）を地面近くに重ね、軌跡「直線（左へ）」を数十pxだけ、「オートリバース」と「繰り返し：スライドの最後まで」で',
    cg: 'D5 Render：Environment > Weather > Fog をオンにし Density を低くして1つ目のキーフレームを置く。次に Density を上げてから2つ目のキーフレームを置く（環境はキーを置いた時点の値が入る）。Height・Base Height・Start Distance で霧の高さを調整／Lumion・Twinmotion：霧（Fog）の設定',
    prompt: 'Keep the camera locked and the building unchanged. Low mist drifts slowly near the ground among the trees, the background softly appears and disappears, quiet early morning atmosphere',
  },
  E10: {
    css: `/* 樹冠の色を、若葉 → 深緑 → 紅葉 → 冬枯れへ */
.crown { animation: season 8s ease-in-out infinite; }
@keyframes season { 0% { background-color: #9cc96e; } 25% { background-color: #4f7f45; } 50% { background-color: #d0773a; } 75% { background-color: rgb(138 122 104 / .3); } }`,
    edit: 'After Effects：季節ごとの4枚のパース（または木の部分だけを「色相/彩度」で色替えしたもの）を不透明度のクロスフェードでつなぐ／Premiere Pro：4枚を「クロスディゾルブ」でつなぐ',
    powerpoint: '季節ごとの4枚のスライドを画面切り替え「フェード」でつなぐ（同じ位置の木の画像を使い、「変形」にしても可）',
    cg: 'D5 Render：環境の「Seasonal Vegetation」をオンにし、State を変えた視点を並べるか、動画のキーフレームで State を変えて葉の色を少しずつ変える（季節の変化に対応した植栽素材だけが変わる）／Lumion・Twinmotion：季節や葉の色の設定を変えた画像を並べる',
    prompt: 'Keep the camera locked and the building unchanged. Time-lapse of the trees around the building changing through the four seasons: fresh spring green, deep summer green, autumn orange, bare winter branches',
  },  E11: {
    css: `/* 花びらを、回しながら斜めに落とす（数枚の開始時刻をずらす） */
.petal { animation: petal 4s linear infinite; }
.petal:nth-child(2) { animation-delay: -1.3s; }
@keyframes petal { to { transform: translate(-40px, 220px) rotate(540deg); } }`,
    edit: 'After Effects：「CC Particle World」で花びら（または落ち葉）の画像を粒子にして、重力を弱く・風（Extra）を横向きに付けて舞わせる。手前と奥で2層に分けると奥行きが出る／Premiere Pro：花びらが舞う素材動画（黒背景）を上のトラックに置き、描画モード「スクリーン」で重ねる',
    powerpoint: '花びらの画像を数枚置き、アニメーションの軌跡「ユーザー設定パス」で斜め下へゆらゆら落ちる線を描く。強調「スピン」を「直前の動作と同時」で重ね、開始の遅延をずらして「繰り返し：スライドの最後まで」にする',
    cg: 'D5 Render：Particle（パーティクル）や Assets の舞う花びら・落ち葉の素材があれば置き、Wind をオンにしてから動画のキーを置く（ない場合は、編集ソフトで重ねる）／Lumion・Twinmotion：落ち葉・花びらのエフェクトや素材を置く',
    prompt: 'Keep the camera locked and the building unchanged. Cherry blossom petals drift down diagonally across the frame in a gentle breeze, rotating as they fall',
  },
  E12: {
    css: `/* 旗を根元（左端）から波打たせる */
.flag { transform-origin: 0 50%; animation: flutter .6s ease-in-out infinite; }
@keyframes flutter { 25% { transform: skewY(6deg) scaleX(.94); } 75% { transform: skewY(-5deg) scaleX(.97); } }`,
    edit: 'After Effects：旗やのぼり、日よけ布のレイヤーに「波形ワープ」（波形の高さ・波形の速度、ピン留め：左端）をかける。布の付け根を固定し、先ほど大きく揺らす／Premiere Pro：布の部分を切り抜いて「波形ワープ」をかける',
    powerpoint: '旗の画像に強調「シーソー」をかけ、効果のオプションで「繰り返し：スライドの最後まで」。揺れの中心は画像の中央になるため、旗の左端に透明な余白を足した画像にすると根元で揺れて見える',
    cg: 'D5 Render：Assets の旗・のぼり・布（Filter で Dynamic）を置き、Wind をオンにしてから動画のキーを置く（風の強さで揺れが変わる）／Lumion・Twinmotion：風で動く旗の素材を置き、風の強さを設定する',
    prompt: 'Keep the camera locked and the building unchanged. Flags and fabric awnings in front of the building flutter in a steady breeze',
  },
  E13: {
    css: `/* 湯気を、ふくらませながら上へ消す（数個の開始時刻をずらす） */
.puff { animation: puff 2s ease-out infinite; }
.puff:nth-child(2) { animation-delay: -.7s; }
@keyframes puff { from { opacity: .9; transform: scale(.6); } to { opacity: 0; transform: translate(18px, -70px) scale(2.6); } }`,
    edit: 'After Effects：排気口の位置に「CC Particle World」（粒子：ぼかした円、上向き、重力を負）か、「フラクタルノイズ」をマスクで切り抜いて上へ流し、描画モード「スクリーン」で重ねる／Premiere Pro：煙・湯気の素材動画（黒背景）を描画モード「スクリーン」で重ねる',
    powerpoint: '白いぼかした円の画像を排気口の上に置き、軌跡「直線（上へ）」と強調「拡大/収縮」、終了「フェード」を「直前の動作と同時」で重ね、数個の開始をずらして繰り返す',
    cg: 'D5 Render：Particle や煙・湯気の素材（Assets のエフェクト）があれば排気口に置く。ない場合は Fog（霧）を局所的には付けられないため、編集ソフトで重ねる／Lumion・Twinmotion：煙・蒸気のエフェクトを置く',
    prompt: 'Keep the camera locked and the building unchanged. Soft white steam rises slowly from the rooftop vent and fades into the sky',
  },
  E14: {
    css: `/* 水の弧を、わずかに伸び縮みさせる。しぶきは上がって消す */
.jet { transform-origin: 50% 100%; animation: jet .4s ease-in-out infinite; }
.splash { animation: splash .6s ease-out infinite; }
@keyframes jet { 50% { transform: scaleY(.9); } }
@keyframes splash { from { opacity: .9; } to { opacity: 0; transform: translateY(-12px) scale(.4); } }`,
    edit: 'After Effects：「CC Particle Systems II」（または CC Particle World）で、発生位置を噴水口、上向きの速さと重力を付けて水の弧を作り、水面に「CC Drizzle」で波紋を足す／Premiere Pro：噴水の素材動画を切り抜いて合成する',
    powerpoint: '水の弧の画像に強調「パルス」を「繰り返し：スライドの最後まで」でかけ、しぶきの小さな円に開始「ズーム」と終了「フェード」を繰り返す',
    cg: 'D5 Render：Assets の噴水（Filter で Dynamic）を置くか、Particle の水の素材を使う。水盤には Water マテリアルを貼り、深さと暗い底を付ける（波が見えやすい）／Lumion・Twinmotion：噴水のエフェクトを置き、高さ・量を設定する',
    prompt: 'Keep the camera locked and the building unchanged. The fountain in the plaza sprays arcs of water that splash softly into the basin',
  },
  E15: {
    css: `/* 人を周りから広場へ歩かせ、止まったら小さく揺らす */
.person { animation: gather 2.4s cubic-bezier(.3, .6, .3, 1) both; }
@keyframes gather { 0% { left: var(--start); } 80% { transform: translateY(-3%); } 100% { transform: none; } }`,
    edit: 'After Effects：切り抜いた人物の素材を、周りから広場へ歩かせ（位置のキーフレーム）、着いたら立ち止まって話す素材に切り替える。人数は奥ほど小さく、手前ほど大きく／Premiere Pro：人物の素材動画を切り抜いて重ねる',
    powerpoint: '人物の画像を広場の周りに置き、軌跡「直線」で広場の中央へ動かして「滑らかに終了」を大きく。着いた後に強調「シーソー」を小さくかける',
    cg: 'D5 Render：Path の人物（Character）でパスを広場へ向けて引き、終点で止まる人物と、その場で話す・立つ動きの人物（Assets の Filter で Dynamic）を置く／Lumion・Twinmotion：人物を配置し、立ち止まる人物と歩く人物を混ぜる',
    prompt: 'Keep the camera locked and the building unchanged. People walk in from the edges and gather in the plaza in front of the building, then stand and chat in small groups',
  },
  E16: {
    css: `/* 鳥を群れで横切らせ、羽を上下させる */
.bird { animation: fly 4s linear infinite; }
.bird::before, .bird::after { animation: wing .3s ease-in-out infinite; }
@keyframes fly { from { left: -10%; } to { left: 110%; top: 10%; } }
@keyframes wing { 50% { transform: rotate(-25deg); } }`,
    edit: 'After Effects：鳥が飛ぶ素材（または「CC Particle World」で V字の小さな画像を粒子にしたもの）を、空の部分に横切らせる。数羽の位置と高さをずらす／Premiere Pro：鳥が横切る素材動画を描画モード「乗算」で空に重ねる',
    powerpoint: '鳥の画像（または GIF アニメ）を数羽置き、軌跡「直線（右へ）」で画面の外まで動かす。開始の遅延を少しずつずらし、「繰り返し：スライドの最後まで」にする',
    cg: 'D5 Render：Assets の鳥の群れ（Filter で Dynamic）を空に置くか、Path に鳥の素材を使う。動画で羽ばたきが再生されるかを確かめる／Lumion・Twinmotion：鳥の群れのエフェクトを置く',
    prompt: 'Keep the camera locked and the building unchanged. A small flock of birds flies across the sky above the building from left to right, wings flapping',
  },
  E17: {
    css: `/* 窓の明かりを、ばらばらにまたたかせる。航空障害灯は点滅 */
.light { animation: twinkle .6s steps(2, end) infinite; }
.light:nth-child(3n) { animation-delay: -.2s; }
.beacon { animation: beacon 1.2s steps(1, end) infinite; }
@keyframes twinkle { 50% { opacity: .25; } }
@keyframes beacon { 50% { opacity: .15; } }`,
    edit: 'After Effects：夜景のパースに、窓の明かりだけのレイヤー（しきい値などで明るい部分を抜いたもの）を重ね、「ウィグラー」で不透明度をわずかに揺らす。航空障害灯は小さな赤い円の不透明度をキーフレームで点滅させ、「グロー」をかける／Premiere Pro：明かりのレイヤーの不透明度をキーフレームで揺らす',
    powerpoint: '明かりの小さな画像に強調「点滅」（または「透過性」をオートリバース）をかけ、開始をずらして「繰り返し：スライドの最後まで」にする',
    cg: 'D5 Render：動画モードで時刻を夜にし、窓の Emissive（発光）マテリアルと周りの街の明かりを置く。またたきは編集ソフトで足す（D5 の発光は時間で変えられない場合がある）／Lumion・Twinmotion：夜の設定で発光マテリアルを使い、明滅は編集ソフトで足す',
    prompt: 'Keep the camera locked and the building unchanged. Night city skyline; scattered window lights twinkle softly and red aviation lights blink on the rooftops',
  },
  E18: {
    css: `/* 水たまりの映り込みを揺らし、波紋を時々広げる */
.reflection { animation: shimmer .8s ease-in-out infinite; }
.ripple { animation: ripple 1.2s ease-out infinite; }
@keyframes shimmer { 25% { transform: skewX(4deg) scaleY(.97); } 75% { transform: skewX(-4deg) scaleY(1.02); } }
@keyframes ripple { from { opacity: .9; transform: scale(.2); } to { opacity: 0; transform: scale(1.4); } }`,
    edit: 'After Effects：地面に、上下反転した建物のレイヤーを不透明度を下げて重ね（映り込み）、水たまりの形のマスクで切り抜いて「波形ワープ」を弱くかける。しずくは「CC Drizzle」で波紋を足す／Premiere Pro：映り込みのレイヤーを反転して重ね、マスクで切り抜く',
    powerpoint: '上下反転した建物の画像を地面に重ねて透明度を上げ、水たまりの形にトリミングする。波紋は円の図形に開始「ズーム」と終了「フェード」を「直前の動作と同時」で繰り返す',
    cg: 'D5 Render：天気を雨上がりにし（Weather の Wet・Puddle の項目があれば使う）、地面を濡れた素材にして水たまりの Water マテリアルを置く。映り込みはリアルタイムで出る。波紋は Rain を弱くすると出る場合がある／Lumion・Twinmotion：濡れた地面（Wetness・Puddles）の設定を使う',
    prompt: 'Keep the camera locked and the building unchanged. After the rain: the wet pavement reflects the building, and occasional drops make small ripples in the puddles',
  },
  E19: {
    css: `/* ガラス面に映した空の画像を、横へ流す（向きは方向の切り替えで逆に） */
.pane { background-image: url(sky.jpg); background-size: 400% 300%; animation: glass 8s linear infinite; }
@keyframes glass { to { background-position: 40% 0; } }`,
    edit: 'After Effects：ガラス面の形のマスク（またはトラックマット）の中に、空と雲の画像を置いて位置を横へゆっくり動かし、描画モード「スクリーン」や不透明度を下げて重ねる。マリオンの線は上のレイヤーに残す／Premiere Pro：空の素材を「トラックマットキー」でガラスの形に切り抜き、位置を動かす',
    powerpoint: '空と雲の画像をガラス面の形にトリミングして建物の画像の上に置き、透明度を上げる。軌跡「直線（左／右）」でゆっくり動かすと、窓枠から外れるので、窓枠の画像を一番上に重ねる',
    cg: 'D5 Render：ガラスの外装は反射でそのまま空を映すため、動画モードで空（HDRI の回転、または雲の動き）を動かすと映り込みも流れる。ガラスのマテリアルの反射の強さを上げる／Lumion・Twinmotion：空の雲の動き（Cloud speed など）を付け、ガラスの反射を上げる',
    prompt: 'Keep the camera locked and the building unchanged. Clouds drift slowly across the reflective glass curtain wall, mirroring the moving sky',
  },
  E20: {
    css: `/* エレベーターのかごを上げ、エスカレーターの人を斜めに上げる */
.car { animation: car 6s cubic-bezier(.45, 0, .3, 1) infinite alternate; }
.rider { animation: ride 6s linear infinite; }
@keyframes car { to { transform: translateY(-260%); } }
@keyframes ride { from { transform: translate(-100%, 45%); } to { transform: translate(100%, -45%); } }`,
    edit: 'After Effects：吹抜けのパースに、エレベーターのかごのレイヤーを置いて位置（縦）をキーフレームで動かし（イージーイーズ）、シャフトの形のマスクで切り抜く。エスカレーターの人物は、斜めの線に沿って位置を動かす／Premiere Pro：かごと人物のレイヤーを重ね、位置をキーフレームで動かす',
    powerpoint: 'かごの画像に軌跡「直線（上へ）」をかけ、「滑らかに開始／終了」を付ける。エスカレーターの人物には軌跡「ユーザー設定パス」で斜めの線を描き、開始をずらして繰り返す',
    cg: 'D5 Render：エレベーターのかごをモデルとして置き、動画の「Animation」（物体のアニメーション）で位置を上下させる。エスカレーターは Path の人物をエスカレーターの斜面に沿って引く（または Assets のエスカレーターの素材）／Lumion・Twinmotion：物体を動かす機能（Move・Animation）でかごを動かし、人物のパスを斜面に引く',
    prompt: 'Keep the camera locked and the building unchanged. Inside the glass atrium, an elevator car glides upward while people ride the escalator to the upper floor',
  },

}

/** 再現情報が欠けている見本の番号を返す（開発時の確認用） */
export const missingRecipes = (numbers: string[]) => numbers.filter((number) => !recipes[number])

/** 道具ごとの表示名。カードの印と再現情報の見出しに使う */
export const recipeTools: { key: keyof Recipe, label: string, short: string }[] = [
  { key: 'css', label: 'Web（CSS）', short: 'CSS' },
  { key: 'edit', label: 'Premiere Pro／After Effects', short: '編集' },
  { key: 'powerpoint', label: 'PowerPoint', short: 'PPT' },
  { key: 'cg', label: '建築CG（SketchUp／D5 Render／Lumion／Twinmotion／Enscape）', short: 'CG' },
  { key: 'prompt', label: '生成AI向けの指示文（英語）', short: 'AI' },
]
