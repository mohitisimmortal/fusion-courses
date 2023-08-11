import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import Checkout from './Checkout';
import paymenturl from '../../paymenturl';

const Payment = () => {
  const [stripeApiKey, setStripeApiKey] = useState("");
  async function getStripeApiKey() {
    const token = localStorage.getItem('userToken'); // Get the user token from localStorage

    const { data } = await axios.get(`${paymenturl}/stripeapikey`, {
      headers: {
        Authorization: token,
      },
    });
    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    getStripeApiKey();
  }, []);

  return (
    <>
      {stripeApiKey && (
        <Elements stripe={loadStripe(stripeApiKey)}>
          <Checkout />
        </Elements>
      )}
    </>
  )
}

export default Payment;