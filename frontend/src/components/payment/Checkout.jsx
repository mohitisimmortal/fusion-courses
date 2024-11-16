import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import { CardNumberElement, CardCvcElement, CardExpiryElement, useStripe, useElements, } from "@stripe/react-stripe-js";
import { Typography } from '@mui/material';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import EventIcon from '@mui/icons-material/Event';
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import { useNavigate, useParams } from 'react-router-dom';
import './payment.css'
import { handleApiError } from '../../reactToastify';
import userurl from '../../userurl';
import paymenturl from '../../paymenturl';

const Checkout = () => {
    const stripe = useStripe();
    const elements = useElements();
    const payBtn = useRef(null);
    const navigate = useNavigate()
    const { courseId } = useParams();
    const [processingText, setProcessingText] = useState('Pay Now');

    const submitHandler = async (e) => {
        e.preventDefault();


        try {
            const token = localStorage.getItem('userToken'); // Get the user token from localStorage
            if (!token) {
                // If token not found, the user is not logged in
                alert('Please log in first');
                return;
            }
            if (!elements.getElement(CardNumberElement)?._complete ||
                !elements.getElement(CardExpiryElement)?._complete ||
                !elements.getElement(CardCvcElement)?._complete) {
                alert("Please fill in all required card details before proceeding.");
                return;
            }
            setProcessingText('Processing...');

            const { data } = await axios.post(`${paymenturl}/payment/${courseId}`, {}, {
                headers: {
                    Authorization: token
                },
            });

            const client_secret = data.client_secret;

            if (!stripe || !elements) return;

            const result = await stripe.confirmCardPayment(client_secret, {
                payment_method: {
                    card: elements.getElement(CardNumberElement)
                }
            })
            setProcessingText('Pay Now');


            if (result.error) {
                console.log(result.error.message);
            }
            else {
                if (result.paymentIntent.status === "succeeded") {
                    alert('payment successful')
                    // Make API call to add the course to purchased courses
                    await axios.post(`${userurl}/add-purchased-course`, { courseId }, {
                        headers: {
                            Authorization: token
                        },
                    });
                    // Navigate to the purchases page
                    navigate('/purchases');
                } else {
                    alert("There's some issue while processing payment ");
                }
            }

        } catch (error) {
            // console.log('Error during payment: ', error);
            handleApiError(error)
            setProcessingText('Pay Now');
        }
    }
    return (
        <>
            <section className="paymentContainer">
                <form className="paymentForm" onSubmit={submitHandler}>
                    <Typography style={{ marginBottom: '.3rem' }}>Put your card info</Typography>
                    <div>
                        <CreditCardIcon />
                        <CardNumberElement className="paymentInput" id='cardID' />
                        <p style={{ marginTop: '-10px', marginBottom: '20px', fontSize: '12px' }}>*Use test card number- 4242424242424242</p>

                    </div>
                    <div>
                        <EventIcon />
                        <CardExpiryElement className="paymentInput" id='cardExpiry' />
                    </div>
                    <div>
                        <VpnKeyIcon />
                        <CardCvcElement className="paymentInput" id='cardCvc' />
                    </div>
                    <input
                        type="submit"
                        ref={payBtn}
                        className="paymentFormBtn"
                        value={processingText}
                        style={{ cursor: 'pointer' }}
                    />
                </form>
            </section>
        </>
    )
}

export default Checkout