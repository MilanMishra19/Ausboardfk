(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/app/dashboard/projects/projects-overview/[projectId]/testruns/page.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": ()=>TestcasesOverview
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
const BACKEND_URL = ("TURBOPACK compile-time value", "http://localhost:8080");
function TestcasesOverview() {
    _s();
    const { projectId } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"])();
    const [testCases, setTestCases] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [project, setProject] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TestcasesOverview.useEffect": ()=>{
            const fetchDetails = {
                "TestcasesOverview.useEffect.fetchDetails": async ()=>{
                    if (!projectId) return;
                    try {
                        const [projectRes, tcRes] = await Promise.all([
                            fetch("".concat(BACKEND_URL, "/api/project/").concat(projectId), {
                                credentials: "include"
                            }),
                            fetch("".concat(BACKEND_URL, "/api/testcase/project/").concat(projectId), {
                                credentials: "include"
                            })
                        ]);
                        const project = await projectRes.json();
                        const tc = await tcRes.json();
                        setProject(project);
                        setTestCases(Array.isArray(tc) ? tc : [
                            tc
                        ]);
                    } catch (err) {
                        console.error('Error: ', err);
                    } finally{
                        setLoading(false);
                    }
                }
            }["TestcasesOverview.useEffect.fetchDetails"];
            fetchDetails();
        }
    }["TestcasesOverview.useEffect"], [
        projectId
    ]);
    const handleSingleRun = async (testcaseId)=>{
        try {
            var _data_response;
            const res = await fetch("".concat(BACKEND_URL, "/api/testcase/run/").concat(testcaseId), {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (!res.ok) {
                const errorText = await res.text();
                throw new Error(errorText || "Failed to run test");
            }
            const data = await res.json(); // Correctly parse as JSON
            alert("Test ".concat(data.status, ": ").concat((_data_response = data.response) === null || _data_response === void 0 ? void 0 : _data_response.substring(0, 100)));
        } catch (err) {
            const errorMsg = err instanceof Error ? err.message : "Unknown error";
            console.error(err);
            alert("Error in running tests: ".concat(errorMsg));
        }
    };
    const handleRunAll = async ()=>{
        try {
            const res = await fetch("".concat(BACKEND_URL, "/api/testcase/run-all/").concat(projectId), {
                method: 'POST',
                credentials: 'include'
            });
            if (!res.ok) {
                throw new Error('Failed to run all tests');
            }
            const data = await res.json();
            const passed = data.filter((run)=>run.status === 'PASSED').length;
            alert("✅ ".concat(passed, "/").concat(data.length, " tests passed"));
        } catch (err) {
            console.error(err);
            alert("Failed to run all tests");
        }
    };
    if (loading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center justify-center h-screen bg-black text-white",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "animate-spin rounded-full h-12 w-12 border-b-2 border-white mr-4"
                }, void 0, false, {
                    fileName: "[project]/app/dashboard/projects/projects-overview/[projectId]/testruns/page.tsx",
                    lineNumber: 103,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "tracking-widest text-sm",
                    children: "Fetching your projects..."
                }, void 0, false, {
                    fileName: "[project]/app/dashboard/projects/projects-overview/[projectId]/testruns/page.tsx",
                    lineNumber: 104,
                    columnNumber: 17
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/dashboard/projects/projects-overview/[projectId]/testruns/page.tsx",
            lineNumber: 102,
            columnNumber: 13
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative flex flex-col w-full gap-5",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                className: "self-start flex px-5 py-3 text-white/30 border border-white/30 rounded-lg bg-transparent dark:bg-gray-800 dark:border-gray-700",
                "aria-label": "Breadcrumb",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ol", {
                    className: "inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                            className: "inline-flex items-center",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                href: "/dashboard/projects/projects-overview",
                                className: "inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white",
                                children: "Project Overview"
                            }, void 0, false, {
                                fileName: "[project]/app/dashboard/projects/projects-overview/[projectId]/testruns/page.tsx",
                                lineNumber: 114,
                                columnNumber: 7
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/dashboard/projects/projects-overview/[projectId]/testruns/page.tsx",
                            lineNumber: 113,
                            columnNumber: 5
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                        className: "rtl:rotate-180 block w-3 h-3 mx-1 text-gray-400 ",
                                        "aria-hidden": "true",
                                        xmlns: "http://www.w3.org/2000/svg",
                                        fill: "none",
                                        viewBox: "0 0 6 10",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            stroke: "currentColor",
                                            strokeLinecap: "round",
                                            strokeLinejoin: "round",
                                            strokeWidth: "2",
                                            d: "m1 9 4-4-4-4"
                                        }, void 0, false, {
                                            fileName: "[project]/app/dashboard/projects/projects-overview/[projectId]/testruns/page.tsx",
                                            lineNumber: 121,
                                            columnNumber: 11
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/dashboard/projects/projects-overview/[projectId]/testruns/page.tsx",
                                        lineNumber: 120,
                                        columnNumber: 9
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                        href: "/dashboard/projects/projects-overview/".concat(projectId, "/testcases"),
                                        className: "ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white",
                                        children: "Add Testcases"
                                    }, void 0, false, {
                                        fileName: "[project]/app/dashboard/projects/projects-overview/[projectId]/testruns/page.tsx",
                                        lineNumber: 123,
                                        columnNumber: 9
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/dashboard/projects/projects-overview/[projectId]/testruns/page.tsx",
                                lineNumber: 119,
                                columnNumber: 7
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/dashboard/projects/projects-overview/[projectId]/testruns/page.tsx",
                            lineNumber: 118,
                            columnNumber: 5
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                            "aria-current": "page",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                        className: "rtl:rotate-180  w-3 h-3 mx-1 text-gray-400",
                                        "aria-hidden": "true",
                                        xmlns: "http://www.w3.org/2000/svg",
                                        fill: "none",
                                        viewBox: "0 0 6 10",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            stroke: "currentColor",
                                            strokeLinecap: "round",
                                            strokeLinejoin: "round",
                                            strokeWidth: "2",
                                            d: "m1 9 4-4-4-4"
                                        }, void 0, false, {
                                            fileName: "[project]/app/dashboard/projects/projects-overview/[projectId]/testruns/page.tsx",
                                            lineNumber: 129,
                                            columnNumber: 11
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/dashboard/projects/projects-overview/[projectId]/testruns/page.tsx",
                                        lineNumber: 128,
                                        columnNumber: 9
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400",
                                        children: "Testcase Overview"
                                    }, void 0, false, {
                                        fileName: "[project]/app/dashboard/projects/projects-overview/[projectId]/testruns/page.tsx",
                                        lineNumber: 131,
                                        columnNumber: 9
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/dashboard/projects/projects-overview/[projectId]/testruns/page.tsx",
                                lineNumber: 127,
                                columnNumber: 7
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/dashboard/projects/projects-overview/[projectId]/testruns/page.tsx",
                            lineNumber: 126,
                            columnNumber: 5
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/dashboard/projects/projects-overview/[projectId]/testruns/page.tsx",
                    lineNumber: 112,
                    columnNumber: 3
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/dashboard/projects/projects-overview/[projectId]/testruns/page.tsx",
                lineNumber: 111,
                columnNumber: 1
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col items-center justify-center gap-1",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-3xl tracking-widest text-white font-bold",
                        children: "TESTCASES OVERVIEW"
                    }, void 0, false, {
                        fileName: "[project]/app/dashboard/projects/projects-overview/[projectId]/testruns/page.tsx",
                        lineNumber: 137,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-sm tracking-widest text-white/30 font-light",
                        children: [
                            project === null || project === void 0 ? void 0 : project.name,
                            " : ",
                            project === null || project === void 0 ? void 0 : project.url
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/dashboard/projects/projects-overview/[projectId]/testruns/page.tsx",
                        lineNumber: 138,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/dashboard/projects/projects-overview/[projectId]/testruns/page.tsx",
                lineNumber: 136,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-row justify-between gap-5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col items-center justify-center rounded-2xl backdrop-blur-md shadow-xl border border-white/20 bg-gradient-to-br from-red-500 to-red-950 p-6 gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "text-xl text-red-950 drop-shadow-[0_0_10px_rgba(255,0,0,0.8)] font-bold",
                                children: "Run Pre-defined testcases"
                            }, void 0, false, {
                                fileName: "[project]/app/dashboard/projects/projects-overview/[projectId]/testruns/page.tsx",
                                lineNumber: 142,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                src: "/globe.svg",
                                alt: "",
                                height: 500,
                                width: 500,
                                className: "object-cover h-12 w-12"
                            }, void 0, false, {
                                fileName: "[project]/app/dashboard/projects/projects-overview/[projectId]/testruns/page.tsx",
                                lineNumber: 143,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-white/50 font-light",
                                children: "Run generic testcases suitable for all websites irrespective of website catagory and get a brief idea of the functionality of your site."
                            }, void 0, false, {
                                fileName: "[project]/app/dashboard/projects/projects-overview/[projectId]/testruns/page.tsx",
                                lineNumber: 144,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/login",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: "w-32 py-2 px-4 text-white font-semibold rounded-md bg-red-600 shadow-[0_0_20px_rgba(255,0,0,0.7)] hover:shadow-[0_0_30px_rgba(255,0,0,1)] transition",
                                    children: "Run"
                                }, void 0, false, {
                                    fileName: "[project]/app/dashboard/projects/projects-overview/[projectId]/testruns/page.tsx",
                                    lineNumber: 146,
                                    columnNumber: 21
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/dashboard/projects/projects-overview/[projectId]/testruns/page.tsx",
                                lineNumber: 145,
                                columnNumber: 17
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/dashboard/projects/projects-overview/[projectId]/testruns/page.tsx",
                        lineNumber: 141,
                        columnNumber: 18
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col items-center justify-center rounded-2xl backdrop-blur-md shadow-xl border border-white/20 bg-gradient-to-br from-red-500 to-red-950 p-6 gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "text-xl text-red-950 drop-shadow-[0_0_10px_rgba(255,0,0,0.8)]  font-bold",
                                children: "Run Performance testing"
                            }, void 0, false, {
                                fileName: "[project]/app/dashboard/projects/projects-overview/[projectId]/testruns/page.tsx",
                                lineNumber: 152,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                src: "/perf.svg",
                                alt: "",
                                height: 500,
                                width: 500,
                                className: "object-cover h-12 w-12"
                            }, void 0, false, {
                                fileName: "[project]/app/dashboard/projects/projects-overview/[projectId]/testruns/page.tsx",
                                lineNumber: 153,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-white/50 font-light",
                                children: "Run generic testcases suitable for all websites irrespective of website catagory and get a brief idea of the functionality of your site."
                            }, void 0, false, {
                                fileName: "[project]/app/dashboard/projects/projects-overview/[projectId]/testruns/page.tsx",
                                lineNumber: 154,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/login",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: "w-32 py-2 px-4 text-white font-semibold rounded-md bg-red-600 shadow-[0_0_20px_rgba(255,0,0,0.7)] hover:shadow-[0_0_30px_rgba(255,0,0,1)] transition",
                                    children: "Run"
                                }, void 0, false, {
                                    fileName: "[project]/app/dashboard/projects/projects-overview/[projectId]/testruns/page.tsx",
                                    lineNumber: 156,
                                    columnNumber: 21
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/dashboard/projects/projects-overview/[projectId]/testruns/page.tsx",
                                lineNumber: 155,
                                columnNumber: 17
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/dashboard/projects/projects-overview/[projectId]/testruns/page.tsx",
                        lineNumber: 151,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/dashboard/projects/projects-overview/[projectId]/testruns/page.tsx",
                lineNumber: 140,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "overflow-x-auto rounded-lg shadow-lg border border-red-700",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "w-full py-2 px-4 text-white font-semibold rounded-md bg-red-600 shadow-[0_0_20px_rgba(255,0,0,0.7)] hover:shadow-[0_0_30px_rgba(255,0,0,1)] transition",
                        onClick: handleRunAll,
                        children: "Run All"
                    }, void 0, false, {
                        fileName: "[project]/app/dashboard/projects/projects-overview/[projectId]/testruns/page.tsx",
                        lineNumber: 163,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                        className: "w-full table-auto text-sm text-left text-gray-400",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                className: "bg-[#1f1f1f] text-gray-300 uppercase text-xs",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            className: "px-6 py-3",
                                            children: "Title"
                                        }, void 0, false, {
                                            fileName: "[project]/app/dashboard/projects/projects-overview/[projectId]/testruns/page.tsx",
                                            lineNumber: 169,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            className: "px-6 py-3",
                                            children: "Endpoint"
                                        }, void 0, false, {
                                            fileName: "[project]/app/dashboard/projects/projects-overview/[projectId]/testruns/page.tsx",
                                            lineNumber: 170,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            className: "px-6 py-3",
                                            children: "Method"
                                        }, void 0, false, {
                                            fileName: "[project]/app/dashboard/projects/projects-overview/[projectId]/testruns/page.tsx",
                                            lineNumber: 171,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            className: "px-6 py-3",
                                            children: "Priority"
                                        }, void 0, false, {
                                            fileName: "[project]/app/dashboard/projects/projects-overview/[projectId]/testruns/page.tsx",
                                            lineNumber: 172,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            className: "px-6 py-3",
                                            children: "Status"
                                        }, void 0, false, {
                                            fileName: "[project]/app/dashboard/projects/projects-overview/[projectId]/testruns/page.tsx",
                                            lineNumber: 173,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            className: "px-6 py-3",
                                            children: "Decision"
                                        }, void 0, false, {
                                            fileName: "[project]/app/dashboard/projects/projects-overview/[projectId]/testruns/page.tsx",
                                            lineNumber: 174,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/dashboard/projects/projects-overview/[projectId]/testruns/page.tsx",
                                    lineNumber: 168,
                                    columnNumber: 25
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/dashboard/projects/projects-overview/[projectId]/testruns/page.tsx",
                                lineNumber: 167,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                className: "bg-[#3f3939] text-center",
                                children: testCases.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                    className: "border-b border-gray-700 hover:bg-[#222222] transition duration-200",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        colSpan: 6,
                                        className: "px-6 py-4 text-center",
                                        children: "No TestCases added"
                                    }, void 0, false, {
                                        fileName: "[project]/app/dashboard/projects/projects-overview/[projectId]/testruns/page.tsx",
                                        lineNumber: 180,
                                        columnNumber: 33
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/dashboard/projects/projects-overview/[projectId]/testruns/page.tsx",
                                    lineNumber: 179,
                                    columnNumber: 29
                                }, this) : testCases.map((tc, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                        className: "border-b border-gray-700 text-white hover:bg-[#222222] transition duration-200",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                className: "px-6 py-4",
                                                children: tc.title
                                            }, void 0, false, {
                                                fileName: "[project]/app/dashboard/projects/projects-overview/[projectId]/testruns/page.tsx",
                                                lineNumber: 185,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                className: "px-6 py-4",
                                                children: tc.endpoints
                                            }, void 0, false, {
                                                fileName: "[project]/app/dashboard/projects/projects-overview/[projectId]/testruns/page.tsx",
                                                lineNumber: 186,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                className: "px-6 py-4",
                                                children: tc.method
                                            }, void 0, false, {
                                                fileName: "[project]/app/dashboard/projects/projects-overview/[projectId]/testruns/page.tsx",
                                                lineNumber: 187,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                className: "px-6 py-4 ".concat(tc.priority === 'low' ? 'text-green-500' : tc.priority === 'medium' ? 'text-yellow-500' : 'text-red-500'),
                                                children: tc.priority.toUpperCase()
                                            }, void 0, false, {
                                                fileName: "[project]/app/dashboard/projects/projects-overview/[projectId]/testruns/page.tsx",
                                                lineNumber: 188,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                className: "px-6 py-4",
                                                children: tc.status || '-'
                                            }, void 0, false, {
                                                fileName: "[project]/app/dashboard/projects/projects-overview/[projectId]/testruns/page.tsx",
                                                lineNumber: 189,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                className: "px-6 py-4",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                    href: "#",
                                                    onClick: ()=>handleSingleRun(tc.id),
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-sm text-blue-500",
                                                        children: "Run"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/dashboard/projects/projects-overview/[projectId]/testruns/page.tsx",
                                                        lineNumber: 191,
                                                        columnNumber: 93
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/dashboard/projects/projects-overview/[projectId]/testruns/page.tsx",
                                                    lineNumber: 191,
                                                    columnNumber: 41
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/dashboard/projects/projects-overview/[projectId]/testruns/page.tsx",
                                                lineNumber: 190,
                                                columnNumber: 37
                                            }, this)
                                        ]
                                    }, index, true, {
                                        fileName: "[project]/app/dashboard/projects/projects-overview/[projectId]/testruns/page.tsx",
                                        lineNumber: 184,
                                        columnNumber: 33
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/app/dashboard/projects/projects-overview/[projectId]/testruns/page.tsx",
                                lineNumber: 177,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/dashboard/projects/projects-overview/[projectId]/testruns/page.tsx",
                        lineNumber: 166,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/dashboard/projects/projects-overview/[projectId]/testruns/page.tsx",
                lineNumber: 162,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/dashboard/projects/projects-overview/[projectId]/testruns/page.tsx",
        lineNumber: 110,
        columnNumber: 9
    }, this);
}
_s(TestcasesOverview, "ROD6wUtuwP/cWgM1B7tzgiDegaA=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"]
    ];
});
_c = TestcasesOverview;
var _c;
__turbopack_context__.k.register(_c, "TestcasesOverview");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=app_dashboard_projects_projects-overview_%5BprojectId%5D_testruns_page_tsx_387b2adf._.js.map