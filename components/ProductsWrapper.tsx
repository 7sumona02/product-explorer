"use client";

import { useState } from "react";
import ProductsGrid from "./ProductsGrid";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Search } from "lucide-react";

const ProductsWrapper = ({ products }: any) => {
  const [search, setSearch] = useState("");

  return (
    <div className='max-w-5xl mx-auto flex flex-col justify-center items-center pt-10 pb-10 md:px-0 px-3'>

    {/* nav */}
      <div className='w-screen flex md:flex-row flex-col md:gap-0 gap-3 justify-between items-center fixed top-0 py-3 px-10 bg-white'>
        <div className='text-xl font-medium tracking-tight'>
          Product <span className='text-neutral-400'>Explorer.</span>
        </div>

        <div>
          <InputGroup className='w-xs'>
            <InputGroupInput 
              placeholder='Search product...'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <InputGroupAddon>
              <Search />
            </InputGroupAddon>
          </InputGroup>
        </div>
      </div>

      {/* products */}
      <ProductsGrid products={products} search={search} />
    </div>
  );
};

export default ProductsWrapper;
