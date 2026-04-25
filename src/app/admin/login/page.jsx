"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";
import toast from "react-hot-toast";

export default function AdminLoginPage() {
  const router = useRouter();
  const [step, setStep] = useState(1); // 1: Email, 2: OTP
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [siteSettings, setSiteSettings] = useState(null);

  useEffect(() => {
    fetch("/api/admin/settings")
      .then((res) => res.json())
      .then((d) => setSiteSettings(d))
      .catch(() => {});
  }, []);

  const siteName = siteSettings?.siteName || "Admin";
  const logoUrl = siteSettings?.logoUrl || null;

  // Generate monogram: first character of each word, max 2 chars
  const monogram = siteName
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const requestOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to send OTP.");
      } else {
        toast.success("OTP sent to your email!");
        setStep(2);
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const callback = await signIn("credentials", {
        email,
        otp,
        redirect: false,
      });

      if (callback?.error) {
        setError("Invalid OTP or expired.");
        setLoading(false);
      } else if (callback?.ok && !callback?.error) {
        router.push("/admin");
        router.refresh();
      }
    } catch (err) {
      setError("An error occurred during verification.");
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-full items-center justify-center bg-[#f1f2f6] px-4 font-['Inter',sans-serif]">
      <div className="w-full max-w-md space-y-8 rounded-2xl bg-white p-10 shadow-2xl border border-gray-100">
        <div className="text-center">
          {/* Logo: show image if available, otherwise monogram */}
          {logoUrl ? (
            <Link href="/" className="inline-block mb-6">
              <img
                src={logoUrl}
                alt={`${siteName} Logo`}
                className="h-14 w-auto mx-auto object-contain"
              />
            </Link>
          ) : (
            <div className="mx-auto w-16 h-16 bg-[var(--color-primary)] rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-[var(--color-primary)]/30">
              <span className="text-white font-black text-2xl tracking-tighter">
                {monogram}
              </span>
            </div>
          )}

          <h2 className="text-3xl font-black tracking-tight text-[#111] uppercase">
            Admin Portal
          </h2>
          <p className="mt-2 text-sm font-medium text-gray-400">
            Secure passwordless access
          </p>
        </div>

        {step === 1 ? (
          <form className="mt-10 space-y-6" onSubmit={requestOtp}>
            <div className="space-y-4">
              <div>
                <label
                  className="block text-[11px] font-black uppercase tracking-wider text-gray-400 mb-2"
                  htmlFor="email"
                >
                  Admin Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full h-12 px-4 rounded-xl border border-gray-200 bg-gray-50/50 text-sm outline-none focus:border-[var(--color-primary)] focus:ring-4 focus:ring-[var(--color-primary)]/5 transition-all"
                  placeholder="admin@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-50 text-red-500 text-xs font-bold p-3 rounded-lg text-center border border-red-100 animate-shake">
                {error}
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full h-14 bg-[#111] text-white flex items-center justify-center font-black uppercase tracking-[2px] rounded-xl text-sm hover:bg-black transition-all shadow-xl shadow-black/10 disabled:opacity-70 group"
              >
                {loading ? (
                  <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  "Send Login Code"
                )}
              </button>
            </div>
          </form>
        ) : (
          <form className="mt-10 space-y-6" onSubmit={verifyOtp}>
            <div className="space-y-4">
              <div>
                <label
                  className="block text-[11px] font-black uppercase tracking-wider text-gray-400 mb-2 text-center"
                  htmlFor="otp"
                >
                  Enter 6-Digit Code
                </label>
                <input
                  id="otp"
                  name="otp"
                  type="text"
                  required
                  maxLength="6"
                  className="block w-full h-14 px-4 rounded-xl border border-gray-200 bg-gray-50/50 text-2xl tracking-[10px] text-center outline-none focus:border-[var(--color-primary)] focus:ring-4 focus:ring-[var(--color-primary)]/5 transition-all font-black"
                  placeholder="••••••"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
                <p className="text-xs text-gray-400 text-center mt-3">
                  Sent to <span className="font-bold text-[#111]">{email}</span>
                </p>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 text-red-500 text-xs font-bold p-3 rounded-lg text-center border border-red-100 animate-shake">
                {error}
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={loading || otp.length !== 6}
                className="w-full h-14 bg-[var(--color-primary)] text-white flex items-center justify-center font-black uppercase tracking-[2px] rounded-xl text-sm hover:opacity-90 transition-all shadow-xl shadow-[var(--color-primary)]/20 disabled:opacity-50"
              >
                {loading ? (
                  <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  "Verify & Login"
                )}
              </button>
            </div>
            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => { setStep(1); setOtp(""); setError(null); }}
                className="text-[11px] font-bold text-gray-400 hover:text-[var(--color-primary)] transition-colors uppercase tracking-widest"
              >
                Use different email
              </button>
            </div>
          </form>
        )}

        <div className="text-center pt-2 border-t border-gray-100">
          <a
            href="/"
            className="text-[11px] font-bold text-gray-400 hover:text-[var(--color-primary)] transition-colors uppercase tracking-widest inline-block mt-4"
          >
            Return to storefront
          </a>
        </div>
      </div>
    </div>
  );
}
