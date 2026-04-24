import nodemailer from "nodemailer";
import { prisma } from "./prisma";

export const sendResetPasswordEmail = async (email, token) => {
  const resetUrl = `${process.env.NEXTAUTH_URL}/auth/reset-password?token=${token}`;

  const settings = await prisma.setting.findUnique({
    where: { id: "site-settings" },
  });

  const siteName = settings?.siteName || "KC Bazar";
  const logoUrl = settings?.logoUrl || "https://kcbazar.com/wp-content/uploads/2025/08/KCB-LOGO-G.png";
  const primaryColor = (settings?.themeColor && !settings.themeColor.startsWith('var(')) 
    ? settings.themeColor 
    : "#FF4D6D";
  const year = new Date().getFullYear();

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_SERVER_HOST,
    port: process.env.EMAIL_SERVER_PORT,
    auth: {
      user: process.env.EMAIL_SERVER_USER,
      pass: process.env.EMAIL_SERVER_PASSWORD,
    },
  });

  const mailOptions = {
    from: `"${siteName} Support" <${process.env.EMAIL_FROM}>`,
    to: email,
    subject: `Reset Your ${siteName} Password`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e1e1e1; border-radius: 10px;">
        <div style="text-align: center; margin-bottom: 30px;">
           <img src="${logoUrl}" alt="${siteName}" style="height: 50px;">
        </div>
        <h2 style="color: #111; text-align: center;">Need a password reset?</h2>
        <p style="color: #666; line-height: 1.6;">Hello,</p>
        <p style="color: #666; line-height: 1.6;">We received a request to reset the password for your ${siteName} account. Click the button below to proceed:</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${resetUrl}" style="background-color: ${primaryColor}; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">Reset Password</a>
        </div>
        <p style="color: #999; font-size: 12px; line-height: 1.6;">If you didn't request this, you can safely ignore this email. The link will expire in 1 hour.</p>
        <hr style="border: 0; border-top: 1px solid #eee; margin: 30px 0;">
        <p style="color: #ccc; font-size: 11px; text-align: center;">&copy; ${year} ${siteName}. All rights reserved.</p>
      </div>
    `,
  };

  return transporter.sendMail(mailOptions);
};
