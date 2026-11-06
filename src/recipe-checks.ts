/**
 * 再現情報の実機確認の結果（Windowsスレッドが記録）。
 * - キーは src/recipes.ts の見本の番号に合わせる。
 * - edit の Premiere Pro 部分は未確認（note に記載）。
 * - mismatch の fix は、そのまま recipes.ts の該当欄に入れられる文。
 * - cg の d5 は D5 Render で実際に作った手順（recipes.ts の cg 欄へ「D5 Render：…」として追記する想定）。
 * 詳細は docs/RECIPE_VERIFICATION.md を参照。
 */

export type CheckStatus = 'device' | 'docs' | 'unverified' | 'mismatch'

export type RecipeCheck = {
  /** device=実機で確認／docs=公式資料で確認／unverified=未確認／mismatch=記載と違う */
  status: CheckStatus
  /** 確認に使った道具と版 */
  checkedWith: string
  /** 'YYYY-MM-DD' */
  date: string
  /** 補足（近い表現であることの注意、未確認の道具など） */
  note?: string
  /** mismatch のときの修正案（そのまま recipes.ts に入れられる文） */
  fix?: string
  /** cg のみ：D5 Renderで実際に作った手順。D5で作れない場合は「D5では不可：理由」 */
  d5?: string
}

export const recipeChecks: Record<string, Partial<Record<'edit' | 'powerpoint' | 'cg', RecipeCheck>>> = {
  '01': {
    edit: { status: 'device', checkedWith: 'After Effects 2026 (26.5)・Premiere Pro 2026 / 日本語UI', date: '2026-11-07', note: '位置は「Y 位置」（次元を分割）、ドロップシャドウの「距離」。イーズはキーフレーム補助の「イージーイーズ」（F9）' },
    powerpoint: { status: 'device', checkedWith: 'PowerPoint (Microsoft 365) 2610 / 日本語UI', date: '2026-11-01', note: '影の書式は静的で、アニメーションでは変化しない' },
  },
  '02': {
    edit: { status: 'device', checkedWith: 'After Effects 2026 (26.5)・Premiere Pro 2026 / 日本語UI', date: '2026-11-07', note: 'イーズはキーフレーム補助の「イージーイーズ」（F9）' },
    powerpoint: { status: 'mismatch', checkedWith: 'PowerPoint (Microsoft 365) 2610 / 日本語UI', date: '2026-11-01', note: '「スムーズ終了」という項目はなく、効果のオプション画面の「滑らかに終了」', fix: '強調「拡大/収縮」（効果のオプション画面でサイズをユーザー設定110%、「滑らかに終了」を0.5秒程度）' },
  },
  '03': {
    edit: { status: 'device', checkedWith: 'After Effects 2026 (26.5)・Premiere Pro 2026 / 日本語UI', date: '2026-11-07' },
    powerpoint: { status: 'mismatch', checkedWith: 'PowerPoint (Microsoft 365) 2610 / 日本語UI', date: '2026-11-01', note: '「自動で元に戻す」はUIでは「オートリバース」', fix: '強調「拡大/収縮」（サイズをユーザー設定95%、効果のオプション画面で「オートリバース」をオン）。または軌跡で数pxだけ下へ' },
  },
  '04': {
    edit: { status: 'mismatch', checkedWith: 'After Effects 2026 (26.5)・Premiere Pro 2026 / 日本語UI', date: '2026-11-07', note: 'bounce は標準機能ではなく自作のエクスプレッション。「弾み」という機能名はない', fix: 'After Effects：位置Yにオーバーシュートするキーを付け、グラフエディターで減衰させる（減衰する弾みのエクスプレッションを使ってもよい）' },
    powerpoint: { status: 'device', checkedWith: 'PowerPoint (Microsoft 365) 2610 / 日本語UI', date: '2026-11-01' },
  },
  '05': {
    edit: { status: 'device', checkedWith: 'After Effects 2026 (26.5)・Premiere Pro 2026 / 日本語UI', date: '2026-11-07', note: '「ウィグラー」はウィンドウメニューのパネル、wiggle() はエクスプレッション' },
    powerpoint: { status: 'mismatch', checkedWith: 'PowerPoint (Microsoft 365) 2610 / 日本語UI', date: '2026-11-01', note: '「アニメーションの軌跡（左右）」という軌跡はない。「自動で戻す」は「オートリバース」', fix: '強調「シーソー」、または「アニメーションの軌跡：直線」の効果のオプション「右へ」で少しだけ動かし、「オートリバース」と「繰り返し：2」' },
  },
  '06': {
    edit: { status: 'device', checkedWith: 'After Effects 2026 (26.5)・Premiere Pro 2026 / 日本語UI', date: '2026-11-07', note: '3Dレイヤーの「Y 回転」「Z 回転」' },
    powerpoint: { status: 'device', checkedWith: 'PowerPoint (Microsoft 365) 2610 / 日本語UI', date: '2026-11-01' },
  },
  '07': {
    edit: { status: 'device', checkedWith: 'After Effects 2026 (26.5)・Premiere Pro 2026 / 日本語UI', date: '2026-11-07', note: 'シェイプの「パスのトリミング」の「終了点」' },
    powerpoint: { status: 'device', checkedWith: 'PowerPoint (Microsoft 365) 2610 / 日本語UI', date: '2026-11-01', note: 'ワイプの効果のオプション：下から／左から／右から／上から' },
  },
  '08': {
    edit: { status: 'device', checkedWith: 'After Effects 2026 (26.5)・Premiere Pro 2026 / 日本語UI', date: '2026-11-07' },
    powerpoint: { status: 'device', checkedWith: 'PowerPoint (Microsoft 365) 2610 / 日本語UI', date: '2026-11-01' },
  },
  '09': {
    edit: { status: 'device', checkedWith: 'After Effects 2026 (26.5)・Premiere Pro 2026 / 日本語UI', date: '2026-11-07' },
    powerpoint: { status: 'mismatch', checkedWith: 'PowerPoint (Microsoft 365) 2610 / 日本語UI', date: '2026-11-01', note: 'PowerPointのアニメーションには図形内でのトリミング（マスク）がない', fix: '斜めの白い半透明図形を「アニメーションの軌跡：直線（右へ）」で横切らせる（はみ出す部分は、背景と同じ色の図形を上に重ねて隠す）' },
  },
  '10': {
    edit: { status: 'device', checkedWith: 'After Effects 2026 (26.5)・Premiere Pro 2026 / 日本語UI', date: '2026-11-07' },
    powerpoint: { status: 'device', checkedWith: 'PowerPoint (Microsoft 365) 2610 / 日本語UI', date: '2026-11-01' },
  },
  '11': {
    edit: { status: 'device', checkedWith: 'After Effects 2026 (26.5)・Premiere Pro 2026 / 日本語UI', date: '2026-11-07' },
    powerpoint: { status: 'device', checkedWith: 'PowerPoint (Microsoft 365) 2610 / 日本語UI', date: '2026-11-01' },
  },
  '12': {
    edit: { status: 'device', checkedWith: 'After Effects 2026 (26.5)・Premiere Pro 2026 / 日本語UI', date: '2026-11-07' },
    powerpoint: { status: 'device', checkedWith: 'PowerPoint (Microsoft 365) 2610 / 日本語UI', date: '2026-11-01', note: '拡大/収縮の効果のオプション「小」（=50%）で縮小方向' },
  },
  '13': {
    edit: { status: 'device', checkedWith: 'After Effects 2026 (26.5)・Premiere Pro 2026 / 日本語UI', date: '2026-11-07' },
    powerpoint: { status: 'device', checkedWith: 'PowerPoint (Microsoft 365) 2610 / 日本語UI', date: '2026-11-01', note: '移動量は軌跡の終点をドラッグして変える' },
  },
  '14': {
    edit: { status: 'mismatch', checkedWith: 'After Effects 2026 (26.5)・Premiere Pro 2026 / 日本語UI', date: '2026-11-07', note: '「ゆっくりズーム」系のプリセットはない（エフェクトパネルを検索して確認）', fix: 'Premiere Pro：エフェクトコントロールの「モーション」で「スケール」と「位置」にキーフレーム／After Effects：スケール100→115%と位置' },
    powerpoint: { status: 'mismatch', checkedWith: 'PowerPoint (Microsoft 365) 2610 / 日本語UI', date: '2026-11-01', note: '「軌跡（少し斜め）」という名前はない。斜めは「その他のアニメーションの軌跡効果」の「対角線（右上へ）」など', fix: '画像に強調「拡大/収縮」（ユーザー設定110〜115%、継続時間を長く）＋「その他のアニメーションの軌跡効果」の「対角線（右上へ）」を「直前の動作と同時」で' },
  },
  '15': {
    edit: { status: 'device', checkedWith: 'After Effects 2026 (26.5)・Premiere Pro 2026 / 日本語UI', date: '2026-11-07' },
    powerpoint: { status: 'device', checkedWith: 'PowerPoint (Microsoft 365) 2610 / 日本語UI', date: '2026-11-01' },
  },
  '16': {
    edit: { status: 'device', checkedWith: 'After Effects 2026 (26.5)・Premiere Pro 2026 / 日本語UI', date: '2026-11-07' },
    powerpoint: { status: 'device', checkedWith: 'PowerPoint (Microsoft 365) 2610 / 日本語UI', date: '2026-11-01' },
  },
  '17': {
    edit: { status: 'device', checkedWith: 'After Effects 2026 (26.5)・Premiere Pro 2026 / 日本語UI', date: '2026-11-07' },
    powerpoint: { status: 'device', checkedWith: 'PowerPoint (Microsoft 365) 2610 / 日本語UI', date: '2026-11-01', note: 'プッシュの効果のオプション：下から／右から／左から／上から' },
  },
  '18': {
    edit: { status: 'device', checkedWith: 'After Effects 2026 (26.5)・Premiere Pro 2026 / 日本語UI', date: '2026-11-07' },
    powerpoint: { status: 'device', checkedWith: 'PowerPoint (Microsoft 365) 2610 / 日本語UI', date: '2026-11-01' },
  },
  '19': {
    edit: { status: 'device', checkedWith: 'After Effects 2026 (26.5)・Premiere Pro 2026 / 日本語UI', date: '2026-11-07' },
    powerpoint: { status: 'device', checkedWith: 'PowerPoint (Microsoft 365) 2610 / 日本語UI', date: '2026-11-01' },
  },
  '20': {
    edit: { status: 'device', checkedWith: 'After Effects 2026 (26.5)・Premiere Pro 2026 / 日本語UI', date: '2026-11-07' },
    powerpoint: { status: 'device', checkedWith: 'PowerPoint (Microsoft 365) 2610 / 日本語UI', date: '2026-11-01' },
  },
  'V01': {
    edit: { status: 'device', checkedWith: 'After Effects 2026 (26.5)・Premiere Pro 2026 / 日本語UI', date: '2026-11-07', note: '「Jカット／Lカット」は機能名ではなく編集手法（映像と音声の切り替え位置をずらす）' },
    powerpoint: { status: 'device', checkedWith: 'PowerPoint (Microsoft 365) 2610 / 日本語UI', date: '2026-11-01' },
    cg: { status: 'unverified', checkedWith: 'D5 Render 3.1.1 / 英語UI', date: '2026-11-01', note: '記載のLumion・Twinmotionは未確認（D5 Renderでの手順を d5 に記載）', d5: 'D5 Render：1つのクリップに視点（ショット）を複数並べると、ショットの境目でカットになる' },
  },
  'V02': {
    edit: { status: 'mismatch', checkedWith: 'After Effects 2026 (26.5)・Premiere Pro 2026 / 日本語UI', date: '2026-11-07', note: '「ディップ（黒）」というトランジションはない。日本語UIは「暗転」（ビデオトランジション＞ディゾルブ）', fix: 'Premiere Pro：トランジション「クロスディゾルブ」（黒を挟むなら「暗転」）' },
    powerpoint: { status: 'device', checkedWith: 'PowerPoint (Microsoft 365) 2610 / 日本語UI', date: '2026-11-01', note: 'フェードの効果のオプション：スムーズ／黒いスクリーンから' },
    cg: { status: 'unverified', checkedWith: 'D5 Render 3.1.1 / 英語UI', date: '2026-11-01', note: '記載のLumion・Twinmotionは未確認（D5 Renderでの手順を d5 に記載）', d5: 'D5では不可：ショットやクリップの間にトランジション（フェード）を付ける設定がない。書き出した動画を編集ソフトでフェード' },
  },
  'V03': {
    edit: { status: 'device', checkedWith: 'After Effects 2026 (26.5)・Premiere Pro 2026 / 日本語UI', date: '2026-11-07', note: 'Premiere Proの「ワイプ」はレガシーのビデオトランジション。標準の「ワイプ」フォルダーには「リニアワイプ」などがある。After Effectsの「リニアワイプ」も確認' },
    powerpoint: { status: 'device', checkedWith: 'PowerPoint (Microsoft 365) 2610 / 日本語UI', date: '2026-11-01', note: 'ワイプの効果のオプション：右から／上から／左から／下から／右上から／右下から／左上から／左下から' },
  },
  'V04': {
    edit: { status: 'device', checkedWith: 'After Effects 2026 (26.5)・Premiere Pro 2026 / 日本語UI', date: '2026-11-07', note: 'エフェクトコントロール「モーション」の「スケール」' },
    powerpoint: { status: 'device', checkedWith: 'PowerPoint (Microsoft 365) 2610 / 日本語UI', date: '2026-11-01' },
    cg: { status: 'unverified', checkedWith: 'D5 Render 3.1.1 / 英語UI', date: '2026-11-01', note: '記載のLumion・Twinmotionは未確認（D5 Renderでの手順を d5 に記載）', d5: 'D5 Render：動画モードで視点ごとに「FOV (Horizontal)」（または Focal Length）を変え、「↻」で視点を更新' },
  },
  'V05': {
    edit: { status: 'mismatch', checkedWith: 'After Effects 2026 (26.5)・Premiere Pro 2026 / 日本語UI', date: '2026-11-07', note: 'カメラのプロパティ名は「Y 回転」（または「方向」）', fix: 'After Effects：3Dカメラの「Y 回転」（または「方向」）にキー、または画像の位置Xを動かす' },
    powerpoint: { status: 'device', checkedWith: 'PowerPoint (Microsoft 365) 2610 / 日本語UI', date: '2026-11-01', note: 'パンの効果のオプション：下から／右から／左から／上から' },
    cg: { status: 'device', checkedWith: 'SketchUp Pro 2026 (26.2) / 日本語UI + MCP 9876 / D5 Render 3.1.1 / 英語UI', date: '2026-11-01', note: 'シーン間でカメラの向きが滑らかに補間される。Lumion・Twinmotionは未確認', d5: 'D5 Render：テンプレート「Camera Movement」の「Pan Left」／「Pan Right」（その場で向きだけ変える。Start Rotation で角度）' },
  },
  'V06': {
    edit: { status: 'mismatch', checkedWith: 'After Effects 2026 (26.5)・Premiere Pro 2026 / 日本語UI', date: '2026-11-07', note: 'カメラのプロパティ名は「X 回転」', fix: 'After Effects：3Dカメラの「X 回転」にキー（チルトアップ）、または縦長画像の位置Y' },
    powerpoint: { status: 'device', checkedWith: 'PowerPoint (Microsoft 365) 2610 / 日本語UI', date: '2026-11-01' },
    cg: { status: 'device', checkedWith: 'SketchUp Pro 2026 (26.2) / 日本語UI + MCP 9876 / D5 Render 3.1.1 / 英語UI', date: '2026-11-01', note: 'Lumion・Twinmotionは未確認', d5: 'D5 Render：テンプレート「Camera Movement」の「Pan Up」（その場で視線を上げる）' },
  },
  'V07': {
    edit: { status: 'device', checkedWith: 'After Effects 2026 (26.5)・Premiere Pro 2026 / 日本語UI', date: '2026-11-07', note: 'カメラの「Z 位置」' },
    powerpoint: { status: 'device', checkedWith: 'PowerPoint (Microsoft 365) 2610 / 日本語UI', date: '2026-11-01' },
    cg: { status: 'unverified', checkedWith: 'D5 Render 3.1.1 / 英語UI', date: '2026-11-01', note: '記載のLumion・Twinmotion・Enscapeは未確認（D5 Renderでの手順を d5 に記載）', d5: 'D5 Render：テンプレート「Camera Movement」の「Horizontal Push」（Distance で前進量。画角は固定）' },
  },
  'V08': {
    edit: { status: 'mismatch', checkedWith: 'After Effects 2026 (26.5)・Premiere Pro 2026 / 日本語UI', date: '2026-11-07', note: '「軌道（オービット）」というツール名はない。日本語UIは「カーソルのまわりを周回ツール」', fix: 'After Effects：3Dカメラを「カーソルのまわりを周回ツール」で回した位置にキー、またはヌルを親にしてY 回転' },
    powerpoint: { status: 'mismatch', checkedWith: 'PowerPoint (Microsoft 365) 2610 / 日本語UI', date: '2026-11-01', note: '画面切り替え「軌道」はない（日本語UIでは「オービット」）', fix: '画面切り替え「オービット」、または角度違いの画像を「変形」でつなぐ' },
    cg: { status: 'device', checkedWith: 'SketchUp Pro 2026 (26.2) / 日本語UI + MCP 9876 / D5 Render 3.1.1 / 英語UI', date: '2026-11-01', note: 'シーン間の補間は視点位置の直線移動で円軌道ではない。回り込みに見せるには角度を細かく刻む。Lumion・Twinmotionは未確認', d5: 'D5 Render：テンプレート「Camera Movement」の「360° Pan」（Calibre=半径、Circle center height、Movement Degree で回り込む角度）' },
  },
  'V09': {
    edit: { status: 'mismatch', checkedWith: 'After Effects 2026 (26.5)・Premiere Pro 2026 / 日本語UI', date: '2026-11-07', note: '「トラックXY」というツール名はない。日本語UIは「カーソルの下でパンツール」', fix: 'After Effects：3Dカメラを「カーソルの下でパンツール」で横に動かした位置にキー（カメラの「X 位置」）。パン（向きだけ）と違い視差が出る' },
    powerpoint: { status: 'device', checkedWith: 'PowerPoint (Microsoft 365) 2610 / 日本語UI', date: '2026-11-01' },
    cg: { status: 'unverified', checkedWith: 'D5 Render 3.1.1 / 英語UI', date: '2026-11-01', note: '記載のLumion・Twinmotionは未確認（D5 Renderでの手順を d5 に記載）', d5: 'D5 Render：テンプレート「Camera Movement」の「Slide Left」／「Slide Right」（Distance で移動量）' },
  },
  'V10': {
    edit: { status: 'device', checkedWith: 'After Effects 2026 (26.5)・Premiere Pro 2026 / 日本語UI', date: '2026-11-07', note: 'カメラオプションの「被写界深度」「フォーカス距離」、Premiere Proの「ブラー (ガウス)」' },
    powerpoint: { status: 'device', checkedWith: 'PowerPoint (Microsoft 365) 2610 / 日本語UI', date: '2026-11-01', note: 'アート効果は画像のみ（図形は「図として貼り付け」で画像化）。アート効果「ぼかし」は「半径」で強さを調整' },
    cg: { status: 'unverified', checkedWith: 'D5 Render 3.1.1 / 英語UI', date: '2026-11-01', note: '記載のLumion・Twinmotionは未確認（D5 Renderでの手順を d5 に記載）', d5: 'D5 Render：Preference > Widget で「Advanced Camera Tool」を有効にし、「Add Camera」で置いたカメラの「Depth of Field」「Set Focus」「Blur」を設定（動画でピント位置をキー間で変える方法は未確認）' },
  },
  'V11': {
    edit: { status: 'device', checkedWith: 'After Effects 2026 (26.5)・Premiere Pro 2026 / 日本語UI', date: '2026-11-07' },
    powerpoint: { status: 'device', checkedWith: 'PowerPoint (Microsoft 365) 2610 / 日本語UI', date: '2026-11-01' },
    cg: { status: 'device', checkedWith: 'SketchUp Pro 2026 (26.2) / 日本語UI + MCP 9876 / D5 Render 3.1.1 / 英語UI', date: '2026-11-01', note: '断面平面を2枚置きアクティブを切り替えたシーンで、切り口の位置が滑らかに移動する。Twinmotion・Enscapeは未確認', d5: 'D5 Render：Preference > Widget で「Section Tools」を有効にし、「Section」>「Section Plane」を置く。動画モードで断面を選び、Inspector の「◇」で位置・角度をキーフレーム' },
  },
  'V12': {
    edit: { status: 'device', checkedWith: 'After Effects 2026 (26.5)・Premiere Pro 2026 / 日本語UI', date: '2026-11-07' },
    powerpoint: { status: 'mismatch', checkedWith: 'PowerPoint (Microsoft 365) 2610 / 日本語UI', date: '2026-11-01', note: '開始効果「アピール」はない（日本語UIでは「表示」）', fix: '昼の画像に夜の画像を「フェード」で重ね、窓の光の図形を開始効果「表示」で順に表示（「直前の動作の後」で遅延をずらす）' },
    cg: { status: 'device', checkedWith: 'SketchUp Pro 2026 (26.2) / 日本語UI + MCP 9876 / D5 Render 3.1.1 / 英語UI', date: '2026-11-01', note: '影の時刻はシーン間で滑らかに補間される。Lumion・Twinmotionは未確認', d5: 'D5 Render：動画モードで2つ目の視点の Environment「Sky Light」の時刻を夜にして「↻」で更新すると、夕方→夜へ補間される（照明の夜だけ点灯は未確認）' },
  },
  'V13': {
    edit: { status: 'device', checkedWith: 'After Effects 2026 (26.5)・Premiere Pro 2026 / 日本語UI', date: '2026-11-07' },
    powerpoint: { status: 'device', checkedWith: 'PowerPoint (Microsoft 365) 2610 / 日本語UI', date: '2026-11-01' },
    cg: { status: 'device', checkedWith: 'SketchUp Pro 2026 (26.2) / 日本語UI + MCP 9876 / D5 Render 3.1.1 / 英語UI', date: '2026-11-01', note: 'トレイ名は「影」（日付・時刻）。Lumion・Twinmotionは未確認', d5: 'D5 Render：視点ごとに Environment「Sky Light」の時刻を変え、「↻」で更新すると太陽の位置が補間される' },
  },
  'V14': {
    edit: { status: 'device', checkedWith: 'After Effects 2026 (26.5)・Premiere Pro 2026 / 日本語UI', date: '2026-11-07' },
    powerpoint: { status: 'device', checkedWith: 'PowerPoint (Microsoft 365) 2610 / 日本語UI', date: '2026-11-01' },
    cg: { status: 'device', checkedWith: 'SketchUp Pro 2026 (26.2) / 日本語UI + MCP 9876 / D5 Render 3.1.1 / 英語UI', date: '2026-11-01', note: 'タグの表示切り替えは補間されず瞬時に切り替わる（記載どおり段階をシーンで刻む必要あり）', d5: 'D5 Render：テンプレート「Animation」の「Rise」（Edit Objects で対象を選ぶ）。壁を別モデルとして読み込むと段階的に立ち上げられる' },
  },
  'V15': {
    edit: { status: 'device', checkedWith: 'After Effects 2026 (26.5)・Premiere Pro 2026 / 日本語UI', date: '2026-11-07' },
    powerpoint: { status: 'mismatch', checkedWith: 'PowerPoint (Microsoft 365) 2610 / 日本語UI', date: '2026-11-01', note: '「自動で元に戻す」はUIでは「オートリバース」', fix: '各階の図形を「アニメーションの軌跡：直線（上へ）」で階ごとに距離を変えて「直前の動作と同時」に動かし、効果のオプション画面で「オートリバース」をオンにする' },
    cg: { status: 'mismatch', checkedWith: 'SketchUp Pro 2026 (26.2) / 日本語UI + MCP 9876 / D5 Render 3.1.1 / 英語UI', date: '2026-11-01', note: 'グループの位置はシーンに保存されない。複製をタグで切り替えると瞬時に入れ替わり、離れていく動きにはならない。Twinmotionは未確認', fix: 'SketchUp：重ねた状態と上下に離した状態を別タグの複製で用意し、タグの表示を切り替えたシーンを作る（分解アクソメ。切り替えは瞬時なので、途中段階のシーンを足すと動いて見える）／Twinmotion：オブジェクトの「アニメーター（移動）」', d5: 'D5 Render：テンプレート「Animation」の「Ascend」／「Descend」などを階ごとに設定（.skp を1ファイルで読み込むと1モデルになるため、階ごとに別ファイルで読み込む）' },
  },
  'V16': {
    edit: { status: 'mismatch', checkedWith: 'After Effects 2026 (26.5)・Premiere Pro 2026 / 日本語UI', date: '2026-11-07', note: '「カメラ：トラックY」というツール名はない', fix: 'After Effects：3Dカメラの「Y 位置」を上げる（画面上では「カーソルの下でパンツール」で上へ）。手前の木を別レイヤーにすると視差が出る' },
    powerpoint: { status: 'device', checkedWith: 'PowerPoint (Microsoft 365) 2610 / 日本語UI', date: '2026-11-01' },
    cg: { status: 'device', checkedWith: 'SketchUp Pro 2026 (26.2) / 日本語UI + MCP 9876 / D5 Render 3.1.1 / 英語UI', date: '2026-11-01', note: 'Lumion・Twinmotion・Enscapeは未確認', d5: 'D5 Render：テンプレート「Camera Movement」の「Slide Up」＋ショットの「Camera Target」をオン（Focus On で建物を指定）' },
  },
  'V17': {
    edit: { status: 'device', checkedWith: 'After Effects 2026 (26.5)・Premiere Pro 2026 / 日本語UI', date: '2026-11-07' },
    powerpoint: { status: 'device', checkedWith: 'PowerPoint (Microsoft 365) 2610 / 日本語UI', date: '2026-11-01', note: '強調は現在の大きさから変化するため、「大きい状態から100%へ」は画像を拡大して配置し、ユーザー設定で縮小（例：125%で置いて80%）する' },
    cg: { status: 'unverified', checkedWith: 'D5 Render 3.1.1 / 英語UI', date: '2026-11-01', note: '記載のLumion・Twinmotionは未確認（D5 Renderでの手順を d5 に記載）', d5: 'D5 Render：テンプレート「Camera Movement」の「Horizontal Pull」（Distance で後退量）' },
  },
  'V18': {
    edit: { status: 'device', checkedWith: 'After Effects 2026 (26.5)・Premiere Pro 2026 / 日本語UI', date: '2026-11-07' },
    powerpoint: { status: 'device', checkedWith: 'PowerPoint (Microsoft 365) 2610 / 日本語UI', date: '2026-11-01', note: 'ズームの効果のオプション：イン／アウト／ズームと回転' },
    cg: { status: 'mismatch', checkedWith: 'SketchUp Pro 2026 (26.2) / 日本語UI + MCP 9876 / D5 Render 3.1.1 / 英語UI', date: '2026-11-01', note: '「歩行ツール」はUIでは「ウォーク」。Lumion・Twinmotion・Enscapeは未確認', fix: 'Lumion／Twinmotion／Enscape：入口の外から開口を通り、室内まで進むカメラパス（ドアは開けておく）／SketchUp：「ウォーク」ツールの視点でシーンを並べる', d5: 'D5 Render：入口の外→開口→室内の順に「Add Current View」で視点を追加し、「Edit Path」で経路を調整' },
  },
  'V19': {
    edit: { status: 'device', checkedWith: 'After Effects 2026 (26.5)・Premiere Pro 2026 / 日本語UI', date: '2026-11-07', note: 'エフェクト「線」、シェイプの「パスのトリミング」、Premiere Proの「クロスディゾルブ」' },
    powerpoint: { status: 'mismatch', checkedWith: 'PowerPoint (Microsoft 365) 2610 / 日本語UI', date: '2026-11-01', note: '開始効果に「スケッチ」系はない', fix: '線画に開始効果「ワイプ」、続けてレンダー画像を開始効果「フェード」（「直前の動作の後」）' },
    cg: { status: 'mismatch', checkedWith: 'SketchUp Pro 2026 (26.2) / 日本語UI + MCP 9876 / D5 Render 3.1.1 / 英語UI', date: '2026-11-01', note: 'スタイル切り替えは瞬時（背景色だけ補間）で、溶けるようには変わらない。名称はスタイルの「スケッチ エッジ」、面スタイル「テクスチャーで陰影をつける」。Lumionは未確認', fix: 'SketchUp：スタイル「スケッチ エッジ」と、面スタイル「テクスチャーで陰影をつける」のスタイルを切り替えたシーンをつなぐ（切り替えは瞬時。溶けるように見せるなら書き出した2枚を動画編集でクロスフェード）／Lumion：「スケッチ」エフェクトの強さをキー', d5: 'D5 Render：Effect > Style の「Outline mode」で線画風にできる（視点ごとの切り替え・補間は未確認）' },
  },
  'V20': {
    edit: { status: 'device', checkedWith: 'After Effects 2026 (26.5)・Premiere Pro 2026 / 日本語UI', date: '2026-11-07', note: 'エフェクト「ブラー(カメラレンズ)」の「ブラーマップ」にグラデーションのレイヤーを指定' },
    powerpoint: { status: 'mismatch', checkedWith: 'PowerPoint (Microsoft 365) 2610 / 日本語UI', date: '2026-11-01', note: '図の透明度は一様のみで、透明のグラデーションはかけられない', fix: '同じ画像を2枚重ね、上の画像に「アート効果：ぼかし」をかけ、中央を透明から白へのグラデーションで塗った図形を重ねてぼかしの境目をなじませる' },
    cg: { status: 'unverified', checkedWith: 'D5 Render 3.1.1 / 英語UI', date: '2026-11-01', note: '記載のLumion・Twinmotionは未確認（D5 Renderでの手順を d5 に記載）', d5: 'D5では不可：ティルトシフトの機能はない。近い表現は「Add Camera」のカメラで「Depth of Field」の Blur を強め、高い位置から俯瞰' },
  },
  'T01': {
    edit: { status: 'mismatch', checkedWith: 'After Effects 2026 (26.5)・Premiere Pro 2026 / 日本語UI', date: '2026-11-07', note: 'Premiere Pro 2026 のウィンドウメニューに「エッセンシャルグラフィックス」はない（「プロパティ」「グラフィックテンプレート」「テキスト」に分かれている）。After Effectsのプリセット「フェードアップ (文字)」など、「ブラー (ガウス)」は確認', fix: 'After Effects：プリセット「フェードアップ」系、または不透明度＋ブラー（ガウス）／Premiere Pro：テキストを置き、エフェクトコントロール（または「プロパティ」パネル）の「不透明度」にキー' },
    powerpoint: { status: 'device', checkedWith: 'PowerPoint (Microsoft 365) 2610 / 日本語UI', date: '2026-11-01' },
  },
  'T02': {
    edit: { status: 'mismatch', checkedWith: 'After Effects 2026 (26.5)・Premiere Pro 2026 / 日本語UI', date: '2026-11-07', note: 'プリセット名は「タイプライタ」（末尾に長音なし）', fix: 'After Effects：テキストアニメーター（不透明度0＋範囲セレクター）、またはプリセット「タイプライタ」' },
    powerpoint: { status: 'mismatch', checkedWith: 'PowerPoint (Microsoft 365) 2610 / 日本語UI', date: '2026-11-01', note: '開始効果「アピール」はない（「表示」）。「テキストの送り」は効果のオプション画面の「テキストの動作」', fix: '開始効果「表示」＋効果のオプション画面の「テキストの動作：文字単位で表示」（「秒文字間で遅延」を0.05秒程度）' },
  },
  'T03': {
    edit: { status: 'device', checkedWith: 'After Effects 2026 (26.5)・Premiere Pro 2026 / 日本語UI', date: '2026-11-07', note: 'アニメーターの「位置」「不透明度」、範囲セレクターの「オフセット」' },
    powerpoint: { status: 'mismatch', checkedWith: 'PowerPoint (Microsoft 365) 2610 / 日本語UI', date: '2026-11-01', note: '「テキストの送り」は効果のオプション画面の「テキストの動作」', fix: '開始効果「フロートイン」＋効果のオプション画面の「テキストの動作：文字単位で表示」（「%文字間で遅延」を調整）' },
  },
  'T04': {
    edit: { status: 'mismatch', checkedWith: 'After Effects 2026 (26.5)・Premiere Pro 2026 / 日本語UI', date: '2026-11-07', note: '「集合」系のプリセットはない', fix: 'After Effects：テキストアニメーター（位置・回転＋ウィグリーセレクター）を収束させる、またはプリセット「ランダムシャッフルイン」など' },
    powerpoint: { status: 'device', checkedWith: 'PowerPoint (Microsoft 365) 2610 / 日本語UI', date: '2026-11-01', note: 'スライドインの効果のオプション：8方向' },
  },
  'T05': {
    edit: { status: 'device', checkedWith: 'After Effects 2026 (26.5)・Premiere Pro 2026 / 日本語UI', date: '2026-11-07', note: 'トラックマット（アルファマット）。Premiere Proの「クロップ」はレガシーのエフェクトとして残っている（2026ではエフェクトコントロール「モーション」の「切り抜き（下側）」などでも同じことができる）' },
    powerpoint: { status: 'mismatch', checkedWith: 'PowerPoint (Microsoft 365) 2610 / 日本語UI', date: '2026-11-01', note: 'アニメーションをテキストボックス内でトリミングする機能はない', fix: '開始効果「ワイプ」（効果のオプション：下から）' },
  },
  'T06': {
    edit: { status: 'mismatch', checkedWith: 'After Effects 2026 (26.5)・Premiere Pro 2026 / 日本語UI', date: '2026-11-07', note: '「字送り」ではなく、アニメーターのプロパティ名は「トラッキングの量」', fix: 'After Effects：テキストアニメーター「トラッキング」の「トラッキングの量」をキーフレーム／プリセット「トラッキング (拡張)」など' },
    powerpoint: { status: 'mismatch', checkedWith: 'PowerPoint (Microsoft 365) 2610 / 日本語UI', date: '2026-11-01', note: '開始効果に「拡大」はない。近いのは強調「拡大/収縮」の同時再生', fix: '開始効果「フェード」＋強調「拡大/収縮」を「直前の動作と同時」で近い印象に。字間そのものは「変形」で、字間の違う2枚のスライドをつなぐ' },
  },
  'T07': {
    edit: { status: 'device', checkedWith: 'After Effects 2026 (26.5)・Premiere Pro 2026 / 日本語UI', date: '2026-11-07', note: 'シェイプの「パスのトリミング」、エフェクト「線」' },
    powerpoint: { status: 'device', checkedWith: 'PowerPoint (Microsoft 365) 2610 / 日本語UI', date: '2026-11-01', note: '図形の書式→図形の結合（接合／型抜き/合成／切り出し／重なり抽出／単純型抜き）。テキストと図形を一緒に選ぶと使える' },
    cg: { status: 'device', checkedWith: 'SketchUp Pro 2026 (26.2) / 日本語UI + MCP 9876 / D5 Render 3.1.1 / 英語UI', date: '2026-11-01', note: 'スタイル切り替えは瞬時', d5: 'D5 Render：Effect > Style の「Outline mode」で線画風／通常を切り替え（視点ごとの切り替えは未確認）' },
  },
  'T08': {
    edit: { status: 'mismatch', checkedWith: 'After Effects 2026 (26.5)・Premiere Pro 2026 / 日本語UI', date: '2026-11-07', note: 'エフェクト「数値」はない（日本語UIは「番号」）', fix: 'After Effects：エフェクト「番号」、またはテキストのソーステキストにエクスプレッション（スライダー制御で値をキー）' },
    powerpoint: { status: 'device', checkedWith: 'PowerPoint (Microsoft 365) 2610 / 日本語UI', date: '2026-11-01' },
  },
  'T09': {
    edit: { status: 'device', checkedWith: 'After Effects 2026 (26.5)・Premiere Pro 2026 / 日本語UI', date: '2026-11-07' },
    powerpoint: { status: 'mismatch', checkedWith: 'PowerPoint (Microsoft 365) 2610 / 日本語UI', date: '2026-11-01', note: 'ストレッチの方向に「左右」はない（中心から／下から／左から／右から／上から）', fix: '寸法線の図形に開始効果「ストレッチ」（効果のオプション：中心から）、数値に「フェード」を「直前の動作の後」で' },
    cg: { status: 'device', checkedWith: 'SketchUp Pro 2026 (26.2) / 日本語UI + MCP 9876 / D5 Render 3.1.1 / 英語UI', date: '2026-11-01', d5: 'D5では不可：SketchUpの寸法は読み込まれず、D5に寸法ツールもない。書き出した画像・動画に後から追記' },
  },
  'T10': {
    edit: { status: 'device', checkedWith: 'After Effects 2026 (26.5)・Premiere Pro 2026 / 日本語UI', date: '2026-11-07' },
    powerpoint: { status: 'device', checkedWith: 'PowerPoint (Microsoft 365) 2610 / 日本語UI', date: '2026-11-01' },
    cg: { status: 'device', checkedWith: 'SketchUp Pro 2026 (26.2) / 日本語UI + MCP 9876 / D5 Render 3.1.1 / 英語UI', date: '2026-11-01', note: 'Lumion・Twinmotionは未確認', d5: 'D5では不可：SketchUpのテキスト（注記）は読み込まれず、D5に注記ツールもない。書き出した画像・動画に後から追記' },
  },
}
