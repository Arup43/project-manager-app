import React from 'react'
import { useSelector } from 'react-redux';
import { useGetTeamsQuery } from '../../features/team/teamApi'
import Error from '../ui/Error';
import TeamCard from './TeamCard'

export default function TeamList() {

    const {user} = useSelector(state => state.auth) || {};
    const {email} = user || {}; 

    const {data: teams, isLoading, isError, error } = useGetTeamsQuery(email);

    //decide what to render
    let content = null;

    if(isLoading) {
        content = <div className="text-center">Loading...</div>
    } else if(!isLoading && isError) {
        content = <div className="text-center"><Error message={error?.data} /></div>
    } else if(!isLoading && !isError && teams?.length === 0) {
        content = <div className="text-center">No teams found</div>
    } else if(!isLoading && !isError && teams?.length > 0) {
        content = teams.map(team => <TeamCard key={team.id} team={team} />)
    }

    return (
        <div
            className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 px-10 mt-4 gap-6 overflow-auto"
        >
            {content}
        </div>
    )
}
