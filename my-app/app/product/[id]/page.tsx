export default function ProductPage({ params }: { params: { id: string } }) {
  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-2xl font-bold">Product {params.id}</h1>
      <p className="text-gray-600">Product details will be displayed here.</p>
    </div>
  );
}