"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const DEFAULT_LOGO = "https://kcbazar.com/wp-content/uploads/2025/08/KCB-LOGO-G.png";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const [siteSettings, setSiteSettings] = useState(null);

  useEffect(() => {
    fetch('/api/admin/settings').then(r => r.json()).then(d => setSiteSettings(d)).catch(() => {});
  }, []);

  const logoUrl = siteSettings?.logoUrl || DEFAULT_LOGO;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Something went wrong");
      } else {
        setSuccess("Check your email for the reset link.");
      }
    } catch (err) {
      setError("Failed to process request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#f8f9fa] py-12 px-4 sm:px-6 lg:px-8 font-['Inter',sans-serif]">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-[30px] shadow-2xl shadow-gray-200/50 border border-gray-100 animate-fadeIn">
        <div className="text-center">
            <Link href="/" className="inline-block transition-transform hover:scale-105 active:scale-95">
                <img
                    src={logoUrl}
                    alt={`${siteSettings?.siteName || 'KC Bazar'} Logo`}
                    className="h-10 w-auto mx-auto mb-6"
                />
            </Link>
            <h2 className="text-3xl font-black tracking-tight text-[#111] uppercase italic">
                Reset Password
            </h2>
            <div className="h-1 w-12 bg-[var(--color-primary)] mx-auto rounded-full mt-2"></div>
            <p className="mt-4 text-sm font-medium text-gray-400">
                Enter your email address and we'll send you a link to reset your password.
            </p>
        </div>

        {success ? (
            <div className="space-y-6">
                 <div className="p-6 bg-green-50 text-green-600 rounded-2xl border border-green-100 flex flex-col items-center gap-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path d="M5 13l4 4L19 7"/></svg>
                    </div>
                    <p className="text-sm font-black uppercase tracking-widest text-center">{success}</p>
                </div>
                <Link 
                    href="/auth/login" 
                    className="w-full h-14 bg-[#111] text-white flex items-center justify-center font-black uppercase tracking-[2px] rounded-2xl text-sm shadow-xl shadow-black/10 hover:bg-black transition-all"
                >
                    Back to Sign In
                </Link>
            </div>
        ) : (
            <form className="mt-10 space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-[11px] font-black uppercase tracking-widest text-[#111] mb-2" htmlFor="email">
                    Email Address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="block w-full h-14 px-5 rounded-2xl border border-gray-100 bg-gray-50/50 text-sm outline-none focus:border-[var(--color-primary)]/30 focus:bg-white focus:ring-4 focus:ring-[var(--color-primary)]/5 transition-all font-medium"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                {error && (
                    <div className="p-4 bg-primary-light text-primary-light0 text-[11px] font-black uppercase tracking-widest text-center rounded-xl border border-primary-soft animate-shake">
                        {error}
                    </div>
                )}

                <div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full h-14 bg-[#111] text-white flex items-center justify-center font-black uppercase tracking-[2px] rounded-2xl text-sm shadow-xl shadow-black/10 hover:bg-black transition-all active:scale-[0.98] disabled:opacity-70"
                    >
                        {loading ? "Processing..." : "Continue"}
                    </button>
                </div>
                
                <div className="text-center pt-2">
                    <Link href="/auth/login" className="text-[11px] font-black uppercase tracking-widest text-gray-400 hover:text-[var(--color-primary)] transition-colors">
                        Cancel and return
                    </Link>
                </div>
            </form>
        )}
      </div>
    </div>
  );
}
