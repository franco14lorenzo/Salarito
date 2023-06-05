'use client'
import { useState } from 'react'

const DollarButton = () => {
  const [loading, setLoading] = useState<boolean>(false)

  const handleClick = async () => {
    setLoading(true)
    const res = await fetch('/api/dollarToday/')
    const json = await res.json()

    const dollar = json.dollarBlue
    const dollarInput = document.getElementById('dollar') as HTMLInputElement
    dollarInput.value = dollar.toString()

    setLoading(false)
  }

  // TODO: Add error handling and filter by date

  return (
    <button
      type="button"
      className="rounded border border-slate-100 px-2 py-1 text-slate-100 hover:cursor-pointer hover:bg-slate-600"
      onClick={handleClick}
    >
      {loading ? 'Cargando...' : 'Consultar'}
    </button>
  )
}

export default DollarButton
