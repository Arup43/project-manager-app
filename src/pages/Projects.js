import React from 'react'
import HeaderForProjects from '../components/projects/HeaderForProjects'
import ProjectBoard from '../components/projects/ProjectBoard'
import Footer from '../components/ui/Footer'

export default function Projects() {
    return (
        <div
            className="flex flex-col w-screen h-screen overflow-auto text-gray-700 bg-gradient-to-tr from-blue-200 via-indigo-200 to-pink-200"
        >
            <HeaderForProjects />
            <ProjectBoard />
            <Footer />
        </div>
    )
}
