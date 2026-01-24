import {useParams} from 'react-router-dom';

const ProjectDetail =()=>{

  const {id} = useParams();
  return(
    <div>
    <h1>Project Detail: </h1>
    <p>Project Id : {id}</p>
    <p>Task view coming soon!</p>
    </div>
  );
}

export default ProjectDetail;