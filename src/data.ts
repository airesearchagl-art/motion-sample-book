/**
 * 見本と設定の共通データ。
 * 見本帳（main.ts）と使い方ページ（guide.ts）の両方から読み込み、
 * 件数や「強さ」「向き」が効く見本の一覧が、ページ間で食い違わないようにする。
 */

export type MotionCategory = 'quiet' | 'dynamic' | 'decorative'

/** すべての見本が共通で持つメタデータ（v0.3で共通形式に統一） */
export type Sample = {
  id: string
  number: string
  name: string
  english: string
  description: string
  categoryLabel: string
  /** 向いている場所・場面 */
  hint: string
  /** 避けたい場面 */
  avoid: string
  /** 感覚語（v0.4）。名前を知らなくても、印象の言葉から探せるようにする */
  feel: string[]
}

export type MotionSample = Sample & { category: MotionCategory }

export const samples: MotionSample[] = [
  { id: 'float', number: '01', name: 'ふわっと浮く', english: 'Float', description: '位置と影を少し動かし、選べる要素だと伝える。', category: 'quiet', categoryLabel: '静か', hint: 'カード・リンク', avoid: '押せない要素', feel: ['ふわっと', '軽い', '上品'] },
  { id: 'scale', number: '02', name: '大きくなる', english: 'Scale up', description: '要素をわずかに拡大して、注目を集める。', category: 'quiet', categoryLabel: '静か', hint: '画像・アイコン', avoid: '密に並んだ一覧', feel: ['注目させる', '控えめ', '親しみ'] },
  { id: 'press', number: '03', name: '押し込まれる', english: 'Press', description: '沈み込みで、押した感触を返す。', category: 'quiet', categoryLabel: '静か', hint: 'ボタン', avoid: '文中のリンク', feel: ['手応え', '確か', '控えめ'] },
  { id: 'bounce', number: '04', name: 'ぷるっと弾む', english: 'Bounce', description: '小さな弾みで、楽しさや完了感を出す。', category: 'dynamic', categoryLabel: 'はっきり', hint: '完了・リアクション', avoid: 'エラー・真面目な通知', feel: ['楽しい', '弾む', '勢いがある'] },
  { id: 'shake', number: '05', name: '左右に揺れる', english: 'Shake', description: '左右の反復で、注意やエラーを知らせる。', category: 'dynamic', categoryLabel: 'はっきり', hint: '警告・入力ミス', avoid: '成功・完了の通知', feel: ['注意', '焦り', '勢いがある'] },
  { id: 'tilt', number: '06', name: '少し傾く', english: 'Tilt', description: '角度と奥行きを加えて、遊びのある反応にする。', category: 'dynamic', categoryLabel: 'はっきり', hint: 'カード・作品', avoid: '文字中心の情報カード', feel: ['遊び心', '奥行き', '立体的'] },
  { id: 'underline', number: '07', name: '下線が伸びる', english: 'Underline reveal', description: '文字を動かさず、選択状態を端的に示す。', category: 'decorative', categoryLabel: '装飾', hint: 'ナビゲーション', avoid: 'ボタン', feel: ['上品', 'すっきり', '控えめ'] },
  { id: 'fill', number: '08', name: '背景色が広がる', english: 'Background fill', description: '面が横に満ちる動きで、操作を強く誘導する。', category: 'decorative', categoryLabel: '装飾', hint: '主要ボタン', avoid: '補助的なリンク', feel: ['力強い', '誘導', 'はっきり'] },
  { id: 'shine', number: '09', name: '光が横切る', english: 'Shine', description: '光沢の移動で、特別感や新しさを表現する。', category: 'decorative', categoryLabel: '装飾', hint: 'おすすめ・新着', avoid: '常に並ぶ通常要素', feel: ['高級感', '特別', 'きらっと'] },
  { id: 'ripple', number: '10', name: '波紋が広がる', english: 'Ripple', description: '触れた位置から広がる印象で、入力を確認させる。', category: 'dynamic', categoryLabel: 'はっきり', hint: 'タップ操作', avoid: '静かな読み物画面', feel: ['手応え', '広がる', 'やわらかい'] },
  // 見本の倍増（建築寄り）
  { id: 'beforeafter', number: '11', name: '前後比較スライダー', english: 'Before / after slider', description: '境界のつまみを動かして、2枚の画像を左右で見比べる。', category: 'dynamic', categoryLabel: 'はっきり', hint: '改修前後・昼夜・A案B案', avoid: '違いが小さい2枚', feel: ['比べる', '分かりやすい', '変化'] },
  { id: 'clipreveal', number: '12', name: '画像のクリップ表示', english: 'Clip reveal', description: '画像が帯状の枠から広がり、少し引きながら現れる。', category: 'quiet', categoryLabel: '静か', hint: '作品写真・トップ画像の登場', avoid: '何度も出入りする画像', feel: ['上品', '高級感', 'すっきり'] },
  { id: 'parallax', number: '13', name: '視差（パララックス）', english: 'Parallax', description: '手前と奥の層がずれて動き、写真に奥行きが出る。', category: 'decorative', categoryLabel: '装飾', hint: '外観写真・ページの見出し', avoid: '文字を読ませる部分', feel: ['奥行き', '立体的', '没入'] },
  { id: 'kenburns', number: '14', name: 'ゆっくり拡大（ケン・バーンズ）', english: 'Ken Burns', description: '写真がゆっくり寄りながら少し流れ、静止画に動きを与える。', category: 'quiet', categoryLabel: '静か', hint: '外観写真・スライドの背景', avoid: '細部を読ませたい図面', feel: ['落ち着いた', '余韻', 'しっとり'] },
  { id: 'expand', number: '15', name: '詳細へ拡大', english: 'Expand to detail', description: '一覧のサムネイルがそのまま広がり、詳細の画面になる。', category: 'dynamic', categoryLabel: 'はっきり', hint: '作品一覧から詳細ページへ', avoid: '一覧の中で完結する情報', feel: ['つながり', '引き込む', '滑らか'] },
  { id: 'flip', number: '16', name: 'カードの裏返し', english: 'Card flip', description: 'カードが回転して裏面を見せる。表と裏で情報を切り替える。', category: 'dynamic', categoryLabel: 'はっきり', hint: '外観と平面図・案の表裏', avoid: '両面を同時に見比べたい情報', feel: ['遊び心', '切り替え', '立体的'] },
  { id: 'curtain', number: '17', name: 'カーテン遷移', english: 'Curtain transition', description: '幕が下から上がって画面を覆い、次の画面に替わる。', category: 'decorative', categoryLabel: '装飾', hint: 'ページ切り替え・章の区切り', avoid: '頻繁な画面の行き来', feel: ['区切り', '演出', 'はっきり'] },
  { id: 'gridreflow', number: '18', name: 'グリッドの並び替え', english: 'Grid reflow', description: '絞り込むと、外れた画像が消え、残りが滑らかに詰まる。', category: 'quiet', categoryLabel: '静か', hint: '作品の用途別フィルター', avoid: '並び順に意味がある一覧', feel: ['整理', '滑らか', '分かりやすい'] },
  { id: 'hscroll', number: '19', name: '横スクロール', english: 'Horizontal scroll', description: '縦にスクロールすると、パネルが横に流れていく。', category: 'decorative', categoryLabel: '装飾', hint: '作品の連続表示・工程の時系列', avoid: '長い文章', feel: ['流れ', '連続', '軽快'] },
  { id: 'pindrop', number: '20', name: 'ピンが落ちる', english: 'Pin drop', description: '地図の上にマーカーが弾んで刺さり、位置を示す。', category: 'dynamic', categoryLabel: 'はっきり', hint: '敷地・物件の位置表示', avoid: '地点が多すぎる地図', feel: ['楽しい', '注目させる', '弾む'] },
]

export const videoSamples: Sample[] = [
  { id: 'cut', number: 'V01', name: 'カット', english: 'Cut', description: '間を作らず、次の画へ瞬時に切り替える。', categoryLabel: 'つなぎ', hint: 'テンポ・会話', avoid: '余韻を残したい場面', feel: ['一瞬で', 'テンポ', '歯切れよく'] },
  { id: 'fade', number: 'V02', name: 'フェード', english: 'Fade', description: '二つの画をゆっくり溶かしてつなぐ。', categoryLabel: 'つなぎ', hint: '時間経過・余韻', avoid: 'テンポを上げたい場面', feel: ['ふわっと', '余韻', 'しっとり'] },
  { id: 'wipe', number: 'V03', name: 'ワイプ', english: 'Wipe', description: '次の画が横から覆うように切り替わる。', categoryLabel: 'つなぎ', hint: '場面転換・章替え', avoid: '落ち着いた本編の途中', feel: ['勢いがある', '区切り', '軽快'] },
  { id: 'zoom', number: 'V04', name: 'ズーム', english: 'Zoom', description: '被写体へ近づき、視線と注目を集める。', categoryLabel: 'カメラ', hint: '強調・発見', avoid: '短い間の多用', feel: ['注目させる', '迫る', '発見'] },
  { id: 'pan', number: 'V05', name: 'パン', english: 'Pan', description: '視点を横へ振り、空間や関係を見せる。', categoryLabel: 'カメラ', hint: '空間説明・導入', avoid: '主役が一点だけの画', feel: ['広がる', '見渡す', '落ち着いた'] },
  { id: 'tilt', number: 'V06', name: 'チルト', english: 'Tilt', description: '視点を縦に振り、高さやスケールを見せる。', categoryLabel: 'カメラ', hint: '高層・吹抜け', avoid: '横に広い被写体', feel: ['見上げる', 'スケール感', '壮大'] },
  { id: 'dolly', number: 'V07', name: 'ドリーイン', english: 'Dolly in', description: 'カメラ自体が前へ進み、手前と奥の見え方の差で没入させる。', categoryLabel: 'カメラ', hint: '導入・空間への没入', avoid: '奥行きのない平面', feel: ['没入', '奥行き', '引き込む'] },
  { id: 'orbit', number: 'V08', name: 'オービット', english: 'Orbit', description: '被写体の周りを回り込み、立体の形を見せる。', categoryLabel: 'カメラ', hint: '外観・プロダクト', avoid: '正面だけ見せたい物', feel: ['立体的', '高級感', '見回す'] },
  { id: 'track', number: 'V09', name: 'トラック', english: 'Truck / Tracking', description: 'カメラが横へ移動し、手前ほど速く流れるずれで奥行きを出す。', categoryLabel: 'カメラ', hint: '街並み・並走', avoid: '一点を注視させたい場面', feel: ['並走', '奥行き', '軽快'] },
  { id: 'rack', number: 'V10', name: 'ラックフォーカス', english: 'Rack focus', description: 'ピントを手前から奥へ移し、視線の先を切り替える。', categoryLabel: 'カメラ', hint: '主役の切替・ディテール', avoid: '全体を一度に見せたい画', feel: ['視線誘導', '繊細', '映画的'] },
  // v0.5 トライアル：建築CGの見本。後から建築系の見本を差し込むときの形を確かめる
  { id: 'section', number: 'V11', name: '断面カット', english: 'Section cut', description: '切断線が建物を横切り、外壁を取り去って内部の階や部屋を見せる。', categoryLabel: '建築CG', hint: '断面計画・吹抜けや設備の説明', avoid: '外観の印象を伝えたい場面', feel: ['内部を見せる', '構成', '分かりやすい'] },
  { id: 'daynight', number: 'V12', name: 'デイ・トゥ・ナイト', english: 'Day to night', description: '空が夕景から夜へ変わり、窓の明かりが順に点いていく。', categoryLabel: '建築CG', hint: '照明計画・外観の夜景', avoid: '昼の外観だけで足りる場面', feel: ['時間経過', 'ドラマチック', '照明'] },
  // 見本の倍増（建築寄り）
  { id: 'sunstudy', number: 'V13', name: '日影の移動', english: 'Sun & shadow study', description: '太陽の動きに合わせて、建物の影が朝から夕方へ回り込む。', categoryLabel: '建築CG', hint: '日影検討・配置計画の説明', avoid: '雰囲気だけを見せたい場面', feel: ['時間経過', '検討', '分かりやすい'] },
  { id: 'plan3d', number: 'V14', name: '平面図から立体へ', english: 'Plan to 3D', description: '真上から見た平面図が傾き、壁が立ち上がって立体になる。', categoryLabel: '建築CG', hint: 'コンセプト説明・ボリューム検討', avoid: '完成した外観を見せたい場面', feel: ['組み上がる', '構成', '分かりやすい'] },
  { id: 'exploded', number: 'V15', name: '分解／組み上げ', english: 'Exploded axonometric', description: '屋根・床・基礎が上下にばらけ、また重なって元に戻る。', categoryLabel: '建築CG', hint: '構成の説明・アクソメ図', avoid: '短い場面転換', feel: ['構成', '組み上がる', '立体的'] },
  { id: 'crane', number: 'V16', name: 'クレーンアップ', english: 'Crane up', description: 'カメラが上昇し、手前の木々を越えて建物の全体と背景の街並みを見せる。', categoryLabel: 'カメラ', hint: '外観の導入カット', avoid: '室内の場面', feel: ['見渡す', '壮大', '導入'] },
  { id: 'pullback', number: 'V17', name: 'プルバック', english: 'Pull-back reveal', description: 'ディテールの寄りから大きく引き、建物と周辺の全体を見せる。', categoryLabel: 'カメラ', hint: '素材やディテールから全体へ', avoid: '最初から全体を見せたい場面', feel: ['広がる', '発見', '余韻'] },
  { id: 'flythrough', number: 'V18', name: 'フライスルー', english: 'Fly-through', description: '入口の開口を抜けて、建物の内部へ入り込む。', categoryLabel: 'カメラ', hint: 'エントランスから内部への導入', avoid: '外観だけで完結する場面', feel: ['没入', '引き込む', '奥行き'] },
  { id: 'linerender', number: 'V19', name: '線画からレンダーへ', english: 'Line to render', description: '線画が描かれ、色の付いた完成イメージへ溶けて変わる。', categoryLabel: 'つなぎ', hint: 'スケッチから完成イメージへ', avoid: '写真同士のつなぎ', feel: ['組み上がる', '完成', 'ドラマチック'] },
  { id: 'tiltshift', number: 'V20', name: 'ミニチュア（ティルトシフト）', english: 'Tilt-shift', description: '画面の上下をぼかし、街区を模型のように見せる。', categoryLabel: 'カメラ', hint: '街区・配置計画・敷地全体', avoid: '実物の大きさを伝えたい場面', feel: ['かわいい', '俯瞰', '模型'] },
]

export const textSamples: Sample[] = [
  { id: 'fade-in', number: 'T01', name: 'フェードイン', english: 'Fade in', description: '文字全体を、薄い状態から静かに浮かび上がらせる。', categoryLabel: '静か', hint: '見出し・キャプション', avoid: 'すぐ読ませたい情報', feel: ['ふわっと', '上品', '静か'] },
  { id: 'typewriter', number: 'T02', name: 'タイプ表示', english: 'Typewriter', description: '一文字ずつ打ち込むように表示し、読む速さを揃える。', categoryLabel: 'リズム', hint: '問いかけ・コード', avoid: '長い文章', feel: ['一文字ずつ', 'リズム', '語りかける'] },
  { id: 'stagger', number: 'T03', name: '文字送り', english: 'Stagger', description: '文字が少しずつ遅れて順に現れ、リズムを生む。', categoryLabel: 'リズム', hint: 'タイトル・ロゴ', avoid: '本文・注意書き', feel: ['リズム', '軽快', '弾む'] },
  { id: 'scatter', number: 'T04', name: '分解／集合', english: 'Scatter & assemble', description: 'ばらばらの文字が集まり、一語に組み上がる。', categoryLabel: '演出', hint: 'オープニング・ブランド', avoid: '何度も見る画面', feel: ['勢いがある', '組み上がる', '演出'] },
  { id: 'mask', number: 'T05', name: 'マスク表示', english: 'Mask reveal', description: '見えない境界の下から、文字がせり上がって現れる。', categoryLabel: '静か', hint: '章タイトル・テロップ', avoid: '小さな文字', feel: ['高級感', 'すっきり', '映画的'] },
]

export const allSamples: Sample[] = [...samples, ...videoSamples, ...textSamples]

export const finderWords = ['ふわっと', '一瞬で', '高級感', '勢いがある', '上品', '奥行き', '注目させる', 'リズム']

/* v0.4-3 再生の調整：速度はすべての見本、強さ・向きは意味のある見本だけに効く */
export const strengthSamples = new Set(['01', '02', '04', '05', '06', '13', '14', 'V04', 'V07', 'V17', 'V20', 'T01', 'T03', 'T04'])
export const directionSamples = new Set(['07', '08', '09', '12', '17', '19', 'V03', 'V05', 'V06', 'V08', 'V09', 'V12', 'V13', 'V16', 'T05'])

export type Setting = 'speed' | 'strength' | 'direction'
export const settingOptions: Record<Setting, { label: string, options: [string, string][] }> = {
  speed: { label: '速度', options: [['0.5', '×0.5'], ['1', '×1'], ['1.5', '×1.5']] },
  strength: { label: '強さ', options: [['0.5', '弱'], ['1', '標準'], ['1.6', '強']] },
  direction: { label: '向き', options: [['normal', '標準'], ['reverse', '反対']] },
}
export const defaultSettings: Record<Setting, string> = { speed: '1', strength: '1', direction: 'normal' }

/** 用途別コレクションの候補（ROADMAP v1.0の4領域に合わせる） */
export const suggestedCollections = ['Web', '動画', 'プレゼン', '建築CG']
