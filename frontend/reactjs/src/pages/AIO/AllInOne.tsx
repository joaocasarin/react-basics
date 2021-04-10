import React, { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '../../providers/ThemeContext';
import axios from '../../services/axios';
import './styles.css';
import Modal from 'react-modal';
import { Divider } from '@material-ui/core';

Modal.setAppElement('#root')
function AllInOneProjectPage() {
    const [projects, setProjects] = useState<any[]>([]);
    const { theme } = useContext(ThemeContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [id, setId] = useState('');
    const [title, setTitle] = useState('');
    const [url, setUrl] = useState('');
    const [techs, setTechs] = useState<any[]>([]);
    
    const openModal = (idModal: string, title: string, url: string, techs: any[]) => {
        setId(idModal);
        setTitle(title);
        setUrl(url);
        setTechs(techs);
        setIsModalOpen(true);
    }

    const closeModal = () => {
        setIsModalOpen(false);
    }

    const updateProjects = async () => {
        const res = await axios.get('list');
        res.data.status === 1 && setProjects(res.data.projects);
    };
    
    useEffect(() => {
        updateProjects();
    }, []);

    const onUpdateProject = async () => {
        const newTitle = (document.getElementById(`modal_title_${id}`) as HTMLInputElement)?.value;
        const newUrl = (document.getElementById(`modal_url_${id}`) as HTMLInputElement)?.value;
        const techsArray = (document.getElementById(`modal_techs_${id}`) as HTMLInputElement)?.value;
        const filteredTechs = techsArray.split(',').filter(tech => {
            if(tech !== '')
                if(tech !== ' ')
                    return tech;
        });
        
        await axios.patch(`update/${id}`, { title: newTitle, url: newUrl, techs: filteredTechs });
        setProjects(projects.map(p => id === p.id ? { ...p, title: newTitle, url: newUrl, techs: filteredTechs } : p));
        setIsModalOpen(false);
        console.log(projects.map(p => id === p.id ? { ...p, title: newTitle, url: newUrl, techs: filteredTechs } : p));
    };
    
    return (
        <div style={{
            width: '100vw',
            minHeight: 'calc(100vh - 64px)',
            backgroundColor: theme.bg,
            margin: '0',
            display: 'flex',
            justifyContent: 'space-around',
            flexWrap: 'wrap'
        }}>
            { projects && projects.map((p, i) => <div key={p.id} style={{
                display: 'flex',
                flexDirection: 'column',
                width: '550px',
                height: '300px',
                border: '1px solid blue',
                margin: '50px'
            }}>
                <div style={{ backgroundColor: 'green', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-around' }}>
                    <div style={{display: 'flex', flexDirection: 'column', width: '80%'}}>
                        <h4>Title:</h4>
                        <input type="text" name="title" disabled defaultValue={ p.title }/>
                    </div>
                    <div style={{display: 'flex', flexDirection: 'column', width: '80%'}}>
                        <h4>URL:</h4>
                        <input type="text" name="url" disabled defaultValue={ p.url }/>
                    </div>
                    <div style={{display: 'flex', flexDirection: 'column', width: '80%'}}>
                        <h4>Techs:</h4>
                        <input type="text" name="techs" disabled defaultValue={ p.techs.map((t: any) => t) }/>
                    </div>
                    <a style={{textDecoration: 'underline', color: 'darkblue', cursor: 'pointer' }} onClick={() => openModal(p.id, p.title, p.url, p.techs)}>Alterar</a>
                </div>
            </div>) }

            <Modal isOpen={isModalOpen} style={{
                content: {
                    display: 'flex',
                    flexDirection: 'column',
                    maxWidth: '450px',
                    height: '280px',
                    margin: 'auto',
                    backgroundColor: 'lightgrey'
                },
                overlay: {
                    backgroundColor: 'rgba(0, 0, 0, 0.85)'
                }
            }}>
                <div className="modal-header" style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <h1>Edit { title }</h1>
                    <button onClick={closeModal} style={{ width: '90px', height: '20px', margin: 'auto 0' }}>Close</button>
                </div>
                <Divider />
                <div style={{ width: '80%', margin: '10px auto 0 auto'}}>
                    <h2>Title: </h2>
                    <input type="text" name="title" id={`modal_title_${id}`} defaultValue={ title } style={{ width: '90%' }}/>
                </div>
                <div style={{ width: '80%', margin: '10px auto 0 auto'}}>
                    <h2>URL: </h2>
                    <input type="text" name="title" id={`modal_url_${id}`} defaultValue={ url } style={{ width: '90%' }}/>
                </div>
                <div style={{ width: '80%', margin: '10px auto 0 auto'}}>
                    <h2>Techs: </h2>
                    <input type="text" name="title" id={`modal_techs_${id}`} defaultValue={ techs } style={{ width: '90%' }}/>
                </div>
                <button onClick={ () => onUpdateProject() } style={{ width: '90px', margin: '10px auto 0 auto' }}>Update</button>
            </Modal>
        </div>
    );
}

export default AllInOneProjectPage;