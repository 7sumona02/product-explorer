import ProductsWrapper from "@/components/ProductsWrapper";

const Page = async () => {
  const res = await fetch("https://dummyjson.com/products");
  const data = await res.json();
  const products = data.products;
  console.log(products)

  return (
    <ProductsWrapper products={products} />
  );
};

export default Page;
