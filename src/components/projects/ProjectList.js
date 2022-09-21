import React from 'react'
import ProjectCard from './ProjectCard'
import { useDrop } from 'react-dnd'
import { ItemTypes } from '../../utils/ItemTypes';
import { useDispatch } from 'react-redux';
import { projectApi } from '../../features/project/projectApi';

export default function ProjectList({ projects, stage }) {

  const dispatch = useDispatch();

  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.CARD,
    drop: (item) => {
      if (item.project.stage !== stage) {
        dispatch(projectApi.endpoints.updateStage.initiate({
          projectId: item.project.id,
          stage: stage.toLowerCase(),
        }))
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  })

  const style = {
    backgroundColor: isOver && '#00b0ff',
    height: '100vh',
  }

  return (
    <div ref={drop} style={style} className="flex flex-col pb-2 overflow-auto">
      {projects?.map((project) => (<ProjectCard key={project.id} project={project} />))}
    </div>
  )
}
