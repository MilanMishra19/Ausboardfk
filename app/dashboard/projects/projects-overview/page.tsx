"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type Project = {
    projectId:string,
    name:string,
    url:string,
    websiteCategory:string,
    createdAt:string
}
const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL;
export default function ProjectDashboard(){
    const [projectData,setProjectData] = useState<Project[]>([]);
    const [loading,setLoading] = useState(true);
    const [menuOpenIndex,setMenuOpenIndex] = useState<number | null>(null);
    const menuRefs = useRef<(HTMLDivElement | null)[]>([]);
    const toggleMenu = (index : number)=>{
        setMenuOpenIndex(menuOpenIndex === index?null:index);
    }
    useEffect(()=>{
        const handleClickOutside = (event:MouseEvent)=>{
            const clickedOutside = menuRefs.current.every(
                (ref)=>!ref || !ref.contains(event.target as Node)
            );
            if(clickedOutside){
                setMenuOpenIndex(null);
            }
        };
        document.addEventListener("mousedown",handleClickOutside);
        return () =>{
            document.removeEventListener("mousedown",handleClickOutside);
        };
    },[]);
    useEffect(()=>{
        const fetchProjects = async()=>{
            try{
                const res = await fetch(`${BACKEND_URL}/api/project/my-projects`,{
                    method:"GET",
                    credentials:"include",
                    headers:{
                        "Content-Type":"application/json"
                    }
                });
                if(!res.ok) throw new Error("Unable to fetch projects");
                const data = await res.json();
                setProjectData(data);
            } catch(err) {
                console.error("Error fetching projects",err);
            } finally {
                setLoading(false);
            }
        };
        fetchProjects();
    },[]);
    return(
        <div className="flex flex-col items-center justify-between gap-5 p-6">
            <h1 className="text-sm font-bold tracking-widest uppercase text-white">Your projects</h1>
      <div className="grid grid-cols-2 max-w-5xl gap-3 justify-between">
        {loading ? (
          <div className="flex items-center justify-center h-screen bg-black text-white">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mr-4"></div>
            <span className="tracking-widest text-sm">Fetching your projects...</span>
          </div>
        ) : (
          projectData.map((project, index) => (
            <div
              key={index}
              className="col-span-1 border border-white/30 p-6 rounded-xl hover:shadow-xl transition-all"
            >
              <div className="flex flex-col gap-10 items-center justify-center">
                <div className="flex flex-row gap-2 items-center">
                  <Image
                    src="/logo.svg"
                    alt="logo"
                    height={500}
                    width={500}
                    className="h-15 w-15 object-cover rounded-full"
                  />
                  <div className="flex flex-col">
                    <h1 className="text-md text-white tracking-widest font-bold">{project.name}</h1>
                    <Link href={project.url}>
                    <p className="text-sm text-white hover:underline">{project.url}</p>
                    </Link>
                  </div>
                  <Image
                    src="/perf.svg"
                    alt="perf"
                    height={500}
                    width={500}
                    className="h-10 w-10 bg-black rounded-full border-4 border-red-950"
                  />
                  <div className="relative" ref={(el) => { menuRefs.current[index] = el; }}>
                  <button className="text-xl font-extrabold cursor-pointer text-white" onClick={() => toggleMenu(index)}>&#8230;</button>
                  {menuOpenIndex === index && (
                    <div className="absolute right-0 mt-2 w-32 bg-gray-950 text-black rounded-md shadow-lg z-10">
                        <ul className="flex flex-col text-xs uppercase text-white">
                            <Link href={`/dashboard/projects/projects-overview/${project.projectId}/testcases`}>
                            <li className="px-4 py-2 hover:bg-white/10 cursor-pointer">Run Tests</li>
                            </Link>
                            <Link href={`/dashboard/projects/projects-overview/${project.projectId}/testruns`}>
                            <li className="px-4 py-2 hover:bg-white/10 cursor-pointer">Add Testcases</li>
                            </Link>
                            <Link href={`/dashboard/projects/projects-overview/${project.projectId}/testruns`}>
                            <li className="px-4 py-2 hover:bg-white/10 cursor-pointer">Testcase Overview</li>
                            </Link>
                        </ul>
                    </div>
                  )}
                  </div>
                </div>
                <div className="flex flex-row w-full justify-between">
                <h1 className="text-xs font-bold tracking-widest text-white">Created at: {new Date(project.createdAt).toLocaleDateString("en-GB",{
                    day:"numeric",
                    month:"long"
                }).replace(/(\d+)(?!\d)/,(day)=>{
                    const d = parseInt(day);
                    if(d>3 && d<21) return `${d}th`;
                    switch(d%10){
                        case 1:return `${d}st`;
                        case 2:return `${d}nd`;
                        case 3:return `${d}rd`;
                        default:return `${d}th`;
                    }
                })
                }</h1>
                <h1 className="text-xs font-bold uppercase tracking-widest text-white">{project.websiteCategory}</h1>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
    );
}