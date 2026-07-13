// ============================================================
// GitHub OAuth for Decap CMS
// ============================================================
// To use this, create a GitHub OAuth App at:
// https://github.com/settings/developers
//
// Homepage URL: https://aquachilltech.com
// Authorization callback URL: https://aquachilltech.com/api/auth
// Then set these Vercel environment variables:
//   GITHUB_CLIENT_ID
//   GITHUB_CLIENT_SECRET

import { NextRequest, NextResponse } from "next/server"

const CLIENT_ID = process.env.GITHUB_CLIENT_ID || ""
const CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET || ""

export async function GET(req: NextRequest) {
  const url = new URL(req.url)
  const code = url.searchParams.get("code")

  // Step 1: Redirect to GitHub OAuth if no code
  if (!code) {
    const redirectUri = `${url.origin}/api/auth`
    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${redirectUri}&scope=repo,user`
    return NextResponse.redirect(githubAuthUrl)
  }

  // Step 2: Exchange code for access token
  try {
    const tokenResponse = await fetch(
      "https://github.com/login/oauth/access_token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          client_id: CLIENT_ID,
          client_secret: CLIENT_SECRET,
          code,
        }),
      }
    )

    const data = await tokenResponse.json()

    if (data.error) {
      return new Response(`OAuth Error: ${data.error_description || data.error}`, {
        status: 400,
      })
    }

    // Return HTML page that passes token to Decap CMS
    return new Response(
      `
      <!DOCTYPE html>
      <html>
      <head><meta charset="utf-8"><title>Authenticated</title></head>
      <body>
        <p>Authentication successful! You can close this window.</p>
        <script>
          window.opener.postMessage(
            { type: 'authorization', provider: 'github', token: '${data.access_token}' },
            window.origin
          );
          window.close();
        </script>
      </body>
      </html>
      `,
      {
        headers: { "Content-Type": "text/html" },
      }
    )
  } catch (error) {
    console.error("OAuth error:", error)
    return new Response("Authentication failed. Please try again.", { status: 500 })
  }
}
