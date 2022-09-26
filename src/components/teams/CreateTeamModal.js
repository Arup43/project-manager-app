import React, { useEffect, useState } from 'react'
import { useAddTeamMutation } from '../../features/team/teamApi';
import { useSelector } from 'react-redux';
import Error from '../ui/Error';

export default function CreateTeamModal({ open, control }) {

    const { user } = useSelector(state => state.auth) || {};
    const { email } = user || {};


    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [color, setColor] = useState('#000000');

    const [addTeam, { isSuccess, isLoading, isError }] = useAddTeamMutation();

    const handleSubmit = (e) => {
        e.preventDefault();
        addTeam({
            data: {
                name,
                description,
                color,
                participants: email,
                timestamp: new Date().getTime(),
            },
            email: email
        });
    }

    useEffect(() => {
        if (isSuccess) {
            setName('');
            setDescription('');
            setColor('#000000');
            control();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSuccess]);

    return (
        open && (
            <>
                <div
                    onClick={control}
                    className="fixed w-full h-full inset-0 z-10 bg-black/50 cursor-pointer"
                ></div>
                <div className="rounded w-[400px] lg:w-[600px] space-y-8 bg-white p-10 absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Create New Team
                    </h2>
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div>
                                <label htmlFor="name" className="sr-only">
                                    Name
                                </label>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                                    placeholder="Team name"
                                    onChange={(e) =>
                                        setName(e.target.value)
                                    }
                                    value={name}
                                />
                            </div>


                            <div>
                                <label htmlFor="description" className="sr-only">
                                    Description
                                </label>
                                <textarea
                                    id="description"
                                    name="description"
                                    type="text"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                                    placeholder="Description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="color">Select a team color </label>
                            <input type="color" id="head" required name="color" value={color} onChange={e => setColor(e.target.value)}></input>
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
                            >
                                Create Team
                            </button>
                        </div>

                        {isError && (<Error message="There was an error"></Error>)}
                    </form>
                </div>
            </>
        )
    )
}
