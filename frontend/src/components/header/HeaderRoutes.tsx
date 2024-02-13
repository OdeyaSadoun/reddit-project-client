import React from 'react'

import HeaderUser from './HeaderUser';
import Header from './Header';
import { Route } from 'react-router-dom';

export const HeadersRoutes = () => {
    return (
        <React.Fragment>
            <Route path="/user/*" element={<HeaderUser />} />
            <Route path="/*" element={<Header />} />
        </React.Fragment>
    );
}
