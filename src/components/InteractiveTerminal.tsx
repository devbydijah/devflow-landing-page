import React, { useState, useEffect, useRef } from 'react';

interface CommandOutput {
  type: 'input' | 'output' | 'error' | 'success';
  text: string;
  isLink?: boolean;
  url?: string;
}

const InteractiveTerminal: React.FC = () => {
  const [history, setHistory] = useState<CommandOutput[]>([
    { type: 'output', text: 'Welcome to DevAPI Interactive Terminal!' },
    { type: 'output', text: "Type 'help' to see available commands." },
  ]);
  const [currentCommand, setCurrentCommand] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalEndRef = useRef<HTMLDivElement>(null); // Keep for ensuring input is visible if needed
  const terminalContainerRef = useRef<HTMLDivElement>(null); // Ref for the scrollable container

  const scrollToBottom = () => {
    if (terminalContainerRef.current) {
      terminalContainerRef.current.scrollTop = terminalContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [history]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentCommand(e.target.value);
  };

  const executeCommand = (command: string): CommandOutput[] => {
    const normalizedCommand = command.trim().toLowerCase();
    const parts = normalizedCommand.split(' ');
    const baseCommand = parts[0];
    const arg = parts[1];

    switch (baseCommand) {
      case 'help':
        return [
          { type: 'output', text: 'Available commands:' },
          { type: 'output', text: '  help          - Show this help message' },
          { type: 'output', text: '  devapi init   - Initialize a new DevAPI project' },
          { type: 'output', text: '  devapi deploy - Deploy your project (mock)' },
          { type: 'output', text: '  clear         - Clear the terminal screen' },
        ];
      case 'devapi':
        if (arg === 'init') {
          const appName = parts[2] || 'my-awesome-api';
          return [
            { type: 'output', text: `Initializing DevAPI project '${appName}'...` },
            { type: 'output', text: '✓ Creating your API environment...' },
            { type: 'output', text: '✓ Generating authentication keys...' },
            { type: 'output', text: '✓ Setting up project config...' },
            { type: 'success', text: `🚀 Success! Your API '${appName}' is ready at: ` },
            { type: 'output', text: `   https://api.devapi.app/your-username/${appName}`, isLink: true, url: '#' }
          ];
        }
        if (arg === 'deploy') {
          return [
            { type: 'output', text: 'Deploying project...' },
            { type: 'output', text: '✓ Compiling assets...' },
            { type: 'output', text: '✓ Uploading to cloud...' },
            { type: 'success', text: '🚀 Deployment successful!'}
          ];
        }
        return [{ type: 'error', text: `Unknown devapi command: ${arg || ''}. Try 'devapi init' or 'devapi deploy'.` }];
      case 'clear':
        setHistory([]); // Clears history directly
        return [];
      case '':
        return []; // No output for empty command
      default:
        return [{ type: 'error', text: `Command not found: ${command}` }];
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const commandToProcess = currentCommand.trim();
    const newHistoryEntry: CommandOutput = { type: 'input', text: `$ ${commandToProcess}` };
    
    let commandOutputs: CommandOutput[] = [];
    if (commandToProcess.toLowerCase() === 'clear') {
      setHistory([]); // Special handling for clear
    } else {
      commandOutputs = executeCommand(commandToProcess);
      setHistory(prevHistory => [...prevHistory, newHistoryEntry, ...commandOutputs]);
    }
    
    setCurrentCommand('');
  };

  const handleTerminalClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div 
      ref={terminalContainerRef} // Assign ref to the scrollable container
      className="bg-gray-800 p-4 rounded-lg shadow-xl transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/30 h-80 overflow-y-auto font-mono text-sm"
      onClick={handleTerminalClick}
    >
      <div className="flex items-center mb-3">
        <span className="h-3 w-3 bg-red-500 rounded-full mr-2"></span>
        <span className="h-3 w-3 bg-yellow-500 rounded-full mr-2"></span>
        <span className="h-3 w-3 bg-green-500 rounded-full"></span>
        <span className="ml-auto text-gray-400 text-xs">interactive-terminal</span>
      </div>
      <div className="text-gray-300">
        {history.map((item, index) => (
          <div key={index} className="whitespace-pre-wrap">
            {item.type === 'input' && <span className="text-green-400">{item.text}</span>}
            {item.type === 'output' && (
              item.isLink ? 
              <a href={item.url || '#'} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline hover:text-blue-300">{item.text}</a> :
              <span>{item.text}</span>
            )}
            {item.type === 'error' && <span className="text-red-400">{item.text}</span>}
            {item.type === 'success' && <span className="text-green-400">{item.text}</span>}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="flex mt-1">
        <span className="text-green-400 mr-2">$</span>
        <input
          ref={inputRef}
          type="text"
          value={currentCommand}
          onChange={handleInputChange}
          className="bg-transparent border-none text-gray-300 flex-grow focus:outline-none w-full" // Added w-full for better layout
          autoFocus
        />
      </form>
      {/* terminalEndRef can be removed if not strictly needed for other focus logic, 
          as scrollToBottom now uses terminalContainerRef. 
          Keeping it for now doesn't harm. */}
      <div ref={terminalEndRef} style={{ height: '1px' }} /> 
    </div>
  );
};

export default InteractiveTerminal;
