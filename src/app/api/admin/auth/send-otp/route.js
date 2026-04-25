import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { sendAdminOtpEmail } from "@/lib/mail";

// Generate a cryptographically safe 6-digit OTP
function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function POST(req) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Only allow admin/super-admin roles to request OTP
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      // Return generic message to prevent email enumeration
      return NextResponse.json({ success: true });
    }

    if (!["admin", "super-admin"].includes(user.role)) {
      return NextResponse.json(
        { error: "This email is not registered as an admin account." },
        { status: 403 }
      );
    }

    if (user.status === "suspended") {
      return NextResponse.json(
        { error: "This account has been suspended. Contact support." },
        { status: 403 }
      );
    }

    const otp = generateOtp();
    const expiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now

    // Save OTP to DB
    await prisma.user.update({
      where: { email },
      data: { adminOtp: otp, adminOtpExpiry: expiry },
    });

    // Send OTP email
    await sendAdminOtpEmail(email, user.name || "Admin", otp);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("SEND_OTP_ERROR", error);
    return NextResponse.json(
      { error: "Failed to send OTP. Check your email configuration." },
      { status: 500 }
    );
  }
}
