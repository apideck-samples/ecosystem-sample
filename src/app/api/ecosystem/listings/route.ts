import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const ecosystemId = searchParams.get('ecosystemId')
  const cursor = searchParams.get('cursor')
  const limit = searchParams.get('limit') || '50'

  if (!ecosystemId) {
    return NextResponse.json({ error: 'Missing ecosystemId parameter' }, { status: 400 })
  }

  try {
    const cursorParam = cursor ? `&cursor=${cursor}` : ''
    const url = `https://api.apideck.com/ecosystems/${ecosystemId}/listings?limit=${limit}${cursorParam}`

    console.log('Fetching listings from:', url)

    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: response.statusText }))
      console.error('Error response:', response.status, errorData)

      // Provide more helpful error messages
      if (response.status === 404) {
        return NextResponse.json(
          {
            error: `Ecosystem '${ecosystemId}' not found. Please check if the ecosystem ID is correct (must be the UUID, not slug).`,
            detail: errorData
          },
          { status: 404 }
        )
      }

      return NextResponse.json(
        {
          error: errorData.message || errorData.error || 'Failed to fetch listings',
          detail: errorData
        },
        { status: response.status }
      )
    }

    const data = await response.json()
    console.log('Successfully fetched listings:', data?.data?.length || 0, 'items')

    return NextResponse.json(data)
  } catch (error: any) {
    console.error('Unexpected error:', error)
    return NextResponse.json({ error: error.message || 'An error occurred' }, { status: 500 })
  }
}
