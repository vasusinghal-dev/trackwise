import { sendEmail } from "./postmark";

export async function verifyEmailTemplate({
  user,
  url,
}: {
  user: { name: string; email: string };
  url: string;
}) {
  await sendEmail({
    to: user.email,
    subject: "Verify your email",
    html: `
      <div style="font-family: Arial, sans-serif; background:#f9fafb; padding:40px 0;">
        <table align="center" width="100%" cellpadding="0" cellspacing="0" style="max-width:520px; background:#ffffff; border-radius:8px; overflow:hidden;">
          <tr>
            <td style="padding:32px;">
              <h2 style="margin:0 0 16px; color:#111827;">
                Verify your email
              </h2>
  
              <p style="margin:0 0 16px; color:#374151; font-size:14px;">
                Hi ${user.name ?? "there"},
              </p>
  
              <p style="margin:0 0 24px; color:#374151; font-size:14px;">
                Please confirm your email address by clicking the button below.
              </p>
  
              <div style="text-align:center; margin:32px 0;">
                <a
                  href="${url}"
                  style="
                    display:inline-block;
                    padding:12px 20px;
                    background:#2563eb;
                    color:#ffffff;
                    text-decoration:none;
                    border-radius:6px;
                    font-weight:600;
                  "
                >
                  Verify Email
                </a>
              </div>
  
              <p style="margin:24px 0 0; color:#6b7280; font-size:12px;">
                If you didn’t create an account, you can safely ignore this email.
              </p>
            </td>
          </tr>
  
          <!-- Footer -->
          <tr>
            <td style="background:#f3f4f6; padding:16px; text-align:center;">
              <p style="margin:0; color:#9ca3af; font-size:12px;">
                © ${new Date().getFullYear()} Trackwise. All rights reserved.
              </p>
            </td>
          </tr>
        </table>
      </div>
    `,
    text: `Verify your email: ${url}`,
  });
}
