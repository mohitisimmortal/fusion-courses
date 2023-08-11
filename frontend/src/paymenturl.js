const isProduction = process.env.IS_PRODUCTION;
let paymenturl;

if (isProduction) {
  paymenturl = 'https://fusion-courses-backend.vercel.app/api';
} else {
  paymenturl = 'http://localhost:3000/api';
}

export default paymenturl;