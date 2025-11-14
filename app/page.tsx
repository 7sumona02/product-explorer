import { Card } from '@/components/ui/card'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group'
import { Search } from 'lucide-react'

const page = async () => {
  const res = await fetch("https://dummyjson.com/products");
  const data = await res.json();
  const products = data.products
  return (
    <div className='max-w-5xl mx-auto flex flex-col justify-center items-center pt-26 pb-10'>
      <Nav />
      <div className='grid grid-cols-3 space-x-5 space-y-12'>
        {products.map((product: any) => (
          <ProductCard
            key={product.id}
            imgUrl={product.thumbnail}
            title={product.title}
            price={`$${product.price}`}
            description={product.description}
          />
        ))}
      </div>
    </div>
  )
}

export default page

const ProductCard = ({ imgUrl, title, price, description }: { imgUrl: string, title: string, price: string, description: string }) => {
   const shortDescription =
    description.length > 40
      ? description.slice(0, 40) + "..."
      : description;

      const shortTitle =
    title.length > 22
      ? title.slice(0, 22) + "..."
      : title;
  return (
    <Card className='w-[20vw] p-1 pb-3'>
      <div className='w-full h-60 overflow-hidden rounded-md'>
        <img src={imgUrl} className='w-full h-full object-cover' alt='product-image' />
      </div>
      <div className='px-1.5'>
        <div className='w-full flex items-center justify-between mt-2'>
          <div className='font-medium'>{shortTitle}</div>
          <div className='font-medium text-sm'>{price}</div>
        </div>
        <div className='text-sm text-neutral-500 mt-1'>{shortDescription}</div>
      </div>
    </Card>
  )
}

const Nav = () => {
  return (
    <div className='w-screen flex justify-between items-center fixed top-0 py-3 px-10 bg-white'>
      <div className='text-xl font-medium tracking-tight'>Product <span className='text-neutral-400'>Explorer.</span></div>
      <div>
        <InputGroup className='w-xs'>
          <InputGroupInput placeholder='Search product...' />
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
        </InputGroup>
      </div>
    </div>
  )
}