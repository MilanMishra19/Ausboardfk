"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL;
export default function Navbar() {
  const [currentUser,setCurrentUser] = useState('');
  const [dateTime,setDateTime] = useState('');
  useEffect(()=>{
    const updateDateTime = () =>{
      const now = new Date();
      setDateTime(now.toLocaleString());   
    };
    updateDateTime();
    const interval = setInterval(updateDateTime,1000);
    return () => clearInterval(interval);
  })
  useEffect(()=>{
      const fetchCurrentUser = async () =>{
        try {
          const res = await fetch(`${BACKEND_URL}/api/users/me`,{
            credentials:"include",
          });
          if(!res.ok) throw new Error("Unable to fetch user info");
          const data = await res.json();
          setCurrentUser(data.name);
        } catch (err) {
          console.error("Failted to fetch unique ID",err);
        }
      }
      fetchCurrentUser();
    },[]);
  return (
    <header className="fixed top-8 right-8 left-[300px] z-40 h-14 rounded-full bg-white backdrop-blur-md border border-white/20 px-6 flex items-center justify-between shadow-md">
      
      <div className="flex items-center gap-3">
        <Image
          src="/user.svg"
          width={28}
          height={28}
          alt="user"
          className="h-7 w-7 rounded-full bg-white"
        />
        <span className="text-black uppercase text-xs tracking-wider font-medium">{`${currentUser}`}</span>
      </div>

      {/* Right: Action Icons */}
      <div className="flex items-center gap-6">
        <div className="flex flex-row items-center gap-1 bg-black/10 rounded-full p-1">
          <span className="h-2 w-2 bg-green-500 animate-pulse rounded-full shadow-[0_0_6px_3px_rgba(34,197,94,0.6)]"></span>
          <h1 className="text-xs tracking-widest font-bold">ALL OK</h1>
        </div>
        <h1>{dateTime}</h1>
      </div>
    </header>
  );
}
