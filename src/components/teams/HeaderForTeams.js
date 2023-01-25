import React from 'react'
import Navigation from '../ui/Navigation'

export default function HeaderForTeams() {
    return (
        <div
            className="flex items-center flex-shrink-0 w-full h-16 px-10 bg-white bg-opacity-75"
        >
            <h1 className='text-2xl font-bold text-indigo-600'><i class="fa-solid fa-diagram-project"></i> Project Management</h1>
            <Navigation />
        </div>
    )
}
