"use client"

import { useState, useEffect, useCallback } from "react"

const REPO = "bakeryserviceprovider-dot/gddelin-export"
const TOKEN_KEY = "gh_token"
const API_PROXY = "/api/github?token="

// ============================================================
// Simple YAML-like frontmatter parser
// ============================================================
function parseFrontmatter(text: string): { data: Record<string, any>; content: string } {
  const data: Record<string, any> = {}
  const match = text.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)
  if (!match) return { data, content: text }

  const fm = match[1]
  const body = match[2]
  const lines = fm.split("\n")

  let currentKey = ""
  let currentItem: { label: string; value: string } | null = null

  for (const line of lines) {
    // Top-level key: "value"
    const kv = line.match(/^(\w+):\s+"(.*)"$/)
    if (kv) { data[kv[1]] = kv[2]; currentKey = kv[1]; continue }

    // Top-level key: value (unquoted)
    const kv2 = line.match(/^(\w+):\s+(.+)$/)
    if (kv2 && !line.startsWith(" ") && !line.startsWith("-")) { data[kv2[1]] = kv2[2]; currentKey = kv2[1]; continue }

    // List item: "value"
    const li = line.match(/^\s+-\s+"(.+)"$/)
    if (li) {
      if (!data[currentKey] || !Array.isArray(data[currentKey])) data[currentKey] = []
      data[currentKey].push(li[1])
      continue
    }

    // Spec label
    const sl = line.match(/^\s+-\s+label:\s+"(.*)"$/)
    if (sl) {
      currentItem = { label: sl[1], value: "" }
      if (!data[currentKey] || !Array.isArray(data[currentKey])) data[currentKey] = []
      continue
    }

    // Spec value (right after label)
    const sv = line.match(/^\s{4,}value:\s+"(.*)"$/)
    if (sv && currentItem) {
      currentItem.value = sv[1]
      data[currentKey].push({ ...currentItem })
      currentItem = null
    }
  }

  return { data, content: body }
}

const FILE_FORMS: Record<string, { label: string; fields: FieldDef[] }> = {}

function generateFrontmatter(data: Record<string, any>, body: string, fieldDefs: FieldDef[]): string {
  let fm = "---\n"
  for (const def of fieldDefs) {
    const val = data[def.key]
    if (val === undefined || val === null || val === "") continue

    if (def.type === "list" && Array.isArray(val) && val.length > 0) {
      fm += `${def.key}:\n`
      for (const item of val) {
        fm += `  - "${item}"\n`
      }
    } else if (def.type === "specs" && Array.isArray(val) && val.length > 0) {
      fm += `${def.key}:\n`
      for (const item of val) {
        fm += `  - label: "${item.label}"\n    value: "${item.value}"\n`
      }
    } else {
      fm += `${def.key}: "${String(val)}"\n`
    }
  }
  fm += "---\n\n"
  return fm + body
}

// ============================================================
// FORM FIELD DEFINITIONS
// ============================================================
type FieldDef = {
  key: string
  label: string
  type: "text" | "textarea" | "select" | "list" | "specs" | "number"
  options?: string[]
  placeholder?: string
}

const PRODUCT_FIELDS: FieldDef[] = [
  { key: "title", label: "Product Name", type: "text", placeholder: "Seafood Constant Temperature Machine" },
  { key: "subtitle", label: "Subtitle", type: "text", placeholder: "Brief tagline for the product" },
  { key: "category", label: "Category", type: "select", options: ["Refrigeration Equipment", "Cooling Equipment", "Heat Exchanger Components"] },
  { key: "features", label: "Features (each line = one feature)", type: "list" },
  { key: "applications", label: "Applications (each line = one use case)", type: "list" },
  { key: "specifications", label: "Technical Specifications", type: "specs" },
  { key: "certifications", label: "Certifications (e.g. CE, ISO 9001)", type: "list" },
]

const BLOG_FIELDS: FieldDef[] = [
  { key: "title", label: "Article Title", type: "text", placeholder: "How to choose..." },
  { key: "excerpt", label: "Excerpt / Summary", type: "textarea", placeholder: "Short description for search results" },
  { key: "date", label: "Publish Date", type: "text", placeholder: "2026-07-14" },
  { key: "author", label: "Author", type: "text", placeholder: "Delin Engineering Team" },
  { key: "category", label: "Category", type: "select", options: ["Buying Guide", "Technical Guide", "Maintenance", "Industry News", "Case Study"] },
  { key: "tags", label: "Tags (each line = one tag)", type: "list" },
  { key: "readingTime", label: "Reading Time (minutes)", type: "number" },
]

// ============================================================
// COMPONENT
// ============================================================
export default function CMSPage() {
  const [token, setToken] = useState("")
  const [authed, setAuthed] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [page, setPage] = useState<"dashboard" | "editor">("dashboard")
  const [editingPath, setEditingPath] = useState("")
  const [editingType, setEditingType] = useState<"product" | "blog" | "code">("product")
  const [formData, setFormData] = useState<Record<string, any>>({})
  const [bodyContent, setBodyContent] = useState("")
  const [fieldDefs, setFieldDefs] = useState<FieldDef[]>([])
  const [listInputs, setListInputs] = useState<Record<string, string>>({})
  const [specLabels, setSpecLabels] = useState<Record<string, string>>({})
  const [fileSha, setFileSha] = useState("")
  const [msg, setMsg] = useState<{ text: string; ok: boolean } | null>(null)
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem(TOKEN_KEY)
    if (saved) { setToken(saved); setAuthed(true) }
    setLoaded(true)
  }, [])

  function show(text: string, ok = false) {
    setMsg({ text, ok })
    setTimeout(() => setMsg(null), 8000)
  }

  // ============================================================
  // LOAD FILE
  // ============================================================
  const loadFile = useCallback(async (path: string) => {
    setBusy(true)
    show("Loading...")
    try {
      const res = await fetch(`${API_PROXY}${encodeURIComponent(token)}&path=${encodeURIComponent(path)}`)
      if (!res.ok) { const err = await res.json(); throw new Error(err.message || `HTTP ${res.status}`) }
      const data = await res.json()
      const decoded = decodeURIComponent(escape(atob(data.content.replace(/\n/g, ""))))
      setFileSha(data.sha)
      setEditingPath(path)

      // Determine file type
      let type: "product" | "blog" | "code"
      let fields: FieldDef[] = []

      if (path.includes("products/")) {
        type = "product"
        fields = PRODUCT_FIELDS
      } else if (path.includes("blog/")) {
        type = "blog"
        fields = BLOG_FIELDS
      } else {
        type = "code"
        fields = []
      }

      setEditingType(type)
      setFieldDefs(fields)

      if (type === "code") {
        setBodyContent(decoded)
        setFormData({})
        setPage("editor")
        setMsg(null)
        setBusy(false)
        return
      }

      // Parse frontmatter
      const { data: fm, content } = parseFrontmatter(decoded)
      setFormData(fm)
      setBodyContent(content || "")

      // Init list inputs
      const li: Record<string, string> = {}
      const sl: Record<string, string> = {}
      for (const f of fields) {
        li[f.key] = ""
        sl[f.key] = ""
      }
      setListInputs(li)
      setSpecLabels(sl)
      setPage("editor")
      setMsg(null)
    } catch (e: any) {
      show("⚠️ " + (e.message || "Failed to load"))
    }
    setBusy(false)
  }, [token])

  // ============================================================
  // SAVE FILE
  // ============================================================
  const saveFile = async () => {
    if (!editingPath) return
    setBusy(true)
    show("Saving...")
    try {
      let fileContent = ""

      if (editingType === "code") {
        fileContent = bodyContent
      } else {
        fileContent = generateFrontmatter(formData, bodyContent, fieldDefs)
      }

      const encoded = btoa(unescape(encodeURIComponent(fileContent)))
      const body: any = { message: `Update ${editingPath}`, content: encoded, branch: "master" }
      if (fileSha) body.sha = fileSha

      const res = await fetch(`${API_PROXY}${encodeURIComponent(token)}&path=${encodeURIComponent(editingPath)}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || "Save failed")
      setFileSha(data.content?.sha || data.sha)
      show("✅ Saved! Vercel deploying now.", true)
    } catch (e: any) {
      show("⚠️ " + (e.message || "Save failed"))
    }
    setBusy(false)
  }

  // ============================================================
  // FORM HELPERS
  // ============================================================
  const addListItem = (key: string) => {
    const val = listInputs[key]?.trim()
    if (!val) return
    setFormData((prev) => ({ ...prev, [key]: [...(prev[key] || []), val] }))
    setListInputs((prev) => ({ ...prev, [key]: "" }))
  }

  const removeListItem = (key: string, idx: number) => {
    setFormData((prev) => ({
      ...prev,
      [key]: (prev[key] || []).filter((_: any, i: number) => i !== idx),
    }))
  }

  const updateField = (key: string, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }))
  }

  // ============================================================
  // LOGIN SCREEN
  // ============================================================
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
          <input type="password" value={token} onChange={(e) => setToken(e.target.value)} placeholder="ghp_..."
            onKeyDown={(e) => e.key === "Enter" && (localStorage.setItem(TOKEN_KEY, token), setAuthed(true))}
            style={{ width: "100%", padding: "12px 14px", border: "1px solid #cbd5e1", borderRadius: 8, fontSize: 14, marginBottom: 12, outline: "none" }} />
          <button onClick={() => (localStorage.setItem(TOKEN_KEY, token), setAuthed(true))} disabled={!token}
            style={{ width: "100%", padding: "12px", background: token ? "#2563eb" : "#94a3b8", color: "white", border: "none", borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: token ? "pointer" : "default" }}>
            Connect
          </button>
        </div>
      </main>
    )
  }

  // ============================================================
  // EDITOR
  // ============================================================
  if (page === "editor") {
    return (
      <main style={{ minHeight: "100vh", background: "#f8fafc" }}>
        <div style={{ maxWidth: 960, margin: "0 auto", padding: "16px 20px" }}>
          {/* Top bar */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, flexWrap: "wrap", gap: 8 }}>
            <div>
              <button onClick={() => { setPage("dashboard"); setMsg(null) }} style={{ background: "none", border: "none", color: "#2563eb", cursor: "pointer", fontSize: 14, fontWeight: 500 }}>
                ← Back to Dashboard
              </button>
              <span style={{ marginLeft: 8, fontSize: 12, color: "#94a3b8" }}>{editingPath}</span>
            </div>
            <button onClick={saveFile} disabled={busy} style={{ padding: "8px 24px", background: busy ? "#94a3b8" : "#059669", color: "white", border: "none", borderRadius: 6, fontSize: 14, fontWeight: 600, cursor: busy ? "default" : "pointer" }}>
              {busy ? "Saving..." : "💾 Save"}
            </button>
          </div>

          {msg && (
            <div style={{ padding: "10px 16px", background: msg.ok ? "#f0fdf4" : "#fef2f2", color: msg.ok ? "#166534" : "#991b1b", borderRadius: 8, marginBottom: 16, fontSize: 13, border: `1px solid ${msg.ok ? "#bbf7d0" : "#fecaca"}` }}>
              {msg.text}
            </div>
          )}

          {/* CODE EDITOR */}
          {editingType === "code" && (
            <textarea value={bodyContent} onChange={(e) => setBodyContent(e.target.value)}
              style={{ width: "100%", minHeight: "calc(100vh - 160px)", padding: 16, border: "1px solid #cbd5e1", borderRadius: 8, fontSize: 13, fontFamily: "monospace", lineHeight: 1.7, resize: "vertical", outline: "none", color: "#1e293b" }} />
          )}

          {/* FORM EDITOR */}
          {editingType !== "code" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {fieldDefs.map((def) => (
                <FormField
                  key={def.key}
                  def={def}
                  value={formData[def.key]}
                  listInput={listInputs[def.key] || ""}
                  onUpdate={updateField}
                  onAddListItem={addListItem}
                  onRemoveListItem={removeListItem}
                  onListInputChange={(v) => setListInputs((prev) => ({ ...prev, [def.key]: v }))}
                />
              ))}

              {/* Body text */}
              <div>
                <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#1e293b", marginBottom: 6 }}>
                  📝 Description / Body
                </label>
                <textarea value={bodyContent} onChange={(e) => setBodyContent(e.target.value)} rows={10}
                  style={{ width: "100%", padding: 12, border: "1px solid #cbd5e1", borderRadius: 8, fontSize: 13, fontFamily: "inherit", lineHeight: 1.6, resize: "vertical", outline: "none", color: "#1e293b" }}
                  placeholder="Write the main content here..." />
              </div>
            </div>
          )}
        </div>
      </main>
    )
  }

  // ============================================================
  // DASHBOARD
  // ============================================================
  const logout = () => { localStorage.removeItem(TOKEN_KEY); setAuthed(false); setToken("") }

  return (
    <main style={{ minHeight: "100vh", background: "#f8fafc", padding: 24 }}>
      <div style={{ maxWidth: 960, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
          <div>
            <h1 style={{ fontSize: 24, fontWeight: 700, color: "#0f172a" }}>📝 Delin CMS</h1>
            <p style={{ fontSize: 13, color: "#64748b" }}>Logged in as bakeryserviceprovider-dot</p>
          </div>
          <button onClick={logout} style={{ padding: "8px 16px", background: "white", border: "1px solid #e2e8f0", borderRadius: 6, fontSize: 13, cursor: "pointer", color: "#64748b" }}>Disconnect</button>
        </div>

        {msg && (
          <div style={{ padding: "10px 16px", background: msg.ok ? "#f0fdf4" : "#fef2f2", color: msg.ok ? "#166534" : "#991b1b", borderRadius: 8, marginBottom: 16, fontSize: 13, border: `1px solid ${msg.ok ? "#bbf7d0" : "#fecaca"}` }}>
            {msg.text}
          </div>
        )}

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 12, marginBottom: 28 }}>
          <QuickLink icon="🖼️" title="Upload Images" desc="Product photos" href={`https://github.com/${REPO}/upload/master/public/images/products`} />
          <QuickLink icon="✍️" title="New Blog Post" desc="Write SEO article" href={`https://github.com/${REPO}/new/master/src/content/blog`} />
          <QuickLink icon="📂" title="GitHub Repo" desc="Full file access" href={`https://github.com/${REPO}`} />
          <QuickLink icon="🚀" title="Deployments" desc="Check deploy status" href={`https://vercel.com/bakeryserviceprovider-8725s-projects/gddelin-export/deployments`} />
        </div>

        <Section title="📦 Products">
          <FileRow label="1. Seafood Constant Temp Machine" desc="海鲜恒温机" path="src/content/products/seafood-constant-temperature-machine.md" onEdit={loadFile} busy={busy} />
          <FileRow label="2. Industrial Water Chiller" desc="工业冷水机" path="src/content/products/industrial-water-chiller.md" onEdit={loadFile} busy={busy} />
          <FileRow label="3. Titanium Evaporator" desc="钛蒸发器" path="src/content/products/titanium-evaporator.md" onEdit={loadFile} busy={busy} />
          <FileRow label="4. Stainless Steel Heat Exchanger" desc="不锈钢换热器" path="src/content/products/stainless-steel-heat-exchanger.md" onEdit={loadFile} busy={busy} />
        </Section>

        <Section title="📝 Blog Posts">
          {["how-to-choose-seafood-cooling-system.md","industrial-chiller-maintenance-tips.md","titanium-vs-copper-evaporator-seawater.md","shell-tube-vs-plate-heat-exchanger.md","choose-reliable-china-refrigeration-manufacturer.md"].map((f) => (
            <FileRow key={f} label={f} desc="" path={`src/content/blog/${f}`} onEdit={loadFile} busy={busy} />
          ))}
        </Section>

        <Section title="⚙️ Settings">
          <FileRow label="Company Settings" desc="Name, phone, email (code file)" path="src/lib/constants.ts" onEdit={loadFile} busy={busy} />
          <FileRow label="About Page" desc="About us page" path="src/content/pages/about.md" onEdit={loadFile} busy={busy} />
        </Section>
      </div>
    </main>
  )
}

// ============================================================
// SUB-COMPONENTS
// ============================================================

function QuickLink({ icon, title, desc, href }: { icon: string; title: string; desc: string; href: string }) {
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
      <button onClick={() => onEdit(path)} disabled={busy}
        style={{ padding: "6px 14px", background: busy ? "#f1f5f9" : "#2563eb", color: busy ? "#94a3b8" : "white", border: "none", borderRadius: 6, fontSize: 12, fontWeight: 500, cursor: busy ? "default" : "pointer" }}>
        Edit
      </button>
    </div>
  )
}

// ============================================================
// FORM FIELD
// ============================================================
function FormField({
  def, value, listInput, onUpdate, onAddListItem, onRemoveListItem, onListInputChange,
}: {
  def: FieldDef
  value: any
  listInput: string
  onUpdate: (key: string, val: any) => void
  onAddListItem: (key: string) => void
  onRemoveListItem: (key: string, idx: number) => void
  onListInputChange: (val: string) => void
}) {
  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "10px 12px", border: "1px solid #cbd5e1", borderRadius: 8,
    fontSize: 14, outline: "none", color: "#1e293b", background: "white",
  }

  if (def.type === "select") {
    return (
      <div>
        <Label text={def.label} />
        <select value={value || ""} onChange={(e) => onUpdate(def.key, e.target.value)} style={inputStyle}>
          {def.options?.map((o) => (<option key={o} value={o}>{o}</option>))}
        </select>
      </div>
    )
  }

  if (def.type === "textarea") {
    return (
      <div>
        <Label text={def.label} />
        <textarea value={value || ""} onChange={(e) => onUpdate(def.key, e.target.value)} rows={3} style={{ ...inputStyle, fontFamily: "inherit", resize: "vertical" }} />
      </div>
    )
  }

  if (def.type === "list") {
    const items: string[] = Array.isArray(value) ? value : []
    return (
      <div>
        <Label text={def.label} />
        <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
          <input value={listInput} onChange={(e) => onListInputChange(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && (onAddListItem(def.key), e.preventDefault())}
            placeholder="Type and press Enter to add..." style={inputStyle} />
          <button onClick={() => onAddListItem(def.key)} style={{ padding: "8px 16px", background: "#2563eb", color: "white", border: "none", borderRadius: 6, fontSize: 13, fontWeight: 500, cursor: "pointer", whiteSpace: "nowrap" }}>
            + Add
          </button>
        </div>
        {items.map((item, i) => (
          <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "6px 10px", background: "#f8fafc", borderRadius: 6, marginBottom: 4, fontSize: 13, color: "#1e293b" }}>
            <span>{item}</span>
            <button onClick={() => onRemoveListItem(def.key, i)} style={{ background: "none", border: "none", color: "#ef4444", cursor: "pointer", fontSize: 16, padding: "0 4px" }}>×</button>
          </div>
        ))}
      </div>
    )
  }

  if (def.type === "specs") {
    const specs: { label: string; value: string }[] = Array.isArray(value) ? value : []
    return (
      <div>
        <Label text={def.label} />
        <div style={{ marginBottom: 8 }}>
          {specs.length === 0 && <p style={{ fontSize: 12, color: "#94a3b8", fontStyle: "italic" }}>No specifications yet</p>}
          {specs.map((spec, i) => (
            <div key={i} style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 6 }}>
              <input value={spec.label} onChange={(e) => {
                const updated = [...specs]
                updated[i] = { ...updated[i], label: e.target.value }
                onUpdate(def.key, updated)
              }} placeholder="Spec name" style={{ ...inputStyle, width: "40%" }} />
              <input value={spec.value} onChange={(e) => {
                const updated = [...specs]
                updated[i] = { ...updated[i], value: e.target.value }
                onUpdate(def.key, updated)
              }} placeholder="Value" style={{ ...inputStyle, width: "50%" }} />
              <button onClick={() => onRemoveListItem(def.key, i)} style={{ background: "none", border: "none", color: "#ef4444", cursor: "pointer", fontSize: 18, width: "10%" }}>×</button>
            </div>
          ))}
        </div>
        <button onClick={() => onUpdate(def.key, [...specs, { label: "", value: "" }])} style={{ padding: "6px 14px", background: "#f1f5f9", border: "1px solid #cbd5e1", borderRadius: 6, fontSize: 12, color: "#475569", cursor: "pointer" }}>
          + Add Specification
        </button>
      </div>
    )
  }

  // Default: text input
  return (
    <div>
      <Label text={def.label} />
      <input value={value || ""} onChange={(e) => onUpdate(def.key, e.target.value)} placeholder={def.placeholder} style={inputStyle} />
    </div>
  )
}

function Label({ text }: { text: string }) {
  return <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#1e293b", marginBottom: 6 }}>{text}</label>
}
