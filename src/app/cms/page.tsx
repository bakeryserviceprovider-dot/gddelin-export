"use client"

import { useState, useEffect } from "react"

const REPO = "bakeryserviceprovider-dot/gddelin-export"
const TOKEN_KEY = "gh_token"

// Use our own API proxy instead of direct GitHub API (avoids China network restrictions)
const API_PROXY = "/api/github?token="

export default function CMSPage() {
  const [token, setToken] = useState("")
  const [authed, setAuthed] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [page, setPage] = useState<"dashboard" | "editor">("dashboard")
  const [editingPath, setEditingPath] = useState("")
  const [content, setContent] = useState("")
  const [fileSha, setFileSha] = useState("")
  const [msg, setMsg] = useState<{ text: string; ok: boolean } | null>(null)
  const [busy, setBusy] = useState(false)

  // Load token from localStorage after hydration
  useEffect(() => {
    const saved = localStorage.getItem(TOKEN_KEY)
    if (saved) {
      setToken(saved)
      setAuthed(true)
    }
    setLoaded(true)
  }, [])

  function show(text: string, ok = false) {
    setMsg({ text, ok })
    setTimeout(() => setMsg(null), 8000)
  }

  async function loadFile(path: string) {
    setBusy(true)
    show("Loading...")
    try {
      const res = await fetch(`${API_PROXY}${encodeURIComponent(token)}&path=${encodeURIComponent(path)}`)
      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.message || `HTTP ${res.status}`)
      }
      const data = await res.json()
      // Decode base64 content (GitHub returns base64 with line breaks)
      const decoded = decodeURIComponent(escape(atob(data.content.replace(/\n/g, ""))))
      setContent(decoded)
      setFileSha(data.sha)
      setEditingPath(path)
      setPage("editor")
      setMsg(null)
    } catch (e: any) {
      show("⚠️ " + (e.message || "Failed to load file"))
    }
    setBusy(false)
  }

  async function saveFile() {
    if (!editingPath) return
    setBusy(true)
    show("Saving to GitHub...")
    try {
      // Encode content properly for GitHub API (base64)
      const encoded = btoa(unescape(encodeURIComponent(content)))
      const body: any = {
        message: `Update ${editingPath}`,
        content: encoded,
      }
      if (fileSha) body.sha = fileSha

      const res = await fetch(`${API_PROXY}${encodeURIComponent(token)}&path=${encodeURIComponent(editingPath)}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || `HTTP ${res.status}`)
      setFileSha(data.content.sha)
      show("✅ Saved! Vercel will auto-deploy in 1-2 min.", true)
    } catch (e: any) {
      show("⚠️ Save failed: " + (e.message || "Unknown error"))
    }
    setBusy(false)
  }

  // ============ LOADING / LOGIN SCREEN ============
  if (!loaded) return null
  if (!authed) {
    return (
      <main style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f1f5f9", padding: 20 }}>
        <div style={{ background: "white", padding: 40, borderRadius: 16, boxShadow: "0 4px 24px rgba(0,0,0,0.06)", maxWidth: 420, width: "100%" }}>
          <div style={{ textAlign: "center", marginBottom: 24 }}>
            <div style={{ fontSize: 48, marginBottom: 8 }}>🔐</div>
            <h1 style={{ fontSize: 22, fontWeight: 700, color: "#0f172a" }}>Delin HVAC CMS</h1>
            <p style={{ fontSize: 14, color: "#64748b", marginTop: 4 }}>Enter your GitHub token</p>
          </div>

          <input
            type="password"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="ghp_..."
            onKeyDown={(e) => e.key === "Enter" && setAuthed(true) && localStorage.setItem(TOKEN_KEY, token)}
            style={{ width: "100%", padding: "12px 14px", border: "1px solid #cbd5e1", borderRadius: 8, fontSize: 14, marginBottom: 12, outline: "none" }}
          />
          <button
            onClick={() => { localStorage.setItem(TOKEN_KEY, token); setAuthed(true) }}
            disabled={!token}
            style={{ width: "100%", padding: "12px", background: token ? "#2563eb" : "#94a3b8", color: "white", border: "none", borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: token ? "pointer" : "default" }}
          >
            Connect
          </button>

          <details style={{ marginTop: 16, fontSize: 12, color: "#94a3b8" }}>
            <summary style={{ cursor: "pointer" }}>Need a token?</summary>
            <ol style={{ marginTop: 8, paddingLeft: 16, lineHeight: 1.8 }}>
              <li>Go to <a href="https://github.com/settings/tokens" target="_blank" style={{ color: "#2563eb" }}>github.com/settings/tokens</a></li>
              <li>Generate new token (classic) → scopes: <b>repo</b></li>
              <li>Copy and paste it here</li>
            </ol>
          </details>
        </div>
      </main>
    )
  }

  // ============ EDITOR ============
  if (page === "editor") {
    return (
      <main style={{ minHeight: "100vh", background: "#f8fafc" }}>
        <div style={{ maxWidth: 960, margin: "0 auto", padding: "16px 20px" }}>
          {/* Top bar */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12, flexWrap: "wrap", gap: 8 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <button onClick={() => { setPage("dashboard"); setMsg(null) }} style={{ background: "none", border: "none", color: "#2563eb", cursor: "pointer", fontSize: 14, fontWeight: 500 }}>
                ← Back
              </button>
              <span style={{ fontSize: 13, color: "#64748b" }}>{editingPath}</span>
            </div>
            <div style={{ display: "flex", gap: 6 }}>
              <a href={`https://github.com/${REPO}/blob/master/${editingPath}`} target="_blank" style={{ padding: "8px 14px", background: "white", border: "1px solid #cbd5e1", borderRadius: 6, fontSize: 12, textDecoration: "none", color: "#475569" }}>
                View on GitHub ↗
              </a>
              <button onClick={saveFile} disabled={busy} style={{ padding: "8px 20px", background: busy ? "#94a3b8" : "#059669", color: "white", border: "none", borderRadius: 6, fontSize: 13, fontWeight: 600, cursor: busy ? "default" : "pointer" }}>
                {busy ? "Saving..." : "💾 Save"}
              </button>
            </div>
          </div>

          {/* Messages */}
          {msg && (
            <div style={{ padding: "10px 16px", background: msg.ok ? "#f0fdf4" : "#fef2f2", color: msg.ok ? "#166534" : "#991b1b", borderRadius: 8, marginBottom: 12, fontSize: 13, border: `1px solid ${msg.ok ? "#bbf7d0" : "#fecaca"}` }}>
              {msg.text}
            </div>
          )}

          {/* File type hint */}
          <div style={{ padding: "8px 16px", background: "#f0f9ff", borderRadius: 8, marginBottom: 12, fontSize: 12, color: "#0369a1", border: "1px solid #bae6fd" }}>
            {editingPath.endsWith(".md")
              ? "📝 Editing Markdown — just write your content. Use # for headings, **bold**, [links](url)."
              : editingPath.endsWith(".ts")
                ? "⚠️ This is a code file — edit text between quote marks \"\". Be careful not to break the code structure."
                : "✏️ Edit the content below."}
          </div>

          {/* Editor */}
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            style={{ width: "100%", minHeight: "calc(100vh - 160px)", padding: 16, border: "1px solid #cbd5e1", borderRadius: 8, fontSize: 13, fontFamily: "'SF Mono', 'Fira Code', 'Consolas', monospace", lineHeight: 1.7, resize: "vertical", outline: "none" }}
          />
        </div>
      </main>
    )
  }

  // ============ DASHBOARD ============
  const logout = () => { localStorage.removeItem(TOKEN_KEY); setAuthed(false); setToken("") }

  return (
    <main style={{ minHeight: "100vh", background: "#f8fafc", padding: 24 }}>
      <div style={{ maxWidth: 960, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
          <div>
            <h1 style={{ fontSize: 24, fontWeight: 700, color: "#0f172a" }}>📝 Delin CMS</h1>
            <p style={{ fontSize: 13, color: "#64748b" }}>Logged in as bakeryserviceprovider-dot</p>
          </div>
          <button onClick={logout} style={{ padding: "8px 16px", background: "white", border: "1px solid #e2e8f0", borderRadius: 6, fontSize: 13, cursor: "pointer", color: "#64748b" }}>
            Disconnect
          </button>
        </div>

        {/* Messages on dashboard */}
        {msg && (
          <div style={{ padding: "10px 16px", background: msg.ok ? "#f0fdf4" : "#fef2f2", color: msg.ok ? "#166534" : "#991b1b", borderRadius: 8, marginBottom: 16, fontSize: 13, border: `1px solid ${msg.ok ? "#bbf7d0" : "#fecaca"}` }}>
            {msg.text}
          </div>
        )}

        {/* Quick Actions */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 12, marginBottom: 28 }}>
          <ActionCard icon="🖼️" title="Upload Images" desc="Product photos" href={`https://github.com/${REPO}/upload/master/public/images/products`} />
          <ActionCard icon="✍️" title="New Blog Post" desc="Write SEO article" href={`https://github.com/${REPO}/new/master/src/content/blog`} />
          <ActionCard icon="📂" title="GitHub Repo" desc="Full file access" href={`https://github.com/${REPO}`} />
          <ActionCard icon="🚀" title="Deployments" desc="Check deploy status" href={`https://vercel.com/bakeryserviceprovider-8725s-projects/gddelin-export/deployments`} />
        </div>

        {/* Products */}
        <Section title="📦 Products (单个编辑，格式友好)">
          <FileRow label="1. Seafood Constant Temp Machine" desc="海鲜恒温机" path="src/content/products/seafood-constant-temperature-machine.md" onEdit={loadFile} busy={busy} />
          <FileRow label="2. Industrial Water Chiller" desc="工业冷水机" path="src/content/products/industrial-water-chiller.md" onEdit={loadFile} busy={busy} />
          <FileRow label="3. Titanium Evaporator" desc="钛蒸发器" path="src/content/products/titanium-evaporator.md" onEdit={loadFile} busy={busy} />
          <FileRow label="4. Stainless Steel Heat Exchanger" desc="不锈钢换热器" path="src/content/products/stainless-steel-heat-exchanger.md" onEdit={loadFile} busy={busy} />
        </Section>

        {/* Settings */}
        <Section title="⚙️ Settings">
          <FileRow label="Company Settings" desc="Name, phone, email, address" path="src/lib/constants.ts" onEdit={loadFile} busy={busy} />
          <FileRow label="About Page" desc="About us page" path="src/content/pages/about.md" onEdit={loadFile} busy={busy} />
        </Section>

        {/* Blog Posts */}
        <Section title="📝 Blog Posts">
          {[
            "how-to-choose-seafood-cooling-system.md",
            "industrial-chiller-maintenance-tips.md",
            "titanium-vs-copper-evaporator-seawater.md",
            "shell-tube-vs-plate-heat-exchanger.md",
            "choose-reliable-china-refrigeration-manufacturer.md",
          ].map((f) => (
            <FileRow key={f} label={f} desc="" path={`src/content/blog/${f}`} onEdit={loadFile} busy={busy} />
          ))}
        </Section>

        {/* Start New Blog Post */}
        <div style={{ marginTop: 16, textAlign: "center" }}>
          <a href={`https://github.com/${REPO}/new/master/src/content/blog`} target="_blank" style={{ color: "#2563eb", fontSize: 14, fontWeight: 500 }} rel="noopener">
            + New Blog Post on GitHub →
          </a>
        </div>
      </div>
    </main>
  )
}

// ============ Sub-components ============

function ActionCard({ icon, title, desc, href }: { icon: string; title: string; desc: string; href: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" style={{ padding: 18, background: "white", borderRadius: 10, border: "1px solid #e2e8f0", textDecoration: "none", textAlign: "center" }}>
      <div style={{ fontSize: 28, marginBottom: 6 }}>{icon}</div>
      <div style={{ fontSize: 13, fontWeight: 600, color: "#0f172a" }}>{title}</div>
      <div style={{ fontSize: 11, color: "#94a3b8" }}>{desc}</div>
    </a>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ background: "white", borderRadius: 12, border: "1px solid #e2e8f0", overflow: "hidden", marginBottom: 16 }}>
      <div style={{ padding: "14px 20px", borderBottom: "1px solid #f1f5f9", background: "#fafbfc" }}>
        <h2 style={{ fontSize: 15, fontWeight: 700, color: "#0f172a" }}>{title}</h2>
      </div>
      {children}
    </div>
  )
}

function FileRow({ label, desc, path, onEdit, busy }: { label: string; desc: string; path: string; onEdit: (p: string) => void; busy: boolean }) {
  return (
    <div style={{ padding: "10px 20px", borderBottom: "1px solid #f8fafc", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <div>
        <div style={{ fontSize: 13, fontWeight: 600, color: "#1e293b" }}>{label}</div>
        {desc && <div style={{ fontSize: 12, color: "#94a3b8" }}>{desc}</div>}
      </div>
      <button
        onClick={() => onEdit(path)}
        disabled={busy}
        style={{ padding: "6px 14px", background: busy ? "#f1f5f9" : "#2563eb", color: busy ? "#94a3b8" : "white", border: "none", borderRadius: 6, fontSize: 12, fontWeight: 500, cursor: busy ? "default" : "pointer" }}
      >
        {busy ? "..." : "Edit"}
      </button>
    </div>
  )
}
