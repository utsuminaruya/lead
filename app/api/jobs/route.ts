import { NextResponse } from "next/server";

const jobs = [
  { id: "1", title: "介護スタッフ", location: "Tokyo", salary: "¥240,000", requirement: "JLPT N4+" },
  { id: "2", title: "看護助手", location: "Kanagawa", salary: "¥230,000", requirement: "JLPT N3+" },
  { id: "3", title: "食品製造", location: "Chiba", salary: "¥220,000", requirement: "JLPT N5+" }
];

export async function GET() {
  return NextResponse.json(jobs);
}
