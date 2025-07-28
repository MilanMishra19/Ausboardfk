"use client";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL;

interface TestCaseDetails {
    id:string,
    endpoints: string;
    priority: string;
    method: string;
    title: string;
    status?: string;
}
interface TestRunResult {
  id: string;
  status: string;
  response: string;
  executionTime?: string;
  runAt?: string;
}

interface ProjectDetails {
    name: string;
    url: string;
}

export default function TestcasesOverview() {
    const { projectId } = useParams<{ projectId: string }>();
    const [testCases, setTestCases] = useState<TestCaseDetails[]>([]);
    const [project, setProject] = useState<ProjectDetails | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDetails = async () => {
            if (!projectId) return;
            try {
                const [projectRes, tcRes] = await Promise.all([
                    fetch(`${BACKEND_URL}/api/project/${projectId}`, { credentials: "include" }),
                    fetch(`${BACKEND_URL}/api/testcase/project/${projectId}`, { credentials: "include" }),
                ]);
                const project = await projectRes.json();
                const tc = await tcRes.json();
                setProject(project);
                setTestCases(Array.isArray(tc) ? tc : [tc]);
            } catch (err) {
                console.error('Error: ', err);
            } finally {
                setLoading(false);
            }
        }
        fetchDetails();
    }, [projectId]);
    const handleSingleRun = async (testcaseId: string) => {
  try {
    const res = await fetch(`${BACKEND_URL}/api/testcase/run/${testcaseId}`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(errorText || "Failed to run test");
    }

    const data = await res.json(); // Correctly parse as JSON
    alert(`Test ${data.status}: ${data.response?.substring(0, 100)}`);
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Unknown error";
    console.error(err);
    alert(`Error in running tests: ${errorMsg}`);
  }
};

    const handleRunAll = async () => {
  try {
    const res = await fetch(`${BACKEND_URL}/api/testcase/run-all/${projectId}`, {
      method: 'POST',
      credentials: 'include'
    });

    if (!res.ok) {
      throw new Error('Failed to run all tests');
    }

    const data: TestRunResult[] = await res.json();
    const passed = data.filter((run) => run.status === 'PASSED').length;
    alert(`✅ ${passed}/${data.length} tests passed`);
  } catch (err) {
    console.error(err);
    alert(`Failed to run all tests`);
  }
};

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen bg-black text-white">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mr-4"></div>
                <span className="tracking-widest text-sm">Fetching your projects...</span>
            </div>
        )
    }

    return (
        <div className="relative flex flex-col w-full gap-5">
<nav className="self-start flex px-5 py-3 text-white/30 border border-white/30 rounded-lg bg-transparent dark:bg-gray-800 dark:border-gray-700" aria-label="Breadcrumb">
  <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
    <li className="inline-flex items-center">
      <a href="/dashboard/projects/projects-overview" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
        Project Overview
      </a>
    </li>
    <li>
      <div className="flex items-center">
        <svg className="rtl:rotate-180 block w-3 h-3 mx-1 text-gray-400 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
        </svg>
        <a href={`/dashboard/projects/projects-overview/${projectId}/testcases`} className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white">Add Testcases</a>
      </div>
    </li>
    <li aria-current="page">
      <div className="flex items-center">
        <svg className="rtl:rotate-180  w-3 h-3 mx-1 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
        </svg>
        <span className="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">Testcase Overview</span>
      </div>
    </li>
  </ol>
</nav>
            <div className="flex flex-col items-center justify-center gap-1">
            <h1 className="text-3xl tracking-widest text-white font-bold">TESTCASES OVERVIEW</h1>
            <h1 className="text-sm tracking-widest text-white/30 font-light">{project?.name} : {project?.url}</h1>
            </div>
            <div className="flex flex-row justify-between gap-5">
                 <div className="flex flex-col items-center justify-center rounded-2xl backdrop-blur-md shadow-xl border border-white/20 bg-gradient-to-br from-red-500 to-red-950 p-6 gap-2">
                <h1 className="text-xl text-red-950 drop-shadow-[0_0_10px_rgba(255,0,0,0.8)] font-bold">Run Pre-defined testcases</h1>
                <Image src='/globe.svg' alt="" height={500} width={500} className="object-cover h-12 w-12"/>
                <p className="text-sm text-white/50 font-light">Run generic testcases suitable for all websites irrespective of website catagory and get a brief idea of the functionality of your site.</p>
                <Link href="/login">
                    <button className="w-32 py-2 px-4 text-white font-semibold rounded-md bg-red-600 shadow-[0_0_20px_rgba(255,0,0,0.7)] hover:shadow-[0_0_30px_rgba(255,0,0,1)] transition">
                    Run
                    </button>
                </Link>
                </div>
                <div className="flex flex-col items-center justify-center rounded-2xl backdrop-blur-md shadow-xl border border-white/20 bg-gradient-to-br from-red-500 to-red-950 p-6 gap-2">
                <h1 className="text-xl text-red-950 drop-shadow-[0_0_10px_rgba(255,0,0,0.8)]  font-bold">Run Performance testing</h1>
                <Image src='/perf.svg' alt="" height={500} width={500} className="object-cover h-12 w-12"/>
                <p className="text-sm text-white/50 font-light">Run generic testcases suitable for all websites irrespective of website catagory and get a brief idea of the functionality of your site.</p>
                <Link href="/login">
                    <button className="w-32 py-2 px-4 text-white font-semibold rounded-md bg-red-600 shadow-[0_0_20px_rgba(255,0,0,0.7)] hover:shadow-[0_0_30px_rgba(255,0,0,1)] transition">
                    Run
                    </button>
                </Link>
                </div>
            </div>
            <div className="overflow-x-auto rounded-lg shadow-lg border border-red-700">
                <button className="w-full py-2 px-4 text-white font-semibold rounded-md bg-red-600 shadow-[0_0_20px_rgba(255,0,0,0.7)] hover:shadow-[0_0_30px_rgba(255,0,0,1)] transition" onClick={handleRunAll}>
                    Run All
                    </button>
                <table className="w-full table-auto text-sm text-left text-gray-400">
                    <thead className="bg-[#1f1f1f] text-gray-300 uppercase text-xs">
                        <tr>
                            <th className="px-6 py-3">Title</th>
                            <th className="px-6 py-3">Endpoint</th>
                            <th className="px-6 py-3">Method</th>
                            <th className="px-6 py-3">Priority</th>
                            <th className="px-6 py-3">Status</th>
                            <th className="px-6 py-3">Decision</th>
                        </tr>
                    </thead>
                    <tbody className="bg-[#3f3939] text-center">
                        {testCases.length === 0 ? (
                            <tr className="border-b border-gray-700 hover:bg-[#222222] transition duration-200">
                                <td colSpan={6} className="px-6 py-4 text-center">No TestCases added</td>
                            </tr>
                        ) : (
                            testCases.map((tc, index) => (
                                <tr key={index} className="border-b border-gray-700 text-white hover:bg-[#222222] transition duration-200">
                                    <td className="px-6 py-4">{tc.title}</td>
                                    <td className="px-6 py-4">{tc.endpoints}</td>
                                    <td className="px-6 py-4">{tc.method}</td>
                                    <td className={`px-6 py-4 ${tc.priority==='low'?'text-green-500':tc.priority==='medium'?'text-yellow-500':'text-red-500'}`}>{tc.priority.toUpperCase()}</td>
                                    <td className="px-6 py-4">{tc.status|| '-'}</td>
                                    <td className="px-6 py-4">
                                        <Link href='#' onClick={()=>handleSingleRun(tc.id)}><p className="text-sm text-blue-500">Run</p></Link>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
