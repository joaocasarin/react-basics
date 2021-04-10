import React, { useContext } from 'react';

import { 
    createStyles, 
    Divider, 
    List, 
    ListItem, 
    ListItemIcon, 
    ListItemText, 
    makeStyles, 
    Theme, 
    Drawer, 
    Typography} from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import { Link } from 'react-router-dom';
import { DrawerContext } from '../../providers/DrawerContext';
import { ThemeContext } from '../../providers/ThemeContext';

function Sidebar() {
    const { state, toggleDrawer} = useContext(DrawerContext);
    const { theme } = useContext(ThemeContext);

    const useStyles = makeStyles((th: Theme) =>
        createStyles({
            icon: {
                color: theme.color
            },
            list: {
                width: 250,
            },
            link: {
                textDecoration: 'none',
                color: theme.color
            },
            title: {
                flexGrow: 1,
                height: '64px'
            },
            drawerBg: {
                backgroundColor: theme.bg
            },
            drawerHeader: {
                textAlign: 'center', 
                lineHeight: '64px', 
                verticalAlign: 'middle', 
                backgroundColor: theme.header, 
                color: '#fff'
            }
        }),
    );

    const classes = useStyles();
    
    return (
        <Drawer open={state} onClose={() => toggleDrawer(false)} classes={{ paper: classes.drawerBg }}>
            <div className={classes.list} role="presentation" onClick={() => toggleDrawer(false)}>
                <Typography variant="h6" className={`${classes.title} ${classes.drawerHeader}`}>
                    ReactJS
                </Typography>
                <Divider />
                <List>
                    <Link to="/" className={classes.link}>
                        <ListItem button>
                            <ListItemIcon>
                                <HomeIcon className={classes.icon} />
                            </ListItemIcon>
                            <ListItemText>
                                Home
                            </ListItemText>
                        </ListItem>
                    </Link>
                    <Link to="/createProject" className={classes.link}>
                        <ListItem button>
                            <ListItemIcon>
                                <HomeIcon className={classes.icon} />
                            </ListItemIcon>
                            <ListItemText>
                                Create Project
                            </ListItemText>
                        </ListItem>
                    </Link>
                    <Link to="/aioProject" className={classes.link}>
                        <ListItem button>
                            <ListItemIcon>
                                <HomeIcon className={classes.icon} />
                            </ListItemIcon>
                            <ListItemText>
                                AIO Project
                            </ListItemText>
                        </ListItem>
                    </Link>
                    <Link to="/listProjects" className={classes.link}>
                        <ListItem button>
                            <ListItemIcon>
                                <HomeIcon className={classes.icon} />
                            </ListItemIcon>
                            <ListItemText>
                                List Projects
                            </ListItemText>
                        </ListItem>
                    </Link>
                    <Link to="/updateProject" className={classes.link}>
                        <ListItem button>
                            <ListItemIcon>
                                <HomeIcon className={classes.icon} />
                            </ListItemIcon>
                            <ListItemText>
                                Update Project
                            </ListItemText>
                        </ListItem>
                    </Link>
                    <Link to="/deleteProject" className={classes.link}>
                        <ListItem button>
                            <ListItemIcon>
                                <HomeIcon className={classes.icon} />
                            </ListItemIcon>
                            <ListItemText>
                                Delete Project
                            </ListItemText>
                        </ListItem>
                    </Link>
                </List>
            </div>
        </Drawer>
    );
}

export default Sidebar;