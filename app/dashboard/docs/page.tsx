

export default function Docs(){
    return(
        <div className="form-container relative flex w-full max-w-5xl flex-col items-center justify-center rounded-2xl bg-white/5 p-8 shadow-2xl backdrop-blur-lg backdrop-filter sm:p-12 gap-15">
            <h1 className="text-5xl font-bold text-white">📄 Documentation</h1>
            <p className="text-md font-medium text-white/60">Welcome to the Plug-and-Test Platform Docs – your complete guide to running automated tests on your websites.</p>
            <div className="flex flex-col items-start justify-start gap-7">
                <h1 className="text-3xl font-bold text-white">🚀 Getting Started</h1>
                <h1 className="text-3xl font-bold text-white">1. Sign Up / Login</h1>
                <p className="text-md font-medium text-white/60">Create an account or log in to your dashboard.</p>
                <h1 className="text-3xl font-bold text-white">2. Add Your Website</h1>
                <p className="text-md font-medium text-white/60">Head to the “Projects” section and enter your website&apos;s URL.</p>
                <h1 className="text-3xl font-bold text-white">3. Write or Import Test Cases</h1>
                <p className="text-md font-medium text-white/60">Define test steps using our test case editor or import them via CSV. Each test case includes:</p>
                <ul style={{listStyle: "circle"}}>
                <li className="text-md font-light text-white/60">Page URL</li>
                <li className="text-md font-light text-white/60">Action (click, input, navigate, etc.)</li>
                <li className="text-md font-light text-white/60">Target (CSS selector, XPath)</li>
                <li className="text-md font-light text-white/60">Expected Output</li>
                </ul>
                <h1 className="text-3xl font-bold text-white">4. Run Tests</h1>
                <p className="text-md font-medium text-white/60">Click Run to trigger automated testing via Selenium on our backend.You&apos;ll see:</p>
                <ul style={{listStyle: "circle"}}>
                <li className="text-md font-light text-white/60">Live execution logs</li>
                <li className="text-md font-light text-white/60">Screenshots</li>
                <li className="text-md font-light text-white/60">Status per test case (pass/fail)</li>
                </ul>
                <h1 className="text-3xl font-bold text-white">5. View Results</h1>
                <p className="text-md font-medium text-white/60">Access detailed test reports under the Test Runs section:</p>
                <ul style={{listStyle: "circle"}}>
                <li className="text-md font-light text-white/60">Total Passed/Failed</li>
                <li className="text-md font-light text-white/60">Execution Time</li>
                <li className="text-md font-light text-white/60">Bug Logs</li>
                <li className="text-md font-light text-white/60">Test Coverage</li>
                </ul>
            </div>
            <h1 className="text-3xl text-white font-medium">📬 Support</h1>
            <p className="text-md font-light text-white/60">Need help? Contact us at mishramilan683@gmail.com</p>
        </div>
    )
}

