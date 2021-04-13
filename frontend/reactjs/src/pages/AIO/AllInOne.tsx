import React, { useContext, useEffect, useState, CSSProperties } from "react";
import { ThemeContext } from "../../providers/ThemeContext";
import axios from "../../services/axios";
import Modal from "react-modal";
import { Divider } from "@material-ui/core";

Modal.setAppElement("#root");
function AllInOneProjectPage() {
  const { theme } = useContext(ThemeContext);

  const wrapperStyles: CSSProperties = {
    width: "100vw",
    minHeight: "calc(100vh - 64px)",
    backgroundColor: theme.bg,
    margin: "0",
    display: "flex",
    justifyContent: "space-around",
    flexWrap: "wrap"
  };
  const outerDivProjectStyles: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    width: "550px",
    height: "300px",
    border: "1px solid blue",
    margin: "50px",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "green",
  };
  const projectFieldsStyles: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    width: "80%"
  };
  const changeButtonStyles: CSSProperties = {
    textDecoration: "underline",
    color: "darkblue",
    cursor: "pointer"
  };
  const modalStyles = {
    content: {
      display: "flex",
      flexDirection: "column",
      maxWidth: "450px",
      height: "280px",
      margin: "auto",
      backgroundColor: "lightgrey"
    } as CSSProperties,
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.85)"
    } as CSSProperties
  };
  const modalHeaderStyles: CSSProperties = {
    display: "flex",
    justifyContent: "space-between"
  };
  const closeModalButtonStyles: CSSProperties = {
    width: "90px",
    height: "20px",
    margin: "auto 0"
  };
  const modalProjectFieldsStyles: CSSProperties = {
    width: "80%",
    margin: "10px auto 0 auto"
  };
  const modalUpdateButtonStyles: CSSProperties = {
    width: "90px",
    margin: "10px auto 0 auto"
  };

  const [projects, setProjects] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [techs, setTechs] = useState<any[]>([]);

  const openModal = (idModal: string, title: string, url: string, techs: any[]) => {
    setId(idModal);
    setTitle(title);
    setUrl(url);
    setTechs(techs);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const updateProjects = async () => {
    const res = await axios.get("list");
    res.data.status === 1 && setProjects(res.data.projects);
  };

  useEffect(() => {
    updateProjects();
  }, []);

  const onUpdateProject = async () => {
    await axios.patch(`update/${id}`, {
      title,
      url,
      techs
    });
    setProjects(projects.map((p) => id === p.id ? { ...p, title, url, techs } : p));
    setIsModalOpen(false);
    
    console.log(projects.map((p) => id === p.id ? { ...p, title, url, techs } : p));
  };

  return (
    <div style={wrapperStyles}>
      {projects &&
        projects.map((p, i) => (
          <div key={p.id} style={outerDivProjectStyles}>

            <div style={projectFieldsStyles} >
              <h4>Title:</h4>
              <input type="text" name="title" disabled value={p.title} />
            </div>

            <div style={projectFieldsStyles}>
              <h4>URL:</h4>
              <input type="text" name="url" disabled value={p.url} />
            </div>

            <div style={projectFieldsStyles}>
              <h4>Techs:</h4>
              <input type="text" name="techs" disabled value={p.techs.map((t: any) => t)} />
            </div>
            
            <p style={changeButtonStyles} onClick={() => openModal(p.id, p.title, p.url, p.techs)}>Alterar</p>
          </div>
        ))}

      <Modal isOpen={isModalOpen} style={modalStyles}>
        <div className="modal-header" style={modalHeaderStyles}>

          <h1>Edit {title}</h1>

          <button onClick={closeModal} style={closeModalButtonStyles}>
            Close
          </button>
        </div>

        <Divider />

        <div style={modalProjectFieldsStyles}>

          <h2>Title: </h2>

          <input
            type="text"
            name="title"
            id={`modal_title_${id}`}
            defaultValue={title}
            style={{ width: "90%" }}
            onChange={ event => setTitle(event.target.value) }
          />
        </div>

        <div style={modalProjectFieldsStyles}>

          <h2>URL: </h2>

          <input
            type="text"
            name="url"
            id={`modal_url_${id}`}
            defaultValue={url}
            style={{ width: "90%" }}
            onChange={ event => setUrl(event.target.value) }
          />
        </div>

        <div style={{ width: "80%", margin: "10px auto 0 auto" }}>

          <h2>Techs: </h2>

          <input
            type="text"
            name="techs"
            id={`modal_techs_${id}`}
            defaultValue={techs}
            style={{ width: "90%" }}
            onChange={ event => setTechs(event.target.value.split(",").filter((tech) => {
              if (tech !== "") if (tech !== " ") return tech;
            }))}/>
        </div>
        
        <button onClick={() => onUpdateProject()} style={modalUpdateButtonStyles}>
          Update
        </button>
      </Modal>
    </div>
  );
}

export default AllInOneProjectPage;
