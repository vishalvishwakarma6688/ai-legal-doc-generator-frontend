"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { clsx } from "clsx";
import { publicRoutes } from "@/utils/publicRoutes";
import ConfirmModal from "@/components/ConfirmModal";

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const pathName = usePathname();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    const isPublic = publicRoutes.includes(pathName);
    if (!token && !isPublic) {
      toast.error("Please login first");
      router.replace("/auth/login");
    }
  }, [router, pathName]);

  useEffect(() => {
    let data =
      typeof window !== "undefined"
        ? JSON.parse(
            localStorage.getItem("user") ||
              sessionStorage.getItem("user") ||
              null
          )
        : null;
    setUser(data);
  }, []);

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    toast.success("Logged out");
    router.replace("/auth/login");
    setShowLogoutModal(false);
  };

  const NavLink = ({ href, icon, label }) => {
    const isActive = pathName === href;

    return (
      <Link
        href={href}
        className={clsx(
          "flex items-center gap-4 px-3 py-4 rounded transition",
          isActive ? "bg-gray-300 font-semibold" : "hover:bg-gray-200"
        )}
      >
        <img src={icon} alt="" className="w-7 h-7" />
        <span className="text-[13px]">{label}</span>
      </Link>
    );
  };

  return (
    <>
      <div className="min-h-screen flex bg-gray-100">
        <aside className="w-80 text-black shadow-xl flex flex-col p-11">
          <div className="mb-8">
            <Link href={"/dashboard"}>
              <img src="/logo.svg" className="w-48" alt="Logo" />
            </Link>
          </div>

          <nav className="flex flex-col gap-2">
            <NavLink href="/dashboard" icon="/home.svg" label="Home" />
            <NavLink
              href="/documents/create"
              icon="/new.svg"
              label="Create Document"
            />
            <NavLink href="/templates" icon="/template.svg" label="Templates" />
            <NavLink href="/plans" icon="/template.svg" label="Upgrade Plan" />
            <NavLink href="/profile" icon="/template.svg" label="Profile" />
            <NavLink href="/settings" icon="/setting.svg" label="Settings" />
          </nav>

          <button
            onClick={handleLogout}
            className="mt-auto bg-red-500 px-3 cursor-pointer py-2 rounded hover:bg-red-600 transition text-white"
          >
            Logout
          </button>
        </aside>

        <div className="flex-1 flex flex-col">
          <div className="p-10 flex flex-col gap-14">
            <h2 className="text-black font-semibold text-5xl">
              Welcome back {user?.name?.split(" ")[0] ?? "Guest"}
            </h2>
            <h3 className="text-black font-semibold text-3xl">
              {pathName === "/dashboard"
                ? "Get Started"
                : pathName === "/documents/create"
                ? "Create Document"
                : pathName === "/templates"
                ? "Your Templates"
                : pathName === "/plans"
                ? "Plans"
                : pathName === "/profile"
                ? "Profile"
                : pathName === "/settings"
                ? "Settings"
                : ""}
            </h3>
            {pathName === "/dashboard" && (
              <div className="flex gap-5">
                <button
                  onClick={() => router.push("/documents/create")}
                  className="bg-blue-500 shadow-sm rounded-lg cursor-pointer text-white font-semibold py-3 px-4"
                >
                  New Document
                </button>
                <button
                  onClick={() => router.push("/templates")}
                  className="bg-gray-300 shadow-sm rounded-lg cursor-pointer text-black font-semibold py-3 px-4"
                >
                  Templates
                </button>
              </div>
            )}
          </div>

          <main className="flex-1 p-10 py-1">{children}</main>
        </div>
      </div>
      {showLogoutModal && (
        <ConfirmModal
          isOpen={showLogoutModal}
          title="Confirm Logout"
          message="Are you sure you want to logout?"
          onConfirm={confirmLogout}
          onCancel={() => setShowLogoutModal(false)}
        />
      )}
    </>
  );
}
