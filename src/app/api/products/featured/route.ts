import data from '../data.json'

export async function GET() {
  await new Promise((resolve, reject) => setTimeout(resolve, 2000))
  const featuredProducts = data.products.filter(p => p.featured)
  return Response.json(featuredProducts)
}