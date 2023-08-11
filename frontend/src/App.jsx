import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './components/signup/Signup';
import Admindashboard from './components/admindashboard/Admindashboard';
import './App.css';
import Adminsignup from './components/admindashboard/Adminsignup';
import Section1 from './components/section1/Section1';
import Header from './components/header/Header';
import Login from './components/login/Login';
import Adminlogin from './components/admindashboard/Adminlogin';
import { RecoilRoot } from 'recoil';
import Nopage from './components/nopage/Nopage';
import Coursedetail from './components/coursedetail/Coursedetail';
import Purchasedcourses from './components/purchasedcourses/Purchasedcourses';
import Payment from './components/payment/Payment';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  const isAdminDashboard = location.pathname === '/admindashboard';
  const isAdminlogin = location.pathname === '/adminlogin';
  const isAdminsignup = location.pathname === '/adminsignup';
  const isProduction = process.env.IS_PRODUCTION;

  return (
    <>
      <ToastContainer theme="dark" position="top-right" autoClose={3000} />
      <Router>
        <RecoilRoot>
          {!isAdminDashboard && !isAdminsignup && !isAdminlogin && <Header />}
          <Routes>
            <Route path="/payment/:courseId" element={<Payment />} />
            <Route path="/" element={<Section1 />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/coursedetail/:courseId" element={<Coursedetail />} />
            <Route path="/purchases" element={<Purchasedcourses />} />
            {!isProduction && <Route path="/adminsignup" element={<Adminsignup />} />}
            <Route path="/adminlogin" element={<Adminlogin />} />
            <Route path="/admindashboard" element={<Admindashboard />} />
            <Route path="*" element={<Nopage />} />
          </Routes>
        </RecoilRoot>
      </Router>
    </>
  );
}


export default App;