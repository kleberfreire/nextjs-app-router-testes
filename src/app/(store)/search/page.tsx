import { api } from "@/data/api"
import { Product } from "@/data/types/product"
import Image from "next/image"
import Link from "next/link"
import { redirect, useSearchParams } from "next/navigation"

interface SearchPageProps {
  searchParams: {
    q: string
  }
}

async function searchProduct(search: string): Promise<Product[]> {
  const response = await api(`/products/search?q=${search}`, {
    next: {
      revalidate: 60 * 60 // 1 hora
    }
  })

  const product = await response.json()
  return product
} 


export default async function SearchPage({searchParams}: SearchPageProps) {
  const { q: query } = searchParams
  if (!query) {
    redirect('/')
  }

  const products = await searchProduct(query)
  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm">
        Resultado para: <span className="font-semibold">{query}</span>
      </p>
      <div className="grid grid-cols-3 gap-6">
        {products.length > 0 && products.map(product => (
        
          <Link
            key={product.id}
            href={`/product/${product.slug}`}
            className="group relative rounded-lg bg-zinc-900 overflow-hidden flex justify-center items-end"
          >
            <Image
              src={product.image}
              className="group-hover:scale-105 transition-transform duration-500"
              width={480}
              height={480}
              quality={100}
              alt=""
            />

            <div className="absolute bottom-10 right-10 h-12 flex items-center gap-2 max-w-[280px] rounded-full border-2 border-zinc-500 bg-black/60 p-1 pl-5">
              <span className="text-sm truncate">{product.title}</span>
              <span className="flex h-full items-center justify-center rounded-full bg-violet-500 px-4 font-semibold">
                {product.price.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })}
              </span>
            </div>
          </Link>
        ))} 
      </div>
      {products.length === 0 && (
        <div className="w-full h-full flex justify-center">
          <p className="font-semibold mt-60 text-lg">Nenhum resultado encontrado !</p>
        </div>
      )}
      {/* <div className="grid grid-cols-3">
        
          <Link
            href={`/product/${'moletom-java'}`}
            
        className="group relative rounded-lg bg-zinc-900 overflow-hidden flex justify-center items-end"
      >
        <Image
          src={'/moletom-java.png'}
          className="group-hover:scale-105 transition-transform duration-500"
          width={480}
          height={480}
          quality={100}
          alt=""
        />

        <div className="absolute bottom-10 right-10 h-12 flex items-center gap-2 max-w-[280px] rounded-full border-2 border-zinc-500 bg-black/60 p-1 pl-5">
              <span className="text-sm truncate">{'moletom-java'}</span>
          <span className="flex h-full items-center justify-center rounded-full bg-violet-500 px-4 font-semibold">
            {(100).toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })}
          </span>
        </div>
      </Link>
      </div> */}

    </div>
  )
}
