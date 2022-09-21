import Stage from './Stage';
import { useSelector } from 'react-redux'
import { useGetProjectsQuery } from '../../features/project/projectApi'
import Error from '../ui/Error'


export default function ProjectBoard() {
    
    const {user} = useSelector((state) => state.auth);
    const {email} = user || {};

    const {data: projects, isLoading, isError} = useGetProjectsQuery(email);

    let projectsInBacklog = [];
    let projectsInReady = [];
    let projectsInDoing = [];
    let projectsInReview = [];
    let projectsInBlocked = [];
    let projectsInDone = [];

    projects?.forEach(project => {
        if(project.stage==='backlog'){
            projectsInBacklog.push(project);
        } else if(project.stage==='ready'){
            projectsInReady.push(project);
        } else if(project.stage==='doing'){
            projectsInDoing.push(project);
        } else if(project.stage==='review'){ 
            projectsInReview.push(project);
        } else if(project.stage==='blocked'){
            projectsInBlocked.push(project);
        } else if(project.stage==='done'){
            projectsInDone.push(project);
        }
    })

    return (
        <>
            <div className="px-10 mt-6">
                <h1 className="text-2xl font-bold">Project Board</h1>
            </div>
            <div className="flex flex-grow px-10 mt-4 space-x-6 overflow-auto">
                <Stage stage="Backlog" projects={projectsInBacklog}/>
                <Stage stage="Ready" projects={projectsInReady} />
                <Stage stage="Doing" projects={projectsInDoing} />
                <Stage stage="Review" projects={projectsInReview} />
                <Stage stage="Blocked" projects={projectsInBlocked} />
                <Stage stage="Done" projects={projectsInDone} />
            </div>
            {isLoading && <div><h2>Loading...</h2></div>}
            {isError && <Error message="There was a problem" />}
        </>
    )
}
