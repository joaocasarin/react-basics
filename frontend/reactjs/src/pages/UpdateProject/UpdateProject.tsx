import React, { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '../../providers/ThemeContext';
import { Button } from '@material-ui/core';
import axios from '../../services/axios';

function UpdateProject() {
    const [projects, setProjects] = useState<any[]>([]);
    /* const [title, setTitle] = useState();
    const [url, setUrl] = useState();
    const [techs, setTechs] = useState(); */
    const { theme } = useContext(ThemeContext);

    const updateProjects = async () => {
        const res = await axios.get('list');
        res.data.status === 1 && setProjects(res.data.projects);
    };
    
    useEffect(() => {
        updateProjects();
    }, []);

    const onUpdateProject = async (id: string, title: string, url: string, techs: string) => {
        const newTitle = (document.getElementById(`${id}_${title}`) as HTMLInputElement)?.value;
        const newUrl = (document.getElementById(`${id}_${url}`) as HTMLInputElement)?.value;
        const techsArray = (document.getElementById(`${id}_${techs}`) as HTMLInputElement)?.value;
        const filteredTechs = techsArray.split(',').filter(tech => {
            if(tech !== '')
                if(tech !== ' ')
                    return tech;
        });
        
        await axios.patch(`update/${id}`, { title: newTitle, url: newUrl, techs: filteredTechs });
        setProjects(projects.map(p => id === p.id ? { ...p, title: newTitle, url: newUrl, techs: filteredTechs } : p));
        console.log(projects.map(p => id === p.id ? { ...p, title: newTitle, url: newUrl, techs: filteredTechs } : p));
        
    };
    
    return (
        <div style={{ 
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            minHeight: 'calc(100vh - 64px)', 
            minWidth: '100vw', 
            backgroundColor: theme.bg, 
            color: theme.color
        }}>
            { projects && projects.map((p, i) => <div key={p.id} style={{
                display: 'flex',
                flexDirection: 'column',
                width: '700px',
                height: '400px',
                border: '1px solid blue',
                marginBottom: '10px'
            }}>
                <h3>Title:</h3>
                <input type="text" name="title" id={ `${p.id}_${p.title}` } defaultValue={ p.title }/>

                <h3>URL:</h3>
                <input type="text" name="url" id={ `${p.id}_${p.url}` } defaultValue={ p.url }/>

                {/* <h3>Techs: { p.techs.map((t: any, i: any) =>  i+1 < p.techs.length ? `${t}, ` : t) }</h3> */}
                <h3>Techs: </h3>
                <input type="text" name="techs" id={ `${p.id}_${p.techs}` } defaultValue={ p.techs }/>

                <h3>Likes: { p.likes }</h3>
                
                <Button color="primary" variant="contained" onClick={() => onUpdateProject(p.id, p.title, p.url, p.techs) }>Update</Button>
            </div>) }
        </div>
    );
}

export default UpdateProject;