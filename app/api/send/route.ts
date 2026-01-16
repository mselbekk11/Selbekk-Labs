import { NextResponse } from "next/server";

export async function GET() {
  try {
    return NextResponse.json({ message: "Hello, world!" });
} catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
