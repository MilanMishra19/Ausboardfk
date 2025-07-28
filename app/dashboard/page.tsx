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
    const router = useRouter();
    const [stats,setStats] = useState<User | null>(null);
    const [authorized,setAuthorized] = useState< boolean | null>(null);
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
                <Image height={500} width={500} src='/template.svg' alt="plug" className="h-20 w-20 object-cover rounded-full"/>
                    <h1 className="text-xl font-bold">Run Tests</h1>
                    <p className="text-sm font-light text-black/30">Use predefined unit tests or create your own.</p>
                    <div className="px-4 py-2 rounded-md border-2 border-black">
                        <h1 className="tracking-widest font-bold text-md">RUN TESTS</h1>
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
            <div className="flex flex-col items-start justify-center rounded-2xl backdrop-blur-md shadow-xl border border-white/20 bg-gradient-to-br from-red-500 to-red-950 p-6 gap-2">
            <h1 className="text-xl font-bold">Performance Metrics for recent website</h1>
            <div className="flex flex-row justify-between items-center gap-2 w-full">
                <div className="flex flex-col items-center justify-center bg-black/50 border border-white/20 p-5 rounded-xl">
                <h1 className="text-md font-bold tracking-widest">Latency</h1>
                <p className="text-xs tracking-wider">Time taken to serve a request.</p>
                <h1 className="text-2xl font-extrabold text-white">p99</h1>
                </div>
                <div className="flex flex-col items-center justify-center bg-black/50 border border-white/20 p-5 rounded-xl">
                <h1 className="text-md font-bold tracking-widest">Throughput</h1>
                <p className="text-xs tracking-wider">Number of requests handled per second.</p>
                <h1 className="text-2xl font-extrabold text-white">200 <span className="text-xs">Req/sec</span></h1>
                </div>
                <div className="flex flex-col items-center justify-center bg-black/50 border border-white/20 p-5 rounded-xl">
                <h1 className="text-md font-bold tracking-widest">Memory Usage</h1>
                <p className="text-xs tracking-wider">How much heap/non-heap memory the app is using.</p>
                <h1 className="text-2xl font-extrabold text-white">4.32 <span className="text-xs">GB</span></h1>
                </div>
                <div className="flex flex-col items-center justify-center bg-black/50 border border-white/20 p-5 rounded-xl">
                <h1 className="text-md font-bold tracking-widest">CPU Usage</h1>
                <p className="text-xs tracking-wider">% of CPU consumed under load.</p>
                <h1 className="text-2xl font-extrabold text-white">56 <span className="text-xs">%</span></h1>
                </div>
            </div>
            </div>
        </div>
    )
}