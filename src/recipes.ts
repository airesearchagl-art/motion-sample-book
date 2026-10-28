/**
 * 再現情報（v0.5「使う」）。見本の番号ごとに、別の道具で同じ動きを作るための手がかりを持つ。
 *
 * - css:        Webで作るときの短いコード例（作れないものは省略）
 * - edit:       Premiere Pro／After Effectsでの呼び方・主な操作
 * - powerpoint: PowerPointで近いアニメーション（開始効果／強調／画面切り替え）
 * - cg:         SketchUp／Lumion／Twinmotion／Enscapeなど建築CGでの作り方（関係するものだけ）
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
    powerpoint: '強調「拡大/収縮」（サイズ 110%程度、スムーズ終了）',
    prompt: 'A thumbnail image smoothly scales up by about 10 percent when hovered, subtle and clean UI motion',
  },
  '03': {
    css: `.button { box-shadow: 0 8px 0 #c4b9a6; transition: transform .1s, box-shadow .1s; }
.button:active { transform: translateY(7px); box-shadow: 0 1px 0 #c4b9a6; }`,
    edit: 'After Effects：位置Yを数px下げ、影を縮める短い2キー（0.1秒）',
    powerpoint: '強調「拡大/収縮」95%＋自動で元に戻す。または軌跡で数pxだけ下へ',
    prompt: 'A physical-looking button is pressed down, sinking a few pixels as its bottom shadow shrinks, tactile UI feedback',
  },
  '04': {
    css: `@keyframes bounce { 40% { transform: translateY(-16px) scale(1.04,.96); } 68% { transform: translateY(3px); } }
.icon.done { animation: bounce .65s ease; }`,
    edit: 'After Effects：位置Yのオーバーシュート（エクスプレッション bounce／「弾み」）',
    powerpoint: '開始効果「バウンド」、または強調「シーソー」を弱めに',
    prompt: 'A small icon pops and bounces once with a playful squash and stretch, celebrating a completed action',
  },
  '05': {
    css: `@keyframes shake { 20%,60% { transform: translateX(-8px); } 40%,80% { transform: translateX(8px); } }
.field.error { animation: shake .5s ease; }`,
    edit: 'After Effects：位置Xを左右に4往復（ウィグラーや wiggle() でも可）',
    powerpoint: '強調「シーソー」、または「アニメーションの軌跡（左右）」を自動で戻す・繰り返し2回',
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
    powerpoint: '斜めの白い半透明図形を「アニメーションの軌跡（右へ）」で横切らせ、図形内でトリミング',
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
    edit: 'Premiere Pro：スケールと位置にキーフレーム（またはエフェクト「ゆっくりズーム」系のプリセット）／After Effects：スケール100→115%と位置',
    powerpoint: '画像に強調「拡大/収縮」（110〜115%、時間を長く）＋「アニメーションの軌跡（少し斜め）」',
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

  /* ---------- 動画・カメラ ---------- */
  V01: {
    css: '/* 切り替え時に、次の画面を0秒で表示するだけ */\n.scene-b { opacity: 0; } .scene-b.is-active { opacity: 1; }',
    edit: 'Premiere Pro：トランジションを入れない「カット編集」。リズムよく切るなら「Jカット／Lカット」も',
    powerpoint: '画面切り替え「カット」（または「なし」）',
    cg: 'Lumion／Twinmotion：別々のカメラクリップをムービー編集でつなぐ（トランジションなし）',
    prompt: 'A hard cut between two architectural shots, no transition, crisp editorial pacing',
  },
  V02: {
    css: `.scene-a { transition: opacity 1.5s; } .scene-b { opacity: 0; transition: opacity 1.5s; }
.is-next .scene-a { opacity: 0; } .is-next .scene-b { opacity: 1; }`,
    edit: 'Premiere Pro：トランジション「クロスディゾルブ」（黒を挟むなら「ディップ（黒）」）',
    powerpoint: '画面切り替え「フェード」（効果のオプション：スムーズ）',
    cg: 'Lumion／Twinmotion：クリップ間のトランジション「フェード」',
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
    cg: 'Lumion／Twinmotion：カメラの「画角（焦点距離）」をキーフレームで変える',
    prompt: 'Slow optical zoom in toward the main entrance of a modern building, focal length change, static camera position',
  },
  V05: {
    css: `@keyframes pan { to { transform: translateX(-42%); } }
.panorama { width: 175%; animation: pan 2.2s ease-in-out both; }`,
    edit: 'After Effects：3Dカメラの「Yの回転（方向）」、または画像の位置Xを動かす',
    powerpoint: '横長画像に「アニメーションの軌跡（左へ）」、または画面切り替え「パン」',
    cg: 'SketchUp：シーン間でカメラの向きだけ変える／Lumion・Twinmotion：同じ位置で向きだけを変えた2キー',
    prompt: 'A slow horizontal camera pan across a building facade and its surrounding plaza, steady tripod movement',
  },
  V06: {
    css: `@keyframes tilt { to { transform: translateY(0); } }
.tall-shot { height: 175%; transform: translateY(-43%); animation: tilt 2.2s ease-in-out both; }`,
    edit: 'After Effects：3Dカメラの「Xの回転」（チルトアップ）、または縦長画像の位置Y',
    powerpoint: '縦長画像に「アニメーションの軌跡（下へ）」で、下から上へ見上げる',
    cg: 'SketchUp／Lumion／Twinmotion：同じ位置で、視線を地上から上層部へ上げた2キー',
    prompt: 'Camera tilts up slowly from the street level to the top of a high-rise tower, emphasizing height and scale',
  },
  V07: {
    css: `/* 手前ほど大きく拡大させ、奥行きの差を出す */
.near { animation: grow 2.2s both; --to: 2.4; } .subject { --to: 1.45; } .far { --to: 1.1; }
@keyframes grow { to { transform: scale(var(--to)); } }`,
    edit: 'After Effects：3Dカメラを前進（Z位置）。ズーム（スケール）と違い、手前と奥の見え方が変わる',
    powerpoint: '前景・被写体・背景を別画像にして、手前ほど大きく「拡大/収縮」させる',
    cg: 'Lumion／Twinmotion／Enscape：カメラ位置を前進させたキーフレーム（画角は固定）',
    prompt: 'Smooth dolly-in camera move through foreground columns toward a building entrance, strong parallax, cinematic',
  },
  V08: {
    css: `.stage { perspective: 640px; } .cube { transform-style: preserve-3d; animation: orbit 2.2s ease-in-out both; }
@keyframes orbit { from { transform: rotateY(-28deg); } to { transform: rotateY(-118deg); } }`,
    edit: 'After Effects：3Dカメラの「軌道（オービット）」ツール、またはヌルを親にしてY回転',
    powerpoint: '画面切り替え「軌道」、または角度違いの画像を「変形」でつなぐ',
    cg: 'SketchUp：建物を中心に角度を変えたシーンを複数作る／Lumion・Twinmotion：「オービット」系のカメラパス',
    prompt: 'Slow aerial orbit around a contemporary building at golden hour, revealing all facades, smooth and level',
  },
  V09: {
    css: `/* 層ごとに移動量を変える（手前ほど速い） */
.far { animation: slide 2.2s both; --to: -8%; } .mid { --to: -20%; } .near { --to: -42%; }
@keyframes slide { to { transform: translateX(var(--to)); } }`,
    edit: 'After Effects：3Dカメラの「トラックXY」ツールで横移動。パン（向きだけ）と違い視差が出る',
    powerpoint: '前景・中景・背景を別画像にし、移動量を変えた「アニメーションの軌跡（左へ）」を同時に',
    cg: 'Lumion／Twinmotion：カメラを建物と平行に横移動させたキーフレーム',
    prompt: 'Camera trucks sideways along a street facade with columns passing in the foreground, layered parallax',
  },
  V10: {
    css: `.near { animation: blur-out 2.2s both; } .far { filter: blur(6px); animation: focus-in 2.2s both; }
@keyframes blur-out { to { filter: blur(7px); } } @keyframes focus-in { to { filter: blur(0); } }`,
    edit: 'After Effects：3Dカメラの被写界深度をオンにし「フォーカス距離」をキーフレーム／Premiere Pro：「ブラー（ガウス）」を2層で入れ替え',
    powerpoint: 'ぼかし加工した画像とシャープな画像を重ね、「フェード」で入れ替える（図の書式「アート効果：ぼかし」）',
    cg: 'Lumion：エフェクト「被写界深度」の焦点距離をキー／Twinmotion：「被写界深度」のフォーカス',
    prompt: 'Rack focus from a blurred material sample in the foreground to the building interior in the background, shallow depth of field',
  },
  V11: {
    edit: 'After Effects：外観の画像にマスクを付け、切断線と一緒にマスクパスを左→右へ動かす',
    powerpoint: '断面図の上に外観図を重ね、外観図に終了効果「ワイプ（左から）」＋赤い切断線を「アニメーションの軌跡」で同時に',
    cg: 'SketchUp：「断面平面」を置き、位置を変えたシーンでアニメーション／Enscape・Twinmotion：「断面（クリッピング平面）」の位置をキー',
    prompt: 'An animated section cut sweeps across a multi-story building, slicing away the facade to reveal floors, rooms and stairs inside, clean architectural diagram style',
  },
  V12: {
    edit: 'After Effects：昼と夜の2枚の外観を不透明度で重ね、窓の明かりをレイヤーごとに時間差で点灯',
    powerpoint: '昼の画像に夜の画像を「フェード」で重ね、窓の光の図形を「アピール」で順に表示（遅延をずらす）',
    cg: 'Lumion／Twinmotion：「時刻（太陽の位置）」をキーフレームで夕方→夜へ。照明は「夜だけ点灯」設定／SketchUp：影の設定の時刻をシーンごとに変える',
    prompt: 'Time-lapse of a building facade from late afternoon to night, the sky deepens to dusk while interior lights switch on window by window',
  },

  V13: {
    css: `/* 影を建物の中心で回し、朝夕は長く・昼は短くする */
.shadow { transform-origin: 50% 0; animation: sun 2.2s ease-in-out both; }
@keyframes sun { 0% { transform: rotate(-70deg) scaleY(1.6); } 50% { transform: rotate(0) scaleY(.6); } 100% { transform: rotate(70deg) scaleY(1.6); } }`,
    edit: 'After Effects：影のシェイプを建物の足元を中心に回転させ、スケールで長さを変える（太陽のアイコンを円弧のパスで動かす）',
    powerpoint: '時刻ごとの日影図を並べ、画面切り替え「変形」でつなぐ（影の図形を同じ名前にしておくと滑らかに回る）',
    cg: 'SketchUp：「影」パネルで日付と時刻を設定し、時刻を変えたシーンを並べてアニメーション／Lumion・Twinmotion：太陽の「時刻」をキーフレーム',
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
    cg: 'SketchUp：上面図のシーンと、壁を押し出した（プッシュ／プル）アイソメのシーンを用意してアニメーション。押し出し途中の段階をシーンで刻むと滑らか',
    prompt: 'A flat architectural floor plan tilts into an isometric view and its walls extrude upward into a 3D model, clean white diagram style',
  },
  V15: {
    css: `.axo { transform-style: preserve-3d; transform: rotateX(58deg) rotateZ(-45deg); }
.layer { animation: explode 2.2s ease-in-out both; }
@keyframes explode { 50% { transform: translateZ(calc(var(--i) * 46px)); } }`,
    edit: 'After Effects：各階を3Dレイヤーにし、Z位置を階ごとに離してから戻す（ヌルを親にして全体をアイソメ角度に）',
    powerpoint: '各階の図形を「アニメーションの軌跡（上へ）」で階ごとに距離を変えて同時に動かし、「自動で元に戻す」を有効にする',
    cg: 'SketchUp：各階をグループにし、上下に離したシーンと重ねたシーンを作る（分解アクソメ）／Twinmotion：オブジェクトの「アニメーター（移動）」',
    prompt: 'Exploded axonometric animation of a building: roof, floor slabs and foundation separate vertically and then reassemble, minimal diagram',
  },
  V16: {
    css: `/* 層ごとに下へ流す量を変えて、上昇感を出す */
.near { animation: up 2.2s both; --to: 70%; } .building { --to: 22%; } .skyline { --to: 6%; }
@keyframes up { to { transform: translateY(var(--to)); } }`,
    edit: 'After Effects：3DカメラのY位置を上げる（「カメラ：トラックY」）。手前の木を別レイヤーにすると視差が出る',
    powerpoint: '手前・建物・背景を別画像にし、手前ほど大きく「アニメーションの軌跡（下へ）」で動かす',
    cg: 'Lumion／Twinmotion／Enscape：カメラの高さを上げたキーフレーム（視線は建物に向けたまま）／SketchUp：視点の高さを変えたシーン',
    prompt: 'Crane shot rising from eye level over foreground trees to reveal a building and the city skyline behind it, smooth vertical movement',
  },
  V17: {
    css: `/* 寄りの状態から等倍へ。origin を見せたいディテールに合わせる */
.scene { transform-origin: 62% 38%; animation: pull 2.2s cubic-bezier(.3,0,.2,1) both; }
@keyframes pull { from { transform: scale(3.5); } to { transform: scale(1); } }`,
    edit: 'After Effects：3Dカメラを後退（Z位置）、または高解像度の全景をスケール350→100%（アンカーポイントをディテールに）',
    powerpoint: '全景の画像に強調「拡大/収縮」の逆（大きい状態から100%へ）、または寄りと引きの2枚を「変形」でつなぐ',
    cg: 'Lumion／Twinmotion：ディテールに寄ったカメラから、建物全体が入る位置まで後退するキーフレーム',
    prompt: 'Camera pulls back from a close-up of a facade material detail to reveal the entire building and its surroundings, slow and cinematic',
  },
  V18: {
    css: `/* 開口の枠は大きく拡大して画面外へ、内部はゆっくり近づく */
.frame { animation: pass 2.2s both; } .interior { animation: enter 2.2s both; }
@keyframes pass { to { transform: scale(6); opacity: 0; } } @keyframes enter { to { transform: scale(1.5); } }`,
    edit: 'After Effects：3Dカメラを開口に向けて前進。入口の枠を手前のレイヤーにすると「抜ける」感じが出る',
    powerpoint: '外観と内観を画面切り替え「ズーム」系（または「フライスルー」）でつなぐ。開口の位置を合わせると自然',
    cg: 'Lumion／Twinmotion／Enscape：入口の外から開口を通り、室内まで進むカメラパス（ドアは開けておく）／SketchUp：歩行ツールの視点でシーンを並べる',
    prompt: 'Smooth fly-through camera move passing through the main entrance opening into a bright double-height lobby, architectural walkthrough',
  },
  V19: {
    css: `/* SVGの線を描いてから、色の層をフェードで重ねる */
.line path { stroke-dasharray: 1; stroke-dashoffset: 1; animation: draw 1.1s ease forwards; }
@keyframes draw { to { stroke-dashoffset: 0; } }
.render { opacity: 0; animation: show .9s 1.1s forwards; } @keyframes show { to { opacity: 1; } }`,
    edit: 'After Effects：線画に「線（ストローク）」エフェクトまたは「パスのトリミング」で描画し、レンダー画像を不透明度で重ねる／Premiere Pro：線画とレンダーを「クロスディゾルブ」',
    powerpoint: '線画に開始効果「ワイプ」または「スケッチ」系の描画、続けてレンダー画像を開始効果「フェード」',
    cg: 'SketchUp：スタイルを「線画（スケッチ風エッジ）」と「陰影付きテクスチャ」で切り替えたシーンをつなぐ（スタイルのフェードで溶ける）／Lumion：「スケッチ」エフェクトの強さをキー',
    prompt: 'A hand-drawn architectural line sketch of a house draws itself and then dissolves into a fully colored photorealistic rendering',
  },
  V20: {
    css: `/* 上下にぼかしの帯を重ね、彩度を少し上げる */
.city { filter: saturate(1.3); }
.blur-top, .blur-bottom { backdrop-filter: blur(6px); mask-image: linear-gradient(to bottom, #000, transparent); }`,
    edit: 'After Effects：「ブラー（カメラレンズ）」をグラデーションのマップで上下だけに。彩度を上げ、再生速度を少し速めると模型らしくなる',
    powerpoint: '同じ画像を2枚重ね、上の画像に「アート効果：ぼかし」をかけて中央だけトリミング（透明のグラデーション）',
    cg: 'Lumion：エフェクト「ティルトシフト（ミニチュア）」／Twinmotion：被写界深度を強め、高い位置からの俯瞰カメラ',
    prompt: 'High-angle tilt-shift shot of a city block with blurred top and bottom edges and saturated colors, looking like a miniature architectural model',
  },

  /* ---------- 文字 ---------- */
  T01: {
    css: `@keyframes fade-in { from { opacity: 0; transform: translateY(.25em); filter: blur(6px); } }
.title { animation: fade-in 1.7s ease both; }`,
    edit: 'After Effects：プリセット「フェードアップ」系、または不透明度＋ブラー（ガウス）／Premiere Pro：エッセンシャルグラフィックスで不透明度キー',
    powerpoint: '開始効果「フェード」（ぼかしは画像化して重ねる）',
    prompt: 'A title fades in softly from a slight blur, calm and elegant typography for an architectural film',
  },
  T02: {
    css: `.char { opacity: 0; animation: show .01s steps(1) both; animation-delay: calc(var(--i) * .18s); }
@keyframes show { to { opacity: 1; } }`,
    edit: 'After Effects：テキストアニメーター（不透明度0＋範囲セレクター）、またはプリセット「タイプライター」',
    powerpoint: '開始効果「アピール」＋効果のオプション「テキストの送り：文字単位」（文字間の遅延を設定）',
    prompt: 'Text appears letter by letter like a typewriter with a blinking cursor, minimal and clear',
  },
  T03: {
    css: `.char { display: inline-block; animation: rise .55s cubic-bezier(.2,.8,.2,1) both; animation-delay: calc(var(--i) * .1s); }
@keyframes rise { from { opacity: 0; transform: translateY(.9em); } }`,
    edit: 'After Effects：テキストアニメーター（位置Y＋不透明度）で範囲セレクターのオフセットをキー（文字ごとに時間差）',
    powerpoint: '開始効果「フロートイン」＋テキストの送り「文字単位」',
    prompt: 'Letters of a title rise into place one after another with a smooth staggered rhythm',
  },
  T04: {
    css: `.char { display: inline-block; animation: assemble 1.6s cubic-bezier(.2,.8,.2,1) both; }
@keyframes assemble { from { opacity: .35; transform: translate(var(--x), var(--y)) rotate(var(--r)); } }`,
    edit: 'After Effects：テキストアニメーター（位置・回転のウィグリー）を収束させる、プリセット「集合」系',
    powerpoint: '開始効果「スライドイン（各方向）」を文字ごとに設定、または「変形」でばらばらの文字から整列へ',
    prompt: 'Scattered letters fly in from different directions and assemble into a brand name, dynamic opening title',
  },
  T05: {
    css: `.mask { overflow: hidden; } .mask .line { animation: up 1.1s cubic-bezier(.7,0,.2,1) both; }
@keyframes up { from { transform: translateY(115%); } }`,
    edit: 'After Effects：トラックマット（アルファ）で文字を枠の下から上へ／Premiere Pro：「クロップ」＋位置',
    powerpoint: '開始効果「ワイプ（下から）」、または「フロートイン」をテキストボックス内でトリミング',
    prompt: 'A chapter title slides up from behind an invisible line with a thin accent rule, refined editorial motion',
  },
}

/** 再現情報が欠けている見本の番号を返す（開発時の確認用） */
export const missingRecipes = (numbers: string[]) => numbers.filter((number) => !recipes[number])

/** 道具ごとの表示名。カードの印と再現情報の見出しに使う */
export const recipeTools: { key: keyof Recipe, label: string, short: string }[] = [
  { key: 'css', label: 'Web（CSS）', short: 'CSS' },
  { key: 'edit', label: 'Premiere Pro／After Effects', short: '編集' },
  { key: 'powerpoint', label: 'PowerPoint', short: 'PPT' },
  { key: 'cg', label: '建築CG（SketchUp／Lumion／Twinmotion／Enscape）', short: 'CG' },
  { key: 'prompt', label: '生成AI向けの指示文（英語）', short: 'AI' },
]
