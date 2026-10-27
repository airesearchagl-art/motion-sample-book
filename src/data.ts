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
export const strengthSamples = new Set(['01', '02', '04', '05', '06', 'V04', 'V07', 'T01', 'T03', 'T04'])
export const directionSamples = new Set(['07', '08', '09', 'V03', 'V05', 'V06', 'V08', 'V09', 'T05'])

export type Setting = 'speed' | 'strength' | 'direction'
export const settingOptions: Record<Setting, { label: string, options: [string, string][] }> = {
  speed: { label: '速度', options: [['0.5', '×0.5'], ['1', '×1'], ['1.5', '×1.5']] },
  strength: { label: '強さ', options: [['0.5', '弱'], ['1', '標準'], ['1.6', '強']] },
  direction: { label: '向き', options: [['normal', '標準'], ['reverse', '反対']] },
}
export const defaultSettings: Record<Setting, string> = { speed: '1', strength: '1', direction: 'normal' }

/** 用途別コレクションの候補（ROADMAP v1.0の4領域に合わせる） */
export const suggestedCollections = ['Web', '動画', 'プレゼン', '建築CG']
