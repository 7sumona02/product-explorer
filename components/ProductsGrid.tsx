"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "./ui/button";

const ProductsGrid = ({ products }: any) => {
  const [visibleCount, setVisibleCount] = useState(6);

  const loadMore = () => {
    setVisibleCount(prev => prev + 6);
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div className="grid md:grid-cols-3 grid-cols-1 gap-x-5 gap-y-12 mt-10">
        {products.slice(0, visibleCount).map((product: any) => (
          <ProductCard
            key={product.id}
            imgUrl={product.thumbnail}
            title={product.title}
            price={`$${product.price}`}
            description={product.description}
          />
        ))}
      </div>

      {visibleCount < products.length && (
        <Button
          onClick={loadMore}
          className="mt-10 rounded-lg text-sm"
        >
          Load More
        </Button>
      )}
    </div>
  );
};

export default ProductsGrid;

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
    <Card className='md:w-[20vw] w-full p-1 pb-3'>
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
