import { z } from 'zod'
import data from '../data.json'
import { NextResponse } from 'next/server'

export async function GET(_: Request, {params}: { params: { slug: string } }) {
  await new Promise((resolve, reject) => setTimeout(resolve, 2000))

  const slug = z.string().parse(params.slug)
  // const featuredProducts = data.products.filter(p => p.featured)

  const product = data.products.find(p => p.slug === params.slug)

  if(!product) {
    return Response.json({
      message: 'Product not found!'
    }, {
      status: 400,
    })
  }

  return Response.json(product)
}