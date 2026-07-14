"use client"
import { useState, useEffect } from "react"
const REPO = "bakeryserviceprovider-dot/gddelin-export"
const TOKEN_KEY = "gh_token"
const API = "/api/github?token="

export default function CMSPage() {
  const [token, setToken] = useState("")
  const [authed, setAuthed] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [view, setView] = useState<"list" | "edit">("list")
  const [filePath, setFilePath] = useState("")
  const [fileLabel, setFileLabel] = useState("")
  const [content, setContent] = useState("")
  const [sha, setSha] = useState("")
  const [msg, setMsg] = useState("")
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    const t = localStorage.getItem(TOKEN_KEY)
    if (t) { setToken(t); setAuthed(true) }
    setLoaded(true)
  }, [])

  async function loadFile(path: string, label: string) {
    setBusy(true); setMsg("加载中...")
    try {
      const r = await fetch(`${API}${encodeURIComponent(token)}&path=${encodeURIComponent(path)}`)
      if (!r.ok) throw new Error((await r.json()).message || "加载失败")
      const d = await r.json()
      const text = decodeURIComponent(escape(atob(d.content.replace(/\n/g, ""))))

      // Show frontmatter hint for .md files
      let displayText = text
      if (path.endsWith(".md")) {
        // Keep original - show frontmatter as-is
      }

      setSha(d.sha)
      setContent(displayText)
      setFilePath(path)
      setFileLabel(label)
      setView("edit")
      setMsg("")
    } catch (e: any) { setMsg("❌ " + (e.message || "加载失败")) }
    setBusy(false)
  }

  async function saveFile() {
    if (!filePath) return
    setBusy(true); setMsg("保存中...")
    try {
      const encoded = btoa(unescape(encodeURIComponent(content)))
      const body: any = { message: `更新 ${filePath}`, content: encoded, branch: "master" }
      if (sha) body.sha = sha
      const r = await fetch(`${API}${encodeURIComponent(token)}&path=${encodeURIComponent(filePath)}`, {
        method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body)
      })
      const d = await r.json()
      if (!r.ok) throw new Error(d.message || "保存失败")
      setSha(d.content?.sha || d.sha)
      setMsg("✅ 保存成功！Vercel 正在自动部署...")
    } catch (e: any) { setMsg("❌ " + (e.message || "保存失败")) }
    setBusy(false)
  }

  const list = [
    { label: "📦 海鲜恒温机", path: "src/content/products/seafood-constant-temperature-machine.md" },
    { label: "📦 工业冷水机", path: "src/content/products/industrial-water-chiller.md" },
    { label: "📦 钛蒸发器", path: "src/content/products/titanium-evaporator.md" },
    { label: "📦 不锈钢换热器", path: "src/content/products/stainless-steel-heat-exchanger.md" },
    { label: "📝 how-to-choose-seafood-cooling-system.md", path: "src/content/blog/how-to-choose-seafood-cooling-system.md" },
    { label: "📝 industrial-chiller-maintenance-tips.md", path: "src/content/blog/industrial-chiller-maintenance-tips.md" },
    { label: "📝 titanium-vs-copper-evaporator-seawater.md", path: "src/content/blog/titanium-vs-copper-evaporator-seawater.md" },
    { label: "📝 shell-tube-vs-plate-heat-exchanger.md", path: "src/content/blog/shell-tube-vs-plate-heat-exchanger.md" },
    { label: "📝 choose-reliable-china-refrigeration-manufacturer.md", path: "src/content/blog/choose-reliable-china-refrigeration-manufacturer.md" },
    { label: "⚙️ 公司设置（代码文件）", path: "src/lib/constants.ts" },
  ]

  if (!loaded) return null
  if (!authed) {
    return (
      <main style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f1f5f9", padding: 20 }}>
        <div style={{ background: "white", padding: 40, borderRadius: 16, maxWidth: 420, width: "100%" }}>
          <div style={{ textAlign: "center", marginBottom: 24 }}>
            <div style={{ fontSize: 48, marginBottom: 8 }}>🔐</div>
            <h1 style={{ fontSize: 22, fontWeight: 700, color: "#0f172a" }}>Delin 内容管理</h1>
            <p style={{ fontSize: 14, color: "#64748b", marginTop: 4 }}>请输入 GitHub Token 登录</p>
          </div>
          <input type="password" value={token} onChange={e => setToken(e.target.value)} placeholder="ghp_..."
            onKeyDown={e => e.key === "Enter" && (localStorage.setItem(TOKEN_KEY, token), setAuthed(true))}
            style={{ width: "100%", padding: 12, border: "1px solid #cbd5e1", borderRadius: 8, fontSize: 14, marginBottom: 12, outline: "none" }} />
          <button onClick={() => { localStorage.setItem(TOKEN_KEY, token); setAuthed(true) }} disabled={!token}
            style={{ width: "100%", padding: 12, background: token ? "#2563eb" : "#94a3b8", color: "white", border: "none", borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: token ? "pointer" : "default" }}>
            登录
          </button>
        </div>
      </main>
    )
  }

  if (view === "edit") {
    const isMd = filePath.endsWith(".md")
    const isCode = filePath.endsWith(".ts")
    return (
      <main style={{ minHeight: "100vh", background: "#f8fafc", padding: 16 }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12, flexWrap: "wrap", gap: 8 }}>
            <div>
              <button onClick={() => { setView("list"); setMsg("") }} style={{ background: "none", border: "none", color: "#2563eb", cursor: "pointer", fontSize: 14, fontWeight: 500 }}>
                ← 返回列表
              </button>
              <span style={{ marginLeft: 8, fontSize: 12, color: "#94a3b8" }}>{fileLabel}</span>
            </div>
            <button onClick={saveFile} disabled={busy} style={{ padding: "8px 24px", background: busy ? "#94a3b8" : "#059669", color: "white", border: "none", borderRadius: 6, fontSize: 14, fontWeight: 600, cursor: busy ? "default" : "pointer" }}>
              {busy ? "保存中..." : "💾 保存"}
            </button>
          </div>

          {msg && <div style={{ padding: "8px 14px", background: msg.includes("✅") ? "#f0fdf4" : "#fef2f2", color: msg.includes("✅") ? "#166534" : "#991b1b", borderRadius: 8, marginBottom: 12, fontSize: 13, border: `1px solid ${msg.includes("✅") ? "#bbf7d0" : "#fecaca"}` }}>{msg}</div>}

          {isMd && (
            <div style={{ background: "#f0f9ff", border: "1px solid #bae6fd", borderRadius: 8, padding: "10px 14px", marginBottom: 12, fontSize: 13, color: "#0369a1", lineHeight: 1.6 }}>
              <strong>📖 编辑说明：</strong><br/>
              • <strong>---</strong> 之间的内容是文件头（标题、分类、参数等）<br/>
              • <strong>---</strong> 下面的正文才是主要内容<br/>
              • 只改引号 <strong>""</strong> 里的文字，不要改动 `标签: -` 这些格式<br/>
              • 改完点 <strong>保存</strong>，Vercel 会自动部署
            </div>
          )}
          {isCode && (
            <div style={{ background: "#fff7ed", border: "1px solid #fed7aa", borderRadius: 8, padding: "10px 14px", marginBottom: 12, fontSize: 13, color: "#9a3412", lineHeight: 1.6 }}>
              ⚠️ <strong>代码文件</strong> — 请谨慎修改引号 "" 里的内容，不要改动代码结构
            </div>
          )}

          <textarea value={content} onChange={e => setContent(e.target.value)}
            style={{ width: "100%", minHeight: "calc(100vh - 200px)", padding: 16, border: "1px solid #cbd5e1", borderRadius: 8, fontSize: 13, fontFamily: "monospace", lineHeight: 1.6, resize: "vertical", outline: "none", color: "#1e293b" }} />
        </div>
      </main>
    )
  }

  const logout = () => { localStorage.removeItem(TOKEN_KEY); setAuthed(false); setToken("") }
  return (
    <main style={{ minHeight: "100vh", background: "#f8fafc", padding: 24 }}>
      <div style={{ maxWidth: 960, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <div>
            <h1 style={{ fontSize: 24, fontWeight: 700, color: "#0f172a" }}>📝 Delin 内容管理</h1>
            <p style={{ fontSize: 13, color: "#64748b" }}>已登录: bakeryserviceprovider-dot</p>
          </div>
          <button onClick={logout} style={{ padding: "8px 16px", background: "white", border: "1px solid #e2e8f0", borderRadius: 6, fontSize: 13, cursor: "pointer", color: "#64748b" }}>退出登录</button>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 10, marginBottom: 20 }}>
          <QuickLink icon="🖼️" title="上传图片" href={`https://github.com/${REPO}/upload/master/public/images/products`} />
          <QuickLink icon="✍️" title="新建博客" href={`https://github.com/${REPO}/new/master/src/content/blog`} />
          <QuickLink icon="📂" title="GitHub" href={`https://github.com/${REPO}`} />
          <QuickLink icon="🚀" title="部署" href={`https://vercel.com/bakeryserviceprovider-8725s-projects/gddelin-export/deployments`} />
        </div>

        {msg && <div style={{ padding: "8px 14px", background: msg.includes("✅") ? "#f0fdf4" : "#fef2f2", color: msg.includes("✅") ? "#166534" : msg.includes("❌") ? "#991b1b" : "#0f172a", borderRadius: 8, marginBottom: 12, fontSize: 13 }}>{msg}</div>}

        <div style={{ background: "white", borderRadius: 12, border: "1px solid #e2e8f0", overflow: "hidden" }}>
          <div style={{ padding: "12px 16px", borderBottom: "1px solid #f1f5f9", background: "#fafbfc" }}>
            <h2 style={{ fontSize: 15, fontWeight: 700, color: "#0f172a" }}>📄 选择要编辑的文件</h2>
          </div>
          {list.map(item => (
            <div key={item.path} style={{ padding: "8px 16px", borderBottom: "1px solid #f8fafc", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 13, color: "#1e293b" }}>{item.label}</span>
              <button onClick={() => loadFile(item.path, item.label)} disabled={busy}
                style={{ padding: "5px 12px", background: busy ? "#f1f5f9" : "#2563eb", color: busy ? "#94a3b8" : "white", border: "none", borderRadius: 5, fontSize: 12, cursor: busy ? "default" : "pointer" }}>
                编辑
              </button>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}

function QuickLink({ icon, title, href }: { icon: string; title: string; href: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" style={{ padding: 14, background: "white", borderRadius: 10, border: "1px solid #e2e8f0", textDecoration: "none", textAlign: "center", display: "block" }}>
      <div style={{ fontSize: 24, marginBottom: 4 }}>{icon}</div>
      <div style={{ fontSize: 12, fontWeight: 600, color: "#0f172a" }}>{title}</div>
    </a>
  )
}
