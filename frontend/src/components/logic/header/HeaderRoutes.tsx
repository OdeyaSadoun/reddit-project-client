import React from 'react'
import { Route } from 'react-router-dom';

import HeaderDisplay from '../../display/header/HeaderDisplay';
import HeaderUser from './HeaderUser';

export const HeadersRoutes = () => {
    return (
        <React.Fragment>
            <Route path="/user/*" element={<HeaderUser />} />
            <Route path="/*" element={<HeaderDisplay />} />
        </React.Fragment>
    );
}
