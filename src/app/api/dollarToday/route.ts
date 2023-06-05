import { chromium } from 'playwright'

import { NextResponse } from 'next/server'

export async function GET() {
  const browser = await chromium.launch({
    headless: true
  })
  const context = await browser.newContext({
    userAgent:
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' +
      ' AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'
  })

  const page = await context.newPage()
  await page.goto('https://www.dolarito.ar/')

  const elements = await page.$$eval('p', (el) => el.map((x) => x.textContent))
  const dollarBlue = elements[14]

  return NextResponse.json({ dollarBlue })
}
