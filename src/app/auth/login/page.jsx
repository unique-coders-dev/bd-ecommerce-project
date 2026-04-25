"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";

const DEFAULT_LOGO = "";

export default function LoginPage() {
  const router = useRouter();
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [siteSettings, setSiteSettings] = useState(null);

  useEffect(() => {
    fetch('/api/admin/settings')
      .then(res => res.json())
      .then(d => setSiteSettings(d))
      .catch(() => {});
  }, []);

  const loginUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const callback = await signIn("credentials", {
        ...data,
        redirect: false,
      });

      if (callback?.error) {
        setError("Invalid email or password");
        setLoading(false);
      } else if (callback?.ok && !callback?.error) {
        router.push("/my-account");
        router.refresh();
      }
    } catch (err) {
      setError("An error occurred during login.");
      setLoading(false);
    }
  };

  const logoUrl = siteSettings?.logoUrl || DEFAULT_LOGO;
  const siteName = siteSettings?.siteName || "Mailbon";

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#f8f9fa] py-12 px-4 sm:px-6 lg:px-8 font-['Inter',sans-serif]">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-[30px] shadow-2xl shadow-gray-200/50 border border-gray-100 animate-fadeIn">
        <div className="text-center">
            <Link href="/" className="inline-block group transition-transform hover:scale-105 active:scale-95">
                {logoUrl ? (<img src={logoUrl} alt="Logo" className="w-full h-auto max-h-[50px] object-contain" />) : (<div className="w-16 h-16 mx-auto bg-primary text-white font-black flex items-center justify-center rounded-2xl text-4xl shadow-sm">M</div>)}
            </Link>
            <h2 className="text-3xl font-black tracking-tight text-[#111] uppercase italic">
                Welcome Back
            </h2>
            <div className="h-1 w-12 bg-[var(--color-primary)] mx-auto rounded-full mt-2"></div>
            <p className="mt-4 text-sm font-medium text-gray-400">
                Sign in to your account to continue
            </p>
        </div>

        <form className="mt-10 space-y-6" onSubmit={loginUser}>
          <div className="space-y-5">
            <div>
              <label className="block text-[11px] font-black uppercase tracking-widest text-[#111] mb-2" htmlFor="email">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="block w-full h-14 px-5 rounded-2xl border border-gray-100 bg-gray-50/50 text-sm outline-none focus:border-[var(--color-primary)]/30 focus:bg-white focus:ring-4 focus:ring-[var(--color-primary)]/5 transition-all font-medium"
                placeholder="you@example.com"
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
              />
            </div>
            <div>
                <div className="flex justify-between items-center mb-2">
                    <label className="block text-[11px] font-black uppercase tracking-widest text-[#111]" htmlFor="password">
                        Password
                    </label>
                    <Link href="/auth/forgot-password" className="text-[10px] font-black uppercase text-[var(--color-primary)] hover:underline">Forgot?</Link>
                </div>
                <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="block w-full h-14 px-5 rounded-2xl border border-gray-100 bg-gray-50/50 text-sm outline-none focus:border-[var(--color-primary)]/30 focus:bg-white focus:ring-4 focus:ring-[var(--color-primary)]/5 transition-all font-medium"
                    placeholder="••••••••"
                    value={data.password}
                    onChange={(e) => setData({ ...data, password: e.target.value })}
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
              disabled={loading}
              className="w-full h-14 bg-[#111] text-white flex items-center justify-center font-black uppercase tracking-[2px] rounded-2xl text-sm shadow-xl shadow-black/10 hover:bg-black transition-all active:scale-[0.98] disabled:opacity-70"
            >
              {loading ? (
                  <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
              ) : "Sign In"}
            </button>
          </div>
        </form>

        <div className="pt-6 border-t border-gray-50 text-center">
            <p className="text-gray-400 text-sm font-medium">
                New to {siteName}?{" "}
                <Link
                href="/auth/register"
                className="font-black text-[var(--color-primary)] uppercase text-[11px] tracking-widest hover:underline"
                >
                Create Account
                </Link>
            </p>
        </div>
      </div>
    </div>
  );
}
