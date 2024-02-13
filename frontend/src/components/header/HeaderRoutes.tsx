import React from 'react'
import { Route } from 'react-router-dom';
import HeaderUser from './HeaderUser';
import Header from './Header';

export const HeadersRoutes = () => {
    return (
        <React.Fragment>
            <Route path="/user/*" element={<HeaderUser />} />
            <Route path="/*" element={<Header />} />
        </React.Fragment>
    );
}
