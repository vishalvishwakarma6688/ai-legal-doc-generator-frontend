"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import DOMPurify from "dompurify";
import toast from "react-hot-toast";
import Loader from "@/components/Loader";
import {
    useSendResetOTP,
    useVerifyResetOTP,
    useResetPassword,
} from "@/hooks/useAuth";

const sanitize = (v) => DOMPurify.sanitize(v.trim());

export default function ResetPasswordPage() {
    const router = useRouter();
    const [step, setStep] = useState("request");
    const [form, setForm] = useState({
        email: "",
        otp: "",
        newPassword: "",
    });
    const otpRefs = useRef([]);
    const [resendTimer, setResendTimer] = useState(0);
    const { mutate: sendOTP, isPending: sendingOTP } = useSendResetOTP();
    const { mutate: verifyOTP, isPending: verifyingOTP } = useVerifyResetOTP();
    const { mutate: resetPassword, isPending: resettingPassword } = useResetPassword();

    // Resend cooldown
    useEffect(() => {
        if (resendTimer <= 0) return;
        const t = setInterval(() => setResendTimer((s) => s - 1), 1000);
        return () => clearInterval(t);
    }, [resendTimer]);

    useEffect(() => {
        if (step === "verify") {
            setTimeout(() => otpRefs.current?.[0]?.focus(), 0);
        }
    }, [step]);

    // Step 1: Send OTP
    const handleSendOTP = (e) => {
        e.preventDefault();
        const email = sanitize(form.email);
        if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
            toast.error("Please enter a valid email.");
            return;
        }
        sendOTP(
            { email },
            {
                onSuccess: () => {
                    setForm((f) => ({ ...f, email }));
                    setStep("verify");
                    setResendTimer(60);
                },
            }
        );
    };

    // Step 2: OTP verification
    const handleVerifyOTP = (e) => {
        e.preventDefault();
        const email = sanitize(form.email);
        const otp = sanitize(form.otp);
        if (otp.length !== 6) {
            toast.error("Please enter the complete 6-digit OTP.");
            return;
        }
        verifyOTP(
            { email, otp },
            {
                onSuccess: () => {
                    setStep("reset");
                },
                onError: () => {
                    setForm((f) => ({ ...f, otp: "" }));
                    otpRefs.current?.[0]?.focus();
                },
            }
        );
    };

    // Step 3: Reset password
    const handleResetPassword = (e) => {
        e.preventDefault();
        const newPassword = sanitize(form.newPassword);
        if (newPassword.length < 8) {
            toast.error("Password must be at least 8 characters long");
            return;
        }
        resetPassword(
            { email: form.email, otp: form.otp, newPassword },
            {
                onSuccess: () => {
                    setForm({ email: "", otp: "", newPassword: "" });
                    toast.success("Password reset successfully!");
                    router.push("/auth/login");
                },
            }
        );
    };

    const handleOtpChange = (value, index) => {
        if (/[^0-9]/.test(value)) return;
        const otpArray = (form.otp || "").split("").concat(Array(6).fill("")).slice(0, 6);
        otpArray[index] = value;
        const newOtp = otpArray.join("").slice(0, 6);
        setForm((f) => ({ ...f, otp: newOtp }));
        if (value && index < 5) otpRefs.current[index + 1]?.focus();
    };

    const handleOtpKeyDown = (e, index) => {
        if (e.key === "Backspace" && !form.otp[index] && index > 0) {
            otpRefs.current[index - 1]?.focus();
        }
    };

    const handleOtpPaste = (e) => {
        const digits = (e.clipboardData.getData("text") || "").replace(/\D/g, "").slice(0, 6);
        if (!digits) return;
        setForm((f) => ({ ...f, otp: digits.padEnd(6, "") }));
        const nextIndex = Math.min(digits.length, 5);
        setTimeout(() => otpRefs.current[nextIndex]?.focus(), 0);
        e.preventDefault();
    };

    const handleResend = () => {
        if (resendTimer > 0) return;
        sendOTP({ email: form.email }, { onSuccess: () => setResendTimer(60) });
    };

    const isLoading = sendingOTP || verifyingOTP || resettingPassword;

    return (
        <>
            {isLoading && <Loader />}
            <div className="flex flex-col items-center gap-14 justify-center min-h-screen">
                <div className="-mt-16 text-center border-b border-gray-500">
                    <Link href={"/"}>
                        <img src="/logo.svg" className="w-64" alt="Company Logo" />
                    </Link>
                </div>

                <div className="max-w-3xl">
                    <h2 className="font-bold text-center text-4xl">
                        {step === "request"
                            ? "Reset Your Password"
                            : step === "verify"
                                ? "Verify OTP"
                                : "Enter New Password"}
                    </h2>
                    <p className="text-gray-600 mt-4 text-lg px-6 sm:px-16 text-center">
                        {step === "request"
                            ? "Enter your email and we'll send you a 6-digit OTP."
                            : step === "verify"
                                ? "Enter the 6-digit OTP we emailed you."
                                : "Enter your new password."}
                    </p>
                </div>

                <div className="w-[500px] max-w-[92vw]">
                    {/* Step 1: Request OTP */}
                    {step === "request" && (
                        <form onSubmit={handleSendOTP} className="space-y-4">
                            <label className="text-[16px] text-gray-700 font-semibold">Email</label>
                            <input
                                type="email"
                                placeholder="Email"
                                value={form.email}
                                onChange={(e) => setForm({ ...form, email: sanitize(e.target.value) })}
                                className="w-full border text-[17px] bg-transparent border-gray-300 mt-3 rounded-lg outline-0 p-4 py-4"
                                required
                            />
                            <button className="w-full mt-4 text-[16px] cursor-pointer bg-blue-600 hover:bg-blue-800 transition-all rounded-lg text-white py-4">
                                {sendingOTP ? "Sending OTP..." : "Send OTP"}
                            </button>
                        </form>
                    )}

                    {/* Step 2: Verify OTP */}
                    {step === "verify" && (
                        <form onSubmit={handleVerifyOTP} className="space-y-4">
                            <label className="text-[16px] text-gray-700 font-semibold">OTP</label>
                            <div className="flex gap-2 mt-3" onPaste={handleOtpPaste}>
                                {Array(6)
                                    .fill("")
                                    .map((_, i) => (
                                        <input
                                            key={i}
                                            type="password"
                                            maxLength={1}
                                            value={form.otp[i] || ""}
                                            onChange={(e) => handleOtpChange(e.target.value, i)}
                                            onKeyDown={(e) => handleOtpKeyDown(e, i)}
                                            ref={(el) => (otpRefs.current[i] = el)}
                                            className="w-26 h-26 text-center border text-[20px] bg-transparent border-gray-300 rounded-lg outline-0"
                                        />
                                    ))}
                            </div>
                            <div className="text-sm text-gray-600 flex gap-2 items-center">
                                <button
                                    type="button"
                                    onClick={handleResend}
                                    disabled={resendTimer > 0}
                                    className="underline text-blue-600 disabled:text-gray-400"
                                >
                                    Resend OTP
                                </button>
                                {resendTimer > 0 && <span>in {resendTimer}s</span>}
                            </div>
                            <button className="w-full mt-4 text-[16px] cursor-pointer bg-blue-600 hover:bg-blue-800 transition-all rounded-lg text-white py-4">
                                {verifyingOTP ? "Verifying..." : "Verify OTP"}
                            </button>
                        </form>
                    )}

                    {/* Step 3: Reset Password */}
                    {step === "reset" && (
                        <form onSubmit={handleResetPassword} className="space-y-4">
                            <label className="font-semibold">New Password</label>
                            <input
                                type="password"
                                placeholder="Enter new password"
                                value={form.newPassword}
                                onChange={(e) => setForm({ ...form, newPassword: sanitize(e.target.value) })}
                                className="w-full border p-4 rounded-lg"
                                required
                            />
                            <p className="text-xs text-gray-500">
                                Must be at least 8 characters long.
                            </p>
                            <button className="w-full bg-blue-600 text-white py-3 rounded-lg">
                                {resettingPassword ? "Resetting..." : "Reset Password"}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </>
    );
}
