import { NextResponse } from "next/server";
import { StatModel } from "@/lib/models/stats";

export async function GET() {
  try {
    const stats = await StatModel.getDailyStats();
    return NextResponse.json(stats);
  } catch {
    return NextResponse.json({ error: "Failed to get stats" }, { status: 500 });
  }
}