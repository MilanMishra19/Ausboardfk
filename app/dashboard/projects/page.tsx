"use client";
import { StickyScroll } from "@/app/components/StickyScroll";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL;
export default function Project(){
  const [title,setTitle] = useState('');
  const [url,setUrl] = useState('');
  const [category,setCategory] = useState('');
  const [desc,setDesc] = useState('');
  const [currentUser,setCurrentUser] = useState("");
  const [message,setMessage] = useState('');
  const router = useRouter();
  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage('');
    const projectData = {
      name:title,
      description:desc,
      url:url,
      websiteCategory:category,
      createdBy:currentUser,
    }
    try{
      const res = await fetch(`${BACKEND_URL}/api/project`,{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(projectData),
        credentials:"include"
      })
      if(!res.ok) throw new Error(`HTTP Error! Status: ${res.status}`);
      const data = await res.json();
      if(res.ok){
        setMessage(`Project added successfully ${data.message}, you can now run tests on it!`);
        setTitle('');
        setUrl('');
        setCategory('');
        setDesc('');
        router.push('/dashboard/projects/testcases');
      } else {
        setMessage(`Project failed to add! ${data.message || 'Unexpected error occured'}`);
        console.error('Backend error');
      }
    } catch (error : unknown) {
      if(error instanceof Error){
        setMessage(`Submission failed! ${error.message}`);
        console.error('Submission failed due to : ',error);
      } else {
        setMessage('Unexpected error occured try again later!')
        console.error("Unknown error",error);
      }
    }
  };
  useEffect(()=>{
    const fetchCurrentUser = async () =>{
      try {
        const res = await fetch(`${BACKEND_URL}/api/users/me`,{
          credentials:"include",
        });
        if(!res.ok) throw new Error("Unable to fetch user info");
        const data = await res.json();
        setCurrentUser(data.id);
      } catch (err) {
        console.error("Failed to fetch unique ID",err);
      }
    }
    fetchCurrentUser();
  },[]);
    const content = [
  {
    title: "Fill in the details",
    description:
      "Our test are driven by selenium, JNest and postman. All details are necessary for a seamless testing environment.",
    content: (
      <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] text-white">
        <Image height={500} width={500} src='/detailsp.jpeg' alt='item' className='object-cover w-full h-full'/>
        
      </div>
    ),
  },
  {
    title: "Make sure to specify website type",
    description:
      "Every website is unique in it's own way. Tell us the type and let us do the testing based on best practices.",
    content: (
      <div className="flex h-full w-full items-center justify-center text-white">
        <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(to_bottom_right,var(--orange-500),var(--yellow-500))] text-white">
            <Image height={500} width={500} src='/type.jpeg' alt='item' className='object-cover h-full w-full'/>
      
        </div>
      </div>
    ),
  },
  {
    title: "Run tests!",
    description:
      "Use our platform to run various pre-defined tests, get your metrics at your project dashboard.",
    content: (
      <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(to_bottom_right,var(--orange-500),var(--yellow-500))] text-white">
        <Image height={500} width={500} src='/ausboard.jpeg' alt='item' className='object-cover w-full h-full'/>
    
      </div>
    ),
  },
];
    return(
        <div className="relative flex flex-col items-center justify-center gap-6 p-5">
            <div className="flex flex-col gap-3">
                <h1 className="text-3xl font-bold text-white">STEP BY STEP GUIDE TO SET UP YOUR PROJECT</h1>
                <StickyScroll content={content}/>
            </div>
            <h1 className="text-3xl font-bold text-white">PROJECT DETAILS</h1>
            <div className="form-container relative flex w-full max-w-2xl flex-col items-center justify-center rounded-2xl bg-white/5 p-8 shadow-2xl backdrop-blur-lg backdrop-filter sm:p-12">
            <div 
                className="absolute inset-0 z-0 h-full w-full rounded-2xl pointer-events-none" 
          style={{
            background: 'radial-gradient(circle at 50% 50%, #ff0000 0%, transparent 70%)',
            filter: 'blur(100px) opacity(0.4)',
            transition: 'transform 0.5s ease-in-out',
            transform: 'scale(1.2)'
                }}
            ></div>
            <form className="flex w-full flex-col items-center gap-6" onSubmit={handleSubmit}>
              {message && (
                    <p className={`text-sm tracking-widest ${message.includes('successfully')?'text-green-400':'text-red-500'}`}>
                        {message}
                    </p>
                )}
                <div className="flex flex-row justify-between w-full gap-5">
                    <input
                        className="w-full rounded-lg border-b-2 border-white bg-transparent py-4 text-sm text-white placeholder-white/80 transition-colors duration-300 focus:border-white focus:outline-none focus:ring-1 focus:ring-white/80"
                        type="text"
                        required
                        value={title}
                        placeholder="Enter your project title"
                        onChange={(e)=>setTitle(e.target.value)}
                    />
                    <input
                        className="w-full rounded-lg border-b-2 border-white bg-transparent py-4 text-sm text-white placeholder-white/80 transition-colors duration-300 focus:border-white focus:outline-none focus:ring-1 focus:ring-white/80"
                        type="text"
                        required
                        readOnly
                        placeholder="Created by"
                        value={currentUser}
                        onChange={(e)=>setCurrentUser(e.target.value)}
                    />
                    <select className="w-full rounded-lg border-b-2 border-white bg-transparent py-4 text-sm text-white placeholder-white/80 transition-colors duration-300 focus:border-white focus:outline-none focus:ring-1 focus:ring-white/80" value={category} onChange={(e)=>setCategory(e.target.value)}>
                    <option value="" disabled className="bg-black text-white">Select website category</option>
                    <option value="ecommerce" className="text-white bg-black">E-Commerce</option>
                    <option value="blog" className="text-white bg-black">Blog</option>
                    <option value="portfolio" className="text-white bg-black">Portfolio</option>
                    <option value="dashboard" className="text-white bg-black">Dashboard</option>
                    </select>
                </div>
                <input
                    className="w-full rounded-lg border-b-2 border-white bg-transparent py-4 text-sm text-white placeholder-white/80 transition-colors duration-300 focus:border-white focus:outline-none focus:ring-1 focus:ring-white/80"
                    type="text"
                    required
                    value={url}
                    placeholder="Enter your website URL"
                    onChange={(e)=>setUrl(e.target.value)}
                />
                <textarea
                    className="w-full rounded-lg border-b-2 border-white bg-transparent py-4 text-sm text-white placeholder-white/80 transition-colors duration-300 focus:border-white focus:outline-none focus:ring-1 focus:ring-white/80 h-30"
                    value={desc}
                    placeholder="Website description(Optional)"
                    onChange={(e)=>setDesc(e.target.value)}
                />
                <button
                    type="submit"
                    className="mt-4 w-full rounded-full bg-white/90 py-4 font-bold uppercase tracking-widest text-black shadow-lg transition-all duration-300 hover:bg-white hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
                >
                    Submit
                </button>
                <Link href='/dashboard/projects/projects-overview'>
                <p className="text-blue-500 text-sm">Go to projects dashboard &#x27A1;</p>
                </Link>
            </form>
            </div>
        </div>
    )
}