import { NextResponse } from "next/server";
import { StatModel } from "@/lib/models/stats";

export async function POST(req: Request) {
  try {
    const { page, visitorId, userAgent, referrer } = await req.json();

    await StatModel.track({
      page,
      visitorId,
      userAgent,
      referrer,
      timestamp: new Date()
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: 'Failed to track'},
      { status: 500 }
    );
  }
}