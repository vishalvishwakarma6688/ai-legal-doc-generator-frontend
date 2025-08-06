"use client";
import { useState, useRef } from "react";
import { useVerify } from "../../../hooks/useAuth";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function VerifyPage() {
  const [form, setForm] = useState({ email: "", otp: "" });
  const { mutate, isPending } = useVerify();
  const router = useRouter();
  const otpRefs = useRef([]);

  const handleOtpChange = (value, index) => {
    if (/[^0-9]/.test(value)) return;
    const otpArray = form.otp.split("").concat(Array(6).fill("")).slice(0, 6);
    otpArray[index] = value;
    const newOtp = otpArray.join("").slice(0, 6);
    setForm({ ...form, otp: newOtp });

    // Auto-focus next input
    if (value && index < 5) {
      otpRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !form.otp[index] && index > 0) {
      otpRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.otp.length !== 6) {
      toast.error("Please enter the complete 6-digit OTP.");
      return;
    }
    mutate(form, {
      onSuccess: () => {
        toast.success("Account verified! Please login.");
        router.push("/auth/login");
        setForm({ email: "", otp: "" });
      },
      onError: (err) => {
        toast.error(err.response?.data?.message || "Verification failed");
        setForm({ email: "", otp: "" });
      },
    });
  };

  return (
    <div className="flex flex-col items-center gap-14 justify-center h-screen">
      <div className="-mt-16 text-center border-b border-gray-500">
        <Link href={"/"}>
          <img src="/logo.svg" className="w-64" alt="Company Logo" />
        </Link>
      </div>
      <div className="max-w-2xl">
        <h2 className="font-bold text-center text-5xl">Verify OTP</h2>
      </div>
      <div className="w-[500px]">
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="text-[16px] text-gray-700 font-semibold">
              Email
            </label>
            <input
              type="email"
              placeholder="Email"
              className="w-full border text-[17px] bg-transparent border-gray-300 mt-3 rounded-lg outline-0 p-4 py-4"
              value={form.email}
              required
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>
          <div className="mt-8">
            <label className="text-[16px] text-gray-700 font-semibold">
              OTP
            </label>
            <div className="flex gap-2 mt-3">
              {Array(6)
                .fill("")
                .map((_, i) => (
                  <input
                    key={i}
                    type="text"
                    maxLength={1}
                    className="w-26 h-26 text-center border text-[20px] bg-transparent border-gray-300 rounded-lg outline-0"
                    value={form.otp[i] || ""}
                    onChange={(e) => handleOtpChange(e.target.value, i)}
                    onKeyDown={(e) => handleKeyDown(e, i)}
                    ref={(el) => (otpRefs.current[i] = el)}
                  />
                ))}
            </div>
          </div>
          <button
            type="submit"
            disabled={isPending}
            className="w-full mt-4 text-[16px] cursor-pointer bg-blue-600 hover:bg-blue-800 transition-all rounded-lg text-white py-4"
          >
            {isPending ? "Verifying..." : "Verify"}
          </button>
        </form>
      </div>
    </div>
  );
}
