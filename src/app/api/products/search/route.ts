import { z } from 'zod'
import data from '../data.json'
import type { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  await new Promise((resolve, reject) => setTimeout(resolve, 2000))

  const { searchParams } = request.nextUrl

  const query = z.string().parse(searchParams.get('q'))
  // const featuredProducts = data.products.filter(p => p.featured)

  const product = data.products.filter(p => {
    return p.title.toLocaleLowerCase().includes(query.toLocaleLowerCase())
  })

  if(!product) {
    return Response.json({
      message: 'Product not found!'
    }, {
      status: 400,
    })
  }

  return Response.json(product)
}