import React from 'react'
import { NavLink } from 'react-router-dom'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export default function Error() {
    return (
        <div className="text-white w-full mt-7 text-center">
            <h2 className="text-7xl">404</h2>
            <p className="text-7xl mb-4">Page not found</p>
            <NavLink to="/" className="underline text-xl">Go to home <ArrowForwardIcon /> </NavLink>
        </div>
    )
}
