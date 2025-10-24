import { Box, CircularProgress, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function Callback() {
    const query = useQuery();
    const paramValue = query.get('code');
    const navigate = useNavigate();
    const { setIsAuthenticated } = useAuth();
    let hasBeenCalled = false;

    useEffect(() => {
        if (!hasBeenCalled) {
            if (paramValue === null) {
                navigate('/error');
                hasBeenCalled = true;
                return;
            }
            axios.get(`/api/auth/yahoo/callback?code=${paramValue}`).then((res) => {
                hasBeenCalled = true;
                setIsAuthenticated(true);
                navigate('/dashboard');
            }).catch(err => {
                hasBeenCalled = true;
                navigate('/error');
                return;
            });
        }
        hasBeenCalled = true;
    }, []);


    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                padding: 2,
                textAlign: 'center',
            }}
        >
            <CircularProgress size={60} sx={{ marginBottom: 2 }} />
            <Typography variant="h4" component="h1" gutterBottom>
                Please wait while we log you in...
            </Typography>
            <Typography variant="body1">
                This may take a few seconds.
            </Typography>
        </Box>
    );
}


export default Callback;
