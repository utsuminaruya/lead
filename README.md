# Mediflow (外国人労働者向け生活・就労支援OS)

日本で働く外国人向けに、次にやるべき行動をすぐ実行できる MVP です。

## 機能
- ログインUI（メール / Google）
- ダッシュボード（今日のタスク表示）
- チャットAI（次アクション提案）
- 求人検索（地域・職種・日本語レベル）
- 応募API連携（POST /apply）
- 生活サポート導線（病院 / 住居 / ビザ）
- 日本語学習（レベル別リンク枠 + クイズ予告）
- 多言語切替（日本語・ベトナム語・英語）

## 技術スタック
- Next.js (App Router)
- TypeScript (strict)
- Tailwind CSS
- Supabase SDK（将来接続用）

## セットアップ
```bash
npm install
npm run dev
```

## API
- `GET /api/jobs` 求人一覧取得
- `POST /api/apply` 応募処理
- `GET /api/tasks` ユーザータスク取得

## プロジェクト構成
```text
app/
  api/
    apply/route.ts
    jobs/route.ts
    tasks/route.ts
  globals.css
  layout.tsx
  page.tsx
components/ui/
lib/
  locale.ts
```

## 備考
- 現在はMVPのため、APIはモックデータを返します。
- Supabase 本番接続時は API Route 内で置き換えてください。
