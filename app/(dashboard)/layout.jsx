// "use client";
// import Link from "next/link";
// import { usePathname, useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import toast from "react-hot-toast";
// import { publicRoutes } from "@/utils/publicRoutes";

// export default function DashboardLayout({ children }) {
//   const [activeTab, setActiveTab] = useState()
//   const router = useRouter();
//   const pathName = usePathname();

//   useEffect(() => {
//     const token =
//     localStorage.getItem("token") || sessionStorage.getItem("token");
//     const isPublic = publicRoutes.includes(pathName);
//     if (!token && !isPublic) {
//       toast.error("Please login first");
//       router.replace("/auth/login");
//     }
//   }, [router, pathName]);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     sessionStorage.removeItem("token");
//     toast.success("Logged out");
//     router.replace("/auth/login");
//   };

//   return (
//     <div className="min-h-screen flex bg-gray-100">
//       <aside className="w-64 bg-gray-800 text-white flex flex-col p-4">
//         <h1 className="text-2xl font-bold mb-6">AI Legal Docs</h1>
//         <nav className="flex flex-col gap-4">
//           <Link
//             href="/dashboard"
//             className="hover:bg-gray-700 px-3 py-2 rounded"
//           >
//             Dashboard
//           </Link>
//           <Link
//             href="/documents/create"
//             className="hover:bg-gray-700 px-3 py-2 rounded"
//           >
//             Create Document
//           </Link>
//           <Link
//             href="/templates"
//             className="hover:bg-gray-700 px-3 py-2 rounded"
//           >
//             Templates
//           </Link>
//           <Link href="/plans" className="hover:bg-gray-700 px-3 py-2 rounded">
//             Upgrade Plan
//           </Link>
//         </nav>
//         <button
//           onClick={handleLogout}
//           className="mt-auto bg-red-500 px-3 py-2 rounded hover:bg-red-600"
//         >
//           Logout
//         </button>
//       </aside>

//       {/* Main Content */}
//       <div className="flex-1 flex flex-col">
//         <header className="bg-white shadow p-4 flex justify-between items-center">
//           <h2 className="text-xl text-black font-semibold">Dashboard</h2>
//         </header>
//         <main className="flex-1 p-6">{children}</main>
//       </div>
//     </div>
//   );
// }

"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { publicRoutes } from "@/utils/publicRoutes";

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const pathName = usePathname();

  useEffect(() => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    const isPublic = publicRoutes.includes(pathName);
    if (!token && !isPublic) {
      toast.error("Please login first");
      router.replace("/auth/login");
    }
  }, [router, pathName]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    toast.success("Logged out");
    router.replace("/auth/login");
  };

  const linkClasses = (path) =>
    `px-3 py-2 rounded transition ${
      pathName === path ? "bg-gray-700 font-semibold" : "hover:bg-gray-700"
    }`;

  return (
    <div className="min-h-screen flex bg-gray-100">
      <aside className="w-64 bg-gray-800 text-white flex flex-col p-4">
        <h1 className="text-2xl font-bold mb-6">AI Legal Docs</h1>
        <nav className="flex flex-col gap-4">
          <Link href="/dashboard" className={linkClasses("/dashboard")}>
            Dashboard
          </Link>
          <Link
            href="/documents/create"
            className={linkClasses("/documents/create")}
          >
            Create Document
          </Link>
          <Link href="/templates" className={linkClasses("/templates")}>
            Templates
          </Link>
          <Link href="/plans" className={linkClasses("/plans")}>
            Upgrade Plan
          </Link>
        </nav>
        <button
          onClick={handleLogout}
          className="mt-auto bg-red-500 px-3 cursor-pointer py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow p-4 flex justify-between items-center">
          <h2 className="text-xl text-black font-semibold">Dashboard</h2>
        </header>
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
