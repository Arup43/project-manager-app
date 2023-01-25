import React from 'react'
import Navigation from '../ui/Navigation'
import { useDispatch } from 'react-redux';
import { setSearch } from '../../features/project/projectSlice';
import debounce from 'lodash.debounce';
import { useCallback } from 'react';

export default function HeaderForProjects() {

    const [searchKey, setSearchKey] = React.useState("");
    const dispatch = useDispatch();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const optimizedSearchHandler = useCallback(
        debounce(nextValue => {
            dispatch(setSearch(nextValue))
        }, 500),
        []
    );

    const handleChange = (e) => {
        setSearchKey(e.target.value);
        optimizedSearchHandler(e.target.value);
    }

    return (
        <div
            className="flex items-center flex-shrink-0 w-full h-16 px-10 bg-white bg-opacity-75"
        >
            <h1 className='text-3xl font-bold text-indigo-600'><i class="fa-solid fa-diagram-project"></i> Project Management</h1>
            <input
                className="flex items-center h-10 px-4 ml-10 text-sm bg-gray-200 rounded-full focus:outline-none focus:ring"
                type="search"
                placeholder="Search for projects..."
                value={searchKey}
                onChange={handleChange}
            />
            <Navigation />
        </div>
    )
}
