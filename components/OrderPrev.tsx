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
export default function OrdersPrev({ order }: { order: Order }) {
  return <div></div>;
}
