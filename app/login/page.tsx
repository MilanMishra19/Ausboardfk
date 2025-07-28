"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { useState } from "react";
const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL
export default function Register() {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const router = useRouter();
    const refs = useRef(null);
    const [message,setMessage] = useState('');
    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        setMessage('');
        try{
            const formData = new URLSearchParams();
            formData.append('username',email);
            formData.append('password',password);
            const res = await fetch(`${BACKEND_URL}/login`,{
                method:"POST",
                headers:{
                    'Content-Type':'application/x-www-form-urlencoded'
                },
                body:formData,
                credentials:'include',
                redirect:'manual'
            });
            if(res.status===302){
                const redirectURL = res.headers.get('Location');
                if(redirectURL){
                    if(redirectURL.includes('/login?error')){
                        setMessage('Login failed: Invalid credentials');
                        console.error('Redirected to: ',redirectURL);
                    }
                    else if(redirectURL.includes('/')){
                        setMessage('Login successful: Redirecting to dashboard');
                        router.push('/dashboard');
                    } else {
                        setMessage('Login completed with an unexpected redirect');
                        console.error('redirected to: ',redirectURL);
                    }
                } else {
                    setMessage('Login failed : redirect headers missing');
                }
            } else if(res.ok) {
                setMessage('Login successful! Redirecting to dashboard...');
                setEmail('');
                setPassword('');
                router.push('/dashboard')
            } else {
                const text = await res.text();
                setMessage(`Login failed: ${text}`)
                console.error(`Backend response text: `,text);
            }
        } catch(error){
            setMessage('login failed: '+error || 'An unexpected error occured');
            console.error('Backend response text: ',error);
        }
    };
  return (
    <div ref={refs} className="flex max-h-screen items-center justify-center p-6 sm:p-12 relative bg-black">
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
                    <p className={`text-sm tracking-widest ${message.includes('successful')?'text-green-400':'text-red-500'}`}>
                        {message}
                    </p>
                )}
                <div className="flex flex-row justify-between w-full gap-5">
                    <input
                        className="w-full rounded-lg border-b-2 border-white bg-transparent py-4 text-sm text-white placeholder-white/80 transition-colors duration-300 focus:border-white focus:outline-none focus:ring-1 focus:ring-white/80"
                        type="text"
                        required
                        placeholder="Enter your name"
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
                <input
                    className="w-full rounded-lg border-b-2 border-white bg-transparent py-4 text-sm text-white placeholder-white/80 transition-colors duration-300 focus:border-white focus:outline-none focus:ring-1 focus:ring-white/80"
                    type="password"
                    required
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                />
                <button
                    type="submit"
                    className="mt-4 w-full rounded-full bg-white/90 py-4 font-bold uppercase tracking-widest text-black shadow-lg transition-all duration-300 hover:bg-white hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
                >
                    Submit
                </button>
                <Link href="/signup">
                <p className="text-sm font-light text-blue-500">New User?</p>
                </Link>
            </form>
        </div>
      </motion.div>
    </div>
  );
}