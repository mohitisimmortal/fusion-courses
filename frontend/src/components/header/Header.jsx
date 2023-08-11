import React, { useEffect } from 'react';
import './header.css';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { userIsLoggedInState } from '../../recoil/userAtoms';

function Header() {
    const navigate = useNavigate();
    const [userIsLoggedIn, setUserIsLoggedIn] = useRecoilState(userIsLoggedInState);

    const handlePurchasesClick = () => {
        navigate('/purchases');
    };

    useEffect(() => {
        if (localStorage.getItem('userToken')) {
            setUserIsLoggedIn(true);
        } else {
            setUserIsLoggedIn(false);
        }
    }, [userIsLoggedIn]);

    return (
        <header>
            <div onClick={() => navigate('/')}>
                <a href='#' className='logo josefin-font'>
                    Fusion Courses
                </a>
            </div>
            <div>
                {userIsLoggedIn ? (
                    <button className='purchasesbtn' onClick={handlePurchasesClick}>
                        Purchases
                    </button>
                ) : (
                    <>
                        <button className='loginbtn' onClick={() => navigate('/login')}>
                            Login
                        </button>
                        <button className='signupbtn' onClick={() => navigate('/signup')}>
                            Sign up
                        </button>
                    </>
                )}
            </div>
        </header>
    );
}

export default Header;