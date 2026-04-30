import { NextResponse } from "next/server";

const tasks = [
  { id: "t1", user_id: "demo-user", title: "病院予約をする", status: "todo", due_date: "2026-05-01" },
  { id: "t2", user_id: "demo-user", title: "求人1件に応募", status: "todo", due_date: "2026-05-01" },
  { id: "t3", user_id: "demo-user", title: "在留資格の更新書類を確認", status: "in_progress", due_date: "2026-05-03" }
];

export async function GET() {
  return NextResponse.json(tasks);
}
