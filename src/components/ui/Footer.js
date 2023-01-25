import React from 'react'

export default function Footer() {
    return (
        <h1
            className="fixed bottom-0 right-0 flex items-center justify-center h-8 pl-1 pr-2 mb-6 mr-4 text-blue-100 bg-indigo-600 rounded-full shadow-lg hover:bg-blue-600"
            target="_top"
        >
            <div
                className="flex items-center justify-center w-6 h-6 bg-blue-500 rounded-full"
            >
                <h1 className='text-3xl font-bold text-indigo-600'><i class="fa-solid fa-diagram-project"></i> Project Management</h1>
            </div>
            <span className="ml-1 text-sm leading-none">Learn with Sumit</span>
        </h1>
    )
}
