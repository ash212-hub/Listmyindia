import { Resend } from "resend"

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY)

export async function POST(req: Request) {
    try {
        const body = await req.json()

        const { email, name } = body

        const data = await resend.emails.send({
            from: `${process.env.NEXT_PUBLIC_EMAIL_FROM_NAME} <${process.env.NEXT_PUBLIC_EMAIL_FROM_ADDRESS}>`,
            to: email,
            subject: "Welcome to ListMyIndia 🚀",
            html: `
<div style="margin:0;padding:0;background:#eef2ff;font-family:Arial,sans-serif;">

  <div style="max-width:680px;margin:40px auto;background:#ffffff;border-radius:24px;overflow:hidden;border:1px solid #e5e7eb;box-shadow:0 10px 40px rgba(0,0,0,0.08);">

    <!-- Banner -->
    <img
      src="https://listmyindia.vercel.app/Gemini_Generated_Image_ihhxwpihhxwpihhx.png"
      alt="ListMyIndia Banner"
      style="width:100%;height:280px;object-fit:cover;display:block;"
    />

    <!-- Content -->
    <div style="padding:50px 40px;">

      <!-- Logo / Brand -->
      <div style="margin-bottom:24px;">
        <h2 style="margin:0;font-size:18px;color:#2947b5;letter-spacing:1px;">
          LISTMYINDIA
        </h2>
      </div>

      <!-- Heading -->
      <h1 style="font-size:38px;line-height:46px;color:#0f172a;margin:0 0 18px;font-weight:700;">
        Welcome aboard, ${name} 👋
      </h1>

      <!-- Intro -->
      <p style="font-size:17px;line-height:32px;color:#475569;margin:0 0 24px;">
        Your account has been successfully created and you're now part of India's growing hyperlocal digital ecosystem.
      </p>

      <p style="font-size:17px;line-height:32px;color:#475569;margin:0 0 32px;">
        At ListMyIndia, we're building a platform that helps local businesses connect with customers across all 19,300+ pincodes in India — empowering neighborhood stores, entrepreneurs, service providers, and communities through technology.
      </p>

      <!-- Features -->
      <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:18px;padding:28px;margin-bottom:36px;">

        <h3 style="margin-top:0;margin-bottom:18px;font-size:20px;color:#0f172a;">
          What you can do now
        </h3>

        <table style="width:100%;border-collapse:collapse;">
          <tr>
            <td style="padding:10px 0;font-size:16px;color:#334155;">
              ✅ Discover nearby businesses
            </td>
          </tr>

          <tr>
            <td style="padding:10px 0;font-size:16px;color:#334155;">
              ✅ Explore local services & marketplaces
            </td>
          </tr>

          <tr>
            <td style="padding:10px 0;font-size:16px;color:#334155;">
              ✅ Connect with verified businesses
            </td>
          </tr>

          <tr>
            <td style="padding:10px 0;font-size:16px;color:#334155;">
              ✅ Support India's local economy
            </td>
          </tr>
        </table>
      </div>

      <!-- CTA -->
      <div style="margin-bottom:40px;">
        <a
          href="https://listmyindia.vercel.app/"
          style="
            display:inline-block;
            background:#2947b5;
            color:#ffffff;
            text-decoration:none;
            padding:16px 28px;
            border-radius:14px;
            font-size:16px;
            font-weight:600;
          "
        >
          Explore ListMyIndia →
        </a>
      </div>

      <!-- Quote -->
      <div style="border-left:4px solid #2947b5;padding-left:18px;margin-bottom:40px;">
        <p style="font-size:16px;line-height:30px;color:#475569;font-style:italic;margin:0;">
          "Connecting local businesses with customers across India's 19,300+ pincodes."
        </p>
      </div>

      <!-- Footer -->
      <div style="padding-top:30px;border-top:1px solid #e5e7eb;">

        <p style="font-size:14px;line-height:26px;color:#94a3b8;margin:0 0 10px;">
          Need help getting started? Simply reply to this email — we're happy to help.
        </p>

        <p style="font-size:14px;line-height:26px;color:#94a3b8;margin:0;">
          © 2026 ListMyIndia. Empowering local businesses digitally across India.
        </p>

      </div>

    </div>
  </div>
</div>
`
        })

        return Response.json(data)
    } catch (error) {
        return Response.json({ error })
    }
}