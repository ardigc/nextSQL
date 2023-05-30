'use client';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from '../checkout/CheckoutForm';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_KEY_PUBLIC || ''
);
export default function CheckOutPage({
  clientSecret,
  setUp,
}: {
  clientSecret: string;
  setUp?: boolean;
}) {
  const options = {
    clientSecret,
  };
  return (
    <div>
      <Elements stripe={stripePromise} options={options}>
        <CheckoutForm setUp={setUp} />
      </Elements>
    </div>
  );
}
