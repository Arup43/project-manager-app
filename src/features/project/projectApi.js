import { apiSlice } from "../api/apiSlice";

export const projectApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProjects: builder.query({
            query: (email) => `/projects?participants_like=${email}&_sort=timestamp&_order=desc`,
            providesTags: ["Projects"],
        }),
        getProjectsByTeamId: builder.query({
            query: (teamId) => `/projects?teamId=${teamId}&_sort=timestamp&_order=desc`,
        }),
        addProject: builder.mutation({
            query: (data) => ({
                url: "/projects",
                method: "POST",
                body: data,
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                const addedProject = await queryFulfilled;
                dispatch(
                    apiSlice.util.updateQueryData(
                        "getProjects",
                        arg.creatorEmail,
                        draft => {
                            draft.unshift(addedProject.data);
                        }
                    )
                )
            },
        }),
        updateParticipants: builder.mutation({
            query: ({projectId, participants}) => ({
                url: `/projects/${projectId}`,
                method: "PATCH",
                body: {
                    participants: participants,
                }
            }),
            invalidatesTags: ["Projects"],
        }),
        updateStage: builder.mutation({
            query: ({projectId, stage}) => ({
                url: `/projects/${projectId}`,
                method: "PATCH",
                body: {
                    stage: stage,
                },
            }),
            invalidatesTags: ["Projects"],
        }),
        deleteProject: builder.mutation({
            query: (projectId) => ({
                url: `/projects/${projectId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Projects"],
        }),
    }),
});

export const { useGetProjectsQuery, useAddProjectMutation, useGetProjectsByTeamIdQuery, useUpdateParticipantsMutation, useUpdateStageMutation, useDeleteProjectMutation } = projectApi;