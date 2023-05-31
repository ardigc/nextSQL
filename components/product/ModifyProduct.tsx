interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  seller_id: number;
}
export default function ModifyProduct({
  products,
}: {
  products: Array<Product>;
}) {
  return (
    <div>
      <h1>Tus productos</h1>
      <div className="grid grid-cols-[3fr_3fr_3fr_1fr] items-center">
        <div>Nombre</div>
        <div>Descripción</div>
        <div>Precio</div>
        <div></div>
        {products.map((product) => (
          <>
            <div className="flex justify-center">{product.name}</div>
            <div className="flex justify-center">{product.description}</div>
            <div className="flex justify-center">{product.price}€</div>
            <div></div>
          </>
        ))}
      </div>
    </div>
  );
}
