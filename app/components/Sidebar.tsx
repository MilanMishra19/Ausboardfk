"use client";
import Link from "next/link";
import Image from "next/image";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL;
export default function Sidebar() {
  const [,startTransition] = useTransition();
  const router = useRouter();
  const handleLogOut = async () => {
    try{
      const res = await fetch(`${BACKEND_URL}/logout`,{
        method:"POST",
        credentials:"include"
      });
      if(res.ok){
        alert("Logout Successful");
        startTransition(()=>{
          router.push("/login");
        });
      } else {
        alert("Logout failed");
      }
    } catch (err) {
      console.error("Logout error",err);
      alert("Error occured on backend side");
    }
  };
  return (
    <aside className="fixed top-8 left-8 z-30 w-64 h-[90vh] bg-white backdrop-blur-md border border-white/20 rounded-3xl shadow-lg p-5 flex flex-col justify-between">
      {/* Header */}
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Image src="/logo.svg" alt="logo" width={40} height={40} className="rounded-full" />
          <span className="text-black font-bold text-xl tracking-widest font-mono">Ausboard</span>
        </div>

        {/* Section Title */}
        <div className="text-black/50 text-xs font-light uppercase tracking-widest pl-1">
          Navigation
        </div>

        {/* Nav Links */}
        <nav className="flex flex-col gap-2">
          <Link href="/dashboard" className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/10 transition">
            <Image src="/home.svg" alt="home" width={24} height={24} />
            <span className="text-black uppercase text-sm">Home</span>
          </Link>

          <Link href="/dashboard/projects" className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/10 transition">
            <Image src="/docs.svg" alt="projects" width={24} height={24} />
            <span className="text-black uppercase text-sm">Projects</span>
          </Link>

          <Link href="/dashboard/docs" className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/10 transition">
            <Image src="/temp.svg" alt="docs" width={24} height={24} />
            <span className="text-black uppercase text-sm">Docs</span>
          </Link>

          <Link href="/dashboard/templates" className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/10 transition">
            <Image src="/template.svg" alt="templates" width={24} height={24} />
            <span className="text-black uppercase text-sm">Templates</span>
          </Link>

          <Link href="/dashboard/settings" className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/10 transition">
            <Image src="/setting.svg" alt="settings" width={24} height={24} />
            <span className="text-black uppercase text-sm">Settings</span>
          </Link>
        </nav>
      </div>

      {/* Logout */}
      <div className="pt-4">
        <span onClick={handleLogOut} className="cursor-pointer flex items-center gap-2.5 p-[10px] rounded-md hover:bg-red-500/50">
          <Image src="/logou.svg" alt="logout" width={24} height={24} />
          <span className="uppercase text-sm text-black">Logout</span>
          </span>
      </div>
    </aside>
  );
}
