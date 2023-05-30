import { NextRequest } from 'next/server';
import { Stripe } from 'stripe';

const stripe = new Stripe(`${process.env.STRIPE_KEY_SECRET}`, {
  apiVersion: '2022-11-15',
});

export async function POST(req: NextRequest) {
  const body = await req.json();

  try {
    if (body.id) {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: body.price * 100,
        currency: 'eur',
        // payment_method_types: ['card'],
        payment_method: body.id,
        metadata: { cartId: body.cartId, adressId: body.adressId },
        customer: body.customerId,
        confirm: true,
      });
      return new Response(JSON.stringify(paymentIntent), { status: 200 });
    } else {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: body.price * 100,
        currency: 'eur',
        payment_method_types: ['card'],
        metadata: { cartId: body.cartId, adressId: body.adressId },
        customer: body.customerId,
      });
      return new Response(JSON.stringify(paymentIntent), { status: 200 });
    }
  } catch (error) {
    throw new Error('fallo en el pago' + error);
  }
}
export async function PATCH(req: NextRequest) {
  const body = await req.json();
  const id = body.id;

  try {
    const paymentMethod = await stripe.paymentMethods.detach(`${id}`);
    return new Response('Se ha subido bien', { status: 200 });
  } catch (error) {
    throw new Error('fallo en el pago' + error);
  }
}
