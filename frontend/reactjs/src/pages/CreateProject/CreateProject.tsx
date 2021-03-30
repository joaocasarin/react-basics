import React, { useContext, useState } from 'react';
import { ThemeContext } from '../../providers/ThemeContext';
import axios from '../../services/axios';
import { TextField, Button, Modal, Backdrop, Fade } from "@material-ui/core";
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }),
);

function CreateProject() {
    const classes = useStyles();
    const { theme } = useContext(ThemeContext);
    const [title, setTitle] = useState('');
    const [url, setUrl] = useState('');
    const [techs, setTechs] = useState('');
    const [open, setOpen] = React.useState(false);
    const [message, setMessage] = useState('');

    const handleOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = async () => {
        
        if ( title === '' || url === '' || techs === '') {
            window.alert('Please review your inputs, some of them seem to be empty.');
        }
        else {
            const req = {
                title: title,
                url: url,
                techs: techs.split(';').filter(i => i)
            };
            
            const res = await axios.post('create', req);
            /* 'Project created successfully.' */
            res.data.status === 1 ? setMessage('Project registrated successfully!') : (res.data.status === 0 ? setMessage(res.data.message) : setMessage(`An error occured: ${res.data.error}`));
            handleOpen();
            
        }
        
        setTitle('');
        setUrl('');
        setTechs('');
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
            <form onSubmit={(e) => {
                    e.preventDefault(); 
                    handleSubmit();
                }} 
                style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-around',
                alignItems: 'center',
                background: 'linear-gradient(#3f51b5, #fff)',
                height: '400px',
                width: '600px',
                boxShadow: '1px 1px 10px black',
                margin: '50px',
                borderRadius: '10px'
            }}>
                <h1 style={{ margin: '0' }}>Register your Project</h1>
                <TextField value={title} name="title" id="title" style={{
                    width: '80%'
                }} onChange={e => setTitle(e.target.value)} label="Title (eg. E-commerce study)"/>

                <TextField value={url} name="url" id="url" style={{
                    width: '80%'
                }}  onChange={e => setUrl(e.target.value)} label="Url (eg. https://github.com/joaocasarin/jwt-study)"/>

                <TextField value={techs} name="techs" id="techs" style={{
                    width: '80%'
                }}  onChange={e => setTechs(e.target.value)} label="Techs (eg. Angular; ReactJS; ExpressJS; NodeJS; Python)"/>

                <Button type="submit" color="primary" variant="contained" style={{
                    width: '80%'
                }} >Submit</Button>
            </form>

            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div className={classes.paper}>
                        <h2 id="transition-modal-title">Registration Message</h2>
                        <p id="transition-modal-description">{ message }</p>
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}

export default CreateProject;