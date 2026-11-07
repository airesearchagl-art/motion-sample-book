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
  // v1.2-2 入る・切り替える・建築の図面を操作する（100種類へ）
  { id: 'slidein', number: '21', name: 'スライドイン', english: 'Slide in', description: '要素が横から滑り込み、少し透けた状態からはっきり現れる。', category: 'quiet', categoryLabel: '静か', hint: 'お知らせ・パネル・次の内容', avoid: '常に表示されている要素', feel: ['すっと', '自然', '軽い'] },
  { id: 'stagger', number: '22', name: '順に現れる', english: 'Staggered list', description: 'カードが少しずつ時間をずらして、上から順に現れる。', category: 'quiet', categoryLabel: '静か', hint: '作品一覧・検索結果', avoid: '数が多すぎる一覧', feel: ['リズム', '整然', '心地よい'] },
  { id: 'scrollreveal', number: '23', name: 'スクロールで現れる', english: 'Scroll reveal', description: 'スクロールして画面に入った内容から、ふわっと浮かび上がる。', category: 'decorative', categoryLabel: '装飾', hint: '紹介ページ・コンセプトの説明', avoid: '何度も見返す資料', feel: ['物語', '期待', 'ゆったり'] },
  { id: 'accordion', number: '24', name: '開閉（アコーディオン）', english: 'Accordion', description: '見出しを押すと中身が下に開き、矢印が回る。', category: 'quiet', categoryLabel: '静か', hint: '仕様・よくある質問・部屋の内訳', avoid: '最初から全部読んでほしい文章', feel: ['整理', '分かりやすい', '控えめ'] },
  { id: 'sheet', number: '25', name: '下から出るシート', english: 'Bottom sheet', description: '画面の下からシートがせり上がり、後ろが少し暗くなる。', category: 'dynamic', categoryLabel: 'はっきり', hint: 'スマートフォンの詳細・選択肢', avoid: '大きな画面の主な内容', feel: ['手元', 'すっと', '分かりやすい'] },
  { id: 'fadethrough', number: '26', name: 'タブの切り替え（フェードスルー）', english: 'Fade through', description: '今の内容が少し縮みながら消え、次の内容が浮かび上がる。', category: 'quiet', categoryLabel: '静か', hint: 'タブ・下部のメニュー', avoid: '前後のつながりを見せたい移動', feel: ['すっきり', '落ち着き', '切り替え'] },
  { id: 'sharedaxis', number: '27', name: '前後へ進む（共有軸）', english: 'Shared axis', description: '今の画面が左へ抜け、次の画面が右から入る。手順の進み具合も動く。', category: 'quiet', categoryLabel: '静か', hint: '手順・ページ送り・ステップの説明', avoid: '関係のない画面への切り替え', feel: ['進む', '順番', '分かりやすい'] },
  { id: 'hotspot', number: '28', name: '注目点の脈動', english: 'Hotspot pulse', description: '写真の上の注目点から、輪が静かに広がり続ける。', category: 'dynamic', categoryLabel: 'はっきり', hint: '写真・パースの見どころ・押せる場所', avoid: '注目点が多すぎる画像', feel: ['注目させる', '誘う', '静かに'] },
  { id: 'floorswitch', number: '29', name: '階の切り替え', english: 'Floor switch', description: '重なった各階の平面から、選んだ階が浮き上がり、ほかの階は薄くなる。', category: 'dynamic', categoryLabel: 'はっきり', hint: 'フロア案内・各階の平面計画', avoid: '1階建ての建物', feel: ['立体的', '分かりやすい', '選ぶ'] },
  { id: 'roomhighlight', number: '30', name: '平面図の部屋を強調', english: 'Room highlight', description: '指した部屋に色が付いて名前が出て、ほかの部屋は薄くなる。', category: 'quiet', categoryLabel: '静か', hint: '平面図の説明・部屋の案内', avoid: '部屋の区切りがない大空間', feel: ['分かりやすい', '案内', '控えめ'] },
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
  // v1.0-4 建築CGの残り
  { id: 'layers', number: 'V21', name: '構造・設備・仕上げを重ねる', english: 'Layered build-up', description: '柱と梁の構造、ダクトや配管の設備、外装の仕上げが、順に重なっていく。', categoryLabel: '建築CG', hint: 'BIMモデルの説明・設備の納まり・施工順序', avoid: '完成した外観の印象だけを伝えたい場面', feel: ['構成', '組み上がる', '分かりやすい'] },
  // v1.2-1 つなぎ・カメラ・建築CG を追加（100種類へ）
  { id: 'matchcut', number: 'V22', name: 'マッチカット', english: 'Match cut', description: '丸い窓から丸い天窓へ。形と位置が同じものをそろえて、別の場面へつなぐ。', categoryLabel: 'つなぎ', hint: '外から内へ・昼から夜へ・模型から完成へ', avoid: '形のそろうものがない場面', feel: ['気持ちよく', '意外性', 'つながる'] },
  { id: 'whip', number: 'V23', name: 'ホイップパン', english: 'Whip pan', description: 'カメラを素早く振ってぶれさせ、その勢いのまま次の場面へ移る。', categoryLabel: 'つなぎ', hint: 'テンポを上げたい切り替え・場所の移動', avoid: '落ち着いた説明', feel: ['勢い', 'スピード', 'テンポ'] },
  { id: 'iris', number: 'V24', name: '形のワイプ（アイリス）', english: 'Iris / shape wipe', description: '画面の中央から丸く広がって、次の場面が現れる。', categoryLabel: 'つなぎ', hint: '注目点から次の場面へ・章の区切り', avoid: '落ち着いた竣工映像', feel: ['かわいい', '区切り', 'はっきり'] },
  { id: 'washout', number: 'V25', name: '白く飛ばしてつなぐ', english: 'Washout', description: '画面が白くまぶしく飛び、その光の中から次の場面が現れる。', categoryLabel: 'つなぎ', hint: '回想・時間の飛躍・朝の光へ', avoid: '暗い場面どうし', feel: ['まぶしい', '時間の飛躍', '明るい'] },
  { id: 'split', number: 'V26', name: '画面分割', english: 'Split screen', description: '1つの画面が2つ、3つに分かれ、別の場面を同時に見せる。', categoryLabel: 'つなぎ', hint: '案の比較・同じ時刻の別の場所・季節の比較', avoid: '細部を大きく見せたい場面', feel: ['比べる', '同時に', '整理'] },
  { id: 'dollyzoom', number: 'V27', name: 'ドリーズーム', english: 'Dolly zoom', description: '手前の建物の大きさは変えずに、背景だけがぐっと迫ってくる。', categoryLabel: 'カメラ', hint: '印象的な一瞬・空間の奥行きを強調', avoid: '自然に見せたい説明の映像', feel: ['ドラマチック', '緊張感', '印象的'] },
  { id: 'foreground', number: 'V28', name: '前景から抜ける', english: 'Foreground reveal', description: '手前の柱や木の陰から抜けて、奥の建物が見えてくる。', categoryLabel: 'カメラ', hint: '外観の見せ場・アプローチの導入', avoid: '手前に何もない場面', feel: ['期待', '奥行き', '映画的'] },
  { id: 'topdown', number: 'V29', name: '俯瞰から目線へ', english: 'Top-down to eye level', description: '真上から見下ろした配置から、人の目線の高さまでカメラが降りてくる。', categoryLabel: 'カメラ', hint: '配置計画から外観へ・導入', avoid: '室内だけの映像', feel: ['全体から', '降りていく', '分かりやすい'] },
  { id: 'hyperlapse', number: 'V30', name: 'ハイパーラプス', english: 'Hyperlapse', description: '歩きながら早回しにして、長い道のりや時間の流れを短く見せる。', categoryLabel: 'カメラ', hint: 'アプローチ・街並み・1日の流れ', avoid: 'ゆっくり見せたい空間', feel: ['スピード', '時間の流れ', '躍動'] },
  { id: 'lightscene', number: 'V31', name: '照明シーンの切り替え', english: 'Lighting scenes', description: '同じ室内で、全般照明 → 作業 → くつろぎ → 常夜灯と、明かりの場面が切り替わる。', categoryLabel: '建築CG', hint: '照明計画の説明・調光の考え方', avoid: '明るさの違いが伝わりにくい小さな画面', feel: ['雰囲気', '比べる', '時間'] },
  { id: 'material', number: 'V32', name: '仕上げ材の切り替え', english: 'Material swap', description: '同じ外壁の仕上げが、コンクリート → 木 → 金属 → タイルと順に入れ替わる。', categoryLabel: '建築CG', hint: '仕上げの比較・色や素材の検討', avoid: '1案に決まった場面', feel: ['比べる', '素材', '検討'] },
  { id: 'airflow', number: 'V33', name: '気流・動線の見える化', english: 'Flow visualization', description: '断面の中を、吹き出す空気の流れと、人の動く線が矢印で流れていく。', categoryLabel: '建築CG', hint: '空調・換気の考え方・人の動線計画', avoid: '印象だけを伝える竣工映像', feel: ['分かりやすい', '流れ', '仕組み'] },
]

export const textSamples: Sample[] = [
  { id: 'fade-in', number: 'T01', name: 'フェードイン', english: 'Fade in', description: '文字全体を、薄い状態から静かに浮かび上がらせる。', categoryLabel: '静か', hint: '見出し・キャプション', avoid: 'すぐ読ませたい情報', feel: ['ふわっと', '上品', '静か'] },
  { id: 'typewriter', number: 'T02', name: 'タイプ表示', english: 'Typewriter', description: '一文字ずつ打ち込むように表示し、読む速さを揃える。', categoryLabel: 'リズム', hint: '問いかけ・コード', avoid: '長い文章', feel: ['一文字ずつ', 'リズム', '語りかける'] },
  { id: 'stagger', number: 'T03', name: '文字送り', english: 'Stagger', description: '文字が少しずつ遅れて順に現れ、リズムを生む。', categoryLabel: 'リズム', hint: 'タイトル・ロゴ', avoid: '本文・注意書き', feel: ['リズム', '軽快', '弾む'] },
  { id: 'scatter', number: 'T04', name: '分解／集合', english: 'Scatter & assemble', description: 'ばらばらの文字が集まり、一語に組み上がる。', categoryLabel: '演出', hint: 'オープニング・ブランド', avoid: '何度も見る画面', feel: ['勢いがある', '組み上がる', '演出'] },
  { id: 'mask', number: 'T05', name: 'マスク表示', english: 'Mask reveal', description: '見えない境界の下から、文字がせり上がって現れる。', categoryLabel: '静か', hint: '章タイトル・テロップ', avoid: '小さな文字', feel: ['高級感', 'すっきり', '映画的'] },
  // 見本の倍増（建築寄り）
  { id: 'tracking', number: 'T06', name: '字間が開く', english: 'Tracking expand', description: '詰まった文字が、ゆっくり字間を広げながら落ち着く。', categoryLabel: '静か', hint: '竣工映像のタイトル・施設名', avoid: '長い文や小さな文字', feel: ['高級感', '上品', '余韻'] },
  { id: 'strokedraw', number: 'T07', name: '線で描かれる文字', english: 'Stroke draw', description: '文字の輪郭線が描かれてから、塗りが入る。', categoryLabel: '演出', hint: '施設名・手描きや図面の雰囲気', avoid: '細い書体・小さな文字', feel: ['手描き', '組み上がる', '繊細'] },
  { id: 'counter', number: 'T08', name: '数字のカウントアップ', english: 'Count up', description: '数字が0から回り、面積・階数・高さの値で止まる。', categoryLabel: 'リズム', hint: '延床面積・階数・高さ・戸数', avoid: '正確に読ませたい表', feel: ['勢いがある', 'スケール感', '注目させる'] },
  { id: 'dimension', number: 'T09', name: '寸法線と一緒に表示', english: 'Dimension reveal', description: '寸法線が両側へ伸び、その上に寸法の数値が現れる。', categoryLabel: '静か', hint: '寸法・スケールの説明', avoid: '寸法が多い図', feel: ['正確', '図面', 'すっきり'] },
  { id: 'callout', number: 'T10', name: '引き出し線の注記', english: 'Leader callout', description: '点から引き出し線が伸び、素材や部位のラベルが出る。', categoryLabel: 'リズム', hint: 'パースへの注記・素材の説明', avoid: '注記が多すぎる画面', feel: ['分かりやすい', '説明', '図面'] },
  // v1.2-3 文字・数値を追加（100種類へ）
  { id: 'blurin', number: 'T11', name: 'ぼかしから浮かぶ', english: 'Blur in', description: 'ぼやけた文字が、ピントが合うように少しずつはっきりする。', categoryLabel: '静か', hint: '静かなタイトル・映像の冒頭', avoid: '小さな文字・長い文章', feel: ['しっとり', '上品', '余韻'] },
  { id: 'wordrotate', number: 'T12', name: '単語の入れ替え', english: 'Word rotate', description: '文の一部の言葉だけが、上下に回るように次々と入れ替わる。', categoryLabel: 'リズム', hint: 'コンセプトの言葉・使われ方の紹介', avoid: '1つの意味を伝えたい見出し', feel: ['軽快', '広がり', '楽しい'] },
  { id: 'marker', number: 'T13', name: 'マーカーが引かれる', english: 'Highlight marker', description: '大事な言葉の下に、蛍光ペンのような帯が左から引かれる。', categoryLabel: 'リズム', hint: '要点の強調・提案のキーワード', avoid: '強調が多すぎる文章', feel: ['分かりやすい', '親しみ', '要点'] },
  { id: 'scramble', number: 'T14', name: 'ばらばらの文字から確定', english: 'Text scramble', description: 'ランダムな文字がめまぐるしく変わり、左から順に正しい文字に決まる。', categoryLabel: '演出', hint: 'プロジェクト名・数値・技術的な演出', avoid: '落ち着いた住宅の紹介', feel: ['デジタル', '緊張感', 'かっこいい'] },
  { id: 'lowerthird', number: 'T15', name: 'テロップ（画面下の帯）', english: 'Lower third', description: '映像の下の方に帯が伸び、場所や名前の文字が続けて出る。', categoryLabel: '静か', hint: '動画の場所名・人名・施設名', avoid: '静止画の資料', feel: ['分かりやすい', '番組らしい', '整理'] },
  { id: 'barchart', number: 'T16', name: '棒グラフが伸びる', english: 'Bar chart grow', description: '各階の面積などの棒が、順に下から伸びて数値が出る。', categoryLabel: '数値', hint: '面積・人数・コストの比較', avoid: '正確な値を細かく読ませる場面', feel: ['比べる', '分かりやすい', '説得力'] },
  { id: 'ratioring', number: 'T17', name: '割合のリング', english: 'Ratio ring', description: '円の線が割合の分だけ伸び、中の数字が上がっていく。', categoryLabel: '数値', hint: '緑化率・省エネ率・面積の割合', avoid: '項目が多い内訳', feel: ['説得力', 'すっきり', '注目させる'] },
]

/**
 * v1.0-3 環境の動き。建物とカメラは止めたまま、風・水・人・天気・光・季節だけを動かす。
 * 1枚のパースから生成AIで動画を作るときや、CGの静止画に空気感を足すときの見本。
 */
export const environmentSamples: Sample[] = [
  { id: 'foliage', number: 'E01', name: '植栽の揺れ', english: 'Foliage sway', description: '手前の木々が、風を受けてそれぞれの間合いでゆっくり揺れる。', categoryLabel: '風', hint: '外観パース・アプローチの手前', avoid: '植栽のない場面、強風に見せたくない場面', feel: ['やわらかい', '自然', '静か'] },
  { id: 'water', number: 'E02', name: '水面のゆらぎ', english: 'Water shimmer', description: '水盤に映った建物が、さざ波で細かく揺らぐ。', categoryLabel: '水', hint: '水盤・池・川沿いの外観', avoid: '水面のない場面', feel: ['涼しい', '上品', 'きらっと'] },
  { id: 'people', number: 'E03', name: '人の往来', english: 'People passing', description: '人のシルエットが、手前と奥を違う速さで行き交う。', categoryLabel: '人・車', hint: '広場・エントランス・商業施設', avoid: '人の配置を決めていない計画段階', feel: ['にぎわい', '生活感', 'リズム'] },
  { id: 'clouds', number: 'E04', name: '雲の流れ', english: 'Drifting clouds', description: '空の雲がゆっくり流れ、外壁に落ちる雲の影も通り過ぎる。', categoryLabel: '天気', hint: '外観の導入・余韻のカット', avoid: '空が写らない室内', feel: ['ゆったり', '余韻', '時間経過'] },
  { id: 'dappled', number: 'E05', name: '木漏れ日', english: 'Dappled light', description: '床や壁に落ちた木漏れ日が、葉の揺れに合わせて明滅する。', categoryLabel: '光', hint: 'テラス・縁側・中庭に面した室内', avoid: '曇りや夜の場面', feel: ['やわらかい', '心地よい', '自然'] },
  { id: 'rain', number: 'E06', name: '雨', english: 'Rain', description: '細い雨が斜めに降り、地面に小さな波紋が広がる。', categoryLabel: '天気', hint: '庇・軒下・雨の日の使われ方', avoid: '晴れの外観を見せたい場面', feel: ['しっとり', '静か', '映画的'] },
  { id: 'snow', number: 'E07', name: '雪', english: 'Snowfall', description: '大きさの違う雪が、ゆらぎながらゆっくり降る。', categoryLabel: '天気', hint: '冬の外観・寒冷地の計画', avoid: '雪の降らない地域の計画', feel: ['静か', '幻想的', '季節感'] },
  { id: 'trails', number: 'E08', name: '車の光跡', english: 'Light trails', description: '夜の道路を、車のライトが光の筋になって流れる。', categoryLabel: '人・車', hint: '夜景の外観・駅前・幹線道路沿い', avoid: '静けさを伝えたい住宅地', feel: ['都会的', 'スピード', 'ドラマチック'] },
  { id: 'mist', number: 'E09', name: '霧・もや', english: 'Drifting mist', description: '低い霧が地面近くを流れ、奥の景色が見え隠れする。', categoryLabel: '天気', hint: '森の中の施設・朝の外観・余韻', avoid: '建物をはっきり見せたい場面', feel: ['幻想的', '静か', '余韻'] },
  { id: 'seasons', number: 'E10', name: '季節の移ろい', english: 'Seasons', description: '木々の色が若葉 → 深緑 → 紅葉 → 冬枯れへと移り変わる。', categoryLabel: '季節', hint: '植栽計画・一年の使われ方の説明', avoid: '1つの季節だけを見せたい場面', feel: ['時間経過', '季節感', '変化'] },
  // v1.2-4 環境の動きを追加（100種類へ）
  { id: 'petals', number: 'E11', name: '桜吹雪・落ち葉', english: 'Falling petals', description: '花びらがくるくる回りながら、斜めに舞い落ちる。', categoryLabel: '季節', hint: '春の外観・並木道・入学や竣工の映像', avoid: '季節を決めたくない場面', feel: ['華やか', '季節感', 'やさしい'] },
  { id: 'flutter', number: 'E12', name: 'はためき（旗・カーテン）', english: 'Fluttering fabric', description: '旗や幕が風を受けて、波打つようにはためく。', categoryLabel: '風', hint: '外構のサイン・バナー・窓辺のカーテン', avoid: '無風の静かな場面', feel: ['にぎわい', '風', '軽やか'] },
  { id: 'steam', number: 'E13', name: '湯気・煙', english: 'Rising steam', description: '白い湯気がゆらぎながら立ちのぼり、薄れて消える。', categoryLabel: '空気', hint: 'カフェ・厨房・温浴施設・冬の朝', avoid: '火災を連想させる場面', feel: ['あたたかい', '生活感', 'ゆったり'] },
  { id: 'fountain', number: 'E14', name: '噴水・水しぶき', english: 'Fountain', description: '噴水の水が弧を描いて上がり、しぶきが水面に落ちる。', categoryLabel: '水', hint: '広場・中庭・エントランスの外構', avoid: '水景のない計画', feel: ['涼しい', '華やか', 'にぎわい'] },
  { id: 'crowd', number: 'E15', name: '人が集まる・とどまる', english: 'Gathering crowd', description: '人が広場の中央に集まってきて、立ち止まって話す。', categoryLabel: '人・車', hint: '広場・ホール・イベントの使われ方', avoid: '人の配置を決めていない計画段階', feel: ['にぎわい', 'コミュニティ', '温かい'] },
  { id: 'birds', number: 'E16', name: '鳥が横切る', english: 'Birds flying', description: '鳥の群れが羽ばたきながら、空を横切っていく。', categoryLabel: '空', hint: '余韻のカット・外観の導入・水辺', avoid: '都市の中心で違和感が出る場面', feel: ['のびやか', '余韻', '自然'] },
  { id: 'twinkle', number: 'E17', name: '夜景のまたたき', english: 'City lights', description: '遠くの街の明かりや航空障害灯が、ちらちらとまたたく。', categoryLabel: '光', hint: '夜景の外観・高層の眺望', avoid: '昼の場面', feel: ['都会的', '静か', 'ロマンチック'] },
  { id: 'puddle', number: 'E18', name: '雨上がりの水たまり', english: 'Puddle reflection', description: '濡れた舗装の水たまりに建物が映り、しずくの波紋が時々広がる。', categoryLabel: '水', hint: '雨上がりの外観・夜の舗装', avoid: '乾いた晴天の場面', feel: ['しっとり', '映画的', '静か'] },
  { id: 'glassreflect', number: 'E19', name: 'ガラスに映る雲が流れる', english: 'Glass reflection', description: 'カーテンウォールのガラスに映った雲が、ゆっくり流れていく。', categoryLabel: '光', hint: 'ガラスの外観・高層のファサード', avoid: 'ガラスの少ない外観', feel: ['透明感', '上品', 'ゆったり'] },
  { id: 'vertical', number: 'E20', name: '縦の動線（エレベーター・エスカレーター）', english: 'Vertical circulation', description: 'ガラス越しにエレベーターが昇り、エスカレーターの人が上がっていく。', categoryLabel: '人・車', hint: '吹抜け・駅・商業施設・オフィスのロビー', avoid: '平屋の建物', feel: ['活気', 'つながり', '動き'] },
]

export const allSamples: Sample[] = [...samples, ...videoSamples, ...textSamples, ...environmentSamples]

export const finderWords = ['ふわっと', '一瞬で', '高級感', '勢いがある', '上品', '奥行き', '注目させる', 'リズム']

/* v0.4-3 再生の調整：速度はすべての見本、強さ・向きは意味のある見本だけに効く */
export const strengthSamples = new Set(['01', '02', '04', '05', '06', '13', '14', 'V04', 'V07', 'V17', 'V20', 'V27', 'T01', 'T03', 'T04', 'T06', 'E01', 'E02', 'E09', 'E12', 'E14'])
export const directionSamples = new Set(['21', '27', '07', '08', '09', '12', '17', '19', 'V03', 'V05', 'V06', 'V08', 'V09', 'V12', 'V13', 'V16', 'V21', 'V23', 'V28', 'T05', 'E03', 'E04', 'E08', 'E16', 'E19'])

export type Setting = 'speed' | 'strength' | 'direction'
export const settingOptions: Record<Setting, { label: string, options: [string, string][] }> = {
  speed: { label: '速度', options: [['0.5', '×0.5'], ['1', '×1'], ['1.5', '×1.5']] },
  strength: { label: '強さ', options: [['0.5', '弱'], ['1', '標準'], ['1.6', '強']] },
  direction: { label: '向き', options: [['normal', '標準'], ['reverse', '反対']] },
}
export const defaultSettings: Record<Setting, string> = { speed: '1', strength: '1', direction: 'normal' }

/** 用途別コレクションの候補（ROADMAP v1.0の4領域に合わせる） */
export const suggestedCollections = ['Web', '動画', 'プレゼン', '建築CG']
