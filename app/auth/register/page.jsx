"use client";

import { useState, useEffect } from "react";
import { useRegister } from "../../../hooks/useAuth";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader";

export default function RegisterPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const { mutate, isPending, isSuccess } = useRegister();
  const router = useRouter();

  useEffect(() => {
    if (isSuccess) {
      toast.success("OTP sent! Please verify your email.");
      router.push("/auth/verify");
    }
  }, [isSuccess, router]);

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(form, {
      onError: (err) => {
        console.log("Error message", err.response.data.msg);
        toast.error(err.response?.data?.msg || "Registration failed");
      },
    });
  };

  return (
    <>
      {isPending && <Loader />}
      <div className="flex flex-col items-center gap-14 justify-center h-screen">
        <div className="-mt-11 text-center border-b border-gray-500">
          <Link href={"/"}>
            <img src="/logo.svg" className="w-64" alt="Company Logo" />
          </Link>
        </div>
        <div className="max-w-2xl">
          <h2 className="font-bold text-center text-5xl">
            Create Your Account
          </h2>
        </div>
        <div className="w-[500px]">
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label
                htmlFor=""
                className="text-[16px] text-gray-700 font-semibold"
              >
                Name
              </label>
              <input
                type="text"
                placeholder="Name"
                required
                className="w-full border text-[17px] bg-transparent border-gray-300 mt-3 rounded-lg outline-0 p-4 py-4"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>
            <div className="mt-8">
              <label
                htmlFor=""
                className="text-[16px] text-gray-700 font-semibold"
              >
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
              <label
                htmlFor=""
                className="text-[16px] text-gray-700 font-semibold"
              >
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
            <button
              type="submit"
              disabled={isPending}
              className="w-full mt-4 text-[16px] cursor-pointer bg-blue-600 hover:bg-blue-800 transition-all rounded-lg text-white py-4"
            >
              {isPending ? "Registering..." : "Register"}
            </button>
          </form>
          <p className="mt-6 font-bold text-gray-500 text-lg">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-blue-500 underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
