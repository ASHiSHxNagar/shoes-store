import { Metadata } from "next";
import sampleData from "@/db/sample-data";
import ProductList from "@/components/shared/products/product-list";


export const metadata: Metadata = {
  title: `Home`,
};


export default  function Home() {
  return (
   <>
   <ProductList data={sampleData.products} title="Featured Products" limit={4} />
   </>
  );
}