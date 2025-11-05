import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const searchParams = request.nextUrl.searchParams
  const ecosystemId = searchParams.get('ecosystemId')

  if (!ecosystemId) {
    return NextResponse.json({ error: 'Missing ecosystemId parameter' }, { status: 400 })
  }

  if (!id) {
    return NextResponse.json({ error: 'Missing listing ID' }, { status: 400 })
  }

  try {
    const url = `https://api.apideck.com/ecosystems/${ecosystemId}/listings/${id}`

    console.log('Fetching listing details from:', url)

    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: response.statusText }))
      console.error('Error response:', response.status, errorData)

      if (response.status === 404) {
        return NextResponse.json(
          {
            error: `Listing '${id}' not found in ecosystem '${ecosystemId}'.`,
            detail: errorData
          },
          { status: 404 }
        )
      }

      return NextResponse.json(
        {
          error: errorData.message || errorData.error || 'Failed to fetch listing details',
          detail: errorData
        },
        { status: response.status }
      )
    }

    const data = await response.json()
    console.log('Successfully fetched listing details:', data?.data?.name || id)

    return NextResponse.json(data)
  } catch (error: any) {
    console.error('Unexpected error:', error)
    return NextResponse.json({ error: error.message || 'An error occurred' }, { status: 500 })
  }
}
