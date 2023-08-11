const isProduction = process.env.IS_PRODUCTION;
let userurl;

if (isProduction) {
  userurl = 'https://fusion-courses-backend.vercel.app/api/admin';
} else {
  userurl = 'http://localhost:3000/api/admin';
}

export default userurl;