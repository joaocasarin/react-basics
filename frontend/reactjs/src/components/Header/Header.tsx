import React, { useContext } from 'react';

import {
    AppBar, 
    Toolbar, 
    Typography,
    IconButton,
    Switch 
} from '@material-ui/core';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import { DrawerContext } from '../../providers/DrawerContext';
import Sidebar from '../Drawer/Drawer';
import { ThemeContext } from '../../providers/ThemeContext';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
        },
        fullList: {
            width: 'auto',
        }
    }),
);

function Header() {
    const classes = useStyles();
    const { toggleDrawer } = useContext(DrawerContext);
    const { theme, changeTheme } = useContext(ThemeContext);

    const handleChange = () => {
        changeTheme();
    };
    
    return (
        <div className={classes.root}>
            <AppBar position="static" style={{ backgroundColor: theme.header }}>
                <Toolbar>
                    <IconButton onClick={ () => toggleDrawer(true) } edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        ReactJS
                    </Typography>
                    <Switch color="primary" onChange={handleChange} title="Theme toggler"/>
                </Toolbar>
            </AppBar>

            <Sidebar/>
        </div>
    );
}

export default Header;