import { type NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { x, y, models } = body

    if (!Array.isArray(x) || !Array.isArray(y) || x.length !== y.length || x.length === 0) {
      return NextResponse.json({ error: "Invalid x/y data" }, { status: 400 })
    }

    // In production on Vercel, this would call the Python function
    // For local dev, return a helpful message
    return NextResponse.json(
      {
        error:
          "Python runtime not available in local dev. Use 'Fit (Local · Pyodide)' button or deploy to Vercel for server-side Python.",
      },
      { status: 501 },
    )
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "Server error" }, { status: 500 })
  }
}
