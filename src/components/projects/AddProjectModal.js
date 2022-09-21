import React, { useEffect } from "react";
import { useState } from "react";
import { teamApi } from "../../features/team/teamApi";
import { useDispatch } from "react-redux";
import Error from "../ui/Error";
import { useSelector } from "react-redux";
import { projectApi } from "../../features/project/projectApi";
import Success from "../ui/Success";

export default function AddProjectModal({ open, control }) {
    const [teamName, setTeamName] = useState("");
    const [title, setTitle] = useState("");
    const dispatch = useDispatch();
    const [error, setError] = useState(null);
    const { user } = useSelector(state => state.auth) || {};
    const { email, image } = user || {};
    const [validatedTeam, setValidatedTeam] = useState(null);

    useEffect(() => {
        setTeamName("");
        setTitle("");
        setError(null);
        setValidatedTeam(null);
    },[open]);

    useEffect(() => {
        dispatch(teamApi.endpoints.getTeam.initiate(teamName)).unwrap().then((res) => {
            if (teamName?.length>0 && res.length === 0) {
                setError("Team does not exist!");
                setValidatedTeam(null);
            } else {
                if (!res[0].participants.includes(email)) {
                    setError("You can't add project to a team you are not a member of!");
                    setValidatedTeam(null);
                } else {
                    setError(null);
                    setValidatedTeam(res[0]);
                }
            }
        }).catch((err) => {
            setError(err.data);
            setValidatedTeam(null);
        });
    }, [teamName, email, dispatch]);

    const debounceHandler = (fn, delay) => {
        let timeoutId;
        return (...args) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                fn(...args);
            }, delay);
        };
    };

    const doSearch = (value) => {
        setTeamName(value);
    };

    const handleSearch = debounceHandler(doSearch, 500);

    const handleSubmit = (e) => {
        e.preventDefault();
        //add project to team
        if (validatedTeam) {
            dispatch(projectApi.endpoints.addProject.initiate({
                teamId: validatedTeam.id,
                teamName,
                teamColor: validatedTeam.color,
                title,
                timestamp: new Date().getTime(),
                creatorEmail: email,
                creatorImage: image,
                stage: 'backlog',
                participants: validatedTeam.participants,
            })).unwrap().then(() => {
                setTeamName("");
                setTitle("");
                setError(null);
                control();
            }).catch(err => {
                setError(err.data);
            });
        }
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
                                    onChange={(e) =>
                                        handleSearch(e.target.value)
                                    }
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
                                disabled={validatedTeam ? false : true}
                            >
                                Create project
                            </button>
                        </div>

                        {error && (
                            <Error message={error} />
                        )}

                        {validatedTeam && (
                            <Success message="You can add project to this team!" />
                        )}
                    </form>
                </div>
            </>
        )
    );
}
