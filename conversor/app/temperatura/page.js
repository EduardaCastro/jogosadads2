'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function ConversorTemperatura() {
  const [valor, setValor] = useState('')
  const [resultado, setResultado] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValor = e.target.value
    setValor(inputValor)

    if (isNaN(parseFloat(inputValor))) {
      setResultado('')
      return
    }

    const temp = parseFloat(inputValor)
    if (inputValor.includes('°C')) {
      const fahrenheit = (temp * 9) / 5 + 32
      setResultado(`${fahrenheit.toFixed(2)} °F`)
    } else if (inputValor.includes('°F')) {
      const celsius = ((temp - 32) * 5) / 9
      setResultado(`${celsius.toFixed(2)} °C`)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#F6AD55] via-[#FFA500] to-[#FF4500] p-6">
      <h1 className="text-5xl font-extrabold text-white drop-shadow-lg mb-6 text-center">
        Conversor de Temperatura 🌡️
      </h1>

      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-lg space-y-6">
        <input
          type="text"
          placeholder="Digite a temperatura (ex: 25°C ou 77°F)"
          className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FF4500] transition"
          value={valor}
          onChange={handleChange}
        />

        {resultado && (
          <div className="text-2xl font-semibold text-center text-[#FF4500]">
            Resultado: <span className="font-bold text-[#F6AD55]">{resultado}</span>
          </div>
        )}
      </div>

      <Link
        href="/"
        className="mt-8 inline-block bg-[#4299E1] text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-[#3182CE] transition"
      >
        Voltar à Home
      </Link>
    </div>
  )
}