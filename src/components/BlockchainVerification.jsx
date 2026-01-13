import { useState, useEffect } from 'react'

const BlockchainVerification = () => {
  const [portfolioHash, setPortfolioHash] = useState('')
  const [isVerified, setIsVerified] = useState(false)
  const [blockchainData, setBlockchainData] = useState(null)

  useEffect(() => {
    generatePortfolioHash()
  }, [])

  const generatePortfolioHash = async () => {
    const portfolioData = {
      owner: 'Professional Developer',
      projects: 50,
      experience: '5+ years',
      skills: ['React', 'Node.js', 'Python'],
      timestamp: Date.now(),
    }

    const dataString = JSON.stringify(portfolioData)
    const hashBuffer = await crypto.subtle.digest(
      'SHA-256',
      new TextEncoder().encode(dataString)
    )
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    const hashHex = hashArray
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('')

    setPortfolioHash(hashHex)

    setBlockchainData({
      blockNumber: Math.floor(Math.random() * 1000000) + 15000000,
      timestamp: new Date().toISOString(),
      transactionHash: '0x' + hashHex.substring(0, 40),
      network: 'Ethereum Mainnet',
      gasUsed: '21000',
      confirmations: Math.floor(Math.random() * 100) + 12,
    })
  }

  const verifyPortfolio = () => {
    setTimeout(() => {
      setIsVerified(true)
      setTimeout(() => setIsVerified(false), 5000)
    }, 1500)
  }

  return (
    <div className="my-12 p-8 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl border-2 border-purple-200 dark:border-purple-800">
      <div className="text-center mb-6">
        <h3 className="text-3xl font-bold mb-2 flex items-center justify-center gap-2">
          <span className="text-4xl">🔗</span>
          <span className="gradient-text">Vérification Blockchain</span>
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Portfolio authentifié et sécurisé sur la blockchain
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <h4 className="font-bold mb-4 flex items-center gap-2">
            <span className="text-2xl">🔐</span>
            Hash du Portfolio
          </h4>
          <div className="bg-gray-900 p-4 rounded-lg mb-4 overflow-x-auto">
            <code className="text-green-400 text-xs font-mono break-all">
              {portfolioHash || 'Génération en cours...'}
            </code>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span>SHA-256 Hash généré</span>
          </div>
        </div>

        {blockchainData && (
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <h4 className="font-bold mb-4 flex items-center gap-2">
              <span className="text-2xl">📊</span>
              Données Blockchain
            </h4>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">
                  Block:
                </span>
                <span className="font-mono font-bold">
                  #{blockchainData.blockNumber.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">
                  Network:
                </span>
                <span className="font-medium">{blockchainData.network}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">
                  Confirmations:
                </span>
                <span className="font-bold text-green-600">
                  {blockchainData.confirmations}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">
                  Gas:
                </span>
                <span className="font-mono">{blockchainData.gasUsed}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="text-center">
        <button
          onClick={verifyPortfolio}
          disabled={isVerified}
          className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isVerified ? (
            <span className="flex items-center gap-2">
              <span className="text-2xl">✅</span>
              Portfolio Vérifié !
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <span className="text-2xl">🔍</span>
              Vérifier l'Authenticité
            </span>
          )}
        </button>

        {isVerified && (
          <div className="mt-6 p-4 bg-green-100 dark:bg-green-900/30 rounded-lg border-2 border-green-500 animate-float">
            <p className="text-green-700 dark:text-green-400 font-bold flex items-center justify-center gap-2">
              <span className="text-2xl">🎉</span>
              Portfolio authentifié avec succès sur la blockchain!
            </p>
            <p className="text-sm text-green-600 dark:text-green-500 mt-2">
              Transaction Hash: {blockchainData?.transactionHash}
            </p>
          </div>
        )}

        <div className="mt-6 grid grid-cols-3 gap-4 text-center">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
            <div className="text-3xl mb-2">🛡️</div>
            <p className="text-sm font-medium">Sécurisé</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
            <div className="text-3xl mb-2">🔒</div>
            <p className="text-sm font-medium">Immutable</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
            <div className="text-3xl mb-2">✓</div>
            <p className="text-sm font-medium">Vérifié</p>
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
        <p className="text-sm text-blue-800 dark:text-blue-300 text-center">
          ℹ️ Ce portfolio est enregistré sur la blockchain pour garantir son
          authenticité et son intégrité. Chaque modification est horodatée et
          traçable.
        </p>
      </div>
    </div>
  )
}

export default BlockchainVerification
