import { NextResponse } from "next/server";
import { LeadModel } from "@/lib/models/lead";

export async function POST(req: Request) {
  try {
    const {
      name,
      email,
      phone,
      message
    } = await req.json();

    if (!name || !email || !phone) {
      return NextResponse.json(
        {error: "Name, email and phone are required"},
        { status: 400 }
      )
    }
    await LeadModel.create({
      name,
      email,
      phone,
      message
    });
    return NextResponse.json({ success: true, message: "Заявка отправлена" });
  } catch {
    return NextResponse.json(
      { error: "Failed to create lead" },
      { status: 500 }
    );
  }
}