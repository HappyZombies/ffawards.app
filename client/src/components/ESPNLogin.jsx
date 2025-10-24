import React, { useState } from 'react';
import { Box, Typography, Button, TextField, FormControl, FormControlLabel, Radio, RadioGroup, MenuItem, CircularProgress, Checkbox, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';
import axios from 'axios';

function ESPNLogin() {
    const { setIsAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [loginOption, setLoginOption] = useState("leagueId");
    const [inputValue, setInputValue] = useState("");
    const [year, setYear] = useState("2025");
    const [isLoading, setIsLoading] = useState(false);
    const [sleeperLeagues, setSleeperLeagues] = useState([]);
    const [selectedLeague, setSelectedLeague] = useState("");
    const [isPrivateLeague, setIsPrivateLeague] = useState(false);
    const [espnS2, setEspnS2] = useState("");
    const [swid, setSwid] = useState("");
    const [showLeagueIdHelp, setShowLeagueIdHelp] = useState(false);

    const handleFormSubmit = () => {
        if (!inputValue) return;
        setIsLoading(true);

        const params = new URLSearchParams({
            leagueId: inputValue,
            year,
        });
        document.cookie = `SWID=${swid}; path=/; max-age=${365 * 24 * 60 * 60}`;
        document.cookie = `espn_s2=${espnS2}; path=/; max-age=${60 * 24 * 60 * 60}`;
        axios.get(`/api/auth/login/espn?${params.toString()}`)
            .then(() => {
                setIsAuthenticated(true);
                navigate(`/dashboard`);
            })
            .catch(() => {
                navigate('/error');
            })
            .finally(() => setIsLoading(false));
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '80vh', textAlign: 'center', gap: 2 }}>
            <Box sx={{ padding: 2, borderRadius: 1, width: '100%', maxWidth: '400px' }}>
                <Typography variant="h6">ESPN</Typography>
                <FormControl component="fieldset" sx={{ mb: 2 }}>
                    <RadioGroup
                        row
                        value={loginOption}
                        onChange={(e) => {
                            setLoginOption(e.target.value);
                            setSleeperLeagues([]);
                        }}
                    >
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
                    label="League ID"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    sx={{
                        mb: 1,
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': { borderColor: '#fff' },
                            '&:hover fieldset': { borderColor: '#fff' },
                            '&.Mui-focused fieldset': { borderColor: '#fff' },
                        },
                    }}
                    InputLabelProps={{ style: { color: '#fff' } }}
                    InputProps={{ style: { color: '#fff' } }}
                />

                <Link
                    component="button"
                    variant="body2"
                    onClick={() => setShowLeagueIdHelp(!showLeagueIdHelp)}
                    sx={{ color: '#90caf9', mb: 2 }}
                >
                    Where is my league ID at?
                </Link>

                {showLeagueIdHelp && (
                    <Typography variant="body2" sx={{ color: '#fff', mb: 2, textAlign: 'left' }}>
                        <strong>On the ESPN Fantasy app:</strong> Go to League → League Info → League ID
                        <br /><br />
                        <strong>On the ESPN league website:</strong> Go to the URL for your team page:
                        <br />
                        https://fantasy.espn.com/football/team?leagueId=######&teamId=1&seasonId=2025
                        <br />
                        Your League ID are the numbers after "leagueId="
                    </Typography>
                )}

                <TextField
                    select
                    fullWidth
                    label="Select a year"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    sx={{
                        mb: 2,
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

                <FormControlLabel
                    control={
                        <Checkbox
                            checked={isPrivateLeague}
                            onChange={(e) => setIsPrivateLeague(e.target.checked)}
                            sx={{ color: '#fff', '&.Mui-checked': { color: '#fff' } }}
                        />
                    }
                    label="This is a private league (requires browser cookies)"
                    sx={{ color: '#fff', mb: 2 }}
                />

                {isPrivateLeague && (
                    <Box sx={{ textAlign: 'left', color: '#fff', mb: 2 }}>
                        <Typography variant="subtitle1" sx={{ mb: 1 }}>Private league authentication</Typography>
                        <TextField
                            fullWidth
                            label="espn_s2 cookie *"
                            placeholder="ex: AEB1C9%CvM.................."
                            value={espnS2}
                            onChange={(e) => setEspnS2(e.target.value)}
                            sx={{
                                mb: 2,
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': { borderColor: '#fff' },
                                    '&:hover fieldset': { borderColor: '#fff' },
                                    '&.Mui-focused fieldset': { borderColor: '#fff' },
                                },
                            }}
                            InputLabelProps={{ style: { color: '#fff' } }}
                            InputProps={{ style: { color: '#fff' } }}
                        />
                        <TextField
                            fullWidth
                            label="SWID cookie *"
                            placeholder="ex: {123AB456-21..-.......}"
                            value={swid}
                            onChange={(e) => setSwid(e.target.value)}
                            sx={{
                                mb: 2,
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': { borderColor: '#fff' },
                                    '&:hover fieldset': { borderColor: '#fff' },
                                    '&.Mui-focused fieldset': { borderColor: '#fff' },
                                },
                            }}
                            InputLabelProps={{ style: { color: '#fff' } }}
                            InputProps={{ style: { color: '#fff' } }}
                        />

                        <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>
                            How to find your cookies:
                            {"\n"}1. Log in to your league's ESPN fantasy football page on desktop.
                            {"\n"}2. Open browser developer tools (right click → Inspect OR F12).
                            {"\n"}3. Go to Application → Storage → Cookies → espn.com.
                            {"\n"}4. Copy "espn_s2" and "SWID" cookie values (they're in alphabetical order).
                        </Typography>
                    </Box>
                )}

                <Button
                    variant="contained"
                    fullWidth
                    onClick={sleeperLeagues.length > 0 ? handleLeagueLogin : handleFormSubmit}
                    disabled={isLoading || !inputValue || (isPrivateLeague && (!espnS2 || !swid))}
                    sx={{ mt: 2 }}
                >
                    {isLoading ? <CircularProgress size={24} color="inherit" /> : "Sign In"}
                </Button>
            </Box>
        </Box>
    );
}

export default ESPNLogin;
