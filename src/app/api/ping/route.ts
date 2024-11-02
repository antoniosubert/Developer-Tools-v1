import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    const startTime = Date.now();
    const response = await fetch(url);
    const endTime = Date.now();

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to ping URL" },
        { status: response.status }
      );
    }

    return NextResponse.json({
      latency: endTime - startTime,
      status: response.status,
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to ping URL" }, { status: 500 });
  }
}
