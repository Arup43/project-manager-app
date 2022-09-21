import React from 'react'
import Navigation from '../ui/Navigation'
import logoImage from '../../assets/images/logo.svg'

export default function HeaderForTeams() {
    return (
        <div
            className="flex items-center flex-shrink-0 w-full h-16 px-10 bg-white bg-opacity-75"
        >
            <img src={logoImage} alt="learn with sumit" className="h-10 w-10" />
            <Navigation />
        </div>
    )
}
