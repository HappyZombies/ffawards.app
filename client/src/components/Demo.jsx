import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Leaderboard.css';
import './Awards.css';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Button, CircularProgress, Grid2 as Grid, LinearProgress, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import Error from './Error';

const Demo = () => {
    const [awards, setAwards] = useState(null);
    const [league, setLeague] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate();

    const handleLogin = () => {
        window.location.href = '/api/auth/login';
    };

    const handleSleeperLogin = () => {
        navigate('/sleeper');
    };

    useEffect(() => {
        const fetchAwards = async () => {
            try {
                const response = await axios.get(`/api/dashboard/leagues/demo`);
                setAwards(response.data.awards);
                setLeague(response.data.league);
            } catch (err) {
                if (err.response && err.response.status === 401) {
                    navigate('/');
                    return;
                }
                setError(err);
                setErrorMessage(err?.response?.data?.originalError);
            } finally {
                setLoading(false);
            }
        };

        fetchAwards();
    }, []);

    if (loading) return (
        <Box display="flex" justifyContent="center" alignItems="center" height="80vh">
            <CircularProgress />
        </Box>
    );

    if (error) return (
        <Error message={errorMessage || error.message} />
    );

    return (
        <Box className="leaderboard-container" p={3}>
            <Box mb={2} className="print-button">
                <Button variant="outlined" onClick={() => navigate("/")}>
                    Back
                </Button>
            </Box>
            {league && <Typography variant="h4" gutterBottom textAlign="center">{league.name}</Typography>}
            {league && <Typography variant="h6" gutterBottom textAlign="center">
                This demo showcases awards from my Yahoo league's 2023 season. You'll see various award categories highlighting team achievements.
                New awards are being added all the time, so feel free to explore and get a preview of what's in store for future seasons!</Typography>}
            {league &&

                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textAlign: 'center',
                        paddingBottom: 4,
                        gap: 2
                    }}
                >
                    <Typography variant="h6" gutterBottom textAlign="center" >
                        Select one of the league services below to get started!
                    </Typography>
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
                </Box>}
            {awards && awards.length > 0 ? (
                <Grid container spacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    {awards.map((award, index) => {
                        const sortedTeams = Object.values(award.award_data).sort((a, b) => b.total - a.total);
                        const maxPoints = Math.max(...sortedTeams.map(item => item.total));
                        return (
                            <Grid xs={12} key={index}>
                                <Box className="award-section" p={2} borderRadius={2} boxShadow={2} maxWidth={560}>
                                    <Typography variant="h5" gutterBottom>{award.name}</Typography>
                                    <Typography variant="body2" gutterBottom color='grey'>{award.description}</Typography>
                                    <Box mt={2}>
                                        {sortedTeams.map((item, idx) => (
                                            <Box key={idx} display="flex" alignItems="center" mb={1}>
                                                <Typography className="team-name" width="30%" noWrap>{item.teamName}</Typography>
                                                <Box flexGrow={1} mx={1}>
                                                    <LinearProgress
                                                        variant="determinate"
                                                        value={(item.total > 0 ? (item.total / maxPoints) * 100 : 1)}
                                                        sx={{
                                                            height: 10, // Increase this value to make the bar thicker
                                                            borderRadius: 5, // Optional: round the corners
                                                            '& .MuiLinearProgress-bar': {
                                                                backgroundColor: item.total > 0 ? 'primary.main' : 'transparent',
                                                            },
                                                            backgroundColor: 'rgba(0, 0, 0, 0.1)',
                                                        }}
                                                    />
                                                </Box>
                                                <Typography className="points">{item.total.toFixed(2)}</Typography>
                                            </Box>
                                        ))}
                                    </Box>
                                </Box>
                            </Grid>
                        );
                    })}
                </Grid>
            ) : null}
        </Box>
    );
};

export default Demo;
