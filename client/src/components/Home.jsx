import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import KofiButton from "kofi-button";
import { useAuth } from './AuthProvider';

function Home() {
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const handleLogin = () => {
        window.location.href = '/api/auth/login';
    };

    const handleDashboardRedirect = () => {
        navigate('/dashboard');
    };

    const handleSleeperLogin = () => {
        navigate('/sleeper');
    };

    const displayCTA = () => {
        return isAuthenticated ? (
            <Button
                variant="contained"
                onClick={handleDashboardRedirect}
                sx={{ width: '250px' }}
            >
                Go to Dashboard
            </Button>
        ) : (
            <>
                <Button
                    variant="contained"
                    onClick={handleLogin}
                    sx={{ width: '250px', marginTop: 2, backgroundColor: 'rgb(114, 14, 158)' }}
                >
                    Login with Yahoo!
                </Button>
                <Button
                    variant="contained"
                    onClick={handleSleeperLogin}
                    sx={{ width: '250px', marginTop: 2, backgroundColor: 'rgb(43 50 88)' }}
                >
                    Login with Sleeper
                </Button>
                <Button
                    variant="contained"
                    onClick={() => navigate('/espn')}
                    sx={{ width: '250px', marginTop: 2, backgroundColor: '#dd0000' }}
                >
                    Login with ESPN
                </Button>
            </>
        );
    };

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
            <Typography>Welcome to</Typography>
            <Typography variant="h3" color='secondary'>FFAwards</Typography>
            <Typography variant="body1" sx={{ maxWidth: 600, marginBottom: 2 }}>
                FFAwards is a free fantasy football tool that delivers unique and engaging insights by analyzing real-time league data, helping users discover fun 'awards' to learn more about their fantasy football league.
            </Typography>

            <Typography variant="body1" sx={{ maxWidth: 600, marginBottom: 2 }}>
                Let's get started! Select one of the league services below.
            </Typography>

            {displayCTA()}

            <br />
            <KofiButton color="#0a9396" title="Support FFAwards" kofiID="T6T7134H7O" />

            <Typography variant="body1" sx={{ marginTop: 2 }}>
                Want to see a demo? Check out our <Link to="/demo">Demo Page</Link>!
            </Typography>
        </Box>
    );
}

export default Home;
