import { prisma } from "../../../../lib/prisma";
import { NextResponse } from "next/server";
import crypto from "crypto";
import { sendResetPasswordEmail } from "../../../../lib/mail";

export async function POST(req) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      // User explicitly requested to show an error if user is not found
      return NextResponse.json({ error: "There is no user with this email address." }, { status: 404 });
    }

    // Generate token
    const token = crypto.randomBytes(32).toString("hex");
    const expiry = new Date(Date.now() + 3600000); // 1 hour from now

    await prisma.user.update({
      where: { email },
      data: {
        resetToken: token,
        resetTokenExpiry: expiry,
      },
    });

    try {
        await sendResetPasswordEmail(email, token);
        return NextResponse.json({ message: "Check your email for the reset link." });
    } catch (mailError) {
        console.error("MAIL_SEND_ERROR", mailError);
        // Fallback log for dev if SMTP is not configured yet
        const resetUrl = `${process.env.NEXTAUTH_URL}/auth/reset-password?token=${token}`;
        console.log("-----------------------------------------");
        console.log("CRITICAL: SMTP FAILED. LINK FOR DEV ONLY:", resetUrl);
        console.log("-----------------------------------------");
        
        return NextResponse.json({ error: "Failed to send email. Please contact support or check SMTP settings." }, { status: 500 });
    }

  } catch (error) {
    console.error("FORGOT_PASSWORD_ERROR", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
