import Stripe from 'stripe';
const apiKey = process.env.STRIPE_KEY_SECRET || '';
export const stripeClient = new Stripe(apiKey, { apiVersion: '2022-11-15' });
