import React, { useState, useEffect } from "react";
import { Copy } from "lucide-react"; // Using lucide-react for consistency
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import vscDarkPlus from "react-syntax-highlighter/dist/esm/styles/prism/vsc-dark-plus";

interface CodeExample {
  id: string;
  label: string;
  language: string;
  generateCode: (params: any) => string;
  generateResponse: (params: any) => string;
  initialParams: any;
  paramInputs: Array<{ id: string; label: string; type: "text" | "number" }>;
}

const restApiExample: CodeExample = {
  id: "rest",
  label: "REST API",
  language: "javascript",
  initialParams: { userId: "user123", userName: "Jane Doe" },
  paramInputs: [
    { id: "userId", label: "User ID (in path)", type: "text" },
    { id: "userName", label: "User Name (in response)", type: "text" },
  ],
  generateCode: (params) =>
    `
import { DevAPI } from '@devapi/client';

// Initialize the client
const api = new DevAPI({
  apiKey: 'YOUR_API_KEY',
  apiSecret: 'YOUR_API_SECRET'
});

// Create a REST endpoint
api.createEndpoint({
  path: '/users/${params.userId || ":id"}', // Dynamic user ID
  method: 'GET',
  async handler(req, res) {
    const { id } = req.params; // id will be ${params.userId}
    const user = { id, name: '${
      params.userName || "Default Name"
    }' }; // Dynamic user name
    return res.json(user);
  }
});

api.deploy();
  `.trim(),
  generateResponse: (params) =>
    JSON.stringify(
      {
        id: params.userId || "user123",
        name: params.userName || "Default Name",
      },
      null,
      2
    ),
};

// Add more examples (GraphQL, Webhooks, Auth) here later if needed
const codeExamples: Record<string, CodeExample> = {
  "REST API": restApiExample,
  // TODO: Add GraphQL, Webhooks, Authentication examples in similar structure
};

const InteractiveCodeDemo: React.FC = () => {
  const [activeTabKey, setActiveTabKey] = useState<string>(
    Object.keys(codeExamples)[0]
  );
  const [currentParams, setCurrentParams] = useState<any>(
    codeExamples[activeTabKey].initialParams
  );
  const [currentCode, setCurrentCode] = useState<string>("");
  const [currentResponse, setCurrentResponse] = useState<string>("");
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedResponse, setCopiedResponse] = useState(false);

  useEffect(() => {
    const activeExample = codeExamples[activeTabKey];
    setCurrentParams(activeExample.initialParams);
  }, [activeTabKey]);

  useEffect(() => {
    const activeExample = codeExamples[activeTabKey];
    setCurrentCode(activeExample.generateCode(currentParams));
    setCurrentResponse(activeExample.generateResponse(currentParams));
  }, [activeTabKey, currentParams]);

  const handleParamChange = (paramId: string, value: string | number) => {
    setCurrentParams((prev: any) => ({ ...prev, [paramId]: value }));
  };

  const handleCopy = (textToCopy: string, type: "code" | "response") => {
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        if (type === "code") {
          setCopiedCode(true);
          setTimeout(() => setCopiedCode(false), 2000);
        } else {
          setCopiedResponse(true);
          setTimeout(() => setCopiedResponse(false), 2000);
        }
      })
      .catch((err) => console.error("Failed to copy:", err));
  };

  const activeExampleDetails = codeExamples[activeTabKey];

  return (
    <div className="bg-gray-800 rounded-lg shadow-xl text-left max-w-4xl mx-auto">
      <div className="flex items-center justify-between p-3 border-b border-gray-700">
        <div className="flex space-x-1">
          {Object.keys(codeExamples).map((key) => (
            <button
              key={key}
              onClick={() => setActiveTabKey(key)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md cursor-pointer transition-colors duration-200 ease-in-out
                ${
                  activeTabKey === key
                    ? "text-blue-400 bg-gray-700 font-semibold"
                    : "text-gray-400 hover:text-blue-400 hover:bg-gray-700/30"
                }`}
            >
              {codeExamples[key].label}
            </button>
          ))}
        </div>
      </div>

      {/* Parameter Inputs */}
      {activeExampleDetails.paramInputs.length > 0 && (
        <div className="p-4 border-b border-gray-700 grid grid-cols-1 md:grid-cols-2 gap-4">
          {activeExampleDetails.paramInputs.map((input) => (
            <div key={input.id}>
              <label
                htmlFor={input.id}
                className="block text-xs font-medium text-gray-400 mb-1"
              >
                {input.label}
              </label>
              <input
                type={input.type}
                id={input.id}
                name={input.id}
                value={currentParams[input.id] || ""}
                onChange={(e) => handleParamChange(input.id, e.target.value)}
                className="w-full px-3 py-1.5 bg-gray-700 border border-gray-600 rounded-md text-gray-200 text-xs focus:ring-blue-500 focus:border-blue-500 placeholder-gray-500"
              />
            </div>
          ))}
        </div>
      )}

      <div className="md:flex">
        {/* Code Display */}
        <div className="md:w-1/2 p-1 relative">
          <div className="flex justify-between items-center p-2">
            <span className="text-xs text-gray-400">
              Example Code ({activeExampleDetails.language})
            </span>
            <button
              onClick={() => handleCopy(currentCode, "code")}
              className="text-gray-400 hover:text-white p-1 rounded-md hover:bg-gray-700 transition-colors text-xs flex items-center"
            >
              <Copy className="w-3 h-3 mr-1" />{" "}
              {copiedCode ? "Copied!" : "Copy"}
            </button>
          </div>
          <SyntaxHighlighter
            language={activeExampleDetails.language}
            style={vscDarkPlus}
            customStyle={{
              margin: 0,
              borderRadius: "0 0 0 0.5rem",
              height: "300px",
              fontSize: "0.8rem",
            }}
            showLineNumbers
            lineNumberStyle={{ color: "#666", fontSize: "0.7rem" }}
            wrapLines={true}
          >
            {currentCode}
          </SyntaxHighlighter>
        </div>

        {/* Response Display */}
        <div className="md:w-1/2 p-1 border-t md:border-t-0 md:border-l border-gray-700 relative">
          <div className="flex justify-between items-center p-2">
            <span className="text-xs text-gray-400">
              Mock API Response (JSON)
            </span>
            <button
              onClick={() => handleCopy(currentResponse, "response")}
              className="text-gray-400 hover:text-white p-1 rounded-md hover:bg-gray-700 transition-colors text-xs flex items-center"
            >
              <Copy className="w-3 h-3 mr-1" />{" "}
              {copiedResponse ? "Copied!" : "Copy"}
            </button>
          </div>
          <SyntaxHighlighter
            language="json"
            style={vscDarkPlus}
            customStyle={{
              margin: 0,
              borderRadius: "0 0 0.5rem 0",
              height: "300px",
              fontSize: "0.8rem",
            }}
            showLineNumbers
            lineNumberStyle={{ color: "#666", fontSize: "0.7rem" }}
            wrapLines={true}
          >
            {currentResponse}
          </SyntaxHighlighter>
        </div>
      </div>
    </div>
  );
};

export default InteractiveCodeDemo;
