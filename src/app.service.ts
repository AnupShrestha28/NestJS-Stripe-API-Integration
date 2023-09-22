/*eslint-disable*/
import { Injectable } from '@nestjs/common';
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

@Injectable()
export class AppService {
  async getHello() {
    const session = await stripe.checkout.sessions.create({
      line_items: [{ price: process.env.PRODUCT_ID, quantity: 3 }],
      mode: 'payment',
      payment_intent_data: {
        setup_future_usage: 'on_session',
      },
      customer: process.env.CUSTOMER_ID,
      success_url:
        'http://localhost:3000' +
        '/pay/success/checkout/session?session_id={CHECKOUT_SESSION_ID}',
      cancel_url: 'http://localhost:3000' + '/pay/failed/checkout/session',
    });

    return session;
  }

  async SuccessSession(Session) {
    console.log(Session);
  }
}
