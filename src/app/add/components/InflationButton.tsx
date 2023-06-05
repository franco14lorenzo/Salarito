'use client'
import { useState } from 'react'

const InflationButton = () => {
  const [loading, setLoading] = useState<boolean>(false)

  const handleClick = async () => {
    // TODO: Add error handling
    setLoading(true)
    const dateInput = document.getElementById('date') as HTMLInputElement
    console.log('dateInput', dateInput.value)

    if (!dateInput.value) {
      alert('Debe ingresar una fecha')
      setLoading(false)
      return
    }

    const yymm = dateInput.value.split('-').slice(0, 2).join('-')

    const res = await fetch(`/api/inflationRate?date=${yymm}`)

    const json = await res.json()

    const inflation = json.data.v
    const inflationInput = document.getElementById(
      'inflation'
    ) as HTMLInputElement
    inflationInput.value = inflation.toString()

    setLoading(false)
  }

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

export default InflationButton
