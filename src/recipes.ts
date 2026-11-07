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
