import { NextResponse } from 'next/server'

const token =
  process.env.BCRA_TOKEN ||
  'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MTc0NDkyNTEsInR5cGUiOiJleHRlcm5hbCIsInVzZXIiOiJmcmFuY28xNGxvcmVuem9AZ21haWwuY29tIn0.lUkKbY2XjVCYg5p2af4SLECtN1c9WKL7W6GVvKk5Hh5-_TOmR4LA5bIF8mRTMr_qH5LWeJOxCp8fJE7yz9Tn0g'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const date = searchParams.get('date')
  console.log(date)
  const response = await fetch(
    'https://api.estadisticasbcra.com/inflacion_mensual_oficial',
    {
      headers: {
        Authorization: `BEARER ${token}`
      }
    }
  )

  const data = await response.json()

  console.log(data[0].d)

  const filteredData = data.filter((x: any) => x.d.startsWith(date))

  if (filteredData.length === 0) {
    return NextResponse.json({ error: 'No data found' }, { status: 404 })
  }
  return NextResponse.json({ data: filteredData[0] })
}
