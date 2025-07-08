import { NextRequest, NextResponse } from 'next/server'

/**
 * Unshortens HDH links to get the departureMonitorId
 * TODO response type
 */
export const GET = async (request: NextRequest): Promise<NextResponse> => {
  const { searchParams } = new URL(request?.url)
  const processUrl = searchParams?.get('processUrl') || undefined

  if (typeof processUrl !== 'undefined') {
    const redirectUrl = await fetch(processUrl, {
      method: 'head',
      redirect: 'manual',
    }).then((res) => {
      return res?.headers?.get('location')
    })
    console.log('dsvfsdf', redirectUrl)

    if (typeof redirectUrl !== 'undefined') {
      return NextResponse.json(redirectUrl)
    } else {
      return new NextResponse('Error', {
        status: 500,
      })
    }
  }
  // Fallthrough error
  return new NextResponse('Error', {
    status: 500,
  })
}
