import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import "./App.css";
import api from './services/api';

export default function App() {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        api.get('/projects/list').then(res => {
            setProjects(res.data.projects)
        });
    }, []);

    async function handleAddProject() {
        const res = await api.post('/projects/create', {
            title: Date.now(),
            owner: Date.now()
        });

        const { title, owner } = res.data.project;
        const project = { title: title, owner: owner };
        console.log(res.data);
        setProjects([ ...projects, project ]);
    }

    return (
        <>
            <Header title="React-basics"/>

            <button type="button" onClick={ handleAddProject }>Add project</button>
            <ul>
                { projects.map(project => <li key={ project.title }>{ project.title }</li>) }
            </ul>
        </>
    );
}