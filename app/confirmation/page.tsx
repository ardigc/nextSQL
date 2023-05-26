import { stripeClient } from '@/lib/server/stripe';

// import {useStripe} from '@stripe/react-stripe-js';
interface SearchParams {
  payment_intent: string;
  payment_intent_client_secret: string;
  redirect_status: string;
}
export default async function confirmation({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  console.log('PARAMETROS:', searchParams.payment_intent_client_secret);
  const stripe = stripeClient;

  const paymentIntent = await stripe.paymentIntents.retrieve(
    'pi_3NC1m0ESQPUGAWQ10Gtmv3a5'
  );
  console.log(paymentIntent);
  return (
    <div className="relative top-12 bg-blue-100 h-screen w-full ">
      <div className="border rounded-lg min-w-fit flex justify-center bg-blue-300 shadow-black shadow-2xl ">
        {' '}
      </div>
    </div>
  );
}
// intentar retrive
