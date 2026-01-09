import ProductListing from "@/components/sections/listing";
import { Suspense } from "react";

export default function Home() {
  return (
    <main>
      <Suspense fallback={<div>Loading...</div>}>
        <ProductListing />
      </Suspense>
    </main>
  );
}
