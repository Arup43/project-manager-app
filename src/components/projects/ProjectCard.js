import moment from 'moment'
import React from 'react'
import { useSelector } from 'react-redux';
import { ItemTypes } from '../../utils/ItemTypes';
import { useDrag } from 'react-dnd';
import DeleteModal from './DeleteModal';
import { useState } from 'react';

export default function ProjectCard({ project }) {

    const {user} = useSelector(state => state.auth) || {};
    const {email: loggedInUserEmail} = user || {};

    const [opened, setOpened] = useState(false);

    const controlModal = () => {
        setOpened((prevState) => !prevState);
    };

    const { teamName, teamColor, timestamp, creatorImage, title, id, creatorEmail } = project;
    const search = useSelector(state => state.project.search);
    const found = search?.length > 0 ? title.toLowerCase().includes(search.toLowerCase()) : false;

    const [{ isDragging }, drag] = useDrag({
        type: ItemTypes.CARD,
        item: { project },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    })

    const opacity = isDragging ? 0.4 : 1;

    return (
        <>
            <div ref={drag} style={{ opacity }}
                className={`relative ${found ? "ring ring-indigo-700" : ""}  flex flex-col items-start p-4 mt-3 bg-white rounded-lg cursor-pointer bg-opacity-90 group hover:bg-opacity-100`}
                draggable="true"
            >
                {project.stage === 'backlog' && (
                    <button title='Click to delete the project'
                        className="absolute top-0 right-0 flex items-center justify-center hidden w-5 h-5 mt-3 mr-2 text-gray-500 rounded hover:bg-gray-200 hover:text-gray-700 group-hover:flex"
                    >
                        <svg
                            className="w-4 h-4 fill-current"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            onClick={controlModal}
                        >
                            <path
                                d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"
                            />
                        </svg>
                    </button>
                )}
                <span
                    style={{ color: 'white', backgroundColor: teamColor }}
                    className="flex items-center h-6 px-3 text-xs font-semibold text-pink-500 bg-pink-100 rounded-full"
                >{teamName}</span>
                <h4 className="mt-3 text-sm font-medium">
                    {title}
                </h4>
                <div
                    className="flex items-center w-full mt-3 text-xs font-medium text-gray-400"
                >
                    <div className="flex items-center">
                        <svg
                            className="w-4 h-4 text-gray-300 fill-current"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                clipRule="evenodd"
                            />
                        </svg>
                        <span className="ml-1 leading-none">{moment(timestamp).format('MMMM DD, YYYY')}</span>
                    </div>

                    <img
                        className="w-6 h-6 ml-auto rounded-full"
                        src={creatorImage}
                        alt=''
                    />
                </div>
            </div>
            <DeleteModal open={opened} control={controlModal} projectId={id} ok={loggedInUserEmail === creatorEmail} />
        </>
    )
}
