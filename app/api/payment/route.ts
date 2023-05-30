import { NextRequest } from 'next/server';
import { Stripe } from 'stripe';

const stripe = new Stripe(`${process.env.STRIPE_KEY_SECRET}`, {
  apiVersion: '2022-11-15',
});

export async function POST(req: NextRequest) {
  const body = await req.json();
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: body.amount,
      currency: 'eur',
      payment_method_types: ['card'],
      description: body.description,
    });
    return new Response(JSON.stringify(paymentIntent), { status: 200 });
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
