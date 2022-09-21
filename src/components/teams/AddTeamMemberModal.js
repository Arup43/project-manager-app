import React, { useEffect, useState } from 'react'
import { teamApi } from '../../features/team/teamApi';
import { useDispatch } from 'react-redux';
import isValidEmail from '../../utils/isValidEmail';
import { useGetUserQuery } from '../../features/users/usersApi';
import Error from '../ui/Error';
import { useSelector } from 'react-redux';
import Success from '../ui/Success';

export default function AddTeamMemberModal({ open, control, teamId, participants: teamParticipants }) {


    const [email, setEmail] = useState('');
    const [userCheck, setUserCheck] = useState(false);
    const { user: loggedInUser } = useSelector(state => state.auth) || {};
    const { email: myEmail } = loggedInUser || {};
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const dispatch = useDispatch();
    const [participants, setParticipants] = useState(teamParticipants);

    const { data: participant } = useGetUserQuery(email, {
        skip: !userCheck,
    });

    useEffect(() => {
        setEmail('');
        setError(null);
        setSuccess(null);
    }, [open])

    useEffect(() => {
        if (participant?.length === 0) {
            setError('User does not exist!');
            setSuccess(null);
        }
        else if (participant?.length > 0 && participant[0].email === myEmail) {
            setError("You are already a member of this team!");
            setSuccess(null);
        } else if (participant?.length > 0 && participant[0].email !== myEmail) {
            //check if participant is not already in team
            if (participants?.includes(participant[0].email)) {
                setError('This user is already in the team');
                setSuccess(null);
            } else {
                setSuccess('You can add this user to the team');
                setError(null);
            }
        }
    }, [participant, myEmail, dispatch, participants, teamId]);

    const handleSubmit = (e) => {
        e.preventDefault();
        //add participant to team
        dispatch(teamApi.endpoints.addTeamMember.initiate({
            teamId,
            participants,
            newParticipant: participant[0].email,
        })).unwrap().then(() => {
            setEmail('');
            setError(null);
            setSuccess(null);
            setParticipants(participants + "-" + participant[0].email);
            control();
        }).catch(err => {
            setError("Something went wrong!");
            setSuccess(null);
        });
    }

    const debounceHandler = (fn, delay) => {
        let timeoutId;
        return (...args) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                fn(...args);
            }, delay);
        }
    }

    const doSearch = (value) => {
        if (isValidEmail(value)) {
            setEmail(value);
            setUserCheck(true);
        } else {
            setError('Please enter a valid email');
            setSuccess(null);
        }
    }

    const handleSearch = debounceHandler(doSearch, 500);

    return (
        open && (
            <>
                <div
                    onClick={control}
                    className="fixed w-full h-full inset-0 z-10 bg-black/50 cursor-pointer"
                ></div>
                <div className="rounded w-[400px] lg:w-[600px] space-y-8 bg-white p-10 absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Add a new team member
                    </h2>
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div>
                                <label htmlFor="email" className="sr-only">
                                    Email
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                                    placeholder="Enter email"
                                    onChange={(e) =>
                                        handleSearch(e.target.value)
                                    }
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={!success}
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
                            >
                                Add member
                            </button>
                        </div>

                        {error && <Error message={error} />}
                        {success && <Success message={success} />}
                    </form>
                </div>
            </>
        )
    )
}
