import { columns } from '@/components/columns'
import { DataTable } from '@/components/data-table'
import { prisma } from '@/db'

const getSalaries = async () => {
  const salaries = await prisma.salary.findMany({
    orderBy: {
      date: 'desc'
    }
  })

  return salaries
}

export default async function Home() {
  const salaries = await getSalaries()

  return (
    <section className="flex min-h-screen flex-col items-center justify-start gap-4 px-4">
      <div className="w-full py-10">
        <DataTable columns={columns} data={salaries} />
      </div>
    </section>
  )
}
