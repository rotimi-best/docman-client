import React from 'react';
import { NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import routes from '../constants/routes';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  navLink: {
    textDecoration: 'none',
    color: 'inherit'
  }
}));

export default function Header() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          {/* <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton> */}
          <NavLink
            to={routes.PROFILE}
            className={classes.navLink}
          >
            <Typography variant="h6" className={classes.title}>
              Document Manager
            </Typography>
          </NavLink>
          <div className={classes.grow} />
          <Button color="inherit" href={routes.GROUPS}>
            Groups
          </Button>
          <Button color="inherit" href={routes.PROFILE}>Profile</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
