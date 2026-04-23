"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";

export default function RegisterPage() {
  const router = useRouter();
  const [data, setData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const registerUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const result = await response.json();
        setError(result.error || "An error occurred");
        setLoading(false);
      } else {
        const callback = await signIn("credentials", {
          email: data.email,
          password: data.password,
          redirect: false,
        });

        if (callback?.ok) {
          router.push("/my-account");
          router.refresh();
        }
      }
    } catch (err) {
      setError("Registration failed. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#f8f9fa] py-12 px-4 sm:px-6 lg:px-8 font-['Inter',sans-serif]">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-[30px] shadow-2xl shadow-gray-200/50 border border-gray-100 animate-fadeIn">
        <div className="text-center">
            <Link href="/" className="inline-block group transition-transform hover:scale-105 active:scale-95">
                <img
                    src="https://kcbazar.com/wp-content/uploads/2025/08/KCB-LOGO-G.png"
                    alt="KC Bazar Logo"
                    className="h-10 w-auto mx-auto mb-6"
                />
            </Link>
            <h2 className="text-3xl font-black tracking-tight text-[#111] uppercase italic">
                Join Us
            </h2>
            <div className="h-1 w-12 bg-[var(--color-primary)] mx-auto rounded-full mt-2"></div>
            <p className="mt-4 text-sm font-medium text-gray-400">
                Unlock exclusive beauty deals and faster checkout.
            </p>
        </div>

        <form className="mt-10 space-y-5" onSubmit={registerUser}>
          <div className="space-y-4">
            <div>
              <label className="block text-[11px] font-black uppercase tracking-widest text-[#111] mb-2" htmlFor="name">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="block w-full h-12 px-5 rounded-2xl border border-gray-100 bg-gray-50/50 text-sm outline-none focus:border-[var(--color-primary)]/30 focus:bg-white focus:ring-4 focus:ring-[var(--color-primary)]/5 transition-all font-medium"
                placeholder="John Doe"
                value={data.name}
                onChange={(e) => setData({ ...data, name: e.target.value })}
              />
            </div>
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
                className="block w-full h-12 px-5 rounded-2xl border border-gray-100 bg-gray-50/50 text-sm outline-none focus:border-[var(--color-primary)]/30 focus:bg-white focus:ring-4 focus:ring-[var(--color-primary)]/5 transition-all font-medium"
                placeholder="you@example.com"
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
              />
            </div>
            <div>
                <label className="block text-[11px] font-black uppercase tracking-widest text-[#111] mb-2" htmlFor="password">
                    Password
                </label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    required
                    className="block w-full h-12 px-5 rounded-2xl border border-gray-100 bg-gray-50/50 text-sm outline-none focus:border-[var(--color-primary)]/30 focus:bg-white focus:ring-4 focus:ring-[var(--color-primary)]/5 transition-all font-medium"
                    placeholder="••••••••"
                    value={data.password}
                    onChange={(e) => setData({ ...data, password: e.target.value })}
                />
            </div>
          </div>

          <div className="flex items-center">
            <input id="terms" name="terms" type="checkbox" required className="h-4 w-4 text-[var(--color-primary)] focus:ring-[var(--color-primary)] border-gray-300 rounded cursor-pointer" />
            <label htmlFor="terms" className="ml-2 block text-[11px] text-gray-400 font-bold uppercase tracking-wide">
                I agree to the <Link href="#" className="text-[var(--color-primary)] hover:underline">Terms & Conditions</Link>
            </label>
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
              ) : "Create Account"}
            </button>
          </div>
        </form>

        <div className="pt-6 border-t border-gray-50 text-center">
            <p className="text-gray-400 text-sm font-medium">
                Already have an account?{" "}
                <Link
                href="/auth/login"
                className="font-black text-[var(--color-primary)] uppercase text-[11px] tracking-widest hover:underline"
                >
                Sign In
                </Link>
            </p>
        </div>
      </div>
    </div>
  );
}
