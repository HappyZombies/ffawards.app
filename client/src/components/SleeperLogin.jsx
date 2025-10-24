import React, { useState } from 'react';
import { Box, Typography, Button, TextField, FormControl, FormControlLabel, Radio, RadioGroup, MenuItem, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';
import axios from 'axios';

function SleeperLogin() {
    const { setIsAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [loginOption, setLoginOption] = useState("username");
    const [inputValue, setInputValue] = useState("");
    const [year, setYear] = useState("2025");
    const [isLoading, setIsLoading] = useState(false);
    const [sleeperLeagues, setSleeperLeagues] = useState([]);
    const [selectedLeague, setSelectedLeague] = useState("");

    const handleFormSubmit = () => {
        if (!inputValue) return; // Prevent submission if input is empty
        setIsLoading(true);

        if (loginOption === "username") {
            // Fetch leagues for the given username and season
            axios.get(`/api/auth/login/sleeper/${inputValue}/leagues?season=${year}`)
                .then((res) => {
                    setSleeperLeagues(res.data);
                })
                .catch(() => {
                    navigate('/error');
                })
                .finally(() => setIsLoading(false));
            return;
        }

        // Direct league ID login
        axios.get(`/api/auth/login/sleeper?leagueId=${inputValue}`)
            .then(() => {
                setIsAuthenticated(true);
                navigate(`/dashboard/leagues/${inputValue}/awards`);
            })
            .catch(() => {
                navigate('/error');
            })
            .finally(() => setIsLoading(false));
    };

    const handleLeagueLogin = () => {
        if (!selectedLeague) return; // Prevent submission if no league is selected
        setIsLoading(true);

        axios.get(`/api/auth/login/sleeper?leagueId=${selectedLeague}`)
            .then(() => {
                setIsAuthenticated(true);
                navigate(`/dashboard/leagues/${selectedLeague}/awards`);
            })
            .catch(() => {
                navigate('/error');
            })
            .finally(() => setIsLoading(false));
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
            <Box sx={{ padding: 2, borderRadius: 1, width: '100%', maxWidth: '400px' }}>
                <Typography variant="h6">Sleeper</Typography>

                <FormControl component="fieldset" sx={{ marginBottom: 2 }}>
                    <RadioGroup
                        row
                        value={loginOption}
                        onChange={(e) => {
                            setLoginOption(e.target.value);
                            setSleeperLeagues([]); // Reset leagues when typing a new username
                        }}
                    >
                        <FormControlLabel
                            value="username"
                            control={
                                <Radio
                                    sx={{
                                        color: '#fff', // Unchecked color
                                        '&.Mui-checked': {
                                            color: '#fff', // Checked color
                                        }
                                    }}
                                />
                            }
                            label="Username"
                            sx={{ color: '#fff' }} // Label color
                        />
                        <FormControlLabel
                            value="leagueId"
                            control={<Radio sx={{ color: '#fff', '&.Mui-checked': { color: '#fff' } }} />}
                            label="League Id"
                            sx={{ color: '#fff' }}
                        />
                    </RadioGroup>
                </FormControl>

                <TextField
                    fullWidth
                    label={loginOption === "username" ? "Sleeper Username" : "League ID"}
                    value={inputValue}
                    onChange={(e) => {
                        setInputValue(e.target.value);
                        if (loginOption === "username") {
                            setSleeperLeagues([]); // Reset leagues when typing a new username
                        }
                    }}
                    sx={{
                        marginBottom: 2,
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': { borderColor: '#fff' },
                            '&:hover fieldset': { borderColor: '#fff' },
                            '&.Mui-focused fieldset': { borderColor: '#fff' },
                        },
                    }}
                    InputLabelProps={{ style: { color: '#fff' } }}
                    InputProps={{ style: { color: '#fff' } }}
                />

                {loginOption === "username" && (
                    <TextField
                        select
                        fullWidth
                        label="Select a year"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        sx={{
                            marginBottom: 2,
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': { borderColor: '#fff' },
                                '&:hover fieldset': { borderColor: '#fff' },
                                '&.Mui-focused fieldset': { borderColor: '#fff' },
                            },
                        }}
                        InputLabelProps={{ style: { color: '#fff' } }}
                        InputProps={{ style: { color: '#fff' } }}
                    >
                        {["2025"].map((yr) => (
                            <MenuItem key={yr} value={yr}>{yr}</MenuItem>
                        ))}
                    </TextField>
                )}

                {/* Dropdown for Sleeper Leagues */}
                {sleeperLeagues.length > 0 && (
                    <TextField
                        select
                        fullWidth
                        label="Select a League"
                        value={selectedLeague}
                        onChange={(e) => setSelectedLeague(e.target.value)}
                        sx={{
                            marginBottom: 2,
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': { borderColor: '#fff' },
                                '&:hover fieldset': { borderColor: '#fff' },
                                '&.Mui-focused fieldset': { borderColor: '#fff' },
                            },
                        }}
                        InputLabelProps={{ style: { color: '#fff' } }}
                        InputProps={{ style: { color: '#fff' } }}
                    >
                        {sleeperLeagues.map((league) => (
                            <MenuItem key={league.league_id} value={league.league_id}>
                                {league.name}
                            </MenuItem>
                        ))}
                    </TextField>
                )}

                <Button
                    variant="contained"
                    fullWidth
                    onClick={sleeperLeagues.length > 0 ? handleLeagueLogin : handleFormSubmit}
                    disabled={isLoading || !inputValue || (sleeperLeagues.length > 0 && !selectedLeague)}
                    sx={{ marginTop: 2 }}
                >
                    {isLoading ? <CircularProgress size={24} color="inherit" /> : "Sign In"}
                </Button>
            </Box>
        </Box>
    );
}

export default SleeperLogin;
