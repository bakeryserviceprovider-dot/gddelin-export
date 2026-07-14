// GitHub API proxy - avoids CORS and network restrictions
import { NextRequest, NextResponse } from "next/server"

const GITHUB_API = "https://api.github.com"

export async function GET(req: NextRequest) {
  const url = new URL(req.url)
  const path = url.searchParams.get("path")
  const token = url.searchParams.get("token")

  if (!path || !token) {
    return NextResponse.json({ error: "Missing path or token" }, { status: 400 })
  }

  try {
    const res = await fetch(`${GITHUB_API}/repos/bakeryserviceprovider-dot/gddelin-export/contents/${path}?ref=master`, {
      headers: {
        Authorization: `token ${token}`,
        Accept: "application/vnd.github.v3+json",
      },
    })
    const data = await res.json()
    return NextResponse.json(data, { status: res.status })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  const url = new URL(req.url)
  const path = url.searchParams.get("path")
  const token = url.searchParams.get("token")

  if (!path || !token) {
    return NextResponse.json({ error: "Missing path or token" }, { status: 400 })
  }

  try {
    const body = await req.json()
    const res = await fetch(`${GITHUB_API}/repos/bakeryserviceprovider-dot/gddelin-export/contents/${path}?ref=master`, {
      method: "PUT",
      headers: {
        Authorization: `token ${token}`,
        Accept: "application/vnd.github.v3+json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
    const data = await res.json()
    return NextResponse.json(data, { status: res.status })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
