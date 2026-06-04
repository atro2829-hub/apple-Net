import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: "Apple.NET API v1.0" });
}
