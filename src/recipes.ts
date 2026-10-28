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
