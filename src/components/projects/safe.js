import React from "react";
import { useState } from "react";
import { teamApi } from "../../features/team/teamApi";
import { useDispatch } from "react-redux";
import Error from "../ui/Error";
import { useSelector } from "react-redux";
import { projectApi } from "../../features/project/projectApi";

export default function AddProjectModal({ open, control }) {
    const [teamName, setTeamName] = useState("");
    const [title, setTitle] = useState("");
    const dispatch = useDispatch();
    const [error, setError] = useState(null);
    const { user } = useSelector(state => state.auth) || {};
    const { email, image } = user || {};

    const handleSubmit = (e) => {
        e.preventDefault();
        //add project to team
        dispatch(teamApi.endpoints.getTeam.initiate(teamName))
            .unwrap()
            .then((res) => {
                if (res.length === 0) {
                    setError("Team does not exist!");
                } else {
                    if (!res[0].participants.includes(email)) {
                        setError("You can't add project to a team you are not a member of!");
                    } else {
                        dispatch(projectApi.endpoints.addProject.initiate({
                            teamId: res[0].id,
                            teamName,
                            teamColor: res[0].color,
                            title,
                            timestamp: new Date().getTime(),
                            creatorEmail: email,
                            creatorImage: image,
                            stage: 'backlog',
                            participants: res[0].participants,
                        })).unwrap()
                            .then(() => {
                                setTeamName("");
                                setTitle("");
                                setError(null);
                                control();
                            })
                            .catch(err => {
                                setError(err.data);
                            });
                    }
                }
            })
            .catch((err) => {
                setError(err.data);
            });

    }
    return (
        open && (
            <>
                <div
                    onClick={control}
                    className="fixed w-full h-full inset-0 z-10 bg-black/50 cursor-pointer"
                ></div>
                <div className="rounded w-[400px] lg:w-[600px] space-y-8 bg-white p-10 absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Create a new project
                    </h2>
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div>
                                <label htmlFor="to" className="sr-only">
                                    Team Name
                                </label>
                                <input
                                    id="teamName"
                                    name="teamName"
                                    type="text"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                                    placeholder="Team Name"
                                    value={teamName}
                                    onChange={(e) => setTeamName(e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="title" className="sr-only">
                                    Project Title
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    type="text"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                                    placeholder="Project Title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"

                            >
                                Create project
                            </button>
                        </div>

                        {error && (
                            <Error message={error} />
                        )}

                    </form>
                </div>
            </>
        )
    );
}
