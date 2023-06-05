'use client'

import { Salary } from '@prisma/client'
import { ColumnDef } from '@tanstack/react-table'

type SalaryWithNumber = Salary & { number: number }

export const columns: ColumnDef<SalaryWithNumber>[] = [
  {
    accessorKey: 'number',
    header: '#',
    cell: ({ row }) => {
      const number = row.original.number

      return <span className="">{number}</span>
    }
  },
  {
    accessorKey: 'month',
    header: 'Mes',
    cell: ({ row }) => {
      const date = new Date(row.original.date)
      const month = date.toLocaleString('es-AR', { month: 'long' })

      return <span className="">{month}</span>
    }
  },
  {
    accessorKey: 'year',
    header: 'Año',
    cell: ({ row }) => {
      const date = new Date(row.original.date)
      const year = date.getFullYear()

      return <span className="">{year}</span>
    }
  },
  {
    accessorKey: 'gross',
    header: 'Bruto',
    cell: ({ row }) => {
      const gross = row.original.gross

      return <span className="">${gross}</span>
    }
  },
  {
    accessorKey: 'net',
    header: 'Neto',
    cell: ({ row }) => {
      const net = row.original.net

      return <span className="">${net}</span>
    }
  },
  {
    accessorKey: 'dollarValue',
    header: 'Dólar',
    cell: ({ row }) => {
      const dollarValue = row.original.dollarValue

      return <span className="">${dollarValue}</span>
    }
  },
  {
    accessorKey: 'inflationRate',
    header: 'Inflación',
    cell: ({ row }) => {
      const inflation = row.original.inflationRate

      return <span className="">{inflation}%</span>
    }
  }
]
