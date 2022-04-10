import React from 'react';
import { NavLink as RouterLink, useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Button, ListItem, ListItemButton, ListItemText, ListItemIcon } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
    item: {
        display: 'flex',
        paddingTop: 0,
        paddingBottom: 0,
    },
    button: {
        color: 'secondary',
        fontWeight: 'normal',
        justifyContent: 'flex-start',
        letterSpacing: 0,
        padding: '10px 8px',
        textTransform: 'none',
        width: '100%',
        '&:hover': {
            color: 'grey',
        },
    },
    icon: {
        marginRight: '5px',
    },
    title: {
        marginRight: 'auto',
    },
    active: {
        color: 'primary',
        '& $title': {
            fontWeight: 'normal',
        },
        '& $icon': {
            color: 'primary',
        },
    },
}));

const NavItem = ({
    className, href, icon: Icon, title, open, ...rest
}) => {
    const classes = useStyles();
    const navigate = useNavigate();

    return (
        <ListItemButton

            {...rest}
            onClick={() => navigate(href)}
            sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
            }}
        >
            <ListItemIcon
                activeClassName={classes.active}
                component={RouterLink}
                sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                }}
            >
                <Icon size="30" />
            </ListItemIcon>


            <ListItemText primary={title} sx={{ opacity: open ? 1 : 0 }} />


        </ListItemButton>
    );
};

NavItem.propTypes = {
    className: PropTypes.string,
    href: PropTypes.string,
    icon: PropTypes.elementType,
    title: PropTypes.string,
};

export default NavItem;
