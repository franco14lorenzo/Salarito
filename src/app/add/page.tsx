import { revalidatePath } from 'next/cache'
import Link from 'next/link'
import { redirect } from 'next/navigation'

import { prisma } from '@/db'

async function createSalary(data: FormData) {
  'use server'
  const gross = data.get('gross')
  const net = data.get('net')
  const dollarValue = data.get('dollar')
  const inflation = data.get('inflation')
  const date = data.get('date')

  if (
    typeof gross !== 'string' ||
    typeof net !== 'string' ||
    typeof dollarValue !== 'string' ||
    typeof inflation !== 'string' ||
    typeof date !== 'string'
  ) {
    throw new Error('Value is not a string')
  }

  const parsedGross = +parseFloat(gross.replace(',', '.')).toFixed(2)
  const parsedNet = +parseFloat(net.replace(',', '.')).toFixed(2)
  const parsedDollarValue = +parseFloat(dollarValue.replace(',', '.')).toFixed(
    2
  )
  const parsedInflation = +parseFloat(inflation.replace(',', '.')).toFixed(2)

  if (
    isNaN(parsedGross) ||
    isNaN(parsedNet) ||
    isNaN(parsedDollarValue) ||
    isNaN(parsedInflation)
  ) {
    throw new Error('Value is not a number')
  }

  await prisma.salary.create({
    data: {
      date: new Date(date),
      gross: parsedGross,
      net: parsedNet,
      dollarValue: parsedDollarValue,
      inflationRate: parsedInflation
    }
  })

  revalidatePath('/')
  redirect('/')
}

export default async function Add() {
  return (
    <section className="flex min-h-screen flex-col items-center justify-start gap-4 px-4">
      <h1 className="w-full py-2 text-left text-xl">Agregar salario</h1>
      <form action={createSalary} className="flex w-full flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label htmlFor="date" className="text-slate-100 hover:cursor-pointer">
            Fecha
          </label>
          <input
            id="date"
            name="date"
            type="date"
            className="rounded border border-slate-100 bg-slate-800 px-2 py-1 text-slate-100"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label
            htmlFor="gross"
            className="text-slate-100 hover:cursor-pointer"
          >
            Bruto
          </label>
          <input
            id="gross"
            name="gross"
            type="text"
            className="rounded border border-slate-100 bg-slate-800 px-2 py-1 text-slate-100"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="net" className="text-slate-100 hover:cursor-pointer">
            Neto
          </label>
          <input
            id="net"
            name="net"
            type="text"
            className="rounded border border-slate-100 bg-slate-800 px-2 py-1 text-slate-100"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label
            htmlFor="dollar"
            className="text-slate-100 hover:cursor-pointer"
          >
            Valor del dollar
          </label>
          <input
            id="dollar"
            name="dollar"
            type="text"
            className="rounded border border-slate-100 bg-slate-800 px-2 py-1 text-slate-100"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label
            htmlFor="dollar"
            className="text-slate-100 hover:cursor-pointer"
          >
            Valor de la inflación
          </label>
          <input
            id="inflation"
            name="inflation"
            type="text"
            className="rounded border border-slate-100 bg-slate-800 px-2 py-1 text-slate-100"
          />
        </div>

        <div className="flex w-full items-center justify-end gap-2">
          <Link href=".." className="rounded border border-slate-100 px-2 py-1">
            Cancelar
          </Link>
          <button
            type="submit"
            className="rounded border bg-slate-100 px-2 py-1 text-slate-800 hover:bg-slate-200"
          >
            Agregar
          </button>
        </div>
      </form>
    </section>
  )
}
