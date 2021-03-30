import React, { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '../../providers/ThemeContext';
import { Button } from '@material-ui/core';
import axios from '../../services/axios';

function ListProjects() {
    const [projects, setProjects] = useState<any[]>([]);
    const { theme } = useContext(ThemeContext);

    const updateProjects = async () => {
        const res = await axios.get('list');
        res.data.status === 1 && setProjects(res.data.projects);
    };
    
    useEffect(() => {
        updateProjects();
    }, []);

    const onLikeProject = async (id: string) => {
        await axios.post(`${id}/like`);
        updateProjects();
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
                width: '550px',
                height: '300px',
                border: '1px solid blue',
                marginBottom: '10px'
            }}>
                <h3>Title: { p.title }</h3>
                <h3>URL: { p.url }</h3>
                <h3>Techs: { p.techs.map((t: any, i: any) =>  i+1 < p.techs.length ? `${t}, ` : t) }</h3>
                <h3>Likes: { p.likes }</h3>
                <Button color="primary" variant="contained" onClick={() => onLikeProject(p.id) }>Like</Button>
            </div>) }
        </div>
    );
}

export default ListProjects;