import { useState } from 'react'

const CodePlayground = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [code, setCode] = useState(
    `// 🚀 Essayez du code JavaScript ici!\n\nfunction fibonacci(n) {\n  if (n <= 1) return n;\n  return fibonacci(n - 1) + fibonacci(n - 2);\n}\n\nconsole.log('Fibonacci de 10:', fibonacci(10));`
  )
  const [output, setOutput] = useState('')
  const [activeTab, setActiveTab] = useState('javascript')

  const templates = {
    javascript: `// 🚀 Essayez du code JavaScript ici!\n\nfunction fibonacci(n) {\n  if (n <= 1) return n;\n  return fibonacci(n - 1) + fibonacci(n - 2);\n}\n\nconsole.log('Fibonacci de 10:', fibonacci(10));`,
    react: `// ⚛️ Exemple React Component\n\nfunction Counter() {\n  const [count, setCount] = useState(0);\n  \n  return (\n    <div>\n      <h1>Count: {count}</h1>\n      <button onClick={() => setCount(count + 1)}>\n        Increment\n      </button>\n    </div>\n  );\n}`,
    algorithm: `// 🧮 Algorithme de tri rapide\n\nfunction quickSort(arr) {\n  if (arr.length <= 1) return arr;\n  \n  const pivot = arr[arr.length - 1];\n  const left = [];\n  const right = [];\n  \n  for (let i = 0; i < arr.length - 1; i++) {\n    if (arr[i] < pivot) {\n      left.push(arr[i]);\n    } else {\n      right.push(arr[i]);\n    }\n  }\n  \n  return [...quickSort(left), pivot, ...quickSort(right)];\n}\n\nconst array = [64, 34, 25, 12, 22, 11, 90];\nconsole.log('Tableau trié:', quickSort(array));`,
  }

  const runCode = () => {
    const logs = []
    const originalLog = console.log
    console.log = (...args) => {
      logs.push(args.join(' '))
    }

    try {
      eval(code)
      setOutput(logs.join('\n') || '✅ Code exécuté avec succès (aucune sortie)')
    } catch (error) {
      setOutput(`❌ Erreur: ${error.message}`)
    } finally {
      console.log = originalLog
    }
  }

  const changeTemplate = (template) => {
    setActiveTab(template)
    setCode(templates[template])
    setOutput('')
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-44 left-6 z-40 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2 transition-all duration-300 transform hover:scale-105"
      >
        <span className="text-lg">⚡</span>
        <span className="text-sm font-medium">Code Live</span>
      </button>
    )
  }

  return (
    <div className="fixed inset-4 z-50 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-200 dark:border-gray-700">
      <div className="bg-gradient-to-r from-orange-500 to-red-500 p-4 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">
            ⚡ Code Playground
          </h2>
          <p className="text-sm text-white/90">
            Testez du code en temps réel
          </p>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-colors duration-300"
        >
          ✕
        </button>
      </div>

      <div className="flex gap-2 p-4 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={() => changeTemplate('javascript')}
          className={`px-4 py-2 rounded-lg transition-all duration-300 ${
            activeTab === 'javascript'
              ? 'bg-yellow-400 text-gray-900 font-medium'
              : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
          }`}
        >
          JavaScript
        </button>
        <button
          onClick={() => changeTemplate('react')}
          className={`px-4 py-2 rounded-lg transition-all duration-300 ${
            activeTab === 'react'
              ? 'bg-cyan-400 text-gray-900 font-medium'
              : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
          }`}
        >
          React
        </button>
        <button
          onClick={() => changeTemplate('algorithm')}
          className={`px-4 py-2 rounded-lg transition-all duration-300 ${
            activeTab === 'algorithm'
              ? 'bg-green-400 text-gray-900 font-medium'
              : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
          }`}
        >
          Algorithmes
        </button>
        <button
          onClick={runCode}
          className="ml-auto px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-lg font-medium transition-all duration-300 transform hover:scale-105"
        >
          ▶ Exécuter
        </button>
      </div>

      <div className="flex-1 grid grid-cols-2 gap-4 p-4 overflow-hidden">
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            📝 Éditeur de code
          </label>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="flex-1 p-4 bg-gray-900 text-green-400 font-mono text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600 resize-none"
            spellCheck={false}
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            💻 Console de sortie
          </label>
          <div className="flex-1 p-4 bg-gray-900 text-white font-mono text-sm rounded-lg overflow-auto">
            {output ? (
              <pre className="whitespace-pre-wrap">{output}</pre>
            ) : (
              <p className="text-gray-500">
                Cliquez sur "Exécuter" pour voir le résultat...
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="p-4 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center gap-4">
            <span>⌨️ Ctrl+Enter pour exécuter</span>
            <span>🎨 Syntaxe JavaScript supportée</span>
          </div>
          <span className="text-xs">
            Powered by JavaScript Engine
          </span>
        </div>
      </div>
    </div>
  )
}

export default CodePlayground
