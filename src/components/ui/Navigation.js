import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { userLoggedOut } from '../../features/auth/authSlice';
import { useMatch } from 'react-router-dom';

export default function Navigation() {
    const user = useSelector(state => state.auth.user);
    const dispatch = useDispatch();
    const teamsPage = useMatch('/teams');
    const projectsPage = useMatch('/projects');

    const logout = () => {
        dispatch(userLoggedOut());
        localStorage.clear();
    }

    return (
        <>
            <div className="ml-10">
                <Link
                    to="/projects"
                    className={`mx-2 text-sm font-semibold ${projectsPage? 'text-indigo-700' : 'text-gray-500'} hover:text-indigo-700`}
                >Projects</Link>
                <Link
                    to="/teams"
                    className={`mx-2 text-sm font-semibold ${teamsPage? 'text-indigo-700' : 'text-gray-500'} hover:text-indigo-700`}
                >Teams</Link>
            </div>
            <button
                className="flex items-center justify-center w-8 h-8 ml-auto overflow-hidden rounded-full cursor-pointer"
            >
                <img
                    src={user.image}
                    alt=""
                    title={`Logged in as ${user.name}`}
                />
            </button>
            <ul className="ml-20">
                <li className="text-black">
                    <span className="cursor-pointer" onClick={logout}>
                        Logout
                    </span>
                </li>
            </ul>
        </>
    )
}
