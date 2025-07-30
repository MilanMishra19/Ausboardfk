"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface TestRun {
    id: string;
    response: string;
    executionTime: number;
    status: string;
    runAt: string;
    testCaseTitle: string;
}

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL;

export default function TestRunOverview() {
    const { projectId } = useParams<{ projectId: string }>();
    const [testRunData, setTestRunData] = useState<TestRun[]>([]);
    const [loading, setLoading] = useState(true);

    const [currentPage, setCurrentPage] = useState(1);
    const runsPerPage = 5;

    useEffect(() => {
        const fetchDetails = async () => {
            if (!projectId) return;
            try {
                const res = await fetch(`${BACKEND_URL}/api/testrun/project/testrun/${projectId}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    credentials: "include"
                });
                const testrun = await res.json();
                setTestRunData(testrun);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchDetails();
    }, [projectId]);

    const sortedRuns = [...testRunData].sort(
        (a, b) => new Date(b.runAt).getTime() - new Date(a.runAt).getTime()
    );
    const totalPages = Math.ceil(sortedRuns.length / runsPerPage);
    const indexOfLastRun = currentPage * runsPerPage;
    const indexOfFirstRun = indexOfLastRun - runsPerPage;
    const currentRuns = sortedRuns.slice(indexOfFirstRun, indexOfLastRun);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen bg-black text-white">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mr-4"></div>
                <span className="tracking-widest text-sm">Fetching your results...</span>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-5 p-6">
            <nav className="self-start flex px-5 py-3 text-white/30 border border-white/30 rounded-lg bg-transparent dark:bg-gray-800 dark:border-gray-700" aria-label="Breadcrumb">
                <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                    <li className="inline-flex items-center">
                        <a href="/dashboard/projects/projects-overview" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
                            Project Overview
                        </a>
                    </li>
                    <li>
                        <div className="flex items-center">
                            <svg className="rtl:rotate-180 block w-3 h-3 mx-1 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                            </svg>
                            <a href={`/dashboard/projects/projects-overview/${projectId}/testcases`} className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white">
                                Add Testcases
                            </a>
                        </div>
                    </li>
                    <li>
                        <div className="flex items-center">
                            <svg className="rtl:rotate-180 block w-3 h-3 mx-1 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                            </svg>
                            <a href={`/dashboard/projects/projects-overview/${projectId}/testruns`} className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white">
                                Testcases Overview
                            </a>
                        </div>
                    </li>
                    <li aria-current="page">
                        <div className="flex items-center">
                            <svg className="rtl:rotate-180 w-3 h-3 mx-1 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                            </svg>
                            <span className="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">Results Overview</span>
                        </div>
                    </li>
                </ol>
            </nav>

            <h1 className="text-3xl font-bold tracking-widest uppercase text-white">testruns overview</h1>

            <div className="overflow-x-auto rounded-lg shadow-lg border border-red-700">
                <table className="w-full table-auto text-sm text-left text-gray-400">
                    <thead className="bg-[#1f1f1f] text-gray-300 uppercase text-xs">
                        <tr>
                            <th className="px-6 py-3">Test Case</th>
                            <th className="px-6 py-3">Status</th>
                            <th className="px-6 py-3">Execution Time</th>
                            <th className="px-6 py-3">Response</th>
                            <th className="px-6 py-3">Run At</th>
                        </tr>
                    </thead>
                    <tbody className="bg-[#3f3939] text-center">
                        {currentRuns.length === 0 ? (
                            <tr className="border-b border-gray-700 hover:bg-[#222222] transition duration-200">
                                <td colSpan={6} className="px-6 py-4 text-center">No Tests running currently</td>
                            </tr>
                        ) : (
                            currentRuns.map((tr, index) => (
                                <tr key={index} className="border-b border-gray-700 text-white hover:bg-[#222222] transition duration-200">
                                    <td className="px-6 py-4">{tr.testCaseTitle}</td>
                                    <td className={`px-6 py-4 ${tr.status === 'PASSED' ? 'text-green-500' : 'text-red-500'}`}>{tr.status}</td>
                                    <td className="px-6 py-4">{`${tr.executionTime}ms`}</td>
                                    <td className="px-6 py-4">
                                        <div className="max-h-24 overflow-y-auto whitespace-pre-wrap text-left p-2 bg-gray-900 border-2 border-white rounded">
                                            {tr.response}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        {new Date(tr.runAt.split('.')[0]).toLocaleString("en-IN", {
                                            year: 'numeric',
                                            month: 'short',
                                            day: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit',
                                            second: '2-digit',
                                            hour12: true,
                                        })}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {totalPages > 1 && (
                <div className="flex justify-center mt-4 gap-2">
                    <button
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="px-3 py-1 text-white bg-gray-700 hover:bg-gray-600 rounded disabled:opacity-30"
                    >
                        Previous
                    </button>
                    <span className="text-white self-center">
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="px-3 py-1 text-white bg-gray-700 hover:bg-gray-600 rounded disabled:opacity-30"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
}
