import { useState } from 'react'
import Link from 'next/link'

export default function ConversorDolar() {
  const [valorDolar, setValorDolar] = useState('')
  const cotacaoDolar = 5.20 // Cotação fixa do Dólar para Real

  // Função para calcular o valor em Real
  const calcularReal = (valor: String) => {
    const valorNumerico = parseFloat(valor)
    if (!isNaN(valorNumerico)) {
      return (valorNumerico * cotacaoDolar).toFixed(2)
    }
    return ''
  }

  const resultado = calcularReal(valorDolar)

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#2b6cb0] via-[#2c5282] to-[#2b6cb0] p-6">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
        <h1 className="text-4xl font-bold text-center text-blue-600 mb-6">
          Conversor Dólar ⇄ Real
        </h1>

        <div className="space-y-4">
          <input
            type="number"
            placeholder="Digite o valor em Dólar"
            value={valorDolar}
            onChange={(e) => setValorDolar(e.target.value)}
            className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />

          {resultado && (
            <div className="text-xl font-semibold text-center text-green-500 mt-4">
              Resultado: <span className="font-bold text-blue-600">R$ {resultado}</span>
            </div>
          )}
        </div>

        <div className="mt-6 text-center">
          <Link
            href="/"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 transition"
          >
            Voltar à Home
          </Link>
        </div>
      </div>
    </div>
  )
}
