import React from 'react'
import AddTeam from '../components/teams/AddTeam'
import HeaderForTeams from '../components/teams/HeaderForTeams'
import TeamList from '../components/teams/TeamList'
import Footer from '../components/ui/Footer'

export default function Teams() {
    return (
        <div
            className="flex flex-col w-screen h-screen overflow-auto text-gray-700 bg-gradient-to-tr from-blue-200 via-indigo-200 to-pink-200"
        >
            <HeaderForTeams />
            <AddTeam />
            <TeamList />
            <Footer />
        </div>
    )
}
