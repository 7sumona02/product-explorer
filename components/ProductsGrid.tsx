"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "./ui/button";
import Link from "next/link";

const ProductsGrid = ({ products, search }: any) => {
    const [visibleCount, setVisibleCount] = useState(6);

    const loadMore = () => setVisibleCount(prev => prev + 6);

    const filtered = products.filter((p: any) =>
        p.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="w-full flex flex-col items-center mt-10">
            <div className="grid md:grid-cols-3 grid-cols-1 gap-x-5 gap-y-12 mt-10">
                {filtered.slice(0, visibleCount).map((product: any) => (
                    <ProductCard
                        id={product.id}
                        key={product.id}
                        imgUrl={product.thumbnail}
                        title={product.title}
                        price={`$${product.price}`}
                        description={product.description}
                    />
                ))}
            </div>

            {visibleCount < filtered.length && (
                <Button
                    onClick={loadMore}
                    className="mt-10 rounded-md text-sm"
                >
                    Load More
                </Button>
            )}

            {filtered.length === 0 && (
                <p className="mt-10 text-neutral-500 text-sm">No results found.</p>
            )}
        </div>
    );
};

export default ProductsGrid;

const ProductCard = ({
  imgUrl,
  title,
  price,
  description,
  id,
}: {
  imgUrl: string;
  title: string;
  price: string;
  description: string;
  id: string | number;
}) => {
  const shortDescription =
    description.length > 75 ? description.slice(0, 75) + "..." : description;

  const shortTitle =
    title.length > 22 ? title.slice(0, 22) + "..." : title;

  return (
    <Link href={`/product/${id}`}>
      <Card className="md:w-[20vw] md:h-[24vw] w-full p-1 pb-3 cursor-pointer overflow-hidden">
        <div className="w-full h-60 overflow-hidden rounded-md">
          <img
            src={imgUrl}
            className="w-full h-full object-cover"
            alt="product-image"
          />
        </div>
        <div className="px-1.5">
          <div className="w-full flex items-center justify-between mt-2">
            <div className="font-medium">{shortTitle}</div>
            <div className="font-medium text-sm">{price}</div>
          </div>
          <div className="text-sm text-neutral-500 mt-1">
            {shortDescription}
          </div>
        </div>
      </Card>
    </Link>
  );
};

