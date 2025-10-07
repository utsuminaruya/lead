
# Care Lead MVP（JA/VI）— 修正版 v1.1
- トップ画面のイメージ画像を**削除**しました。
- 診断フローに**ステップ7（連絡先＋送信ボタン）**を追加しました。
- 送信直後に**即時メッセージ（バナー）**を表示します。LINE/Messenger CTAを強調。

## セットアップ
```
npm i
npm run dev
```
Vercel へのデプロイ手順は前版と同様。`.env.local` が未設定でもログ保存モードで完了画面まで動作します。

## 環境変数（任意）
```
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
SUPABASE_TABLE=leads
```
