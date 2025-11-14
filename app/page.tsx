import ProductsGrid from "@/components/ProductsGrid";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Search } from "lucide-react";

const Page = async () => {
  const res = await fetch("https://dummyjson.com/products");
  const data = await res.json();
  const products = data.products;

  return (
    <div className='max-w-5xl mx-auto flex flex-col justify-center items-center pt-20 pb-10 md:px-0 px-3'>
      <Nav />
      <ProductsGrid products={products} />
    </div>
  );
};

export default Page;

const Nav = () => {
  return (
    <div className='w-screen flex md:flex-row flex-col md:gap-0 gap-3 justify-between items-center fixed top-0 py-3 px-10 bg-white'>
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
  );
};
