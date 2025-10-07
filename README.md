
# Care Lead MVP（JA/VI）

**目的：** ベトナム人を中心とした外国人求職者の**リード獲得**に特化した、30秒の診断＋連絡先取得ツール。**UI/UX要件：**
- 仕事選択は **「介護職／看護助手／その他」だけ**（ご要望反映）
- **介護事業者向けボタン**は表示しません（ご要望反映）
- **紹介施設や登録候補者の数字**などのカウンター表示は入れていません（ご要望反映）
- JA/VI の **自然な翻訳**（不自然な訳語は修正）
- CTA は **LINE（求職者用）** と **Messenger** のみ

---

## 1. クイックスタート

```bash
# 1) 依存関係をインストール
npm i

# 2) 開発起動
npm run dev
```

ローカル: http://localhost:3000

---

## 2. 環境変数（任意）

Supabaseに保存する場合は `.env.local` を作成してください。

```bash
SUPABASE_URL=あなたのSupabase URL
SUPABASE_SERVICE_ROLE_KEY=あなたのService Role Key（サーバー専用）
SUPABASE_TABLE=leads
```

> 環境変数が未設定でも、**受信データはサーバーログに記録**され、フロントは正常に完了画面まで動作します。

Supabaseテーブル例：

```sql
create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  lang text,
  job text,
  visa text,
  pref text,
  jlpt text,
  exp text,
  housing text,
  name text,
  contact text,
  email text,
  ua text,
  ts timestamptz
);
```

RLS は必要に応じて `auth.role() = 'service_role'` 専用API として利用してください。

---

## 3. デザイン方針

- Tailwind のみで **軽量・高速**。shadcn/ui風の薄いUIラッパーを同梱（依存ゼロ）。
- **視線誘導**と**1タップ完結**を重視。6ステップで確実に離脱を抑制。  
- **翻訳は用語統一**（例：介護職=Nhân viên điều dưỡng / 看護助手=Phụ tá điều dưỡng）。

---

## 4. デプロイ（Vercel）

1. GitHub リポジトリにプッシュ  
2. Vercel でインポート（Framework = Next.js）  
3. 環境変数がある場合は **Project Settings → Environment Variables** に設定  
4. デプロイ完了

---

## 5. カスタマイズ

- CTAリンクは `app/page.tsx` の `LINE_URL` と `MESSENGER_URL` を編集
- 色は `tailwind.config.ts` 内 `colors.brand` を調整
- 文言は `lib/locale.ts` を編集（JA/VI）

---

## 6. ライセンス
商用利用可（本プロジェクト専用）。
