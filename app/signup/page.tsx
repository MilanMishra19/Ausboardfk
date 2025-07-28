"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL;
export default function Register() {
  const [name,setName] = useState('');
  const [password,setPassword] = useState('');
  const [email,setEmail] = useState('');
  const router = useRouter();
  const [message,setMessage] = useState('');
  const [confimPassword,setConfirmPassword] = useState('');
  const [role,setRole] = useState('');
  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    setMessage('');
    if(password!==confimPassword){
      setMessage('passwords do not match!')
      return;
    }
    const formData = {
      name:name,
      role:role,
      email:email,
      password:password
    }
    try{
      const res = await fetch(`${BACKEND_URL}/api/users`,{
        method:"POST",
        credentials:"include",
        headers:{
          "Content-Type":"application/json",
        },
        body:JSON.stringify(formData),
      });
      const data = await res.json();
      if(res.ok){
        setMessage(`User Created successfully!${data.message} you can now Log in`);
        setName('');
        setEmail('');
        setRole('');
        setPassword('');
        setConfirmPassword('');
        router.push("/login");
      } else {
        setMessage(`Registration failed: ${data.message|| 'An unexpected error occurred'}`);
        console.error("Backend error occured");
      }
    } catch(error:unknown){
      if(error instanceof Error){
        setMessage(`Registration failed : ${error.message}`);
        console.error('Registration failed due to :',error);
      } else {
        setMessage(`An unknown error`);
        console.error('Unknown error',error);
      }
    }
  }
  return (
    <div className="flex max-h-screen items-center justify-center p-6 sm:p-12 relative bg-black">
      <motion.div
        className="form-container relative flex w-full max-w-2xl flex-col items-center justify-center rounded-2xl bg-white/5 p-8 shadow-2xl backdrop-blur-lg backdrop-filter sm:p-12"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
      >
        <div 
          className="absolute inset-0 z-0 h-full w-full rounded-2xl pointer-events-none" 
          style={{
            background: 'radial-gradient(circle at 50% 50%, #ff0000 0%, transparent 70%)',
            filter: 'blur(100px) opacity(0.4)',
            transition: 'transform 0.5s ease-in-out',
            transform: 'scale(1.2)'
          }}
        ></div>

        <div className="relative z-10 flex flex-col items-center justify-center w-full gap-8">
            <div className="flex flex-row items-center gap-4">
                <Image src="/logo.svg" alt="logo" height={100} width={100} className="h-20 w-20" priority={true} loading="eager" rel="preload"/>
            </div>

            <form className="flex w-full flex-col items-center gap-6" onSubmit={handleSubmit}>
              {message && (
                <p className={`text-sm tracking-widest ${message.includes('created')?'text-green-400':'text-red-400'}`}>
                  {message}
                </p>
              )}
                <div className="flex w-full flex-row gap-6 sm:gap-10">
                    <input
                        className="w-full rounded-lg border-b-2 border-white bg-transparent py-4 text-sm text-white placeholder-white/80 transition-colors duration-300 focus:border-white focus:outline-none focus:ring-1 focus:ring-white/80"
                        type="text"
                        required
                        placeholder="Enter your full name"
                        value={name}
                        onChange={(e)=>setName(e.target.value)}
                    />
                    <input
                        className="w-full rounded-lg border-b-2 border-white bg-transparent py-4 text-sm text-white placeholder-white/80 transition-colors duration-300 focus:border-white focus:outline-none focus:ring-1 focus:ring-white/80"
                        type="email"
                        required
                        placeholder="Enter your email ID"
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                    />
                </div>
                <div className="flex w-full flex-col gap-6 sm:gap-10">
                <input
                    className="w-full rounded-lg border-b-2 border-white bg-transparent py-4 text-sm text-white placeholder-white/80 transition-colors duration-300 focus:border-white focus:outline-none focus:ring-1 focus:ring-white/80"
                    type="password"
                    required
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                />
                <input
                    className="w-full rounded-lg border-b-2 border-white bg-transparent py-4 text-sm text-white placeholder-white/80 transition-colors duration-300 focus:border-white focus:outline-none focus:ring-1 focus:ring-white/80"
                    type="password"
                    required
                    placeholder="Confirm Password"
                    value={confimPassword}
                    onChange={(e)=>setConfirmPassword(e.target.value)}
                />
                </div>
                <input
                    className="w-full rounded-lg border-b-2 border-white bg-transparent py-4 text-sm text-white placeholder-white/80 transition-colors duration-300 focus:border-white focus:outline-none focus:ring-1 focus:ring-white/80"
                    type="text"
                    required
                    placeholder="Enter your Role"
                />
                <button
                    type="submit"
                    className="mt-4 w-full rounded-full bg-white/90 py-4 font-bold uppercase tracking-widest text-black shadow-lg transition-all duration-300 hover:bg-white hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
                >
                    Submit
                </button>
                <Link href="/login">
                <p className="font-light text-blue-500 text-sm">Already an User?</p>
                </Link>
            </form>
        </div>
      </motion.div>
    </div>
  );
}