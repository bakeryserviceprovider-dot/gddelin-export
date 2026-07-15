"use client"
import { useState, useEffect } from "react"
const REPO = "bakeryserviceprovider-dot/gddelin-export"
const TOKEN_KEY = "gh_token"
const API = "/api/github?token="

const PROD_TPL = (name: string) => `---
title: "${name}"
subtitle: "Product subtitle"
category: "Refrigeration Equipment"
features:
  - "Feature 1"
  - "Feature 2"
applications:
  - "Application 1"
specifications:
  - label: "Spec Name"
    value: "Spec Value"
certifications:
  - "CE"
images:
  - "/images/products/placeholder.svg"
---

Product description here.`

const BLOG_TPL = (title: string) => `---
title: "${title}"
excerpt: "Short description for search engines"
date: "${new Date().toISOString().split('T')[0]}"
author: "Delin Engineering Team"
category: "Industry News"
tags:
  - "tag1"
  - "tag2"
readingTime: 5
---

Write your article here...`

const FILES = [
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

function extract(text: string, key: string): string {
  const rx = new RegExp(key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\s*"([^"]*)"')
  const m = text.match(rx)
  return m ? m[1] : ""
}

export default function CMSPage() {
  const [token, setToken] = useState("")
  const [authed, setAuthed] = useState(false); const [loaded, setLoaded] = useState(false)
  const [view, setView] = useState<"list" | "edit" | "upload" | "media">("list")
  const [fp, setFp] = useState(""); const [fl, setFl] = useState("")
  const [content, setContent] = useState(""); const [sha, setSha] = useState("")
  const [msg, setMsg] = useState(""); const [busy, setBusy] = useState(false)
  const [dialog, setDialog] = useState<"product" | "blog" | null>(null)
  const [newName, setNewName] = useState(""); const [newSlug, setNewSlug] = useState("")
  const [settings, setSettings] = useState<Record<string,string>>({})
  const [uploadFile, setUploadFile] = useState<File | null>(null)
  const [uploadPreview, setUploadPreview] = useState("")
  const [uploadName, setUploadName] = useState("")
  const [uploadTarget, setUploadTarget] = useState("products")

  useEffect(() => { const t = localStorage.getItem(TOKEN_KEY); if (t) { setToken(t); setAuthed(true) }; setLoaded(true) }, [])

  async function loadFile(path: string, label: string) {
    setBusy(true); setMsg("加载中...")
    try {
      const r = await fetch(`${API}${encodeURIComponent(token)}&path=${encodeURIComponent(path)}`)
      if (!r.ok) throw new Error((await r.json()).message || "加载失败")
      const d = await r.json()
      const text = decodeURIComponent(escape(atob(d.content.replace(/\n/g, ""))))
      setSha(d.sha); setContent(text); setFp(path); setFl(label); setView("edit"); setMsg("")
      if (path === "src/lib/constants.ts") {
        setSettings({
          name: extract(text, "name:"),
          shortName: extract(text, "shortName:"),
          slogan: extract(text, "slogan:"),
          phone: extract(text, 'phone: "'),
          email: extract(text, 'email: "'),
          address: extract(text, "address:"),
          whatsapp: extract(text, "whatsapp:"),
          description: extract(text, "description:"),
        })
      }
    } catch (e: any) { setMsg("❌ " + (e.message || "加载失败")) }
    setBusy(false)
  }

  async function saveFile() {
    if (!fp) return; setBusy(true); setMsg("保存中...")
    try {
      const encoded = btoa(unescape(encodeURIComponent(content)))
      const body: any = { message: `更新 ${fp}`, content: encoded, branch: "master" }
      if (sha) body.sha = sha
      const r = await fetch(`${API}${encodeURIComponent(token)}&path=${encodeURIComponent(fp)}`, {
        method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body)
      })
      const d = await r.json()
      if (!r.ok) throw new Error(d.message || "保存失败")
      setSha(d.content?.sha || d.sha)
      setMsg("✅ 保存成功！Vercel 自动部署中...")
    } catch (e: any) { setMsg("❌ " + (e.message || "保存失败")) }
    setBusy(false)
  }

  async function uploadImage() {
    if (!uploadFile) { setMsg("请选择图片"); return }
    const ext = uploadFile.name.split('.').pop() || 'jpg'
    const fileName = uploadName.trim() || `product-${Date.now()}`
    const path = uploadTarget === "products" ? `public/images/products/${fileName}.${ext}` : `public/images/blog/${fileName}.${ext}`
    setBusy(true); setMsg("上传中...")
    try {
      // Read file as base64
      const reader = new FileReader()
      reader.onload = async () => {
        const base64 = (reader.result as string).split(',')[1]
        const r = await fetch(`${API}${encodeURIComponent(token)}&path=${encodeURIComponent(path)}`, {
          method: "PUT", headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: `上传图片: ${fileName}`, content: base64, branch: "master" })
        })
        const d = await r.json()
        if (!r.ok) throw new Error(d.message || "上传失败")
        setMsg(`✅ 上传成功！图片地址: /images/${uploadTarget}/${fileName}.${ext}`)
        setUploadFile(null); setUploadPreview(""); setUploadName("")
      }
      reader.readAsDataURL(uploadFile)
    } catch (e: any) { setMsg("❌ " + (e.message || "上传失败")) }
    setBusy(false)
  }

  async function createNew() {
    if (!newName) { setMsg("请输入名称"); return }
    const slug = newSlug || newName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")
    const fileName = dialog === "product" ? `src/content/products/${slug}.md` : `src/content/blog/${slug}.md`
    const text = dialog === "product" ? PROD_TPL(newName) : BLOG_TPL(newName)
    setBusy(true); setMsg("创建中...")
    try {
      const r = await fetch(`${API}${encodeURIComponent(token)}&path=${encodeURIComponent(fileName)}`, {
        method: "PUT", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: `新建: ${newName}`, content: btoa(unescape(encodeURIComponent(text))), branch: "master" })
      })
      const d = await r.json()
      if (!r.ok) throw new Error(d.message || "创建失败")
      setMsg("✅ 创建成功！")
      setDialog(null); setNewName(""); setNewSlug("")
      setSha(d.content?.sha || d.sha); setContent(text); setFp(fileName); setFl(`🆕 ${newName}`); setView("edit")
    } catch (e: any) { setMsg("❌ " + (e.message || "创建失败")) }
    setBusy(false)
  }

  if (!loaded) return null
  if (!authed) return (
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

  // =========== MEDIA MANAGER VIEW ===========
  if (view === "media") {
    const SLOTS = [
      { id: "home-hero", label: "🏠 首页主横幅", desc: "Hero 大背景图 (1920×800)", file: "/images/slots/home-hero.svg" },
      { id: "home-banner-1", label: "📢 横幅轮播 1", desc: "首页轮播图 (1200×500)", file: "/images/slots/banner-1.svg" },
      { id: "home-banner-2", label: "📢 横幅轮播 2", desc: "首页轮播图 (1200×500)", file: "/images/slots/banner-2.svg" },
      { id: "product-seafood", label: "🐟 海鲜恒温机主图", desc: "产品展示", file: "/images/products/seafood-machine-1.svg" },
      { id: "product-chiller", label: "❄️ 工业冷水机主图", desc: "产品展示", file: "/images/products/industrial-chiller-1.svg" },
      { id: "product-titanium", label: "🔄 钛蒸发器主图", desc: "产品展示", file: "/images/products/titanium-evaporator-1.svg" },
      { id: "product-heat-exchanger", label: "⚡ 换热器主图", desc: "产品展示", file: "/images/products/heat-exchanger-1.svg" },
      { id: "about-image", label: "🏢 关于我们配图", desc: "关于页面展示", file: "/images/slots/about.svg" },
    ]
    const [imgVersions, setImgVersions] = useState<Record<string,number>>({})

    async function uploadSlotImage(slotId: string, currentFile: string) {
      const input = document.createElement('input')
      input.type = 'file'
      input.accept = 'image/*'
      input.onchange = async () => {
        const file = input.files?.[0]
        if (!file) return
        const ext = file.name.split('.').pop() || 'svg'
        // Determine folder from slot
        const isProduct = slotId.startsWith('product-')
        const path = isProduct
          ? `public/images/products/${slotId.replace('product-','')}.${ext}`
          : `public/images/slots/${slotId}.${ext}`
        setBusy(true); setMsg(`上传 ${slotId}...`)
        try {
          const reader = new FileReader()
          reader.onload = async () => {
            const base64 = (reader.result as string).split(',')[1]
            const r = await fetch(`${API}${encodeURIComponent(token)}&path=${encodeURIComponent(path)}`, {
              method: "PUT", headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ message: `更新图片: ${slotId}`, content: base64, branch: "master" })
            })
            const d = await r.json()
            if (!r.ok) throw new Error(d.message || "上传失败")
            setImgVersions(prev => ({...prev, [slotId]: Date.now()}))
            setMsg(`✅ ${slotId} 上传成功！`)
          }
          reader.readAsDataURL(file)
        } catch (e: any) { setMsg("❌ " + (e.message || "上传失败")) }
        setBusy(false)
      }
      input.click()
    }

    return (
      <main style={{ minHeight: "100vh", background: "#f8fafc", padding: 24 }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <button onClick={() => { setView("list"); setMsg("") }} style={{ background: "none", border: "none", color: "#2563eb", cursor: "pointer", fontSize: 14, fontWeight: 500, marginBottom: 20 }}>← 返回首页</button>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: "#0f172a", marginBottom: 4 }}>🖼️ 图片管理</h1>
          <p style={{ fontSize: 13, color: "#64748b", marginBottom: 24 }}>点图片下方的「替换」按钮上传新图，上传后刷新前台即可看到变化</p>
          {msg && <Msg text={msg} />}

          {/* Hero & Banner section */}
          <div style={{ marginBottom: 28 }}>
            <h2 style={{ fontSize: 15, fontWeight: 700, color: "#0f172a", marginBottom: 12, paddingBottom: 8, borderBottom: "1px solid #e2e8f0" }}>📌 首页横幅</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
              {SLOTS.filter(s => s.id.startsWith("home-")).map(slot => (
                <SlotCard key={slot.id} slot={slot} version={imgVersions[slot.id]} onUpload={() => uploadSlotImage(slot.id, slot.file)} busy={busy} />
              ))}
            </div>
          </div>

          {/* Product images */}
          <div style={{ marginBottom: 28 }}>
            <h2 style={{ fontSize: 15, fontWeight: 700, color: "#0f172a", marginBottom: 12, paddingBottom: 8, borderBottom: "1px solid #e2e8f0" }}>📦 产品图片</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 16 }}>
              {SLOTS.filter(s => s.id.startsWith("product-")).map(slot => (
                <SlotCard key={slot.id} slot={slot} version={imgVersions[slot.id]} onUpload={() => uploadSlotImage(slot.id, slot.file)} busy={busy} />
              ))}
            </div>
          </div>

          {/* Other images */}
          <div style={{ marginBottom: 28 }}>
            <h2 style={{ fontSize: 15, fontWeight: 700, color: "#0f172a", marginBottom: 12, paddingBottom: 8, borderBottom: "1px solid #e2e8f0" }}>🏢 其他配图</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
              {SLOTS.filter(s => !s.id.startsWith("home-") && !s.id.startsWith("product-")).map(slot => (
                <SlotCard key={slot.id} slot={slot} version={imgVersions[slot.id]} onUpload={() => uploadSlotImage(slot.id, slot.file)} busy={busy} />
              ))}
            </div>
          </div>
        </div>
      </main>
    )
  }

  // =========== UPLOAD VIEW ===========
  if (view === "upload") return (
    <main style={{ minHeight: "100vh", background: "#f8fafc", padding: 24 }}>
      <div style={{ maxWidth: 600, margin: "0 auto" }}>
        <button onClick={() => { setView("list"); setMsg("") }} style={{ background: "none", border: "none", color: "#2563eb", cursor: "pointer", fontSize: 14, fontWeight: 500, marginBottom: 20 }}>← 返回首页</button>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: "#0f172a", marginBottom: 8 }}>🖼️ 上传图片</h1>
        <p style={{ fontSize: 13, color: "#64748b", marginBottom: 24 }}>上传产品图片到网站，支持 JPG/PNG/WebP/SVG</p>

        {msg && <Msg text={msg} />}

        {/* Target folder selector */}
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#1e293b", marginBottom: 4 }}>上传到</label>
          <div style={{ display: "flex", gap: 10 }}>
            {["products", "blog"].map(t => (
              <button key={t} onClick={() => setUploadTarget(t)}
                style={{ padding: "8px 20px", borderRadius: 8, fontSize: 13, fontWeight: 500, cursor: "pointer", border: uploadTarget === t ? "2px solid #2563eb" : "1px solid #cbd5e1", background: uploadTarget === t ? "#eff6ff" : "white", color: uploadTarget === t ? "#2563eb" : "#475569" }}>
                {t === "products" ? "📦 产品图片" : "📝 博客图片"}
              </button>
            ))}
          </div>
        </div>

        {/* File name */}
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#1e293b", marginBottom: 4 }}>图片名称（可选）</label>
          <input value={uploadName} onChange={e => setUploadName(e.target.value)} placeholder="留空则自动生成" style={{ width: "100%", padding: 10, border: "1px solid #cbd5e1", borderRadius: 8, fontSize: 14, outline: "none" }} />
        </div>

        {/* File picker */}
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#1e293b", marginBottom: 4 }}>选择图片 *</label>
          <input type="file" accept="image/*" onChange={e => {
            const f = e.target.files?.[0]
            if (f) { setUploadFile(f); setUploadPreview(URL.createObjectURL(f)) }
          }} style={{ width: "100%" }} />
        </div>

        {/* Preview */}
        {uploadPreview && (
          <div style={{ marginBottom: 16, borderRadius: 8, overflow: "hidden", border: "1px solid #e2e8f0", background: "#f8fafc", padding: 12, textAlign: "center" }}>
            <img src={uploadPreview} alt="preview" style={{ maxHeight: 200, maxWidth: "100%", objectFit: "contain" }} />
            <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 6 }}>{uploadFile?.name} ({(uploadFile?.size || 0) / 1024 > 1024 ? ((uploadFile?.size || 0) / 1024 / 1024).toFixed(1) + 'MB' : ((uploadFile?.size || 0) / 1024).toFixed(0) + 'KB'})</div>
          </div>
        )}

        {/* Upload button */}
        <button onClick={uploadImage} disabled={busy || !uploadFile}
          style={{ padding: "12px 32px", background: busy || !uploadFile ? "#94a3b8" : "#2563eb", color: "white", border: "none", borderRadius: 8, fontSize: 15, fontWeight: 600, cursor: busy || !uploadFile ? "default" : "pointer" }}>
          {busy ? "上传中..." : "⬆️ 上传图片"}
        </button>
      </div>
    </main>
  )

  // =========== SETTINGS FORM (constants.ts) ===========
  if (view === "edit" && fp === "src/lib/constants.ts") {
    const fields = [
      { key: "name", label: "公司英文名" }, { key: "shortName", label: "简称" },
      { key: "slogan", label: "口号" }, { key: "phone", label: "电话" },
      { key: "email", label: "邮箱" }, { key: "address", label: "地址" },
      { key: "whatsapp", label: "WhatsApp" },
      { key: "description", label: "公司简介" },
    ]
    return (
      <main style={{ minHeight: "100vh", background: "#f8fafc", padding: 24 }}>
        <div style={{ maxWidth: 640, margin: "0 auto" }}>
          <button onClick={() => { setView("list"); setMsg("") }} style={{ background: "none", border: "none", color: "#2563eb", cursor: "pointer", fontSize: 14, fontWeight: 500, marginBottom: 20 }}>← 返回列表</button>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: "#0f172a", marginBottom: 24 }}>⚙️ 公司设置</h1>
          {msg && <Msg text={msg} />}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {fields.map(f => (
              <div key={f.key}>
                <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#1e293b", marginBottom: 4 }}>{f.label}</label>
                {f.key === "description" ? (
                  <textarea value={settings[f.key] || ""} onChange={e => setSettings({...settings, [f.key]: e.target.value})} rows={4}
                    style={{ width: "100%", padding: 10, border: "1px solid #cbd5e1", borderRadius: 8, fontSize: 14, outline: "none", resize: "vertical" }} />
                ) : (
                  <input value={settings[f.key] || ""} onChange={e => setSettings({...settings, [f.key]: e.target.value})}
                    style={{ width: "100%", padding: 10, border: "1px solid #cbd5e1", borderRadius: 8, fontSize: 14, outline: "none" }} />
                )}
              </div>
            ))}
          </div>
          <button onClick={async () => {
            setBusy(true); setMsg("保存中...")
            try {
              let newContent = content
              for (const f of fields) {
                if (f.key === "description") {
                  newContent = newContent.replace(/^(  description:\s*")[^"]*(".*)/m, `$1${(settings[f.key] || "").replace(/\n/g, "\\n")}$2`)
                } else {
                  newContent = newContent.replace(new RegExp(`^(  ${f.key}:\\s*")[^"]*(".*)`, "m"), `$1${settings[f.key] || ""}$2`)
                }
              }
              const encoded = btoa(unescape(encodeURIComponent(newContent)))
              const body: any = { message: "更新公司设置", content: encoded, branch: "master" }
              if (sha) body.sha = sha
              const r = await fetch(`${API}${encodeURIComponent(token)}&path=${encodeURIComponent(fp)}`, {
                method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body)
              })
              const d = await r.json()
              if (!r.ok) throw new Error(d.message || "保存失败")
              setSha(d.content?.sha || d.sha)
              setContent(newContent)
              setMsg("✅ 保存成功！")
            } catch (e: any) { setMsg("❌ " + (e.message || "保存失败")) }
            setBusy(false)
          }} disabled={busy}
            style={{ marginTop: 24, padding: "12px 32px", background: busy ? "#94a3b8" : "#059669", color: "white", border: "none", borderRadius: 8, fontSize: 15, fontWeight: 700, cursor: busy ? "default" : "pointer" }}>
            {busy ? "保存中..." : "💾 保存设置"}
          </button>
        </div>
      </main>
    )
  }

  // =========== EDITOR VIEW ===========
  if (view === "edit") return (
    <main style={{ minHeight: "100vh", background: "#f8fafc", padding: 16 }}>
      <div style={{ maxWidth: 960, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12, flexWrap: "wrap", gap: 8 }}>
          <div>
            <button onClick={() => { setView("list"); setMsg("") }} style={{ background: "none", border: "none", color: "#2563eb", cursor: "pointer", fontSize: 14, fontWeight: 500 }}>← 返回列表</button>
            <span style={{ marginLeft: 8, fontSize: 12, color: "#94a3b8" }}>{fl}</span>
          </div>
          <button onClick={saveFile} disabled={busy}
            style={{ padding: "10px 32px", background: busy ? "#94a3b8" : "#059669", color: "white", border: "none", borderRadius: 8, fontSize: 15, fontWeight: 700, cursor: busy ? "default" : "pointer", boxShadow: busy ? "none" : "0 2px 8px rgba(5,150,105,0.3)" }}>
            {busy ? "保存中..." : "💾 保存"}
          </button>
        </div>

        {msg && <Msg text={msg} />}

        {fp.endsWith(".md") && (
          <div style={{ background: "#f0f9ff", border: "1px solid #bae6fd", borderRadius: 8, padding: "10px 14px", marginBottom: 12, fontSize: 13, color: "#0369a1", lineHeight: 1.6 }}>
            <strong>📖 编辑说明：</strong><br/>
            • <strong>---</strong> 之间的内容 = 标题/分类/参数等设置<br/>
            • <strong>---</strong> 下面的正文 = 产品描述/文章内容<br/>
            • 只改引号 <strong>""</strong> 里的文字，不要改格式标记<br/>
            • 改完点上面的 <strong>💾 保存</strong>
          </div>
        )}
        {fp.endsWith(".ts") && (
          <div style={{ background: "#fff7ed", border: "1px solid #fed7aa", borderRadius: 8, padding: "10px 14px", marginBottom: 12, fontSize: 13, color: "#9a3412" }}>
            ⚠️ 代码文件，只改引号 "" 里的内容
          </div>
        )}

        <textarea value={content} onChange={e => setContent(e.target.value)}
          style={{ width: "100%", minHeight: "calc(100vh - 220px)", padding: 16, border: "1px solid #cbd5e1", borderRadius: 8, fontSize: 13, fontFamily: "monospace", lineHeight: 1.6, resize: "vertical", outline: "none", color: "#1e293b" }} />
      </div>
    </main>
  )

  // =========== DIALOG ===========
  if (dialog) return (
    <main style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.3)", padding: 20 }}>
      <div style={{ background: "white", padding: 32, borderRadius: 16, maxWidth: 460, width: "100%", boxShadow: "0 20px 60px rgba(0,0,0,0.15)" }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: "#0f172a", marginBottom: 20 }}>
          {dialog === "product" ? "🆕 新增产品" : "🆕 新建博客文章"}
        </h2>
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#1e293b", marginBottom: 4 }}>名称 *</label>
          <input value={newName} onChange={e => { setNewName(e.target.value); setNewSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")) }}
            placeholder={dialog === "product" ? "例: Air Cooled Condenser" : "例: How to maintain chiller"}
            style={{ width: "100%", padding: "10px 12px", border: "1px solid #cbd5e1", borderRadius: 8, fontSize: 14, outline: "none" }} />
        </div>
        <div style={{ marginBottom: 24 }}>
          <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#1e293b", marginBottom: 4 }}>网址标识 (slug)</label>
          <input value={newSlug} onChange={e => setNewSlug(e.target.value)}
            placeholder="auto-generated"
            style={{ width: "100%", padding: "10px 12px", border: "1px solid #cbd5e1", borderRadius: 8, fontSize: 14, outline: "none", color: "#64748b" }} />
          <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 4 }}>自动生成，一般不用改</div>
        </div>
        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
          <button onClick={() => { setDialog(null); setNewName(""); setNewSlug(""); setMsg("") }}
            style={{ padding: "10px 20px", background: "white", border: "1px solid #cbd5e1", borderRadius: 8, fontSize: 14, cursor: "pointer", color: "#475569" }}>
            取消
          </button>
          <button onClick={createNew} disabled={busy || !newName}
            style={{ padding: "10px 24px", background: busy || !newName ? "#94a3b8" : "#2563eb", color: "white", border: "none", borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: busy || !newName ? "default" : "pointer" }}>
            {busy ? "创建中..." : "✅ 创建"}
          </button>
        </div>
        {msg && <Msg text={msg} />}
      </div>
    </main>
  )

  // =========== LIST VIEW ===========
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

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: 10, marginBottom: 20 }}>
          <Btn icon="🖼️" title="图片管理" onClick={() => { setMsg(""); setView("media") }} />
          <Btn icon="✍️" title="新建博客" onClick={() => { setMsg(""); setDialog("blog") }} />
          <Btn icon="➕" title="新增产品" onClick={() => { setMsg(""); setDialog("product") }} />
          <Btn icon="📂" title="GitHub" href={`https://github.com/${REPO}`} />
          <Btn icon="🚀" title="部署状态" href={`https://vercel.com/bakeryserviceprovider-8725s-projects/gddelin-export/deployments`} />
        </div>

        {msg && <Msg text={msg} />}

        <div style={{ background: "white", borderRadius: 12, border: "1px solid #e2e8f0", overflow: "hidden" }}>
          <div style={{ padding: "12px 16px", borderBottom: "1px solid #f1f5f9", background: "#fafbfc" }}>
            <h2 style={{ fontSize: 15, fontWeight: 700, color: "#0f172a" }}>📄 选择要编辑的文件</h2>
          </div>
          {FILES.map(item => (
            <div key={item.path} style={{ padding: "8px 16px", borderBottom: "1px solid #f8fafc", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 13, color: "#1e293b" }}>{item.label}</span>
              <button onClick={() => loadFile(item.path, item.label)} disabled={busy}
                style={{ padding: "5px 14px", background: busy ? "#f1f5f9" : "#2563eb", color: busy ? "#94a3b8" : "white", border: "none", borderRadius: 5, fontSize: 12, cursor: busy ? "default" : "pointer", fontWeight: 500 }}>
                编辑
              </button>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}

function Btn({ icon, title, href, onClick }: { icon: string; title: string; href?: string; onClick?: () => void }) {
  const style = { padding: 14, background: "white", borderRadius: 10, border: "1px solid #e2e8f0", textDecoration: "none" as const, textAlign: "center" as const, display: "block" as const, cursor: "pointer" as const }
  const inner = <><div style={{ fontSize: 24, marginBottom: 4 }}>{icon}</div><div style={{ fontSize: 12, fontWeight: 600, color: "#0f172a" }}>{title}</div></>
  if (href) return <a href={href} target="_blank" rel="noopener noreferrer" style={style}>{inner}</a>
  return <div onClick={onClick} style={style}>{inner}</div>
}

function Msg({ text }: { text: string }) {
  const isOk = text.includes("✅"); const isErr = text.includes("❌")
  return <div style={{ padding: "8px 14px", background: isOk ? "#f0fdf4" : isErr ? "#fef2f2" : "#f8fafc", color: isOk ? "#166534" : isErr ? "#991b1b" : "#0f172a", borderRadius: 8, marginBottom: 12, fontSize: 13 }}>{text}</div>
}

function SlotCard({ slot, version, onUpload, busy }: { slot: {id:string;label:string;desc:string;file:string}; version?:number; onUpload:()=>void; busy:boolean }) {
  const [imgError, setImgError] = useState(false)
  const imgUrl = slot.file + (version ? `?v=${version}` : '')
  return (
    <div style={{ background: "white", borderRadius: 10, border: "1px solid #e2e8f0", overflow: "hidden" }}>
      <div style={{ aspectRatio: "16/9", background: "#f8fafc", display: "flex", alignItems: "center", justifyContent: "center", padding: 8 }}>
        {imgError ? (
          <span style={{ color: "#94a3b8", fontSize: 12 }}>暂无图片</span>
        ) : (
          <img src={imgUrl} alt={slot.label} onError={() => setImgError(true)} style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }} />
        )}
      </div>
      <div style={{ padding: "10px 12px" }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: "#1e293b" }}>{slot.label}</div>
        <div style={{ fontSize: 11, color: "#94a3b8", marginBottom: 8 }}>{slot.desc}</div>
        <button onClick={onUpload} disabled={busy} style={{ width: "100%", padding: "6px 0", background: busy ? "#f1f5f9" : "#2563eb", color: busy ? "#94a3b8" : "white", border: "none", borderRadius: 5, fontSize: 12, fontWeight: 500, cursor: busy ? "default" : "pointer" }}>
          {busy ? "上传中..." : "🔄 替换图片"}
        </button>
      </div>
    </div>
  )
}
