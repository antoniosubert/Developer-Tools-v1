import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    const startTime = Date.now();

    try {
      const response = await fetch(url, {
        method: "HEAD",
        cache: "no-store",
      });

      const endTime = Date.now();
      const latency = endTime - startTime;

      return NextResponse.json({
        latency,
        status: response.status,
      });
    } catch (_error) {
      return NextResponse.json(
        { error: "Failed to reach the URL" },
        { status: 500 }
      );
    }
  } catch (_error) {
    return NextResponse.json(
      { error: "Invalid request format" },
      { status: 400 }
    );
  }
}
