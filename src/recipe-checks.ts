/**
 * 再現情報の実機確認の結果（Windowsスレッドが記録）。
 * - キーは src/recipes.ts の見本の番号に合わせる。
 * - edit は After Effects・Premiere Pro の日本語UIで、名称（エフェクト・プロパティ・プリセット・ツール・パネル）を確認した。動きの再生確認はしていない。
 * - mismatch の fix は、そのまま recipes.ts の該当欄に入れられる文。
 * - cg の d5 は D5 Render で実際に作った手順（recipes.ts の cg 欄へ「D5 Render：…」として追記する想定）。
 * - 第3弾（E01〜E10・V21）は 2026-11-07 に確認。note に「名称の確認」か「動きを確認」かを書いた。
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
  '21': {
    edit: { status: 'device', checkedWith: 'After Effects 2026 (26.5)・Premiere Pro 2026 / 日本語UI', date: '2026-11-07', note: 'After Effects の位置・不透明度のキーと、キーフレーム補助の「イージーイーズ」（F9）。Premiere Pro の「モーション」の位置' },
    powerpoint: { status: 'device', checkedWith: 'PowerPoint (Microsoft 365) 2610 / 日本語UI', date: '2026-11-07', note: '開始効果は「スライドイン」（英語版の Fly In）。効果のオプションは 下から／左下から／左から／左上から／上から／右上から／右から／右下から。「右から」で設定できた。「フェード」を「直前の動作と同時」で重ねられる' },
  },
  '22': {
    edit: { status: 'device', checkedWith: 'After Effects 2026 (26.5)・Premiere Pro 2026 / 日本語UI', date: '2026-11-07', note: 'After Effects のキーフレーム補助に「シーケンスレイヤー...」がある' },
    powerpoint: { status: 'device', checkedWith: 'PowerPoint (Microsoft 365) 2610 / 日本語UI', date: '2026-11-07', note: '「ライズアップ」は「その他の開始効果」にある（第1弾で確認）。遅延は秒で入れられる' },
  },
  '23': {
    edit: { status: 'device', checkedWith: 'After Effects 2026 (26.5)・Premiere Pro 2026 / 日本語UI', date: '2026-11-07', note: 'After Effects の位置（Y 位置）・不透明度のキー' },
    powerpoint: { status: 'device', checkedWith: 'PowerPoint (Microsoft 365) 2610 / 日本語UI', date: '2026-11-07', note: '開始効果「フェード」と開始のタイミング「クリック時」がある' },
  },
  '24': {
    edit: { status: 'device', checkedWith: 'After Effects 2026 (26.5)・Premiere Pro 2026 / 日本語UI', date: '2026-11-07', note: 'After Effects のマスクのプロパティ（マスクパス・マスクの拡張など）と、位置Y・回転のキー' },
    powerpoint: { status: 'device', checkedWith: 'PowerPoint (Microsoft 365) 2610 / 日本語UI', date: '2026-11-07', note: '開始効果「ワイプ」（上から）と軌跡「直線」（効果のオプション：直線(下へ)）を「直前の動作と同時」で組める' },
  },
  '25': {
    edit: { status: 'device', checkedWith: 'After Effects 2026 (26.5)・Premiere Pro 2026 / 日本語UI', date: '2026-11-07', note: 'After Effects の位置Y と平面の不透明度のキー' },
    powerpoint: { status: 'device', checkedWith: 'PowerPoint (Microsoft 365) 2610 / 日本語UI', date: '2026-11-07', note: '開始効果「スライドイン」の効果のオプションに「下から」がある。四角形の透明度は図形の書式で設定' },
  },
  '26': {
    edit: { status: 'device', checkedWith: 'After Effects 2026 (26.5)・Premiere Pro 2026 / 日本語UI', date: '2026-11-07', note: 'After Effects の不透明度とスケールのキー' },
    powerpoint: { status: 'device', checkedWith: 'PowerPoint (Microsoft 365) 2610 / 日本語UI', date: '2026-11-07', note: '画面切り替え「フェード」の効果のオプションは スムーズ／黒いスクリーンから。「スムーズ」・期間 0.3 秒に設定できた' },
  },
  '27': {
    edit: { status: 'device', checkedWith: 'After Effects 2026 (26.5)・Premiere Pro 2026 / 日本語UI', date: '2026-11-07', note: 'After Effects の位置・不透明度のキーと、シェイプのキー' },
    powerpoint: { status: 'device', checkedWith: 'PowerPoint (Microsoft 365) 2610 / 日本語UI', date: '2026-11-07', note: '画面切り替え「プッシュ」（右から）がある。同じ名前の線の幅を変えた2枚に「変形」を設定できた（伸びる見た目は未確認）' },
  },
  '28': {
    edit: { status: 'device', checkedWith: 'After Effects 2026 (26.5)・Premiere Pro 2026 / 日本語UI', date: '2026-11-07', note: 'After Effects のスケール・不透明度のキーに、エクスプレッション loopOut() をエラーなく付けられた' },
    powerpoint: { status: 'device', checkedWith: 'PowerPoint (Microsoft 365) 2610 / 日本語UI', date: '2026-11-07', note: '強調「パルス」があり、効果のダイアログのタイミング「繰り返し」に「スライドの最後まで」がある（ほかに なし／2／3／4／5／10／次のクリックまで）。開始効果「ズーム」と終了効果「フェード」もある' },
  },
  '29': {
    edit: { status: 'device', checkedWith: 'After Effects 2026 (26.5)・Premiere Pro 2026 / 日本語UI', date: '2026-11-07', note: 'After Effects の 3D レイヤーの位置（Z 位置）と不透明度のキー' },
    powerpoint: { status: 'device', checkedWith: 'PowerPoint (Microsoft 365) 2610 / 日本語UI', date: '2026-11-07', note: '軌跡「直線」（直線(上へ)）と強調「透過性」がある。透過性の効果のオプションは 25%／50%／75%／100%（50% で設定）' },
  },
  '30': {
    edit: { status: 'device', checkedWith: 'After Effects 2026 (26.5)・Premiere Pro 2026 / 日本語UI', date: '2026-11-07', note: 'After Effects のシェイプの塗り（不透明度）のキー' },
    powerpoint: { status: 'device', checkedWith: 'PowerPoint (Microsoft 365) 2610 / 日本語UI', date: '2026-11-07', note: '強調「塗りつぶしの色」「透過性」と開始効果「フェード」がある' },
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
  'E01': {
    edit: { status: 'device', checkedWith: 'After Effects 2026 (26.5) / 日本語UI', date: '2026-11-07', note: '「タービュレントディスプレイス」の「展開」に time*40 を入れると値が変わる（0秒=0、1秒=40）。パペットのツール名は「パペット位置ピンツール」' },
    powerpoint: { status: 'device', checkedWith: 'PowerPoint (Microsoft 365) 2610 / 日本語UI', date: '2026-11-07', note: '強調「シーソー」あり。「繰り返し：スライドの最後まで」は効果のオプション画面の「タイミング」タブ' },
    cg: { status: 'device', checkedWith: 'D5 Render 3.1.1 / 英語UI', date: '2026-11-07', note: '見た目も動画で確認（2026-11-07）：Wind を Strength 1 でオンにすると、書き出した動画で葉と枝が揺れる（Wind オフの動画と比べ、葉の部分のフレーム間の差が約4倍。建物は動かない）。動画モードでは、キーフレームを置いた時点の環境（Weather など）がそのキーに記録される。キーを置いたあとで Wind をオンにしても、その動画には反映されなかった。Lumion・Twinmotionは未確認。', d5: 'Environment > Weather の「Wind」をオンにし、Strength（強さ）と Direction（向き）を設定してから、動画モードでカメラのキーフレームを置いて書き出す（キーを置いたあとで変えた環境は、そのキーに入らない）' },
  },
  'E02': {
    edit: { status: 'device', checkedWith: 'After Effects 2026 (26.5) / 日本語UI', date: '2026-11-07', note: '「波形ワープ」の「波形の高さ」「波形の速度」、「ディスプレイスメントマップ」、「コースティック」を確認。名称の確認で、再生での見た目は未確認' },
    powerpoint: { status: 'mismatch', checkedWith: 'PowerPoint (Microsoft 365) 2610 / 日本語UI', date: '2026-11-07', note: '軌跡の方向の表記は「直線（右へ）」。軌跡にはオートリバースと繰り返しを同時に付けられる。強調「透過性」は継続時間が「スライドの最後まで」になり、繰り返しとオートリバースを付けられない（明滅しない）。強調「パルス」は繰り返しを付けられる', fix: '映り込みの画像（上下反転）に軌跡「直線（右へ）」を数pxだけ付け、「オートリバース」と「繰り返し：スライドの最後まで」。水面に細い白線の図形を重ね、強調「パルス」を「繰り返し：スライドの最後まで」で明滅' },
    cg: { status: 'device', checkedWith: 'D5 Render 3.1.1 / 英語UI', date: '2026-11-07', note: '見た目も動画で確認（2026-11-07）：深さ500mmで底と側面を暗くしたプールの水面（上面だけ）に Water マテリアルを貼り、水面すれすれの低い視点から書き出すと、空と壁の映り込みが波で揺れて動く。Calm water dark green（初期値 Normal 0.3・Flow Velocity 0.05）は揺れが小さく、Normal 5・Flow Velocity 1 ではっきり動く。Normal 5 のまま Flow Velocity を 0.05→1 にすると、隣り合うフレームの差が約7倍になり、速さが変わる。Blue pool water（初期値 Normal 0.6・Flow Velocity 0.3）は初期値のままでも動きが見える。Normal は5、Flow Velocity は1までしか入らなかった。前回（浅い水盤・高めの視点）で見えなかった原因が深さか視点かは切り分けていない。Lumion・Twinmotionは未確認。', d5: '水盤の面に Assets > Material > Water の水マテリアル（例：Blue pool water）を貼り、Normal で波の大きさ（最大5）、Flow Velocity で速さ（最大1）を調整。水盤に深さを付けて底を暗くし、水面を低い角度から見ると、映り込みの揺れで波が分かりやすい' },
  },
  'E03': {
    edit: { status: 'device', checkedWith: 'After Effects 2026 (26.5)・Premiere Pro 2026 / 日本語UI', date: '2026-11-07', note: '特別なエフェクト名はない（素材の合成と位置・スケールだけ）' },
    powerpoint: { status: 'mismatch', checkedWith: 'PowerPoint (Microsoft 365) 2610 / 日本語UI', date: '2026-11-07', note: '軌跡の方向の表記は「直線（右へ）」「直線（左へ）」。効果のオプション画面で「滑らかに開始」「滑らかに終了」を0にできる', fix: '人のシルエット（図形または切り抜き画像）に軌跡「直線（右へ）」、奥の人には「直線（左へ）」。継続時間を手前は短く、奥は長くし、「滑らかに開始」「滑らかに終了」を0にして一定の速さで動かす' },
    cg: { status: 'device', checkedWith: 'D5 Render 3.1.1 / 英語UI', date: '2026-11-07', note: 'Lumion・Twinmotionは未確認。Path > Character で引いた線に歩く人物を追加すると、ビューポートで線に沿って歩くことを確認', d5: 'ツールバーの Path > Character で歩かせたい線を引き、Content の＋から歩行アニメーション付きの人物を追加。Density（密度）と Speed で調整し、Road で一方向／双方向を切り替える' },
  },
  'E04': {
    edit: { status: 'device', checkedWith: 'After Effects 2026 (26.5) / 日本語UI', date: '2026-11-07', note: '「フラクタルノイズ」の「展開」を確認。描画モード「乗算」は列挙値で確認し、日本語の表示名は画面で見ていない。名称の確認で、再生での見た目は未確認' },
    powerpoint: { status: 'mismatch', checkedWith: 'PowerPoint (Microsoft 365) 2610 / 日本語UI', date: '2026-11-07', note: '軌跡の方向の表記は「直線（右へ）」。「滑らかに開始」「滑らかに終了」は0にできる', fix: '空の部分に雲の画像を重ね、軌跡「直線（右へ）」を長い継続時間（20秒程度）で、「滑らかに開始」「滑らかに終了」を0に' },
    cg: { status: 'mismatch', checkedWith: 'D5 Render 3.1.1 / 英語UI', date: '2026-11-07', note: 'Lumion・Twinmotionは未確認。雲は Sky ではなく Environment > Weather > Cloud にあり、Global Settings の Speed・Direction で流れる（ビューポートで雲が動くことを確認）', fix: 'D5 Render：環境の「天気」（Weather）の「Cloud」で雲を表示し、Global Settings の Speed（速さ）・Direction（向き）で動かして動画にする／Lumion・Twinmotion：雲の速さ・量を設定', d5: 'Environment > Weather > Cloud をオンにし（種類と Amount で量）、Global Settings の Speed と Direction で流れを設定。動画モードでカメラを止めて書き出す' },
  },
  'E05': {
    edit: { status: 'device', checkedWith: 'After Effects 2026 (26.5) / 日本語UI', date: '2026-11-07', note: '「フラクタルノイズ」「しきい値」「レベル補正」を確認。描画モード「スクリーン」「加算」は列挙値で確認し、日本語の表示名は画面で見ていない。名称の確認で、再生での見た目は未確認' },
    powerpoint: { status: 'mismatch', checkedWith: 'PowerPoint (Microsoft 365) 2610 / 日本語UI', date: '2026-11-07', note: '強調「透過性」には繰り返しとオートリバースを付けられない（継続時間が「スライドの最後まで」になる）。強調「パルス」は繰り返しを付けられる', fix: 'ぼかした楕円（光の色、透過50%程度）をいくつか重ね、強調「パルス」を「繰り返し：スライドの最後まで」で。継続時間を楕円ごとに変える' },
    cg: { status: 'device', checkedWith: 'D5 Render 3.1.1 / 英語UI', date: '2026-11-07', note: '見た目も動画で確認（2026-11-07）：四方に窓のある箱（室内）の外に揺れる木（Acer truncatum 01、Filter の Dynamic）を置き、Geo Sky を15時台・North Offset 90° にすると、窓から入った日だまりの中に葉の影（木漏れ日）が落ちる。Wind（Strength 1）オンの動画では床の木漏れ日が揺れ、オフの動画では止まっている（日だまり部分のフレーム間の差：オン約4.4、オフ約0.8）。屋外の地面の影も前回 Wind で揺れることを確認済み。North Offset は 0〜180° の範囲でしか入らず、日差しの向きは時刻と組み合わせて合わせる。編集画面のビューポートでは室内の日だまりがはっきり出ないことがあり、静止画を書き出して日差しの入る窓を確かめた。Lumion・Twinmotionは未確認。', d5: '窓の外に揺れる木（Assets > Model > Nature、Filter で Dynamic）を置き、Geo Sky の時刻と North Offset（0〜180°）で日差しが窓から室内に入る向きにする（ビューポートで分かりにくいときは静止画を書き出して確かめる）。動画モード側でも時刻・North Offset を合わせ、Environment > Weather > Wind をオンにしてからキーフレームを置いて書き出す' },
  },
  'E06': {
    edit: { status: 'mismatch', checkedWith: 'After Effects 2026 (26.5) / 日本語UI', date: '2026-11-07', note: '「CC Rainfall」の設定名は英語（Drops・Size・Speed・Wind など）で、「角度」という項目はない（雨の傾きは Wind）。「トーンカーブ」は確認', fix: 'After Effects：エフェクト「CC Rainfall」（Drops で量、Speed で速さ、Wind で傾き）を重ね、地面には小さな波紋の素材を合成。空と外観は「トーンカーブ」で暗く、彩度を少し下げる' },
    powerpoint: { status: 'mismatch', checkedWith: 'PowerPoint (Microsoft 365) 2610 / 日本語UI', date: '2026-11-07', note: '動画の繰り返しは再生タブの「停止するまで繰り返す」。ビデオ形式タブの「色」には「透明色を指定」がなく、黒背景の動画を透過できない（黒背景の仮の動画で確認）', fix: '雨のストック動画を挿入し、再生タブで「停止するまで繰り返す」（動画には「透明色を指定」が使えないので、黒背景の動画はパースの上に重ねられない。パースと合成済みの動画を使う）。PowerPointの効果だけで雨を作るのは難しい' },
    cg: { status: 'device', checkedWith: 'D5 Render 3.1.1 / 英語UI', date: '2026-11-07', note: 'Lumion・Twinmotionは未確認。Weather > Precipitation で雨が降り、地面に水たまりが出ることをビューポートで確認', d5: 'Environment > Weather > Precipitation をオンにし、Rain／Snow のスライダーを Rain 側に。Strength（強さ）・Puddle（水たまり）・Raindrop Transparency で調整' },
  },
  'E07': {
    edit: { status: 'device', checkedWith: 'After Effects 2026 (26.5) / 日本語UI', date: '2026-11-07', note: '「CC Snowfall」の設定名は英語（Flakes＝量、Size＝大きさ、Speed＝速さ、Wiggle＝揺れ）。名称の確認で、再生での見た目は未確認' },
    powerpoint: { status: 'mismatch', checkedWith: 'PowerPoint (Microsoft 365) 2610 / 日本語UI', date: '2026-11-07', note: '動画の繰り返しは再生タブの「停止するまで繰り返す」。動画の背景は透過できない。軌跡の方向の表記は「直線（下へ）」', fix: '雪のストック動画を挿入し、再生タブで「停止するまで繰り返す」（背景を透過できないので、パースと合成済みの動画を使う）。図形で作るなら、白い小さな円に軌跡「直線（下へ）」を、円ごとに継続時間と開始を変える' },
    cg: { status: 'mismatch', checkedWith: 'D5 Render 3.1.1 / 英語UI', date: '2026-11-07', note: '見た目も動画で確認（2026-11-07）：Precipitation をオンにしてスライダーを Snow 側に寄せると、雪が降る。積雪の調整項目はないが、D5 の地形（Terrain）が白っぽくなった（モデル側の面が白くなるかは見分けられなかった）。スライダーが中間だと雨と雪が混ざる。Lumion・Twinmotionは未確認。', fix: 'D5 Render：環境の「天気」（Weather）の「Precipitation」を雪（Snow）側にして降らせる（積雪の調整項目はないが、地形は白っぽくなる。建物の屋根や舗装を白く見せるのは別に作る）／Lumion・Twinmotion：天気の雪と積雪', d5: 'Environment > Weather > Precipitation をオンにし、Rain／Snow のスライダーを Snow 側の端に。Strength と Snow Flake Size で量と大きさを調整し、動画モードでキーフレームを置いて書き出す' },
  },
  'E08': {
    edit: { status: 'device', checkedWith: 'After Effects 2026 (26.5) / 日本語UI', date: '2026-11-07', note: '「エコー」（エコー時間・エコーの数・減衰）、「グロー」を確認。名称の確認で、再生での見た目は未確認' },
    powerpoint: { status: 'mismatch', checkedWith: 'PowerPoint (Microsoft 365) 2610 / 日本語UI', date: '2026-11-07', note: '開始効果「ワイプ」（左から）、終了効果「ワイプ」、「直前の動作の後」はある。ただし開始と終了の組をまとめて繰り返す設定はない（「繰り返し」は効果ごと）。スライドショーの設定に「Esc キーが押されるまで繰り返す」がある', fix: '道路の上に細い光の線（グラデーション）を置き、開始効果「ワイプ」（効果のオプション：左から）と終了効果「ワイプ」を「直前の動作の後」で続ける。赤い線は逆向き。繰り返し流すなら、スライドの切り替えを自動にし、スライドショーの設定で「Esc キーが押されるまで繰り返す」' },
    cg: { status: 'mismatch', checkedWith: 'D5 Render 3.1.1 / 英語UI', date: '2026-11-07', note: '見た目も動画で確認（2026-11-07）：切り分けの結果、前回車が映らなかったのはパスが短すぎたため。舗装の上に引いた短い Vehicle パスでは、Density を上げても、車を別の無料素材（白いSUV「SUV 03」）に替えても、通常の画面でも車が現れなかった。地形の上・舗装の上に長いパス（画面を横切る長さ）を引き直すと、SUV 03 が通常の画面でも動画でも走った（昼の動画で確認）。続けて動画モード側で時刻を22時台にし、パスの Specified で Light をオンにすると、ヘッドライトとテールランプが点いた車が走る（夜の動画で確認）。前回の New energy Car 03 は長いパスでは試していない。Lumion・Twinmotionは未確認。', fix: 'D5 Render：Path > Vehicle で道路に沿って十分な長さの線を引き（短い線では車が現れない）、Content の＋から車を追加（Speed で速さ、Specified の Light でライト）。動画モード側で時刻を夜にしてからキーフレームを置いて書き出す。光跡は書き出した動画に編集ソフトで「エコー」などを足す／Lumion・Twinmotion：車の経路（パス）', d5: 'Path > Vehicle で道路に沿って長めの線を引き（画面を横切る程度。短い線では車が現れなかった）、Content の＋から車を追加。Specified の Light をオンにし、動画モード側で Geo Sky の時刻を夜にしてからキーフレームを置いて書き出す。光跡は書き出した動画に編集ソフトで「エコー」などを足す' },
  },
  'E09': {
    edit: { status: 'device', checkedWith: 'After Effects 2026 (26.5) / 日本語UI', date: '2026-11-07', note: '「フラクタルノイズ」の「展開」を確認。描画モード「スクリーン」は列挙値で確認。名称の確認で、再生での見た目は未確認' },
    powerpoint: { status: 'mismatch', checkedWith: 'PowerPoint (Microsoft 365) 2610 / 日本語UI', date: '2026-11-07', note: '軌跡の方向の表記は「直線（左へ）」。オートリバースと繰り返しは同時に付けられる', fix: 'ぼかした白い楕円（透過40〜60%）を地面近くに重ね、軌跡「直線（左へ）」を数十pxだけ、「オートリバース」と「繰り返し：スライドの最後まで」で' },
    cg: { status: 'device', checkedWith: 'D5 Render 3.1.1 / 英語UI', date: '2026-11-07', note: '見た目も動画で確認（2026-11-07）：Fog の Density を 0.1 と 1 にしたキーフレーム2つで書き出すと、再生中に霧が少しずつ濃くなる（補間される。地平線付近のコントラストが3秒で滑らかに下がった）。動画モードでは、キーフレームを置いた時点の環境（Weather など）がそのキーに記録される。Lumion・Twinmotionは未確認。', d5: 'Environment > Weather > Fog をオンにし Density を低くして1つ目のキーフレームを置く。次に Density を上げてから2つ目のキーフレームを置く（環境はキーを置いた時点の値が入る）。Height・Base Height・Start Distance で霧の高さを調整' },
  },
  'E10': {
    edit: { status: 'device', checkedWith: 'After Effects 2026 (26.5)・Premiere Pro 2026 / 日本語UI', date: '2026-11-07', note: '「色相/彩度」を確認。Premiere Pro の「クロスディゾルブ」は第2弾で確認済み' },
    powerpoint: { status: 'device', checkedWith: 'PowerPoint (Microsoft 365) 2610 / 日本語UI', date: '2026-11-07', note: '画面切り替え「フェード」「変形」を確認' },
    cg: { status: 'mismatch', checkedWith: 'D5 Render 3.1.1 / 英語UI', date: '2026-11-07', note: '見た目も動画で確認（2026-11-07）：季節対応の植栽（Acer truncatum 01。Assets の Filter で Seasonal を選ぶと絞り込める）で、Seasonal Vegetation の State を 150（緑）と 300（黄葉）にしたキーフレーム2つで書き出すと、葉の色が少しずつ変わる（補間される）。State 1 では葉がない。季節の設定名は「Seasonal Vegetation」で値は State（第3弾の mismatch のまま）。Lumion・Twinmotionは未確認。', fix: 'D5 Render：環境の「Seasonal Vegetation」をオンにし、State を変えた視点を並べるか、動画のキーフレームで State を変えて葉の色を少しずつ変える（季節の変化に対応した植栽素材だけが変わる）／Lumion・Twinmotion：季節や葉の色の設定を変えた画像を並べる', d5: '季節対応の植栽を置き（Assets の Filter で Seasonal）、Environment > Weather > Seasonal Vegetation をオンにする。State の値を変えて視点を並べるか、動画モードで State を変えたキーフレームを2つ置く' },
  },
  'V21': {
    edit: { status: 'device', checkedWith: 'After Effects 2026 (26.5) / 日本語UI', date: '2026-11-07', note: '「リニアワイプ」、シェイプの「パスのトリミング」（第2弾で確認済み）' },
    powerpoint: { status: 'device', checkedWith: 'PowerPoint (Microsoft 365) 2610 / 日本語UI', date: '2026-11-07', note: '開始効果「ワイプ」の方向は 下から／左から／右から／上から。「フェード」と「直前の動作の後」も確認' },
    cg: { status: 'device', checkedWith: 'SketchUp Pro 2026 (26.2) / 日本語UI + MCP 9876 / D5 Render 3.1.1 / 英語UI', date: '2026-11-07', note: 'SketchUp：構造・設備・仕上げをタグで分けたモデル（mm）で、表示タグを1つずつ増やしたシーンを3つ作り、遷移（5秒）の途中でもタグの表示が瞬時に切り替わる（補間されない）ことを確認。Navisworks は閲覧用の Freedom 2027 だけが入っていて、ホームタブに「TimeLiner プレイバック」がある（TimeLiner を作るには Manage／Simulate が必要。未導入）。D5 は見た目も画像で確認（2026-11-07）：3つの .skp を読み込んで重ね、Object リストの目のアイコンで表示を切り替えて、構造／構造＋設備／全体の3枚を書き出せた。D5 では読み込んだモデルの基準点が箱の下の中央になるため、同じ Location では重ならず、SketchUp 上の位置の差を Location に入れて揃えた。仕上げの半透明ガラスは D5 では暗いガラスになった。Lumion・Twinmotionは未確認', d5: '構造・設備・仕上げを別々の .skp で書き出して順に読み込むと、Object リストに別のモデルとして入る。D5 では各モデルの基準点が箱の下の中央になるので、Inspector の Location に SketchUp 上の位置の差を入れて重ねる。Object リストの目のアイコンで表示を切り替え、段階ごとに画像（または動画）を書き出して編集ソフトで重ねる' },
  },  'V22': {
    edit: { status: 'device', checkedWith: 'After Effects 2026 (26.5)・Premiere Pro 2026 / 日本語UI', date: '2026-11-07', note: 'Premiere Pro のエフェクトコントロール「モーション」の「位置」「スケール」（第2弾で確認）。合わせた見た目は未確認' },
    powerpoint: { status: 'device', checkedWith: 'PowerPoint (Microsoft 365) 2610 / 日本語UI', date: '2026-11-07', note: '画面切り替え「フェード」の期間を 0.3 秒にできることを確認（「なし」も既定で選べる）。2枚の丸い形を同じ位置・大きさに置いて設定。つながりの見た目は未確認' },
  },
  'V23': {
    edit: { status: 'device', checkedWith: 'After Effects 2026 (26.5)・Premiere Pro 2026 / 日本語UI', date: '2026-11-07', note: 'After Effects の「ブラー(方向）」（表示はこのかっこの組み合わせ）に「方向」「ブラーの長さ」がある。Premiere Pro では「ブラー (方向) (FX)」（ブラー＆シャープ）' },
    powerpoint: { status: 'device', checkedWith: 'PowerPoint (Microsoft 365) 2610 / 日本語UI', date: '2026-11-07', note: '画面切り替え「プッシュ」の効果のオプションは 下から／左から／右から／上から。「右から」・期間 0.3 秒に設定できた' },
  },
  'V24': {
    edit: { status: 'device', checkedWith: 'After Effects 2026 (26.5)・Premiere Pro 2026 / 日本語UI', date: '2026-11-07', note: 'Premiere Pro の「アイリス (円形)」はレガシーのビデオトランジション（ほかに アイリス (クロス)／(ダイヤモンド)／(正方形)）。中心を動かせるかは未確認。After Effects のマスクのプロパティは「マスクの拡張」' },
    powerpoint: { status: 'device', checkedWith: 'PowerPoint (Microsoft 365) 2610 / 日本語UI', date: '2026-11-07', note: '画面切り替え「図形」の効果のオプションに「円」がある（ほかに ひし形／プラス／イン／アウト）' },
  },
  'V25': {
    edit: { status: 'device', checkedWith: 'After Effects 2026 (26.5)・Premiere Pro 2026 / 日本語UI', date: '2026-11-07', note: 'Premiere Pro の「ホワイトアウト」はビデオトランジションの「ディゾルブ」にある（レガシー版もある）。After Effects の「露光量」（カラー補正）に「露出」がある' },
    powerpoint: { status: 'device', checkedWith: 'PowerPoint (Microsoft 365) 2610 / 日本語UI', date: '2026-11-07', note: '画面切り替え「フラッシュ」がある（効果のオプションはない）。白く光る見た目は未確認' },
  },
  'V26': {
    edit: { status: 'device', checkedWith: 'After Effects 2026 (26.5)・Premiere Pro 2026 / 日本語UI', date: '2026-11-07', note: 'Premiere Pro の「クロップ」はレガシーのビデオエフェクトとして残っている（エフェクトコントロール「モーション」の切り抜きでも同じことができる。第2弾で確認）' },
    powerpoint: { status: 'device', checkedWith: 'PowerPoint (Microsoft 365) 2610 / 日本語UI', date: '2026-11-07', note: '開始効果「ワイプ」の方向は 下から／左から／右から／上から（第1弾で確認）。開始のタイミング「直前の動作の後」がある' },
  },
  'V27': {
    edit: { status: 'device', checkedWith: 'After Effects 2026 (26.5)・Premiere Pro 2026 / 日本語UI', date: '2026-11-07', note: 'After Effects の 3D カメラの「カメラオプション」に「ズーム」がある。カメラの位置（Z）とズームに同じ時間でキーを2つずつ打てた（ドリーズームの見た目は未確認）' },
    powerpoint: { status: 'device', checkedWith: 'PowerPoint (Microsoft 365) 2610 / 日本語UI', date: '2026-11-07', note: '強調「拡大/収縮」のサイズはユーザー設定で％を入れられる（第1弾で確認）。重ねた画像は動かさなければそのまま' },
  },
  'V28': {
    edit: { status: 'device', checkedWith: 'After Effects 2026 (26.5)・Premiere Pro 2026 / 日本語UI', date: '2026-11-07', note: 'After Effects の「ブラー (ガウス)」（ブラー＆シャープ）' },
    powerpoint: { status: 'device', checkedWith: 'PowerPoint (Microsoft 365) 2610 / 日本語UI', date: '2026-11-07', note: '終了効果「スライドアウト」がある。効果のオプションは 下へ／左下へ／左へ／左上へ／上へ／右上へ／右へ／右下へ（「左へ」で設定）。強調「拡大/収縮」と「直前の動作と同時」で組める' },
  },
  'V29': {
    edit: { status: 'device', checkedWith: 'After Effects 2026 (26.5)・Premiere Pro 2026 / 日本語UI', date: '2026-11-07', note: 'After Effects の 3D レイヤーのトランスフォームに「X 回転」がある。「クロスディゾルブ」は Premiere Pro のビデオトランジション「ディゾルブ」' },
    powerpoint: { status: 'device', checkedWith: 'PowerPoint (Microsoft 365) 2610 / 日本語UI', date: '2026-11-07', note: '画面切り替え「ズーム」（はなやか）があり、効果のオプションは イン／アウト／ズーム回転。「変形」もある' },
  },
  'V30': {
    edit: { status: 'device', checkedWith: 'After Effects 2026 (26.5)・Premiere Pro 2026 / 日本語UI', date: '2026-11-07', note: 'Premiere Pro のクリップメニュー「速度・デュレーション」（Ctrl+R）、エフェクト「ワープスタビライザー」（ビデオエフェクトの「ゆがみ」）。After Effects にも「ワープスタビライザー」（ディストーション）がある' },
    powerpoint: { status: 'device', checkedWith: 'PowerPoint (Microsoft 365) 2610 / 日本語UI', date: '2026-11-07', note: '画面切り替え「なし」で「自動」に 0.2 秒（00:00.20）を設定できた' },
  },
  'V31': {
    edit: { status: 'device', checkedWith: 'After Effects 2026 (26.5)・Premiere Pro 2026 / 日本語UI', date: '2026-11-07', note: 'Premiere Pro のビデオトランジション「ディゾルブ」に「クロスディゾルブ」がある' },
    powerpoint: { status: 'device', checkedWith: 'PowerPoint (Microsoft 365) 2610 / 日本語UI', date: '2026-11-07', note: '開始効果「フェード」と「直前の動作の後」、画面切り替え「フェード」がある' },
  },
  'V32': {
    edit: { status: 'device', checkedWith: 'After Effects 2026 (26.5)・Premiere Pro 2026 / 日本語UI', date: '2026-11-07', note: 'After Effects の「リニアワイプ」（トランジション）に「変換終了」「ワイプ角度」「境界のぼかし」がある' },
    powerpoint: { status: 'device', checkedWith: 'PowerPoint (Microsoft 365) 2610 / 日本語UI', date: '2026-11-07', note: '開始効果「ワイプ」（左から）と「直前の動作の後」がある' },
  },
  'V33': {
    edit: { status: 'device', checkedWith: 'After Effects 2026 (26.5)・Premiere Pro 2026 / 日本語UI', date: '2026-11-07', note: 'After Effects のシェイプの「線」の「破線」に「線分」「間隔」「オフセット」、「パスのトリミング」に「開始点」「終了点」「オフセット」がある' },
    powerpoint: { status: 'device', checkedWith: 'PowerPoint (Microsoft 365) 2610 / 日本語UI', date: '2026-11-07', note: '開始効果「ワイプ」の方向は 下から／左から／右から／上から の4つだけで、曲線に沿っては伸びない（矢印の大まかな向きに近い方向を選ぶ）' },
  },

}
