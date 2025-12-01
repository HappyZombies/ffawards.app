import React, { useState } from 'react';
import { AppBar, Toolbar, Button, Typography, Box, Container, IconButton, Drawer, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useAuth } from './AuthProvider';
import { Link } from 'react-router-dom';

function Nav() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const { isAuthenticated } = useAuth();

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const displayLoggedInNav = () => (
        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
            <Button component={Link} to="/dashboard" color="primary">Dashboard</Button>
            <Button component={Link} to="/settings" color="primary">Settings</Button>
            <Button component={Link} to="/about" color="primary">Support FFAwards</Button>
        </Box>
    );

    const displayLoggedOutNav = () => (
        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
            <Button component={Link} to="/" color="primary">Home</Button>
            <Button component={Link} to="/about" color="primary">Support FFAwards</Button>
        </Box>
    );

    const displayLoggedInNavMobile = () => (
        <List>
            <ListItem disablePadding>
                <ListItemButton component={Link} to="/dashboard">
                    <ListItemText primary="Dashboard" sx={{ color: 'white' }} />
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton component={Link} to="/settings">
                    <ListItemText primary="Settings" sx={{ color: 'white' }} />
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton component={Link} to="/about">
                    <ListItemText primary="Support FFAwards" sx={{ color: 'white' }} />
                </ListItemButton>
            </ListItem>
        </List>
    );

    const displayLoggedOutNavMobile = () => (
        <List>
            <ListItem disablePadding>
                <ListItemButton component={Link} to="/">
                    <ListItemText primary="Home" sx={{ color: 'white' }} />
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton component={Link} to="/about">
                    <ListItemText primary="Support FFAwards" sx={{ color: 'white' }} />
                </ListItemButton>
            </ListItem>
        </List>
    )

    const drawer = (
        <Box sx={{ width: 250, bgcolor: '#1e1e1e', height: '100%' }} onClick={handleDrawerToggle} onKeyDown={handleDrawerToggle}>
            {isAuthenticated ? displayLoggedInNavMobile() : displayLoggedOutNavMobile()}
        </Box>
    );

    return (
        <>
            <AppBar position="static" sx={{ backgroundColor: '#1e1e1e', boxShadow: 'none' }}>
                <Container maxWidth="lg">
                    <Toolbar disableGutters>
                        <Typography variant="h6" sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
                            <img src="/logo.jpeg" alt="FFAwards Logo" style={{ width: 30, height: 30 }} />
                            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                                FFAwards
                            </Link>
                        </Typography>
                        {isAuthenticated ? displayLoggedInNav() : displayLoggedOutNav()}
                        <IconButton color="inherit" edge="end" onClick={handleDrawerToggle} sx={{ display: { md: 'none' }, ml: 'auto' }}>
                            <MenuIcon />
                        </IconButton>
                    </Toolbar>
                </Container>
            </AppBar>
            <Drawer anchor="right" open={mobileOpen} onClose={handleDrawerToggle} ModalProps={{ keepMounted: true }} sx={{ '& .MuiDrawer-paper': { bgcolor: '#1e1e1e' } }}>
                {drawer}
            </Drawer>
        </>
    );
}

export default Nav;
