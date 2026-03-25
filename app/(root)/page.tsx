import { Metadata } from "next";
// import sampleData from "@/db/sample-data";
import ProductList from "@/components/shared/products/product-list";
import { getLatestProducts } from "@/lib/actions/product.actions";


export const metadata: Metadata = {
  title: `Home`,
};


export default async function Home() {

  const latestProducts = await getLatestProducts()
  return (
   <>
   <ProductList data={latestProducts} title="Featured Products" />
   </>
  );
}