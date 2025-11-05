import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  if (!id) {
    return NextResponse.json({ error: 'Missing ecosystem ID' }, { status: 400 })
  }

  try {
    const url = `https://api.apideck.com/ecosystems/${id}`

    console.log('Fetching ecosystem from:', url)

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
            error: `Ecosystem '${id}' not found. Please check if the ecosystem ID is correct.`,
            detail: errorData
          },
          { status: 404 }
        )
      }

      return NextResponse.json(
        {
          error: errorData.message || errorData.error || 'Failed to fetch ecosystem',
          detail: errorData
        },
        { status: response.status }
      )
    }

    const data = await response.json()
    console.log('Successfully fetched ecosystem:', data?.data?.name || id)

    return NextResponse.json(data)
  } catch (error: any) {
    console.error('Unexpected error:', error)
    return NextResponse.json({ error: error.message || 'An error occurred' }, { status: 500 })
  }
}

