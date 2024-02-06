import React, { useContext, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
// import Cookies from 'js-cookie';
import { AppContext } from '../context/Context';

interface UserState {
    user: {
        role: string;
    };
}

const Header: React.FC = () => {
    const [accessToken, setAccessToken] = useState<boolean>(false);
    const { showInfo, setShowInfo } = useContext(AppContext);
    const nav = useNavigate();
    const { user } = useSelector((myStore: { userSlice: UserState }) => myStore.userSlice);

    const onShowInfo = () => {
        setShowInfo(!showInfo);
    };

    const logOut = () => {
        // Cookies.set('access_token', '-1');
        nav('/');
    };

    return (
        <div className='main-header'>
            <header className='container-fluid shadow'>
                <div className='container'>
                    <div className='row align-items-center justify-content-between mb-3 mt-0'>
                        <nav className='nav col-auto'>
                            <ul>
                                <li>
                                    <Link to='/' className='py-1'>
                                        <div className='logo'></div>
                                    </Link>
                                </li>
                                <li className='my-4'>
                                    <Link className='colored_text_hover' to='/contactus'>
                                        יצירת קשר
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                        <div className='col-auto user' onClick={onShowInfo}>
                            <i className='fa fa-user p-1 mt-1 home-btn' aria-hidden='true'></i>
                        </div>
                        {showInfo && (
                            <div className='user_icon_div p-2 
                            '>
                                {accessToken ? (
                                    <div className='colored_text_hover' onClick={() => nav(`/login`)}>
                                        login
                                    </div>
                                ) : (
                                    <div className='colored_text_hover'>
                                        <div onClick={() => nav(`/${user?.role}/details`)}>details</div>
                                        <div className='colored_text_hover' onClick={logOut}>
                                            logout
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </header>
        </div>
    );
};

export default Header;
