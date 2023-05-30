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
  paymentId,
}: {
  clientSecret: string;
  setUp?: boolean;
  paymentId: string;
}) {
  const options = {
    clientSecret,
  };
  console.log(paymentId);
  return (
    <div>
      <Elements stripe={stripePromise} options={options}>
        <CheckoutForm
          setUp={setUp}
          paymentId={paymentId}
          clientSecret={clientSecret}
        />
      </Elements>
    </div>
  );
}
