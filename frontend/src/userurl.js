const isProduction = process.env.IS_PRODUCTION;
let userurl;

if (isProduction) {
  userurl = 'https://fusion-courses-backend.vercel.app/api/user';
} else {
  userurl = 'http://localhost:3000/api/user';
}

export default userurl;