import { apiSlice } from "../api/apiSlice";
import { projectApi } from "../project/projectApi";

export const teamApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getTeams: builder.query({
            query: (email) => `/teams?participants_like=${email}&_sort=timestamp&_order=desc`,
            providesTags: ["Teams"],
        }),
        getTeam: builder.query({
            query: (name) => `/teams?name=${name}`,
        }),
        addTeam: builder.mutation({
            query: ({data, email}) => ({
                url: "/teams",
                method: "POST",
                body: data,
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                console.log(arg);
                const addedTeam = await queryFulfilled;
                dispatch(
                    apiSlice.util.updateQueryData(
                        "getTeams",
                        arg.email,
                        draft => {
                            draft.unshift(addedTeam.data);
                        }
                    )
                )
            },
        }),
        addTeamMember: builder.mutation({
            query: ({ teamId, participants, newParticipant }) => ({
                url: `/teams/${teamId}`,
                method: "PATCH",
                body: {
                    participants: participants + "-" + newParticipant,
                }
            }),
            invalidatesTags: ["Teams"],
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                const updatedTeam = await queryFulfilled;
                if (updatedTeam?.data?.id) {
                    dispatch(
                        projectApi.endpoints.getProjectsByTeamId.initiate(updatedTeam.data.id)
                    ).unwrap().then((projects) => {
                        projects.forEach(project => {
                            dispatch(
                                projectApi.endpoints.updateParticipants.initiate({
                                    projectId: project.id,
                                    participants: project.participants + "-" + arg.newParticipant,
                                })
                            )
                        })
                    }).catch((err) => {
                        console.log(err);
                    });
                }
            }
        }),
    }),
});

export const { useGetTeamsQuery, useAddTeamMutation, useGetTeamQuery, useAddTeamMemberMutation } = teamApi;