"use client";

import { useState } from "react";
import ProductsGrid from "./ProductsGrid";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Search, ShoppingBagIcon } from "lucide-react";
import { Button } from "./ui/button";
import CartSidebar from "./CartSidebar";

const ProductsWrapper = ({ products }: any) => {
  const [search, setSearch] = useState("");

  return (
    <main className='max-w-5xl mx-auto flex flex-col justify-center items-center pt-10 pb-10 md:px-0 px-3'>

      <nav className='w-screen flex md:flex-row flex-col md:gap-0 gap-3 justify-between items-center fixed top-0 py-3 px-10 bg-white' aria-label="navigation">
        <h1 className='text-xl font-medium tracking-tight'>
          Product <span className='text-neutral-400'>Explorer.</span>
        </h1>

        <div className="flex items-center gap-3">
          <InputGroup className='md:w-xs w-70'>
            <InputGroupInput 
              placeholder='Search product...'
              aria-label="Search products"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <InputGroupAddon aria-hidden="true">
              <Search />
            </InputGroupAddon>
          </InputGroup>
          {/* <Button className="cursor-pointer">
            <ShoppingBagIcon className="size-4" />
          </Button> */}
           <div className="flex items-center gap-4">
            <CartSidebar />
          </div>
        </div>
      </nav>

      <ProductsGrid aria-label="Product results" products={products} search={search} />
    </main>
  );
};

export default ProductsWrapper;
