"use client";

import Image from "next/image";
import Link from "next/link";


export default function Hero() {
  return (
    <div className="min-h-screen relative flex flex-col gap-5 items-center justify-center bg-black 
      bg-[radial-gradient(circle_at_center,_rgba(255,0,0,0.4)_0%,_transparent_60%)]">
        <div className="flex flex-row gap-2 items-center absolute top-5 left-5">
          <Image height={500} width={500} src="/logo.svg" alt="logo" className="h-15 w-15 object-cover"/>
          <h1 className="font-mono tracking-widest text-2xl text-white font-bold">Ausboard</h1>
        </div>
      <h1 className="text-white text-center text-6xl font-bold">Test your Website&apos;s <br/> <span className="text-5xl font-extrabold text-red-500 drop-shadow-[0_0_10px_rgba(255,0,0,0.8)] animate-pulse">Performance</span> using Ausboard</h1>
      <h1 className="text-white/50 text-center text-3xl font-medium">Comprehensive testing platform for APIs, UI Performance and user experience.<br/>Get instant insights and actionable recommendations.</h1>
      <div className="flex flex-row gap-8 items-center justify-center">
        <div className="flex flex-row gap-1 items-center">
          <Image height={500} width={500} src="/globe.svg" alt="globe" className="h-5 w-5 object-cover"/>
          <p className="text-red-500 font-light tracking-wider">API Testing</p>
        </div>
        <div className="flex flex-row gap-1 items-center">
          <Image height={500} width={500} src="/perf.svg" alt="globe" className="h-5 w-5 object-cover"/>
          <p className="text-red-500 font-light tracking-wider">Performance Analysis</p>
        </div>
        <div className="flex flex-row gap-1 items-center">
          <Image height={500} width={500} src="/lightning.svg" alt="globe" className="h-5 w-5 object-cover"/>
          <p className="text-red-500 font-light tracking-wider">UI Optimization</p>
        </div>
      </div>
      <div className="flex flex-row items-center justify-center gap-20">
        <Link href="/login">
        <button className="w-32 py-2 px-4 text-white font-semibold rounded-md bg-red-600 shadow-[0_0_20px_rgba(255,0,0,0.7)] hover:shadow-[0_0_30px_rgba(255,0,0,1)] transition">
          Login
        </button>
        </Link>
        <Link href="/signup" className="cursor-pointer">
        <button className="w-32 py-2 px-4 text-red-500 font-semibold rounded-md border border-red-500 shadow-[0_0_10px_rgba(255,0,0,0.5)] hover:shadow-[0_0_20px_rgba(255,0,0,1)] transition">
          Sign Up
        </button>
        </Link>
      </div>
    </div>
  );
}
