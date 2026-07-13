import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, company, product, message } = body

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address." },
        { status: 400 }
      )
    }

    // === In production, send email via your SMTP provider ===
    // Example with Nodemailer (uncomment and configure):
    // const transporter = nodemailer.createTransport({
    //   host: process.env.SMTP_HOST,
    //   port: parseInt(process.env.SMTP_PORT || "587"),
    //   secure: false,
    //   auth: {
    //     user: process.env.SMTP_USER,
    //     pass: process.env.SMTP_PASS,
    //   },
    // })
    //
    // await transporter.sendMail({
    //   from: `"${name}" <${email}>`,
    //   to: "info@gddelin.cn",
    //   subject: `New Inquiry from ${name} - ${product || "General"}`,
    //   html: `
    //     <h2>New Contact Form Submission</h2>
    //     <p><strong>Name:</strong> ${name}</p>
    //     <p><strong>Email:</strong> ${email}</p>
    //     <p><strong>Phone:</strong> ${phone || "N/A"}</p>
    //     <p><strong>Company:</strong> ${company || "N/A"}</p>
    //     <p><strong>Product Interest:</strong> ${product || "General"}</p>
    //     <p><strong>Message:</strong></p>
    //     <p>${message.replace(/\n/g, "<br>")}</p>
    //   `,
    // })

    // === You can also send to a Telegram/WhatsApp bot ===
    // Example with Telegram bot:
    // const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN
    // const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID
    // if (TELEGRAM_BOT_TOKEN && TELEGRAM_CHAT_ID) {
    //   const text = `🔔 New Inquiry!\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone || "N/A"}\nCompany: ${company || "N/A"}\nProduct: ${product || "General"}\n\nMessage:\n${message}`
    //   await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text }),
    //   })
    // }

    // Log the inquiry (for development)
    console.log("New inquiry received:", { name, email, phone, company, product, message })

    return NextResponse.json({
      success: true,
      message: "Thank you! Your inquiry has been received. We will get back to you within 24 hours.",
    })
  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json(
      { error: "Internal server error. Please try again or email us directly." },
      { status: 500 }
    )
  }
}
