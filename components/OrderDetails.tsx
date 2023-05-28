interface Order {
  id: number;
  user_id: number;
  cart_id: number;
  line: string;
  postal_code: number;
  city: string;
  country: string;
  marked_as_default: Date;
}
interface Cart {
  cart_id: number;
  description: string;
  id: number;
  name: string;
  price: number;
  product_id: number;
  qt: number;
  user_id: number;
}
export default function OrderDetails({
  order,
  price,
  cart,
}: {
  order: Order;
  price: number;
  cart: Cart;
}) {
  return (
    <div>
      <button className="border my-1 rounded-lg border-blue-900 hover:bg-blue-500 bg-blue-400">
        <div>
          Pedido nº {order.id} realizado el{' '}
          {order.marked_as_default.toLocaleDateString()} a las{' '}
          {order.marked_as_default.toLocaleTimeString()}
        </div>
        <div>
          A la direccion {order.line} con CP {order.postal_code}{' '}
        </div>
        <div>
          {order.city}, {order.country}
        </div>
        <div>Precio: {} €</div>
      </button>
    </div>
  );
}
