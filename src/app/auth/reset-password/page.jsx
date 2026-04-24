"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

const DEFAULT_LOGO = "https://kcbazar.com/wp-content/uploads/2025/08/KCB-LOGO-G.png";

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const [siteSettings, setSiteSettings] = useState(null);

  useEffect(() => {
    if (!token) {
      setError("Invalid or missing reset token.");
    }
    fetch('/api/admin/settings').then(r => r.json()).then(d => setSiteSettings(d)).catch(() => {});
  }, [token]);

  const logoUrl = siteSettings?.logoUrl || DEFAULT_LOGO;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Failed to reset password.");
      } else {
        setSuccess("Password reset successfully!");
        setTimeout(() => router.push("/auth/login"), 2000);
      }
    } catch (err) {
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
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
              New Password
          </h2>
          <div className="h-1 w-12 bg-[var(--color-primary)] mx-auto rounded-full mt-2"></div>
      </div>

      {success ? (
          <div className="space-y-6">
               <div className="p-6 bg-green-50 text-green-600 rounded-2xl border border-green-100 flex flex-col items-center gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path d="M5 13l4 4L19 7"/></svg>
                  </div>
                  <p className="text-sm font-black uppercase tracking-widest text-center">{success}</p>
                   <p className="text-[10px] text-gray-400 font-bold uppercase">Redirecting to login...</p>
              </div>
          </div>
      ) : (
          <form className="mt-10 space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-4">
                  <div>
                    <label className="block text-[11px] font-black uppercase tracking-widest text-[#111] mb-2" htmlFor="password">
                      New Password
                    </label>
                    <input
                      id="password"
                      type="password"
                      required
                      className="block w-full h-14 px-5 rounded-2xl border border-gray-100 bg-gray-50/50 text-sm outline-none focus:border-[var(--color-primary)]/30 focus:bg-white focus:ring-4 focus:ring-[var(--color-primary)]/5 transition-all font-medium"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-black uppercase tracking-widest text-[#111] mb-2" htmlFor="confirm">
                      Confirm New Password
                    </label>
                    <input
                      id="confirm"
                      type="password"
                      required
                      className="block w-full h-14 px-5 rounded-2xl border border-gray-100 bg-gray-50/50 text-sm outline-none focus:border-[var(--color-primary)]/30 focus:bg-white focus:ring-4 focus:ring-[var(--color-primary)]/5 transition-all font-medium"
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
              </div>

              {error && (
                  <div className="p-4 bg-primary-light text-primary-light0 text-[11px] font-black uppercase tracking-widest text-center rounded-xl border border-primary-soft animate-shake">
                      {error}
                  </div>
              )}

              <div>
                  <button
                      type="submit"
                      disabled={loading || !token}
                      className="w-full h-14 bg-[#111] text-white flex items-center justify-center font-black uppercase tracking-[2px] rounded-2xl text-sm shadow-xl shadow-black/10 hover:bg-black transition-all active:scale-[0.98] disabled:opacity-70"
                  >
                      {loading ? "Saving..." : "Reset Password"}
                  </button>
              </div>
          </form>
      )}
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#f8f9fa] py-12 px-4 sm:px-6 lg:px-8 font-['Inter',sans-serif]">
      <Suspense fallback={<div className="text-[var(--color-primary)] font-black uppercase animate-pulse">Loading...</div>}>
        <ResetPasswordForm />
      </Suspense>
    </div>
  );
}
