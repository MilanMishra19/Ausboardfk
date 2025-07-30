"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL;
type User = {
    name: string,
    email?: string,
    id?:string
}
export default function Dashboard(){
    const tips = [
            "You can use predefined templates to save time and enforce best practices.",
            "Performance testing helps you detect slow endpoints before they become a problem.",
            "Security tests can prevent major vulnerabilities in production.",
            "Stress testing your API regularly ensures it scales under real-world conditions.",
            "Well-organized test cases improve onboarding for new team members.",
            "Test early, test often — it’s cheaper than fixing bugs in production.",
        ];
    const router = useRouter();
    const [stats,setStats] = useState<User | null>(null);
    const [authorized,setAuthorized] = useState< boolean | null>(null);
    const [currentTipIndex, setCurrentTipIndex] = useState(0);
    const [fade,setFade] = useState(true);
    useEffect(()=>{
        const fetchStats = async() => {
            try{
            const response = await fetch(`${BACKEND_URL}/api/users/me`,{
                credentials:"include"
            });
            if(response.ok) {
                const data: User = await response.json();
                setStats(data);
                setAuthorized(true);
                console.log("Stats fetched successfully: ",data); 
            } else {
                throw new Error("Unauthorized");
            }
        } catch(error) {
            setAuthorized(false);
            console.log("Error fetching stats: ",error);
            alert("You are not authorized to view this page. Please Log in.");
            router.push("/login")
        }
        };
        fetchStats();
    },[router]);
    useEffect(() => {
        const interval = setInterval(() => {
        setFade(false);
        setTimeout(() => {
            setCurrentTipIndex((prev) => (prev + 1) % tips.length);
            setFade(true);
        }, 2000);
        }, 10000);
        return () => clearInterval(interval);
    }, [tips.length]);
    if (authorized === null) {
    return (
      <div className="flex items-center justify-center h-screen bg-black text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mr-4"></div>
        <span className="tracking-widest text-sm">Checking authorization…</span>
      </div>
    );
  }
  if (!authorized || !stats) {
    return null; 
  }
    return (
        <div className="h-screen flex-col items-start justify-center space-y-4 px-2 overflow-hidden">
            <div className="flex flex-row justify-between items-center gap-5">
                <div className="flex flex-col items-center justify-center rounded-2xl backdrop-blur-md shadow-xl border border-white/20 bg-gradient-to-br from-red-500 to-red-950 p-6 gap-2">
                <Image height={500} width={500} src='/plug.svg' alt="plug" className="h-20 w-20 object-cover rounded-full"/>
                    <h1 className="text-xl font-bold">Plug in New Project</h1>
                    <p className="text-sm font-light text-black/30">Plug in any website of any type and perform your own or predefined tests on it.</p>
                    <div className="px-4 py-2 rounded-md border-2 border-black">
                        <h1 className="tracking-widest font-bold text-md"><Link href='/dashboard/projects'>CONNECT</Link></h1>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-center rounded-2xl backdrop-blur-md shadow-xl border border-white/20 bg-gradient-to-br from-red-500 to-red-950 p-6 gap-2">
                <Image height={500} width={500} src='/logs.svg' alt="plug" className="h-20 w-20 object-cover rounded-full"/>
                    <h1 className="text-xl font-bold">Check Docs</h1>
                    <p className="text-sm font-light text-black/30">Take a look at the documentation for guidance on how to run and set up to your first test.</p>
                    <div className="px-4 py-2 rounded-md border-2 border-black">
                        <h1 className="tracking-widest font-bold text-md"><Link href='/dashboard/templates'>CHECK</Link></h1>
                    </div>
                </div>
            </div>
             <div className="mt-10 w-full flex justify-center">
        <div className=" w-full rounded-2xl backdrop-blur-md shadow-xl border border-red-500 bg-transparent p-6  flex flex-col items-center gap-3">
          <p className={`text-3xl italic bg-gradient-to-r from-red-500 font-bold to-red-950 bg-clip-text text-transparent transition-opacity duration-500 ${fade ? "opacity-100" : "opacity-0"}`}>
            {`"${tips[currentTipIndex]}"`}
          </p>
        </div>
      </div>
        </div>
    )
}