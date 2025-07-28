"use client";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL;
export default function Testcases() {
  const { projectId } = useParams();
  const router = useRouter();

  const [endpoint, setEndpoint] = useState('');
  const [headersInput, setHeadersInput] = useState('');
  const [payloadInput, setPayloadInput] = useState('');
  const [method, setMethod] = useState('');
  const [priority, setPriority] = useState('');
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage('');
    try {
      const parsedHeaders = headersInput ? JSON.parse(headersInput) : {};
      const parsedPayload = payloadInput ? JSON.parse(payloadInput) : {};

      const testCaseData = {
        projectId,
        endpoints: endpoint,
        title,
        method,
        priority,
        payload: parsedPayload,
        headers: parsedHeaders,
      };

      const res = await fetch(`${BACKEND_URL}/api/testcase`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(testCaseData),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || 'Failed to add testcase');

      setMessage(`✅ Testcase added successfully: ${data.message}`);
      setEndpoint('');
      setHeadersInput('');
      setPayloadInput('');
      setMethod('');
      setPriority('');
      setTitle('');
      router.push(`/dashboard/projects/projects-overview/${projectId}/testruns`);
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : 'Unexpected error';
      setMessage(`Submission failed: ${errorMsg}`);
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col relative gap-10 p-8">
      <nav className="self-start flex px-5 py-3 text-white/30 border border-white/30 rounded-lg bg-transparent dark:bg-gray-800 dark:border-gray-700" aria-label="Breadcrumb">
  <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
    <li className="inline-flex items-center">
      <a href="/dashboard/projects/projects-overview" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
        Project Overview
      </a>
    </li>
    <li aria-current="page">
      <div className="flex items-center">
        <svg className="rtl:rotate-180  w-3 h-3 mx-1 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
        </svg>
        <span className="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">Add Testcases</span>
      </div>
    </li>
  </ol>
</nav>
      <div className="form-container relative flex w-full max-w-7xl flex-col items-center justify-center rounded-2xl bg-white/5 p-8 shadow-2xl backdrop-blur-lg backdrop-filter sm:p-12">
      <h1 className="text-white tracking-widest uppercase text-3xl font-bold">Add Test Cases</h1>
      <div 
          className="absolute inset-0 z-0 h-full w-full rounded-2xl pointer-events-none" 
          style={{
            background: 'radial-gradient(circle at 50% 50%, #ff0000 0%, transparent 70%)',
            filter: 'blur(100px) opacity(0.4)',
            transition: 'transform 0.5s ease-in-out',
            transform: 'scale(1.2)'
          }}
        ></div>
        <form
          className="space-y-6 p-8 rounded-lg shadow-2xl relative overflow-hidden w-full"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            readOnly
            value={projectId}
            className="w-full rounded-lg border-b-2 border-white bg-transparent py-4 text-sm text-white"
          />
          <div className="flex flex-row gap-5">
            <input
              type="text"
              placeholder="TestCase name"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-lg border-b-2 border-white bg-transparent py-4 text-sm text-white"
            />
            <select
              required
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="w-full rounded-lg border-b-2 border-white bg-transparent py-4 text-sm text-white"
            >
              <option value="">Select Severity</option>
              <option value="high">HIGH</option>
              <option value="medium">MEDIUM</option>
              <option value="low">LOW</option>
            </select>
          </div>
          <div className="flex flex-row gap-5">
            <select
              required
              value={method}
              onChange={(e) => setMethod(e.target.value)}
              className="w-full rounded-lg border-b-2 border-white bg-transparent py-4 text-sm text-white"
            >
              <option value="">Select HTTP Method</option>
              <option value="GET">GET</option>
              <option value="POST">POST</option>
              <option value="PUT">PUT</option>
              <option value="DELETE">DELETE</option>
              <option value="PATCH">PATCH</option>
            </select>
            <input
              type="text"
              required
              value={endpoint}
              onChange={(e) => setEndpoint(e.target.value)}
              placeholder="Endpoint (e.g., /api/login)"
              className="w-full rounded-lg border-b-2 border-white bg-transparent py-4 text-sm text-white"
            />
          </div>
          <textarea
            placeholder='Headers (JSON format)\n{ "Authorization": "Bearer token" }'
            value={headersInput}
            onChange={(e) => setHeadersInput(e.target.value)}
            className="w-full h-32 rounded-lg border-b-2 border-white bg-gray-800 py-4 text-sm text-white"
          />
          <textarea
            placeholder='Payload (JSON format)\n{ "username": "john" }'
            value={payloadInput}
            onChange={(e) => setPayloadInput(e.target.value)}
            className="w-full h-32 rounded-lg border-b-2 border-white bg-gray-800 py-4 text-sm text-white"
          />
          <button
            type="submit"
            className="w-full py-3 bg-white text-black rounded-full text-xl font-bold uppercase tracking-widest transition duration-300 hover:scale-105"
          >
            Create Test Case
          </button>
          <p className="text-sm text-red-400">{message}</p>
          <Link href="/dashboard/projects/testcases/testcases_overview" className="text-blue-400 text-center text-sm">
            Use pre-defined generic tests
          </Link>
        </form>
      </div>
    </div>
  );
}
