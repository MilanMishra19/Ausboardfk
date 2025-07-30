

export default function Docs(){
    return(
        <div className="form-container relative flex w-full max-w-5xl flex-col items-center justify-center rounded-2xl bg-white/5 p-8 shadow-2xl backdrop-blur-lg backdrop-filter sm:p-12 gap-12">
  <h1 className="text-5xl font-bold text-white tracking-wide">📄 Documentation</h1>
  <p className="text-md font-medium text-white/60 text-center max-w-2xl">
    Welcome to the <span className="text-red-400 font-semibold">Plug-and-Test</span> Docs – your complete guide to running automated tests on your websites with ease.
  </p>

  <div className="flex flex-col w-full items-start justify-start gap-10">
    {/* Section Title */}
    <h1 className="text-3xl font-bold text-white border-b-2 border-red-500 pb-2">🚀 Getting Started</h1>

    {/* Step 1 */}
    <div className="space-y-2">
      <h2 className="text-2xl font-semibold text-red-400">1️⃣ Sign Up / Login</h2>
      <p className="text-white/60">
        Head to the CTA buttons at the <span className="text-white font-medium">Homepage</span> and log in or create a new account to get started.
      </p>
    </div>

    {/* Step 2 */}
    <div className="space-y-2">
      <h2 className="text-2xl font-semibold text-red-400">2️⃣ Add Your Project</h2>
      <p className="text-white/60">
        Go to the <span className="font-medium text-white">Projects section</span> and follow the step by step guide to add your first project.
      </p>
    </div>

    {/* Step 3 */}
    <div className="space-y-2">
      <h2 className="text-2xl font-semibold text-red-400">3️⃣ Add testcases</h2>
      <p className="text-white/60">Click on the 3 dots beside the project and click on {'Add testcases'} to go to the testcases form which consists of:</p>
      <ul className="list-disc ml-6 text-white/60 space-y-1">
        <li><span className="text-white">Endpoint</span></li>
        <li><span className="text-white">HTTP Method</span> (e.g. <code className="text-red-300">GET</code>, <code className="text-red-300">POST</code>, etc.)</li>
        <li><span className="text-white">Payload or headers(if any)</span></li>
        <li><span className="text-white">Test type</span>(Fuzz,Functional,Stress etc.)</li>
      </ul>
    </div>
    

    {/* Step 4 */}
    <div className="space-y-2">
      <h2 className="text-2xl font-semibold text-red-400">4️⃣ Run Tests</h2>
      <p className="text-white/60">Click <code className="text-blue-300">Run</code> to execute tests via Springboot backend which is available at the testcases overview section. You&apos;ll see:</p>
      <ul className="list-disc ml-6 text-white/60 space-y-1">
        <li>Testcase details</li>
        <li>Link to a detailed testrun overview</li>
      </ul>
    </div>

    {/* Step 5 */}
    <div className="space-y-2">
      <h2 className="text-2xl font-semibold text-red-400">5️⃣ View Results</h2>
      <p className="text-white/60">Check reports under <span className="text-white font-medium">Test Runs overview</span>:</p>
      <ul className="list-disc ml-6 text-white/60 space-y-1">
        <li>✅ Passed / ❌ Failed</li>
        <li>⏱ Execution Time</li>
        <li>Response</li>
        <li>Time of creation</li>
      </ul>
    </div>
    <div className="space-y-2">
      <h2 className="text-2xl font-semibold text-red-400">Additional Information</h2>
      <ul className="list-disc ml-6 text-white/60 space-y-1">
        <li><span className="text-red-300">Functional Testing</span>: Ensures your API endpoints return correct responses for expected inputs.</li>
        <li><span className="text-red-300">Smoke Testing</span>: Validates that critical API routes are reachable and not failing at launch.</li>
        <li><span className="text-red-300">Fuzz Testing</span>: Sends malformed or random data to API endpoints to uncover unexpected crashes or security flaws.</li>
        <li><span className="text-red-300">Stress & Load Testing</span>: Evaluates your API’s stability and performance under high request volume or prolonged usage.</li>
      </ul>
    </div>
  </div>
  
  

  {/* Support Section */}
  <div className="w-full pt-8 border-t border-white/10 text-center space-y-2">
    <h1 className="text-2xl text-white font-semibold">📬 Need Help?</h1>
    <p className="text-md font-light text-white/60">
      Reach out to us at <a href="mailto:mishramilan683@gmail.com" className="text-red-400 hover:underline">mishramilan683@gmail.com</a>
    </p>
  </div>
</div>

    )
}

