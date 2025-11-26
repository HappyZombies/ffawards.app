import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Modal, Fade, Backdrop, Divider, CircularProgress } from '@mui/material';
import Error from './Error';
import { useAuth } from './AuthProvider';

function Settings() {
    const [open, setOpen] = useState(false);
    const [pendingDelete, setPendingDelete] = useState(false);
    const [deleteError, setDeleteError] = useState(false);
    const { setIsAuthenticated } = useAuth();

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                await axios.get(`/api/dashboard/leagues?season=2025`);
            } catch (err) {
                navigate('/');
            }
        };

        fetchData();
    }, []);

    const handleLogout = async () => {
        setIsAuthenticated(false);
        await axios.get('/api/auth/logout');
        navigate('/');
    };

    const handleSleeperLogin = () => {
        navigate('/sleeper');
    };

    const handleDeleteData = async () => {
        setOpen(false);
        setPendingDelete(true);
        try {
            await axios.delete('/api/auth/account');
            setIsAuthenticated(false);
        } catch (err) {
            setDeleteError(true);
            setPendingDelete(false);
            return;
        }
        navigate('/');
    };

    if (deleteError) {
        return <Error message='Please try again.' />;
    }

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '80vh',
                textAlign: 'center',
                gap: 2
            }}
        >
            <Typography variant="h4" gutterBottom>
                Settings
            </Typography>
            {pendingDelete ? (
                <CircularProgress color="error" />
            ) : (
                //TODO: Only show this if we are sleeper logged in
                <>
                    <Button
                        variant="contained"
                        onClick={handleSleeperLogin}
                        sx={{ width: '250px', marginTop: 2, backgroundColor: 'rgb(43 50 88)' }}
                    >
                        Switch to Sleeper Login
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleLogout}
                    >
                        Logout
                    </Button>
                    {/* <Button
                        variant="outlined"
                        color="error"
                        onClick={handleOpen}
                    >
                        Delete Account
                    </Button> */}
                </>
            )}

            <Divider sx={{ mt: 2, mb: 2 }} />
            <Typography variant="body2" color='white' gutterBottom>
                Version: <Link to="/changelog">0.6.0-beta</Link>
            </Typography>
            <Modal
                open={open}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: 'backdrop' }}
                slotProps={{ backdrop: { open: open, onClick: handleClose } }}
            >
                <Fade in={open}>
                    <Box
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: 400,
                            bgcolor: '#2c2c2c',
                            border: '2px solid #444',
                            boxShadow: 24,
                            p: 4,
                            textAlign: 'left'
                        }}
                    >
                        <Typography variant="h6" style={{ textAlign: "center" }} gutterBottom>
                            Are you sure you?
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 2 }}>
                            This action cannot be undone and will remove your account. Your league and award information will still be stored for historical purposes and in case there is another user in the same league as you. You can always create a new account to start fresh by simply logging in again.

                            If you would like to delete all data, please click the button below.
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 2 }}>
                            Please confirm you want to delete all data.
                        </Typography>
                        <Button
                            variant="contained"
                            color="error"
                            onClick={handleDeleteData}
                        >
                            Delete
                        </Button>
                        <Button
                            variant="outlined"
                            color="primary"
                            onClick={handleClose}
                            sx={{ ml: 2 }}
                        >
                            Cancel
                        </Button>
                    </Box>
                </Fade>
            </Modal>
        </Box>
    );
}

export default Settings;
