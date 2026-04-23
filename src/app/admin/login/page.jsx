"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const loginAdmin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const callback = await signIn("credentials", {
        ...data,
        redirect: false,
      });

      if (callback?.error) {
        setError("Invalid admin credentials");
        setLoading(false);
      } else if (callback?.ok && !callback?.error) {
        // Redirect directly to admin dashboard
        router.push("/admin");
        router.refresh();
      }
    } catch (err) {
      setError("An error occurred during admin login.");
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-full items-center justify-center bg-[#f1f2f6] px-4 font-['Inter',sans-serif]">
      <div className="w-full max-w-md space-y-8 rounded-2xl bg-white p-10 shadow-2xl border border-gray-100">
        <div className="text-center">
            <div className="mx-auto w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-primary/30">
                <span className="text-white font-black text-2xl">KC</span>
            </div>
          <h2 className="text-3xl font-black tracking-tight text-[#111] uppercase">
            Admin Portal
          </h2>
          <p className="mt-2 text-sm font-medium text-gray-400">
            Secure access for administrators only
          </p>
        </div>

        <form className="mt-10 space-y-6" onSubmit={loginAdmin}>
          <div className="space-y-4">
            <div>
              <label className="block text-[11px] font-black uppercase tracking-wider text-gray-400 mb-2" htmlFor="email">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="block w-full h-12 px-4 rounded-xl border border-gray-200 bg-gray-50/50 text-sm outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all"
                placeholder="admin@example.com"
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-[11px] font-black uppercase tracking-wider text-gray-400 mb-2" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="block w-full h-12 px-4 rounded-xl border border-gray-200 bg-gray-50/50 text-sm outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all"
                placeholder="••••••••"
                value={data.password}
                onChange={(e) => setData({ ...data, password: e.target.value })}
              />
            </div>
          </div>

          {error && (
            <div className="bg-primary-soft text-primary text-xs font-bold p-3 rounded-lg text-center border border-primary-soft animate-shake">
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
              ) : "Authenticate"}
            </button>
          </div>
        </form>

        <div className="text-center pt-2">
            <a href="/" className="text-[11px] font-bold text-gray-400 hover:text-primary transition-colors uppercase tracking-widest">
                Return to storefront
            </a>
        </div>
      </div>
    </div>
  );
}
