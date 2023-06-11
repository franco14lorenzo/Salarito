import { NextResponse } from 'next/server'

const token = process.env.BCRA_TOKEN

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const date = searchParams.get('date')

  const response = await fetch(
    'https://api.estadisticasbcra.com/inflacion_mensual_oficial',
    {
      headers: {
        Authorization: `BEARER ${token}`
      }
    }
  )

  const data = await response.json()

  const filteredData = data.filter((x: any) => x.d.startsWith(date))

  if (filteredData.length === 0) {
    return NextResponse.json({ error: 'No data found' }, { status: 404 })
  }
  return NextResponse.json({ data: filteredData[0] })
}
