"use client";
import { useState } from "react";
import { useLogin } from "../../../hooks/useAuth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [remember, setRemember] = useState(false);
  const { mutate, isPending } = useLogin();
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(
      { ...form, remember },
      {
        onSuccess: () => {
          toast.success("Login successful!");
          router.push("/dashboard");
          setForm({ email: "", password: "" });
        },
        onError: (err) => {
          toast.error(err.response?.data?.message || "Login failed");
          setForm({ email: "", password: "" });
        },
      }
    );
  };

  return (
    <div className="flex flex-col items-center gap-14 justify-center h-screen">
      <div className="-mt-11 text-center border-b border-gray-500">
        <Link href={"/"}>
        <img src="/logo.svg" className="w-64" alt="Company Logo" />
        </Link>
      </div>
      <div className="max-w-2xl">
        <h2 className="font-bold text-center text-5xl">Welcome back</h2>
      </div>
      <div className="w-[500px]">
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="w-full">
            <label htmlFor="" className="text-[16px] text-gray-700 font-semibold">
              Email
            </label>
            <input
              type="email"
              placeholder="Email"
              required
              className="w-full border text-[17px] bg-transparent border-gray-300 mt-3 rounded-lg outline-0 p-4 py-4"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>
          <div className="mt-8">
            <label htmlFor="" className="text-[16px] text-gray-700 font-semibold">
              Password
            </label>
            <input
              type="password"
              placeholder="Password"
              required
              className="w-full border text-[17px] bg-transparent border-gray-300 mt-3 rounded-lg outline-0 p-4 py-4"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>
          <div className="flex gap-2 items-center mt-6">
            <input
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              className="h-6 w-6"
              type="checkbox"
              name="remember"
              id="remember"
            />
            <label className="text-lg font-bold" htmlFor="remember">
              Remember me
            </label>
          </div>
          <button
            type="submit"
            disabled={isPending}
            className="w-full mt-4 text-[16px] cursor-pointer bg-blue-600 hover:bg-blue-800 transition-all rounded-lg text-white py-4"
          >
            {isPending ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className="mt-6 font-bold text-gray-500 text-lg">
          Don’t have an account?{" "}
          <Link href="/auth/register" className="text-blue-500 underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
