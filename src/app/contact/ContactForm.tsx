"use client"

import { useState, FormEvent } from "react"

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    product: "",
    message: "",
  })
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError("")

    if (!formData.name || !formData.email || !formData.message) {
      setError("Please fill in all required fields.")
      return
    }

    setLoading(true)

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong.")
      }

      setSubmitted(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again or email us directly.")
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="rounded-2xl bg-accent-50 border border-accent-200 p-10 text-center">
        <div className="text-5xl mb-4">✅</div>
        <h3 className="text-xl font-bold text-navy-900">Thank You!</h3>
        <p className="mt-2 text-navy-600">
          Your inquiry has been received. Our team will get back to you within 24 hours.
        </p>
        <p className="mt-4 text-sm text-navy-500">
          In the meantime, feel free to WhatsApp us for faster communication.
        </p>
        <button
          onClick={() => {
            setSubmitted(false)
            setFormData({ name: "", email: "", phone: "", company: "", product: "", message: "" })
          }}
          className="btn-primary mt-6"
        >
          Send Another Inquiry
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-navy-700 mb-1.5">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full rounded-xl border border-navy-200 bg-white px-4 py-3 text-sm text-navy-900 placeholder-navy-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 transition-colors"
            placeholder="Your full name"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-navy-700 mb-1.5">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full rounded-xl border border-navy-200 bg-white px-4 py-3 text-sm text-navy-900 placeholder-navy-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 transition-colors"
            placeholder="your@email.com"
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-navy-700 mb-1.5">
            Phone / WhatsApp
          </label>
          <input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full rounded-xl border border-navy-200 bg-white px-4 py-3 text-sm text-navy-900 placeholder-navy-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 transition-colors"
            placeholder="+86-757-82122021"
          />
        </div>
        <div>
          <label htmlFor="company" className="block text-sm font-medium text-navy-700 mb-1.5">
            Company Name
          </label>
          <input
            id="company"
            type="text"
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            className="w-full rounded-xl border border-navy-200 bg-white px-4 py-3 text-sm text-navy-900 placeholder-navy-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 transition-colors"
            placeholder="Your company name"
          />
        </div>
      </div>

      <div>
        <label htmlFor="product" className="block text-sm font-medium text-navy-700 mb-1.5">
          Product Interest
        </label>
        <select
          id="product"
          value={formData.product}
          onChange={(e) => setFormData({ ...formData, product: e.target.value })}
          className="w-full rounded-xl border border-navy-200 bg-white px-4 py-3 text-sm text-navy-900 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 transition-colors"
        >
          <option value="">Select a product (optional)</option>
          <option value="seafood">Seafood Constant Temperature Machine</option>
          <option value="chiller">Industrial Water Chiller</option>
          <option value="titanium">Titanium Evaporator / Coil</option>
          <option value="heat-exchanger">Stainless Steel Heat Exchanger</option>
          <option value="custom">Custom / OEM Request</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-navy-700 mb-1.5">
          Message <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          required
          rows={5}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full rounded-xl border border-navy-200 bg-white px-4 py-3 text-sm text-navy-900 placeholder-navy-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 transition-colors resize-y"
          placeholder="Tell us about your requirements — quantity, specifications, target delivery, etc."
        />
      </div>

      {error && (
        <div className="rounded-lg bg-red-50 border border-red-200 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="btn-primary w-full sm:w-auto disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? (
          <>
            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Sending...
          </>
        ) : (
          <>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
            Send Inquiry
          </>
        )}
      </button>

      <p className="text-xs text-navy-400">
        By submitting this form, you agree to be contacted about your inquiry. Your information will not be shared with third parties.
      </p>
    </form>
  )
}
