import Error from "../ui/Error";
import { useDeleteProjectMutation } from "../../features/project/projectApi";

export default function DeleteModal({ open, control, projectId, ok }) {

    const [deleteProject, {isError}] = useDeleteProjectMutation();

    const handleDelete = () => {
        deleteProject(projectId);
        control();
    }

    return (
        open && (
            <>
                <div
                    onClick={control}
                    className="fixed w-full h-full inset-0 z-10 bg-black/50 cursor-pointer"
                ></div>
                <div className="rounded w-[400px] lg:w-[600px] space-y-8 bg-white p-10 absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
                    {ok ? (<>
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                            Are you sure you want to delete this project?
                        </h2>
                        <button
                            onClick={handleDelete}
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        >
                            Yes
                        </button>
                        <button
                            onClick={() => control()}
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
                        >
                            No
                        </button>
                        {isError && (
                            <Error message="Something went wrong" />
                        )}
                    </>
                    ) : (
                        <Error message="Sorry! You can't delete this project as you are not the creator of this project." />
                    )}
                </div>
            </>
        )
    );
}
